<script lang="ts" type="module">
    import FlightComponent from './Flight.svelte';
    import type { Flight } from "../../types/flight";
    import type { SeatMap } from "../../types/seatMap";
    import type { Seat } from '../../types/seat';
    import { apiUrl } from "../../constants";
    import type { Reservation } from '../../types/reservation';

    const urlParams = new URLSearchParams(window.location.search);
    const flightId = parseInt(urlParams.get('flightId'));
    
    let flight: Flight;
    let seatMaps: SeatMap[];
    let seatsToReserve: Seat[] = [];

    let dialog: HTMLDialogElement;
    let dialogTitle: string;
    const closeDialog = () => dialog.close();
    
    getFlight();

    function getFlight() {
        fetch(apiUrl + `/find?flightId=${flightId}`)
            .then(x => x.json())
            .then(x => {
                flight = x;
                mapRows(flight);
            });
    }

    function mapRows(f: Flight) {
        const seatGroups = Object.groupBy(f.seats, x => x.row);
        const map: SeatMap[] = [];
        
        for (const [key, value] of Object.entries(seatGroups)) {
            const r = parseInt(key);
            map.push({ row: r, seats: value});
        }
        
        seatMaps = map;
    }

    function onCheckboxChecked(ev: any, seat: Seat) {
        const checked = ev.target.checked as boolean;
        
        if(checked) {
            seatsToReserve = [...seatsToReserve, seat];
        }
        else {
            const idx = seatsToReserve.findIndex(x =>
                x.row === seat.row &&
                x.mark === seat.mark
            );
            if(idx > -1) {
                seatsToReserve.splice(idx, 1);
                seatsToReserve = [...seatsToReserve];
            }
        }  
    }

    function addPassports() {
        if(seatsToReserve.length === 0) {
            dialogTitle = 'At least one seat must be selected';
            dialog.showModal();
            
            return;
        }

        window.localStorage.setItem('reservation', JSON.stringify({
            flightId: flightId,
            seats: seatsToReserve,
            passports: seatsToReserve.map(_ => '')
        } as Reservation));
        window.location.href = `/passports`;
    }

    function goBack() {
        window.location.href = `/`;
    }
</script>

{#if flight}
<div class="seat-reservation">
    <div>
        <h3>Flight info</h3>
        <div class="flight-component">
            <FlightComponent flight={flight} />
        </div>
    </div>
    <div>
        <h3>Available seats</h3>
        <section>
            <ul class="seats-list">
                {#each seatMaps as sm}
                    <li>
                        row: {sm.row}
                        <ul class="seats-row-list">
                            {#each sm.seats as ss}
                                <li>
                                    <label>
                                        {ss.mark}
                                        <input 
                                            type="checkbox"
                                            checked={ss.reserved}
                                            disabled={ss.reserved}
                                            on:change={(ev) => onCheckboxChecked(ev, ss)}
                                            />
                                    </label>
                                </li>
                            {/each}
                        </ul>
                    </li>
                {/each}
            </ul>
        </section>
    </div>
    <div>
        <h3>Selected seats</h3>
        <section>
            <ul>
                {#each seatsToReserve as str}
                    <li>
                        <span>row: {str.row}</span>
                        <span>row: {str.mark}</span>
                    </li>
                {/each}
            </ul>
        </section>
    </div>
</div>
<nav class="buttons">
    <button on:click={goBack}>Go back</button>
    <button on:click={addPassports}>Add passports</button>
</nav>
{:else}
    <p>loading...</p>
{/if}

<dialog bind:this={dialog}>
    <h3>{dialogTitle}</h3>
    <button on:click={closeDialog}>Ok</button>
</dialog>
<script lang="ts" type="module">
    import type { Reservation } from '../../types/reservation';
    import { apiUrl } from "../../constants";
    
    let reservation: Reservation;
    let dialog: HTMLDialogElement;
    loadData();

    function loadData() {
        const r = window.localStorage.getItem('reservation');
        reservation = JSON.parse(r) as Reservation;

        if(!reservation) {
            window.location.href = '/';
        }

        reservation.passports = reservation.seats.map(_ => '');
    }

    async function handleSubmit(_: SubmitEvent) {
        const allPopulated = reservation.passports.every(x => x.length > 0);
        
        if(!allPopulated) {
            dialog.showModal();
            return;
        }

        const headers = new Headers()
        headers.append("Content-Type", "application/json");
        
        const response = await fetch(apiUrl + '/reserve', {
            method: 'POST',
            body: JSON.stringify(reservation),
            headers: headers
        });

        if(response.status === 200) {
            window.location.href = '/';
        }
        else {
            alert('Crap');
        }
    }
</script>

<form on:submit|preventDefault={handleSubmit}>
    {#each reservation.seats as _, i}
        <div>
            <label>
                Add passport number
                <input type="text" bind:value={reservation.passports[i]} />
            </label>
        </div>
    {/each}
    <button type="submit">Submit</button>
</form>

<dialog bind:this={dialog}>
    <h3>Not all passports are populated</h3>
    <button on:click={() => dialog.close()}>Ok</button>
</dialog>



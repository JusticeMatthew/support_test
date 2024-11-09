<script lang="ts" type="module">
    import FlightComponent from './Flight.svelte';
    import type { Flight } from "../../types/flight";
    import { apiUrl } from "../../constants";
    
    let flights: Flight[] = [];
    loadData();
    
    function loadData() {
        fetch(apiUrl)
            .then(x => x.json())
            .then(xs => flights = xs);
    }

    function handleClick(flightId: number) {
        window.location.href = `/seats?flightId=${flightId}`;
    }
</script>

<section>
    <h2>Flights</h2>
    <ul>
        {#each flights as f}
            <li>
                <div class="flight-component">
                    <FlightComponent flight={f} />
                </div>
                <button on:click={() => handleClick(f.id)}>Explore seats</button>
            </li>
        {:else}
            <p>loading...</p>
        {/each}
    </ul>
</section>
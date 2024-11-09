<script lang="ts" type="module">
    import type { Flight } from "../../types/flight";

    export let flight: Flight;
</script>

{#if flight}
    <dl>
        <div>
            <dt>From</dt>
            <dd>{flight.from}</dd>
        </div>
        <div>
            <dt>To</dt>
            <dd>{flight.to}</dd>
        </div>
    </dl>
{/if}
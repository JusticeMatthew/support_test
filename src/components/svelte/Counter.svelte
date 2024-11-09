<script lang="ts">
    let counter = 0;

    function increment() {
        counter = counter + 1
    }
</script>

<div>{ counter }</div>
<button on:click={increment}>Increment</button>
<script>
import { page } from '$app/stores';
import { vote } from './../../../stores.js';
import Follow from './Follow.svelte';
import Closed from './Closed.svelte';

export let data;

</script>

<svelte:head>
    <title>Home</title>
    <meta name="description" content="Svelte demo app" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
</svelte:head>

<div class="container-fluid">
    <div class="row">
        <div id="voting" class="col-6 p-5"></div>
        <div class="col-6 p-5 mr-2">
            {#if !data.closed}
                <Follow voting={data}/>
            {:else}
                <Closed voting={data}/>
            {/if}
        </div>
    </div>
</div>
<style>
</style>
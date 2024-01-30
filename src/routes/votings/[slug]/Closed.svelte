<script>

import { page } from '$app/stores';
import Votes from './Votes.svelte'

let slug = $page.params.slug;

export let voting;

async function open() {
    let response = fetch('http://127.0.0.1:8000/api/votings/' + slug, {
        method: 'PUT',
        body: JSON.stringify({
            closed: false
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        location.reload();
    })
}

</script>

<div>
    <h1 class="mb-5">Omröstningen är stängd</h1>
    <Votes voting={voting}/>
    <div class="mt-5">
        <div class="mt-4">
            <button on:click={open} class="btn btn-primary">Öppna omröstningen</button>
        </div>
    </div>
</div>
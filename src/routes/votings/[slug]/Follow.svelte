<script>

import { page } from '$app/stores';
import Votes from './Votes.svelte'

let slug = $page.params.slug;

export let voting;

/*
<progress value="0" max="100" style="--value: 0; --max: 100;"></progress>
<progress value="25" max="100" style="--value: 25; --max: 100;"></progress>
<progress value="50" max="100" style="--value: 50; --max: 100;"></progress>
<progress value="75" max="100" style="--value: 75; --max: 100;"></progress>
*/

async function close() {
    let response = fetch('http://127.0.0.1:8000/api/votings/' + slug, {
        method: 'PUT',
        body: JSON.stringify({
            closed: true
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
    <h1 class="mb-5">Toppen, nu kan du följa omröstningen</h1>
    <div>
        <Votes voting={voting}/>
    </div>
    <div class="mt-5">
        <span>Om du är nöjd eller vill vänta kan du stänga omröstningen.<br />Den kan öppnas igen när som helst.</span>
        <div class="mt-4">
            <button on:click={close} class="btn btn-primary">Stäng</button>
        </div>
    </div>
</div>
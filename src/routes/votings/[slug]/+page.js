export async function load({fetch, params}) {
    let response = await fetch('http://127.0.0.1:8000/api/votings/' + params.slug);

    let voting = await response.json();

    return voting;
}
<script>
    let textareaId = 2;
    let inputId = 1;
    let textareas;
    let inputs;

    let name;
    let email;
    let description;

	function addTextarea(e) {
        e.preventDefault();
        
        textareaId++;

        const div = document.createElement('div');
        const label = document.createElement('label');
        label.setAttribute('for', 'name');
        label.className = 'form-label';
        label.textContent = 'Formulering ' + textareaId;
        const textarea = document.createElement('textarea');
        textarea.setAttribute('id', 'text-' + textareaId);
        textarea.setAttribute('rows', 3);
        textarea.className = 'form-control';
        div.className = 'mb-4';
        div.appendChild(label);
        div.appendChild(textarea);
        textareas.appendChild(div);
    };

    function addInput(e) {
        e.preventDefault();
        
        inputId++;

        const div = document.createElement('div');
        const label = document.createElement('label');
        label.setAttribute('for', 'to-' + inputId);
        label.className = 'form-label';
        label.textContent = 'Namn ' + inputId;
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('id', 'to-' + inputId);
        input.className = 'form-control';
        div.className = 'mb-4';
        div.appendChild(label);
        div.appendChild(input);
        inputs.appendChild(div);
    };

    async function submit(e) {
        e.preventDefault();

        document.getElementsByClassName('alert-danger')[0].classList.add('d-none');
        document.getElementsByClassName('alert-danger')[1].classList.add('d-none');

        let suggestions = document.getElementsByClassName('text');

        let texts = [];
        let invites = [];

        let error = false;

        for (let i = 0; i < suggestions.length; i++) {
            texts.push(suggestions[i].value);
        }

        let users = document.getElementsByClassName('invites');

        for (let i = 0; i < users.length; i++) {
            invites.push(users[i].value);
        }

        let response = await fetch('http://127.0.0.1:8000/api/votings', {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                email: email,
                description: description,
                suggestions: texts,
                invites: invites
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .catch(function (error) {
            console.log(error)

            error = true;
        })

        let data = await response.json();

        if (response.status === 422) {
            for (let i = 0; i < data.length; i++) {
                // console.log(document.getElementById('warning-' + Object.keys(data[i][0])));
                document.getElementById('alert-' + Object.keys(data[i])[0]).classList.remove('d-none');
            }
        } else {
            window.location.href = 'votings/' + data;
        }
    }
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
</svelte:head>

<div class="container-fluid">
    <div class="row">
        <div id="background" class="col-6 p-5">
            <h1 class="mb-4">Skapa en omröstning</h1>
            <h4>för den bästa formuleringen och låt vänner, bekanta och kollegor välja</h4>
        </div>
        <div class="col-6 p-5 mr-2">
            <form>
                <div class="mb-4">
                    <label for="name" class="form-label">Förnamn</label>
                    <input type="text" id="name" class="form-control" bind:value={name}>
                    <div id="alert-name" class="alert alert-danger mt-4 d-none">Fyll i förnamn</div>
                </div>
                <div class="mb-4">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" id="email" class="form-control" bind:value={email}>
                    <div id="alert-email" class="alert alert-danger mt-4 d-none">Ogiltig email</div>
                </div>
                <div class="mb-4">
                    <label for="description" class="form-label">Beskrivning</label>
                    <textarea id="description" class="form-control" rows="3" bind:value={description}></textarea>
                </div>
                <div bind:this={textareas} class="mb-4">
                    <div class="mb-4">
                        <label for="text-1" class="form-label">Formulering 1</label>
                        <textarea id="text-1" class="form-control text" rows="3"></textarea>
                    </div>
                    <div class="mb-4">
                        <label for="text-2" class="form-label">Formulering 2</label>
                        <textarea id="text-2" class="form-control text" rows="3"></textarea>
                    </div>
                </div>
                <div>
                    <button on:click={addTextarea} class="btn btn-primary mb-4">Lägg till fler formuleringar</button>
                </div>
                <div bind:this={inputs} class="mb-4">
                    <div class="mb-4">
                        <label for="to-1" class="form-label">Namn</label>
                        <input type="text" id="to-1" class="form-control invites">
                    </div>
                </div>
                <div>
                    <button on:click={addInput} class="btn btn-secondary mb-4">Lägg till fler</button>
                </div>
                <div>
                    <input type="submit" on:click={submit} class="btn btn-success" value="Skapa omröstning">
                </div>
            </form>
        </div>
    </div>
</div>
<style>
	
</style>

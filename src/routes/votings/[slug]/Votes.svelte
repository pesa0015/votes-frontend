<script>

import ioClient from "socket.io-client";

import { suggestions, vote, stats, sum } from './../../../stores.js';

export let voting;

suggestions.set([]);

console.log($suggestions)
vote.set([]);
stats.set([]);
sum.set(0);

for (let i = 0; i < voting.suggestions.length; i++) {
    suggestions.update((currentValue => {
            return [voting.suggestions[i].id, ...currentValue]
        }))

    vote.update((currentValue => {
            return [0, ...currentValue]
        }))

    stats.update((currentValue => {
            return [0, ...currentValue]
        }))
}
// let suggestions = [];

// let votes = [];

// let s = [];
console.log(voting.votes, 14)
sum.set(typeof voting.votes === 'undefined' ? 0 : voting.votes.length)

for (let i = 0; i < $sum; i++) {
    if ($suggestions.indexOf(voting.votes[i].suggestion_id) !== -1) {
        let key = $suggestions.indexOf(voting.votes[i].suggestion_id);
// console.log($vote, key, 20)
        // vote.update((n => {
        //     console.log(n, 21)
        // }))
vote.update((currentValue => {
            currentValue[key] = currentValue[key] + 1;
            return currentValue
        }))

stats.update((currentValue => {
            currentValue[key] = getValue($vote[key], $sum)
                return currentValue
            }))
        // console.log($vote, 10)
        // console.log(key, 21)
// console.log(getValue(votes[i], $sum), 21)
//         s[key] = getValue(votes[i], $sum);

//         votes[key]++;
    } else {
        suggestions.update((currentValue => {
            return [voting.votes[i].suggestion_id, ...currentValue]
        }))

            vote.update((currentValue => {
    return [1, ...currentValue]
}))

            stats.update((currentValue => {
                return [getValue(1, $sum), ...currentValue]
            }))
    //     vote.update((currentValue => {
    //         console.log(currentValue, 2)
    //         // return [...currentValue, 1]
    //     }))
    //     console.log($vote, 28);
//         suggestions.push(voting.votes[i].suggestion_id)

//         votes.push(1);
// console.log(getValue(votes[i], $sum), 28)
//         s.push(getValue(votes[i], $sum));

        // vote.stats[i] = {...vote.stats[i], ...}
    }
}
// console.log($vote, 1)
console.log($stats)
// vote.set(votes);

// stats.set(s);

// console.log($stats)

// for (let i = 0; i < 2; i++) {
//     stats[i].set = getValue(stats[i], votes.length);
// }

const io = ioClient('http://localhost:3000', {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    },
})

io.on('vote', (message) => {
    if ($suggestions.length > 0) {
    let key = $suggestions.indexOf(message)

    // vote.update(currentValue => {
    //     vote: vote[key] + 1
    // })
    // votes[key] = votes[key] + 1

    sum.update((currentValue => currentValue + 1))

    vote.update((currentValue => {
        console.log(currentValue[key], 110);
        // console.log(currentValue, $suggestions, 71)
        currentValue[key] = currentValue[key] + 1;
            return currentValue
    }))

    stats.update((currentValue => {
            currentValue[key] = getValue($vote[key], $sum)
                return currentValue
            }))

    console.log(message, key, $vote, $suggestions, $stats, 49)
}

    // vote.set(votes)
})

function getValue(currentValue, total) {
    // console.log(currentValue, total, 70);
    return Math.round(100 * currentValue / total);
}

// Math.round(100 * $vote[i] / voting.votes.length)

</script>

<div>
    {#each voting.suggestions as suggestion, i (i)}
        <h4 class="mt-5 mb-5">Alt. {i + 1} ({$vote[i] ?? 0})</h4>
        <progress class="mb-5 d-block" value={$stats[i] ?? 0} max="100" style={"--value: " + ($stats[i] ?? 0) + "; --max: 100;"}></progress>
        <span>{suggestion.text}</span>
    {/each}
</div>
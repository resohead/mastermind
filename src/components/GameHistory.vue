<template>
   <ul v-for="game in history" :key="game.id" class="text-white">
       <li>
           <span class="font-bold">{{ game.word }}</span>
           <span> used {{ game.attempts }} attempts in {{ game.time }} seconds</span>
       </li>
   </ul>
</template>

<script>
export default {
    // id, word, success/fail, time, attempts
    props: {
        history: {type: Array, default: []},
    },
    data() {
        return {
        };
    },
}
</script>
<template>
   <ul v-for="game in history" :key="game.id" class="text-white">
       <li>
           <span>{{ game.word }}, Completed: {{ game.completed }}</span>
           <span>{{ game.attempts }} in {{ game.time }} seconds</span>
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
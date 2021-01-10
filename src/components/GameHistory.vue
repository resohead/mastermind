<template>
   <ul v-for="game in history" :key="game.id">
       <li>
           <span></span>
           <span>{{ game.attempts }} in {{ game.time }} seconds</span>
       </li>
   </ul>
</template>

<script>
export default {
    props: {
        history: {type: Array, default: []},
    },
    data() {
        return {
        };
    },
}
</script>
<template>
    <button
        type="button"
        class="relative inline-flex text-white items-center text-center rounded-md border bg-white text-sm font-2xl focus:z-10 focus:outline-none focus:ring-1 h-20 w-20 max-h-20 min-h-20 min-w-20 max-w-20 justify-center"
        :class="{
            'success bg-green-500 text-white border-green-400 hover:border-green-700 hover:bg-green-700 focus:ring-green-900': correct,
            'warning bg-yellow-500 text-white border-yellow-400 hover:border-yellow-700 hover:bg-yellow-700 focus:ring-yellow-900': !correct && exists,
            'error bg-indigo-800 text-white border-indigo-500 hover:border-indigo-500 hover:bg-indigo-500 focus:ring-indigo-900': !correct && !exists
        }"
    >
    {{ value }}
    </button>
</template>

<script>
export default {
    props: {
        value: {type: String, default: '.'},
        correct: {type: Boolean, default: false},
        exists: {type: Boolean, default: false}
    },
    data() {
        return {
        };
    },
}
</script>
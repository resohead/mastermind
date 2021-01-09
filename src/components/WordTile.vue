<template>
    <button
        type="button"
        class="relative inline-flex text-white items-center text-center rounded-md border border-gray-300 bg-white text-sm font-medium hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 h-20 w-20 max-h-20 min-h-20 min-w-20 max-w-20 justify-center"
        :class="{
            'success bg-green-500 text-white hover:bg-green-700': correct,
            'warning bg-yellow-500 text-white hover:bg-yellow-700': !correct && exists,
            'error bg-blue-800 text-white hover:bg-blue-900': !correct && !exists
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
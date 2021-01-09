<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto justify-center items-center">
      <Mastermind :word="Words[Math.floor(Math.random() * Words.length)]"/>
    </div>
  </div>
</template>

<script setup>
import Mastermind from './components/Mastermind.vue'
import Words from './Words.js'
</script>
<template>
  <h1>{{ word }}</h1>
  <div>
    <div v-for="answer in answers" :key="answer.id">
      <span v-for="char in check(answer)" :key="char.index" :class="{'success': char.correct, 'warning': !char.correct && char.exists, 'error': !char.correct && !char.exists}">
        {{ char.answerChar }}
      </span>
    </div>
  </div>

  <form ref="form" @submit.prevent="submit">
    <input type="text" :minlength="word.length"  :maxlength="word.length" v-model="answer" />
  </form>

  <h2 v-show="isCorrect">CORRECT</h2>

</template>

<script>

export default {
  components: {},
  props: ['word'],
  data() {
    return {
      answer: '',
      answers: []
    };
  },

  methods: {
    submit() {
      if (this.$refs.form.checkValidity()) {
        console.log('submit')
        this.answers.push({id: this.answers.count, value: this.answer.toUpperCase(), characters: this.answer.toUpperCase().split('')})
        this.answer = ''
      } else {
        this.$refs.form.reportValidity()
      }
    },
    check(answer) {
      let results = []
      let i = 0
      for(i=0; i<answer.value.length; i++){
        results.push({
          index: i,
          answerChar: answer.characters[i],
          wordChar: this.word.toUpperCase()[i],
          correct: answer.value[i] === this.word.toUpperCase()[i],
          exists: this.word.toUpperCase().split('').includes(answer.characters[i])
        })
      }
      console.log(results)
      return results
    }
  },

  computed: {
    lastGuess() {
      return this.answers[this.answers.length - 1]
    },
    isCorrect() {
      return this.lastGuess?.value.toUpperCase() === this.word.toUpperCase()
    }
  }
}

</script>

<style scoped>
  .success {
    color: green
  }
  .warning {
    color: orange
  }
  .error {
    color: red
  }

</style>
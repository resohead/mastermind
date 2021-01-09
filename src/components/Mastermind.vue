<template>

  <div class="space-y-1 overflow-hidden overflow-y-auto max-h-96" id="scoreboard" ref="scoreboard">
    <ul v-if="answers.length === 0" class="flex items-center justify-center">
      <li>
        <WordTile :value="this.secretWord[0]" :correct="true" :exists="true"/>
      </li>
      <li v-for="index in this.secretWord.length-1" :key="index">
        <WordTile value="." :correct="false" :exists="false"/>
      </li>
    </ul>
    <ul V-else class="flex items-center justify-center"
      v-for="answer in answers" :key="answer.id">
      <li>
        <WordTile v-for="char in check(answer)" :key="char.index"
          :value="char.answerChar"
          :correct="char.correct" :exists="char.exists"
        />
      </li>
    </ul>
  </div>

  <form ref="form" @submit.prevent="submit">
    <input type="text" :minlength="this.secretWord.length"  :maxlength="this.secretWord.length" v-model="answer"
      class="p-4 mt-8 flex justify-center items-center shadow-sm border-blue-500 focus:border-blue-500 block w-full sm:text-sm rounded-md"
      placeholder=""
    />
  </form>

  <div>
    <button @click="reveal" class="mt-4 text-sm text-underline text-blue-500 font-bold">Show hint</button>
    <p v-if="revealed" class="text-small">{{ this.secretWord }}</p>
  </div>

  <div>
    <button @click="reveal" class="mt-4 text-sm text-underline text-red-500 font-bold">Show answer</button>
    <p v-if="revealed" class="text-small">{{ this.secretWord }}</p>
  </div>

  <h2 v-show="isCorrect">CORRECT</h2>

</template>

<script>
import WordTile from './WordTile.vue'

export default {
  components: {
    WordTile
  },
  props: {
    word: {type: String, default: ''},
  },
  data() {
    return {
      answer: '',
      answers: [],
      revealed: false
    };
  },

  methods: {
    reveal() {
      this.revealed = !this.revealed
    },
    submit() {
      if (this.$refs.form.checkValidity()) {
        console.log('submit')
        this.answers.push({id: this.answers.count, value: this.answer.toUpperCase(), characters: this.answer.toUpperCase().split('')})
        this.answer = ''
      } else {
        this.$refs.form.reportValidity()
      }
      // console.log(this.$refs.scoreboard)
      this.$nextTick(() => {
        const scoreboard = this.$refs.scoreboard
        scoreboard.scrollTop = scoreboard.scrollHeight - scoreboard.clientHeight;
      })


    },
    check(answer) {
      let results = []
      let i = 0
      for(i=0; i<answer.value.length; i++){
        results.push({
          index: i,
          answerChar: answer.characters[i],
          wordChar: this.secretWord[i],
          correct: answer.value[i] === this.secretWord[i],
          exists: this.secretWord.split('').includes(answer.characters[i])
        })
      }
      // console.log(results)
      return results
    }
  },

  computed: {
    secretWord() {
      return this.word.toUpperCase()
    },
    lastGuess() {
      return this.answers[this.answers.length - 1]
    },
    isCorrect() {
      return this.lastGuess?.value.toUpperCase() === this.secretWord
    }
  }
}

</script>

<style>
::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
}
</style>
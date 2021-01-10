<template>

  <div v-show="playing" class="space-y-1 overflow-hidden overflow-y-auto max-h-96" id="scoreboard" ref="scoreboard">
    <ul v-if="answers.length === 0" class="flex items-center justify-center space-x-2">
      <li>
        <WordTile :value="this.secretWord[0]" :correct="true" :exists="true"/>
      </li>
      <li v-for="index in this.secretWord.length-1" :key="index">
        <WordTile value="." :correct="false" :exists="false"/>
      </li>
    </ul>
    <ul V-else v-for="answer in answers" :key="answer.id" class="flex items-center justify-center space-x-2">
      <li v-for="char in check(answer)" :key="char.index">
        <WordTile :value="char.answerChar" :correct="char.correct" :exists="char.exists" />
      </li>
    </ul>
  </div>

  <div class="mt-8">
    <form v-show="playing" ref="form" @submit.prevent="submit">
      <input id="input" ref="input" type="text"
        autofocus autocomplete="off"
        :minlength="this.secretWord.length"  :maxlength="this.secretWord.length" v-model="answer"
        class="tracking-widest text-2xl uppercase text-center p-4 justify-center items-center shadow-sm focus:outline-none border-blue-500 focus:border-blue-500 block w-full rounded-md"
        placeholder=""
      />
    </form>

    <button v-show="!playing" @click="start"
      type="button"
      class="uppercase items-center text-center px-6 py-3 border border-transparent text-2xl font-medium w-full rounded-md shadow-sm text-blue-500 bg-white hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
    Start
    </button>
  </div>

  <div v-show="playing" class="mt-4">
    <div class="flex md:justify-between">
      <div class="flex space-x-2">
        <span ref="timer" class="text-xs font-semibold py-1 px-5 flex uppercase rounded-full text-blue-500 bg-white text-center items-center justify-items-center">
          {{ time }}
        </span>

        <button @click="quitGame" ref="timer" class="text-xs font-semibold py-1 px-3 flex uppercase rounded-full focus:outline-none text-red-900 bg-red-300 text-center items-center justify-items-center">
          Quit
        </button>
      </div>
      <div class="flex space-x-2">
        <button @click="showHint" class="text-sm font-semibold inline-block py-1 px-3 focus:outline-none uppercase rounded-full text-yellow-700 bg-yellow-200">?</button>
        <button @click="reveal" class="text-sm font-semibold  inline-block py-1 px-3 focus:outline-none uppercase rounded-full text-red-600 bg-red-100">!</button>
      </div>
    </div>

    <div class="mt-4 text-white">
      <div v-if="needsHint">
        <!-- <p class="text-small">{{ this.remainingLetters }}</p> -->
        <!-- <p class="text-small">{{ definition }}</p> -->
        <p class="text-small">{{ example }}</p>
      </div>
      <p v-if="revealed" class="text-small">{{ this.secretWord }}</p>
    </div>
  </div>

  <h2 v-show="isCorrect" class="text-white">CORRECT</h2>

  <GameHistory :history="history" />

</template>

<script>
import Words from '../Words.js'
import WordTile from './WordTile.vue'
import { getDefinition } from '../Definition'
import GameHistory from './GameHistory.vue'

export default {
  components: {
    WordTile,
    GameHistory
  },
  props: {
    // word: {type: String, default: ''},
  },
  beforeMount() {
    this.getNewWord()
  },
  data() {
    return {
      word: '',
      playing: false,
      answer: '',
      answers: [],
      revealed: false,
      needsHint: false,
      definition: '',
      example: '',
      synonyms: '',
      history: [],
      time: 0,
      interval: null
    };
  },

  methods: {
    getNewWord() {
      this.word = Words[Math.floor(Math.random() * Words.length)]
    },
    start() {
      this.playing = true
      this.startTimer()
    },
    startTimer() {
      this.interval = setInterval(this.incrementTime, 1000);
    },
    incrementTime() {
      this.time = parseInt(this.time) + 1;
    },
    stopTimer() {
      clearInterval(this.interval);
    },
    completedGame() {
      this.saveGameHistory({
        id: (new Date()).getTime(),
        word: this.secretWord,
        attempts: this.answers.length,
        time: this.time,
        completed: true,
        })
      this.stopTimer()
      this.reset()
    },
    quitGame() {
      this.saveGameHistory({
        id: (new Date()).getTime(),
        word: this.secretWord,
        attempts: this.answers.length,
        time: this.time,
        completed: false,
        })
      this.stopTimer()
      this.reset()
    },
    reset() {
      this.getNewWord()
      this.answers = []
      this.time = 0
    },
    saveGameHistory(stats = {}) {
      this.history.push(stats)
    },
    reveal() {
      this.revealed = !this.revealed
    },
    async showHint() {
      if (this.needsHint) return this.needsHint = false
      const result = await getDefinition(this.word)
      this.definition = result.definition.replace(`${this.word}s`,'').replace(this.word,'')
      this.example = result.example.replace(`${this.word}s`,'').replace(this.word,'')
      this.synonyms = result.synonyms
      this.needsHint = !this.needsHint
    },
    submit() {
      if (this.$refs.form.checkValidity()) {
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
  watch: {
    word: async (newWord, oldWord) => {
      // console.log('getting definition...' + newWord + ', ' + oldWord)
      // let result = await getDefinition(newWord)
      // console.log(result)
      // this.definition = result.definition.replace(newWord,'[word]')
      // this.example = result.example.replace(newWord,'[word]')
      // this.synonyms = result.synonyms
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
      const isCorrect = this.lastGuess?.value.toUpperCase() === this.secretWord
      if (isCorrect){
        this.completedGame()
      }
      return isCorrect
    },
    remainingLetters() {
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      const used = this.answers.map(({characters}) => characters).flat()

      return alphabet.split('').filter(x => !used.includes(x));
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
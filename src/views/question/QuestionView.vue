<template>
  <div class="bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 min-h-screen flex items-center justify-center p-4">

    <div v-if="form && !quizCompleted" class="questions bg-white w-full max-w-2xl p-6 sm:p-8 rounded-3xl shadow-2xl border-4 border-yellow-300 transition-all duration-300">

      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl sm:text-4xl font-black text-purple-600 text-center w-full">
          🎮 Quiz! 🎉
        </h1>
      </div>
      
      <!--
      <HeaderComponent :title="currentQuestion.question" @returnTitle="currentQuestion.question = $event">
        <template #title>
          🎮 {{ currentQuestion.question }} 🎉 
        </template>
      </HeaderComponent>
      -->

      <p class="text-xl text-gray-800 mb-8 font-bold text-center min-h-[56px] bg-yellow-100 p-4 rounded-2xl border-2 border-yellow-300">
        {{ currentQuestion.question }}
      </p>

      <div class="space-y-4">
        <div v-for="option in currentQuestion.options" :key="option.id">
          <input 
            class="sr-only peer" 
            type="radio" 
            :id="option.id" 
            :name="currentQuestion.id"
            :value="option.id"
            v-model="selectedAnswer"
            :disabled="feedbackMessage !== ''"
          />
          <label 
            :for="option.id"
            :style="{ 
              '--option-color': option.color,
              'backgroundColor': option.color,
              'borderColor': option.color 
            }"
            class="block w-full p-6 text-white font-bold text-lg rounded-2xl transition-all duration-300 ease-in-out cursor-pointer
                   border-4 shadow-lg transform hover:scale-105 hover:shadow-xl
                   peer-disabled:cursor-not-allowed peer-disabled:opacity-70
                   peer-checked:scale-110 peer-checked:shadow-2xl peer-checked:ring-4 peer-checked:ring-yellow-400
                   peer-checked:animate-pulse"
          >
            <span class="drop-shadow-lg">{{ option.text }}</span>
          </label>
        </div>
      </div>

      <div class="mt-8 min-h-[3rem] flex items-center justify-center">
        <p v-if="feedbackMessage" :class="feedbackClass" class="text-2xl font-black transition-opacity duration-300 bg-white px-6 py-3 rounded-full shadow-lg border-4 border-yellow-400">
          {{ feedbackMessage }}
        </p>
      </div>

      <button 
        @click="checkAnswer" 
        :disabled="!selectedAnswer || feedbackMessage !== ''"
        class="w-full mt-6 py-4 px-6 text-white font-black text-xl rounded-2xl shadow-xl transition-all duration-300
               bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 
               disabled:bg-gradient-to-r disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed 
               transform hover:scale-105 active:scale-95 border-4 border-green-300
               focus:outline-none focus:ring-4 focus:ring-yellow-400"
      >
        🚀 Enviar Resposta! 🚀
      </button>
    </div>    
    
    <div v-if="quizCompleted" class="text-center bg-white p-10 rounded-3xl shadow-2xl border-4 border-rainbow bg-gradient-to-br from-yellow-100 to-pink-100">
      <h2 class="text-4xl font-black text-purple-600 mb-6">🎉 Quiz Finalizado! 🎉</h2>
      <p class="text-xl text-gray-800 mb-8 font-bold">🌟 Parabéns! Você completou o desafio! 🌟</p>
      <button @click="restartQuiz" 
              class="py-4 px-8 bg-gradient-to-r from-blue-400 to-purple-500 text-white font-black text-lg rounded-2xl 
                     shadow-xl hover:from-blue-500 hover:to-purple-600 transition-all duration-300 
                     transform hover:scale-105 active:scale-95 border-4 border-blue-300
                     focus:outline-none focus:ring-4 focus:ring-yellow-400">
        🔄 Jogar Novamente! 🎮
      </button>
    </div>

  </div>
</template>

<script>

import HeaderComponent from './component/header.vue';

export default {
  name: 'QuestionView',

  components: {
    HeaderComponent
  },

  data() {
    return {  
      form: null,
      currentQuestionIndex: 0,
      selectedAnswer: null,
      feedbackMessage: '',
      feedbackClass: '',
      quizCompleted: false,
    }
  },

  computed: {
    currentQuestion() {
      if(this.form && this.form.length > 0) {
        return this.form[this.currentQuestionIndex];
      }
      return null;
    }
  },

  methods:{

    fetchData(){
        this.form = [
        {
            "id": 1,
            "question": "Qual animal faz 'muuuuu' e nos dá leite?",
            "options": [
              {
                  "id": "A",
                  "text": "Cachorro",
                  "color_name": "Azul",
                  "color": "#4A90E2"
              },
              {
                  "id": "B",
                  "text": "Gato",
                  "color_name": "Verde",
                  "color": "#7ED321"
              },
              {
                  "id": "C",
                  "text": "Vaca",
                  "color_name": "Vermelho",
                  "color": "#D0021B"
              },
              {
                  "id": "D",
                  "text": "Leão",
                  "color_name": "Amarelo",
                  "color": "#F5A623"
              }
            ],
            "correctAnswer": "C"
        },
        {
            "id": 2,
            "question": "O que as abelhas fazem nas flores?",
            "options": [
              {
                  "id": "A",
                  "text": "Mel",
                  "color_name": "Azul",
                  "color": "#4A90E2"
              },
              {
                  "id": "B",
                  "text": "Leite",
                  "color_name": "Verde",
                  "color": "#7ED321"
              },
              {
                  "id": "C",
                  "text": "Ovos",
                  "color_name": "Vermelho",
                  "color": "#D0021B"
              },
              {
                  "id": "D",
                  "text": "Queijo",
                  "color_name": "Amarelo",
                  "color": "#F5A623"
              }
            ],
            "correctAnswer": "A"
        },
        {
            "id": 3,
            "question": "Teste",
            "options": [
              {
                  "id": "A",
                  "text": "aaa",
                  "color_name": "Azul",
                  "color": "#4A90E2"
              },
              {
                  "id": "B",
                  "text": "bbb",
                  "color_name": "Verde",
                  "color": "#7ED321"
              },
              {
                  "id": "C",
                  "text": "ccc",
                  "color_name": "Vermelho",
                  "color": "#D0021B"
              },
              {
                  "id": "D",
                  "text": "ddd",
                  "color_name": "Amarelo",
                  "color": "#F5A623"
              },
              {
                  "id": "E",
                  "text": "eee",
                  "color_name": "Preto",
                  "color": "#000000"
              }
            ],
            "correctAnswer": "E"
        }
      ]
    },

    checkAnswer(){
      if (!this.selectedAnswer) {
        this.feedbackMessage = 'Por favor, selecione uma resposta.';
        return;
      }
      if (this.selectedAnswer === this.currentQuestion.correctAnswer) {
        this.feedbackMessage = 'Resposta correta! 🎉';
        this.feedbackClass = 'text-green-500';
      } else {
        this.feedbackMessage = `Resposta incorreta!`;
        this.feedbackClass = 'text-red-500';
      }
      setTimeout(this.nextQuestion, 3000);
    },

    nextQuestion(){
      if (this.currentQuestionIndex < this.form.length - 1) {
        this.currentQuestionIndex++;
        this.resetState();
      } else {
        this.quizCompleted = true;
        this.feedbackMessage = 'Quiz concluído! Parabéns! 🎉';
        this.feedbackClass = 'text-blue-500';
      }
    },

    restartQuiz(){
      this.currentQuestionIndex = 0;
      this.quizCompleted = false;
      this.resetState();
    },

    resetState(){
      this.selectedAnswer = null;
      this.feedbackMessage = '';
      this.feedbackClass = '';
    }
  },
  mounted() {
    this.fetchData();
  }
}

</script>

<!--
<style scoped>
.crud {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

h1 {
  color: #333;
}

p {
  color: #666;
}
</style>
-->
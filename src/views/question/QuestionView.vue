<template>
  <div class="bg-gray-50 min-h-screen flex items-center justify-center p-4">

    <div v-if="form && !quizCompleted" class="questions bg-white w-full max-w-2xl p-8 rounded-lg shadow-lg border border-gray-200 transition-all duration-300">

      <div class="flex justify-between items-center mb-8">
        <h1 class="text-2xl sm:text-3xl font-semibold text-gray-800 text-center w-full">
          Quiz
        </h1>
      </div>

      <p class="text-lg text-gray-700 mb-8 text-center min-h-[56px] bg-gray-50 p-6 rounded-md border border-gray-100">
        {{ currentQuestion.question }}
      </p>

      <div class="space-y-3">
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
            class="block w-full p-4 text-gray-700 font-medium text-base rounded-md transition-all duration-200 ease-in-out cursor-pointer
                   border border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50
                   peer-disabled:cursor-not-allowed peer-disabled:opacity-50
                   peer-checked:bg-blue-50 peer-checked:border-blue-300 peer-checked:text-blue-800"
          >
            {{ option.text }}
          </label>
        </div>
      </div>

      <div class="mt-8 min-h-[3rem] flex items-center justify-center">
        <p v-if="feedbackMessage" :class="feedbackClass" class="text-lg font-medium transition-opacity duration-300 bg-gray-50 px-4 py-2 rounded-md border border-gray-200">
          {{ feedbackMessage }}
        </p>
      </div>

      <button 
        @click="checkAnswer" 
        :disabled="!selectedAnswer || feedbackMessage !== ''"
        class="w-full mt-6 py-3 px-6 text-white font-medium text-base rounded-md transition-all duration-200
               bg-blue-600 hover:bg-blue-700 
               disabled:bg-gray-400 disabled:cursor-not-allowed 
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Enviar Resposta
      </button>
    </div>    
    
    <div v-if="quizCompleted" class="text-center bg-white p-8 rounded-lg shadow-lg border border-gray-200">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">Quiz Finalizado</h2>
      <p class="text-lg text-gray-600 mb-6">Parabéns! Você completou o quiz.</p>
      <button @click="restartQuiz" 
              class="py-3 px-6 bg-blue-600 text-white font-medium text-base rounded-md 
                     hover:bg-blue-700 transition-all duration-200 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        Jogar Novamente
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
        this.feedbackMessage = 'Resposta correta!';
        this.feedbackClass = 'text-green-600';
      } else {
        this.feedbackMessage = 'Resposta incorreta.';
        this.feedbackClass = 'text-red-600';
      }
      setTimeout(this.nextQuestion, 3000);
    },

    nextQuestion(){
      if (this.currentQuestionIndex < this.form.length - 1) {
        this.currentQuestionIndex++;
        this.resetState();
      } else {
        this.quizCompleted = true;
        this.feedbackMessage = 'Quiz concluído!';
        this.feedbackClass = 'text-blue-600';
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
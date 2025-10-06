<template>
  <div class="bg-black-100 min-h-screen flex items-center justify-center p-4">

    <div class="absolute top-4 right-4">
      <Button>
          <router-link :to="{ name: 'registerquestions' }">Registrar Perguntas</router-link>
      </Button>
    </div>

    <div class="absolute top-20 right-4">
      <Button>
        <router-link :to="{ name: 'configuration' }">Adicionar Configuração</router-link>
      </Button>
    </div>

    <div v-if="quizState === 'in_progress'" class="bg-white w-full max-w-2xl p-6 sm:p-8 rounded-lg shadow-lg border border-gray-200">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-800">QUIZ</h1>
      </div>

      <div v-if="currentQuestion">
        <Card class="mb-6 border-none shadow-none">
          <template #content>
            <p class="text-lg text-white-700">{{ currentQuestion.question }}</p>
          </template>
        </Card>

        <div class="flex flex-col gap-4 mb-8">
          <div 
            v-for="(option, index) in currentQuestion.options" 
            :key="index" 
            class="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-300 transition-colors cursor-pointer"
            :class="{ 'bg-gray-500 border-gray-800 shadow-lg': selectedAnswer === option.text }"
            @click="selectedAnswer = option.text"
            :style="{ 'background-color': `#${alternativesConfig[index]?.color_hexadecimal}` }"
          >
            <RadioButton 
              v-model="selectedAnswer"  
              :inputId="'option' + index"
              name="quiz"
              :value="option.text" 
              class="sr-only"
            />
            <label 
              :for="'option' + index" 
              class="ml-3 text-gray-700 text-base font-medium w-full"
            >
              {{ option.text }}
            </label>
          </div>
        </div>

        <Button 
          @click="submitAnswer" 
          :disabled="!selectedAnswer" 
          label="Enviar Resposta" 
          class="w-full py-3" 
        />
      </div>
    </div>

    <div v-if="quizState === 'finished'" class="text-center bg-white p-8 rounded-lg shadow-lg border border-gray-200 w-full max-w-md">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">Quiz Finalizado!</h2>
      <p class="text-lg text-gray-600 mb-6">
        Sua pontuação foi: 
        <span class="font-bold text-blue-600">{{ score }} de {{ questions.length }}</span> acertos.
      </p>
      <Button @click="restartQuiz" label="Jogar Novamente" />
    </div>
    
  </div>
</template>

<script>
import axios from 'axios';

  const api = axios.create({
    baseURL: 'http://localhost:8992/api/quiz'
  });

  export default {
    name: 'QuestionView',

    data() {
      return {  
        quizState: 'loading', 
        questions: [],
        alternativesConfig: [], 
        currentQuestionIndex: 0,
        selectedAnswer: null,
        userAnswers: [],
        score: 0,
      }
    },

    computed: {
      currentQuestion() {
        return this.questions[this.currentQuestionIndex];
      }
    },

    mounted() {
      this.fetchQuiz();
    },

    methods: {

      fetchQuiz() {
        this.quizState = 'loading';
        api.get('/questoes')
          .then(response => {
            this.questions = response.data.data;
            this.alternativesConfig = response.data.alternatives_configuration;
            this.quizState = 'in_progress';
          })
          .catch(error => {
            console.error("Erro ao buscar as perguntas:", error);
          });
      },

      submitAnswer() {
        if (!this.selectedAnswer){
          return;
        }
        
        const selectedIndex = this.currentQuestion.options.findIndex(
            option => option.text === this.selectedAnswer
        );

        const selectedLetter = String.fromCharCode(65 + selectedIndex);

        const isAnswerCorrect = selectedLetter === this.currentQuestion.correctAnswer;

        this.userAnswers.push({
          question: this.currentQuestion.question,
          answer: this.selectedAnswer,
          isCorrect: isAnswerCorrect
        });

        if (this.currentQuestionIndex < this.questions.length - 1) {
          this.currentQuestionIndex++;
          this.selectedAnswer = null; 
        } else {
          this.finishQuiz();
        }
      },

      finishQuiz() {
        this.score = this.userAnswers.filter(answer => answer.isCorrect).length;
        this.quizState = 'finished';
      },

      restartQuiz() {
        this.quizState = 'loading';
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.selectedAnswer = null;
        this.userAnswers = [];
        this.score = 0;
        this.fetchQuiz(); 
      }
    },
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
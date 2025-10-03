<template>
  
  <div class="bg-black-50 min-h-screen flex items-center justify-center p-4">

    <div class="questions bg-white w-full max-w-2xl p-8 rounded-lg shadow-lg border border-gray-200 transition-all duration-300">

      <div class="flex justify-between items-center mb-8">
        <h1 class="text-2xl sm:text-3xl font-semibold text-gray-800 text-center w-full">
          QUIZ
        </h1>
      </div>

      <div v-if="currentQuestion" class="mb-6">
        <Card class="mb-6">
          <template #title>Pergunta {{ currentQuestionIndex + 1 }}</template>
          <template #content>
            {{ currentQuestion.question }}
          </template>
        </Card>
      </div>

      <div class="flex flex-wrap gap-4">
        <div v-for="(option, index) in currentQuestion.options" :key="index" class="flex items-center gap-2">
          
          <RadioButton 
            v-model="form.selectedAnswer"  
            :inputId="'option' + index"
            name="quiz"
            :value="option.text" 
          />

          <label :for="'option' + index">{{ option.text }}</label>

        </div>
      </div>

      <Button label="Enviar Resposta" />

    </div>

    <!--
    <div class="text-center bg-white p-8 rounded-lg shadow-lg border border-gray-200">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">Quiz Finalizado</h2>
      <p class="text-lg text-gray-600 mb-6">Parabéns! Você completou o quiz.</p>
      <button
              class="py-3 px-6 bg-blue-600 text-white font-medium text-base rounded-md 
                     hover:bg-blue-700 transition-all duration-200 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        Jogar Novamente
      </button>
    </div>
    -->
  </div>

</template>

<script>

//import { value } from '@primeuix/themes/aura/knob';
import HeaderComponent from './component/header.vue';

export default {
  name: 'QuestionView',

  components: {
    HeaderComponent
  },

  data() {
    return {  
      data: null,
      currentQuestionIndex: 0,
      form: {
        question: '',
        options: [],
        correctAnswer: null,
        name: '',
        color_hexadecimal: '',
      },
    }
  },

  computed: {
    currentQuestion() {
      if(this.data && this.currentQuestionIndex < this.data.length) {
        return this.data[this.currentQuestionIndex];
      }
      return null;
    }
  },

  mounted(){
    this.fetchQuiz();
  },

  methods:{

    fetchQuiz(){
      fetch('http://localhost:8992/api/quiz/questoes')
        .then(response => response.json())
        .then(data => {
          this.data = data.data;
        });
    },

    
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
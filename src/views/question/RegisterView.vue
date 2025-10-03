<template>
    <div class="container mx-auto p-4">

        <div class="absolute top-4 right-4">
            <Button>
                <router-link :to="{ name: 'configuration' }">Adicionar Configuração</router-link>
            </Button>
        </div>
        
        <div class="text-center mb-4 text-2xl font-bold">
            <h1>CONFIGURAR QUESTÕES</h1>
        </div>
        
        <div class="mb-4 text-left">
        <Button @click="newQuestion" label="Adicionar Questão" />
        </div>
        
        <DataTable :value="data" tableStyle="min-width: 50rem">
            <Column field="id" header="ID" />
            <Column field="question" header="Título" />
            <Column field="options" header="Alternativas">
                <template #body="slotProps">
                    <ul>
                        <li v-for="option in slotProps.data.options" :key="option.id">
                            {{ option.text }}
                        </li>
                    </ul>
                </template>
            </Column>
            <Column field="correctAnswer" header="Alternativa Correta" />
            <Column header="Ações" style="width: 8rem">
                <template #body="slotProps">
                    <Button icon="pi pi-pencil" @click="editQuestion(slotProps.data)" class="p-button-rounded p-button-success mr-2" />
                    <Button icon="pi pi-trash" @click="deleteQuestion(slotProps.data.id)" class="p-button-rounded p-button-danger" />
                </template>
            </Column>
        </DataTable>

        <Dialog v-model:visible="showForm" modal :header="isEditing ? 'Editar Questão' : 'Adicionar Questão'" :style="{ width: '25rem' }">
            <form>
                <div class="mb-6 mt-5">
                    <FloatLabel>
                        <InputText id="question" v-model="form.question" />
                        <label for="question">Título</label>
                    </FloatLabel>
                </div>

                <div class="mb-6">
                    <label for="correctAnswer"></label>
                    <Select v-model="form.correctAnswer" :options="alternativesOptions" optionLabel="name" placeholder="Alternativa correta" class="w-full md:w-56" />
                    <span style="color: red;"></span> 
                </div>
                <hr>
                <div class="mt-7 mb-6 flex flex-col gap-8">
                    <div v-for="(alternative, index) in alternativesOptions" :key="index" class="flex items-center">
                        <FloatLabel>
                            <InputText id="'alternative_' + index" v-if="form.options[index]" v-model="form.options[index].text" />
                            <label for="'alternative_' + index">Alternativa {{ alternative.name }}</label>
                        </FloatLabel>
                    </div>
                </div>
                <hr>
                <div class="mt-7 mb-6">
                    <label for="status"></label>
                    <Select v-model="form.status" :options="statusOptions" optionLabel="name" optionValue="value" placeholder="Selecione um Status" class="w-full md:w-56" />
                    <span style="color: red;"></span>

                </div>

                <div class="mt-10 flex justify-end gap-2">
                    <Button label="Cancelar" @click="showForm = false" class="p-button-secondary" />
                    <Button @click="addQuestion" :label="isEditing ? 'Atualizar' : 'Salvar'" />
                </div>
                
            </form>
        </Dialog>
    </div>
</template>

<script>
// import type { option } from '@primeuix/themes/aura/autocomplete';

    export default {
        name: "RegisterView",
        data(){
            return {
                data: [],
                showForm: false,
                isEditing: false,
                form: {
                    id: null,
                    question: '',
                    options: [],
                    correctAnswer: null,
                    status: '1'
                },
                alternativesOptions: [
                ],
                statusOptions: [
                    { name: 'Ativo', value: '1' },
                    { name: 'Inativo', value: '0' }
                ]
            }
        },

        mounted(){
            this.fetchQuestions();
        },

        methods: {

            fetchQuestions(){
                fetch('http://localhost:8992/api/quiz/questoes')
                .then(response => response.json())
                .then(data => {
                    this.data = data.data;
                    this.alternativesOptions = data.alternatives_configuration;
                });
            },

            newQuestion() {
                this.isEditing = false;
                this.resetForm(); 
                this.showForm = true;
            },

            editQuestion(questionData) {
                this.isEditing = true;
                this.form = JSON.parse(JSON.stringify(questionData));
                this.form.correctAnswer = this.alternativesOptions.find(alt => alt.name === questionData.correctAnswer);
                this.showForm = true;
                this.form.status = '1'
            },

            addQuestion() {

                if (!this.form.question || this.form.options.some(opt => !opt.text) || !this.form.correctAnswer) {
                    alert('Por favor, preencha todos os campos obrigatórios.');
                    return;
                }

                const alternativesObject = this.form.options.reduce((acc, option, index) => {
                    acc[index + 1] = { text: option.text };
                    return acc;
                }, {});

                const configData = {
                    name: this.form.question,
                    alternatives: alternativesObject,
                    correctAlternativeIndex: this.form.correctAnswer.name,
                    status: 1,
                };

                const url = this.isEditing 
                    ? `http://localhost:8992/api/quiz/questoes/${this.form.id}`
                    : 'http://localhost:8992/api/quiz/questoes';
                
                const method = this.isEditing ? 'PUT' : 'POST';

                console.log('Enviando JSON para a API (CORRIGIDO):', JSON.stringify(configData, null, 2));

                fetch(url, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(configData)
                })
                .then(response => {
                    if (!response.ok) {
                        response.json().then(err => console.error("Erro detalhado da API:", err));
                        throw new Error('Erro na requisição: ' + response.status);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("Sucesso:", data);
                    this.fetchQuestions();
                    this.showForm = false;
                })
                .catch(error => {
                    console.error('Erro ao processar configuração:', error);
                });
            },

            resetForm() {
                this.form = {
                    id: null,
                    question: '',
                    options: [],
                    correctAnswer: null,
                    status: '1'
                };

                this.alternativesOptions.forEach(() => {
                    this.form.options.push({ text: '' });
                });
            },

            deleteQuestion(id) {
                fetch(`http://localhost:8992/api/quiz/questoes/${id}`, {
                    method: 'DELETE'
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro na requisição: ' + response.status);
                    }
                    return response.json();
                })
                .then(data => {
                    this.fetchQuestions();
                    alert('Questão deletada com sucesso!');
                })
                .catch(error => {
                    console.error('Erro ao deletar questão:', error);
                    alert('Erro ao deletar questão. Tente novamente.');
                });
            }
        }
    };

</script>


<style>

</style>
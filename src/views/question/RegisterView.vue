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
            <Button @click="toggleForm" label="Adicionar Questão" />
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
                    <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" />
                    <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" />
                </template>
            </Column>
        </DataTable>

        <Dialog v-model:visible="showForm" modal header="Adicionar Questão" :style="{ width: '25rem' }">
            <form>
                <div class="mb-6 mt-5">
                    <FloatLabel>
                        <InputText id="title" v-model="form.title" />
                        <label for="title">Título</label>
                    </FloatLabel>
                </div>

                <div class="mb-6">
                    <label for="alternatives"></label>
                    <Select v-model="form.correct_alternative" :options="alternativesOptions" optionLabel="name" placeholder="Alternativa correta" class="w-full md:w-56" />
                    <span style="color: red;"></span> 
                </div>
                <hr>
                <div class="mt-7 mb-6">
                    <FloatLabel>
                        <InputText id="alternatives" v-model="form.alternatives" />
                        <label for="alternatives">Alternativa</label>
                    </FloatLabel>
                </div>
                <hr>

                <div class="mt-10 flex justify-end gap-2">
                    <Button label="Cancelar" @click="showForm = false" class="p-button-secondary" />
                    <Button label="Salvar" />
                </div>
                
            </form>
        </Dialog>
    </div>
</template>


<script>

    export default {
        name: "RegisterView",
        data(){
            return {
                data: null,
                showForm: false,
                form: {
                    title: '',
                    alternatives: [],
                    correct_alternative: null,
                    status: '1'
                },
                alternativesOptions: [
                    { name: 'A' },
                    { name: 'B' },
                    { name: 'C' },
                    { name: 'D' },
                ],
            }
        },

        mounted(){
            fetch('http://localhost:8992/api/quiz/questoes')
                .then(response => response.json())
                .then(data => {
                    this.data = data.data;
                });
        },

        methods: {
            toggleForm() {
                this.showForm = !this.showForm;
            },
            
        }

    };

</script>


<style>

</style>
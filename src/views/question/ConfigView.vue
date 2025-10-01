<template>
    <div class="container mx-auto p-4">

        <div class="absolute top-4 right-4">
            <Button>
                <router-link :to="{ name: 'registerquestions' }">Registrar Perguntas</router-link>
            </Button>
        </div>

        <div class="text-center mb-4 text-2xl font-bold">
            <h1>CONFIGURAR ALTERNATIVAS</h1>
        </div>

        <div class="mb-4 text-left">
            <Button @click="toggleForm" label="Adicionar Configuração" />
        </div>

        <DataTable :value="data">
            <Column field="id" header="ID" />
            <Column field="name" header="Nome" />
            <Column field="color_name" header="Nome da Cor" />
            <Column field="color_hexadecimal" header="Cor Hexadecimal" />
            <Column field="status" header="Status" />
            <Column header="Ações" style="width: 8rem">
                <template #body="slotProps">
                    <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" />
                    <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" />
                </template>
            </Column>
        </DataTable>

        <Dialog v-model:visible="showForm" modal header="Adicionar Configuração" :style="{ width: '25rem' }">
            <form>
                <div class="mb-6 mt-5">
                    <FloatLabel>
                        <InputText id="name" v-model="form.name" />
                        <label for="name">Nome</label>
                    </FloatLabel>
                </div>

                <div class="mb-6">
                    <FloatLabel>
                        <InputText id="color_name" v-model="form.color_name" />
                        <label for="color_name">Nome da Cor</label>
                    </FloatLabel>
                </div>

                <div class="mb-6">
                    <FloatLabel>
                        <InputText id="color_hexadecimal" v-model="form.color_hexadecimal" />
                        <label for="color_hexadecimal">Cor em Hexadecimal</label>
                    </FloatLabel>
                    <span style="color: red;"></span>
                </div>

                <div class="mb-6">
                    <label for="status"></label>
                    <Select v-model="form.status" :options="statusOptions" optionLabel="name" placeholder="Selecione um Status" class="w-full md:w-56" />
                    <span style="color: red;"></span>
                </div>

                <div class="mt-10 flex justify-end gap-2">
                    <Button label="Cancelar" @click="showForm = false" class="p-button-secondary" />
                    <Button @click="addConfiguration" label="Salvar" />
                </div>
            </form>
        </Dialog>
    </div>    

</template>

<script>

    export default {
        name: "ConfigView",

        data(){
            return {
                data: null,
                showForm: false,
                form: {
                    name: '',
                    color_name: '',
                    color_hexadecimal: '',
                    status: '1'
                }, 
                statusOptions: [
                    { name: 'Ativo', value: '1' },
                    { name: 'Inativo', value: '0' }
                ]
            }
        },
        
        mounted(){
            fetch('http://localhost:8992/api/quiz/configuracoes')
                .then(response => response.json())
                .then(data => {
                    this.data = data.data;
                });
        },
        
        methods: {
            toggleForm() {
                this.showForm = !this.showForm;
            },

            addConfiguration(){
                
            }
        }

    };

</script>


<style>

</style>
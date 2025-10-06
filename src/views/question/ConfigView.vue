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
            <Button @click="newConfiguration" label="Adicionar Configuração" />
        </div>

        <DataTable :value="data">
            <Column field="id" header="ID" />
            <Column field="name" header="Nome" />
            <Column field="color_name" header="Nome da Cor" />
            <Column field="color_hexadecimal" header="Cor Hexadecimal" />
            <Column field="status" header="Status" />
            <Column header="Ações" style="width: 8rem">
                <template #body="slotProps">
                    <Button icon="pi pi-pencil" @click="editConfiguration(slotProps.data)" class="p-button-rounded p-button-success mr-2" />
                    <Button icon="pi pi-trash" @click="deleteConfiguration(slotProps.data.id)" class="p-button-rounded p-button-danger" />
                </template>
            </Column>
        </DataTable>

        <Dialog v-model:visible="showForm" modal :header="isEditing ? 'Editar Configuração' : 'Adicionar Configuração'" :style="{ width: '25rem' }">
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

                <div class="mb-6 mt-12">
                    <FloatLabel>
                        <div class="flex items-center gap-2">
                            <ColorPicker v-model="form.color_hexadecimal" class="w-8 h-8" />
                            <InputText
                                id="color_hexadecimal"
                                v-model="form.color_hexadecimal"
                                placeholder="selecione uma cor"
                                class="w-32" disabled
                            />
                        </div>
                        <label for="color_hexadecimal">Cor em Hexadecimal</label>
                    </FloatLabel>
                    <span style="color: red;"></span>
                </div>

                <div class="mb-6">
                    <label for="status"></label>
                    <Select v-model="form.status" :options="statusOptions" optionLabel="name" optionValue="value" placeholder="Selecione um Status" class="w-full md:w-56" />
                    <span style="color: red;"></span>
                </div>

                <div class="mt-10 flex justify-end gap-2">
                    <Button label="Cancelar" @click="showForm = false" class="p-button-secondary" />
                    <Button @click="addConfiguration" :label="isEditing ? 'Atualizar' : 'Salvar'" />
                </div>
            </form>
        </Dialog>
    </div>    

</template>

<script>

import axios from 'axios';

    const api = axios.create({
        baseURL: 'http://localhost:8992/api/quiz'
    });

    export default {
        name: "ConfigView",

        data(){
            return {
                data: null,
                showForm: false,
                isEditing: false,
                form: {
                    id: null,
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
            this.fetchForm();
        },
        
        methods: {

            fetchForm() {
                api.get('/configuracoes')
                    .then(response => {
                        this.data = response.data.data;
                    })
                    .catch(error => {
                        console.error("Erro ao buscar configurações:", error);
                    });
            },

            newConfiguration() {
                this.isEditing = false;
                this.resetForm(); 
                this.showForm = true;
            },
            
            editConfiguration(configData) {
                this.isEditing = true;
                this.form = { ...configData }; 
                this.showForm = true;
                this.form.status = '1'
            },

            addConfiguration() {
                if (!this.form.name || !this.form.color_name || !this.form.color_hexadecimal) {
                    alert('Por favor, preencha todos os campos obrigatórios.');
                    return;
                }

                const configData = {
                    name: this.form.name,
                    color_name: this.form.color_name,
                    color_hexadecimal: this.form.color_hexadecimal,
                    status: this.form.status
                };

                const request = this.isEditing 
                    ? api.put(`/configuracoes/${this.form.id}`, configData) 
                    : api.post('/configuracoes', configData);             

                request
                    .then(response => {
                        this.fetchForm();
                        this.resetForm();
                        this.showForm = false;
                    })
                    .catch(error => {
                        console.error('Erro ao processar configuração:', error.response?.data || error.message);
                    });
            },

            resetForm() {
                this.form = {
                    id: null,
                    name: '',
                    color_name: '',
                    color_hexadecimal: '',
                    status: '1'
                };
            },

            deleteConfiguration(id) {
                api.delete(`/configuracoes/${id}`)
                    .then(response => {
                        this.fetchForm();
                    })
                    .catch(error => {
                        console.error('Erro ao deletar configuração:', error.response?.data || error.message);
                    });
            },
        },

    };

</script>


<style>

</style>
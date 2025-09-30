<template>
    <div>
        <h1>Cadastrar questões</h1>
    </div>
    
    <div>
        <button>NOVO</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Alternativas</th>
                        <th>Alternativa Correta</th>
                    </tr>
                </thead>
                <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td>

                            </td>
                            <td></td>
                            <td></td>
                            <td>
                                <button>EDITAR</button>
                                <button>EXCLUIR</button>
                            </td>
                        </tr>
                </tbody>
            </table>

                <h3>Editar Questão | Nova Questão</h3>
                <form>
                        <div style="color: green;"></div>
                        <div style="color: red;"></div>
                    <div>
                        <label for="title">Título da Questão:</label>
                        <input type="text" id="title">
                        <span style="color: red;"></span>
                    </div>

                    <hr>
                            
                    <div>
                        <label>Alternativa Correta:</label>
                        <select>
                            <option value="">Selecione...</option>
                                <option ></option>
                        </select>
                        <span style="color: red;"></span> 
                    </div>

                    <br>
                        <div>

                            <label>Alternativa:</label>
                            <input type="text">

                            <span style="color: red;"></span> 
                        </div>
                    <hr>

                    <button type="submit">Atualizar Questão | Salvar Questão</button>
                    <button type="button">Cancelar</button>
                    <br>
                </form>
    </div>
    
</template>


<script>

</script>


<style>

</style>
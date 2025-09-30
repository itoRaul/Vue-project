<template>
    <div>
        <h1>Configurar alternativas</h1>
    </div>

    <div>
        <button>NOVO</button>
    </div>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Nome da Cor</th>
                    <th>Cor Hexadecimal</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                        <button>Editar</button>
                        <button>Deletar</button>
                    </td>
                </tr>
                <tr>
                    <td>Nenhuma configuração encontrada.</td>
                </tr>
            </tbody>
        </table>

        <a>Adicionar questão</a>
        <div>
            <h4>Editar Configuração | Criar Nova Configuração</h4>

            <form>
                <div>
                    <label for="name">Nome</label>
                    <input type="text" id="name">
                    <span style="color: red;"></span> 
                </div>

                <div>
                    <label for="color_name">Nome da Cor</label>
                    <input type="text" id="color_name">
                    <span style="color: red;"></span>
                </div>

                <div>
                    <label for="color_hexadecimal">Cor em Hexadecimal</label>
                    <input type="text" id="color_hexadecimal">
                    <span style="color: red;"></span>
                </div>

                <div>
                    <label for="status">Status</label>
                    <select id="status">
                        <option value="1">Ativo</option>
                        <option value="0">Inativo</option>
                    </select>
                    <span style="color: red;"></span>
                </div>

                <div>
                    <button type="button">Cancelar</button>
                    <button type="submit">Salvar</button>
                </div>
            </form>
        </div>
    
</template>

<script>

</script>


<style>

</style>
<template>
  <div>
    <h4>Formulário para adicionar os pedidos</h4>

    <div>
      <form id="formulario-pedidos">
        <div class="input-container">
          <label for="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            v-model="nome"
            placeholder="Digite o nome do cliente"
          />
        </div>

        <div class="input-container">
          <label for="itemVendido">Item da venda: </label>
          <select name="itemVendido" id="itemVendido" v-model="itemVendido">
            <option value="">Selecione o item da venda</option>
            <option v-for="carne in carnes" :key="carne.id" :value="carne.tipo">
              {{ carne.tipo }}
            </option>
          </select>
        </div>

        <div class="input-container">
          <label for="valorVenda">Valor da venda:</label>
          <input
            type="text"
            id="valorVenda"
            name="valorVenda"
            v-model="valorVenda"
            placeholder="Digite o valor da venda"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormularioPedidos",
};
</script>

<style scoped>
#formulario-pedidos {
  max-width: 400px;
  margin: 0 auto;
}

.input-container {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}



label {
  font-weight: bold;
  margin-bottom: 15px;
  color: #222;
  padding: 5px 10px;
  border-left: 4px solid#f8af27;
}

input,
select {
  padding: 5px 10px;
  width: 300px;
}

.checkbox-container {
  display: flex;
  align-items: flex-start;
  width: 50%;
  margin-bottom: 20px;
}

.checkbox-container span,
.checkbox-container input {
  width: auto;
}

.checkbox-container span {
  margin-left: 6px;
  font-weight: bold;
}

.submit-btn {
  background-color: #222;
  color: #fcba03;
  font-weight: bold;
  border: 2px solid #222;
  padding: 10px;
  font-size: 16px;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.5s;
}

.submit-btn:hover {
  background-color: transparent;
  color: #222;
}
</style>

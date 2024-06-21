<template>
  <h1>Registro de pedidos</h1>
  <div>
    <div>
      <input v-model="nome" placeholder="Digite o nome do cliente" />
    </div>

    <div>
      <input v-model="item" placeholder="Digite o item da compra" />
    </div>

    <div>
      <input
        type="number"
        v-model="quantidade"
        placeholder="Selecione a quantidade"
      />
    </div>

    <button class="botao-enviar" @click="addPedido">Cadastrar Pedido</button>

    <div v-if="pedidos.length > 0" class="container-texto">
      <p>Lista de pedidos adicionados:</p>
      <ul style="padding-left: 0rem">
        <li v-for="(pedido, indice) in pedidos" :key="indice">
          <div class="container-clientes">
            <div>Nome: {{ pedido.nome }}</div>
            <div>item: {{ pedido.item }}</div>
            <div>Quantidade: {{ pedido.quantidade }}</div>

            <div class="botao-conteiner">
              <!-- Arrumar a função para editaPedido -->
              <button class="botao-editar" @click="editaCliente(indice)">
                Editar
              </button>
              <button class="botao-excluir" @click="excluiCliente(indice)">
                X
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nome: "",
      nomes: [],
      item: "",
      itens: [],
      quantidade: "",
      quantidades: [],
      pedidos: [],
    };
  },
  methods: {
    addPedido() {
      if (this.nome && this.item && this.quantidade) {
        const pedido = {
          nome: this.nome,
          item: this.item,
          quantidade: this.quantidade,
        };
        this.pedidos.push(pedido);

        //limpa os campos
        this.nome = "";
        this.item = "";
        this.quantidade = "";
      }
    },
    editaCliente(indice) {
      const pedido = this.pedidos[indice];
      this.nome = pedido.nome;
      this.item = pedido.item;
      this.quantidade = pedido.quantidade;
      this.pedidos.splice(indice, 1);
    },

    excluiCliente(indice) {
      this.pedidos.splice(indice, 1);
    },
  },
};
</script>
<style>
* {
  list-style: none;
}

#ul {
  padding-left: 0rem;
}

.container-clientes {
  border: 2px solid #d89d2f;
  /*align-items: flex-start;*/
  width: 50%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 7px;
}

.container-texto {
  margin-top: 20px;
  margin-top: 20px;
}

input {
  padding: 5px 10px;
  width: 300px;
  margin-bottom: 10px;
}

.botao-enviar {
  background-color: #222;
  color: #d89d2f;
  font-weight: bold;
  border: 2px solid #222;
  padding: 10px;
  font-size: 13px;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.5s;
  align-items: center;
}

.botao-enviar:hover {
  background-color: transparent;
  color: #222;
}

.botao-conteiner {
  display: flex;
  justify-content: flex-end;
}

.botao-excluir,
.botao-editar {
  cursor: pointer;
  padding: 5px;
  font-weight: bold;
  font-size: 13px;
  color: #fff;
  border: 1px solid #222;
}

.botao-excluir {
  background-color: rgb(238, 53, 53);
}
.botao-editar {
  margin-right: 10px;
  background-color: rgb(46, 182, 46);
}
</style>

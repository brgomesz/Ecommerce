<template >
  <h1>Cadastro de clientes</h1>
  <div >
    <div>
      <input v-model="nome" placeholder="Digite o nome do cliente" />
    </div>

    <div>
      <input v-model="cidade" placeholder="Digite a cidade do cliente" />
    </div>

    <div>
      <input v-model="telefone" placeholder="Digite o telefone do cliente" />
    </div>

    <button class="botao-enviar" @click="addCliente">Cadastrar cliente</button>

    <div class="container-texto">
      <p>O ultimo cliente adicionado foi: {{ nomeImpresso }}</p>
    </div>

    <div v-if="clientes.length > 0" class="container-texto" >
      <p>Lista de clientes adicionados:</p>
      <ul style="padding-left: 0rem">
        <li v-for="(cliente, indice) in clientes" :key="indice">
          <div class="container-clientes">
            <div>Nome: {{ cliente.nome }}</div>
            <div>Cidade: {{ cliente.cidade }}</div>
            <div>Telefone: {{ cliente.telefone }}</div>

            <div class="botao-conteiner">
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
      cidade: "",
      cidades: [],
      telefone: "",
      itens: [],
      clientes: [],
    };
  },
  methods: {
    addCliente() {
      if (this.nome && this.cidade && this.telefone) {
        const cliente = {
          nome: this.nome,
          cidade: this.cidade,
          telefone: this.telefone,
        };
        this.clientes.push(cliente);

        //passa a variável do nome para o 'nome impresso' para que seja impresso na string
        this.nomeImpresso = this.nome;

        //limpa os campos
        this.nome = "";
        this.cidade = "";
        this.telefone = "";
      }
    },
    editaCliente(indice) {
      const cliente = this.clientes[indice];
      this.nome = cliente.nome;
      this.cidade = cliente.cidade;
      this.telefone = cliente.telefone;
      this.clientes.splice(indice, 1);
    },

    excluiCliente(indice) {
      this.clientes.splice(indice, 1);
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

<!-- 
colocar dentro de: METHODS

async getCadastros() {
       const req = await fetch("http://localhost:3000/cadastros");
       const data = await req.json();

       this.nome = data.nome;
       this.cidade = data.cidade;
       this.item = data.item;
     },

     mounted () {
     this.getCadastros()
   }, -->

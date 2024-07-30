<script setup>
import { db } from "../firebase.js";
import {
  collection,
  getDocs,
  deleteDoc,
  addDoc,
  doc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { defineComponent, ref, onMounted, watchEffect } from "vue";
import Style from "../components/Style.vue";
import CadastroClientes from "../components/CadastroClientes.vue";
import FormularioAddEstoque from "../components/FormularioAddEstoque.vue";

//essa função carrega os clientes do DB
onMounted(async () => {
  let clienteCollection = await getDocs(collection(db, "cliente"));
  clienteCollection.forEach((cliente) => {
    clientes.value.push({ ...cliente.data(), id: cliente.id });
  });

  //carrega o estoque do DB
  let itemEstoqueCollection = await getDocs(collection(db, "itemEstoque"));
  itemEstoqueCollection.forEach((itemEstoque) => {
    estoque.value.push({ ...itemEstoque.data(), id: itemEstoque.id });
  });
});

//carrega as vendas

onMounted(async () => {
  let vendaCollection = await getDocs(collection(db, "venda"));
  vendaCollection.forEach((venda) => {
    vendas.value.push({ ...venda.data(), id: venda.id });
  });
});

//seção dos clientes cadastrados
const clientes = ref([]);
const clienteSelecionado = ref(null);
const cidade = ref("");
const telefone = ref("");
const nome = ref("");

function atualizarClienteExibido() {
  const cliente = clientes.value.find((c) => c.id === clienteSelecionado.value);
  if (cliente) {
    cidade.value = cliente.cidade;
    telefone.value = cliente.telefone;
    nome.value = cliente.nome;
  } else {
    cidade.value = "";
    telefone.value = "";
    nome.value = "";
  }
}

//Seção dos itens do estoque

const estoque = ref([]);
const itemSelecionado = ref(null);
const categoria = ref("");
const material = ref("");
const preço = ref("");
const quantidade = ref("");
const precoVenda = ref("");
const itemEstoque = ref("");

function atualizarItemExibido() {
  const itemEstoque = estoque.value.find((i) => i.id === itemSelecionado.value);
  if (itemEstoque) {
    categoria.value = itemEstoque.categoria;
    material.value = itemEstoque.material;
    preço.value = itemEstoque.preço;
    quantidade.value = itemEstoque.quantidade;
  } else {
    categoria.value = "";
    material.value = "";
    preço.value = "";
    quantidade.value = "";
  }
}
//
//seção do registro da venda
const quantidadeSelecionada = ref("");

async function deletaCadastro(id) {
  await deleteDoc(doc(db, "venda", id));
  showLoading();
}

//função desativada
async function editarElemento(id) {
  try {
    // Encontre o item no array estoque com base no ID
    const itemParaEditar = venda.value.find((venda) => venda.id === id);
    if (itemParaEditar) {
      // Atualize os campos do itemEstoque com os dados do item encontrado
      venda.value = { ...venda.value, ...itemParaEditar };
    } else {
      console.error("Item não encontrado para edição.");
    }
  } catch (error) {
    console.error("Erro ao editar o elemento:", error);
  }
}

const data = ref({});
const vendas = ref([]);
const venda = ref({
  cidade: "",
  cliente: "",
  itemEstoque: "",
  quantidade: "",
  preço: "",
  precoVenda: "",
});
const isNew = ref(true);
const show = ref(false);

async function registrarVenda() {
  if (
    clienteSelecionado.value &&
    itemSelecionado.value &&
    quantidadeSelecionada.value
  ) {
    const venda = {
      cliente: clienteSelecionado.value,
      itemEstoque: itemSelecionado.value,
      quantidade: quantidadeSelecionada.value,
    };
    const valorFinal = 0;

    console.log("Valor Final:", valorFinal);

    const estoqueAtualizado = quantidade.value - quantidadeSelecionada.value;

    if (estoqueAtualizado >= 0) {
      await addDoc(collection(db, "venda"), venda);
      await updateDoc(doc(db, "itemEstoque", itemSelecionado.value), {
        quantidade: estoqueAtualizado,
      });
      showLoading();
    } else {
      alert("Estoque insuficiente! A venda não foi registrada.");
    }
  }
}

function getClienteName(clienteId) {
  const cliente = clientes.value.find((c) => c.id === clienteId);
  return cliente ? cliente.nome : "Algo deu errado";
}

//função que carrega a categoria do item para ser lido pelo bloco da 'venda'
function getItem(itemId) {
  const itemEstoque = estoque.value.find((c) => c.id === itemId);
  return itemEstoque ? itemEstoque.categoria : "Algo deu errado";
}

//função para arrumar a coluna por ordem alfabética
function sortOptionsByProperty(property) {
  vendas.value.sort((optionA, optionB) => {
    optionA = optionA[property].toString().toLowerCase();
    optionB = optionB[property].toString().toLowerCase();

    if (optionA < optionB) {
      return -1;
    }
    if (optionA > optionB) {
      return 1;
    }
    return 0;
  });
}

//loading por 1 seg e atualiza a página
const isLoading = ref(false);
function showLoading() {
  isLoading.value = true;
  setTimeout(() => {
    location.reload();
  }, 1000);
}
</script>

<template>
  <div class="" :class="{ honeycomb: isLoading === true }">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
  <div v-if="show">
    <h2 class="titulo-cabeçalho">Registrar venda</h2>
    <div class="coluna-select-3">
      <div>
        <h5>Selecione o cliente</h5>
        <select
          class="area-input"
          v-model="clienteSelecionado"
          @change="atualizarClienteExibido"
        >
          <option
            v-for="cliente in clientes"
            :key="cliente.id"
            :value="cliente.id"
          >
            {{ cliente.nome }}
          </option>
        </select>
        <h5>Cliente: {{ nome }}</h5>
        <h5>Cidade: {{ cidade }}</h5>
        <h5>Telefone: {{ telefone }}</h5>
      <p></p>
      </div>
      <div>
        <h5>Selecione o item da venda</h5>
        <select
          class="area-input"
          v-model="itemSelecionado"
          @change="atualizarItemExibido"
        >
          <option
            v-for="itemEstoque in estoque"
            :key="itemEstoque.id"
            :value="itemEstoque.id"
          >
            {{ itemEstoque.categoria }}
          </option>
        </select>
        <h5>Categoria: {{ categoria }}</h5>
        <h5>Material: {{ material }}</h5>
        <h5>Preço: {{ preço }}</h5>
        <p></p>
      </div>
      <div>
        <h5>Selecione a quantidade vendida:</h5>
        <input
          class="area-input"
          v-model="quantidadeSelecionada"
          placeholder="Digite a quantidade"
        />
        <h5>Quantidade disponível: {{ quantidade }}</h5>
        <!-- <h5>Subtotal da venda:{{ preço * quantidade}}</h5> -->
      </div>
    </div>
    <button class="botao-enviar" @click="registrarVenda()">
      Registrar Venda
    </button>
    <div class="honeycomb"></div>
    <button
      class="botao-excluir"
      @click="show = false"
      style="margin-left: 10px"
    >
      Fechar
    </button>
  </div>
  <button v-if="!show" @click="show = true" class="botao-enviar">
    Nova venda
  </button>
  <div class="list-group">
    <div
      class="list-group-item"
      style="
        border-radius: 10px 10px 0 0;
        background-color: rgb(116, 135, 103);
        color: white;
        border: solid 0px;
        font-weight: bold;
      "
    >
      <div class="grid-container">
        <a @click="sortOptionsByProperty('cliente')">Nome</a>
        <a @click="sortOptionsByProperty('item')"> Item</a>
        <div>Quantidade</div>
      </div>
    </div>
  </div>

  <div class="list-group">
    <div v-for="venda in vendas" :key="venda.id">
      <div class="list-group-item list-group-item-action">
        <div class="grid-container">
          <div>{{ getClienteName(venda.cliente) }}</div>
          <div>{{ getItem(venda.itemEstoque) }}</div>
          <div>{{ venda.quantidade }} un</div>
          <!-- <div>R${{ venda.precoVenda }}</div> -->
          <div class="botao-container">
            <!-- <button
              class="botao-editar"
              @click="editarElemento(venda.id), (isNew = false)"
            >
              Editar
            </button> -->

            <button
              class="botao-excluir"
              @click.stop="deletaCadastro(venda.id)"
            >
              X
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormularioPedidos",
  components: {
    CadastroClientes,
    FormularioAddEstoque,
  },
};
</script>

<style scoped>
input {
  padding: 5px 10px;
  max-width: 180px;
  margin-bottom: 10px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
select {
  max-width: 180px;
}
h5 {
  font-size: 15px;
  color: rgb(133, 131, 131);
  margin-bottom: 0;
}

@media screen and (max-width: 860px) {
  .coluna-select-3 {
    display: grid;
    grid-template-columns: 1fr;
  }
}
</style>

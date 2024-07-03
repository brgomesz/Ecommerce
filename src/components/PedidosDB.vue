<script setup>
import { db } from "../firebase.js";
import { getDocs, collection, addDoc, doc } from "firebase/firestore";
import { ref, onMounted, defineComponent } from "vue";
import FormularioAddCliente from "../components/FormularioAddCliente.vue";
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

function atualizarItemExibido() {
  const itemEstoque = estoque.value.find((i) => i.id === itemSelecionado.value);
  if (itemEstoque) {
    categoria.value = itemEstoque.categoria;
    material.value = itemEstoque.material;
    preço.value = itemEstoque.preço;
  } else {
    categoria.value = "";
    material.value = "";
    preço.value = "";
  }
}

//seção do registro da venda
//obs: adicionar outros dados da venda, data, quantidade...)
const props = defineProps({
  data: Object,
});

const data = ref({});
const vendas = ref([]);
const venda = ref({
  cidade: "",
  cliente: "",
  itemEstoque: "",
});

async function registrarVenda() {
  if (clienteSelecionado.value && itemSelecionado.value) {
    const venda = {
      cliente: clienteSelecionado.value,
      itemEstoque: itemSelecionado.value,
    };

    await addDoc(collection(db, "venda"), venda).then((res) => {
      location.reload();
    });
    //addDoc(collection(db, "vendas"), venda)
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
</script>

<template>
  <div>
    <div class="container-clientes">
      <select v-model="clienteSelecionado" @change="atualizarClienteExibido">
        <option
          v-for="cliente in clientes"
          :key="cliente.id"
          :value="cliente.id"
        >
          {{ cliente.nome }}
        </option>
      </select>
      <div>Cliente: {{ nome }}</div>
      <div>Cidade: {{ cidade }}</div>
      <div>Telefone: {{ telefone }}</div>

      <select v-model="itemSelecionado" @change="atualizarItemExibido">
        <option
          v-for="itemEstoque in estoque"
          :key="itemEstoque.id"
          :value="itemEstoque.id"
        >
          {{ itemEstoque.categoria }}
        </option>
      </select>
      <div>Categoria: {{ categoria }}</div>
      <div>Material: {{ material }}</div>
      <div>Preço: {{ preço }}</div>
      <button @click="registrarVenda">Registrar Venda</button>
    </div>
    <div class="container-clientes" v-for="venda in vendas" :key="venda.id">
      <div>Cliente:{{ getClienteName(venda.cliente) }}</div>
      <div>Item:{{ getItem(venda.itemEstoque) }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PedidosDB",
  components: {
    FormularioAddCliente,
    FormularioAddEstoque,
  },
};
</script>

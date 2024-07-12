<script setup>
import { db } from "../firebase.js";
import {
  collection,
  getDocs,
  deleteDoc,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { defineComponent, ref, onMounted, watchEffect } from "vue";
import Style from "../components/Style.vue";

const props = defineProps({
  data: Object,
  isNew: Boolean,
});

defineComponent({
  name: "Vendas",
});

onMounted(() => {
  venda.value = { ...venda.value, ...props.data };
});

onMounted(async () => {
  let vendaCollection = await getDocs(collection(db, "venda"));
  vendaCollection.forEach((venda) => {
    venda.value.push({ ...venda.data(), id: venda.id });
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

async function addElemento() {
  if (isNew.value) {
    await addDoc(collection(db, "venda"), venda.value).then(location.reload());
  } else {
    await updateDoc(doc(db, "venda", venda.value.id), venda.value);

    location.reload();
  }
}

async function deletaCadastro(id) {
  await deleteDoc(doc(db, "venda", id));
  location.reload();
}

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
});
const isNew = ref(true);

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
  name: "Vendas",
  components: {
    FormularioAddCliente,
    FormularioAddEstoque,
  },
};
</script>

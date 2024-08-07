<script setup>
import { db } from "../firebase.js";
import {
  collection,
  getDocs,
  deleteDoc,
  addDoc,
  doc,
  updateDoc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { defineComponent, ref, onMounted } from "vue";
import Style from "../components/Style.vue";

const props = defineProps({
  data: Object,
  isNew: Boolean,
});

defineComponent({
  name: "CadastroClientes",
});

onMounted(() => {
  cliente.value = { ...cliente.value, ...props.data };
});

onMounted(async () => {
  let clienteCollection = await getDocs(collection(db, "cliente"));
  clienteCollection.forEach((cliente) => {
    clientes.value.push({ ...cliente.data(), id: cliente.id });
  });
});

const cliente = ref({
  nome: "",
  cidade: "",
  telefone: "",
});

async function addElemento() {
  if (isNew.value) {
    await addDoc(collection(db, "cliente"), cliente.value);
    showLoading();
  } else {
    await updateDoc(doc(db, "cliente", cliente.value.id), cliente.value);

    showLoading();
  }
}

async function deletaCadastro(id) {
  await deleteDoc(doc(db, "cliente", id));
  showLoading();
}

async function editarElemento(id) {
  try {
    // Encontre o item no array estoque com base no ID
    const itemParaEditar = clientes.value.find((item) => item.id === id);
    if (itemParaEditar) {
      // Atualize os campos do itemEstoque com os dados do item encontrado
      cliente.value = { ...cliente.value, ...itemParaEditar };
    } else {
      console.error("Item não encontrado para edição.");
    }
  } catch (error) {
    console.error("Erro ao editar o elemento:", error);
  }
}

const clientes = ref([]);
const show = ref(false);
const isNew = ref(true);

function sortOptionsByProperty(property) {
  clientes.value.sort((optionA, optionB) => {
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
  <h2 class="titulo-cabeçalho">Cadastro de clientes</h2>
    <div class="coluna-select-3">
      <div class="area-input">
        <h5>Nome:</h5>

        <input v-model="cliente.nome" placeholder="Digite o nome do cliente" />
      </div>
      <div class="area-input">
        <h5>Cidade:</h5>

        <input
          v-model="cliente.cidade"
          placeholder="Digite a cidade do cliente"
        />
      </div>

      <div class="area-input">
        <h5>Telefone:</h5>

        <input
          v-model="cliente.telefone"
          placeholder="Digite o telefone do cliente"
        />
      </div>
    </div>

    

    <div>
      <button class="botao-enviar" @click="addElemento(), (isNew = true)">
        {{ isNew ? "Cadastrar" : "Editar" }}
      </button>
      <button
        class="botao-excluir"
        @click="show = false"
        style="margin-left: 10px"
      >
        Fechar
      </button>
    </div>
  </div>
  <button v-if="!show" @click="show = true" class="botao-enviar">Novo cadastro</button>

  <div class="list-group">
    <div class="honeycomb"></div>
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
        <a @click="sortOptionsByProperty('nome')">Nome</a>
        <a @click="sortOptionsByProperty('cidade')">Cidade</a>
        <div>Telefone</div>
      </div>
    </div>
  </div>

  <div class="list-group">
    <div v-for="cliente in clientes" :key="cliente.id">
      <div class="list-group-item list-group-item-action">
        <div class="grid-container">
          <div aria-disabled="true" class="disabled">
            {{ cliente.nome }}
          </div>

          <div class="item">{{ cliente.cidade }}</div>

          <div class="item">{{ cliente.telefone }}</div>

          <div class="botao-container">
            <button
              class="botao-editar"
              @click="editarElemento(cliente.id), (isNew = false, show=true)"
            >
              Editar
            </button>

            <button
              class="botao-excluir"
              @click.stop="deletaCadastro(cliente.id)"
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
  name: "CadastroClientes",
};
</script>

<style scoped>
.container-texto {
  margin-top: 20px;
  margin-top: 20px;
}
h5 {
  font-size: 15px;
  color: rgb(133, 131, 131);
  margin-bottom: 0;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.barra-pesquisa {
  display: flex;
  justify-content: end;
  padding-bottom: 10px;
}

h5 {
  font-size: 15px;
  color: rgb(133, 131, 131);
  margin-bottom: 0;
}


@media screen and (max-width: 860px) {
  .list-group-item {
    padding-bottom: 40px;
  }
  .coluna-select-3 {
    display: grid;
    grid-template-columns:1fr;    
  }
}
</style>

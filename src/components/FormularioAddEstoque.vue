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
import { defineComponent, ref, onMounted } from "vue";
import Style from "../components/Style.vue";

const props = defineProps({
  data: Object,
  isNew: Boolean,
});

defineComponent({
  name: "FormularioAddEstoque",
});

onMounted(() => {
  itemEstoque.value = { ...itemEstoque.value, ...props.data };
});

//EstoqueDB
onMounted(async () => {
  let itemEstoqueCollection = await getDocs(collection(db, "itemEstoque"));
  itemEstoqueCollection.forEach((itemEstoque) => {
    estoque.value.push({ ...itemEstoque.data(), id: itemEstoque.id });
  });
});

const itemEstoque = ref({
  categoria: "",
  material: "",
  preço: "",
  quantidade: "",
});

//loading por 1 seg e atualiza a página
const isLoading = ref(false);
function showLoading() {
  isLoading.value = true;
  setTimeout(() => {
    location.reload();
  }, 1000);
}

async function addElemento() {
  if (isNew.value) {
    await addDoc(collection(db, "itemEstoque"), itemEstoque.value);
    showLoading();
  } else {
    await updateDoc(
      doc(db, "itemEstoque", itemEstoque.value.id),
      itemEstoque.value
    );
    showLoading();
  }
}
async function deletaCadastro(id) {
  await deleteDoc(doc(db, "itemEstoque", id));
  location.reload();
}

async function editarElemento(id) {
  try {
    // Encontre o item no array estoque com base no ID
    const itemParaEditar = estoque.value.find((item) => item.id === id);
    if (itemParaEditar) {
      // Atualize os campos do itemEstoque com os dados do item encontrado
      itemEstoque.value = { ...itemEstoque.value, ...itemParaEditar };
    } else {
      console.error("Item não encontrado para edição.");
    }
  } catch (error) {
    console.error("Erro ao editar o elemento:", error);
  }
}

//Funções do EstoqueDB abaixo:
const estoque = ref([]);
const show = ref(false);
const data = ref({});
const isNew = ref(true);

//função para alternar a exibição do formulário
console.log("Variavel", show);

//função para arrumar a coluna por ordem alfabética
function sortOptionsByProperty(property) {
  estoque.value.sort((optionA, optionB) => {
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
    <h2 class="titulo-cabeçalho">Cadastro do estoque</h2>
    <div>
      <div class="coluna-input coluna-select-2">
        <div class="area-input">
          <h5>Item:</h5>
          <input
            v-model="itemEstoque.categoria"
            placeholder="Descrição do item"
          />
        </div>

        <div class="area-input">
          <h5>Categoria:</h5>
          <input
            v-model="itemEstoque.material"
            placeholder="Categoria do item"
          />
        </div>

        <div class="area-input">
          <h5>Quantidade:</h5>
          <input
            type="number"
            v-model="itemEstoque.quantidade"
            placeholder="Quantidade adicionada"
          />
        </div>
        <div class="area-input">
          <h5>Preço:</h5>
          <input v-model="itemEstoque.preço" placeholder="Preço unitário" />
        </div>
      </div>

      <div class="honeycomb"></div>

      <div>
        <button class="botao-enviar" @click="addElemento(), (isNew = true)">
          {{ isNew ? "Cadastrar" : "Editar" }}
        </button>
        <button class="botao-excluir" @click="show = false" style="margin-left:10px;">Fechar</button>
      </div>
    </div>
    <!-- Fazer uma logica: quando aperto editar> ifNew = false, esconde o botão de adicionar e mostra o de editar, if = true, inverte -->
    
  </div>
  <button v-if="!show" @click="show = true" class="botao-enviar">Novo cadastro</button>

  <!-- Adição do EstoqueDB abaixo -->

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
        <a @click="sortOptionsByProperty('categoria')">Item</a>
        <a @click="sortOptionsByProperty('material')">Categoria</a>
        <a @click="sortOptionsByProperty('quantidade')">Quantidade</a>
        <a @click="sortOptionsByProperty('preço')">Preço</a>
      </div>
    </div>
  </div>

  <div class="list-group">
    <div v-for="itemEstoque in estoque" :key="itemEstoque.id">
      <div
        class="list-group-item list-group-item-action"
        :class="{ 'estoque-zero': itemEstoque.quantidade === 0 }"
      >
        <div class="grid-container">
          <div class="item">{{ itemEstoque.categoria }}</div>
          <div class="item">{{ itemEstoque.material }}</div>
          <div class="item">{{ itemEstoque.quantidade }} un</div>
          <div class="item">R$:{{ itemEstoque.preço }}</div>

          <div class="botao-container">
            <button
              class="botao-editar"
              @click="editarElemento(itemEstoque.id), (isNew = false, show=true)"
            >
              Editar
            </button>

            <button
              class="botao-excluir"
              @click.stop="deletaCadastro(itemEstoque.id)"
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
  name: "FormularioAddEstoque",
};
</script>

<style scoped>
.estoque-zero {
  background-color: rgba(255, 0, 0, 0.452);
}
.estoque-zero:hover {
  background-color: rgba(255, 0, 0, 0.712);
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

h3 {
  color: gray;
  font-size: 15px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.cabecalho-tabela {
  background-color: rgb(116, 135, 103);
  color: white;
}

.linhas-estoque.zero {
  color: red;
}

h5 {
  font-size: 15px;
  color: rgb(133, 131, 131);
  margin-bottom: 0;
}
</style>

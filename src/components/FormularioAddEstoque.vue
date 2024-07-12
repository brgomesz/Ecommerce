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

async function addElemento() {
  if (isNew.value) {
    await addDoc(collection(db, "itemEstoque"), itemEstoque.value).then(
      location.reload()
    );
  } else {
    await updateDoc(
      doc(db, "itemEstoque", itemEstoque.value.id),
      itemEstoque.value
    );

    location.reload();
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

//função para arrumar a coluna por ordem alfabética
function sortOptionsByProperty(property)  {
	estoque.value.sort((optionA, optionB) => {
		optionA = optionA[property].toString().toLowerCase();
		optionB = optionB[property].toString().toLowerCase();

		if (optionA < optionB) {
			return -1;
		}
		if (optionA > optionB) {
			return 1;
		}
		return 0;
	});
}
</script>

<template>
  <div>
    <div class="coluna-input coluna-select-2">
      <div class="area-input">
        <h5>Categoria:</h5>
        <input
          v-model="itemEstoque.categoria"
          placeholder="Digite a categoria do item"
        />
      </div>

      <div class="area-input">
        <h5>Material:</h5>
        <input
          v-model="itemEstoque.material"
          placeholder="Digite o material do item"
        />
      </div>

      <div class="area-input">
        <h5>Quantidade:</h5>
        <input
          type="number"
          v-model="itemEstoque.quantidade"
          placeholder="Digite a quantidade adicionada"
        />
      </div>
      <div class="area-input">
        <h5>Preço:</h5>
        <input
          v-model="itemEstoque.preço"
          placeholder="Digite o preço do item"
        />
      </div>
    </div>

    <div>
      <button class="botao-enviar" @click="addElemento(), (isNew = true)">
        {{ isNew ? "Adicionar" : "Editar" }}
      </button>
    </div>

    <!-- Fazer uma logica: quando aperto editar> ifNew = false, esconde o botão de adicionar e mostra o de editar, if = true, inverte -->
  </div>

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
        <a @click="sortOptionsByProperty('categoria')">Categoria</a>
        <a @click="sortOptionsByProperty('material')">Material</a>
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
              @click="editarElemento(itemEstoque.id), (isNew = false)"
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

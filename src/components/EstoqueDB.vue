<script setup>
import { db } from "../firebase.js";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { ref, onMounted } from "vue";
import FormularioAddEstoque from "../components/FormularioAddEstoque.vue";

//constante onde os 'itemEstoque' estão contidos
const estoque = ref([]);

const show = ref(false);

const data = ref({});

const isNew = ref(true);

onMounted(async () => {
  let itemEstoqueCollection = await getDocs(collection(db, "itemEstoque"));
  itemEstoqueCollection.forEach((itemEstoque) => {
    estoque.value.push({ ...itemEstoque.data(), id: itemEstoque.id });
  });
});

function toggleComponent(docData = {}, isNewDoc = true) {
  data.value = docData;
  isNew.value = isNewDoc;
  show.value = !show.value;
}

async function deletaCadastro(id) {
  await deleteDoc(doc(db, "itemEstoque", id));
  location.reload();
}
</script>

<template>
  <div>
    <FormularioAddEstoque
      @close="toggleComponent"
      v-if="show"
      :data="data"
      :isNew="isNew"
    ></FormularioAddEstoque>

    <button class="botao-enviar" @click="toggleComponent()" v-if="!show">
      Adicionar novo item
    </button>

    <div class="cabeçalho">
      <div>Categoria</div>
      <div>Material</div>
      <div>Preço</div>
    </div>

    <!-- 
    
    <ul class="list-group">
  <li class="list-group-item">An item</li>
  <li class="list-group-item">A second item</li>
  <li class="list-group-item">A third item</li>
  <li class="list-group-item">A fourth item</li>
  <li class="list-group-item">And a fifth one</li>
</ul>
 -->

    <div class="container-lista-margem">
      <div
        class="container-lista"
        v-for="itemEstoque in estoque"
        :key="itemEstoque.id"
        @click="toggleComponent(itemEstoque, false)"
      >
        <div class="grid-container">
          <div class="item">{{ itemEstoque.categoria }}</div>
          <div class="item">{{ itemEstoque.material }}</div>
          <div class="item">R$:{{ itemEstoque.preço }}</div>
        </div>

        <div class="botao-container">
          <div class="botao-editar">Editar</div>
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
</template>

<script>
export default {
  name: "EstoqueDB",
  components: {
    FormularioAddEstoque,
  },
  methods: {
    editarCadastro(id) {
      this.$emit("editar-item", id);
    },
  },
};
</script>

<style>
.container-lista {
  border: solid rgba(128, 128, 128, 0.212) 2px;
  margin-bottom: 10px;
  padding: 10px;
  width: 80%;
  height: 40px;
  position: relative;
}

.container-lista-margem :hover {
  background-color: rgba(128, 128, 128, 0.212);
}

.grid-container :hover,
.container-lista :hover {
  background-color: transparent;
}

.container-categorias {
  display: flex;
  justify-content: space-between; /* Distribui os cards igualmente */
  flex-wrap: wrap;
  width: 60%;
}

.container-header-tabela {
  width: 80%;
  background-color: rgba(128, 128, 128, 0.212);
  padding-left: 10px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.cabeçalho {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 100px;
}
</style>

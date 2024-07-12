<script setup>
import { db } from "../firebase.js";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { ref, onMounted } from "vue";
import FormularioAddEstoque from "../components/FormularioAddEstoque.vue";
import Style from "../components/Style.vue";

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

    <div class="list-group">
      <div
        v-for="itemEstoque in estoque"
        :key="itemEstoque.id"
        @click="toggleComponent(itemEstoque, false)"
      >
        <div class="grid-container list-group-item list-group-item-action">
          <div aria-disabled="true" class="disabled">
            {{ itemEstoque.categoria }}
          </div>
          <div class="item">{{ itemEstoque.material }}</div>
          <div class="item">R$:{{ itemEstoque.preço }}</div>

          <!-- adição de botão abaixo 
          <div
            class="btn-group-vertical"
            role="group"
            aria-label="Vertical button group"
          >
            <button type="button" class="btn btn-primary">Button</button>
            <button type="button" class="btn btn-primary">Button</button>
            <div class="btn-group" role="group">
              <button
                type="button"
                class="btn btn-primary dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Dropdown link</a></li>
                <li><a class="dropdown-item" href="#">Dropdown link</a></li>
              </ul>
            </div>
            <div class="btn-group dropstart" role="group">
              <button
                type="button"
                class="btn btn-primary dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Dropdown link</a></li>
                <li><a class="dropdown-item" href="#">Dropdown link</a></li>
              </ul>
            </div>
            <div class="btn-group dropend" role="group">
              <button
                type="button"
                class="btn btn-primary dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Dropdown link</a></li>
                <li><a class="dropdown-item" href="#">Dropdown link</a></li>
              </ul>
            </div>
            <div class="btn-group dropup" role="group">
              <button
                type="button"
                class="btn btn-primary dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Dropdown link</a></li>
                <li><a class="dropdown-item" href="#">Dropdown link</a></li>
              </ul>
            </div>
          </div>

           adição de botão acima -->

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

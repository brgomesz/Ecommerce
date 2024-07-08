ima<script setup>
import { db } from "../firebase.js";
import { collection, getDocs, deleteDocs, addDoc, doc, updateDoc } from "firebase/firestore";
import { defineComponent, ref, onMounted } from "vue";
const props = defineProps({
  data: Object,
  isNew: Boolean,
});

defineComponent({
  name: "FormularioAddEstoque",
});

const emits = defineEmits(["close"]);

onMounted(() => {
  itemEstoque.value = { ...itemEstoque.value, ...props.data };
});

const itemEstoque = ref({
  categoria: "",
  material: "",
  preço: "",
});

async function addEditar() {
  if (props.isNew) {
    await addDoc(collection(db, "itemEstoque"), itemEstoque.value).then(
      (res) => {
        emits("close");
        location.reload();
      }
    );
  } else {
    await updateDoc(
      doc(db, "itemEstoque", props.data.id),
      itemEstoque.value
    ).then((res) => {
      emits("close");
      location.reload();
    });
  }
}
</script>

<template>
  <h3>Formulário</h3>
  <div>
    <div>
      <input
        v-model="itemEstoque.categoria"
        placeholder="Digite a categoria do item"
      />
    </div>

    <div>
      <input
        v-model="itemEstoque.material"
        placeholder="Digite o material do item"
      />
    </div>

    <div>
      <input v-model="itemEstoque.preço" placeholder="Digite o preço do item" />
    </div>
    <button class="botao-fechar-editar" @click="addEditar()">
      {{ isNew ? "Adicionar" : "Editar" }}
    </button>
    <button class="botao-fechar-editar" @click="emits('close')">Fechar</button>
  </div>
</template>

<style>
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

h3{
    color:gray;
    font-size: 15px;
}
</style>


<!-- EDIÇAO 2.0 ABAIXO -->

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

// const emits = defineEmits(["close"]);

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
});

async function addEditar() {
  if (props.isNew) {
    await addDoc(collection(db, "itemEstoque"), itemEstoque.value).then(
      (res) => {
        emits("close");
        location.reload();
      }
    );
  } else {
    await updateDoc(
      doc(db, "itemEstoque", props.data.id),
      itemEstoque.value
    ).then((res) => {
      emits("close");
      location.reload();
    });
  }
}

//Funções do EstoqueDB abaixo:
const estoque = ref([]);
const show = ref(false);
const data = ref({});
const isNew = ref(true);



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
  <h3>Formulário</h3>
  <div>
    <div>
      <input
        v-model="itemEstoque.categoria"
        placeholder="Digite a categoria do item"
      />
    </div>

    <div>
      <input
        v-model="itemEstoque.material"
        placeholder="Digite o material do item"
      />
    </div>

    <div>
      <input v-model="itemEstoque.preço" placeholder="Digite o preço do item" />
    </div>
    <button class="botao-fechar-editar" @click="addEditar()">
      {{ isNew ? "Adicionar" : "Editar" }}
    </button>
    <button class="botao-fechar-editar" @click="emits('close')">Fechar</button>
  </div>

  <!-- Adição do EstoqueDB abaixo -->
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
  name: "FormularioAddEstoque",
};
</script>

<style>
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
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.cabeçalho {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 100px;
}
</style>

<!-- VERSÃO 3.0 FUNCIONANDO - EDITAR SEM SOBREPOR -->


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
});



async function addElemento() {
  await addDoc(collection(db, "itemEstoque"), itemEstoque.value).then(
    location.reload()
  );
}

async function deletaCadastro(id) {
  await deleteDoc(doc(db, "itemEstoque", id));
  location.reload();
}

//não funciona por enquanto
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
</script>

<template>
  <h3>Formulário</h3>
  <div>
    <div>
      <input
        v-model="itemEstoque.categoria"
        placeholder="Digite a categoria do item"
      />
    </div>

    <div>
      <input
        v-model="itemEstoque.material"
        placeholder="Digite o material do item"
      />
    </div>

    <div>
      <input v-model="itemEstoque.preço" placeholder="Digite o preço do item" />
    </div>

    <div>
      <button class="botao-enviar" @click="addElemento()">
        Adicionar Elemento
      </button>
    </div>

    <!-- Fazer uma logica: quando aperto editar> ifNew = false, esconde o botão de adicionar e mostra o de editar, if = true, inverte -->
  </div>

  <!-- Adição do EstoqueDB abaixo -->

  <div class="cabeçalho">
    <div>Categoria</div>
    <div>Material</div>
    <div>Preço</div>
  </div>

  <div class="list-group">
    <div
      v-for="itemEstoque in estoque"
      :key="itemEstoque.id"
    >
      <div class="list-group-item list-group-item-action">
        <div class="grid-container">
          <div aria-disabled="true" class="disabled">
            {{ itemEstoque.categoria }}
          </div>
          <div class="item">{{ itemEstoque.material }}</div>
          <div class="item">R$:{{ itemEstoque.preço }}</div>
          <div class="botao-container">
            <button class="botao-editar" @click="editarElemento(itemEstoque.id)">Editar</button>


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

<style>
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
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.cabeçalho {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 100px;
}
</style>

<!-- ULTIMA VERSÃO FUNCIONANDO OK -->


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
});

async function addElemento() {
  if ((isNew.value)) {
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
//tenho que arrumar isso aqui
async function deletaCadastro(id) {
  await deleteDoc(doc(db, "itemEstoque", id));
  location.reload();
}

//não funciona por enquanto
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
</script>

<template>
  <h3>Formulário</h3>
  <div>
    <div>
      <input
        v-model="itemEstoque.categoria"
        placeholder="Digite a categoria do item"
      />
    </div>

    <div>
      <input
        v-model="itemEstoque.material"
        placeholder="Digite o material do item"
      />
    </div>

    <div>
      <input v-model="itemEstoque.preço" placeholder="Digite o preço do item" />
    </div>

    <div>
      <button class="botao-enviar" @click="addElemento(), (isNew = true)">
        {{ isNew ? "Adicionar" : "Editar" }}
      </button>
    </div>

    <!-- Fazer uma logica: quando aperto editar> ifNew = false, esconde o botão de adicionar e mostra o de editar, if = true, inverte -->
  </div>

  <!-- Adição do EstoqueDB abaixo -->

  <div class="cabeçalho">
    <div>Categoria</div>
    <div>Material</div>
    <div>Preço</div>
  </div>

  <div class="list-group">
    <div v-for="itemEstoque in estoque" :key="itemEstoque.id">
      <div class="list-group-item list-group-item-action">
        <div class="grid-container">
          <div aria-disabled="true" class="disabled">
            {{ itemEstoque.categoria }}
          </div>
          <div class="item">{{ itemEstoque.material }}</div>
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

<style>
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
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.cabeçalho {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 100px;
}
</style>

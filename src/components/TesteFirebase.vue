<script setup>
import { db } from "../firebase.js";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { ref, onMounted } from "vue";
import AddEditar from "../components/AddEditar.vue";

const testes = ref([]);

const show = ref(false);

const data = ref({});

const isNew = ref(true);

onMounted(async () => {
  let testedbCollection = await getDocs(collection(db, "testedb"));
  testedbCollection.forEach((testedb) => {
    testes.value.push({ ...testedb.data(), id: testedb.id });
  });
});

function toggleComponent(docData = {}, isNewDoc = true) {
  data.value = docData;
  isNew.value = isNewDoc;
  show.value = !show.value;
  
}

async function deletaCadastro(id) {
  await deleteDoc(doc(db, "testedb", id));
  location.reload();
}
</script>

<template>
  <div>
    <AddEditar
      @close="toggleComponent"
      v-if="show"
      :data="data"
      :isNew="isNew"
    ></AddEditar>
    <button @click="toggleComponent()">Addicionar novo cliente</button>
    <div
      v-for="testedb in testes"
      :key="testedb.id"
      @click="toggleComponent(testedb, false)"
    >
      <div>Nome: {{ testedb.nome }}</div>
      <div>Cidade: {{ testedb.cidade }}</div>
      <div>Telefone: {{ testedb.telefone }}</div>
      <button @click.stop="deletaCadastro(testedb.id)">Deletar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TesteFirebase",
  components: {
    AddEditar,
  },
};
</script>

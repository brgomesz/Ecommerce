<script setup>
import { db } from "../firebase.js";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { ref, onMounted } from "vue";
import FormularioAddCliente from "../components/FormularioAddCliente.vue";

//constante onde os 'Cliente' estão contidos
const clientes = ref([]);

const show = ref(false);

const data = ref({});

const isNew = ref(true);

onMounted(async () => {
  let clienteCollection = await getDocs(collection(db, "cliente"));
  clienteCollection.forEach((cliente) => {
    clientes.value.push({ ...cliente.data(), id: cliente.id });
  });
});

function toggleComponent(docData = {}, isNewDoc = true) {
  data.value = docData;
  isNew.value = isNewDoc;
  show.value = !show.value;
}

async function deletaCadastro(id) {
  await deleteDoc(doc(db, "cliente", id));
  location.reload();
}
</script>

<template>
  <div>
    <FormularioAddCliente
      @close="toggleComponent"
      v-if="show"
      :data="data"
      :isNew="isNew"
    ></FormularioAddCliente>

    <button class="botao-enviar" @click="toggleComponent()" v-if="!show">
      Adicionar novo cliente
    </button>
    <div
      class="container-clientes"
      v-for="cliente in clientes"
      :key="cliente.id"
      @click="toggleComponent(cliente, false)"
    >
      <div>Nome: {{ cliente.nome }}</div>
      <div>Cidade: {{ cliente.cidade }}</div>
      <div>Telefone: {{ cliente.telefone }}</div>

      <div class="botao-conteiner">
        <div class="botao-editar">Editar</div>
        <button class="botao-excluir" @click.stop="deletaCadastro(cliente.id)">
          X
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClientesDB",
  components: {
    FormularioAddCliente,
  },
};
</script>

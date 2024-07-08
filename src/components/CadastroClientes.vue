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
import { defineComponent, ref, onMounted,} from "vue";
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
    await addDoc(collection(db, "cliente"), cliente.value).then(
      location.reload()
    );
  } else {
    await updateDoc(doc(db, "cliente", cliente.value.id), cliente.value);

    location.reload();
  }
}

async function deletaCadastro(id) {
  await deleteDoc(doc(db, "cliente", id));
  location.reload();
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
const data = ref({});
const isNew = ref(true);

</script>

<template>
  <div>
    <div>
      <input v-model="cliente.nome" placeholder="Digite o nome do cliente" />
    </div>

    <div>
      <input
        v-model="cliente.cidade"
        placeholder="Digite a cidade do cliente"
      />
    </div>

    <div>
      <input
        v-model="cliente.telefone"
        placeholder="Digite o telefone do cliente"
      />
    </div>

    <div>
      <button class="botao-enviar" @click="addElemento(), (isNew = true)">
        {{ isNew ? "Adicionar" : "Editar" }}
      </button>
    </div>
  </div>

 

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
        <div>Nome</div>
        <div>Cidade</div>
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
              @click="editarElemento(cliente.id), (isNew = false)"
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

<style>
.container-texto {
  margin-top: 20px;
  margin-top: 20px;
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
</style>

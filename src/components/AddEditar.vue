<script setup>
import { defineComponent, ref, onMounted } from "vue";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.js";
const props = defineProps({
  data: Object,
  isNew: Boolean,
});

defineComponent({
  name: "AddEditar",
});

const emits = defineEmits(["close"]);

onMounted(() => {
  testedb.value = { ...testedb.value, ...props.data };
});

const testedb = ref({
  nome: "",
  cidade: "",
  telefone: "",
});

async function addEditar() {
  if (props.isNew) {
    await addDoc(collection(db, "testedb"), testedb.value).then((res) => {
      emits("close");
      location.reload();
    });
  } else {
    await updateDoc(doc(db, "testedb", props.data.id), testedb.value).then(
      (res) => {
        emits("close");
        location.reload();
      }
    );
  }
}
</script>

<template>
  <h1>Cadastro de clientes</h1>
  <div>
    <div>
      <input v-model="testedb.nome" placeholder="Digite o nome do cliente" />
    </div>

    <div>
      <input
        v-model="testedb.cidade"
        placeholder="Digite a cidade do cliente"
      />
    </div>

    <div>
      <input
        v-model="testedb.telefone"
        placeholder="Digite o telefone do cliente"
      />
    </div>
    <button  @click="addEditar()">
      {{ isNew ? "Adicionar" : "Editar" }}
    </button>
    <button @click="emits('close')">Fechar</button>
  </div>
</template>

<style>
* {
  list-style: none;
}

#ul {
  padding-left: 0rem;
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

input {
  padding: 5px 10px;
  width: 300px;
  margin-bottom: 10px;
}

.botao-enviar {
  background-color: #222;
  color: #d89d2f;
  font-weight: bold;
  border: 2px solid #222;
  padding: 10px;
  font-size: 13px;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.5s;
  align-items: center;
}

.botao-enviar:hover {
  background-color: transparent;
  color: #222;
}

.botao-conteiner {
  display: flex;
  justify-content: flex-end;
}

.botao-excluir,
.botao-editar {
  cursor: pointer;
  padding: 5px;
  font-weight: bold;
  font-size: 13px;
  color: #fff;
  border: 1px solid #222;
}

.botao-excluir {
  background-color: rgb(238, 53, 53);
}
.botao-editar {
  margin-right: 10px;
  background-color: rgb(46, 182, 46);
}
</style>

ima<script setup>
import { defineComponent, ref, onMounted } from "vue";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../src/firebase.js";
const props = defineProps({
  data: Object,
  isNew: Boolean,
});

defineComponent({
  name: "FormularioAddCliente",
});

const emits = defineEmits(["close"]);

onMounted(() => {
  cliente.value = { ...cliente.value, ...props.data };
});

const cliente = ref({
  categoria: "",
  material: "",
  preço: "",
});

async function addEditar() {
  if (props.isNew) {
    await addDoc(collection(db, "cliente"), cliente.value).then(
      (res) => {
        emits("close");
        location.reload();
      }
    );
  } else {
    await updateDoc(
      doc(db, "cliente", props.data.id),
      cliente.value
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
        v-model="cliente.nome"
        placeholder="Digite o nome do cliente"
      />
    </div>

    <div>
      <input
        v-model="cliente.cidade"
        placeholder="Digite a cidade do cliente"
      />
    </div>

    <div>
      <input v-model="cliente.telefone" placeholder="Digite o telefone do cliente" />
    </div>
    <button class="botao-fechar-editar" @click="addEditar()">
      {{ isNew ? "Adicionar" : "Editar" }}
    </button>
    <button class="botao-fechar-editar" @click="emits('close')">Fechar</button>
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
  padding: 7px;
  font-size: 13px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: 0.5s;
  align-items: center;
}

.botao-enviar:hover {
  background-color: transparent;
  color: #222;
}

.botao-fechar-editar {
  background-color: #d89d2f;
  color: #222;
  font-weight: bold;
  border: 2px solid #222;
  padding: 5px;
  font-size: 12px;
  /* cima baixo direita esquerda */
  margin:5px 10px 5px 0px;
  cursor: pointer;
  transition: 0.5s;
  align-items: center;
}

.botao-fechar-editar:hover {
  background-color: #222;
  color: #d89d2f;
}


.botao-conteiner {
  display: flex;
  justify-content: flex-end;
}

h3{
    color:gray;
    font-size: 15px;
}
</style>

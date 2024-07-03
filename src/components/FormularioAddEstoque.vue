ima<script setup>
import { defineComponent, ref, onMounted } from "vue";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.js";
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


.botao-container {
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

h3{
    color:gray;
    font-size: 15px;
}
</style>

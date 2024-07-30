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
import { defineEmits, ref, onMounted } from "vue";
import Style from "../components/Style.vue";
import FormularioAddEstoque from "./FormularioAddEstoque.vue";

const props = defineProps({
  data: Object,
  isNew: Boolean,
});

//Funções do EstoqueDB abaixo:
const estoque = ref([]);
const show = ref(false);
const data = ref({});
const isNew = ref(true);

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
  imagem: "",
});
const categoriaSelecionada = ref("");
const estoqueFiltrado = ref([]);

onMounted(() => {
  estoqueFiltrado.value = estoque.value;
});

const filtrarProdutos = () => {
  if (categoriaSelecionada.value) {
    estoqueFiltrado.value = estoque.value.filter((itemEstoque) => {
      return itemEstoque.material === categoriaSelecionada.value;
    });
  } else {
    estoqueFiltrado.value = estoque.value;
  }
};
</script>

<template>
  <div class="container-produtos">
    <div class="coluna conteudo-site">
      <h5 for="categoria-select">Filtrar por categoria:</h5>
          <select
            id="categoria-select"
            v-model="categoriaSelecionada"
            @change="filtrarProdutos"
          >
            <option value="">Todas</option>
            <option value="Cozinha">Cozinha</option>
            <option value="Acessórios">Acessórios</option>
            <option value="Decoração">Decoração</option>
          </select>
      <div>
        <div class="vitrine">
          <div v-for="itemEstoque in estoqueFiltrado" :key="itemEstoque.id">
            <div class="produto">
              <img
                class="imagem-produto"
                :src="itemEstoque.imagem"
                alt="Imagem do produto"
              />
              <div class="descricao-produto">
                <div class="item descricao">{{ itemEstoque.categoria }}</div>
                <div class="item preco">R$: {{ itemEstoque.preço }}</div>
                <button class="botao-comprar">Comprar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProdutosTeste",
};
</script>

<style scoped>
.vitrine {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border: 2px solid rgb(116, 135, 103);
  padding: 10px;
}
@media screen and (max-width: 1290px) {
  .vitrine {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media screen and (max-width: 860px) {
  .vitrine {
    grid-template-columns: repeat(1, 1fr);
  }
}

.conteudo-site {
  margin: 0px 0px 0 10px;
}

.produto {
  width: 340px;
  height: 400px;
  margin: 0 0 5px 0px;
  transition: 0.5s;
  padding: 0px;
  border: solid 1px rgba(66, 62, 62, 0.247);
  display: flex;
  flex-direction: column;
}
@media screen and (max-width: 860px) {
  .produto {
    scale:0.89;
  }
}

.imagem-produto {
  margin: 5px 5px 5px 5px;
  width: 97%;
  background-color: rgba(0, 0, 0, 0.048);
  transition: 0.5s;
  max-height: 290px;
}

@media screen and (max-width: 860px) {
  .imagem-produto {
    scale:0.9;
  }
}

.imagem-produto:hover {
  transform: scale(1.04);
  filter: brightness(80%) saturate(80%);
}

.descricao-produto {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  margin-top: auto;
  padding: 0 0 10px 0;
}

.descricao {
  font-size: 18px;
}

.preco {
  font-size: 20px;
  font-weight: bolder;
}

.botao-comprar {
  margin-right: 10px;
  background-color: rgb(46, 182, 46);
  width: 100px;
  height: 30px;
  border: none;
  color: white;
  font-weight: bolder;
  border-radius: 10%;
}

.produto p {
  padding: 0 0 0 10px;
}

p {
  margin: 0;
}

.categorias {
  text-align: center;
}
.categorias a {
  padding: 0px 0 0 0;
  font-size: 20px;
  text-decoration: none;
  color: #000;
}

.categoria-select {
  left: 0;
}

.filtro-select {
  max-width: 95%;
}
</style>

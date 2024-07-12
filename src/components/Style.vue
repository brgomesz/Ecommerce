<script>
export default {
  name: "Style",
};
</script>

<style>
/* Botões */
.botao-excluir {
  background-color: rgba(238, 53, 53, 0.5);
}
.botao-excluir:hover {
  background-color: rgb(238, 53, 53);
}
.botao-editar {
  margin-right: 10px;
  background-color: rgb(46, 182, 46, 0.5);
}
.botao-editar:hover {
  margin-right: 10px;
  background-color: rgb(46, 182, 46);
}

h5 {
  font-size: 15px;
  color: rgb(133, 131, 131);
  margin-bottom: 0;
}

.coluna-input{
  
}


.botao-excluir,
.botao-editar {
  cursor: pointer;
  padding: 5px;
  font-weight: bold;
  font-size: 12px;
  color: #fff;
  border: 0px solid #222;
  height: auto;
  align-content: center;
  border-radius: 5px;
}

.botao-container {
  position: absolute;
  right: 5px;
  bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}

input {
  padding: 5px 10px;
  width: 300px;
  margin-bottom: 10px;
}

.botao-enviar {
  background-color: rgb(116, 135, 103);
  color: white;
  font-weight: bold;
  border: 2px solid rgb(116, 135, 103);
  border-radius: 10px;
  padding: 7px;
  font-size: 13px;
  margin: 10px 0 10px 0px;
  cursor: pointer;
  transition: 0.5s;
  align-items: center;
}

.area-input {
  margin: 10px 0 0px 0px;
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
  margin: 5px 10px 5px 0px;
  cursor: pointer;
  transition: 0.5s;
  align-items: center;
}

.botao-fechar-editar:hover {
  background-color: #222;
  color: #d89d2f;
}

* {
  list-style: none;
}

#ul {
  padding-left: 0rem;
}

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
  max-width: 300px;
  margin-bottom: 10px;
}

.coluna-input {
  column-count: 2;
}

.coluna-select-3 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border: 2px solid rgb(116, 135, 103);
  padding: 10px;
}

.coluna-select-2{
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 2px solid rgb(116, 135, 103);
  padding: 10px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.botao-fechar-editar {
  background-color: #d89d2f;
  color: #222;
  font-weight: bold;
  border: 2px solid #222;
  padding: 5px;
  font-size: 12px;
  /* cima baixo direita esquerda */
  margin: 5px 10px 5px 0px;
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

h3 {
  color: gray;
  font-size: 15px;
}
a{
  cursor:pointer;
}
</style>

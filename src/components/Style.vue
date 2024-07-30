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
  font-weight:bolder;
  border: 2px solid rgb(116, 135, 103);
  border-radius: 10px;
  padding: 7px;
  font-size: 14px;
  margin: 10px 0 10px 0px;
  cursor: pointer;
  transition: 0.5s;
  align-items: center;
}


.botao-flutuante{
  padding:10px;
  border-radius:10px;
}

.area-input {
  padding: 5px 10px;
  width: 300px;
  margin-bottom: 10px;
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

.coluna-select-2 {
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
a {
  cursor: pointer;
}
.titulo-cabeçalho {
  width: auto;
  color: white;
  background-color: rgb(116, 135, 103);
  margin-bottom: -2px;
  border-radius: 15px 15px 0 0;
  padding: 5px 0px 5px 15px;
}

@-webkit-keyframes honeycomb {
  0%,
  20%,
  80%,
  100% {
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
  }

  30%,
  70% {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes honeycomb {
  0%,
  20%,
  80%,
  100% {
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
  }

  30%,
  70% {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

.honeycomb {
  position: absolute;
  top: 48%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index:999;
}

.honeycomb div {
  -webkit-animation: honeycomb 2.1s infinite backwards;
  animation: honeycomb 2.1s infinite backwards;
  background: #00000048;
  height: 12px;
  margin-top: 6px;
  position: absolute;
  width: 24px;
}

.honeycomb div:after,
.honeycomb div:before {
  content: "";
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  position: absolute;
  left: 0;
  right: 0;
}

.honeycomb div:after {
  top: -6px;
  border-bottom: 6px solid #00000048;
}

.honeycomb div:before {
  bottom: -6px;
  border-top: 6px solid #00000048;
}

.honeycomb div:nth-child(1) {
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
  left: -28px;
  top: 0;
}

.honeycomb div:nth-child(2) {
  -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s;
  left: -14px;
  top: 22px;
}

.honeycomb div:nth-child(3) {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
  left: 14px;
  top: 22px;
}

.honeycomb div:nth-child(4) {
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
  left: 28px;
  top: 0;
}

.honeycomb div:nth-child(5) {
  -webkit-animation-delay: 0.4s;
  animation-delay: 0.4s;
  left: 14px;
  top: -22px;
}

.honeycomb div:nth-child(6) {
  -webkit-animation-delay: 0.5s;
  animation-delay: 0.5s;
  left: -14px;
  top: -22px;
}

.honeycomb div:nth-child(7) {
  -webkit-animation-delay: 0.6s;
  animation-delay: 0.6s;
  left: 0;
  top: 0;
}


</style>



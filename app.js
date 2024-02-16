const mensagemErro = document.querySelector("#mensagemErro"); //acessa todo os dados do html ID
const cepbusca = document.querySelector("#cep");
const logradouro = document.querySelector("#logradouro");
const bairro = document.querySelector("#bairro");
const localidade = document.querySelector("#localidade");
const uf = document.querySelector("#uf");
const btnBuscar =  document.querySelector("#botao_buscar");
const btnLimpar =  document.querySelector("#botao_limpar");
const btnSalvar =  document.querySelector("#botao_salvar"); 
let endereco; 

btnBuscar.addEventListener('click', (e) => {
    e.preventDefault(); 
    try{
        validaCEP();
    }catch(erro){
        mensagemErro.innerHTML = erro.message;
    }
})



btnLimpar.addEventListener('click', () => {
    limparCampos();
})

btnSalvar.addEventListener('click', () => {
    alert("Dados salvos com sucesso!!!");
    limparCampos();
})

function buscaEndereco(){
    fetch(`https://viacep.com.br/ws/${cepbusca.value}/json`) //realiza a requisição
    .then((resposta) =>{    //usa .then porque é promise
        return resposta.json(); //converte a resposta de texto da requisição em json
    })
    .then((endereco) =>{
        preencheCampos(endereco);
    })
    .catch((erro) =>{
        console.error(erro);
    })
    
}


function preencheCampos(endereco){
    for (const campo in endereco){
        if(  document.querySelector("#" + campo)){
            document.querySelector("#" + campo).value = endereco[campo];
        }
    }
}

function validaCEP(){
    const regex = /^[0-9]{8}$/;  //\d substitui o [0-9]
    if(regex.test(cepbusca.value)){
    buscaEndereco();
}else{
    throw new Error("CEP inválido");
}
}

function limpaCampos(){
    cepbusca.value = "";
    logradouro.value = "";
    bairro.value = "";
    localidade.value = "";
    uf.value = "";
    mensagemErro.innerHTML = "";
}




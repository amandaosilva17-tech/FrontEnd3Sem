function validarFormulario(){
    let nome = document.getElementById("nome").value.trim();
    let sobrenome = document.getElementById("sobrenome").value.trim();
    //let email = document.getElementById("email").value.trim();
    //let prefixo = document.getElementById("prefixo").value.trim();
    //let ddd = document.getElementById("ddd").value.trim();
    //let numero = document.getElementById("numero").value.trim();
    //let cep = document.getElementById("cep").value.trim();
    // let ruaC = document.getElementById("ruaC").value.trim();
    // let numeroendereco = document.getElementById("numeroendereco").value.trim();
    // let ape = document.getElementById("ape").value.trim();
    // let bairro = document.getElementById("bairro").value.trim();
    // let cidade = document.getElementById("cidade").value.trim();
    // let estado = document.getElementById("estado").value.trim();
    // let Anotacoes = document.getElementById("Anotacoes").value.trim();

    let quantidadeErros = 0;

    if (nome.length == 0) {
        formError("nome");
        quantidadeErros++;
    } else {
        reiniciaBorda("nome");
    }

    if (sobrenome.length == 0) {
        formError("sobrenome");
        quantidadeErros++;
    } else {

        reiniciaBorda("sobrenome");
    }

    let objetoContato = {
        nome : nome, 
        sobrenome : sobrenome 
 };

 let cadastrado = cadastrarContato(objetoContato);
 return false;

//     } else {

//         reiniciaBorda("Anotacoes");
//     }


//     if (quantidadeErros != 0) {
//         alert("Existem " + quantidadeErros + " campo(s) obrigatório(s) não preenchido(s).");
//         quantidadeErros = 0;
//     }

// }


//     if (email.length == 0) {
//         formError("email");
//         quantidadeErros++;
//     } else {

//         reiniciaBorda("email");
//     }


//     if (prefixo.length == 0) {
//         formError("prefixo");
//         quantidadeErros++;
//     } else {

//         reiniciaBorda("prefixo");
//     }


//     if (ddd.length == 0) {
//         formError("ddd");
//         quantidadeErros++;
//     } else {

//         reiniciaBorda("ddd");
//     }



//     if (numero.length == 0) {
//         formError("numero");
//         quantidadeErros++;
//     } else {

//         reiniciaBorda("numero");
//     }


//     if (cep.length == 0) {
//         formError("cep");
//         quantidadeErros++;
//     } else {

//         reiniciaBorda("cep");
//     }



//     if (ruaC.length == 0) {
//         formError("ruaC");
//         quantidadeErros++;
//     } else {

//         reiniciaBorda("ruaC");
//     }



//     if (numeroendereco.length == 0) {
//         formError("numeroendereco");
//         quantidadeErros++;
//     } else {

//         reiniciaBorda("numeroendereco");
//     }



//     if (ape.length == 0) {
//         formError("ape");
//         quantidadeErros++;
//     } else {

//         reiniciaBorda("ape");
//     }


//     if (bairro.length == 0) {
//         formError("bairro");
//         quantidadeErros++;
//     } else {

//         reiniciaBorda("bairro");
//     }



//     if (cidade.length == 0) {
//         formError("cidade");
//         quantidadeErros++;
//     } else {

//         reiniciaBorda("cidade");
//     }



//     if (estado.length == 0) {
//         formError("estado");
//         quantidadeErros++;
//     } else {

//         reiniciaBorda("estado");
//     }




//     if (Anotacoes.length == 0) {
//         formError("Anotacoes");
//         quantidadeErros++;}
}
 function formError(fieldId) {
  document.getElementById(fieldId).style.border = "1px solid red";
 }

function reiniciaBorda(fieldId) {
    document.getElementById(fieldId).style.border = "none";
}

async function buscarEndereco(cep){
    if(cep.trim().length < 8){
        alert("CEP inválidp, o CEP deve conter 8 digitos.")
        return false;
    }

   try {

    aguardandoCampos();

    let retorno = await fetch(`http://viacep.com.br/ws/${cep}/json/`)
    let dados = await retorno.json();
    console.log(dados)

    document.getElementById("cidade").value = dados.cidade;
    document.getElementById("bairro").value = dados.bairro;
    document.getElementById("estado").value = dados.estado;

   } catch  {
        alert("Erro ao buscar o endereço!");
   }
}

function aguardandoCampos() {
    document.getElementById("endereco").value = "Aguardando...";
    document.getElementById("bairro").value = "Aguardando...";
    document.getElementById("cidade").value = "Aguardando...";
    document.getElementById("estado").value = "Aguardando...";

}

async function cadastrarContato(objetoContato){
    console.log(objetoContato);

    let resposta = await fetch("http://localhost:3000/contatos",{
        method: "POST",
        body: JSON.stringify(objetoContato),
        headers : {
            "Content-Type" : "application/json; charset=UTF-8"
        }
    
    });

}

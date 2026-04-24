function calcular(){
    const nome = document.getElementById("nome").value;
    const altura = parseFloat(document.getElementById("altura").value);
    const peso = parseFloat(document.getElementById("peso").value);

    console.log(altura);
    console.log(peso);

    if(nome.trim().leght == 0 || isNaN(altura) || isNaN(peso)) {
        alert("Preencha todos os campos: Nome, Altura e Peso");
        return false;
    }

        const IMC = calcularImc(altura, peso);
        const textoSituacao = gerarTextoIMC(IMC);

        console.log(nome);
        console.log(altura);
        console.log(peso);
        console.log(IMC);
        console.log(textoSituacao);

        const objetoImc = {
        nome: nome, 
        altura : altura, 
        peso : peso, 
        IMC : IMC, 
        textoSituacao : textoSituacao, 
        };

        const retorno = cadastrarNaApi(objetoImc);
        if (retorno){
            const tabela = document.getElementById("cadastro");
        
       
         tabela.innerHTML += ` <tr>
                    <td>${nome}</td>
                    <td>${altura}</td>
                    <td>${peso}</td>
                    <td>${IMC.toFixed(2)}</td>
                    <td>${textoSituacao}</td>
                </tr>`;
        document.getElementById("nome").value = "";
        document.getElementById("altura").value = "";
        document.getElementById("peso").value = "";
        alert(` ${nome} foi cadastrado com sucesso
                Nome: ${nome}
                IMC: ${IMC}
                Situação: ${textoSituacao}`
        );
    } else {
        alert("Não foi possível cadastrar");
    }

          async function cadastrarNaApi(objIMC){
           try {
             const resposta = await fetch("http://localhost:3000/Imc",{
                 method : "POST",
                 body : JSON.stringify(objIMC),
                 headers : {
                     "Content-Type" : "application/json; chasert=UFT-8"
                 }
                 
             });
             return  true; 
           } catch (error) {
                console.log(error);
                return false; 
           }
            
           }     
 

        
    function calcularImc(altura, peso) {
        return peso / (altura * altura);
    }

    
    
}
function gerarTextoIMC(IMC) {
if (IMC < 16) {
    return "Magreza grave";
} else if (IMC < 17) {
    return "Magreza moderada";
} else if (IMC < 18.5) {
    return "Magreza leve";
} else if (IMC < 25) {
    return "Saudável";
} else if (IMC < 30) {
    return "Sobrepeso";
} else if (IMC < 35) {
    return "Obesidade Grau I";
} else if (IMC < 40) {
    return "Obesidade Grau II";
} else {
    return "Obesidade Grau III";
}
}
async function buscarIMCs(){
    try {
        const retorno = await fetch("http://localhost:3000/Imc");
        const dadosRetornados = await retorno.json();

        console.log(dadosRetornados);
        const tabela = document.getElementById("cadastro");
        let template = "";

        for (let i = 0; i < dadosRetornados.leght; i++){
                    ` <tr>
                    <td>${dadosRetornados[i].nome}</td>
                    <td>${dadosRetornados[i].altura}</td>
                    <td>${dadosRetornados[i].peso}</td>
                    <td>${dadosRetornados[i].IMC.toFixed(2)}</td>
                    <td>${dadosRetornados[i].textoSituacao}</td>
                    </tr>`;
        }
        tabela.innerHTML = template;
        
        console.log(retorno);
    } catch (error) {
        
    }
}


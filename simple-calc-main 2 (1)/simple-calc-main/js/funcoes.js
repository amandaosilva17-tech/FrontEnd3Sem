async function calcular(event) {
  event.preventDefault();
  //entrada
  let n1 = parseFloat(document.getElementById("n1").value);
  let n2 = parseFloat(document.getElementById("n2").value);
  let op = document.getElementById("operacao").value;
  let resultado = null;
  const tabelaResultado = document.getElementById("cadastro");

  if (isNaN(n1) || isNaN(n2)) {
    document.getElementById("resultado").innerText =
      "Preencha todos os números!";
    return; // Impede continuar se os números não forem válidos
  }

  //processamento
  if (op == "soma") {
    resultado = somar(n1, n2);
    resultado = resultado.toFixed(2);
  } else if (op == "subtracao") {
    resultado = subtrair(n1, n2);
    resultado = resultado.toFixed(2);
  } else if (op == "multiplicacao") {
    resultado = multiplicar(n1, n2);
    resultado = resultado.toFixed(2);
  } else if (op == "divisao") {
    if (n2 == 0) {
      resultado = "Não é um número";
    } else {
      resultado = dividir(n1, n2);
      resultado = resultado.toFixed(2);
    }
  } else {
    resultado = "Operação Inválida";
  }

  const objetoResultado ={
    n1: n1,
    n2: n2,
    operacao: op,
    resultado: resultado
  }

  const retorno = await cadastrarNaApi(objetoResultado);

  if (retorno) {
    await listarResultados();
  }

  //saída
  // console.log(`Resultado da operação: ${resultado}`);
  document.getElementById("resultado").innerHTML = resultado;
}

/**
 * Função somar recebe 2 valores e retorna a soma dos
 * dois valores
 */
function somar(valor1, valor2) {
  return valor1 + valor2;
}

function subtrair(valor1, valor2) {
  return valor1 - valor2;
}

function multiplicar(valor1, valor2) {
  return valor1 * valor2;
}

function dividir(valor1, valor2) {
  if (valor2 == 0) {
    return "Não é um número";
  }

  return valor1 / valor2;
}

//funcao para cadastrar na API
async function cadastrarNaApi(objetoResultado){
    try {
        const resposta = await fetch("http://localhost:3000/resultadoCalculado", {
            method: "POST",
            body: JSON.stringify(objetoResultado),
            headers: {
                "Content-Type": "application/json; Charset=UTF-8"
            },
        });
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}

async function listarResultados(){
  try {
    const retorno = await fetch("http://localhost:3000/resultadoCalculado");
    const retornaDados = await retorno.json();
    const tabelaResultado = document.getElementById("cadastro");
    let template = "";

    console.log(retornaDados);

    for (let i = 0; i < retornaDados.length; i++) {
      const resultado = retornaDados[i];
      template += `     
        <article class="data__card-result">
            <span id="primeiroResultado"><strong>Primeiro Número: </strong> ${retornaDados[i].n1}</span>
            <span id="segundoResultado"><strong>Segundo Número:</strong> ${retornaDados[i].n2}</span>
            <span id="operacaoResultado"><strong>Operação:</strong> ${retornaDados[i].operacao}</span>
            <span id="resultadoResultado"><strong>Resultado:</strong> ${retornaDados[i].resultado}</span>
        </article>
        `;
    }

    tabelaResultado.innerHTML = template;

  } catch (error) {
    console.log(error);
  }
}

window.addEventListener('load', listarResultados);
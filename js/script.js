/* Aqui vai uma api com os dados da tabela !*/

// IMC DATA
const data = [
    {
      min: 0,
      max: 18.4,
      classification: "Menor que 18,5",
      info: "Magreza",
      obesity: "0",
    },
    {
      min: 18.5,
      max: 24.9,
      classification: "Entre 18,5 e 24,9",
      info: "Normal",
      obesity: "0",
    },
    {
      min: 25,
      max: 29.9,
      classification: "Entre 25,0 e 29,9",
      info: "Sobrepeso",
      obesity: "I",
    },
    {
      min: 30,
      max: 39.9,
      classification: "Entre 30,0 e 39,9",
      info: "Obesidade",
      obesity: "II",
    },
    {
      min: 40,
      max: 99,
      classification: "Maior que 40,0",
      info: "Obesidade grave",
      obesity: "III",
    },
  ];
  


// seleção de elementos 

const imcTable = document.querySelector("#imc-table");

const heightImput = document.querySelector("#height"); 
const weightImput = document.querySelector("#weight");
const calcBtn = document.querySelector("#calc-btn");
const clearBtn = document.querySelector("#clear-btn");

const imcNumber = document.querySelector("#imc-number");
const imcInfo = document.querySelector("#imc-info");
const backBtn = document.querySelector("#back-btn");

const calcContainer = document.querySelector("#calc-container");
const resultContainer = document.querySelector("#result-container");

// funçoes

function createTable(data) { // funcao que recebe data 
    data.forEach((item) => { // faz um forEach da data, para procurar pelo "item" , chamamos de item as chaves que estao em data
        const div = document.createElement("div");
        div.classList.add("table-data");

        const classification = document.createElement("p");
        classification.innerText = item.classification;

        const info = document.createElement("p");
        info.innerText = item.info;

        const obesity = document.createElement("p");
        obesity.innerText = item.obesity;

        div.appendChild(classification);
        div.appendChild(info);
        div.appendChild(obesity);

        imcTable.appendChild(div); // vai receber toda a tabela que está na div.

    })
}

function clearInputs () {
  heightImput.value= "";
  weightImput.value = "";

  imcNumber.classList = "";
  imcInfo.classList = "";

}

// Função para validar input, para receber apenas numeros e virgula
function validDigits (text) {
  return text.replace(/[^0-9,]/g, "");
}


function calcImc (weight , height) {

    const imc2 = (weight / (height * height)).toFixed(1);

    return imc2;
}

function showOrHideResults() {
  calcContainer.classList.toggle("hide"); // Com o calcContainer vai acessar o classList e com toggle em hide , vai informar se tem hide tira, se não tem ride, coloca o ride.
  resultContainer.classList.toggle("hide"); 
}


// Inicialização

createTable(data);

// Eventos

// quando usarem o imput, vai acionar esse metodo, que irá verificar se o input está recebendo numero, letras ou caracteres especiais, 
[weightImput,heightImput].forEach((elem) => {
  elem.addEventListener('input' , (e) => {
    const updatedValue = validDigits(e.target.value);
  
    e.target.value = updatedValue;
  }); // quando usarem o imput, vai acionar esse metodo.
})


// Vai transforma o 1.75 por 1,75 e caso não tenha valores, vai retorna a page ;
calcBtn.addEventListener('click' , (e) => {
  e.preventDefault();

  const weight = +weightImput.value.replace("," , ".");
  const height = +heightImput.value.replace("," , ".");

  if(!weight || !height) return ;

  const imc3 = calcImc(weight , height);

  let info ;

  data.forEach((item) => {

    if(imc3 >= item.min && imc3 <= item.max) {
      info = item.info;
    }

    if(!info) return;
  })

    imcNumber.innerText = `Seu imc = ${imc3}`  ;
    imcInfo.innerText = `Situação Atual : ${info}` ;


    switch(info) {
        case "Magreza" :
          imcNumber.classList.add("low");
          imcInfo.classList.add("low");
          
          break;

        case "Normal" :
          imcNumber.classList.add("good");
          imcInfo.classList.add("good");
          
          break;
        case "Sobrepeso" :
          imcNumber.classList.add("low");
          imcInfo.classList.add("low");
          
          break;
        case "Obesidade" :
          imcNumber.classList.add("medium");
          imcInfo.classList.add("medium");
          
          break;
          case "Obesidade grave" :
            imcNumber.classList.add("high");
            imcInfo.classList.add("high");
          
          break;
    }

    showOrHideResults()
    
})

//

clearBtn.addEventListener("click" , (e) => {
  e.preventDefault(); // a pagina recarrega sozinha apos clicar em limpar, porem usando esse metodo ele cancela o evento de recarregar a pagina

  clearInputs(); // Ao clicar em limpar, a funcao vai limpar os inputs
})

backBtn.addEventListener("click" , () => {
  clearInputs();
  showOrHideResults();
})

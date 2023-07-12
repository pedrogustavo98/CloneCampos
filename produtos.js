// document.addEventListener("change", function (event) {
//   var target = event.target;
  
  // console.log('here');

  // // se sim, chamos as funções dentro do If
  // if (target.classList.contains("quantidade") || target.classList.contains("valor-unitario")) {
  //   atualizarSubtotalProdutos();
  //   atualizarSubtotalServicos();
  //   calculoGeralProdutos();
  //   calculoGeralServicos();
  // }
// });




$(document).ready(function () {


  // Função para calcular o subtotal
  function calcularSubtotal(quantidade, valorUnitario) {
    return quantidade * valorUnitario;
  }

  // Função que atualiza todos os subtotais de produtos
  function atualizarSubtotalProdutos() {
    // Aqui seleciono o container que contem as inputs correpondentes aos produtos
    var carros = document.getElementsByClassName("carro-peca");

    // aqui eu percorro todas as inputs há dentro do container
    for (var i = 0; i < carros.length; i++) {

      var quantidadeInput = carros[i].querySelector(".quantidade");
      var valorUnitarioInput = carros[i].querySelector(".valor-unitario");
      var subtotalInput = carros[i].querySelector(".sub-total");

      // aqui estou convertendo todos os valores que vem como string para int e float, colocando duas casas decimais
      var quantidade = parseInt(quantidadeInput.value, 10) || 0;
      var valorUnitario = parseFloat(valorUnitarioInput.value) || 0;

      /* aqui estou pegando as variáveis, tanto de quantidade como valor unitário e guardando dentro da variavel abaixo,
      em seguida mando os valores e quantidade como parâmetro da função CalcularSubtotal;
      */

      var subtotal = calcularSubtotal(quantidade, valorUnitario);

      // aqui estou adicionando duas casas decimais a input de sub-total
      subtotalInput.value = subtotal.toFixed(2);
    }
  }


  // Aqui estou fazendo a mesma coisa para a função de subTotal de Serviços
  function atualizarSubtotalServicos() {
    // Seleciono o container que contem todas as inputs correpondentes ao serviços
    var servicos = document.getElementsByClassName("carro-servico");

    // Aqui percorro as inputs pertencentes ao container atribuido à variável servicos
    for (var i = 0; i < servicos.length; i++) {
      var quantidadeInput = servicos[i].querySelector(".quantidade");
      var valorUnitarioInput = servicos[i].querySelector(".valor-unitario");
      var subtotalInput = servicos[i].querySelector(".sub-total-servico");

      // aqui estou convertendo todos os valores que vem como string para int e float, colocando duas casas decimais
      var quantidade = parseInt(quantidadeInput.value, 10) || 0;
      var valorUnitario = parseFloat(valorUnitarioInput.value) || 0;

      /* aqui estou pegando as variáveis, tanto de quantidade como valor unitário e guardando dentro da variavel abaixo,
    em seguida mando os valores e quantidade como parâmetro da função CalcularSubtotal;
    */
      var subtotal = calcularSubtotal(quantidade, valorUnitario);

      // aqui estou adicionando duas casas decimais a input de sub-total
      subtotalInput.value = subtotal.toFixed(2);
    }
  }



  // Aqui identifico qualquer alteração realizada nas inputs 'quantidade' & 'valor-unitario'.
  document.addEventListener("input", function (event) {
    var target = event.target;
    

    // se sim, chamos as funções dentro do If
    if (target.classList.contains("quantidade") || target.classList.contains("valor-unitario")) {
      atualizarSubtotalProdutos();
      atualizarSubtotalServicos();
      calculoGeralProdutos();
      calculoGeralServicos();
    }
  });


  document.getElementById("adicionar-carro").addEventListener("click", function () {
    var carrosContainer = document.getElementById("carros-container");
    var carroCount = carrosContainer.getElementsByClassName("carro-peca").length + 1;

    var novoCarro = document.createElement("div");
    novoCarro.className = "mt-5 carro-peca";
    novoCarro.id = "automovel-" + carroCount;

    var carroHtml = `
        <div class="row">
          <input type="hidden" name="quantidade[]" id="quantidade-${carroCount}"><br>
          <div class="col-md-2">
            <input type="number" class="form-control quantidade apenas-numeros required" min="1" placeholder="Quantidade" id="quantidade-${carroCount}" name="quantidade_peca[]" title="Quantidade">
          </div>
          <div class="col-md-8">
            <input type="text" class="form-control produto required" placeholder="Nome do produto" id="produto-${carroCount}" name="produto_peca[]" title="Nome do Produto">
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-md-2">
            <input type="tel" name="valor_unitario_peca[]" maxlength="20" class="apenas-numeros input-padrao form-control mr-2 required valor-unitario" id="valor_unitario-${carroCount}" placeholder="V. Unitário" title="Valor unitário">
          </div>
          <div class="col-md-2">
            <input type="tel" name="sub_total_peca[]" maxlength="20" class="apenas-numeros input-padrao form-control mr-2 sub-total" id="sub_total-${carroCount}" placeholder="Sub - Total" title="Sub-Total" readonly>
          </div>
          <div class="col-md-1">
            <a class="remover" id="remover-${carroCount}" title="Remover" onclick="apagar(${carroCount})">x</a>
          </div>
          <div class="col-md-12 p-0" id="campos-subprodutos"></div>
        </div>`;

    novoCarro.innerHTML = carroHtml;



    carrosContainer.appendChild(novoCarro);

    atualizarSubtotalProdutos();

  });

  carCount = 0;
  $('#adicionar-servico').click(function () {
    let servicosContainer = document.getElementById('campos-servicos');

    carCount++;

    var carroHtml = `<div class="mt-5" id="automovel-${carCount}">
           <div class="carro-servico">
           <div class="row">
           <input type="hidden" name="marca[]" id='marca-1'><br>
           <div class="col-md-2">
           <input type="number" class="form-control quantidade apenas-numeros required" placeholder="Quantidade" id="quantidadeServico-${carCount}" name="quantidade_servico[]" title="Quantidade">
           </div>
           <div class="col-md-8">
           <input type="text" class="form-control produto required" placeholder="Nome do produto" id="descricao_servico" name="descricao_servico[]" title="Nome do Produto">
           </div>
           </div>
           <div class="row mt-4">
           <div class="col-md-2">
           <input type="tel" name="sub_total_servico[]" maxlength="20" class="apenas-numeros input-padrao form-control mr-2 required valor-unitario" id="sub_total_servico" placeholder="V. Unitário" title="Valor unitário">
           </div>
           <div class="col-md-2">
           <input type="tel" name="sub_total_servico[]" maxlength="20" readonly class="apenas-numeros input-padrao form-control mr-2 required sub-total-servico" id="sub_total_servico" placeholder="Sub - Total" title="Sub-Total">
          </div>
           <div class="col-md-1">
           <a class="remover" id="remover" title="Remover" onclick="apagar(${carCount})">x</a>
           </div>
           <div class="col-md-12 p-0" id="campos-servicos">
           </div>
           </div>
           </div>
           </div>`;

    servicosContainer.innerHTML += carroHtml;
    atualizarSubtotalServicos();

  })
})

let resultado;
let elementos = [];
let total = 0;

// Aqui estou listando todas as inputs de subTotal de produtos 
function calculoGeralProdutos() {
  let produtos = document.getElementsByClassName('sub-total');

  // por padrão o total é 0
  let total = 0;

  // aqui eu somo todos os subtotais de produtos e atribuo o resultado ao elemento produtos
  for (let i = 0; i < produtos.length; i++) {
    let valor = Number(produtos[i].value);
    if (!isNaN(valor)) {
      total += valor;
    }
  }

  document.getElementById('produtos').value = total;
}

// Aqui estou listando todas as inputs de subTotal de serviços
function calculoGeralServicos() {
  let servicos = document.getElementsByClassName('sub-total-servico');

  // por pradrão o total é 0
  let total = 0;

  // aqui eu somo todos os subtotais de serviços e atribuo o resultado ao elemento serviços
  for (let i = 0; i < servicos.length; i++) {
    let valor = Number(servicos[i].value);
    if (!isNaN(valor)) {
      total += valor;
    }
  }

  document.getElementById('servicos').value = total;
}


// Aqui eu apago os elementos com base no id que é recebido no parâmetro da função
function apagar(id) {
  var elemento = document.getElementById(`automovel-${id}`);
  elemento.remove();

  // a medida que apago um elemento, chamo as funções abaixo para atualizar os valores dos campos totais produtos e serviços 
  calculoGeralProdutos()
  calculoGeralServicos()
}
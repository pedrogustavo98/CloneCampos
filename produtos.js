document.addEventListener("DOMContentLoaded", function() {


    // Função para calcular o subtotal
    function calcularSubtotal(quantidade, valorUnitario) {
      return quantidade * valorUnitario;
    }

    function atualizarSubtotal() {
      var carros = document.getElementsByClassName("carro-peca");

      for (var i = 0; i < carros.length; i++) {
        var quantidadeInput = carros[i].querySelector(".quantidade");
        var valorUnitarioInput = carros[i].querySelector(".valor-unitario");
        var subtotalInput = carros[i].querySelector(".sub-total");

        var quantidade = parseInt(quantidadeInput.value, 10) || 0;
        var valorUnitario = parseFloat(valorUnitarioInput.value) || 0;

        var subtotal = calcularSubtotal(quantidade, valorUnitario);
        subtotalInput.value = subtotal.toFixed(2);
      }
    }

    document.addEventListener("input", function(event) {
      var target = event.target;
      if (target.classList.contains("quantidade") || target.classList.contains("valor-unitario")) {
        atualizarSubtotal();
        calculoGeralProdutos();
      }
    });

    document.getElementById("adicionar-carro").addEventListener("click", function() {
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

      atualizarSubtotal();

    });

  });

  let resultado;
  let elementos = [];
  let total = 0;

  function calculoGeralProdutos() {
    let produtos = document.getElementsByClassName('sub-total');
    let total = 0;

    for (let i = 0; i < produtos.length; i++) {
      let valor = Number(produtos[i].value);
      if (!isNaN(valor)) {
        total += valor;
      }
    }

    document.getElementById('produtos').value = total;
  }



  function apagar(id) {
    var elemento = document.getElementById(`automovel-${id}`);
    elemento.remove();
    calculoGeralProdutos()
  }
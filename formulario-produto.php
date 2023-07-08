<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  <title>Document</title>

  <style>
    .adicionar {
      width: 50px;
      height: 50px;
      background-color: blue;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      color: #FFF !important;
    }

    .remover {
      width: 50px;
      height: 50px;
      background-color: red;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      color: #FFF !important;
    }
  </style>
</head>

<body>
  <h1>Cadastro de Cliente</h1>
  <form id="cadastro-form" method="POST">

    <div id="carros-container" class="pl-4 pr-4 pt-0 elemento-carro-cadastro col-md-12">
      <div class="carro-peca">
        <div class="d-flex">
          <input type="hidden" name="quantidade[]" id='quantidade-1'><br>
          <div class="col-md-2">
            <input type="number" min="1" class="form-control quantidade apenas-numeros required" placeholder="Quantidade" id="quantidade-1" name="quantidade_peca[]" title="Quantidade">
          </div>
          <div class="col-md-8">
            <input type="text" class="form-control produto required" placeholder="Nome do produto" id="produto-1" name="produto_peca[]" title="Nome do Produto">
          </div>
        </div>
        <div class="mt-4 d-flex">
          <div class="col-md-2">
            <input type="tel" name="valor_unitario_peca[]" maxlength="20" class="apenas-numeros input-padrao form-control mr-2 required valor-unitario" id="valor_unitario-1" placeholder="V. Unitário" title="Valor unitário">
          </div>
          <div class="col-md-2">
            <input type="tel" name="sub_total_peca[]" maxlength="20" class="apenas-numeros input-padrao form-control mr-2 sub-total" id="sub_total-1" placeholder="Sub - Total" title="Sub-Total" readonly>
          </div>
          <div class="col-md-1">
            <a class="adicionar" id="adicionar-carro" title="Adicionar">+</a>
          </div>
          <div class="col-md-12 p-0" id="campos-subprodutos">

          </div>

        </div>

      </div>
    </div>
    <p>-----------------SERVIÇO------------------</p>

    <div class="row mt-5">
      <div class="col-md-12">
        <p class="sub-titulo pl-3">
          DESCRIÇÕES DE SERVIÇOS
        </p>
      </div>
      <div id="servicos-container" class="pl-4 pr-4 pt-0 elemento-carro-cadastro col-md-12">
        <div class="carro-servico">
          <div class="row">
            <input type="hidden" name="quantidade[]" id='quantidade-1'><br>
            <div class="col-md-2">
              <input type="number" class="form-control quantidade apenas-numeros required" placeholder="Quantidade" id="quantidade_servico" name="quantidade_servico[]" title="Quantidade">
            </div>
            <div class="col-md-8">
              <input type="text" class="form-control produto required" placeholder="Descrição do serviço" id="descricao_servico" name="descricao_servico[]" title="Descrição do serviço">
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-md-2">
              <input type="tel" name="valor_unitario_peca[]" maxlength="20" class="apenas-numeros input-padrao form-control mr-2 required valor-unitario" id="valor_unitario-1" placeholder="V. Unitário" title="Valor unitário">
            </div>
            <div class="col-md-2">
              <input type="tel" name="sub_total_servico[]" maxlength="20" class="apenas-numeros input-padrao form-control mr-2 required" id="sub_total_servico" placeholder="V. Total" title="Sub-Total" value="<?php echo $_POST['usuario'] ?>">
            </div>
            <div class="col-md-1">
              <a class="adicionar" id="adicionar-servico" title="Adicionar">+</a>
            </div>
            <div class="col-md-12 p-0" id="campos-servicos">
            </div>
          </div>
        </div>


      </div>

    </div>


    <div class="container-inputs d-flex">
      <div class="valor d-flex">
        <label for="produtos">Total em produtos</label>
        <input type="text" id="produtos">
      </div>
      <div class="valor">
        <label for="servicos">Total em serviços</label>
        <input type="text" id="servicos">
      </div>
    </div>
  </form>
  <script src="produtos.js"></script>
  <script src="servicos.js"></script>
</body>

</html>
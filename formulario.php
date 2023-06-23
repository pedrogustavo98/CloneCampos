<!DOCTYPE html>
<html>

<head>
  <title>Cadastro de Cliente</title>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script src="script.js"></script>
</head>

<body>
  <h1>Cadastro de Cliente</h1>
  <form id="cadastro-form" method="POST">
    <label>Nome:</label>
    <input type="text" name="nome_cliente" required><br>

    <div id="carros-container">
      <div class="carro">
        <h3>Carro 1</h3>
        <input type="text" name="marca[]" id='marca-1'><br>
        <label>Marca:</label>
        <select name="marca[]">
          <option disabled selected>Marca</option>
        </select>
        <br>
        <label>Veículo:</label>
        <select name="veiculo[]">
          <option disabled selected>Automóvel</option>

        </select>
        <br>
        <label>Ano:</label>
        <input type="text" name="ano[]"><br>
        <label>Cor:</label>
        <input type="text" name="cor[]"><br>
        <label>Placa:</label>
        <input type="text" name="placa[]"><br>
      </div>
    </div>

    <button type="button" id="adicionar-carro">Adicionar Carro</button>
    <button type="submit">Enviar</button>
  </form>
  <script>
    $(document).ready(function() {
      // Contador para gerar IDs únicos para cada carro adicionado
      var carCount = 1;

      // Função para obter as marcas da API da FIPE
      function obterMarcas() {
        $.ajax({
          url: 'https://parallelum.com.br/fipe/api/v1/carros/marcas',
          method: 'GET',
          success: function(marcas) {
            // Preencher o campo de marca com as opções retornadas
            var selectMarcas = $('select[name="marca[]"]');
            // selectMarcas.empty(); // Limpar as opções existentes

            marcas.forEach(function(marca) {
              selectMarcas.append('<option value="' + marca.codigo + '">' + marca.nome + '</option>');
            });
          }
        });
      }

      // Chamar a função para obter as marcas quando a página carregar
      obterMarcas();

      // Manipulador de evento para adicionar carros
      $(document).on('click', '#adicionar-carro', function() {
        carCount++;
        var carroHtml = '<div class="carro">' +
          '<h3>Carro ' + carCount + '</h3>' +
          '<input type="text" name="marca[]" id="marca-' + carCount + '"><br>' +
          '<label>Marca:</label>' +
          '<select name="marca[]"></select><br>' +
          '<label>Veículo:</label>' +
          '<select name="veiculo[]"></select><br>' +
          '<label>Ano:</label>' +
          '<input type="text" name="ano[]"><br>' +
          '<label>Cor:</label>' +
          '<input type="text" name="cor[]"><br>' +
          '<label>Placa:</label>' +
          '<input type="text" name="placa[]"><br>' +
          '</div>';

        $('#carros-container').append(carroHtml);

        // Obter as marcas novamente após adicionar um novo carro
        obterMarcas();
      });

      // Manipulador de evento para preencher os veículos ao selecionar a marca
      $(document).on('change', 'select[name="marca[]"]', function() {
        var marcaSelecionada = $(this).val();
        var selectVeiculos = $(this).closest('.carro').find('select[name="veiculo[]"]');
        selectVeiculos.empty();

        $.ajax({
          url: 'https://parallelum.com.br/fipe/api/v1/carros/marcas/' + marcaSelecionada + '/modelos',
          method: 'GET',
          success: function(modelos) {
            modelos.modelos.forEach(function(modelo) {
              selectVeiculos.append('<option value="' + modelo.codigo + '">' + modelo.nome + '</option>');
            });
          }
        });

        // Preencher a input de marca com o nome da marca selecionada
        $(this).closest('.carro').find('input[name="marca[]"]').val($(this).find('option:selected').text());
      });

      // Manipulador de evento para enviar dados para o PHP
      $('#cadastro-form').submit(function(event) {
        event.preventDefault(); // Impede o envio do formulário tradicional

        // Organizar os dados do formulário em uma estrutura desejada
        var formData = {
          nome_cliente: $('input[name="nome_cliente"]').val(),
          automoveis: []
        };

        $('.carro').each(function() {
          var marca = $(this).find('input[name="marca[]"]').val();
          var veiculo = $(this).find('select[name="veiculo[]"]').find('option:selected').text();
          var ano = $(this).find('input[name="ano[]"]').val();
          var cor = $(this).find('input[name="cor[]"]').val();
          var placa = $(this).find('input[name="placa[]"]').val();

          var automovel = {
            marca: marca,
            nome: veiculo,
            ano: ano,
            cor: cor,
            placa: placa
          };

          formData.automoveis.push(automovel);
        });

        // Envia a requisição AJAX
        $.ajax({
          url: 'http://teste.local/teste.php',
          type: 'POST',
          data: JSON.stringify(formData), // Serializa os dados em JSON
          contentType: 'application/json', // Define o cabeçalho do conteúdo como JSON
          success: function(response) {
            // Manipule a resposta do PHP aqui, se necessário
            console.log(response);
          }
        });
      });
    });
  </script>
</body>

</html>
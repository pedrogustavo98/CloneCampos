<?php
function pre($valor)
{
    echo '<pre>';
    print_r($valor);
    exit;
}

// pre($_POST);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    pre($data);
} else {
    echo "Erro: A requisição não é POST";
}

<?php

use App\Controllers\CityController;
use App\Controllers\ClimateController;



return function ($app, CityController $cityController, ClimateController $climateController) {
    $app->get('/api/cidade/{nome}', [$cityController, 'buscarPorNome']);
    $app->get('/api/clima/{cidade}', [$climateController, 'buscarClima']);

    $app->get('/', function ($request, $response) {
        $html = file_get_contents(__DIR__ . '/../../public/paginas/index.html');
        $response->getBody()->write($html);
        return $response->withHeader('Content-Type', 'text/html');
    });
};
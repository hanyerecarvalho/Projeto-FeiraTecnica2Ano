<?php

use App\Controllers\CityController;
use App\Controllers\ClimateController;

return function ($app, CityController $cityController, ClimateController $climateController) {
    $app->get('/api/cidade/{nome}', [$cityController, 'buscarPorNome']);
    $app->get('/api/clima/{cidade}', [$climateController, 'buscarClima']);
};
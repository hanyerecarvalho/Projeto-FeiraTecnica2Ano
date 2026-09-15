<?php

require __DIR__ . '/../vendor/autoload.php';

use App\Controllers\CityController;
use App\Controllers\ClimateController;
use App\Models\CidadeRepository;
use App\Models\ClimaRepository;
use App\Services\CidadeService;
use App\Services\ClimaService;
use Dotenv\Dotenv;
use Slim\Factory\AppFactory;

// Carrega as variáveis do .env (DB_HOST, DB_NAME, DB_USER, DB_PASS, OPENWEATHER_KEY)
$dotenv = Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->safeLoad();

$cidadeRepository = new CidadeRepository();
$climaRepository = new ClimaRepository();

$cidadeService = new CidadeService($cidadeRepository);
$climaService = new ClimaService($climaRepository, $_ENV['OPENWEATHER_KEY'] ?? '');

$cityController = new CityController($cidadeService);
$climateController = new ClimateController($cidadeService, $climaService);

$app = AppFactory::create();

(require __DIR__ . '/../app/routes/routes.php')($app, $cityController, $climateController);

$app->run();
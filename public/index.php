<?php
header('Access-Control-Allow-Origin: *');   
header('Access-Control-Allow-Methods: GET, POST, DELETE, PATCH, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');


use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
require '../vendor/autoload.php';
$config = [
    'settings' => [
        'displayErrorDetails' => true,
        'addContentLengthHeader' => false,
        "determineRouteBeforeAppMiddleware" => true
    ],
];
$app = new \Slim\App($config);
$container = $app->getContainer();
$container['view'] = __DIR__ . '/../templates/';

$container['db'] = function ($c) {
    $connection = new PDO('mysql:host=localhost;post=3306;dbname=automated_restaurant', 'root', '');
    return $connection;
};

$app->group('', function () use ($app) {
    $app->group('/api', function () use ($app) {
        $app->group('/login', function () use ($app) {
            $app->post('',  \admincontroller::class . ':login');
            
        });
        $app->group('/product', function () use ($app) {
            $app->get('/items',  \homecontroller::class . ':get');
            $app->post('/items',  \homecontroller::class . ':post');
            $app->patch('/items',  \homecontroller::class . ':patch');
            $app->delete('/items',  \homecontroller::class . ':delete');
        });
        $app->group('/customlization', function () use ($app) {
            //$app->get('/items',  \homecontroller::class . ':get_items_by_id');
            $app->get('/items',  \homecontroller::class . ':get');
            $app->post('/items',  \homecontroller::class . ':post');
            $app->patch('/items',  \homecontroller::class . ':patch');
            $app->delete('/items',  \homecontroller::class . ':delete');
        });
        $app->group('/account', function () use ($app) {
            $app->get('/items',  \homecontroller::class . ':get');
            $app->post('/items',  \homecontroller::class . ':post_account');
            $app->patch('/items',  \homecontroller::class . ':patch');
            $app->delete('/items',  \homecontroller::class . ':delete');
        });
        /*$app->get('/items',  \homecontroller::class . ':get_items_by_id');
        $app->get('/',  \homecontroller::class . ':get_items');
        $app->post('/',  \homecontroller::class . ':post');
        $app->patch('/',  \homecontroller::class . ':patch');
        $app->delete('/',  \homecontroller::class . ':delete');*/
    });
});

$app->run();

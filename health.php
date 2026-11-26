<?php
require_once __DIR__ . '/api/config.php';

try {
    $pdo->query('SELECT 1');
    $dbStatus = 'healthy';
} catch (PDOException $e) {
    $dbStatus = 'unhealthy';
}

$health = [
    'status' => $dbStatus === 'healthy' ? 'healthy' : 'degraded',
    'timestamp' => date('c'),
    'database' => $dbStatus,
];

http_response_code($dbStatus === 'healthy' ? 200 : 503);
header('Content-Type: application/json');
echo json_encode($health);
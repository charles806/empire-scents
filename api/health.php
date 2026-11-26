<?php
require_once __DIR__ . '/config.php';

// Simple health check endpoint
try {
    // Test database connection
    $pdo->query('SELECT 1');
    $dbStatus = 'healthy';
} catch (PDOException $e) {
    $dbStatus = 'unhealthy: ' . $e->getMessage();
}

$health = [
    'status' => $dbStatus === 'healthy' ? 'healthy' : 'degraded',
    'timestamp' => date('c'),
    'version' => '1.0.0',
    'environment' => getenv('APP_ENV') ?: 'development',
    'database' => $dbStatus,
    'php_version' => PHP_VERSION,
];

http_response_code($dbStatus === 'healthy' ? 200 : 503);
echo json_encode($health, JSON_PRETTY_PRINT);
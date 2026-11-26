<?php
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$isLocalhost = preg_match('/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/', $origin);
$isPxllSpace = preg_match('/^https?:\/\/.*\.pxxl\.app$/', $origin);
$isHostless = preg_match('/^https?:\/\/.*\.hostless\.run$/', $origin);

if ($isLocalhost || $isPxllSpace || $isHostless) {
    header("Access-Control-Allow-Origin: $origin");
    header('Access-Control-Allow-Credentials: true');
}
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

// Content-Type for all responses
header('Content-Type: application/json');

// Detect HTTPS
$isHttps = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ||
           (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https');

// Session cookie settings (MUST be set before session_start())
ini_set('session.cookie_samesite', $isHttps ? 'None' : 'Lax');
ini_set('session.cookie_secure', $isHttps ? '1' : '0');
ini_set('session.use_cookies', '1');
ini_set('session.use_only_cookies', '1');
ini_set('session.cookie_path', '/');
ini_set('session.cookie_httponly', '1');
ini_set('session.gc_maxlifetime', '86400');
session_set_cookie_params([
    'lifetime' => 86400,
    'path' => '/',
    'domain' => '',
    'secure' => $isHttps,
    'httponly' => true,
    'samesite' => $isHttps ? 'None' : 'Lax'
]);

// Start session
session_start();

// Database configuration from environment variables with defaults for local development
$DB_HOST = 'gateway01.eu-central-1.prod.aws.tidbcloud.com';
$DB_NAME = getenv('DB_NAME') ?: 'akusparkle';
$DB_USER = '25vHvthuqNzC1nn.root';
$DB_PASS = 'geFBwBGlKc8XEJZN';

try {
    $pdo = new PDO("mysql:host=$DB_HOST;dbname=$DB_NAME;charset=utf8mb4", $DB_USER, $DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'DB connection failed', 'details' => $e->getMessage()]);
    exit;
}

function json_input() {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function send($data, $code = 200) {
    http_response_code($code);
    echo json_encode($data);
    exit;
}
?>
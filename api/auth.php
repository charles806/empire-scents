<?php
require_once __DIR__ . '/config.php';

$action = $_GET['action'] ?? '';
if ($action === 'login') {
    $d = json_input();
    $stmt = $pdo->prepare('SELECT password_hash FROM admins WHERE username = ?');
    $stmt->execute([$d['username'] ?? 'admin']);
    $row = $stmt->fetch();
    if ($row && password_verify($d['password'] ?? '', $row['password_hash'])) {
        $_SESSION['admin'] = true;
        send(['success' => true]);
    }
    send(['success' => false, 'error' => 'Invalid credentials'], 401);
}
if ($action === 'logout') {
    session_destroy();
    send(['success' => true]);
}
if ($action === 'check') {
    send(['authenticated' => !empty($_SESSION['admin'])]);
}
send(['error' => 'Unknown action'], 400);
?>
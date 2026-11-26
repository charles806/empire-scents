<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? (int)$_GET['id'] : null;

if ($method === 'GET') {
    if ($id) {
        $stmt = $pdo->prepare('SELECT * FROM products WHERE id = ?');
        $stmt->execute([$id]);
        $p = $stmt->fetch();
        if (!$p) send(['error' => 'Not found'], 404);
        send($p);
    }
    $stmt = $pdo->query('SELECT * FROM products ORDER BY id DESC');
    send($stmt->fetchAll());
}

// writes require admin session
if (empty($_SESSION['admin'])) {
    send(['error' => 'Unauthorized'], 401);
}

if ($method === 'POST') {
    $d = json_input();
    $stmt = $pdo->prepare('INSERT INTO products (name, category, price, image, badge) VALUES (?,?,?,?,?)');
    $stmt->execute([$d['name'] ?? '', $d['category'] ?? '', $d['price'] ?? 0, $d['image'] ?? '', $d['badge'] ?? '']);
    send(['id' => (int)$pdo->lastInsertId(), 'success' => true], 201);
}
if ($method === 'PUT') {
    $d = json_input();
    if (!$id) send(['error' => 'Missing id'], 400);
    $stmt = $pdo->prepare('UPDATE products SET name=?, category=?, price=?, image=?, badge=? WHERE id=?');
    $stmt->execute([$d['name'] ?? '', $d['category'] ?? '', $d['price'] ?? 0, $d['image'] ?? '', $d['badge'] ?? '', $id]);
    send(['success' => true]);
}
if ($method === 'DELETE') {
    if (!$id) send(['error' => 'Missing id'], 400);
    $stmt = $pdo->prepare('DELETE FROM products WHERE id = ?');
    $stmt->execute([$id]);
    send(['success' => true]);
}
send(['error' => 'Method not allowed'], 405);
?>
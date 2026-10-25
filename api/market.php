<?php
/**
 * PaperclipGo v3.0 Super — Hardened Anonymous Market Price Proxy
 * - Enforces strict regex validation on `ids` and `vs_currencies`
 * - Uses 60-second server-side file cache in sys_get_temp_dir() to prevent CoinGecko 429s
 * - Strips user cookies/headers so visitor IP & portfolio structure are never leaked
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Cache-Control: public, max-age=60');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: no-referrer');

$rawIds = isset($_GET['ids']) ? trim($_GET['ids']) : 'bitcoin,ethereum,solana,pax-gold';
$rawVs  = isset($_GET['vs_currencies']) ? trim($_GET['vs_currencies']) : 'usd,eur,gbp,cad,aud';

if (!preg_match('/^[a-z0-9,-]{1,900}$/i', $rawIds)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid asset ID parameter']);
    exit;
}

if (!preg_match('/^[a-z,]{3,30}$/i', $rawVs)) {
    $rawVs = 'usd';
}

$cacheKey  = 'pcg_market_' . md5(strtolower($rawIds . '_' . $rawVs)) . '.json';
$cacheFile = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . $cacheKey;
$cacheTtl  = 60; // seconds

if (file_exists($cacheFile) && (time() - filemtime($cacheFile)) < $cacheTtl) {
    $cached = @file_get_contents($cacheFile);
    if ($cached !== false && strlen($cached) > 2) {
        echo $cached;
        exit;
    }
}

$apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=' . urlencode($rawIds)
        . '&vs_currencies=' . urlencode($rawVs)
        . '&include_24hr_change=true';

$ctx = stream_context_create([
    'http' => [
        'method'  => 'GET',
        'timeout' => 5,
        'header'  => "Accept: application/json\r\nUser-Agent: PaperclipGo-Anonymous-Proxy/3.0\r\n"
    ]
]);

$response = @file_get_contents($apiUrl, false, $ctx);

if ($response !== false && strlen($response) > 2) {
    @file_put_contents($cacheFile, $response, LOCK_EX);
    echo $response;
    exit;
}

// Serve stale cache if upstream is rate-limiting
if (file_exists($cacheFile)) {
    $stale = @file_get_contents($cacheFile);
    if ($stale !== false) {
        echo $stale;
        exit;
    }
}

http_response_code(502);
echo json_encode(['error' => 'Upstream market feed temporarily unavailable; client fallback active.']);

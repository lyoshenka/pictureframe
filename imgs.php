#!/usr/bin/php
<?php

$dir = 'images';
$fullDir = __DIR__ . '/' . $dir;
$outFile = 'images.json';


$images = array();

if (!is_dir($fullDir)) {
    echo "Cannot find directory: $fullDir\n";
    exit(1);
}

$handler = opendir($fullDir);
while ($file = readdir($handler)) {
    if ($file != "." && $file != ".." && preg_match('/\.(png|gif|jpe?g)$/i', $file)) {
        $images[] = $dir . '/' . $file;
    }
}

closedir($handler);

shuffle($images);
file_put_contents($outFile, json_encode($images));
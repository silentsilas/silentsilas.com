<?php
    header('Content-type:application/json;charset=utf-8');
    $data = file_get_contents("/mnt/rnn/poetry-latest.txt");
    $data = trim(preg_replace('/\s+/', ' ', $data));
    echo json_encode(array("text" => $data));
?>
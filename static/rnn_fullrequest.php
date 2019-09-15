<?php
    function get_string_between($string, $start, $end){
        $string = ' ' . $string;
        $ini = strpos($string, $start);
        if ($ini == 0) return '';
        $ini += strlen($start);
        $len = strpos($string, $end, $ini) - $ini;
        return substr($string, $ini, $len);
    }
    header('Content-type:application/json;charset=utf-8');
    $data = file_get_contents("/mnt/rnn/poetry-latest.txt");
    $data = trim(preg_replace('/\s+/', ' ', $data));
    $timestamp = get_string_between($data, "(Generated at ", ")");

    $data = substr($data, strpos($data, ") ") + 2);
    echo json_encode(array(
        "date" => $timestamp,
        "text" => $data
    ));
?>
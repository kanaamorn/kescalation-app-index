<?php 
header('Access-Control-Allow-Origin: *');
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
header("Content-Type: application/json; charset=UTF-8");

    $conn = new mysqli("localhost", "u464481892_adminkana", "4691_anaK", "u464481892_kescalation");
   // $result = $conn->query("SELECT MAX(ID) AS maxTime, MIN(ID) AS minTime FROM k ");
    $result = $conn->query("SELECT * FROM k ORDER BY ID DESC");
    $arr = array();
    while($row = $result->fetch_array(MYSQLI_ASSOC)) {
        $ID = $row['ID'];
        $ID1 = 'k_'.str_replace("-","_",$ID);
        array_shift($row);
        $arr[$ID1] = $row;

    }

    $conn->close();

    $json = json_encode($arr);

echo($json);



<?php
//php引入公共文件
require "conn.php";

$result = $conn->query("select * from goods");

$arr = array();
for ($i = 0; $i < $result->num_rows; $i++) {
    $arr[$i] = $result->fetch_assoc();
}
echo json_encode($arr);//将数组转为json字符串
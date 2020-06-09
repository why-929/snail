<?php

include "conn.php";

if (isset($_GET['id'])) {
    $id = $_GET['id']; //接收首页传入的id
    $result = $conn->query("select * from goods where id=$id");
    echo json_encode($result->fetch_assoc());
}
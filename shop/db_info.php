<?php
header("Content-Type: text/html; charset=UTF-8");
$host = "localhost";
$user = "intern20"; 
$pwd = "Apple55%%";
$dbname = "intern20";

$connect = mysqli_connect($host,$user,$pwd) or die("데이터베이스 접속오류!!");
mysqli_select_db($connect,$dbname);
?>
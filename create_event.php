<?php
require "database.php";
header("Content-Type: application/json");

session_start();




$name = $_POST["name"];
$date = $_POST["date"];
$creator = $_POST["creator"];
$content = $_POST["content"];
$time = $_POST["timetime"];
$category = $_POST['category'];
$urgency = $_POST['urgency'];
$token =$_POST['token_check'];


if(!hash_equals($_SESSION['token'], $_POST['token'])){
    echo json_encode(array("success"=>false,"message"=>"forgery detected!"));
    exit;
}



if (!isset($_POST["name"])|| !isset($_POST["date"]) || !isset($_POST["creator"]) || !isset($_POST["content"]) || !isset($_POST["timetime"]) ||!isset($urgency) || !isset($category)) {

	echo json_encode(array(
			"success" => false,
			"message" => "fields incomplete"
	));

}else{
	$stmt = $mysqli->prepare("insert into events (event_creator, event_title, event_time, event_category, event_urgency,event_content, event_date) value (?,?,?,?,?,?,?)");

	if(!$stmt){
		printf("Query Prep Failed: %s\n", $mysqli->error);
		echo json_encode(array(
			"success" => false,
			"message" => "prep error"
		));
		exit;
	}
	$stmt->bind_param('sssssss', $creator,$name, $time, $category, $urgency, $content, $date);

	$stmt->execute();

	$stmt->close();

	echo json_encode(array(
		"success" => true,
	));

	exit();

}
?>
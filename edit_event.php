<?php

require "database.php";
header("Content-Type: application/json");

session_start();

//check if the user has logged in and check the status of the token

if(!isset($_SESSION['user'])){
	echo json_encode(array(
			"success" => false,
			"message" => "invalid login. Please relogin."
	));
	exit();
}else if(!hash_equals($_SESSION['token'], $_POST['token'])){
	die("fraudulous request detected!");
}
	//if no comment id is passed to this page, page might be refreshed. will be redirected so that the user can resubmit the request

$username = $_SESSION['user'];


$name = htmlentities($_POST['name']);
$date = htmlentities($_POST['date']);
$creator = htmlentities($_POST['creator']);
$content = htmlentities($_POST['content']);
$time = htmlentities($_POST['timetime']);
$date = htmlentities($_POST['date']);
$category = htmlentities($_POST['category']);
$urgency = htmlentities($_POST['urgency']);
$id = htmlentities($_POST['id']);


if (!isset($_POST["name"])|| !isset($_POST["date"]) || !isset($_POST["creator"]) || !isset($_POST["content"]) || !isset($_POST["timetime"]) ||!isset($urgency) || !isset($category) ||!isset($id)) {

	echo json_encode(array(
			"success" => false,
			"message" => "fields incomplete"
	));

}

//now delete the story itself
$stmt = $mysqli->prepare("UPDATE events SET event_date=?, event_title=?, event_time=?, event_category=?, event_urgency=?, event_content=?, event_date=? WHERE event_id=?");
 if(!$stmt){
  printf("Query Prep Failed: %s\n", $mysqli->error);
  exit;
 }

$stmt->bind_param('sssssssi', $date, $name, $time, $category, $urgency, $content, $date, $id);

$stmt->execute();

$stmt->close();

echo json_encode(array(
	"success" => true,
	"message" => "You have updated the event!"
));

exit;



 
?>
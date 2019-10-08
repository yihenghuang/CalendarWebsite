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

// $username = $_SESSION['user'];
$id = $_POST['event_id'];
$token = $_POST['token'];


//now delete the story itself
$stmt = $mysqli->prepare("DELETE from events where event_id=?");
 if(!$stmt){
  printf("Query Prep Failed: %s\n", $mysqli->error);
  exit;
 }

$stmt->bind_param('i', $id);

$stmt->execute();

$stmt->close();

echo json_encode(array(
	"success" => true,
	"message" => "You have deleted the event!"
));
exit;



 
?>
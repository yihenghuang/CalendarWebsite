<?php
// login_ajax.php
header("Content-Type: application/json");
require 'database.php';
 // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json
session_start();
if(!isset($_SESSION['user'])){
	echo json_encode(array(
			"success" => false,
			"message" => "invalid login. Please relogin."

	));
	exit();
}

$username = $_POST['username'];
$username = htmlentities($_POST['username']);



$stmt =$mysqli->prepare("SELECT * FROM events where event_creator=?");
if(!$stmt){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	exit;
}
$stmt->bind_param('s', $username);
$stmt->execute();
$stmt->bind_result($event_creator, $event_title, $event_time, $event_category, $event_urgency, $event_content, $event_id, $event_date);
$ret = array();
while ($stmt->fetch()){
	$temp = array("success" => true,
	"event_creator"=>$event_creator,
	"event_title"=> $event_title,
	"event_time"=>$event_time,
	"event_category"=>$event_category,
	"event_urgency"=>$event_urgency,
	"event_content"=>$event_content,
	"event_id"=>$event_id,
	"event_date"=>$event_date
);
array_push($ret, $temp);
}	
$stmt->close();

echo json_encode($ret);
exit;


?>
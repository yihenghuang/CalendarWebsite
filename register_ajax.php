<?php
// login_ajax.php

require 'database.php';
header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json

$username = $_POST['username'];
$password = $_POST['password'];


if(trim($_POST['username']) == '' || trim($_POST['password']) ==''){
	echo json_encode(array(
			"success" => false,
			"message" => "username or password cannot be empty. please reenter"
		));
	exit;

}else if( !preg_match('/^[\w_\.\-]+$/', $username) ){
	echo json_encode(array(
		"success" => false,
		"message" => "Invalid username. Words cannot contain special characters. Please reenter"
	));
	exit;

}

// Check to see if the username and password are valid.  (You learned how to do this in Module 3.)

//prepare the statement to check ff the username is already taken
$stmt = $mysqli->prepare("SELECT COUNT(*) as user_cnt FROM users WHERE username=?");
if(!$stmt){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	exit();
}
$stmt->bind_param('s',$username);
$stmt->execute();
//do not bind_result();
$result =$stmt->get_result();
while($row = $result->fetch_assoc()){
	//if there are any duplicates
	if ($row["user_cnt"]!=0) {
	echo json_encode(array(
			"success" => false,
			"message" => "user already existed, please user another name"
		));
	exit;
	}
}
$stmt->close();
//if passes the check on duplicate username
//insert the hashed password to database.
$stmt = $mysqli->prepare("INSERT into users (username,password) values (?,?)");
if(!$stmt){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	exit;
}
//hashed the password and gives it a salt
$password_hashed = password_hash($password,PASSWORD_BCRYPT);

$stmt->bind_param('ss', $username, $password_hashed);

$stmt->execute();

$stmt->close();

//if successfully processed to here, registration is successful
session_start();
$_SESSION['user'] = $username;
//besides user session. add a token session for an extra layer of security
$token = bin2hex(openssl_random_pseudo_bytes(32));
$_SESSION['token']=$token;

echo json_encode(array(
		"success" => true,
	));
exit;

	
?>
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

	//login. if the username doesn't exist in database yet.
	//if username exists, checking the password. binding the username with the param to fetch the hashed password stored in database
$stmt =$mysqli->prepare("SELECT COUNT(*) as user_cnt FROM users where username=?");
if(!$stmt){
	printf("Query Prep Failed: %s\n", $mysqli->error);
	exit;
}
$stmt->bind_param('s', $username);
$stmt->execute();
//here check if the result is empty, ie if the user tries to log into an account that's not registered yet 
$result = $stmt->get_result();
$row_cnt = $result->num_rows;
$stmt->close();
if($row_cnt == 0){
    echo json_encode(array("success"=>false,"message"=>"user not found, please check the username."));
    exit;
}else { //if the username exists. check password
	$stmt =$mysqli->prepare("SELECT password FROM users where username=?");
	if(!$stmt){
		printf("Query Prep Failed: %s\n", $mysqli->error);
		exit;
	}
	$stmt->bind_param('s', $username);
	$stmt->execute();
	$stmt->bind_result($db_password);
	$stmt->fetch();
	$stmt->close();

	//according to php.net, password verify is used to check if a password matches a hashed password

	//if the password matches 
	if(password_verify($password, $db_password)){
		session_start();
		$_SESSION['user'] = $username;
		//besides user session. add a token session for an extra layer of security
		$token = bin2hex(openssl_random_pseudo_bytes(32));
		$_SESSION['token']=$token;

		echo json_encode(array(
				"success" => true,
				"token"=> $token
			));
			exit;
	}else{//if the password doesn't match
		echo json_encode(array(
				"success" => false,
				"message" => "Incorrect Username or Password"
			));
		exit;
	}
}
	
?>
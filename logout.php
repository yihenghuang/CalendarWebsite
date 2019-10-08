<?php
session_start();
if(!isset($_SESSION['user'])){
	echo "invalid logout";
	header("refresh:2;url=calendarPage.php");
	exit();
}
//destroy all the session and be redirected.
session_destroy();
echo "you have been logged out!";
header("Location:calendarPage.php");
exit();


?>
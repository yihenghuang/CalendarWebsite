<!DOCTYPE html>
<html =en>
<head>
	<title>My Calendar Page</title>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="stylesheet.css" />

<!-- <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
<link rel="stylesheet" href="https://code.jquery.com/ui/1.11.1/themes/smoothness/jquery-ui.css" />
<link rel="stylesheet" href="//jonthornton.github.io/jquery-timepicker/jquery.timepicker.css">
<script src="//jonthornton.github.io/jquery-timepicker/jquery.timepicker.js"></script> -->

<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/start/jquery-ui.css">
<link rel="stylesheet" href="//jonthornton.github.io/jquery-timepicker/jquery.timepicker.css">
<!-- <script src="//jonthornton.github.io/jquery-timepicker/jquery.timepicker.js"></script> -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
 <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

</head>

<body>

	<div id="login_div">
		<p>Please Login</p><br>
		Username: <input type="text" id="username" required><br>
		Password: <input type="password" id=password required><br>
		<input type="submit" name="login_btn" id="login_btn" value="LOGIN" /> <br>
		<input type="submit" name="register_btn" id="register_btn" value="REGISTER" /> <br>
	</div>



<!--calendar CSS acknowledgement: w3cschool-->
	<div id="calendar">

		<div class="month">

			<div class="jump" >
				<label id="JumpToM">TO MONTH: </label>
				     <input list="ToMonth" name="ToMonth" id="inputmonth" placeholder="MONTH">
				      <datalist id="ToMonth">
				       <option value="JANUARY">
				       <option value="FEBRUARY">
				       <option value="MARCH">
				       <option value="APRIL">
				       <option value="MAY">
				       <option value="JUNE">
				       <option value="JULY">
				       <option value="AUGUST">
				       <option value="SEPTEMBER">
				       <option value="OCTOBER">
				       <option value="NOVEMBER">
				       <option value="DECEMBER">
				    </datalist>

				<label id="JumpToY"> OF YEAR: </label>
				<input type="number" id="ToYear" pattern="[0-9]{4}" placeholder="4-digit year" required>
				<input type="submit" name="jumpto" id="jump_month_btn" value="Go!">
			</div>

			<ul class="month_up">
				<li class="prev" id="prev_month_btn"> &#10094; </button></li>
				<li class="next" id="next_month_btn"> &#10095;</button></li>

				<li id="this_month"><strong>JULY<br><span style=font-size:18px>2018</span></strong></li>
			</ul>
			<br>
			<button class="curr" id="curr_month_btn">Back To Current Month</button>
		</div>

		<ul class="weekdays">
			<li>Sunday</li>
			<li>Monday</li>
			<li>Tuesday</li>
			<li>Wednesday</li>
			<li>Thursday</li>
			<li>Friday</li>
			<li>Saturday</li>
		</ul>

		<ul id="post-login-days" class="days" style="display: none">

		</ul>
		<ul id="before-login-days" class="days">
		</ul>




	<div class="event_modal" id="my_modal">

		 <!--  <button id="edit_btn">ADD </button>
		 	<button id="delete_btn">DELETE </button> -->
		 	<div id="add_event" class="modal">
		 		<form class="modal-content animate" id="create_event_form">
		 			<div class="imgcontainer">
		 				<span onclick="document.getElementById('add_event').style.display='none'" class="close" title="Close Modal">&times;</span>
		 			</div>
		 			<div class="container">
		 				<label for="title">Event Title:</label>
		 				<input type="text" name="eventName" id="new_name"> <br>

		 				<div id="event_time_date">
		 					<label for="event_date">Select Event Date:</label>
		 					<input type ="text" name="datepicker" class="form-control" id="datepicker" /> <br/>

		 					<label for="event_time">Select Event Time:</label>
		 					<input type ="text" name="timepicker" class="form-control" id="timepicker" />
		 					<br>
		 				</div>


		 				<div class="form-group">
		 					<label for="event-category">Select Event Category:</label>
		 					<select class="form-control" id="event_category" required>
		 						<option>Personal</option>
		 						<option>School</option>
		 						<option>Social</option>
		 						<option>Family</option>
		 						<option>Errand</option>
		 						<option>Other</option>
		 					</select>
		 				</div>

		 				<div class="form-group">
		 					<label for="event_urgency">Select Urgency:</label>
		 					<select class="form-control" id="event-urgency"required>
		 						<option>Urgent</option>
		 						<option>Not Urgent</option>
		 					</select>
		 				</div>

		 			</div>
		 			<div class="form-group">
		 				<label for="event_content">Fill Out Event Content:</label><br>
		 				<textarea id="event_content" class="event_content" >Event Specifics..</textarea>
		 			</div>

		 			<div id="event-id" style="display: none">
		 			</div>



		 			<div class="container" style="background-color:#f1f1f1">
		 				<input type = "submit" value="Create New Event"/>

		 				<button type="button" onclick="document.getElementById('add_event').style.display='none'" class="cancelbtn">Cancel</button>
		 			</div>


		 		</form>
		 	</div>
		 </div>

		 <!-- ********Uodate Event Form ***********-->
		 <div class="event_modal" id="update_modal">
		 	<div id="update_event" class="modal">
		 		<form class="modal-content animate" id="update_event_form">
		 			<div class="imgcontainer">
		 				<span onclick="document.getElementById('update_event').style.display='none'" class="close" title="Close Modal">&times;</span>
		 			</div>
		 			<div class="container">
		 				<label for="title">Event Title:</label>
		 				<input type="text" name="update_eventName" id="up_name"/> <br>

		 				<div id="event_time_date_update">
		 					<label for="event_date">Select Event Date:</label>
		 					<input type ="text" name="datepicker" class="form-control" id="datepicker1" /> <br/>

		 					<label for="event_time">Select Event Time:</label>
		 					<input type ="text" name="timepicker" class="form-control" id="timepicker1" />
		 					<br>
		 				</div>


		 				<div class="form-group">
		 					<label for="event-category">Select Event Category:</label>
		 					<select class="form-control" id="update_event_category" required>
		 						<option>Personal</option>
		 						<option>School</option>
		 						<option>Social</option>
		 						<option>Family</option>
		 						<option>Errand</option>
		 						<option>Other</option>
		 					</select>
		 				</div>

		 				<div class="form-group">
		 					<label for="event_urgency">Select Urgency:</label>
		 					<select class="form-control" id="update_event-urgency"required>
		 						<option>Urgent</option>
		 						<option>Not Urgent</option>
		 					</select>
		 				</div>

		 			</div>
		 			<div class="form-group">
		 				<label for="event_content">Fill Out Event Content:</label><br>
		 				<textarea id="update_event_content" class="event_content" >Event Specifics..</textarea>
		 			</div>

		 			<div id="event-id" style="display: none">
		 			</div>



<div class="container" style="background-color:#f1f1f1">

	<input type = "submit" value="Update Event" id="update_event_btn" onclick="document.getElementById('update_event').style.display='none'"/>

	<button type="button" onclick="document.getElementById('update_event').style.display='none'" class="cancelbtn">Cancel</button>
</div>

</form>

</div>
</div>

<div id="token_check">
</div>


<div id="things-to-do" class="ui-widget">
	<table id="events" class="ui-widget-content">
		<thead>
			<tr class="ui-widget-header">
				<th> Event Title| </th>
				<th> Event Content   |</th>
				<th> Event Time     |</th>
				<th> Event Date     |</th>
				<th> Event Urgency     |</th>
				<th> Event Category     |</th>

			</tr>
		</thead>
		<tbody id="events-tbody">
			<tr>

			</tr>
		</tbody>
	</table>
</div>
	<div id="after_login" style="display:none">
		<form action="logout.php" method="POST">
		<input type="submit" name="logout_btn" id="logout_btn" value="LOGOUT" action="logoug.php"/> <br>
	</form>
	</div>


<script>
	// var modal = document.getElementById("my_modal");
	// window.onclick = function(event){
	// 	if(event.target == modal){
	// 		modal.style.display="none";
	// 	}
	// }
</script>

<script type="text/javascript" src="login&register.js"></script>
<script type="text/javascript" src="calendar_helper.js"></script>
<script type="text/javascript" src="calendar.js"></script>
<script type="text/javascript" src="create_event.js"></script>

<script src="//cdnjs.cloudflare.com/ajax/libs/timepicker/1.3.5/jquery.timepicker.min.js"></script>

<!-- <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
 -->
</body>

</html>
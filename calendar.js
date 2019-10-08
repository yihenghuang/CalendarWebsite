// For our purposes, we can keep the current month in a variable in the global scope
var curr_month = new Month(2018, 6); // July 2018
//get months variable for use later 
var Months_arr = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"]
var added_event=[];
//update calendar whenever loads the page 
updateCalendar();
fetch_data();


// Change the month when the "previous" button is pressed
document.getElementById("prev_month_btn").addEventListener("click", function(event){
	curr_month = curr_month.prevMonth(); // Previous month would be curr_month.prevMonth()
		//reset days array
		document.getElementById("post-login-days").innerHTML = "";
		document.getElementById("before-login-days").innerHTML = "";

	updateCalendar(); // Whenever the month is updated, we'll need to re-render the calendar in HTML
	//alert("The new month is "+curr_month.month+" "+curr_month.year);
}, false);


// Change the month when the "next" button is pressed
document.getElementById("next_month_btn").addEventListener("click", function(event){
	curr_month = curr_month.nextMonth(); // Previous month would be curr_month.prevMonth()
		//reset days array
		document.getElementById("post-login-days").innerHTML = "";
		document.getElementById("before-login-days").innerHTML = "";

	updateCalendar(); // Whenever the month is updated, we'll need to re-render the calendar in HTML
	//alert("The new month is "+curr_month.month+" "+curr_month.year);
}, false);

// function dropdown() {
// 	document.getElementById("myDropdown").classList.toggle("show");
// }

// // Close the dropdown if the user clicks outside of it
// window.onclick = function(event) {
// 	if (!event.target.matches('.dropbtn')) {

// 		var dropdowns = document.getElementsByClassName("dropdown-content");
// 		var i;
// 		for (i = 0; i < dropdowns.length; i++) {
// 			var openDropdown = dropdowns[i];
// 			if (openDropdown.classList.contains('show')) {
// 				openDropdown.classList.remove('show');
// 			}
// 		}
// 	}
// }

//back to current month method: clicking on this will take user back to current month
//when navigating
document.getElementById("curr_month_btn").addEventListener("click", function(event){
 
 var d = new Date();
 curr_month = new Month(d.getFullYear(), d.getMonth());

document.getElementById("post-login-days").innerHTML = "";
document.getElementById("before-login-days").innerHTML = "";
 updateCalendar(); // Whenever the month is updated, we'll need to re-render the calendar in HTML
 alert("Back to the current month "+ Months_arr[curr_month.month] + " of year " + curr_month.year);
}, false);


//jump to certain month/ year. 
document.getElementById("jump_month_btn").addEventListener("click", function(event){
 
 //convert month int input to string input
 var jumpm = Months_arr.indexOf(document.getElementById('inputmonth').value);
 var jumpy= document.getElementById('ToYear').value;
var d= new Date(jumpy,jumpm);
curr_month= new Month(d.getFullYear(), d.getMonth());
//reset the calendar at the screen for printing jump-to month
document.getElementById("post-login-days").innerHTML = "";
document.getElementById("before-login-days").innerHTML = "";
 updateCalendar(); // Whenever the month is updated, we'll need to re-render the calendar in HTML
 alert("Go to "+Months_arr[curr_month.month]+ " Of Year "+curr_month.year);
}, false);

//print calendar 
function updateCalendar(e){
	fetch_data();
	var mm = curr_month.getDateObject(1).getMonth();
	var yyyy =curr_month.getDateObject(1).getFullYear();

	//getting year and month of current
	var month = Months_arr[curr_month.month];
	var year = curr_month.year;

	//reset header 
	document.getElementById("this_month").innerHTML = "";
	document.getElementById("this_month").innerHTML += month + "<br><span style='font-size:18px'>" +year +"</span>";
	document.getElementById('inputmonth').value = "";
 	document.getElementById('ToYear').value = "";

	var weeks = curr_month.getWeeks();
	//get the weekday of the first day, eg. this month's first day as a weekday is thursday
	var firstDay = curr_month.getDateObject(1).getDay();
	//similarly get the last day
	var lastDay = curr_month.nextMonth().getDateObject(0).getDay();

	for(var week in weeks){
  // days contains normal JavaScript Date objects.
  var days_arr = weeks[week].getDates();

  //alert("Week starting on "+days_arr[0]);
  if(week==0){
  	for(var i=0; i<7; i++){
 //get current month +1 and id prepared
 var month = curr_month.month +1;
 var id = "'" + curr_month.year + month + days_arr[i].getDate()+ "'";
//splice the days of date after 7== meaning that those days are grouped in from last several days 
//of last month
 if(days_arr[i].getDate()>7){
 	//if those days are from last month, don't add button to the date
 	document.getElementById("post-login-days").innerHTML += "<li id=" + id + ">"+days_arr[i].getDate() + "</li>";
 	document.getElementById("before-login-days").innerHTML += "<li class='prev-login' id=" + id + ">"+days_arr[i].getDate() + "</li>";
 }else{
 	//else add button to that day
 	document.getElementById("post-login-days").innerHTML+="<li id=" + id + "><button class='new_button' onclick='" + "document.getElementById(\"add_event\").style.display=\"block\"'" + " style='width:auto;'>"+  days_arr[i].getDate() +"</button>";
 	document.getElementById("before-login-days").innerHTML += "<li  id=" + id + ">"+days_arr[i].getDate() + "</li>";
 }
}
}
//if it's the last week
else if(week==weeks.length-1){
	for(var i=0; i<7; i++){
		//get the common sense month
		var month = curr_month.month +1;
		var id = "'" + curr_month.year + month + days_arr[i].getDate()+ "'";
		//similarly as above, if a date is less than 7, it means it's grouped from next month's days
		if(days_arr[i].getDate() <7){
			//do notadd button
			document.getElementById("post-login-days").innerHTML += "<li id=" + id + ">"+days_arr[i].getDate() + "</li>";
			document.getElementById("before-login-days").innerHTML += "<li class='prev-login' id=" + id + ">"+days_arr[i].getDate() + "</li>";
		}else{
			//add button
			document.getElementById("post-login-days").innerHTML+="<li id=" + id + "><button class='new_button' onclick='" + "document.getElementById(\"add_event\").style.display=\"block\"'" + " style='width:auto;'>"+  days_arr[i].getDate() +"</button>";
			document.getElementById("before-login-days").innerHTML += "<li id=" + id + ">"+days_arr[i].getDate() + "</li>";
		}
	}


}
else{
	for(var i=0; i<7; i++){
		var month = curr_month.month +1;
		var id = "'" + curr_month.year + month + days_arr[i].getDate()+ "'";
		// var ul = document.getElementById("days");
		// var li = document.createElement("li");
		// li.appendChild(document.createTextNode(days_arr[i].getDate()));
		// li.setAttribute("id", id); // added line
		// ul.appendChild(li);
		document.getElementById("post-login-days").innerHTML+="<li id='" + id + "'><button class='new_button' onclick='" + "document.getElementById(\"add_event\").style.display=\"block\"'" + " style='width:auto;'>"+  days_arr[i].getDate() +"</button>";
		document.getElementById("before-login-days").innerHTML += "<li id=" + id + ">"+days_arr[i].getDate() + "</li>";
	} 
}
}
}

//get the events data from database 
function fetch_data(event) {
	//prepare string to pass as Ajax
    const username = document.getElementById("username").value; // Get the username from the form
    var dataString = "username=" + encodeURIComponent(username);
    
    var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
    xmlHttp.open("POST", "update_calendar.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
    xmlHttp.addEventListener("load", function(event){

    var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript objectda
    var length = jsonData.length;
    if(length > 0){
    	if(jsonData[0].success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
            //token=jsonData.token;

            for (var i = 0; i <length; i++) {
            	//alert("Successfully getting data");

            	//geting info
            	event_time = jsonData[i].event_time;
            	event_category=jsonData[i].event_category;
            	event_title = jsonData[i].event_title;
            	event_urgency = jsonData[i].event_urgency;
            	event_content = jsonData[i].event_content;
            	event_date = jsonData[i].event_date;
            	event_id = jsonData[i].event_id;
            	//exclude the situation when there's no event associated
            	if(event_title !=null){
            		var index = $.inArray(event_id, added_event);
            		if (index >= 0) {

            		}else{
            			//print event details
            			$( "#events-tbody tr:last" ).append("<br><br><tr id='"+event_id+"'>"+
            				"<td> " + event_title + " </td>"+
            				"<td> " + event_content + " </td>" +
            				"<td> " + event_time + " </td>" +
            				"<td> " + event_date + " </td>" +
            				"<td> " + event_urgency + " </td>" +
            				"<td> " + event_category + " </td>" +
            				"<td>" +"<form class='" + "button_form' onclick='delete_ajax()'>" +
            				"<button id='" +event_id+"' class='delete_button'> Delete Event </button></form></td>" +
            				"<td><form class='" + "edit_form'>" +
            				"<button id='e" +event_id+ "' class='edit_button' onclick='" + "document.getElementById(\"update_event\").style.display=\"block\"'" + " style='width:auto;'> Edit Event </button></form></td>" +
            				"</tr><br>");
            			//creative ** if event is urgent, change the button color to red for indication
            		if (event_urgency=== "Urgent"){//"Urgent" ???

            			//parse date/year/ month from the data string
                  	var month = event_date.substr(0,2);
                  	if( month.substr(0,1) == 0){
                  		month = month.substr(1,1);
                  	}
                    var date = event_date.substr(3,2);
                  	if( date.substr(0,1) == 0){
                  		date = date.substr(1,1);
                  	}            	
                    var year = event_date.substr(6,4);
                  	var id = String(year) + String(month) + String(date);
                  	document.getElementById(id).classList.add("red");


                  }
                  //to prevent duplicate printing of the same event, push the event to array when 
                  //it's been printed
            		added_event.push(event_id);
            				// find the days bracket with urgent and set them to red
                  //alternative is to change style= in li 

	            	}
	            }
	        }
	    }


     }else{

     	//alert("Failure: "+jsonData.message);
     }
    }, false); // Bind the callback to the load event
    xmlHttp.send(dataString); // Send the data
    //create_calendar_body();
}
document.getElementById("login_btn").addEventListener("click", fetch_data, false); // Bind the AJAX call to button click

//delete event ajax 
function delete_ajax(event) {
	$(document).on('click', '.delete_button', function(e) {
		e.preventDefault();
		var id =e.target.id;
		//pass token for security verification
		token = document.getElementById("token_check").value;
		var dataString = "event_id=" + encodeURIComponent(id) + "&token=" + encodeURIComponent(token);

	    var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
	    xmlHttp.open("POST", "delete_event.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
	    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
	    xmlHttp.addEventListener("load", function(event){

	    var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object

	    if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
	    //token=jsonData.token;
	    //if successfully deleted, print the message 
	    alert(jsonData.message);
	    fetch_data();
	    //remove the event printed associated with this id
	    document.getElementById(id).remove();
	}else{
		alert("Event was not deleted"+jsonData.message);
	}
	    }, false); // Bind the callback to the load event
	    xmlHttp.send(dataString); // Send the data
    //create_calendar_body();
});
}


//update event jquery
 $(document).ready(function() {
 	//when this form is submitted, do the following
	$("#update_event_form").submit(function (e) {
		//prevent auto resubmission
		e.preventDefault();
		//fetch all the data needed to update the event 
		var dialog,form,
		name = document.getElementById("up_name"),
		creator =document.getElementById("username"),
		time = document.getElementById("datepicker1"),
		timetime= document.getElementById("timepicker1"),
		category = $("#update_event_category"),
		urgency = $("#update_event-urgency"),
		content =document.getElementById("update_event_content");
		id = document.getElementById("event-id");
		//as well as the token
		token = document.getElementById("token_check");
		//use ajax to POST data to php
		$.ajax({
			url: 'edit_event.php',
			type: 'POST',
			data: {
				'name': name.value,
				'date': time.value,
				'creator': creator.value,
				'content': content.value,
				'timetime': timetime.value,
				'category':category.val(),
				'urgency' : urgency.val(),
				'id':id.value,
				'token' : token.value
			},

			success: function(data){
				//after successful editting, print the message 
				if(data[0].success){
					fetch_data();
					alert(data.message);
			             }
			             else{
			             	alert(data.message);

			             }
			         }

			     });
	});
});



//
 $(document).ready(function() {
 	$(document).on('click', '.edit_button', function(e) {
	e.preventDefault();
	var data =e.target.id;
	var id = data.substring(data.indexOf('e')+1);
	//$('#my_modal').modal('')
	document.getElementById("event-id").value = id;

	});
});

 

$(document).ready(function(){
	$('#datepicker1').datepicker({
		onSelect: function(dataText,inst){
			$("input[name='datepicker1']").val(dataText);
		}
	});
})

$(document).ready(function(){
	$('#timepicker1').timepicker({
		onSelect: function(dataText,inst){
			$("input[name='timepicker1']").val(dataText);
		}
	});
})






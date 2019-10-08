// ajax.js

function loginAjax(event) {
    const username = document.getElementById("username").value; // Get the username from the form
    const password = document.getElementById("password").value; // Get the password from the form

    var dataString = "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);
    
    var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
    xmlHttp.open("POST", "login_ajax.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
    xmlHttp.addEventListener("load", function(event){

    var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object

        
    if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
            token=jsonData.token;
            alert("You've been Logged In as " + username + " !");
            //document.getElementById("user_status").innerHTML = username;
            //document.getElementById("calendar").style.display="block";
            document.getElementById("after_login").style.display="block";
            document.getElementById("login_div").style.display="none";
            document.getElementById("token_check").value = token;
            document.getElementById("post-login-days").style.display = "block";
            document.getElementById("before-login-days").style.display = "none";
            //alert(token);
            //list_events();
        }else{

            alert("You were not logged in.  "+jsonData.message);
        }
    }, false); // Bind the callback to the load event
    xmlHttp.send(dataString); // Send the data
    //create_calendar_body();
}

document.getElementById("login_btn").addEventListener("click", loginAjax, false); // Bind the AJAX call to button click

// ajax.js

function registerAjax(event) {
    const username = document.getElementById("username").value; // Get the username from the form
    const password = document.getElementById("password").value; // Get the password from the form
    // Make a URL-encoded string for passing POST data:
    // Make a URL-encoded string for passing POST data:
    var dataString = "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);
    
    var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
    xmlHttp.open("POST", "register_ajax.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
    xmlHttp.addEventListener("load", function(event){

    var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object

        
    if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
            token=jsonData.token;
            alert("You've been registered as " + username + " !");
            // document.getElementById("user_status").innerHTML = username;
            // document.getElementById("calendar").style.display="block";
            document.getElementById("after_login").style.display="block";
            document.getElementById("login_div").style.display="none";
            document.getElementById("token_check").innerHTML=token;
            document.getElementById("post-login-days").style.display = "block";
            document.getElementById("before-login-days").style.display = "none";
            //list_events();
        }else{
            alert("You were not logged in.  "+jsonData.message);
        }
    }, false); // Bind the callback to the load event
    xmlHttp.send(dataString); // Send the data
    //create_calendar_body();
}

document.getElementById("register_btn").addEventListener("click", registerAjax, false); // Bind the AJAX call to button click
// ajax.js

function logoutAjax(event) {
    
    var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
    xmlHttp.open("GET", "logout.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
    xmlHttp.addEventListener("load", function(event){

        
    if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
            token="";//destroy token after success..
            alert("You've been Logged In as " + username + " !");
            //document.getElementById("user_status").innerHTML = username;
            //document.getElementById("calendar").style.display="block";
            document.getElementById("after_login").style.display="none";
            document.getElementById("login_div").style.display="block";
              document.getElementById("before-login-days").style.display="block";
                            document.getElementById("post-login-days").style.display="none";
            //alert(token);
            //list_events();
        }else{

            alert("You were not logged out.  "+jsonData.message);
        }
    }, false); // Bind the callback to the load event
    xmlHttp.send(dataString); // Send the data
    //create_calendar_body();
}

document.getElementById("logout_btn").addEventListener("click", logoutAjax, false); // Bind the AJAX call to button click
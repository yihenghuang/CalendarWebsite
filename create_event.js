
 $(document).ready(function() {
	$("#create_event_form").submit(function (e) {
		e.preventDefault();
		alert("submited");
		var dialog,form,
		name = document.getElementById("new_name"),
		creator =document.getElementById("username"),
		time = document.getElementById("datepicker"),
		timetime= document.getElementById("timepicker"),
		category = $("#event_category"),
		urgency = $("#event-urgency"),
		content =document.getElementById("event_content");
		token = document.getElementById("token_check");
		$.ajax({
			url: 'create_event.php',
			type: 'POST',
			data: {
				'name': name.value,
				'date': time.value,
				'creator': creator.value,
				'content': content.value,
				'timetime': timetime.value,
				'category':category.val(),
				'urgency' : urgency.val(),
				'token' : token.value
			},

			success: function(data){

				if(data.success){
					fetch_data();
					alert("successsully added"); 
			             }
			             else{
			             	alert(data.message);

			             }
			         }

			     });
	});
});








$(document).ready(function(){
	$('#datepicker').datepicker({
		onSelect: function(dataText,inst){
			$("input[name='datepicker']").val(dataText);
		}
	});
})

$(document).ready(function(){
	$('#timepicker').timepicker({
		onSelect: function(dataText,inst){
			$("input[name='timepicker']").val(dataText);
		}
	});
})














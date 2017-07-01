$(document).ready(function(){

	//password confirmation
	$('#password, #password_confirmation').on('keyup', function () {
  		if ($('#password').val() == $('#password_confirmation').val()) {
    		$('#message').html('Matching').css({"color":"White", "background-color":"Green"});
    		$("#Register").prop("disabled", false);
  		}else{
    		$('#message').html('Not Matching').css({"color":"White", "background-color":"Red"});
    		$("#Register").prop("disabled", true);
  		}
	});

	//On Register Click
	$("#Register").click(function(e){

		e.preventDefault();

		//ajax request to auth - SIGNUP
		$.ajax({
			method: "POST",
			url: 'http://auth.c100.hasura.me/signup',
			headers:{"Content-Type" : "application/json"},
			data: JSON.stringify({
				"username": $("#username").val(),
				"email"	  : $("#email").val(),	
				"password": $("#password").val()
			})
		}).done(function(){

			//user logged in
			alert("User Registered");
			window.location.href = "http://localhost:8080/dashboard";

		}).fail(function(data){

			//Sign up failed
			alert("fail :"+JSON.parse(data.responseText).message);
		});

	});

	$("#Login").click(function(e){

		e.preventDefault();
		//ajax request to auth - LOG IN
		$.ajax({
			method: "POST",
			url: 'http://auth.c100.hasura.me/login',
			headers:{"Content-Type" : "application/json"},
			data: JSON.stringify({
				"username": $("#username").val(),	
				"password": $("#password").val()
			})
		}).done(function(data){

			alert("User Logged In");
			token = data.auth_token;
			userId = data.hasura_id;

			//goto dashboard
			window.location.href = "http://localhost:8080/dashboard";

			//set cookie
			var d = new Date();
			d.setTime(d.getTime() + (1*24*60*60*1000));
			//expiry time
			var expires = "expires="+ d.toUTCString();
			//set cookie
			document.cookie = 'cookie_name'+"="+ token +";"+ expires + ";path=/";

		}).fail(function(data){

			//Sign up failed
			alert("fail :"+JSON.parse(data.responseText).message);
		});
	});

});
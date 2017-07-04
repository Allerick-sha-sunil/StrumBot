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
			//alert("User Registered");
			//window.location.href = "http://localhost:8080/dashboard";
			window.location.href = "http://strumbot.c100.hasura.me/dashboard";

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
				"username": $("#L_username").val(),	
				"password": $("#L_password").val()
			})
		}).done(function(data){
			//goto dashboard
			window.location.href = "http://strumbot.c100.hasura.me/dashboard";
			//window.location.href = "http://localhost:8080/dashboard";

			localStorage.setItem('token', JSON.stringify(data.auth_token));
			//alert(localStorage.getItem('token'));

		}).fail(function(data){

			//Sign up failed
			alert("fail :"+JSON.parse(data.responseText).message);
		});
	});

	$("#logout").click(function(e){

		e.preventDefault();
		var token=JSON.parse(localStorage.getItem('token'));
		//alert(token);
		
		var request = new XMLHttpRequest();
		   request.onreadystatechange = function() {
        if(request.readyState === XMLHttpRequest.DONE) {
            if(request.status ===200) {
                //alert('Logged out successfully');
                //window.location.href = "http://localhost:8080";
                window.location.href = "http://strumbot.c100.hasura.me";
            }
            else if(request.status===500){
                alert('Something went wrong on the server');
            }
        }
    };
		request.open('POST' , 'http://auth.c100.hasura.me/user/logout', true);
		request.setRequestHeader('Content-Type','application/json');
		request.setRequestHeader('Authorization','Bearer '+ token);
		request.withCredentials = true;
		request.send(null);

	});

	$("#write").click(function(e){

	//window.location.href = "http://localhost:8080/write";
	window.location.href = "http://strumbot.c100.hasura.me/write";

	});

	$("#notes").click(function(e){

	//window.location.href = "http://localhost:8080/notes";
	window.location.href = "http://strumbot.c100.hasura.me/notes";

	});

	$("#notes").click(function(e){

	//window.location.href = "http://localhost:8080/search";
	window.location.href = "http://strumbot.c100.hasura.me/search";

	});


});
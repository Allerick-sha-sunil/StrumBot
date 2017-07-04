$(document).ready(function(){

	var token = $("#token").html();
    console.log(token);
    console.log(typeof token);

	$("#logout").click(function(e){

		e.preventDefault();
		//ajax request to auth - LOG IN
		$.ajax({
			method: "POST",
			url: 'http://auth.c100.hasura.me/user/logout',
			headers:{"Content-Type" : "application/json"},
			'Authorization': token
		}).done(function(data){
			
			//goto dashboard
			window.location.href = "http://strumbot.c100.hasura.me";

		}).fail(function(data){

			//Sign up failed
			alert("fail :"+JSON.parse(data.responseText).message);
		});
	});

});
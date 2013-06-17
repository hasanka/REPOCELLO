/**
 * Onload function
 */

$(function() {

	var objRegExp  =  /(^https?:\/\/[a-zA-Z0-9:\.]*\/web-admin\/system\.html$)/;
	if(!objRegExp.test(parent.location)){
		//top.location = "/maxaero-web/system.html"
	}

	$('#btnLogin').click(function() {
		if($('#username').val() != null) {
			var trimmedVal = $.trim($('#username').val());
			$('#username').val(trimmedVal);
			if( trimmedVal != "") {
				if($('#j_password').val() != null && $.trim($('#j_password').val()) != ""){
					$('#j_username').val($('#username').val().toUpperCase());
					$("#frmLogin").submit();
				} else {
					$("#loginMessages").text("Password cannot be empty.");
				}
			} else {
				$("#loginMessages").text("Username cannot be empty.");
			}
		} else {
			$("#loginMessages").text("Username cannot be empty.");
		}
	});

	$('#j_password').keypress(function(event) {
		if( !event ) { event = window.event; } if( !event ) { return; }
		var theKey = 0;
		if( event.which ) { theKey = event.which; } 
		else if( event.keyCode ) { theKey = event.keyCode; } 
		else if( event.charCode ) { theKey = event.charCode } 
		var theShift = false;
		if( event.shiftKey ) { theShift = event.shiftKey; } 
		else if( event.modifiers ) { //Netscape 4
		if( event.modifiers & 4 ) { //bitwise AND
		  theShift = true;
		}
		}
		$("#spnBallon").hide();

		if( theKey > 64 && theKey < 91 && !theShift ) {
			$("#spnBallon").show();
			setTimeout("hideBallon()", "5000");
		}
		else if( theKey > 96 && theKey < 123 && theShift ) {
			setVisible("spnBallon", true);
			setTimeout("hideBallon()", "5000");
		}
	});
	attachKeyPressEventToLoginInputs();
});

function attachKeyPressEventToLoginInputs (){
	$('.loginInput').keypress (function (event){
		if( !event ) { event = window.event; } if( !event ) { return; }
		var theKey = 0;
		if( event.which ) { theKey = event.which; } 
		else if( event.keyCode ) { theKey = event.keyCode; } 
		else if( event.charCode ) { theKey = event.charCode } 
		if(theKey == 13){
			$('#btnLogin').click();
		}
	});
	
}

/**
 * Show baloon for caps lock
 */
function hideBallon(){
	$("#spnBallon").hide();
}

/**
 * @author Navod Ediriweera
 * @since 11-Sep-2009
**/
function DCS_Status_Bar(){}


DCS_Status_Bar.StatusBar = function() {
	
	//Top Div. Close on click
	$(".statusbarTop").click( function(e) {
		$('.statusbar').hide();
	});
	
	this.showStatusBar = function(message,displayType){
		$('.statusbar').show();		
		var msgType = null;
		if(displayType == "e"){		
			$(".statusbar").unbind('fadeIn');//no fade in/out		
			msgType = 'statuserror';
		}
		else {
			//fading out after the given time
			$(".statusbar").fadeIn( function() {
			    setTimeout( function() {
					$(".statusbar").fadeOut("slow");
				}, 6000);
			});
			if(displayType == "s"){				
				msgType = 'statusSuccess';
			}
			if(displayType == "i"){						
				msgType = 'statusInfo';
			}
			if(displayType == "w"){						
				msgType = 'statusWarn';
			}
		}
		this.displayNewMessage(message, msgType);
	}
		
	this.displayNewMessage = function (strMessage , strClass){
		var html = "<div style='margin-bottom: 2px;' class='"+strClass+"'>" + strMessage+ "</div>";		
		this.clearMessages();	
		this.addDisplay();
		this.addMessageMiddleElements();			
		$('.statusbarMiddle_main').append(html);	
	}
	
	this.addMessageMiddleElements = function (){
		if( !$('#divMessageMiddle_main').hasClass('statusbarMiddle_main')){
			var statusBarHTML = "<div id='divMessageMiddle_main' class='statusbarMiddle_main'></div>"
			$('.statusbarMiddle').prepend(statusBarHTML);
		}
	}
	
	this.clearMessages = function (){	
		//removing the message div: Use in clicking a new page.
		$('.statusbarMiddle_main').remove();	
	}	
	
	//Adding the message div if it hs being removed.
	this.addDisplay = function () {		
		if( !$('#divMessageMiddle').hasClass('statusbarMiddle')){
			var statusBarHTML = "<div id='divMessageMiddle' class='statusbarMiddle'></div>"
			$('.statusbar').append(statusBarHTML);
		}
	}
	
	this.hideStatusBar = function (){
		if($('.statusbar').is(':visible')) {
			$('.statusbar').hide();
		}		
	}
}

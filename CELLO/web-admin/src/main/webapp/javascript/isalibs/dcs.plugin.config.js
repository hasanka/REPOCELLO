//Custom Plugin Behaviour Definitions
$(function() {
	
	//TODO fix me for error messages
	
	//setting up progress bar for ajax events
    $(document).ajaxSend(function () {
        $('input[type="button"]').attr("disabled", "disabled");
        top[0].$('.progressBar').show();
    });

	$(document).ajaxStop(function(){	
		top[0].$('.progressBar').hide();
	});
	
	$(document).ajaxError(function(){	
		top[0].$('.progressBar').hide();
	});

	$(document).ajaxSuccess(function(){
		//top[0].$('.progressBar').hide();
	});

    $(document).ajaxComplete(function () {
    	top[0].$('.progressBar').hide();
        $('input[type="button"]').removeAttr("disabled");
    });
	
	$('.closeButtonPage').click (function (){	
		var blnClose = false;
		if(!DCS_Common.isPageEdited){
			var currTab = top[0].UI_HomePage.tab_index_arr[top[0].UI_HomePage.currTabIndex];
			top[0].UI_HomePage.closeTab(currTab);
			return true;
		}
		else{
			var returnVal = confirm(top[0].UI_HomePage.commonErrors.editConfirm);
			if(returnVal) {
				var currTab = top[0].UI_HomePage.tab_index_arr[top[0].UI_HomePage.currTabIndex];
				top[0].UI_HomePage.closeTab(currTab);
				return true;			
				}
			return returnVal;
		}
			
	});
	
	//defining numeric only input fields - Note this should have jquery.alphanumeric.js added to the head tag
	try {
		//this is to fix the _ bug 
		var ichars= "!@#$%^&*()+=[]\\\';,/{}|\":<>?~`.-_ ";
		if($('.lcc_numericOnlyWithDot').numeric){
			$('.lcc_numericOnlyWithDot').numeric({allow:".",ichars:ichars});
			$('.lcc_numericTime').numeric({allow:":",ichars:ichars});
		}
		if($('.lcc_alphamumericOnly').alphanumeric){
			$('.lcc_alphamumericOnly').alphanumeric({ichars:ichars});
		}
	} catch (e) {
		// do nothing.
	}
	
	//defining auto formating to time nnmm--> nn:mm
	$('.lcc_autoConvertTime').change(function (){
		var strTime = this.value;
		this.value = DCS_Formatter.setTimeWithColon(strTime);	
	});

});


/******************************
 * Common DCS Functionality. TODO remove unused methods
 ******************************/

function DCS_Common(){}
DCS_Common.gridButtons = {};
DCS_Common.gridButtons.add = 'lccGridButtonAdd';
DCS_Common.gridButtons.edit = 'lccGridButtonEdit';
DCS_Common.gridButtons.del = 'lccGridButtonDelete';
DCS_Common.gridButtons.deactivate = 'lccGridButtonDeactivate';
DCS_Common.isPageEdited = false;//To know if the page is edited or not.
/**
 * Refreshes a drop down with the given options
 */
DCS_Common.reFreshDropDownWithFirstEmpty = function (dropDownID,optionValues) {
	var jqDD = '#'+dropDownID;
	$(jqDD).empty();
	$(jqDD).append('<option value=""></option>');
	$(jqDD).append(optionValues);
}

DCS_Common.reFreshDropDown = function (dropDownID,optionValues) {
	var jqDD = '#'+dropDownID;
	$(jqDD).empty();
	$(jqDD).append(optionValues);
}

DCS_Common.setUpInitialLoadData = function (strID, successFunc){
	var url = "../../common/api/commonLCC!setUpScreenLoadData.action";
	var data = {};
	data['screenID'] = strID;
 	$.ajax( {
		url : url,
		type : 'POST',
		dataType : 'json',
		data : data,
		success : function(response) {
 			DCS_Common.hideNavGridButtonsBasedOnPrivileges({privilegedObj:response.privilegeTO}); 
 			successFunc(response);
		},
		error : function(requestObj, textStatus, errorThrown) {
			top[0].UI_HomePage.handleAjaxErrors(requestObj);
		}
	}); 	
}



$.fn.privilegedEnableButton = function(params){	
	var isEnable = DCS_Common.checkPrevilege(params);
	if(isEnable){
		$(this).removeClass('ui-state-disabled');
		$(this).attr('disabled', false);
	}else {
		$(this).disableButton();
	}
}

DCS_Common.getDate = function(strDate){
	var a = strDate.split('T');
	var b = a[0].split('-');
	var c = a[1].split(':');
	var d = new Date(b[0],parseInt(b[1],10)-1,b[2],c[0],c[1],c[2]);
	return d;
}

DCS_Common.hideNavGridButtonsBasedOnPrivileges = function (params){
	var privilegedObj = params.privilegedObj;
	$('#'+DCS_Common.gridButtons.add).hide();
	$('#'+DCS_Common.gridButtons.edit).hide();
	$('#'+DCS_Common.gridButtons.del).hide();
	$('#'+DCS_Common.gridButtons.deactivate).hide();
	
	if (privilegedObj.saveOwnNewRecord != null && privilegedObj.saveOwnNewRecord) {
		$('#'+DCS_Common.gridButtons.add).show();		
	}
	if (privilegedObj.editOwnRecord!= null && privilegedObj.editOwnRecord) {
		$('#'+DCS_Common.gridButtons.edit).show();	
	}	
	if (privilegedObj.deleteOwnRecord != null && privilegedObj.deleteOwnRecord) {
		$('#'+DCS_Common.gridButtons.del).show();		
	}
	if (privilegedObj.deactivate != null && privilegedObj.deactivate) {
		$('#'+DCS_Common.gridButtons.deactivate).show();		
	}
}

DCS_Common.hideNavGridAgreementButtons = function (params){
	var privilegedObj = params.privilegedObj;
	$('#lccGridButtonAdd-1').hide();
	$('#lccGridButtonEdit-1').hide();
	$('#lccGridButtonDelete-1').hide();
	$('#lccGridButtonDeactivate-1').hide();
	
	if (privilegedObj.saveOwnNewRecord != null && privilegedObj.saveOwnNewRecord) {
		$('#lccGridButtonAdd-1').show();		
	}
	if (privilegedObj.editOwnRecord!= null && privilegedObj.editOwnRecord) {
		$('#lccGridButtonEdit-1').show();	
	}	
	if (privilegedObj.deleteOwnRecord != null && privilegedObj.deleteOwnRecord) {
		$('#lccGridButtonDelete-1').show();		
	}
	if (privilegedObj.deactivate != null && privilegedObj.deactivate) {
		$('#lccGridButtonDeactivate-1').show();		
	}
}

DCS_Common.gridRowClickCommon = function (rowID){
	DCS_Common.setPageEdited(false);
}

/**
 * This function adds a key press event to the passed object.
 */
DCS_Common.monitorFieldValue = function(currentObj){
	if(!DCS_Common.isPageEdited){		
		DCS_Common.setPageEdited(true);
	}
}
DCS_Common.setPageEdited = function(blnStatus){
	DCS_Common.isPageEdited = blnStatus;
}

DCS_Common.loadCheck = function (){
	var returnVal = true;
	if(DCS_Common.isPageEdited) {
		returnVal = confirm(top[0].UI_HomePage.commonErrors.editConfirm);
//		jConfirm( top[0].UI_HomePage.commonErrors.editConfirm,top[0].UI_HomePage.commonErrors.editConfirmHeader, 
//				function (bln){
//					returnVal = bln;
//					return returnVal;
//			});
	}else {
		return true;
	}
	return returnVal;
	
}

DCS_Common.generateDropDownItemsHtmlWithEmptyOptionArr = function(dropDownData, nullVal) {
	var dropDownHtml = '<option value=\'' + nullVal + '\'>' + nullVal + '</option>';
	
	dropDownHtml += DCS_Common.generateDropDownItemsHtmlArr(dropDownData);
	
	return dropDownHtml;
}

DCS_Common.generateDropDownItemsHtmlWithEmptyOption = function(dropDownData, nullVal, nullText) {
	var dropDownHtml = '<option value=\'' + nullVal + '\'>' + nullText + '</option>';
	
	dropDownHtml += DCS_Common.generateDropDownItemsHtml(dropDownData);
	
	return dropDownHtml;
}

DCS_Common.generateDropDownItemsHtmlWithEmptyOptionForObject = function(dropDownData, labelAttrib, nullVal, nullText) {
	var dropDownHtml = '<option value=\'' + nullVal + '\'>' + nullText + '</option>';
	
	dropDownHtml += DCS_Common.generateDropDownItemsHtmlForObject(dropDownData, labelAttrib);
	
	return dropDownHtml;
}

DCS_Common.generateDropDownItemsHtmlArr = function(dropDownData) {
	var dropDownHtml = '';
	
	if(dropDownData != undefined) {
		$.each(dropDownData, function(index, val2) {
			dropDownHtml += '<option value=\'' + val2 + '\'>' + val2
				+ '</option>';				
		});	
	}
	
	return dropDownHtml;
}

DCS_Common.generateDropDownItemsHtml = function(dropDownData) {
	var dropDownHtml = '';
	
	if(dropDownData != undefined) {
		$.each(dropDownData, function(val1, val2) {
			dropDownHtml += '<option value=\'' + val1 + '\'>' + val2
				+ '</option>';				
		});	
	}
	
	return dropDownHtml;
}

DCS_Common.generateDropDownItemsHtmlForObject = function(dropDownData, labelAttrib) {
	var dropDownHtml = '';
	
	if(dropDownData != undefined) {
		$.each(dropDownData, function(val1, val2) {
			dropDownHtml += '<option value=\'' + val1 + '\'>' + val2[labelAttrib]
					+ '</option>';
		});	
	}
	
	return dropDownHtml;
}

/**
 * Applys the MonitorFieldValue functionality to all the input fields in an objct. Preferably a form
 */
DCS_Common.applyMonitorFieldEventToAllInputs = function(obj) {
	  // iterate each matching form
	  obj.each(function(i) {
		 // iterate the elements within the form
		 $(':input', this).each(function() {			 
			 $('#'+this.id).change(function () {
				 DCS_Common.monitorFieldValue (this);
			 });		  
		 });
	  });
}

$.fn.clearForm = function() {
	//setting page edited to false
	if(DCS_Common && DCS_Common.isPageEdited){
		DCS_Common.isPageEdited = false;
	}
	$.fn.isaClearForm.apply(this); 
}

$.fn.clearFormWithoutIgnore = function() {
	//setting page edited to false
	if(DCS_Common && DCS_Common.isPageEdited){
		DCS_Common.isPageEdited = false;
	}
	$.fn.isaClearFormWithoutIgnore.apply(this); 
}

/* get the Popup Window Properties  */
$.fn.getPopWindowProp =  function (intHeigh, intWidth){
	var intTop 	= (window.screen.height - intHeigh) / 2;
	var intLeft = (window.screen.width -  intWidth) / 2;
	var strScroll = "no";
	if (arguments.length > 2){
		if (arguments[2] == true){
			strScroll = "yes";
		}
	}
	var strProp = 'toolbar=no,' +
	              'location=no,' +
	              'status=no,' +
	              'menubar=no,' +
	              'scrollbars=' + strScroll + ','+
	              'width=' + intWidth + ',' +
	              'height=' + intHeigh + ',' +
	              'resizable=no,' +
	              'top=' + intTop +',' +
	              'left=' + intLeft
	return strProp
}

/**
 * This function assumes that the query string provided will contain a ?
 * character before the query string itself. It will not work if the ? is not
 * present.
 * 
 * @param name -
 *            query parameter name
 * 
 * @returns - values for the query parameter
 */
DCS_Common.getQueryParameter = function(name) {
	
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(window.location.href);
	if (results == null)
		return "";
	else
		return results[1];
}
$.fn.winowPopUp = function(p){
		var el = $(this)
		el.draggable();
		var winHeight = $(window).height();
		var winWidth = $(window).width();
		var config = {
			position:"fixed",
			zindex: 1001,
			width:300,
			height: 300,
			topPoint: 0,
			leftPoint: 0,
			closeImg:"../../../images/close-icon.jpg",
			loadUrl:true,
			url:"blank.html",
			headerHTML:"Header",
			bodyHTML:"Body",
			footerHTML:""
		}
		p = $.extend(config, p);
		var pH = $("<div></div>").addClass("headerCont");
		var headerLabel = $("<td></td>").addClass("headeritems");
		var ingClose = $("<img src='"+p.closeImg+"' alt='close'/>").click(function(){popClose();});
		var headerClose = $("<td></td>").attr({"width":22, "align":"right"});
		headerClose.append(ingClose);
		var ptr = $("<tr></tr>");
		ptr.append(headerLabel, headerClose)
		var pClose = $("<table></table>").attr({"cellpadding":0,"cellspacing":0, "border":0, "width":"99%"})
		pClose.append(ptr);
		var pB = $("<div></div>").addClass("bodyitems");
		var pF = $("<div></div>").addClass("footeritems");
		if(p.loadUrl){
			p.bodyHTML = $("<iframe></iframe>").attr({
				"id":"popIframe",
				"frameborder":0,
				"style":"width:100%;height:" + (p.height - 46) + "px;border:0px;position:relative;z-index:1;display:block;margin:0 auto",
				"src":p.url
			});
		}
		pH.append(pClose);
		el.append(pH, pB, pF);
		DCS_Common.readOnly(true);
		$(this).css({
			position:p.position,
			zIndex: p.zindex,
			top: (p.topPoint == 0) ? (winHeight / 2 ) - (p.height / 2) : p.topPoint,
			left: (p.leftPoint == 0) ? (winWidth / 2 ) - (p.width / 2) : p.leftPoint,
			width:p.width
		});
		$(this).find(".bodyitems").css("height",p.height - 45);
		if (p.appendobj){
			$(this).find(".headeritems").append(p.headerHTML);
			$(this).find(".bodyitems").append(p.bodyHTML);
			$(this).find(".footeritems").append(p.footerHTML);
		}else{
			$(this).find(".headeritems").html(p.headerHTML);
			$(this).find(".bodyitems").html(p.bodyHTML);
			$(this).find(".footeritems").html(p.footerHTML);
		}

		$(this).show();
		popClose = function(){
			DCS_Common.readOnly(false);
			el.empty();
			el.hide();
		}
};
$.fn.closeMyPopUp = function(){
	DCS_Common.readOnly(false);
	$(this).empty();
	$(this).hide()
};

DCS_Common.readOnly = function (status){
   	if (status){
   		$("body").find("#page-mask").remove();
   		$("body").append('<div id="page-mask"></div>');
   		$("#page-mask").css({
			position: 'absolute',
			zIndex: 1000,
			top: '0px',
			left: '0px',
			width: '100%',
			height: $(document).height(),
			backgroundColor:'#000000',
			opacity:0.5
		});
   	}else{
   		$("#page-mask").remove();
   	}
};

JSON.stringify = JSON.stringify || function (obj) {
    var t = typeof (obj);
    if (t != "object" || obj === null) {
        // simple data type
        if (t == "string") obj = '"'+obj+'"';
        return String(obj);
    }
    else {
        // recurse array or object
        var n, v, json = [], arr = (obj && obj.constructor == Array);
        for (n in obj) {
            v = obj[n]; t = typeof(v);
            if (t == "string") v = '"'+v+'"';
            else if (t == "object" && v !== null) v = JSON.stringify(v);
            json.push((arr ? "" : '"' + n + '":') + String(v));
        }
        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
    }
};

DCS_Common.runPrinterApplet = function (div, parameter, type) {
	var elementDiv = '#'+div;
	var appletFile = "dcs-app-applet-all.jar";
	var options =   '<APPLET archive="' + appletFile + '" '+
   				    'CODEBASE="../../applet/" id="printerApplet" CODE="com.isa.dcs.applet.DeviceManagerApplet" WIDTH=1020 HEIGHT=16>'+
					'</APPLET>';
	$(elementDiv).empty();
	$(elementDiv).append(options);
};

$(window).keyup(function(e){
	if (parent.shortCuts != undefined){
		parent.shortCuts.check(e);
	}
});

DCS_Common.getBoardingCardPrinterStatus = function(){
	return document.printerApplet.getBoardingCardPrinterStatus();
}


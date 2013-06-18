$.fn.decoratePanel = function(callback) {
	return this.each(function() {
		var title = $(this).attr("role"),panelConf="",ret="";
		$(this).addClass("ui-corner-bottom");
		if ($(this).hasClass("collapsible ")){panelConf = "<span class='ui-icon ui-icon-triangle-1-s'></span>";}
		$(this).wrap('<div class="ui-widget ui-widget-content ui-corner-all basic-panel"></div>');
		$(this).parent().prepend('<div class="ui-dialog-titlebar ui-widget-header ui-corner-top ui-helper-clearfix basic-panel-title" ><span>' + title + '</span>'+panelConf+'</div>');
		$(this).parent().find(".ui-icon").unbind("click").bind("click", function(){
			ret=$(this).parent().next().css("display");
			if (ret=="block"){
				$(this).parent().next().hide();
				$(this).removeClass("ui-icon-triangle-1-s").addClass("ui-icon-triangle-1-e");
			}else{
				$(this).parent().next().show();
				$(this).removeClass("ui-icon-triangle-1-e").addClass("ui-icon-triangle-1-s");
			};
			if (callback!=undefined)callback(ret);
		});
	});
};

$.fn.clearFormElements = function(){
	$(this).find("input, select, textarea").val("");
};
$.fn.disabledFormelements = function(){
	$(this).find("input, select, textarea").prop("disabled", true);
};
$.fn.enabledFormelements = function(){
	$(this).find("input, select, textarea").prop("disabled", false);
};
$.fn.enabled = function(){
	return this.each(function() {
		$(this).prop("disabled", false);
	});
};
$.fn.disabled = function(){
	return this.each(function() {
		$(this).prop("disabled", true);
	});
};
$.fn.decoratePanelWithoutTitle = function() {
	$(this).wrap('<div class="ui-widget ui-widget-content ui-corner-all "></div>');
}

$.fn.changePanelTitle = function(newTitle) {
	$(this)[0].previousSibling.textContent = newTitle;
}

$.fn.decorateButton = function() {
	$(this).addClass('ui-state-default ui-corner-all');
	$(this).hover(
				function() { $(this).addClass('ui-state-hover'); }, 
				function() { $(this).removeClass('ui-state-hover'); }
			);
};

$.fn.disableButton = function() {
	 return this.each(function() {
		$(this).removeClass('ui-state-hover');
		$(this).addClass('ui-state-disabled');
		$(this).attr('disabled', true);
	 });
}

$.fn.enableButton = function() {
	 return this.each(function() {
		$(this).removeClass('ui-state-disabled');
		$(this).attr('disabled', false);
	 });
}

$.fn.isaClearForm = function() {
  // iterate each matching form
  return this.each(function() {
	 // iterate the elements within the form
	 $(':input', this).each(function() {
	   var type = this.type, tag = this.tagName.toLowerCase();
	   if (type == 'text' || type == 'password' || tag == 'textarea' || type == 'hidden')
	  this.value = '';
	   else if (type == 'checkbox' || type == 'radio')
	  this.checked = false;
	   else if (tag == 'select')
	  this.selectedIndex = -1;
	 });
  });
};

$.fn.isaClearFormWithoutIgnore= function() {
	  // iterate each matching form
	  return this.each(function() {
		 // iterate the elements within the form
		 $(':input', this).each(function() {
		   var type = this.type, tag = this.tagName.toLowerCase();
		   var isIgnore = false;
		   if(this.className != null){
			   var classNamesArr = this.className.split(" ");
			   for ( var int = 0; int < classNamesArr.length; int++) {
				   var classNameActual = classNamesArr[int];			
				   if(classNameActual == 'lcc_form_ignoreClear'){
					   isIgnore = true;
					   break;
				   }
			   }
		   }		  
		   if(this.className == null || !isIgnore){
			   if (type == 'text' || type == 'password' || tag == 'textarea' || type == 'hidden')
				   this.value = '';
			   else if (type == 'checkbox' || type == 'radio')
				   this.checked = false;
			   else if (tag == 'select')
				   this.selectedIndex = -1;
		   }

		 });
	  });
	};

$.fn.disableForm = function() {
  // iterate each matching form
  return this.each(function() {
	 // iterate the elements within the form
	 $(':input', this).each(function() {
	   var type = this.type, tag = this.tagName.toLowerCase();
	   if (type == 'text' || type == 'password' || tag == 'textarea' || type == 'checkbox' || type == 'radio' || tag == 'select')
	  		$(this).attr('disabled', true);
	 });
  });
};

$.fn.enableForm = function() {
  // iterate each matching form
  return this.each(function() {
	 // iterate the elements within the form
	 $(':input', this).each(function() {
	   var type = this.type, tag = this.tagName.toLowerCase();
	   if (type == 'text' || type == 'password' || tag == 'textarea' || type == 'checkbox' || type == 'radio' || tag == 'select') 	
			$(this).removeAttr('disabled');
	 });
  });
};

$.fn.isFieldEmpty = function(){
    return (this.val() == null || this.val() == "");
}
function UI_HomePage(){
	this.sfMenu = null;
	this.MainTabs = null;
	this.tab_counter = 1;
	this.tab_index_arr = [0];
	this.MAX_TABS = 5;
	this.IFRAME_NAME = "iframeMainPageContent";
	this.blnMiddleTabRemove = false;
	this.ready = function(){
		UI_HomePage.hideProgress();
		loadInitialData(false)
		$(window).resize(setIfrmaeHeight);
	};
	this.showProgress = function(){
		$(".progressBar").show();
	};
	this.hideProgress = function(){
		$(".progressBar").hide();
	};
	
	handleInitialData = function(response){
		setUpMenuData(response.menuDataStr);
		UI_HomePage.MainTabs = $("#divMainPageContent").tabs();
		UI_HomePage.MainTabs.delegate( "img.closeBtnGlobal", "click", UI_HomePage.removeTab);
	};
	
	loadInitialData = function(blnIsReload) {
		//var url = "../api/initialData.action";
		//if (blnIsReload) {
		//	url += "?reload=true";
		//}
		//$.getJSON(url, handleInitialData);
		var response = {};
		//response.menuDataStr ='<li><a href="#">MASTER</a><ul style="margin-left:0px;margin-top:0px;"><li><a href="javascript:UI_HomePage.menuClick(\'../../user/ui/manageUser.html\',\'Manage User\',\'1\');">Manage User</a></li><li><a href="javascript:UI_HomePage.menuClick("../../flightstatuschg/ui/flightStatusChange.html","MASTER2","3");">MASTER2</a></li></ul></li><li><a href="#">BUDGET</a><ul style="margin-left:0px;margin-top:0px;"><li><a href="javascript:UI_HomePage.menuClick("../../checkin/ui/paxCheckin.html","BUDGET1","11");">BUDGET1</a></li></ul></li><li><a href="#">REVENUE</a><ul style="margin-left:0px;margin-top:0px;"><li><a href="javascript:UI_HomePage.menuClick();">REVENUE1</a></li></ul></li>'; 
		handleInitialData(response);
	};
	
	
	setUpMenuData = function(menuDataStr) {
		//$('#ulMenuID').empty();
		//$('#ulMenuID').append(menuDataStr);
		//$.fn.superfish.defaults.speed = 'fast';
		//$.fn.superfish.defaults.delay = 100;
		UI_HomePage.sfMenu = $('ul.topMenu').superfish();
		// $(".sf-with-ul").eq(4).focus();
		setIfrmaeHeight();
	};
	
	setIfrmaeHeight = function(){
		var pageH = $(window).innerHeight();
		$("#divMainPageContent>div.ui-tabs-panel>iframe").each(function(){
			$(this).css("height",(pageH-150));
		})
	};
	
	this.menuClick = function(url, strTitle, pageID) {
		if (url != null) {
			if (addTab(url, strTitle, pageID)) {
				//UI_HomePage.clearStatusBar();
			}
		}
		UI_HomePage.sfMenu.superfish('hide');
	}

	// Actual addTab function: adds new tab using the title input from the form
	// above
	addTab = function(url, strTitle, pageID) {
		var pageName = strTitle.replace(/ /g, '').toUpperCase();
		var imgStr = '<img id = closeBtn_' + pageID + ' class="closeBtnGlobal" src="themes/images/MAX150.gif" />';
		var divStr = '<div id="divMainPageTabbed_' + pageID + '" class="ui-tabs-panel ui-widget-content ui-corner-bottom" ><iframe id="iframeMainPageContent' + pageID + '" src="blank.html" frameborder="0" marginheight="0" marginwidth="0" style= "width:100%" name="'
				+ pageName + '"></iframe></div>';
		var tabbed = '<li><a href="#{href}"><span>#{label}&nbsp;</span>'+ imgStr +' </a></li>';
		var loadingIFrameID = "iframeMainPageContent" + pageID;
		//Existing tab
		var currIndex = $.inArray(pageID, UI_HomePage.tab_index_arr);
		if (currIndex >= 0) {
			UI_HomePage.MainTabs.tabs("option", "active", currIndex);
			return true;
		}
		//Max tab count
		UI_HomePage.tab_counter = $("#tabedListTop>li").length;
		if (UI_HomePage.tab_counter >= UI_HomePage.MAX_TABS) {
			//UI_HomePage.showStatus(UI_HomePage.uiMessages.maxAllowedTab, "i");
			alert("max Count");
			return false;
		}
		
		UI_HomePage.MainTabs.find( ".ui-tabs-nav" ).append( tabbed.replace( /#\{href\}/g, "#divMainPageTabbed_" + pageID ).replace( /#\{label\}/g, strTitle ) );
		UI_HomePage.MainTabs.append(divStr);
		UI_HomePage.MainTabs.tabs( "refresh" );
		// keeping a map of pageid/actual tab id

		document.getElementById(UI_HomePage.IFRAME_NAME + (pageID)).src = url;
		UI_HomePage.tab_index_arr.push(pageID);
		setIfrmaeHeight();
		UI_HomePage.MainTabs.tabs("option", "active", UI_HomePage.tab_counter);
		return true;
	};
	
	this.removeTab = function(e, pID){
		var pageID = String(this.id.split("_")[1]|pID);
	    UI_HomePage.blnMiddleTabRemove = false;
		var index = $.inArray(pageID, UI_HomePage.tab_index_arr);
		if (index == -1)
			return false;

		/*if (index != (UI_HomePage.tab_index_arr.length - 1)) {
			UI_HomePage.blnMiddleTabRemove = true;
		}*/
		if (index >= 0) {
			var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
		    $( "#" + panelId ).remove();
		    UI_HomePage.MainTabs.tabs( "refresh" );
		}
		UI_HomePage.tab_index_arr.splice(index, 1);
		UI_HomePage.tab_counter = $("#tabedListTop>li").length;
		UI_HomePage.MainTabs.tabs("option", "active", UI_HomePage.tab_counter-1);
	};
	
}
var UI_HomePage = new UI_HomePage();
UI_HomePage.ready();
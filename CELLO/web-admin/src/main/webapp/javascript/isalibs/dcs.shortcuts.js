//shortcuts
$(function() {
	shortCuts = {};
	shortCuts.allSHC = null;
	$(window).bind("contextmenu",function(e){
	    return false;
	});
	
	shortCuts.escape = function(e){
		if($("#divMessageBar").length>0)$("#divMessageBar").find("a.closeButton").trigger("click");
		if($("#popup_cancel").length>0)$("#popup_cancel").trigger("click");
		if($("#div_SC").length>0)$(".shClose>img").trigger("click");
	}
	
	shortCuts.menuAction = function(e){
		if (e == "PAXCHECK-IN"){
			UI_HomePage.menuClick('../../checkin/ui/paxCheckin.html','PAX CHECK-IN','11');
		}
		if (e == "GROUPCHECK-IN"){
			UI_HomePage.menuClick('../../groupcheckin/ui/groupCheckin.html','GROUP CHECK-IN','12')
		}
		if (e == "BLOCKSEAT"){
			UI_HomePage.menuClick('../../blockseat/ui/blockseat.html','BLOCK SEAT','5');
		}
		if (e == "BOARDING"){
			UI_HomePage.menuClick('../../boarding/ui/paxBoarding.html','BOARDING','6');
		}
	};
	
	shortCuts.dispalySHC = function(e){
		$("#div_SC").remove();
		var divSHC = $("<div></div>").attr({"id":"div_SC", "class":"dcsSH"});
		var divLbl = $("<div><label>Shortcuts</label><div>").attr("class","shlabel");
		var closeImg = $("<img/>").attr({"src":"../../../images/close-icon.jpg", "alt":"close"});
		closeImg.click(function(){shortCuts.removeSHC();});
		var divClose = $("<div></div>").attr("class","shClose");
		divClose.append(closeImg);
		var divSHCH = $("<div></div>");
		divSHCH.append(divLbl, divClose);
		var divSHCB = $("<div></div>").attr("id","div_SCB");
		$.each(arrShcuts, function(){
			var t = $("<div>"+this.decs+"</div>");
			divSHCB.append(t);
		});
		divSHC.append(divSHCH, divSHCB);
		$("body").append(divSHC);
		divSHC.show();
	};
	
	var shCurts = {"ALL":[{"stroke":"ALT+49", "decs":"Alt+1 : Open Pax Check-in", "operation":shortCuts.menuAction, "page":"PAXCHECK-IN"},
	                      {"stroke":"ALT+50", "decs":"Alt+2 : Open Group Check-in", "operation":shortCuts.menuAction, "page":"GROUPCHECK-IN"},
	                      {"stroke":"ALT+51", "decs":"Alt+3 : Open Boarding", "operation":shortCuts.menuAction, "page":"BOARDING"},
	                      {"stroke":"ALT+52", "decs":"Alt+4 : Open Block Seat", "operation":shortCuts.menuAction, "page":"BLOCKSEAT"},
	                      {"stroke":"27", "decs":"Esc: Close Messages", "operation":shortCuts.escape, "page":"ALL"},
	                      {"stroke":"ALT+88", "decs":"Alt+X : System Logout", "operation":UI_HomePage.logout, "page":"ALL"},
	                      {"stroke":"ALT+76", "decs":"Alt+L : Display Short cuts", "operation":shortCuts.dispalySHC, "page":"ALL"}]};
	
	shortCuts.assignSHC = function(SHC){
		if (SHC!=null){
			shortCuts.allSHC = $.extend(shCurts, SHC);
		}
		shortCuts.setPerPage(UI_HomePage.currTabName);
	};
	
	var arrShcuts = {};
	shortCuts.allSHC = shCurts;
	shortCuts.setPerPage = function(pageSHC){
		var pageName = null
		if (pageSHC != null){
			pageName = $.trim(pageSHC.replace(/ /g,'').toUpperCase());
		}
		arrShcuts = {};
		$.each(shortCuts.allSHC['ALL'], function(){
			arrShcuts[this.stroke] = {"stroke":this.stroke, "operation":this.operation, "page":this.page, "decs":this.decs};
		});
		var pageLoaded = shortCuts.allSHC[pageName];
		if(pageLoaded){
			$.each(shortCuts.allSHC[pageName], function(){
				arrShcuts[this.stroke] = {"stroke":this.stroke, "operation":this.operation, "page":this.page, "decs":this.decs};
			});
		}
	};
	
	shortCuts.check = function(e){
		var keydone = "";
		if (e.altKey)keydone+="ALT+";
		if (e.ctrlKey)keydone+="CTRL+";
		if (e.shiftKey)keydone+="SHIFT+";
		keydone+=e.which;
		var keyFound = arrShcuts[keydone];
		if (keyFound){
			$("#div_SC").remove();
			var pageName = arrShcuts[keydone].page.replace(/ /g,'').toUpperCase();
			arrShcuts[keydone].operation(pageName);
		}
		/*if ($.inArray(keydone, arrShcuts) > -1){
			var pageName = shCurts[$.inArray(keydone, arrShcuts)].page.replace(/ /g,'').toUpperCase();
			shortCuts.allSHC[$.inArray(keydone, arrShcuts)].operation(pageName);
		}*/
	};
	
	
	shortCuts.removeSHC = function(){
		$("#div_SC").remove();
	}
	
	shortCuts.setPerPage(null);
	$(window).keyup(function(e){
		shortCuts.check(e);
	});

});
/*******************************************************************************
 * Description : Manage User Author : Hasanka Chandrasekara
 ******************************************************************************/

function UI_ManageUser() {
	this.gridHTML = $("<table id='RoleGrid'></table>");
	this.gridPagerHTML = $("<div id='RoleGridPager'></div>");
	this.userGrid = null;
	this.ready = function() {
		initializedUI();
		parent.UI_HomePage.hideProgress();
	};
	initializedUI = function() {
		$("input[type=submit], a, button").button().click(function(event) {
			event.preventDefault();
		});
		$("#btnSearch").on("click", searchRoles);
		$(".basicPanel").decoratePanel();
		searchRoles();
	}
	
	searchRoles = function() {
//		$("#addEditUserFrom").enabledFormelements();
//		$("#addEditUserFrom").clearFormElements();
//		$("#addEditUserFrom").disabledFormelements();
		constarctGrid();
		var reqData = {}, reqURL = "role!searchRole.action";
//		reqData.firstName = $("#txtFirstName").val();
//		reqData.lastName = $("#txtLastName").val();
//		reqData.email = $("#txtEmail").val();
//		reqData.userName = $("#txtUserName").val();
		UI_ManageUser.userGrid = $("#RoleGrid").jqGrid(
				{
					datatype : function(postdata) {
						$.ajax({
							url : reqURL,
							beforeSend : parent.UI_HomePage.showProgress(),
							data : $.extend(postdata, reqData),
							dataType : "json",
							cache : false
						}).always(
								function(jsonData, stat) {
									$(".errormsg").hide();
									if (stat == "success") {
										mydata = jsonData;
										if (mydata.msgType != "Error") {
											$.data(UI_ManageUser.userGrid[0],"gridData",mydata.roleList);
											UI_ManageUser.userGrid[0].addJSONData(mydata);
										} else {
											alert(mydata.message);
										}
										parent.UI_HomePage.hideProgress();
									}
						}).fail(function(data) {
							alert(data.message);
						});
					},
					height : 230,
					autowidth : true,
					colNames : [  'Role ID', 'Role Name', 'Status' ],
					colModel : [ 
					             {name :'roleId', hidden : true,width:"0%"}, 
					             {name :'roleName',index : 'roleName',width : "50%",align : "center"}, 
					             {name :'status',index : 'status',width : "50%",align : "center"}				             
					          ],
					imgpath : "",
					pager : jQuery('#RoleGridPager'),
					viewrecords : true,
					rowNum : 10,
					jsonReader : {
						root : "roleList",
						page : "page",
						total : "total",
						records : "records",
						repeatitems : false,
						id : "0"
					},
					onSelectRow : function(rowid) {}
				});

	}
	
	constarctGrid = function() {
		$("#showRoles").empty()
		$("#showRoles").append(UI_ManageUser.gridHTML.clone(),UI_ManageUser.gridPagerHTML.clone());
	}

}
parent.UI_HomePage.showProgress();
var UI_ManageUser = new UI_ManageUser();
UI_ManageUser.ready();
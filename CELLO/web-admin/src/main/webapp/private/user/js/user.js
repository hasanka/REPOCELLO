/*******************************************************************************
 * Description : Manage User Author : Hasanka Chandrasekara
 ******************************************************************************/

function UI_ManageUser() {
	this.gridHTML = $("<table id='userGrid'></table>");
	this.gridPagerHTML = $("<div id='userGridPager'></div>");
	this.userGrid = null;
	this.ready = function() {
		initializedUI();
		parent.UI_HomePage.hideProgress();
	};
	initializedUI = function() {
		$("input[type=submit], a, button").button().click(function(event) {
			event.preventDefault();
		});
		$("#btnSearch").on("click", searchUsers);
		$(".basicPanel").decoratePanel();
		initButtons();
		clearFields();
		searchUsers();
	}
	
	searchUsers = function() {
//		$("#addEditUserFrom").enabledFormelements();
//		$("#addEditUserFrom").clearFormElements();
//		$("#addEditUserFrom").disabledFormelements();
		constarctGrid();
		var reqData = {}, reqURL = "user!searchUser.action";
//		reqData.firstName = $("#txtFirstName").val();
//		reqData.lastName = $("#txtLastName").val();
//		reqData.email = $("#txtEmail").val();
//		reqData.userName = $("#txtUserName").val();
		UI_ManageUser.userGrid = $("#userGrid").jqGrid(
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
											$.data(UI_ManageUser.userGrid[0],"gridData",mydata.userList);
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
					colNames : [  'User ID', 'Title', 'First Name','Last Name', 'Email Address', 'Role', 'Status', 'User Name', 'PhoneNo','PW' ],
					colModel : [ 
					             {name : 'id', hidden : true,width:"0%"}, 
					             {name : 'title',index : 'title',width : "10%",align : "center"	}, 
					             {name :'firstName',index : 'firstName',width : "20%",align : "center"	},
					             {name : 'lastName',index :'lastName',width : "20%",align : "center"},
					             {name : 'emalAddress',index :'emalAddress',width : "10%",align : "center"}, 
					             {name : 'role',index :'role',width : "10%",align : "center"},  
					             {name : 'status',index :'status',	width :"10%",align : "center",formatter:statusFormatter},
					             {name : 'userName',index :'userName',width : "10%",align : "center"},
					             {name : 'phoneNumber',index : 'phoneNumber',width :"10%",align :"center"} ,
					             {name : 'password',index : 'password',width : "0%",align : "center",hidden:true} 
					          ],
					imgpath : "",
					pager : jQuery('#userGridPager'),
					viewrecords : true,
					rowNum : 10,
					jsonReader : {
						root : "userList",
						page : "page",
						total : "total",
						records : "records",
						repeatitems : false,
						id : "0"
					},
					onSelectRow : function(rowid) {
						gridRowClick(rowid);
					},
					gridComplete:function(){
						initButtons();
						clearFields();
					}
					
				});

	}
	
	constarctGrid = function() {
		$("#showUsers").empty()
		$("#showUsers").append(UI_ManageUser.gridHTML.clone(),UI_ManageUser.gridPagerHTML.clone());
	}

	initButtons=function(){
		$("#btnEditUser").prop("disabled",true);
		$("#save").prop("disabled",true);
	}
	clearFields=function(){
		$("#addEditUserFrom").clearFormElements();
		$("#addEditUserFrom").disabledFormelements();
	}
	
	gridRowClick=function(rowId){
		clearFields();
		var objJS = $("#userGrid").getRowData(rowId);
		$("#btnEditUser").prop("disabled",false);
		$("#title").val(objJS["title"]);
		$("#firstName").val(objJS["firstName"]);
		$("#lastName").val(objJS["lastName"]);
		$("#email").val(objJS["emalAddress"]);
		$("#phoneNo").val(objJS["phoneNumber"]);
		$("#userName").val(objJS["userName"]);
		$("#password").val(objJS["password"]);
		$("#passwordConfirm").val(objJS["password"]);
		$("#status").val(stringToStatus(objJS["status"]));
	}
	
	statusFormatter=function(cellvalue,options,rowObject){
		if(cellvalue=="ACT"){
			return "Active";
		}else{
			return "Inactive"
		}
	}
	
	stringToStatus=function(value){
		if(value=="Active"){
			return "ACT";
		}else{
			return "INA";
		}
	}
	
}
parent.UI_HomePage.showProgress();
var UI_ManageUser = new UI_ManageUser();
UI_ManageUser.ready();
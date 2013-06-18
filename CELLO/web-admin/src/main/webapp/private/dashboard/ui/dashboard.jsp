
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
<meta http-equiv="x-ua-compatible" content="IE=8" />
<meta http-equiv='pragma' content='no-cache' />
<meta http-equiv='cache-control' content='no-cache' />
<meta http-equiv="expires" content="-1" />
<title>CELLO</title>
<link href="themes/cello.all.css" rel="stylesheet"
	type="text/css" />
<!--conditional comments -->
<!--[if IE]>  
	<script src="js/html5.js"></script>
<![endif]-->
</head>

<body style="overflow: hidden" class="dashboard">

	<div id="divMainPageOuter ">
		<div class="topBar">
			<span class="codeCarrier" id="connectedCarrier"><s:property
					value="#session['carrierCode']" /></span>
			<ul id="ulMenuID" class="topMenu sf-menu">
				
					<li><a href="#">Admin</a>
						<ul style="margin-left: 0px; margin-top: 0px;">
								<li><a href="javascript:UI_HomePage.menuClick('user!showView.action','User Management','1');">User Management</a></li>	
								<li><a href="javascript:UI_HomePage.menuClick('role!showView.action','Roles Management','2');">Role Management</a></li>
								<li><a href="javascript:UI_HomePage.menuClick('stationManagement!showView.action','Station Management','3');">Station Management</a></li>
						</ul>
					</li>
			</ul>
		</div>
		<div id="divMainPageTitileBar" class="graybar">

			<div class="logo-app"></div>
			<div class="bar-app">
				<div id="divLoggedInUser" class="fntBold topbarItems">
					<label id="lblLoggedInUser">Welcome <s:property
							value="hasanka" /></label> | <a
						href="logout" class="logout"
						id="lblLogout">Logout</a>
				</div>
			</div>
			<div class="client-logo">
				<img src="themes/images/client-logo.jpg" alt="" />
			</div>
			<div id="divMainPageContent" class="body-con">
				<ul id="tabedListTop" class="divMenu">
					<li id="maintabbedItem"><a href="#divDashboard">Dashboard</a>
					</li>
				</ul>
				<div id="divDashboard">
					<iframe id="iframeMainPageDashoard" src="blank.html"
						frameborder="0" marginheight="0" marginwidth="0" width="100%"></iframe>
				</div>
			</div>
			<div style="clear: both; height: 0px;"></div>
		</div>
		<div class="footer">
			<label>Copyright © 2013 Digital Gravity, All Rights Reserved.</label>
		</div>
	</div>

	<table class="progressBar">
		<tr>
			<td align="center">
				<table>
					<tr>
						<td align="center"><img
							src='themes/images/ajax-loading.gif' alt='Progress Bar' />
							<label id="lblLoading">Loading...</label></td>
					</tr>
				</table>
				<table class="mask">
					<tr>
						<td align="center">&nbsp;</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>

	<div id="divMessageBar" class="statusbar">
		<div class="statusbarContent">
			<div id="divMessageTop" class='statusbarTop'>
				<a class="closeButton"></a>
			</div>
			<div id="divMessageMiddle" class='statusbarMiddle'
				style="border: 1px"></div>
			<div id="divMessageBottom"></div>
		</div>
	</div>

	<div id='divMessageHistory' class='statusBarHistory'>
		<div id='divMessage_history_top_close'
			class='statusbar_history_top_close'>
			<a class="closeButton"></a>
		</div>
		<!-- <div id='divMessageMiddle_history_top' class='statusBarHistory_title'>
			<table width="100%">
				<tr>
					<td><font>History</font>
					</td>
				</tr>
			</table>
		</div> -->
	</div>
	<!-- common javascript libs   -->
	<script type="text/javascript"
		src="javascript/jquery/jquery.js"></script>
	<script type="text/javascript"
		src="javascript/jquery/jquery.ui.js"></script>
	<script type="text/javascript"
		src="javascript/dglibs/isa.jquery.decorator.js"></script>
	<script type="text/javascript"
		src="javascript/dglibs/isa.browsers.js"></script>
	<script type="text/javascript"
		src="javascript/dglibs/dcs.statusbar.js"></script>
	<script type="text/javascript"
		src="javascript/jquery/hoverIntent.js"></script>
	<script type="text/javascript"
		src="javascript/jquery/jquery.superfish.menu.js"></script>
	<script type="text/javascript"
		src="javascript/jquery/jquery.alerts.js"></script>
	<script type="text/javascript"
		src="javascript/dglibs/dcs.common.js"></script>
	<!-- shortcuts -->
	<script type="text/javascript"
		src="javascript/dglibs/dcs.shortcuts.js"></script>
	<!-- airline javascript logic  -->
	<script type="text/javascript" src="private/dashboard/js/homepage.js"></script>
</body>
</html>

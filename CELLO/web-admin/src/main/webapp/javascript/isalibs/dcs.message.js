/**
 * Error Messages for the Front End
 * @author Navod Ediriweera
 * @since September 01, 2009
 */

function DCS_Message () {};

DCS_Message.success = "s";
DCS_Message.error = "e";
DCS_Message.warning = "w";
DCS_Message.info = "i";
/**
 * max number of supported dynamic ids. 
 * The current value 5 is because only 5 Via's are supported at this time
 * 
 * --TODO: Messages are created and parsed in isa.validation - Remove functionality later
 */
DCS_Message.maxDynamicIDs = 0;

//Default Success and Error Messages
DCS_Message.showDefaultSuccess = function (){
		DCS_Message.showMessage(DCS_Message.success, DCS_Message.getHolder().UI_HomePage.commonErrors.saved);
}
	
DCS_Message.showDefaultError = function (){
	DCS_Message.showMessage(DCS_Message.error, DCS_Message.getHolder().UI_HomePage.commonErrors.error);
}
DCS_Message.showDefaultDeleteSuccess = function (){
	DCS_Message.showMessage(DCS_Message.success, DCS_Message.getHolder().UI_HomePage.commonErrors.dataDeleted);
}
DCS_Message.showWarning = function (strWarning){
	DCS_Message.showMessage(DCS_Message.warning, strWarning);
}

//Displays an Error message - fine tuned to be used by DCS_validations
DCS_Message.displayValidationError = function (strType, strMessage, screenID, elementID){
	
	var displayName = DCS_Message.parseResource(screenID,elementID);
	
	strMessage = strMessage.replace("{" + 0 + "}", displayName);
	
	if (arguments.length > 4) {
		for ( var i = 0; i < arguments.length-4; i++) {
			strMessage = strMessage.replace("{" + Number(i+1) + "}", arguments[i + 4]);
		}
	}
	DCS_Message.fliterByType(strType,strMessage);
	
}
//displays a message directly using arguments to replace {0} - {n}
DCS_Message.display = function(strType, strMessage){
	
	if (arguments.length > 2) {
		for ( var i = 0; i < arguments.length-2; i++) {
			strMessage = strMessage.replace("{" + i + "}", arguments[i + 2]);
		}
	}
	DCS_Message.fliterByType(strType,strMessage);
}

DCS_Message.hide = function (){
	DCS_Message.getHolder().UI_HomePage.clearStatusBar();
}

//displays different types of messages. The default is Error
DCS_Message.fliterByType = function(strType,strMessage){
	switch(strType){
		case "e":
			DCS_Message.showMessage(DCS_Message.error, strMessage);
			break;
		case "s":
			DCS_Message.showMessage(DCS_Message.success, strMessage);
			break;
		case "w":
			DCS_Message.showMessage(DCS_Message.warning, strMessage);
			break;
		case "i":
			DCS_Message.showMessage(DCS_Message.info, strMessage);
			break;
		default:
			DCS_Message.showMessage(DCS_Message.error, strMessage);
			break;
	}
}

//Function to build the message with {0} - {n}
DCS_Message.buildMessage = function (strMessage){
	if (arguments.length > 1) {
		for ( var i = 0; i < arguments.length - 1; i++) {
			strMessage = strMessage.replace("{" + i + "}", arguments[i + 1]);
		}
	}
	return strMessage;
}

DCS_Message.showMessage = function (strType, strMessage){
	var date = new Date();	
	var timeStamp = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+
		":"+date.getSeconds();
	
	
	DCS_Message.getHolder().UI_HomePage.showStatus(timeStamp+" - "+strMessage,strType);
	
}

DCS_Message.parseResource = function (screenID, elementID){
	var uiHomeDisplay = DCS_Message.getHolder().UI_HomePage.display;
	//adding support for dynamic field ids.
	//dynamic ids are defined as id's containing '-X-'
	for(var i=0;i<DCS_Message.maxDynamicIDs;i++){
		elementID = elementID.replace("-"+i+"-","-X-");
	}	
	var screenActual = screenID+"_"+elementID;
	return uiHomeDisplay[screenActual];
}

DCS_Message.getHolder = function () {
	return top[0];
}






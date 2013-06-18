/***
 * Common Formatting functions for LCC
 */

function DCS_Formatter () {};

DCS_Formatter.setTimeWithColon = function (strTime){
	var returnTime = "";
	if(strTime != null && strTime != ""){
		var index = strTime.length - 2;
		var hourindex = strTime.search(":");
		if (hourindex != -1) {
			returnTime = strTime;
		} else {
			var mn = "00";
			if(strTime.length >=3)
				mn = strTime.substr(index,2);

			var hr = 0;
			if(strTime.length == 3) {
				hr =  strTime.substr(0,1); 
			}else if(strTime.length >=5){
				hr = strTime.substr(0,index); 
			}			
			else {
				hr = strTime.substr(0,2); 
			}
			var timecolon = hr +":" + mn ;
			returnTime = timecolon;				
		}
	}	
	return returnTime;
	
}
function ISA_Browsers(){}

ISA_Browsers.INTERNET_EXPLORER = 'Microsoft Internet Explorer';

ISA_Browsers.getBrowserWidth = function getBrowserWidth() {
	var width = 0; 
	if (navigator.appName == ISA_Browsers.INTERNET_EXPLORER) {
		width = parseInt(document.documentElement.clientWidth);
	} else {
		width = parseInt(document.documentElement.clientWidth);
  	}
	return width;
}

ISA_Browsers.getBrowserHeight = function getBrowserHeight() {
	var height = 0;
	if (navigator.appName == ISA_Browsers.INTERNET_EXPLORER) {
		height = parseInt(document.documentElement.clientHeight);
	} else {
		height = parseInt(document.body.clientHeight);
  	}
	return height;
}

ISA_Browsers.checkForIE = function (){
	if(navigator.appName == ISA_Browsers.INTERNET_EXPLORER){
		return true;
	}
	return false;
}
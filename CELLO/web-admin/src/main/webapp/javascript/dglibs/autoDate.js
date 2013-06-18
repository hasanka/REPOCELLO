	/*
	*********************************************************
		Description		: Auto Date Generator (Fully client side)
		Author			: Rilwan A. Latiff
		Version			: 1.0
		Last Modified	: 10th August 2005
	*********************************************************	
	*/

	function dateChk(strID){
		var arrMonth = ["January","February","March","April","May","June","July","August","September","October","November","December"];
		var dtToday = new Date();
		var dtCurrD	= dtToday.getDate();
		var dtCurrM	= (dtToday.getMonth() + 1);
		var dtCurrY	= dtToday.getFullYear();
	
		var objC = document.getElementById(strID);
		var strEValue = "";
		if (objC == null){
			strEValue = strID;
		}else{
			strEValue = objC.value
		}
		
		
		var blnReturn = true;
		var dtCreatD = dtCurrD;
		var dtCreatM = dtCurrM;
		var dtCreatY = dtCurrY;
		
		strEValue = replaceall(strEValue, "/", "^");
		strEValue = replaceall(strEValue, "-", "^");
		strEValue = replaceall(strEValue, ".", "^");
		strEValue = replaceall(strEValue, " ", "^");
		if (strEValue.indexOf("^") != -1){
			var arrDts = strEValue.split("^");
			switch (arrDts.length){
				case 1 : 
					if (String(arrDts[0]) != ""){dtCreatD = arrDts[0];} 
					break;
				case 2 : 
					if (String(arrDts[0]) != ""){dtCreatD = arrDts[0];} 
					if (String(arrDts[1]) != ""){dtCreatM = arrDts[1];}
					break;
				case 3 :
					if (String(arrDts[0]) != ""){dtCreatD = arrDts[0];} 
					if (String(arrDts[1]) != ""){dtCreatM = arrDts[1];}
					if (String(arrDts[2]) != ""){dtCreatY = arrDts[2];}
					break;
			}
		}else{
			var intCLength = strEValue.length;
			for (var i = 0 ; i < intCLength ; i++){
				if (i <= 1){
					if (i == 0){dtCreatD = "";}
					dtCreatD += strEValue.substr(i,1);
				}
				
				if (i > 1 && i <= 3){
					if (i == 2){
						if (intCLength >= 4){
							dtCreatM = "";
							dtCreatM += strEValue.substr(i,1);
						}else{
							if (strEValue.substr(i,1) != 0){
								dtCreatM = "";
								dtCreatM += strEValue.substr(i,1);
							}
						}
					}else{
						dtCreatM += strEValue.substr(i,1);
					}
				}
				
				if (i > 3 && i <= 7){
					if (i == 4){dtCreatY = "";}
					dtCreatY += strEValue.substr(i,1);
				}
			}
		}
		
		// ------------------------------------ Validate
		if (!validDate(dtCreatD, dtCreatM, dtCreatY)){
			switch (strEValue.length){
				case 2 :
					if (Number(strEValue.substr(0,1)) > 0){dtCreatD = strEValue.substr(0,1);}
					if (Number(strEValue.substr(1,1)) > 0){dtCreatM = strEValue.substr(1,1);}
					break;
				case 3:	
					if (Number(strEValue.substr(1,2)) <= 12) {
						if (Number(strEValue.substr(0,1)) > 0){dtCreatD = strEValue.substr(0,1);}
						if (Number(strEValue.substr(1,2)) > 0){dtCreatM = strEValue.substr(1,2);}
					}else{
						if (Number(strEValue.substr(0,1)) > 0){dtCreatD = strEValue.substr(0,1);}
						if (Number(strEValue.substr(1,1)) > 0){dtCreatM = strEValue.substr(1,1);}
						if (Number(strEValue.substr(2,1)) > 0){dtCreatY = strEValue.substr(2,1);}
					}
				case 4:	
					if (Number(strEValue.substr(1,2)) <= 12) {
						if (Number(strEValue.substr(0,1)) > 0){dtCreatD = strEValue.substr(0,1);}
						if (Number(strEValue.substr(1,2)) > 0){dtCreatM = strEValue.substr(1,2);}
						if (Number(strEValue.substr(3,1)) > 0){dtCreatY = strEValue.substr(3,1);}
					}else{
						if (Number(strEValue.substr(0,1)) > 0){dtCreatD = strEValue.substr(0,1);}
						if (Number(strEValue.substr(1,1)) > 0){dtCreatM = strEValue.substr(1,1);}
						if (Number(strEValue.substr(2,2)) > 0){dtCreatY = strEValue.substr(2,2);}
					}
					break;
				default :
					if (objC == null){
						return "";
					}else{
						objC.focus()
						blnReturn = false;	
					}
					break;
			}
		}
		
		if (!validDate(dtCreatD, dtCreatM, dtCreatY)){
			if (objC == null){
				return "";
			}else{
				objC.focus()
				blnReturn = false;	
			}
		}
		
		if (blnReturn && strEValue != ""){
			if (dtCreatY.length < 4){
				dtCreatY = String(dtCurrY).substr(0, (String(dtCurrY).length - dtCreatY.length)) + dtCreatY
			}else if (dtCreatY.length > 4){
				dtCreatY = String(dtCurrY).substr(0, 4);
			}
		
			// ------------------------------------ Formatting the date 
			var strFormat = "dd/mm/yyyy";
			if (arguments.length == 2){
				if (arguments[1] != ""){
					strFormat = arguments[1];
				}
			}
			
			var strDefSep = "" ;
			var arrSep = new Array("/","-"," ",".");
			
			for (var i = 0 ; i < arrSep.length ; i++){
				if (strFormat.indexOf(arrSep[i]) != -1){
					strDefSep = arrSep[i];
					break;
				}
			}
			if (strDefSep == ""){
				if (objC == null){
					return "";
				}else{
					objC.focus()
					blnReturn = false;	
				}
			}
			
			var strReturnDt = "";
			if (Number(dtCreatD) < 10){dtCreatD = "0" + Number(dtCreatD)};
			if (Number(dtCreatM) < 10){dtCreatM = "0" + Number(dtCreatM)};
			var strFormat1  = "DD" + strDefSep + "MM" + strDefSep + "YYYY"
			var strFormat2  = "DD" + strDefSep + "MM" + strDefSep + "YY"
			var strFormat3  = "DD" + strDefSep + "MMM" + strDefSep + "YYYY"
			var strFormat4  = "DD" + strDefSep + "MMM" + strDefSep + "YY"
			var strFormat5  = "DD" + strDefSep + "MMMM" + strDefSep + "YYYY"
			var strFormat6  = "DD" + strDefSep + "MMMM" + strDefSep + "YY"
			var strFormat7  = "MM" + strDefSep + "YYYY"
			var strFormat8  = "MM" + strDefSep + "YY"
			var strFormat9  = "MMM" + strDefSep + "YYYY"
			var strFormat10 = "MMM" + strDefSep + "YY"
			var strFormat11 = "MMMM" + strDefSep + "YYYY"
			var strFormat12 = "MMMM" + strDefSep + "YY"
			
			
			var strDW = "th" ;
			var strCM = "," ;
			if ((dtCreatD == "01") || (dtCreatD == "21")  || (dtCreatD == "31")){strDW = "st";}
			if ((dtCreatD == "02") || (dtCreatD == "22")){strDW = "nd";}
			if ((dtCreatD == "03") || (dtCreatD == "23")){strDW = "rd";}
			if (strDefSep != " "){strDW = ""; strCM = "";}
			
			switch (strFormat.toUpperCase()){
				case strFormat1	: strReturnDt = dtCreatD + strDefSep + dtCreatM + strDefSep + dtCreatY; break;
				case strFormat2	: strReturnDt = dtCreatD + strDefSep + dtCreatM + strDefSep + String(dtCreatY).substr(2,2); break;
				case strFormat3	: strReturnDt = dtCreatD + strDefSep + arrMonth[Number(dtCreatM)-1].substr(0,3) + strDefSep + dtCreatY; blnReturn = true; break;
				case strFormat4	: strReturnDt = dtCreatD + strDefSep + arrMonth[Number(dtCreatM)-1].substr(0,3) + strDefSep + String(dtCreatY).substr(2,2); blnReturn = true; break;
				case strFormat5	: strReturnDt = dtCreatD + strDW + strDefSep + arrMonth[Number(dtCreatM)-1] + strCM + strDefSep + dtCreatY; blnReturn = true; break;
				case strFormat6	: strReturnDt = dtCreatD + strDW + strDefSep + arrMonth[Number(dtCreatM)-1] + strCM + strDefSep + String(dtCreatY).substr(2,2); blnReturn = true; break;
				case strFormat7	: strReturnDt = dtCreatM + strDefSep + dtCreatY; break;
				case strFormat8	: strReturnDt = dtCreatM + strDefSep + String(dtCreatY).substr(2,2); break;
				case strFormat9	: strReturnDt = arrMonth[Number(dtCreatM)-1].substr(0,3) + strDefSep + dtCreatY; blnReturn = true; break;
				case strFormat10: strReturnDt = arrMonth[Number(dtCreatM)-1].substr(0,3) + strDefSep + String(dtCreatY).substr(2,2); blnReturn = true; break;
				case strFormat11: strReturnDt = arrMonth[Number(dtCreatM)-1] + strCM + strDefSep + dtCreatY; blnReturn = true; break;
				case strFormat12: strReturnDt = arrMonth[Number(dtCreatM)-1] + strCM + strDefSep + String(dtCreatY).substr(2,2); blnReturn = true; break;
				
			}
			if (objC == null){
				return strReturnDt;
			}else{
				objC.value = strReturnDt;
			}
		}
		return blnReturn;
	
		
		function replaceall(strValue, strRepValue, strNValue){
			var i = strValue.indexOf(strRepValue);
			while(i > -1){
				strValue = strValue.replace(strRepValue, strNValue);
				i = strValue.indexOf(strRepValue);
			}
			return strValue
		}
		
		function validDate(dtD, dtM, dtY){
			if ((isNaN(dtD)) || (isNaN(dtM)) || (isNaN(dtY))){
				return false;
			}
			
			if ((Number(dtD) == 0) || (Number(dtM) == 0) || (Number(dtY) == 0)){
				return false;
			}
			
			// is it Valid Date
			if (Number(dtM) > 12){	
				return false;
			}
			
			if (Number(dtD) > getDaysInMonth(dtM, dtY)){	
				return false;
			}
			return true;
		}
	}
	
	// Add Months
	function addMonths(intMonths){
		var dtToday = new Date();
		if (arguments.length == 2){
			if (arguments[1] != ""){
				dtToday = new Date(arguments[1].substr(6,4), Number(arguments[1].substr(3,2)) - 1, arguments[1].substr(0,2));
			}
		}
		
		// See if we got anything
		var dtTD = dtToday.getDate();
		
		// Retrieve the Date pieces
		var strMonth = dtToday.getMonth() + new Number (intMonths);
		var strDay   = 1; //dtToday.getDate();
		var strYear  = dtToday.getFullYear();

		// Retrieve the Time pieces
		var strHour    = dtToday.getHours();
		var strMinutes = dtToday.getMinutes();
		var strSeconds = dtToday.getSeconds();
		var dtNew = new Date( strYear, strMonth, strDay, strHour, strMinutes, strSeconds);
		
		var dtNM = dtNew.getMonth() + 1;
		var dtND = dtNew.getDate();
		var dtNY = dtNew.getFullYear();
		
		if (Number(dtTD) > getDaysInMonth(dtNM, dtNY)){
			dtND = getDaysInMonth(dtNM, dtNY);
		}else{
			dtND = dtTD;
		}
		
		if (Number(dtND) < 10){dtND =  "0" + dtND;}
		if (Number(dtNM) < 10){dtNM =  "0" + dtNM;}
		
		// Create a new Date Object
		return dtND + "/" + dtNM + "/" + dtNY;
	}

	function CheckDates(tempIStartDate,tempIEndDate){
		var tempDay;
		var tempMonth;
		var tempYear;
	
		tempDay=tempIStartDate.substring(0,2);
		tempMonth=tempIStartDate.substring(3,5);
		tempYear=tempIStartDate.substring(6,10); 	
		var tempOStartDate=(tempYear+tempMonth+tempDay);
		
		
		tempDay=tempIEndDate.substring(0,2);
		tempMonth=tempIEndDate.substring(3,5);
		tempYear=tempIEndDate.substring(6,10); 	
		var tempOEndDate=(tempYear+tempMonth+tempDay);
		
		if (arguments.length == 2){
			if (tempOEndDate >= tempOStartDate){
				return true;
			}else{
				return false;
			}	
		}else{
			if (arguments[2] == true){
				if (tempOEndDate > tempOStartDate){
					return true;
				}else{
					return false;
				}	
			}
		}
	}

	function compareDate(date1,date2){
		var tempDay;
		var tempMonth;
		var tempYear;
	
		tempDay=date1.substring(0,2);
		tempMonth=date1.substring(3,5);
		tempYear=date1.substring(6,10); 	
		var tmpDate1=(tempYear+tempMonth+tempDay);
		
		
		tempDay=date2.substring(0,2);
		tempMonth=date2.substring(3,5);
		tempYear=date2.substring(6,10); 	
		var tmpDate2=(tempYear+tempMonth+tempDay);
		
		if (tmpDate1 > tmpDate2){
			return 1;
		}else if (tmpDate2 == tmpDate1){
			return 0;
		} else {
			return -1;	
		}

	}
	
	function addDays(dtDate,intDays) {
		return new Date(dtDate.getTime() + Number(intDays) *24*60*60*1000);
	}
	
	function dateValidDate(strDate){
		var dtD = strDate.substring(0,2) 
		var dtM = strDate.substring(3,5)
		var dtY = strDate.substring(6,10) 
		if ((isNaN(dtD)) || (isNaN(dtM)) || (isNaN(dtY))){
			return false;
		}
		
		if ((Number(dtD) == 0) || (Number(dtM) == 0) || (Number(dtY) == 0)){
			return false;
		}
		
		// is it Valid Date
		if (Number(dtM) > 12){	
			return false;
		}
		
		if (Number(dtD) > getDaysInMonth(dtM, dtY)){	
			return false;
		}
		return true;
	}
	
	// Age Calculate
	function ageCalculate(strDOB){
		var dd = strDOB.substr(0,2);
		var mm = strDOB.substr(3,2);
		var yy = strDOB.substr(6,4);
		
		var days = new Date();
		if (arguments.length == 2){
			if (arguments[1] != ""){
				days = new Date(arguments[1].substr(6,4), Number(arguments[1].substr(3,2)) - 1, arguments[1].substr(0,2));
			}
		}
		
		var gdate = days.getDate();
		var gmonth = days.getMonth();
		var gyear = days.getFullYear();
		var age = gyear - yy;
		if((mm == (gmonth + 1)) && (dd <= parseInt(gdate))) {
			age = age;
		}
		else {
			if(mm <= (gmonth)) {
				age = age;
			}
			else {
				age = age - 1; 
			}
		}
		
		if (age == gyear){
			age = 0;
		}
		return age
	}
		
	
		
	// GET NUMBER OF DAYS IN MONTH
	function getDaysInMonth(month,year)  {
		var days;
		if (month==1 || month==3 || month==5 || month==7 || month==8 ||
			month==10 || month==12)  days=31;
		else if (month==4 || month==6 || month==9 || month==11) days=30;
		else if (month==2)  {
			if (isLeapYear(year)) {
				days=29;
			}
			else {
				days=28;
			}
		}
		return (days);
	}
	
	function getWDay(strD){
		var arrW = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
		var dtDate = new Date(strD.substr(6,4), Number(strD.substr(3,2)) - 1, strD.substr(0,2))
		return arrW[dtDate.getDay()];
	}	
	
	// CHECK TO SEE IF YEAR IS A LEAP YEAR
	function isLeapYear (Year) {
		if (((Year % 4)==0) && ((Year % 100)!=0) || ((Year % 400)==0)) {
			return (true);
		}
		else {
			return (false);
		}
	}
	
	function DateToString(dtdate){
		var dtCM = dtdate.getMonth() + 1;
		var dtCD = dtdate.getDate();
		if (dtCM < 10){dtCM = "0" + dtCM}
		if (dtCD < 10){dtCD = "0" + dtCD}
		return dtCD + "/" + dtCM + "/" + dtdate.getFullYear();;
	}
	
	function dateConvertToMMDD(strDate){
		if (strDate != ""){
			var strDay=strDate.substring(0,2);
			var strMonth=strDate.substring(3,5);
			var strYear=strDate.substring(6,10); 	
			strDate = strMonth + "/" + strDay + "/" + strYear;
		}
		return strDate;
	}
	
	function ageCompare(strDOB, strDate, intAge){
		var arrAge = computeAge(strDOB, strDate).split("/");
		var blnReturn = true;
		if (Number(arrAge[2]) > intAge){blnReturn = false;}
		if (blnReturn){
			if (Number(arrAge[2]) == intAge){
				if ((Number(arrAge[0]) == 0) && (Number(arrAge[1]) == 0)) {
					blnReturn = true
				}else{
					blnReturn = false;
				}
			}
		}
		return blnReturn;
		
		function computeAge(strDOB, strCDate){
			var yd = Number(strCDate.substr(6,4));	
			var md = Number(strCDate.substr(3,2));
			var dd = Number(strCDate.substr(0,2));
	
			var yb = Number(strDOB.substr(6,4));	
			var mb = Number(strDOB.substr(3,2));
			var db = Number(strDOB.substr(0,2));
			
			var mLength = 0 
			var isJulian = 0 
		      
			var ma=0;
			var ya=0;
	
			var da = dd-db;
			if(da<0){
				md--;
				if(md<1){
					yd--;
					if(mLength){
						md=md+parseInt(365/mLength);
					}else{
						md=md+12;
					}
				}
				if(mLength==0){ 
					ml=getMonthLength(md,yd,isJulian);
					da=da+ml;
				}else{
					da+=mLength;
				}
			}
	
			ma = md - mb;
			// Month borrowing code - borrows months from years.
			if(ma<0){
				yd--;
				if(mLength!=0){
					ma=ma+parseInt(365/mLength);
				}else{
					ma=ma+12;
				}
			}
			ya = yd - yb;
			return da + "/" + ma + "/" + ya;
			
			function getMonthLength(month,year,julianFlag){
				var ml;
				if(month==1 || month==3 || month==5 || month==7 || month==8 || month==10||month==12)
					{ml = 31;}
				else {
					if(month==2) {
						ml = 28;
						if(!(year%4) && (julianFlag==1 || year%100 || !(year%400)))
							ml++;
					}
					else
						{ml = 30;}
				}
				return ml;    
			}
		}
	}
	
	function CheckDateTime(strFromDate, strFromTime, strToDate, strToTime){
		var tempDay;
		var tempMonth;
		var tempYear;
		var strFromTime = strFromTime.replace(":", "");
		var strToTime = strToTime.replace(":", "");
		
		tempDay=strFromDate.substring(0,2);
		tempMonth=strFromDate.substring(3,5);
		tempYear=strFromDate.substring(6,10); 	
		var tempOStartDate= (tempYear+tempMonth+tempDay) + strFromTime;
		
		tempDay=strToDate.substring(0,2);
		tempMonth=strToDate.substring(3,5);
		tempYear=strToDate.substring(6,10); 	
		var tempOEndDate=(tempYear+tempMonth+tempDay) + strToTime;
		
		if (tempOEndDate >= tempOStartDate){
			return true;
		}else{
			return false;
		}	
	}
	
	// date convertion 
	function stringToDate(strDate){
		var strDay=strDate.substring(0,2);
		var strMonth=strDate.substring(3,5);
		var strYear=strDate.substring(6,10); 
		var dtDate = new Date(strYear, Number(strMonth) - 1, strDay);
		return dtDate
	}
	// -------------------------------- End of File -----------------------------------

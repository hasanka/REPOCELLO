/**
 * @author Dilan Anuruddha
 */
(function($) {
	/*
	 *  Name space definition
	 */
	$.airutil = function(){};
	
	$.airutil.sort = function(){};
	$.airutil.dom = function(){};
	$.airutil.string = function(){};
	$.airutil.format = function(){};
	
	/*
	 ********************************************************************************************
	 * 									SORTING SECTION					     					*
	 ********************************************************************************************
	 */
	/*
	 * Quick sort
	 * Sort inputArray based on the comparator sent and return the sorted array
	 */
	$.airutil.sort.quickSort = function(inputArray, comparator){
				var less = [];
				var greater = [];
				if(inputArray.length <= 1 )
					return inputArray;
				
				var pivot = inputArray[inputArray.length-1];
				
				for(var i=0 ; i < inputArray.length-1; i++){
					if(comparator(inputArray[i],pivot)>0){
						greater[greater.length] = inputArray[i];
					}else{
						less[less.length]= inputArray[i];
					}
				}
				return (($.airutil.sort.quickSort(less,comparator)).concat([pivot]).concat($.airutil.sort.quickSort(greater,comparator)));
	}
	
	/*
	 * Bubble sort
	 * Sort inputArray based on the comparator sent and return the sorted array
	 */
	$.airutil.sort.bubbleSort = function(inputArray, comparator){
		var start = 0;
		var rest = inputArray.length - 1;
		for (var i = rest - 1; i >= start;  i--) {
			for (var j = start; j <= i; j++) {
				if (comparator(inputArray[j],inputArray[j+1]) > 0) {
					var tempValue = inputArray[j];
					inputArray[j] = inputArray[j+1];
					inputArray[j+1] = tempValue;
			    }
			}
		}
		return inputArray;
	}
	/*
	 ********************************************************************************************
	 * 								DOM MANIPULATION SECTION			     					*
	 ********************************************************************************************
	 */
	
	$.airutil.dom.cloneObject = function(obj){
		if(obj == null){
			return null;
		}
		var clone = (obj instanceof Array) ? [] : {};
        for(var i in obj) {
            if(typeof(obj[i])=="object")
                clone[i] = $.airutil.dom.cloneObject(obj[i]);
            else
                clone[i] = obj[i];
        }
        return clone;
	}
	
	$.airutil.dom.concatObjects = function(objOne, objTwo){
		var objr = {};
		for( k in objOne){
			objr[k] = objOne[k];
		}
		for( k in objTwo){
			objr[k] = objTwo[k];
		}
		return objr;
	}
	/* 
	 * Recursively convert the given object to string
	 */
	$.airutil.dom.objectToString = function(obj){
		var blnArr = obj  instanceof Array;
		var str =  (blnArr ? '[':'{');
		var first = true;
		for (var i in obj){
			if(!first) str += ',';		
			if (typeof(obj[i]) == 'object'){
				str  += $.airutil.dom.objectToString(obj[i]);
			}else{					
				str += ( (blnArr?'':(i +':')) + obj[i]);				
			}
			first = false;
		}
		return str+(blnArr?']':'}');
	}
	
	/*
	 ********************************************************************************************
	 * 								STRING UTILITY SECTION		  		     					*
	 ********************************************************************************************
	 */
	/*
	 * Compare two string (ignore case) and return integer
	 */
	$.airutil.string.comparator = function(one,two){
		var length = 0;
		var alpha = 'abcdefghijklmnopqrstuvwxyz';
		one = one.toLowerCase();
		two = two.toLowerCase();
		if(one.length>two.length)
			length = two.length
		else
			length = one.length;
		for(var i = 0 ; i < length ; i ++){
			var diff = alpha.indexOf(one.charAt(i))-alpha.indexOf(two.charAt(i));
			if(diff != 0){
				return diff;
			}
		}
		return 0;
	}
	
	/*
	 ********************************************************************************************
	 * 								FORMATTING SECTION			     	         				*
	 ********************************************************************************************
	 */
	
	/*
	 * 
	 */
	$.airutil.format.currency = function(num){
		if(num==null) return '';
		num = num.toString().replace(/\$|\,/g,'');
		if(isNaN(num))
			num = "0";
		var sign = (num == (num = Math.abs(num)));
		num = Math.floor(num*100+0.50000000001);
		var cents = num%100;
		num = Math.floor(num/100).toString();
		if(cents<10)
			cents = "0" + cents;
		sign =( (num+cents) == "000"? true: sign);
		return ((sign?'':'-')+num + '.' + cents);
	}
})(jQuery);
/**
 * This validator validates froms. several conventions used in the validation 
 * process.
 * 
 * @author Navod Ediriweera
 * @since September 03, 2009
 * @lastModified December 08 2009
 * @version 2.0 - Tested With jQuery Form Plugin version: 2.28 (http://malsup.com/jquery/form/) and Jquery v1.3.2
 * Note
 * Not Tested for Multiple Message Retrival
 * Checks for Special Charactors by default. To ignore special Charactors add "v_allowSpecials" to class attribute
 */

 /** 
 * Default behavior - Uses Predefined Errors. Uses Element Id as a display name 
 * 		eg - <input type = 'text' id = 'inputid1' class = 'v_mandatory'/>
 * 		Error is - "inputid1 cannot be blank."
 * 
 * Form Elements Must have an ID
 * 
 * Here are the conventions to follow and how to override default behavior
 * 
 * 1) special class names used for the validation identification.
 * 
 * 		eg v_mandatory - to specify a form field mandatory.
 * 
 * 2) Configuration overriding the 	$.fn.isaFieldNamesData and $.fn.isaErrorMessages to get project specific
 * 		Input field Names And Error Displays
 * 
 * 		{0} th parameter is used for field name in the message
 * 		
 * 		eg : 
 *		$.fn.isaErrorMessages.v_mandatory = My custom mandatory message in Spanish, {0} filed cannot be blank. 
 *		$.fn.isaErrorMessages.v_numericOnly = My custom mandatory message in French, {0} filed should be a number.
 *
 * 3) $.fn.isaDefinedItemValidator and $.fn.isaDirectValidator validation methods can be overridden to generate custom page specific validation logic
 * 
 * 		eg: in a screen JS method
 *  
 * 		$.fn.isaDefinedItemValidator.validateNumericOnly = function(){
 *			if(this.inputJQ.hasClass("v_numericOnly")){
 *				//Custom Behaviour here
 *				if( isNaN( this.inputJQ.val() ) ){
 *					return this.createError({className:"v_numericOnly"});					
 *				}
 *			}
 *			return false;
 *		}
 *		will affect how the v_numericOnly tagged input field validation takes place.
 * 
 * 4) Calling Convention
 * 
 * 		var messages = jqForm.isaValidateForm({screenID:UI_Airline.screenID,proceedAtError:false});
 * 
 */

/**
 * How To Add a new Validation Type
 * 
 * Supports Three Types of Validatoins -- 
 * 		eg - v_validateName
 * 			v_validateName:x
 * 			v_validateName:x:y (Where x and y are numbers)
 * Steps
 * 	1. Add a unique validate code to $.fn.isaErrorTypes
 * 	2. Add an appropriate error message to the new code in $.fn.isaErrorMessages
 * 	3. Based on the validator type add the method in the approprivate object (see Also - How to write a validator method)
 * 		3.1 - v_validateName : (Direct Validator) in $.fn.isaDirectValidator
 * 		3.2	- v_validateName:x and v_validateName:x:y (Defined Items Validator) in $.fn.isaDefinedItemValidator
 * 	4. Call the added method inside the $.fn.validatorMain.validate function (inside the loop) in the approprivate if conditio
 * 		4.1 If it's a direct validation inside (splited.length == 1) 
 * 		4.2 If it's a definedItem validation inside (splited.length > 1)
 * 
 * 	5. How To Add a new Validation Method
 * 
 * 		5.1. The method should compare the currClassName with the new error code. If the classes match the actual input should be validated
 * 			eg. this.currClassName ==$.fn.isaErrorTypes.v_maxVal
 * 		5.2. Available Attributes - See $.fn.isaDirectValidator AND $.fn.isaDefinedItemValidator objects
 * 		5.3. Validate the actual Validation condition 
 * 			eg - if( this.inputValue > this.actualNumb_1){	
 * 		5.4. If the condition is a success And the error msg needs to be displayed call (And Return) the createError function
 * 
 * 			eg - return this.createError({className:$.fn.isaErrorTypes.v_maxVal,value1:this.actualNumb_1});		
 * 			This method creates the error based on the errorCode From the Error Types. The error code should be the new error code created
 * 			It replaces {1}, {2} in the error message with the value1, value2 parameters
 * 			It replaces {0} with the  using the  parseDisplayFieldName() function. 
 * 			(See $.fn.isaValidationMessageDisplay.parseDisplayFieldName function)
 * 
 * See $.fn.isaErrorTypes for a description of avaialble validations
 */

(function($){
	$.extend($.fn, {
		/**
		 * Validates a Form
		 * Parametesr: 
		 * 		screenID - Prefix of the Display Name for each input. 
		 * 			Each input is identified as screenID+"_"+inputID. 
		 * 			Set $.fn.isaFieldNamesData.fieldNames object with name/value pairs with the [screenID+"_"+inputID] as the name to get a custom display name for each input in the form
		 * 			See Also "parseDisplayFieldName" method
		 * 			TODO: Do this in a different way. (??Custom Attributes with HTML5??) 
		 * 		proceedAtError - Can validate for all errors in a form. Set to false to get the first error found. Otherwise returns an array of Error messages
		 */		
		isaValidateForm : function (params) {
		
			var screenID= params.screenID;
			var blnProceede = params.proceedAtError;			
			var messages = new Array();
			// Tested With jQuery Form Plugin version: 2.28
			var elements = this[0].elements;

			for(var i=0;i<elements.length;i++){				
				var elementID = elements[i].id;		
				if(elementID == null || elementID ==""){
					continue;//skiping if no ID is defined
				}
				var classNamesArr = $('#'+elementID).attr('class');	
				if(classNamesArr == null || classNamesArr == "" || classNamesArr.length==0){
					continue;//skiping if no classes are attached
				}
				//skipping selectt list multiselect
				var attrType = $('#'+elementID).attr('type');
				if(attrType == 'select-multiple' || attrType == 'button') {
					continue;
				}				
				//initilizing validator attributes
				$.fn.validatorMain.innitValidator({elementID:elementID,screenID:screenID,proceedAtError:
					blnProceede,messages:messages});				
				messages = $.fn.validatorMain.validate();
				if(messages != null && messages.length>0 && !blnProceede){
					return messages;
				}				
			}			
			return messages;
		},
		
		isaValidateDiv : function (params) {
			var divID = params.divid;
			var screenID= params.screenID;
			var blnProceede = params.proceedAtError;			
			var messages = new Array();
			// Tested With jQuery Form Plugin version: 2.28
			var elements = $("#" + divID).find("input");

			for(var i=0;i<elements.length;i++){				
				var elementID = elements[i].id;		
				if(elementID == null || elementID ==""){
					continue;//skiping if no ID is defined
				}
				var classNamesArr = $('#'+elementID).attr('class');	
				if(classNamesArr == null || classNamesArr == "" || classNamesArr.length==0){
					continue;//skiping if no classes are attached
				}
				//skipping selectt list multiselect
				var attrType = $('#'+elementID).attr('type');
				if(attrType == 'select-multiple' || attrType == 'button') {
					continue;
				}				
				//initilizing validator attributes
				$.fn.validatorMain.innitValidator({elementID:elementID,screenID:screenID,proceedAtError:
					blnProceede,messages:messages});				
				messages = $.fn.validatorMain.validate();
				if(messages != null && messages.length>0 && !blnProceede){
					return messages;
				}				
			}			
			return messages;
		}	
			
	});
	
	/**
	 * Defualt Validation Attributes. 
	 * Can be overridden per-each screen
	 */
	$.fn.isaValidatorDefualts = {
		maxValidHoursLength:3,
		maxValidHours:999
	};
	

	/**
	 * common Validator properties
	 * validation methods are attached later
	 */
	$.fn.validatorMain = {
		messages : null,		
		inputJQ : null,
		screenActual : "",
		proceedAtError: false,
		classNames: "",
		errorMsgPrefix: "v_",		
		
		/**
		 * Initilizes the validator attributes.
		 * Parameters : screenID,elementID,proceedAtError,messages
		 */
		innitValidator : function (params){
			this.inputJQ = $('#'+params.elementID);			
			this.messages = params.messages;//error messages Array- Can hold more than one error
			this.proceedAtError = params.proceedAtError;
			this.inputValue = this.inputJQ.val();
			this.classNames = this.inputJQ.attr('class');
			this.screenActual = $.fn.isaValidationMessageDisplay.parseDisplayFieldName( 
					{screenID: params.screenID,elementID:params.elementID });
		},	
		/**
		 * Actual Validate Function
		 * Validates each class name.
		 */
		validate: function(){
			var classArr = this.classNames.split(" ");
			//skipping optional value checking if the value is empty
			if( (this.inputValue== null || this.inputValue=="") && !this.inputJQ.hasClass("v_mandatory")) {
				//returns the messages array. Skips validation if not mandatory and is empty string
				return this.messages;
			}
			//validating special characters
			//validating special characters
			if( !(this.inputJQ.hasClass($.fn.isaErrorTypes.v_allowSpecials)) &&
					!(this.inputJQ.hasClass($.fn.isaErrorTypes.v_Email)) &&
					!(this.inputJQ.hasClass($.fn.isaErrorTypes.v_URL)) &&
					(this.inputJQ.attr('type') != 'select-one')){
				if(this.validateSpecials() != "") {return this.messages};
			}	
			for(var i = 0; i<classArr.length; i++) {
				var splited = classArr[i].split(":");				
				this.currClassName = splited[0];
				if(this.currClassName.substring(0,2) != this.errorMsgPrefix){
					continue;//if not a validation class skip the class.
				}
				//validations with v_xxx
				if(splited.length == 1){			
					if(this.noSpaces()) {return this.messages};						
					if(this.validateMandatory()) {return this.messages};	
					if(this.validateNumericOnly()) {return this.messages};
					if(this.validateStringOnly()) {return this.messages};
					if(this.validateForNoDecimals()) {return this.messages};
					if(this.validateNoZero()){return this.messages};
					if(this.validateURL()) {return this.messages};
					if(this.validateURI()) {return this.messages};			
					if(this.validateEmail()) {return this.messages};
					
					if(this.validateDDMMYYYYFormat()) {return this.messages};
					if(this.validateHHmm()) {return this.messages};	
					
				}	
				//validations with v_xxx:yy 
				if(splited.length > 1) {					
					try {
						this.actualNumb_1 = Number(splited[1]);
						this.actualNumb_2 = Number(splited[2]);
					}catch(e){}	//ignoring string --> number type casting errors
					
					if(this.validateMinLength()) {return this.messages};	
					if(this.validateActualLength()) {return this.messages};	
					if(this.validateRange()) {return this.messages};	
					if(this.validateMaxVal()) {return this.messages};	
					if(this.validateMaxDecimals()) {return this.messages};	
					if(this.validateNumberAndDecimalRange()) {return this.messages};	
					if(this.validateHHmmAny()) {return this.messages};	
				}
			}		
			return this.messages
		},

		/**
		 * Creates and assings the error. returns true if the should NOT be continued.
		 * parameters: 
		 * 		className - The Error Type from $.fn.isaErrorTypes 
		 * 		value1 - The Value to replace {1} in the error message
		 * 		value2- The Value to replace {2} in the error message
		 */
		createError: function(params){
			if(params.value1 == null && params.value2 == null)
				this.messages[this.messages.length] = $.fn.isaValidationMessageDisplay.isaParseValidationMessage(params.className,this.screenActual);	
			else if(params.value2 != null)//if value2 is defined value1 should be defined as well
				this.messages[this.messages.length] = $.fn.isaValidationMessageDisplay.isaParseValidationMessage(params.className,this.screenActual,params.value1,params.value2);	
			else if(params.value1 != null)
				this.messages[this.messages.length] = $.fn.isaValidationMessageDisplay.isaParseValidationMessage(params.className,this.screenActual,params.value1);	
								
			if( !this.proceedAtError){
				this.doFocusOnErrorField();
				return true;
			}
			return false;
		},
		doFocusOnErrorField: function(){
			if(!this.inputJQ.attr('disabled') && this.inputJQ.attr('type') != 'hidden'){	
				try {this.inputJQ.focus();}catch(e){}//do nothing if error is found
			}	
		}
	};
	//Validation methods for v_xxx:nn type validations
	$.fn.isaDefinedItemValidator = {
		//These attributes are initialized in $.fn.validatorMain	
		classArr: new Array(),
		currClassName: "",//the iterative validation type
		actualNumb_1: null,//v_validate:x:y the number x
		actualNumb_2: null,//v_validate:x:y the number y
		inputValue: null,//the actual value in the inputtype	
		
		//Functions
		validateActualLength: function (){
			if(this.currClassName == $.fn.isaErrorTypes.v_actualLength){
				if( $.trim(this.inputValue).length != this.actualNumb_1 ){
					return this.createError({className:$.fn.isaErrorTypes.v_actualLength,value1:this.actualNumb_1});					
				}
			}
		},
		validateRange: function (){
			if(this.currClassName == $.fn.isaErrorTypes.v_range){//range validation					
				if(  this.inputValue > this.actualNumb_1 ||  this.inputValue< this.actualNumb_2 ){
					return this.createError({className:$.fn.isaErrorTypes.v_range,value1:this.actualNumb_1,value2:this.actualNumb_2});		
				}					
			}
		},
		validateMaxVal: function (){
			if(this.currClassName ==$.fn.isaErrorTypes.v_maxVal){//Maximum range validation					
				if( this.inputValue > this.actualNumb_1){
					return this.createError({className:$.fn.isaErrorTypes.v_maxVal,value1:this.actualNumb_1});		
				}
			}			
		},
		validateMaxDecimals: function (){
			if(this.currClassName ==$.fn.isaErrorTypes.v_maxDecimals){//Max Number of Decimal Points (0---n)
				var decimalsArr = this.inputValue.split(".");
				if(decimalsArr != null && decimalsArr.length == 2 && decimalsArr[1].length > this.actualNumb_1) {					
					return this.createError({className:$.fn.isaErrorTypes.v_maxDecimals,value1:this.actualNumb_1});
				}
			}
		},
		validateNumberAndDecimalRange: function (){
			if(this.currClassName ==$.fn.isaErrorTypes.v_NumberAndDecimalRange){
				//Number of whole numbers and number of decimal points
				var decimalsArr = this.inputValue.split(".");
				if(decimalsArr != null) {	
					if( (decimalsArr.length > 0 && decimalsArr[0].length > this.actualNumb_1) ){
						return this.createError({className:$.fn.isaErrorTypes.v_NumberAndDecimalRange_num,value1:this.actualNumb_1});
					}	
					if( (decimalsArr.length > 1 && decimalsArr[1].length > this.actualNumb_2) ){
						return this.createError({className:$.fn.isaErrorTypes.v_NumberAndDecimalRange_decimals,value1:this.actualNumb_2});
					}	
				}
			}
		},
		
		validateMinLength: function () {//Minimun Length
			if(this.currClassName == $.fn.isaErrorTypes.v_minLength){
				if($.trim(this.inputValue).length < this.actualNumb_1){
					return this.createError({className:$.fn.isaErrorTypes.v_minLength,value1:this.actualNumb_1});
				}
			}
		},
		//date format validation for dd/mm/yyyy
		validateDDMMYYYYFormat : function (){
			if(this.currClassName == $.fn.isaErrorTypes.v_ddMMYYYY){			
				//TODO : Write reg EXP
				var parts = this.inputValue.split("/");
				if(!$.fn.isaValidator.validateDDMMYYYY(this.inputValue)){
					return this.createError({className:$.fn.isaErrorTypes.v_ddMMYYYY});
				}
				//validating month and date values
				try {
					var date = Number(parts[0]);	var month = Number(parts[1]); var year = Number (parts[2]);				
				}catch(e) {}
				if(parts[2].length != 4){return this.createError({className:$.fn.isaErrorTypes.v_ddMMYYYY});};
				if(month > 12) {			
					this.actualNumb_1 = "month";
					this.actualNumb_2 = 12;
					return this.createError({className:$.fn.isaErrorTypes.v_date_month,value1:this.actualNumb_1,value2:this.actualNumb_2});
				};
				if(date > 28) {
					if(month == 2 && (year % 4 != 0 || year % 100 == 0 && year % 400 != 0)){
						this.actualNumb_1 = "value";
						this.actualNumb_2 = 28;						
						return this.createError({className:$.fn.isaErrorTypes.v_date_month,value1:this.actualNumb_1,value2:this.actualNumb_2});
					}
				}
				else if (month == 4 || month == 6 || month  == 9 || month == 11) {
			        if (date > 30) {
			        	this.actualNumb_1 = "value";
			        	this.actualNumb_2 = 30;			        	
						return this.createError({className:$.fn.isaErrorTypes.v_date_month,value1:this.actualNumb_1,value2:this.actualNumb_2});
			        };
			    }else {
			    	if(date > 31){
			        	this.actualNumb_1 = "value";
			        	this.actualNumb_2 = 31;
						return this.createError({className:$.fn.isaErrorTypes.v_date_month,value1:this.actualNumb_1,value2:this.actualNumb_2})
			    	};
			    }
			}
		},
		validateHHmmAny : function (){
			if(this.currClassName == $.fn.isaErrorTypes.validateHHmmAny){						
				var parts = this.inputValue.split(":");
				var maxHours = $.fn.isaValidatorDefualts.maxValidHours;
				if(this.actualNumb_1 != null && this.actualNumb_1 != ""){
					maxHours = Number(this.actualNumb_1);
				}
				if(parts.length !=2){
					return this.createError({className:$.fn.isaErrorTypes.v_HHmm});	
				}				
				if( isNaN(parseInt(parts[0])) || isNaN(parseInt(parts[1])) ){
					return this.createError({className:$.fn.isaErrorTypes.v_numericOnly});					
				}	
				if(parts[0] == null || parts[0].length ==0 || parts[0]> maxHours){
					this.screenActual = $.fn.isaValidationMessageDisplay.parseMultipleFromSingleFieldName("HH",this.screenActual);
					var displayVal = Number(maxHours)+1;
					return this.createError({className:$.fn.isaErrorTypes.v_range,value1:'0',value2:displayVal});	
				}
				if(parts[1] ==null || parts[1].length ==0 || parts[1]>59){
					this.screenActual = $.fn.isaValidationMessageDisplay.parseMultipleFromSingleFieldName("MM",this.screenActual);
					return this.createError({className:$.fn.isaErrorTypes.v_range,value1:'0',value2:'60'});	
				}	
				if(parts[0] != null && parts[0].length >$.fn.isaValidatorDefualts.maxValidHoursLength){
					this.screenActual = $.fn.isaValidationMessageDisplay.parseMultipleFromSingleFieldName("HH",this.screenActual);
					return this.createError({className:$.fn.isaErrorTypes.v_NumberAndDecimalRange_num,value1:$.fn.isaValidatorDefualts.maxValidHoursLength});	
				}
			}
		},
	};
	//Validation Methods for direct (v_xxxx) validations
	$.fn.isaDirectValidator = {			
		currClassName: "",//validation type
		inputJQ : null,//input object
		inputValue: null,//value of the input object
		screenActual: "",//actual screen name
		
		validateSpecials : function (){//validating invalid characters if not spcificall stated not to
			
				var strChkEmpty = $.fn.isaValidator.findChar(this.inputValue);
				if(strChkEmpty != "0"){
					return this.createError({className:$.fn.isaErrorTypes.v_allowSpecials});					
				}	
				return "";
			
		},		
		validateMandatory : function (){
			if(this.currClassName == $.fn.isaErrorTypes.v_mandatory){
				
				if(!this.inputValue || $.trim(this.inputValue) ==""){
					return this.createError({className:$.fn.isaErrorTypes.v_mandatory});
				}
			}
			return false;
		},
		validateNumericOnly : function(){
			if(this.currClassName == $.fn.isaErrorTypes.v_numericOnly){
				var splited = this.inputValue.split(" ");
				if(splited.length>1){
					return this.createError({className:$.fn.isaErrorTypes.v_numericOnly});	
				}
				if( isNaN( this.inputValue) ){
					return this.createError({className:$.fn.isaErrorTypes.v_numericOnly});					
				}
			}
			return false;
		},
		validateStringOnly : function (){
			if(this.currClassName == $.fn.isaErrorTypes.v_stringOnly){
				if( !isNaN( this.inputValue ) ){
					return this.createError({className:$.fn.isaErrorTypes.v_stringOnly});					
				}
			}
		},
		validateForNoDecimals : function (){
			if(this.currClassName == $.fn.isaErrorTypes.v_noDecimals){
				var splitedInputValue = this.inputValue.split(".");
				if( splitedInputValue.length>1 ){
					return this.createError({className:$.fn.isaErrorTypes.v_noDecimals});					
				}
			}
		},
		validateURL : function (){
			if(this.currClassName == $.fn.isaErrorTypes.v_URL){				
				if( !$.fn.isaValidator.validateURL(this.inputValue) ){
					return this.createError({className:$.fn.isaErrorTypes.v_URL});		
				}
			}
		},
		validateURI : function (){
			if(this.currClassName == $.fn.isaErrorTypes.v_URI){				
				if( !$.fn.isaValidator.validateURI(this.inputValue) ){
					return this.createError({className:$.fn.isaErrorTypes.v_URI});	
				}
			}
		},
		validateEmail : function (){
			if(this.currClassName == $.fn.isaErrorTypes.v_Email){				
				if( !$.fn.isaValidator.checkEmail(this.inputValue) ){
					return this.createError({className:$.fn.isaErrorTypes.v_Email});		
				}
			}
		},

		//Time validation for hh:mm
		validateHHmm : function (){
			if(this.currClassName == $.fn.isaErrorTypes.v_HHmm){						
				var parts = this.inputValue.split(":");
				if(parts.length !=2){
					return this.createError({className:$.fn.isaErrorTypes.v_HHmm});	
				}				
				if( isNaN(parseInt(parts[0])) || isNaN(parseInt(parts[1])) ){
					return this.createError({className:$.fn.isaErrorTypes.v_numericOnly});					
				}
				if(parts[0] == null || parts[0].length ==0 || parts[0]>23){
					this.screenActual = $.fn.isaValidationMessageDisplay.parseMultipleFromSingleFieldName("HH",this.screenActual);
					return this.createError({className:$.fn.isaErrorTypes.v_range,value1:'0',value2:'24'});	
				}
				if(parts[1] ==null || parts[1].length ==0 || parts[1]>59){
					this.screenActual = $.fn.isaValidationMessageDisplay.parseMultipleFromSingleFieldName("MM",this.screenActual);
					return this.createError({className:$.fn.isaErrorTypes.v_range,value1:'0',value2:'60'});	
				}	
				if(parts[0] != null && parts[0].length >$.fn.isaValidatorDefualts.maxValidHoursLength){
					return this.createError({className:$.fn.isaErrorTypes.v_NumberAndDecimalRange_num,value1:'HH',value2:'3'});	
				}
			}
		},		
		noSpaces: function (){
			if(this.currClassName == $.fn.isaErrorTypes.v_noSpaces){				
				var splited = this.inputValue.split(" ");
				if(splited.length>1){
					return this.createError({className:$.fn.isaErrorTypes.v_noSpaces});	
				}
			}
		},
		validateNoZero : function (){
			if(this.currClassName == $.fn.isaErrorTypes.v_noZeroValue){	
				if(!$.fn.isaValidator.validateZero(this.inputValue)){
					return this.createError({className:$.fn.isaErrorTypes.v_noZeroValue});	
				}
			}

		}
	};

	//attaching the validator functions to the validatorMain object
	$.extend($.fn.validatorMain,$.fn.isaDirectValidator);
	$.extend($.fn.validatorMain,$.fn.isaDefinedItemValidator);
		
	/**
	 * Error Types
	 * The value Should be placed in the input tag class attribute
	 * eg- if error code is v_errorCode = "GGG"
	 * <input type="" id = "" class= "GGG"/>
	 */
	$.fn.isaErrorTypes = {
		v_mandatory : "v_mandatory",//Mandatory Field
		v_allowSpecials : "v_allowSpecials",//Allow All Special Charactors
		v_numericOnly : "v_numericOnly",//Allow Only Numeric Fields
		v_stringOnly : 'v_stringOnly',//Allow Only String fields
		v_noDecimals : 'v_noDecimals',//No Decimal Points allowed. i.e - "." is not allowed
		v_URL : 'v_URL',//is URL
		v_URI : 'v_URI',//is URI
		v_Email : 'v_Email',//is Emiail
		v_ddMMYYYY : 'v_ddMMYYYY',//date format must be dd/MM/YYYY
		v_date_month: 'v_date_month',//date of month. Cannot Be Used Directly. -- Tag for an error message only
		v_HHmm : 'v_HHmm',//Time format should be HH:MM
		v_actualLength : 'v_actualLength',//Actual Length of the entered value should be exactly the value specificed eg - v_actualLength:10. The input should be a lentgth of 10
		v_minLength : 'v_minLength',//The minimum length available Should be the specified value- Eg. v_minLength:5 means min. length should be 5
		v_range : 'v_range',//Defines a range - For numerics only. eg - v_range:5:10 means the value should be between 5 and 10 (Excluding both 5 and 10)
		v_maxVal : 'v_maxVal',//Defines the max. numeric value. Only for numerics. eg - v_maxVal:10 means the value cannot exceede or equal 10
		v_maxDecimals : 'v_maxDecimals',//Defines the maxiumn number of decimal points allowed. Only for numerics. Eg. v_maxDecimals:10 means after the "." there can only be upto 10 decimal points
		v_NumberAndDecimalRange: 'v_NumberAndDecimalRange',//Defines the max Length of Both Number and Decimal Points (Precision and Scale). Eg. v_NumberAndDecimalRange:3:5 Precision of the value cannot be more than 3 and scale cannot be more than 5 
		v_NumberAndDecimalRange_num : 'v_NumberAndDecimalRange_num',//Cannot be used directly - Tag for an error message only
		v_NumberAndDecimalRange_decimals : 'v_NumberAndDecimalRange_decimals',//Cannot be used directly--Tag for an error message only
		v_noSpaces: 'v_noSpaces',//Disallow space in the input field
		v_noZeroValue: 'v_noZeroValue',//Disallow 0 numeric value - Only for Numeric Inputs
		validateHHmmAny: 'v_HHmmAny'//Validate for hh:mm with $.fn.isaValidatorDefualts.maxValidHours and $.fn.isaValidatorDefualts.maxValidHoursLength
	};
	/**
	 * Error Code should match the name in $.fn.isaErrorTypes
	 * eg. if $.fn.isaErrorTypes.v_xxx = "yyy", $.fn.isaErrorMessages.v_xxx should exist
	 * {0} should always be the element name eg: 
	 * v_mandatory - "Airport Code cannot be blank", v_maxDecimals - "Adustment Time Can Only Have 10 Decimal points"
	 */
	$.fn.isaErrorMessages = {
		v_mandatory : "{0} cannot be blank.",
		v_allowSpecials : "Invalid Character(s) exists in {0}.",
		v_numericOnly : "{0} should be a Number.",
		v_stringOnly : '{0} should be a Letter.',
		v_noDecimals : 'No decimal places allowed in {0}',
		v_URL : 'Invalid {0}',
		v_URI : 'Invalid {0}',
		v_Email : 'Invalid {0}',
		v_ddMMYYYY : '{0} Format Should be DD/MM/YYYY.',
		v_date_month : '{0} {1} Cannot be greater than {2}',
		v_HHmm : '{0} Format Should be HH:mm',
		v_actualLength : '{0} Length Should be {1}.',
		v_minLength : '{0} Length Should be greater than or equal to {1}',
		v_range : '{0} Should be Greater Than {1} and Less Than {2}.',
		v_maxVal : '{0} cannot be less than {1}',
		v_maxDecimals : '{0} Can Only Have {1} Decimal points',
		v_NumberAndDecimalRange_num : '{0} Length Should be Less Than or Equal to {1}.',
		v_NumberAndDecimalRange_decimals : '{0} Can Only Have {1} Decimal points.',
		v_noSpaces:'Invalid {0}.',
		v_noZeroValue: 'Zero not allowed in {0}',
		validateHHmmAny:  '{0} Format Should be HH:mm'
	};
	//Data for field names  
	$.fn.isaFieldNamesData = {
		fieldNames: null,
		maxDynamicFields : 0//can construct dynamic field names. Overide in each screen to indiacte the max number. Default is set to zero because otherwise unnessacary iterations will occure in .fn.isaValidationMessageDisplay.parseDisplayFieldName 
	};
	//Common Validations. Can be safely accessed externally  
	//eg: $.fn.isaValidator.validateDDMMYYYY(xxxx) == returns true or false
	$.fn.isaValidator = {			
		
		validateIsPositiveInt: function(n){
			return RegExp("^[+]?[0-9]+$").test( n );
		},		
		
		validateZero : function (value){
			if( Number(value) == 0){
				return false
			}
			return true;
		},
			
		validateDDMMYYYY : function (strDate){
			var splitedDate = strDate.split("/");
			if(splitedDate.length!=3){
				return false;
			}
			if(splitedDate[0].length>2) {
					return false;
			}
			if(splitedDate[1].length>2) {
				return false;
			}
			if(splitedDate[2].length>4) {
				return false;
			}
			return true;
		},
		validateURL : function (strURL) {
			if(strURL.substring(strURL.length-1,strURL.length) == "."){
				return false;
			}
			return strURL.match(/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/);
		},
		validateURI : function (strURI){//TODO: find a proper Regexp
			var tempStrURI = strURI;
			if(tempStrURI!= null && tempStrURI.length>7 && tempStrURI.substring(2,7) != "tp://"){
				tempStrURI = "http://"+ strURI;
			}
			if(tempStrURI.substring(7,10) !="www"){
				return false;
			}
			return tempStrURI.match(/^(ht|f)tps?:\/\/[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/);
		},		
		checkEmail : function checkEmail(s){return RegExp( "^[a-zA-Z0-9-_.]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,7}$" ).test(s);}
			
		,checkInvalidChar : function (strValue){
			var strChkEmpty = this.findChar(strValue)
			if (strChkEmpty != "0"){
				return false;
			}else{
				return true;
			}
		},
		checkInvalidWithAllowedList : function (strValue, arrAllowedChars){
			var strChkEmpty = this.findCharWithNotAllowed(strValue,arrAllowedChars)
			if (strChkEmpty != "0"){
				return false;
			}else{
				return true;
			}
		}	
		
		,isFromDateLargerThanToDate: function(strFromDate,strToDate){
			var splitedDateStart = strFromDate.split("/");
			var splitedDateEnd = strToDate.split("/");
			var startDateNumber = Number(splitedDateStart[2]+splitedDateStart[1]+splitedDateStart[0]);
			var endDateNumber = Number(splitedDateEnd[2]+splitedDateEnd[1]+splitedDateEnd[0]);
			if(startDateNumber > endDateNumber){
				return true;
			}
			return false;
		},
		isEqualToCurrenDate  : function (strDate){
			var splitedDateStart = strDate.split("/");
			var datDate = new Date(splitedDateStart[2],Number(splitedDateStart[1])-1,splitedDateStart[0]);
			
			var currentDate = new Date();
			var datComparable = new Date(currentDate.getFullYear(),currentDate.getMonth(),currentDate.getDate());
			if((datDate.getTime()- datComparable.getTime()) == 0){
				return true;
			}
			return false;
		},
		isDateLagerThanCurrentDate : function (strDate){
			var splitedDateStart = strDate.split("/");
			var datDate = new Date(splitedDateStart[2],Number(splitedDateStart[1])-1,splitedDateStart[0]);
			
			var currentDate = new Date();
			var datComparable = new Date(currentDate.getFullYear(),currentDate.getMonth(),currentDate.getDate());
			if(datDate > datComparable){
				return true;
			}
			return false;
		},
		isDateLagerThanCurrentDateTime : function (strDate,strTime){
			var splitedDateStart = strDate.split("/");
			var splitedTime = strTime.split(":");
			var datDate = new Date(splitedDateStart[2],Number(splitedDateStart[1])-1,splitedDateStart[0],
					splitedTime[0],splitedTime[1],splitedTime[2]);
			
			var datComparable = new Date();
			if(datDate > datComparable){
				return true;
			}
			return false;
		},
		compareToCurrentDate : function(strD){
			var dateParser = function (d){
				var dt = d.split(' ');
				var date  = dt[0].split('/');
				var time = dt[1].split(':');
				if(time.length == 2){
					time[2] = 0;
				}
				
				var datDate = new Date(date[2],Number(date[1])-1,date[0],time[0],time[1],time[2]);
				return datDate;
			}
			var d1 = dateParser(strD);
			var d2 = new Date();
			return (d1.getTime()-d2.getTime());
		},
		compareDates : function (strD1,strD2){
			var dateParser = function (d){
				var dt = d.split(' ');
				var date  = dt[0].split('/');
				var time = dt[1].split(':');
				if(time.length == 2){
					time[2] = 0;
				}
				
				var datDate = new Date(date[2],Number(date[1])-1,date[0],time[0],time[1],time[2]);
				return datDate;
			}
			var d1 = dateParser(strD1);
			var d2 = dateParser(strD2);
			return (d1.getTime()-d2.getTime());
		},
		
		//TODO: Move Invalid Character validations to jqueryAlphanumeric plugin.
		findChar : function (StringIn){
			if(StringIn == null || StringIn.length ==0){
				return "0";		
			}	
			/************************************
			// ------------- Check the standards characters			  
			/** @Author			: Rilwan A. Latiff
				@Version		: 1.0
			 	@Last Modified	: 1st June 2005				
				\b 	Backspace						\f 	Form feed
				\n 	New line						\r 	Carriage return
				\t 	tab								\" 	quotation mark
				\'  MS Office single quote 6		\'  Ms Office singel Quote 9
				\\  Back Slash
			****************************/
			var CharInArray = new Array("'", "<", ">", "^", '"', "~", "-",'_','+','=','@','#','%','&','$','*','!','{','}','[',']',';','?','|');
			var CharOutArray = new Array();
			for ( var i = 0; i < StringIn.length; i++) {
				switch (StringIn.charCodeAt(i)) {
				case 92:
					CharOutArray[0] = "\\ "
					CharOutArray[1] = eval(i + 1);
					return (CharOutArray)
					break;
				case 8216:
				case 8217:
					CharOutArray[0] = "' "
					CharOutArray[1] = eval(i + 1);
					return (CharOutArray)
					break;
				default:
					for ( var j = 0; j < CharInArray.length; j++) {
						if (StringIn.charAt(i) == CharInArray[j]) {
							CharOutArray[0] = CharInArray[j]
							CharOutArray[1] = eval(i + 1);
							return (CharOutArray);
						}
					}
					break;
				}
			}
			return "0";
		},
		/**
		 * Validates except for the given charactors
		 */
		findCharWithNotAllowed : function (StringIn,arrAllowedItems){
			if(StringIn == null || StringIn.length ==0){
				return "0";		
			}	
			var OriginalCharInArray = new Array("'", "<", ">", "^", '"', "~", "-",'_','+','=','@','#','%','&','$','*','!','{','}','[',']',';','?','|');
			var CharInArray = new Array();
			for ( var int = 0; int < OriginalCharInArray.length; int++) {
				var blnFound = false;
				for ( var ij = 0; ij < arrAllowedItems.length; ij++) {
					if(OriginalCharInArray[int] == arrAllowedItems[ij]){
						blnFound = true;
					}	
				}
				if(!blnFound){
					CharInArray.push(OriginalCharInArray[int]);	
				}
			}		
			var CharOutArray = new Array();
			for ( var i = 0; i < StringIn.length; i++) {
				switch (StringIn.charCodeAt(i)) {
				case 92:
					CharOutArray[0] = "\\ "
					CharOutArray[1] = eval(i + 1);
					return (CharOutArray)
					break;
				case 8216:
				case 8217:
					CharOutArray[0] = "' "
					CharOutArray[1] = eval(i + 1);
					return (CharOutArray)
					break;
				default:
					for ( var j = 0; j < CharInArray.length; j++) {
						if (StringIn.charAt(i) == CharInArray[j]) {
							CharOutArray[0] = CharInArray[j]
							CharOutArray[1] = eval(i + 1);
							return (CharOutArray);
						}
					}
					break;
				}
			}
			return "0";
		}
	};		
	//Depricated - use $.trim
	$.fn.trimString = function (str) {
	    return str.replace(/^\s*/, "").replace(/\s*$/, "");
	}
	//Validation Message Display
	$.fn.isaValidationMessageDisplay = {
		//Parsing a validation message from the error code. replacing arguments for {xx} values
		isaParseValidationMessage: function (errorCode,screenActual) {		
			var strMessage = $.fn.isaErrorMessages[errorCode];
			strMessage = strMessage.replace("{" + 0 + "}", screenActual);	
			
			if (arguments.length > 2) {
				for ( var i = 0; i < arguments.length-1; i++) {
					strMessage = strMessage.replace("{" + Number(i+1) + "}", arguments[i + 2]);
				}
			}
			return strMessage;
		},
		/**
		 * Parsing a field name for an element ID
		 * $.fn.isaFieldNamesData.fieldNames object must contain appropriate objects with key value parils as
		 * name - elementID (The id atrribute of the input type)
		 * value - Actual Display Name
		 */		
		parseDisplayFieldName: function (params){
			var elementID = params.elementID;
			var screenID = params.screenID;
			var fieldNames = $.fn.isaFieldNamesData.fieldNames;
			//adding support for dynamic field ids.
			//dynamic ids are defined as id's containing '-X-'
			for(var i = 0; i < $.fn.isaFieldNamesData.maxDynamicFields; i++){
				elementID = elementID.replace("-"+i+"-","-X-");
			}	
			var screenActualName = screenID+"_"+elementID;
			var screenActual = null;
			if(fieldNames != null){
				screenActual = fieldNames[screenActualName];
			}else {
				screenActual = screenActualName;
			}
			//screenActual can be null if fieldNames[screenActualName] return a null
			if(screenActual == null){
				screenActual = screenActualName;
			}
			return screenActual;
		},
		/**
		 * Adds a prefix for the screen name
		 */
		parseMultipleFromSingleFieldName: function (strParseName,screenActual){
			return screenActual+" "+strParseName;	
		}
		
	};

})(jQuery);
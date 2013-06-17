/**
 * This validator validates froms. several conventions used in the validation
 * process.
 * 
 * Default behavior - Uses Predefined Errors. Uses Element Id as a display name
 * eg - <input type = 'text' id = 'inputid1' class = 'v_mandatory'/> Error is -
 * "inputid1 cannot be blank."
 * 
 * Form Elements Must have an ID Available valication classs are
 * 
 * v_mandatory v_allowSpecials v_numericOnly v_stringOnly v_noDecimals v_URL
 * v_URI v_Email v_ddMMYYYY v_HHmm v_actualLength v_range v_maxVal v_maxDecimals
 * v_NumberAndDecimalRange_decimals v_NumberAndDecimalRange_num v_username v_password
 * v_ddMMYYYYPreventPast v_stringOnlyForName v_StringUpperCaseAndNumericOnly
 * 
 * Here are the conventions to follow and how to override default behavior
 * 
 * 1) special class names used for the validation identification.
 * 
 * eg v_mandatory - to specify a form field mandatory.
 * 
 * 2) Input field Names And Error Displays
 * 
 * {0} th parameter is used for field name in the message
 * 
 * 
 * @author Navod Ediriweera, Malaka Ekanayake
 * @since September 03, 2009
 * @lastModified October 14 2009
 * @version 1.0 - Tested With jQuery Form Plugin version: 2.28
 *          (http://malsup.com/jquery/form/) and Jquery v1.3.2
 */

(function($) {

	/**
	 * parameters will have these attributes parameters.proceedAtError
	 */

	$.fn.isaValidateDiv = function(parameters) {

		// var commonErrors = parameters.commonErrors;
		var proceed = parameters.proceedAtError;
		var errorMessages = new Array();
		var errorCount = 0;
		// Tested With jQuery Form Plugin version: 2.28
		var elements = this.find("input");
		var result = true;
		hideErrorMsg();
		initializeStringTrim();
		for ( var i = 0; i < elements.length; i++) {

			if (!result && errorMessages.length > 0)
				break;// exiting loop if
			// errors found

			if (elements[i].id == "") {
				continue;
			}

			var elementID = elements[i].id;
			inputJQ = $("#" + elementID);
			var classNames = inputJQ.attr('class');

			if (classNames == null || classNames == ""
					|| classNames.length == 0) {
				// skiping if no classes are attached
				continue;
			}
			// mandatory validation
			if (inputJQ.hasClass("v_mandatory")) {
				if (!inputJQ.val().trim()) {
					errorMessages[errorCount] = displayErrorMsg(elementID,
							"v_mandatory");
					doFocusOnErrorField(inputJQ);
					errorCount++;
					result = false;
					if (!proceed)
						return false;
				}
			}
			// skipping optional value checking if the value is empty or
			// whitespace only
			if ((inputJQ.val() == null || inputJQ.val().trim() == "")
					&& !inputJQ.hasClass("v_mandatory")) {
				continue;// goes to next in the for loop
			}
			// validating invalid characters if not spcificall stated not to
			if (!inputJQ.hasClass("v_allowSpecials")) {
				var strChkEmpty = $.fn.isaValidator.findChar(inputJQ.val());
				if (strChkEmpty != "0") {
					doFocusOnErrorField(inputJQ);
					errorMessages[errorCount] = displayErrorMsg(elementID,
							"v_allowSpecials");
					errorCount++;
					result = false;
					if (!proceed)
						return false;
				}
			}
			if (!inputJQ.hasClass("v_allowSpecials")) {
				var strChkEmpty = $.fn.isaValidator.findChar(inputJQ.val());
				if (strChkEmpty != "0") {
					doFocusOnErrorField(inputJQ);
					errorMessages[errorCount] = displayErrorMsg(elementID,
							"v_allowSpecials");
					errorCount++;
					result = false;
					if (!proceed)
						return false;
				}
			}

			var classArr = classNames.split(" ");
			$
					.each(
							classArr,
							function() {
								var splited = this.split(":");
								// Common Validations
								if (splited.length == 1) {
									if (splited[0] == "v_decimal") {
										if ($.fn.isaValidator
												.validateIsPositiveDecimal(inputJQ
														.val())
												|| $.fn.isaValidator
														.validateIsPositiveInt(inputJQ
																.val())) {
											return true;
										}
										doFocusOnErrorField(inputJQ);
										errorMessages[errorCount] = displayErrorMsg(
												elementID, "v_decimal");
										result = false;
										if (!proceed)
											return false;
									}
									if (splited[0] == "v_percentage") {
										if ($.fn.isaValidator
												.validateIsPositiveDecimal(inputJQ
														.val())
												|| $.fn.isaValidator
														.validateIsPositiveInt(inputJQ
																.val())) {
											if (currencyValidate(inputJQ.val(),
													3, 2)) {
												if (parseFloat(inputJQ.val()) >= 0
														&& parseFloat(inputJQ
																.val()) <= 100) {
													return true;
												}
											}
										}
										doFocusOnErrorField(inputJQ);
										errorMessages[errorCount] = displayErrorMsg(
												elementID, "v_percentage");
										result = false;
										if (!proceed)
											return false;
									}
									if (splited[0] == "v_numericOnly") {
										if (isNaN(inputJQ.val())) {
											errorMessages[errorCount] = displayErrorMsg(
													elementID, "v_numericOnly");
											doFocusOnErrorField(inputJQ);
											errorCount++;
											result = false;
											if (!proceed)
												return false;
										}
									}
									if (splited[0] == "v_stringOnly") {
										if (!inputJQ.val().match(
												"^[a-zA-Z\(\)]+$")) {
											errorMessages[errorCount] = displayErrorMsg(
													elementID, "v_stringOnly");
											doFocusOnErrorField(inputJQ);
											errorCount++;
											result = false;
											if (!proceed)
												return false;
										}
									}
									if (splited[0] == "v_StringUpperCaseOnly") {
										if (!inputJQ.val().match("^[A-Z]+$")) {
											errorMessages[errorCount] = displayErrorMsg(
													elementID,
													"v_StringUpperCaseOnly");
											doFocusOnErrorField(inputJQ);
											errorCount++;
											result = false;
											if (!proceed)
												return false;
										}
									}
									if (splited[0] == "v_username") {
										if (!$.fn.isaValidator
												.checkUsername(inputJQ.val())) {
											errorMessages[errorCount] = displayErrorMsg(
													elementID, "v_username");
											doFocusOnErrorField(inputJQ);
											errorCount++;
											result = false;
											if (!proceed)
												return false;
										}
									}
									if (splited[0] == "v_stringOnlyForName") {
										if (!inputJQ
												.val()
												.match(
														"^[a-zA-Z\u0196\u0228\u0214\u0246\u0220\u0252\u0223]+$")) {
											errorMessages[errorCount] = displayErrorMsg(
													elementID,
													"v_stringOnlyForName");
											doFocusOnErrorField(inputJQ);
											errorCount++;
											result = false;
											if (!proceed)
												return false;
										}
									}
									if (splited[0] == "v_noDecimals") {
										var inputValue = inputJQ.val().split(
												".");
										if (inputValue.length > 1) {
											errorMessages[errorCount] = displayErrorMsg(
													elementID, "v_noDecimals");
											doFocusOnErrorField(inputJQ);
											errorCount++;
											result = false;
											if (!proceed)
												return false;
										}
									}
									if (splited[0] == "v_URL") {
										var inputValue = inputJQ.val();
										if (!$.fn.isaValidator
												.validateURL(inputValue)) {
											errorMessages[errorCount] = displayErrorMsg(
													elementID, "v_URL");
											doFocusOnErrorField(inputJQ);
											errorCount++;
											result = false;
											if (!proceed)
												return false;
										}
									}
									if (splited[0] == "v_URI") {
										var inputValue = inputJQ.val();
										if (!$.fn.isaValidator
												.validateURI(inputValue)) {
											errorMessages[errorCount] = displayErrorMsg(
													elementID, "v_URI");
											doFocusOnErrorField(inputJQ);
											errorCount++;
											result = false;
											if (!proceed)
												return false;
										}
									}
									if (splited[0] == "v_Email") {
										var inputValue = inputJQ.val();
										if (!$.fn.isaValidator
												.checkEmail(inputValue)) {
											errorMessages[errorCount] = displayErrorMsg(
													elementID, "v_Email");
											doFocusOnErrorField(inputJQ);
											errorCount++;
											result = false;
											if (!proceed)
												return false;
										}
									}
									if (splited[0] == "v_Password") {
										var inputValue = inputJQ.val();
										if ((!$.fn.isaValidator
												.checkPassword(inputValue))
												|| (!$.fn.isaValidator
														.checkAlphaNumeric(inputValue))) {
											errorMessages[errorCount] = displayErrorMsg(
													elementID, "v_Password");
											doFocusOnErrorField(inputJQ);
											errorCount++;
											result = false;
											if (!proceed)
												return false;
										}
									}
									// date format validation for dd/mm/yyyy
									if (splited[0] == "v_ddMMYYYY") {
										var parts = inputJQ.val().split("/");
										if (parts.length != 3) {
											errorMessages[errorCount] = displayErrorMsg(
													elementID, "v_ddMMYYYY");
											doFocusOnErrorField(inputJQ);
											errorCount++;
											result = false;
											if (!proceed)
												return false;
										}
										// fix later for different months
										// //TODO: write reg exp
										// for validating dates in month
										if (parts[0].length != 2
												|| Number(parts[0]) > 31
												|| parts[1].length != 2
												|| Number(parts[1]) > 12
												|| parts[2].length != 4) {
											errorMessages[errorCount] = displayErrorMsg(
													elementID, "v_ddMMYYYY");
											doFocusOnErrorField(inputJQ);
											errorCount++;
											result = false;
											if (!proceed)
												return false;
										}
									}

									// date format validation for mm/yyyy
									if (splited[0] == "v_MMYYYY") {
										var parts = inputJQ.val().split("/");
										if (parts.length != 2) {
											errorMessages[errorCount] = displayErrorMsg(
													elementID, "v_MMYYYY");
											doFocusOnErrorField(inputJQ);
											errorCount++;
											result = false;
											if (!proceed)
												return false;
										}
										// fix later for different months
										// //TODO: write reg exp
										// for validating dates in month
										if (parts[0].length != 2
												|| Number(parts[0]) > 12
												|| parts[1].length != 4) {
											errorMessages[errorCount] = displayErrorMsg(
													elementID, "v_MMYYYY");
											doFocusOnErrorField(inputJQ);
											errorCount++;
											result = false;
											if (!proceed)
												return false;
										}
									}

									// Validations for the date format for
									// dd/mm/yyyy AND
									// prevent past date less than current date.
									if (splited[0] == "v_ddMMYYYYPreventPast") {
										var parts = inputJQ.val().split("/");
										if (parts.length != 3) {
											errorMessages[errorCount] = displayErrorMsg(
													elementID,
													"v_ddMMYYYYPreventPast");
											doFocusOnErrorField(inputJQ);
											errorCount++;
											result = false;
											if (!proceed)
												return false;
										}
										// fix later for different months
										// //TODO: write reg exp
										// for validating dates in month
										if (parts[0].length != 2
												|| Number(parts[0]) > 31
												|| parts[1].length != 2
												|| Number(parts[1]) > 12
												|| parts[2].length != 4) {
											errorMessages[errorCount] = displayErrorMsg(
													elementID,
													"v_ddMMYYYYPreventPast");
											doFocusOnErrorField(inputJQ);
											errorCount++;
											result = false;
											if (!proceed)
												return false;
										}
										var dd = new Date();
										var today = dd.getFullYear() + "/"
												+ (dd.getMonth() + 1) + "/"
												+ dd.getDate();
										var enterdDate = Number(parts[2]) + "/"
												+ Number(parts[1]) + "/"
												+ Number(parts[0]);

										if ((new Date(enterdDate)) < (new Date(
												today))) {
											errorMessages[errorCount] = displayErrorMsg(
													elementID,
													"v_ddMMYYYYPreventPast");
											doFocusOnErrorField(inputJQ);
											errorCount++;
											result = false;
											if (!proceed)
												return false;
										}

									}

									// date format validation for dd/MM/yyyy
									// HH:mm
									if (splited[0] == "v_ddMMYYYYHHmm") {
										var dtArr = inputJQ.val().split(" ");
										if (dtArr.length != 2) {
											errorMessages[errorCount] = displayErrorMsg(
													elementID, "v_ddMMYYYYHHmm");
											errorMessages[errorCount] = isaParseValidationMessage(
													commonErrors['v_ddMMYYYYHHmm'],
													screenActual);
											errorCount++;
											result = false;
											if (!proceed)
												return false;
										}

										if (!$.fn.isaValidator
												.validateDDMMYYYY(dtArr[0])) {
											errorMessages[errorCount] = displayErrorMsg(
													elementID, "v_ddMMYYYYHHmm");
											doFocusOnErrorField(inputJQ);
											errorCount++;
											result = false;
											if (!proceed)
												return false;
										}

										if (!$.fn.isaValidator
												.validateHHmm(dtArr[1])) {
											errorMessages[errorCount] = displayErrorMsg(
													elementID, "v_ddMMYYYYHHmm");
											doFocusOnErrorField(inputJQ);
											errorCount++;
											result = false;
											if (!proceed)
												return false;
										}

									}

									// date format validation for dd/mm/yyyy
									if (splited[0] == "v_HHmm") {
										var parts = inputJQ.val().split(":");
										if (parts.length != 2) {
											errorMessages[errorCount] = displayErrorMsg(
													elementID, "v_HHmm");
											doFocusOnErrorField(inputJQ);
											errorCount++;
											result = false;
											if (!proceed)
												return false;
										}
										if (parts[0] == null
												|| parts[0].length == 0
												|| parts[1] == null
												|| parts[1].length == 0) {
											errorMessages[errorCount] = displayErrorMsg(
													elementID, "v_HHmm");
											doFocusOnErrorField(inputJQ);
											errorCount++;
											result = false;
											if (!proceed)
												return false;
										}
										if (parts[0] > 23) {
											errorMessages[errorCount] = displayErrorMsg(
													elementID, "v_maxVal");
											doFocusOnErrorField(inputJQ);
											errorCount++;
											result = false;
											if (!proceed)
												return false;
										}
										if (parts[1] > 59) {
											errorMessages[errorCount] = displayErrorMsg(
													elementID, "v_maxVal");
											doFocusOnErrorField(inputJQ);
											errorCount++;
											result = false;
											if (!proceed)
												return false;
										}
									}
								}
								// Number Related Validations
								if (splited.length > 1) {
									var inputValue = inputJQ.val();
									try {
										var actualNumb_1 = Number(splited[1]);
										var actualNumb_2 = Number(splited[2]);
									} catch (e) {
										// ignoring string --> number type
										// casting errors
									}
									if (splited[0] == "v_actualLength") {
										if (inputValue.length != actualNumb_1) {
											errorMessages[errorCount] = displayErrorMsg(
													elementID, "v_actualLength");
											doFocusOnErrorField(inputJQ);
											errorCount++;
											result = false;
											if (!proceed)
												return false;
										}
									}
									if (splited[0] == "v_range") {// range
										// validation
										if (inputValue < actualNumb_1
												|| inputValue > actualNumb_2) {
											errorMessages[errorCount] = displayErrorMsg(
													elementID, "v_range");
											doFocusOnErrorField(inputJQ);
											errorCount++;
											result = false;
											if (!proceed)
												return false;
										}
									}
									if (splited[0] == "v_maxVal") {// Maximum
										// range
										// validation
										if (inputValue > actualNumb_1) {
											errorMessages[errorCount] = displayErrorMsg(
													elementID, "v_maxVal");
											doFocusOnErrorField(inputJQ);
											errorCount++;
											result = false;
											if (!proceed)
												return false;
										}
									}
									if (splited[0] == "v_maxDecimals") {// Max
										// Number
										// of
										// Decimal
										// Points (0---n)
										var decimalsArr = inputValue.split(".");
										if (decimalsArr != null
												&& decimalsArr.length == 2
												&& decimalsArr[1].length > actualNumb_1) {
											errorMessages[errorCount] = displayErrorMsg(
													elementID, "v_maxDecimals");
											doFocusOnErrorField(inputJQ);
											errorCount++;
											result = false;
											if (!proceed)
												return false;
										}
									}
									if (splited[0] == "v_NumberAndDecimalRange") {
										// Number of whole numbers and number of
										// decimal points
										var decimalsArr = inputValue.split(".");
										if (decimalsArr != null) {
											if (decimalsArr.length > 0
													&& decimalsArr[0].length > actualNumb_1) {
												errorMessages[errorCount] = displayErrorMsg(
														elementID,
														"v_NumberAndDecimalRange");
												doFocusOnErrorField(inputJQ);
												errorCount++;
												result = false;
												if (!proceed)
													return false;
											}
											if (decimalsArr.length > 1
													&& decimalsArr[1].length > actualNumb_2) {
												errorMessages[errorCount] = displayErrorMsg(
														elementID,
														"v_NumberAndDecimalRange");
												doFocusOnErrorField(inputJQ);
												errorCount++;
												result = false;
												if (!proceed)
													return false;
											}
										}
									}
								}
							})
		}

		return result;
	};

	function validateTime() {

	}

	function doFocusOnErrorField(inputJQ) {
		if (!inputJQ.attr('disabled') && inputJQ.attr('type') != 'hidden') {
			try {
				inputJQ.focus();
			} catch (e) {
			}// do nothing if error is found
		}
	}
	function currencyValidate(strValue, nValue, nDecimal) {
		var strNValue = "*"
		var strDValue = "*";
		var strPattern = "";

		if (nValue != "") {
			strNValue = "{0," + nValue + "}";
		}

		if (nDecimal != "") {
			strDValue = "{0," + nDecimal + "}";
		}
		strPattern = "(^-?[0-9]" + strNValue + "\\.[0-9]" + strDValue
				+ "$)|(^-?[0-9]" + strNValue + "$)|(^-?\\.[0-9]" + strDValue
				+ "$)";
		return validateValue(strValue, strPattern);
	}
	function validateValue(strValue, strMatchPattern) {
		var objRegExp = new RegExp(strMatchPattern);

		// check if string matches pattern
		return objRegExp.test(strValue);
	}
	function isaParseValidationMessage(strMessage, screenActual) {
		strMessage = strMessage.replace("{" + 0 + "}", screenActual);

		if (arguments.length > 2) {
			for ( var i = 0; i < arguments.length - 1; i++) {
				strMessage = strMessage.replace("{" + Number(i + 1) + "}",
						arguments[i + 2]);
			}
		}
		return strMessage;
	}
	;

	function displayErrorMsg(fieldId, className) {
		// isaValidateDiv.proceed=false;
		var errorDivId = "#" + className + "_" + fieldId;
		$(errorDivId).show();
		return $(errorDivId).val();
		;
	}

	function hideErrorMsg() {
		$(".errormsg").hide();
	}

	function initializeStringTrim() {
		if (!String.prototype.trim) {
			String.prototype.trim = function() {
				return this.replace(/^\s+|\s+$/g, '');
			}
		}
	}

	function parseDisplayFieldName(params) {

		var elementID = params.elementID;
		var classNames = params.classNames;
		var elementName = null;

		var classArr = classNames.split(" ");
		$.each(classArr, function() {
			var splited = this.split(":");
			if (splited[0] == "v_label") {
				elementName = splited[1];
				return false;
			}
		});

		if (elementName) {
			return $("#" + elementName).text();
		}

		return elementID;
	}
	;

	$.fn.isaValidator = {

		validateIsPositiveInt : function(n) {
			return RegExp("^[+]?[0-9]+$").test(n);
		},
		validateIsPositiveDecimal : function(n) {
			return (RegExp("^[+]?[0-9]+[.][0-9]+$").test(n));
		},
		validateDDMMYYYY : function(strDate) {
			var splitedDate = strDate.split("/");
			if (splitedDate.length != 3) {
				return false;
			}
			if (splitedDate[0].length > 2) {
				return false;
			}
			if (splitedDate[1].length > 2) {
				return false;
			}
			if (splitedDate[2].length > 4) {
				return false;
			}
			return true;
		},
		validateHHmm : function(strTime) {
			var splitedTime = strTime.split(":");
			if (splitedTime.length != 2) {
				return false;
			}
			if (splitedTime[0].length > 2) {
				return false;
			}
			if (splitedTime[1].length > 2) {
				return false;
			}
			return true;
		},
		validateURL : function(strURL) {
			return strURL
					.match(/^(ht|f)tps?:\/\/[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/);
		},
		validateURI : function(strURI) {
			// var regexUri =
			// /[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(([0-9]{1,5})?\/.*)?$/;
			// return regexUri.test(strURI);
			return true;
		},
		checkEmail : function checkEmail(s) {
			return RegExp("^[a-zA-Z0-9-_.]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,7}$")
					.test(s);
		}

		,
		checkInvalidChar : function(strValue) {
			var strChkEmpty = this.findChar(strValue)
			if (strChkEmpty != "0") {
				return false;
			} else {
				return true;
			}
		},
		findChar : function(StringIn) {
			if (StringIn == null || StringIn.length == 0) {
				return "0";
			}
			/*******************************************************************
			 * // ------------- Check the standards characters
			 * 
			 * @Author : Rilwan A. Latiff
			 * @Version : 1.0
			 * @Last Modified : 1st June 2005 \b Backspace \f Form feed \n New
			 *       line \r Carriage return \t tab \" quotation mark \' MS
			 *       Office single quote 6 \' Ms Office singel Quote 9 \\ Back
			 *       Slash
			 ******************************************************************/
			// var CharInArray = new Array("'","<",">","^",'"',"~","-");
			var CharInArray = new Array("<", ">", "^", "~", '+', '=', '#', '%',
					'&', '$', '*', '!', '{', '}', '[', ']', ';', '?', '|');
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
		checkAlphaNumeric : function isAlphaNumericWhiteSpace(s) {
			return RegExp("^[a-zA-Z0-9-/ \w\s]+$").test(s);
		},
		checkPassword : function isValidPassword(s) {
			var strChar = "";
			var numCount = 0;
			if (s.length < 6 || s.length > 20) {
				return false;
			}
			for ( var i = 0; i < s.length; i++) {
				strChar = s.substr(i, 1);
				if (RegExp("^[+]?[0-9]+$").test(strChar)) {
					numCount++;
				}
			}
			if (numCount < 1) {
				return false;
			}
			return true;

		},
		checkUsername : function isValidUsername(s) {
			if (s.length < 6 || s.length > 20) {
				return false;
			}
			if (RegExp("\\s").test(s)) {
				return false;
			}
			return true;
		}
	};

})(jQuery);

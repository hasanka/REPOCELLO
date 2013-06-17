/**********************
 * Dynamically Creates form attributes with the input values
 * 
 * Used to create a validation form for a unknown number of elements.
 * 
 * Parameters
 * 
 * originalElement - ID of the original Element the data should be copied after. Typically an element inside a form
 * data - In an Array
 * names - Names of the form input types (Should be different Names)
 * validations - Validation classes . (Can be any other type of class as well)
 * 
 * 
 * @author Navod Ediriweera
 * @since 25 Nov 2009
 * @version 1.0
 **********************/

(function($){
	$.fn.isaDynamicForm = {
		
		defualts: {
			hiddenElements: true,
			attrTypeClass: 'isa_dynamicForm_1'			
		},
		//creates a  set out of a single grid row	
		create: function (param){
			var originalElementID = param.originalElement;
			var data = param.data;
			var names = param.names;
			var id = param.id;
			var validations = param.validations;
			var temp = $('#'+originalElementID);
			 
			for(var i=0;i<data.length;i++){								
				var tempOriginal =$('#'+originalElementID).clone();				
				tempOriginal
					.val(data[i])
					.attr('id',(id[i]+"-"+i+"-"))					
					.attr('name',names[i]);
				if(this.defualts.hiddenElements){
					tempOriginal.attr('type','hidden');//FIXEME failes in IE
				}			
				if(validations!= null && validations[i] != null){
					tempOriginal.attr('class',validations[i])
				}
				tempOriginal.addClass(this.defualts.attrTypeClass);
				temp.after(tempOriginal);
				temp = tempOriginal;
			}
		},
		destroy: function (){
			$('.'+this.defualts.attrTypeClass).remove();			
		}
	};	
	/**
	 * Clones a predefined DIV 
	 */
	$.fn.isaDynamicFormWithHTML = {
		
		defaults : {
			divClass: 'multi-div-template',			
			titleTxt: 'Can Dry Sell',
			populateHidden: true,//populates hdn fields with the data 
			dynamicTitleClassName: 'dynamic_title',
			hiddenPopulate: 'd_populate'				
		},	
		/***
		 * Parameters
		 * 
		 * masterRows - The number of repeats of content inside the div with title data. data is used to populate "font" elements inside a specific row
		 * values	- Data values to populate the input boxes
		 * topDiv - The container div id to hold the cloned input elements
		 * singleRowIterations - The number of times the entire div should be iterated (As opposed to masterRows which iterates only the content after the title inside the div)
		 * templateDiv - The actual id of the template being copies
		 * refresh - Re-draw the input boxes: true - will refresh and remove data. False will do nothing
		 * appendOrPrepend - Append or prepend the value to an existing font value.
		 ***/		
		create: function (param){
			var masterRows = param.masterRows;
			var dataValues = param.values;	
			var topDiv = param.topDiv;
			var singleRowIterations = param.singleRowIterations;
			var templateDiv = param.templateDiv;
			var refresh = param.refresh;
			var currItem = $('#'+param.topDiv);
			var isShowTitle = param.isShowTitle;
			var appendOrPrepend = param.appendOrPrepend;
			var part = param.part;
			var firstLoad = param.isFirstLoad;
			
			if(dataValues == null){
				dataValues = new Array();
			}			
			if (part != 'append') {			
				if(refresh){
					this.removePrevious();
				}else {
					return false;				
				}
			} else {
				if(firstLoad) {
					//do nothing
				}
				else {
					return false;	
				}	
			}
			var iterationCount = 0;
			for(var k=0;k<singleRowIterations;k++){
				var copyStartDiv = null;
				for(var i=0;i<masterRows.length;i++){
					var copiedDiv = $('#'+templateDiv).clone();
					copiedDiv.attr('id',(templateDiv+'-'+i));
					copiedDiv.attr('class',this.defaults.divClass);					
				
					$(copiedDiv).find('input').each(function(index,item){	
						$.fn.isaDynamicFormWithHTML.createNewAttributes(
								iterationCount,dataValues,masterRows,i, $(this));
					});
					$(copiedDiv).find('select').each(function(index,item){	
						$.fn.isaDynamicFormWithHTML.createNewAttributes(
								iterationCount,dataValues,masterRows,i, $(this));
					});						
					$(copiedDiv).find('font').each(function(index,item){					
						if (appendOrPrepend == 'prepend') {
							$(this).prepend(masterRows[i]);
						} else {
							$(this).append(masterRows[i]);
						}											
					});	
					$(copiedDiv).find('div').each(function(index,item){
						$(this).attr('id', ($(this).attr('id')+'-'+iterationCount+'-'));
						$(this).append(dataValues[iterationCount][$(this).attr('id')]);							
					});						
					if(i==0){
						copyStartDiv = copiedDiv;
					}
					currItem.append(copiedDiv);
					currItem = copiedDiv;
					copiedDiv.show();	
					iterationCount++;
				}
//				if(isShowTitle){
//					var title = $('#'+topDiv).find('.'+this.defaults.dynamicTitleClassName).clone();
//					title.append(masterRows[k]+ ' ' +this.defaults.titleTxt);
//					title.addClass('dynamic_title_'+k);
//					title.removeClass(this.defaults.dynamicTitleClassName);
//					title.show();
//					copyStartDiv.prepend(title);
//				}
			}			
		},
		createSkipOwn: function (param){
			var masterRows = param.masterRows;
			var dataValues = param.values;	
			var topDiv = param.topDiv;
			var singleRowIterations = param.singleRowIterations;
			var templateDiv = param.templateDiv;
			var refresh = param.refresh;
			var currItem = $('#'+param.topDiv);
			var isShowTitle = param.isShowTitle;
			var appendOrPrepend = param.appendOrPrepend;
			
			if(dataValues == null){
				dataValues = new Array();
			}		
			if(refresh){
				this.removePrevious();
			}else {
				return false;				
			}

			var iterationCount = 0;
			for(var k=0;k<singleRowIterations;k++){
				var copyStartDiv = null;
				var j = 0;
				for(var i=0;i<masterRows.length;i++){
					if (masterRows[k] != masterRows[i]) {
						var copiedDiv = $('#'+templateDiv).clone();
						copiedDiv.attr('id',(templateDiv+'-'+j));
						copiedDiv.attr('class',this.defaults.divClass);					
					
						$(copiedDiv).find('input').each(function(index,item){	
							$.fn.isaDynamicFormWithHTML.createNewAttributes(
									iterationCount,dataValues,masterRows,i, $(this));
						});
						$(copiedDiv).find('select').each(function(index,item){	
							$.fn.isaDynamicFormWithHTML.createNewAttributes(
									iterationCount,dataValues,masterRows,i, $(this));
						});						
						$(copiedDiv).find('font').each(function(index,item){					
							if (appendOrPrepend == 'prepend') {
								$(this).prepend(masterRows[i]);
							} else {
								$(this).append(masterRows[i]);
							}											
						});	
						$(copiedDiv).find('div').each(function(index,item){
							$(this).attr('id', ($(this).attr('id')+'-'+iterationCount+'-'));
							$(this).append(dataValues[iterationCount][$(this).attr('id')]);							
						});						
						if(j==0){
							copyStartDiv = copiedDiv;
						}
						currItem.append(copiedDiv);
						currItem = copiedDiv;
						copiedDiv.show();	
						iterationCount++;
						j++;
					}
				}
				if(isShowTitle){
					var title = $('#'+topDiv).find('.'+this.defaults.dynamicTitleClassName).clone();
					title.append(masterRows[k]+ ' ' +this.defaults.titleTxt);
					title.addClass('dynamic_title_'+k);
					title.removeClass(this.defaults.dynamicTitleClassName);
					title.show();
					if (iterationCount != 0) {
						copyStartDiv.prepend(title);
					}
				}
			}			
		},
		createNewAttributes : function (iterationCount,dataValues,masterRows,masterPos, obj){
			if(dataValues[iterationCount] == null){
				dataValues[iterationCount] = new Array();
			}						
			obj.attr('id', (obj.attr('id')+'-'+iterationCount+'-'));
			obj.attr('name', ($.fn.isaDynamicFormWithHTML.convertNameToJSON(obj.attr('name'),iterationCount)));						
			if(obj.attr('type') != 'button'){
				$.fn.isaDynamicFormWithHTML.populateData(obj,masterRows[masterPos],
						dataValues[iterationCount][obj.attr('name')]);	
			}
		},		
		populateData : function (attrObj, indexData, actualData){
			if(actualData != null){
				if((attrObj.attr('type') == 'checkbox')){
					if(actualData == 'true'){
						attrObj.attr('checked',true);
					}else {
						attrObj.attr('checked',false);
					}
				}else {
					attrObj.val(actualData);	
				}										
			}
			//populate hdn fields
			if($.fn.isaDynamicFormWithHTML.defaults.populateHidden && (attrObj.attr('type') == 'hidden') &&
					(attrObj.hasClass($.fn.isaDynamicFormWithHTML.defaults.hiddenPopulate))){
				attrObj.val(indexData);		
			}
		},		
				
		convertNameToJSON: function (name , index){
			var pos = name.lastIndexOf('.');
			var posElem = name.substring(pos,name.length-1);//can still be duplicate.. FIXME
			return name.replace(posElem,"["+index+"]"+posElem);
		},		
		removePrevious: function (){
			$('.'+this.defaults.divClass).remove();
		}
	};
	
})(jQuery);
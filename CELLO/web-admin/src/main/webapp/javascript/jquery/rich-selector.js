/***********************************************
 * Generating Rich Selector selection DOM component. 
 * @Author Semika Siriwardana
 * 
 * ChangeLog
 * 16-Mar-2010 @author Navod Ediriweera - v1.1
 * 		Enabled creating the component with null elements on both sides. (Added null checks before items are populated)
 * 		Applied Jquery UI Theme Framework to Buttons 
 *		Removed dependancy on button classes
 *		Added a new dependancy on css "fntbold" to left and right container titles
 *		Changed the buttons from <button> tag to <input type = 'button'> (Because button seems to be calling an "action" when clicked)
 * 
 ***********************************************/

var RichSelector = function(objConfig) {
	this.init(objConfig);
};

RichSelector.prototype = {
		
		selectedOptions :null,
		allOptions      :null,
		
		/**
		 * This objects keeps all items and will not change forever untill object destroyed.
		 */
		itemsAll: null,
		/**
		 * This object keeps items that are in all SELECT box. Items in
		 * this object may vary depends on user action.
		 */
		itemsOnAll			: null,
		
		/**
		 * This object keeps items that are currently selected from all SELECT box.
		 * These items will be added into 'itemsOnSelected', if user make select operation and removed
		 * from 'itemsOnAll'.
		 * If user makes deselect operation, 'itemsOnFly' will be added into 'itemsOnAll' and removed
		 * from 'itemsOnSelected'.
		 */
		itemsOnFly			  : null,
		/**
		 * This object keeps items that are currently selected.
		 */
		itemsOnSelected		  : null,
		
		/**
		 * This variable keeps category names if items are needed to be grouped.
		 */
		categoryNames         : null,
		groupedSelectedOptions: null,
		groupedAllOptions     : null,
		container             : null,//ID of the container element from the DOM
		titleAllItems         : null,//Title of the all items
		titleSelectedItems    : null,// Title of the selected items
		boxWidth              :null,
		boxHeight             :null,
		
		/**
		 * config param which tells grouping is required or not
		 */
		group: null, 
		
		/**
		 * javascript object field that need to be set as a 
		 * option's value.
		 */
		optionValue : null,
		/**
		 * javascript object field that need to be set as a option's display text
		 */
		optionText  : null,
		
		use: false, // This is a flag to identify wheather the control has used
					// or not.
		
		setUse: function() {
			this.use = true;
		},
		
		/**
		 * This method is exposed to outside to know whether control has used or not.
		 */
		isUsed: function() {
			return this.use;
		},
		
		set: function(state){
			if($("#" + this.container + "_allItemContainer")){
				$("#" + this.container + "_allItemContainer").get(0).disabled        = state;
			}		
			if($("#" + this.container + "_selectedItemContainer")){
				$("#" + this.container + "_selectedItemContainer").get(0).disabled   = state;
			}			
			$("#" + this.container + "_btnSelect").get(0).disabled            = state;
			$("#" + this.container + "_btnSelectAll").get(0).disabled         = state;
			$("#" + this.container + "_btnDeselect").get(0).disabled          = state;
			$("#" + this.container + "_btnDeselectAll").get(0).disabled       = state;			
		},
		
		/**
		 * This method is exposed to outside to disable the controller
		 */
		disable: function(){
			this.set(true);			
		},		
		
		/**
		 * This method is exposed to outside to enable the controller.
		 */
		enable: function(){
			this.set(false);
		},
		
		clean: function(){
			$("#" + this.container + "_selectedItemContainer").empty();
			$("#" + this.container + "_allItemContainer").empty();
		},
		
		/**
		 * This method is exposed to outside to get the selected privileges
		 * for a particular role. This will return a query string parameter
		 * as a name value pair. From the server side, there should be a collection
		 * object to catch it up.
		 */
		getSelectedItems: function(paramKey) {
			var sb = [];
			$("#" + this.container + "_selectedItemContainer option[type^='ITEM']").each(function(){
				var val = $(this).attr("value");
				sb[sb.length] = paramKey + "=" + val + "&";
			});
			this.clean();
			this.generateDOMAllItems(this.groupedAllOptions);
			return sb.join("");
		},
		
		/**
		 * This method is exposed to outside and will return selected items as
		 * a json string
		 */
		getSelectedItemsAsJsonString: function(paramKey) {
			
			var selectedItems = $("#" + this.container + "_selectedItemContainer option[type^='ITEM']");
			if (selectedItems.length == 0) {
				return "";
			} else {
				var jsonStr = "{\"" + paramKey + "\" :[" ;
				$("#" + this.container + "_selectedItemContainer option[type^='ITEM']").each(function(){
					var val = $(this).attr("value");
					jsonStr += "'" + val + "',";
				});	
				jsonStr = jsonStr.substring(0, jsonStr.lastIndexOf(","))
				jsonStr += "]}";
				
				this.clean();
				this.generateDOMAllItems(this.groupedAllOptions);	
				return jsonStr; 
			}
		},
		
		/**
		 * This method is exposed to out side and will return selected items as an 
		 * array of items
		 */
		getSelectedItemsAsArray: function() {
			var returnArr = new Array();	
			var i=0;
			$("#" + this.container + "_selectedItemContainer option[type^='ITEM']").each(function(){
				var val = $(this).attr("value");	
				returnArr[i] = val;			
				i++;
			});				
			return returnArr;
		},
		
		addOnClickListener:function(id, fnHandler, context) {
			$("#" + id).bind("click", context, function(evt) {
				if(context != undefined) {
					fnHandler(context);
				} else {
					fnHandler();
				}
				return false;
			});
		},
	
		
		getOptionType: function(elOption) {
			var attrType = $(elOption).attr("type");
			var optionType = attrType.split("_")[0];
			return optionType;
		},

		/**
		 * This will return the actual name of the category that
		 * coming from the database. The type attribute of
		 * each <option> element contains the category name.
		 */
		getCategoryName: function(elOption) {
			var attrType = $(elOption).attr("type");
			var categoryName = attrType.split("_")[1];
			return categoryName;
		},
		
		removeArrayFrom: function(arraySource, arrayRemovingItems) {
			for(var i = 0; i < arrayRemovingItems.length; i++){
				var val1 = $(arrayRemovingItems[i]).attr("value");
				for(var j = 0; j < arraySource.length; j++){
					var val2 = $(arraySource[j]).attr("value");
					if(val1 == val2){
						arraySource.splice(j, 1);
						break;
					}
				}
			}
			return arraySource;
		},
		
		removeArrayFromObj: function(arraySource, arrayRemovingItems) {
			for(var i = 0; i < arrayRemovingItems.length; i++){
				var id1 = arrayRemovingItems[i].id;
				for(var j = 0; j < arraySource.length; j++){
					var id2 = arraySource[j].id;
					if(id1 == id2){
						arraySource.splice(j, 1);
						break;
					}
				}
			}
			return arraySource;
		},
		
		addArrayTo: function(arraySource, arrayAddingItems){
			for(var i = 0; i < arrayAddingItems.length; i++){
				var val1 = $(arrayAddingItems[i]).attr("value");
				var alreadyExsist = false;
				for(var j = 0; j < arraySource.length; j++){
					var val2 = $(arraySource[j]).attr("value");
					if(val1 == val2){
						alreadyExsist = true;
						break;
					}
				}
				if(!alreadyExsist){
					arraySource.push($(arrayAddingItems[i])); 
				}
			}
			return arraySource;
		},
		
		clearItemsOnSelected: function() {
			for(var i = 0; i < this.categoryNames.length; i++) {
				var categoryName = this.categoryNames[i];
				this.itemsOnSelected[categoryName] = new Array();
				this.itemsOnSelected[categoryName + "_OPTGROUP"] = null;
			}
		},
		
		clearItemsOnFly: function(){
			for(var i = 0; i < this.categoryNames.length; i++) {
				var categoryName = this.categoryNames[i];
				this.itemsOnFly[categoryName] = new Array();
				this.itemsOnFly[categoryName + "_OPTGROUP"] = null;
			}
		},
		
		clearItemsOnAll: function(){
			for(var i = 0; i < this.categoryNames.length; i++) {
				var categoryName = this.categoryNames[i];
				this.itemsOnAll[categoryName] = new Array();
				this.itemsOnAll[categoryName + "_OPTGROUP"] = null;
			}
		},
		
		updateDOM: function(sourceElId, dataObj) {
			
			$("#" + sourceElId).empty();
			
			for(var i = 0; i < this.categoryNames.length; i++){
				var categoryName = this.categoryNames[i];
				var optCategory  = dataObj[categoryName + "_OPTGROUP"];
				var privileges = dataObj[categoryName];
				
				if (optCategory != null && privileges.length > 0 && this.group){
					$(optCategory).clone().appendTo("#" + sourceElId);
				}
				
				for (var j = 0; j < privileges.length; j++){
					$(privileges[j]).clone().appendTo("#" + sourceElId);
				}
			}
		},
		
		copyItemsAll_To_ItemsOnAll: function(){
			for(var i = 0; i < this.categoryNames.length; i++) {
				var sourceItems = this.itemsAll[this.categoryNames[i]];
				this.itemsOnAll[this.categoryNames[i]] = sourceItems.concat(new Array());
				var elOptGroupSrc  = this.itemsAll[this.categoryNames[i] + "_OPTGROUP"];
				this.itemsOnAll[this.categoryNames[i] + "_OPTGROUP"] = $(elOptGroupSrc).clone(); 
			}
		},
		
		
		copyItemsAll_To_ItemsOnSelected: function(){
			for(var i = 0; i < this.categoryNames.length; i++) {
				var sourceItems = this.itemsAll[this.categoryNames[i]];
				this.itemsOnSelected[this.categoryNames[i]] = sourceItems.concat(new Array());
				var elOptGroupSrc  = this.itemsAll[this.categoryNames[i] + "_OPTGROUP"];
				this.itemsOnSelected[this.categoryNames[i] + "_OPTGROUP"] = $(elOptGroupSrc).clone(); 
			}
		},
		
		addTo_ItemsOnAll: function(){
			for(var i = 0; i < this.categoryNames.length; i++){
				var _itemsOnAll  = this.itemsOnAll[this.categoryNames[i]];
				var _itemsOnFly  = this.itemsOnFly[this.categoryNames[i]];
				var result 		 = this.addArrayTo(_itemsOnAll.concat(new Array()), 
												   _itemsOnFly.concat(new Array()));
				this.itemsOnAll[this.categoryNames[i]] = result;
				
				var groupOptionElementOnFly = this.itemsOnFly[this.categoryNames[i] + "_OPTGROUP"];
				var groupOptionElementOnAll = this.itemsOnAll[this.categoryNames[i] + "_OPTGROUP"];
				
				if(groupOptionElementOnAll == null && groupOptionElementOnFly != null){
					this.itemsOnAll[this.categoryNames[i] + "_OPTGROUP"] = $(groupOptionElementOnFly).clone();
				}
			}
		},
		
		removeFrom_ItemsOnSelected: function(){
			for(var i = 0; i < this.categoryNames.length; i++){
				var _itemsOnSelected = this.itemsOnSelected[this.categoryNames[i]];
				var _itemsOnFly      = this.itemsOnFly[this.categoryNames[i]];
				var result 			 = this.removeArrayFrom(_itemsOnSelected.concat(new Array()), 
															_itemsOnFly.concat(new Array())); 
				this.itemsOnSelected[this.categoryNames[i]] = result;
			}
		},
		
		/**
		 * This method will set the list of <option> elements that
		 * should be added into selected items SELECT box. Selected <option>
		 * elements from the all SELECT box are stored in 'itemsOnFly' object
		 * temporarily which is grouped by category name. 
		 */
		addTo_ItemsOnSelected: function() {
			for(var i = 0; i < this.categoryNames.length; i++) {
				var _itemsOnSelected   = this.itemsOnSelected[this.categoryNames[i]];
				var _itemsOnFly    	   = this.itemsOnFly[this.categoryNames[i]];
				var result 			   = this.addArrayTo(_itemsOnSelected.concat(new Array()), 
													     _itemsOnFly.concat(new Array()));
				this.itemsOnSelected[this.categoryNames[i]] = result;
				
				/* if selected items SELECT box is totally empty, grouped <option> Elements
				 * are not there at this moment.*/
				var groupOptionElementOnFly      = this.itemsOnFly[this.categoryNames[i] + "_OPTGROUP"];
				var groupOptionElementOnSelected = this.itemsOnSelected[this.categoryNames[i] + "_OPTGROUP"];
				
				if(groupOptionElementOnSelected == null && groupOptionElementOnFly != null){
					this.itemsOnSelected[this.categoryNames[i] + "_OPTGROUP"] = $(groupOptionElementOnFly).clone();
				}
				
			}
		},
		
		removeFrom_ItemsOnAll: function(){
			for(var i = 0; i < this.categoryNames.length; i++){
				var _itemsOnAll  = this.itemsOnAll[this.categoryNames[i]];
				var _itemsOnFly  = this.itemsOnFly[this.categoryNames[i]];
				var result 		 = this.removeArrayFrom(_itemsOnAll.concat(new Array()), 
														_itemsOnFly.concat(new Array()));
				this.itemsOnAll[this.categoryNames[i]] = result;
			}
		},
		
		updateItemBulk: function(action){
			if(action == "SELECT") {
				this.removeFrom_ItemsOnAll();
				this.addTo_ItemsOnSelected();
			} else {
				this.removeFrom_ItemsOnSelected();
				this.addTo_ItemsOnAll();
			}
			this.clearItemsOnFly();
		},
		
		setItemsOnFly_forOneItemOfGroup: function(elOpt, sourceElId) {
			var categoryName = this.getCategoryName(elOpt);
			var privileges   = this.itemsOnFly[categoryName];
			
			if (privileges.length == 0){
				var type = "CATEGORY_" + categoryName;
				var optCategory = $("#" + sourceElId + " option[type='" + type + "']").get(0);
				this.itemsOnFly[categoryName + "_OPTGROUP"] = $(optCategory);
				this.itemsOnFly[categoryName].push(elOpt);
			} else {
				var alreadyAdd = false;
				for(var i = 0; i < privileges.length; i++) {
					var val1 = $(elOpt).attr("value");
					var val2 = $(privileges[i]).attr("value");
					if (val1 == val2) {
						alreadyAdd = true;
					}
				}
				if (!alreadyAdd) {
					this.itemsOnFly[categoryName].push(elOpt);
				}
			}
		},
		
		setItemsOnFly_forAllItemsOfGroup: function(elOpt, sourceElId) {
			var categoryName  = this.getCategoryName(elOpt);
			var itemType = "ITEM_" +  categoryName; 
			var items = [];
			$("#" + sourceElId + " option[type='" + itemType + "']").each(function(){
				items.push($(this).get(0));
			});
			this.itemsOnFly[categoryName] = items;
			this.itemsOnFly[categoryName + "_OPTGROUP"] = elOpt;
		},
		
		setItemsOnFly: function(action) {
			var sourceElId;
			if(action == "SELECT") {
				sourceElId = this.container + "_allItemContainer";
			} else {
				sourceElId = this.container + "_selectedItemContainer";
			}
			var self = this;
			$("#" + sourceElId +" option:selected").each(function(){
				var optionType = self.getOptionType($(this)); 
				if (optionType == "CATEGORY") {
					self.setItemsOnFly_forAllItemsOfGroup($(this).get(0), sourceElId); 
				} else {
					self.setItemsOnFly_forOneItemOfGroup($(this).get(0), sourceElId); 
				}
			});
		},
		
		setItemsOnSelected: function() {
			var self = this;
			$("#" + self.container + "_selectedItemContainer option").each(function(){
				var categoryName = self.getCategoryName($(this)); 
				var optionType   = self.getOptionType($(this)); 
				if (optionType == "CATEGORY") {
					self.itemsOnSelected[categoryName + "_OPTGROUP"] = $(this).get(0);
				} else {
					self.itemsOnSelected[categoryName].push($(this).get(0)); 
				}
			});
		},
		
		setItemsOnAll: function() {
			var self = this;
			$("#" + self.container +"_allItemContainer option").each(function(){
				var categoryName = self.getCategoryName($(this)); 
				var optionType   = self.getOptionType($(this)); 
				if (optionType == "CATEGORY") {
					self.itemsOnAll[categoryName + "_OPTGROUP"] = $(this).get(0);
					//self.itemsAll[categoryName + "_OPTGROUP"]   = $(this).get(0);
				} else { 
					self.itemsOnAll[categoryName].push($(this).get(0));  
					//self.itemsAll[categoryName].push($(this).get(0));  
				}
			});
		},
		
		selectItem: function(evt) {
			var self = evt;
			self.setItemsOnFly("SELECT");
			self.updateItemBulk("SELECT");
			self.updateDOM(self.container + "_allItemContainer", self.itemsOnAll);
			self.updateDOM(self.container + "_selectedItemContainer", self.itemsOnSelected);
			self.setUse();
		},
		
		selectAllItem: function(evt) {
			var self = evt;
			self.copyItemsAll_To_ItemsOnSelected();
			self.clearItemsOnAll();
			self.clearItemsOnFly();
			self.updateDOM(self.container + "_allItemContainer", self.itemsOnAll);
			self.updateDOM(self.container + "_selectedItemContainer", self.itemsOnSelected);
			self.setUse();
		},
		
		deselectItem: function(evt){
			var self = evt;
			self.setItemsOnFly("DESELECT");
			self.updateItemBulk("DESELECT");
			self.updateDOM(self.container + "_allItemContainer", self.itemsOnAll);
			self.updateDOM(self.container + "_selectedItemContainer", self.itemsOnSelected);
			self.setUse();
		},
		
		deselectAllItem: function(evt) {
			var self = evt;
			self.copyItemsAll_To_ItemsOnAll();
			self.clearItemsOnSelected();
			self.clearItemsOnFly();
			self.updateDOM(self.container + "_allItemContainer", self.itemsOnAll);
			self.updateDOM(self.container + "_selectedItemContainer", self.itemsOnSelected);
			self.setUse();
		},
		
		getDOMHtml: function(groupedOptions){
			var sb = [];
			var categoryName;
			for (var i = 0; i < this.categoryNames.length; i++) {
				categoryName = this.categoryNames[i];
				
				var options = groupedOptions[this.categoryNames[i]];
				if(options != undefined && options.length > 0){
					var visibility = "";
					
					if (this.group) {
						visibility = "block";
					} else {
						visibility = "none";
					}
					
					sb[sb.length] = "<option style=\"font-weight:bold;display:" + visibility + ";\"";
					sb[sb.length] = "type=\"CATEGORY_" + categoryName + "\""; 
					sb[sb.length] = "<strong>"+ categoryName +"</strong></option>";
					for (var j = 0; j < options.length; j++ ) {
						var opt = options[j];
						sb[sb.length] = "<option type=\"ITEM_" + categoryName + "\"";
						sb[sb.length] = "value=" + eval("opt."  + this.optionValue) + ">";
						sb[sb.length] = "&nbsp;&nbsp;&nbsp;" + eval("opt." + this.optionText);
						sb[sb.length] = "</option>";
					}
				}
			}
			return sb.join("");
		},
		
		generateDOMAllItems:function(obj){
			var str = this.getDOMHtml(obj);
			if ($.trim(str).length != 0) {
				$(str).appendTo("#" + this.container + "_allItemContainer");
			}
		},
		
		updateDOMAllItems: function() {
			var obj = new Object();
			for(var i = 0; i < this.categoryNames.length; i++) {
				var arrAllOptions      = this.groupedAllOptions[this.categoryNames[i]];
				var arrSelectedOptions = this.groupedSelectedOptions[this.categoryNames[i]];
				var result = arrAllOptions;
				if (arrSelectedOptions != undefined && arrSelectedOptions.length > 0) {
					result = this.removeArrayFromObj(arrAllOptions.concat(new Array()), 
												     arrSelectedOptions.concat(new Array()));
				}
				obj[this.categoryNames[i]] = result;
			}
			this.generateDOMAllItems(obj);
		},
		
		generateDOMSelectedItems: function(){
			if(this.selectedOptions != null && this.selectedOptions.length != 0) {
				$(this.getDOMHtml(this.groupedSelectedOptions)).appendTo("#" + this.container +"_selectedItemContainer")
			}
		},
		
		groupSelectedOptions: function() {
			if(this.selectedOptions != null){
				if(this.group) {
					for(var i = 0; i < this.selectedOptions.length; i++) {
						if (this.groupedSelectedOptions[this.selectedOptions[i].category] == undefined){
							this.groupedSelectedOptions[this.selectedOptions[i].category] = [];
						} 
						this.groupedSelectedOptions[this.selectedOptions[i].category].push(this.selectedOptions[i]); 
					}
				} else {
					this.groupedSelectedOptions["DUMMY-GROUP"] = [];
					for(var i = 0; i < this.selectedOptions.length; i++) {
						this.groupedSelectedOptions["DUMMY-GROUP"].push(this.selectedOptions[i]); 
					}
				}
			}
		},
		
		initElementContainers: function(){
			for(var i = 0; i < this.categoryNames.length; i++){
				var categoryName = this.categoryNames[i]; 
				//this.itemsAll[categoryName]        = new Array();
				this.itemsOnAll[categoryName]      = new Array();
				this.itemsOnSelected[categoryName] = new Array();
				this.itemsOnFly[categoryName]      = new Array();
				
				//this.itemsAll[categoryName + "_OPTGROUP"]        = null;
				this.itemsOnAll[categoryName + "_OPTGROUP"]      = null;
				this.itemsOnSelected[categoryName + "_OPTGROUP"] = null;
				this.itemsOnFly[categoryName + "_OPTGROUP"]      = null;
			}
			//reset the groupedSelectedOptions object.
			this.groupedSelectedOptions = new Object();
		},
		/**
		 * This method is exposed to out side to set privileges for
		 * each role.
		 * @param  rolePrivileges
		 * 		
		 */
		setSelectedItems: function(selectedOptions) {
			this.clean();
			this.selectedOptions = selectedOptions;
			this.initElementContainers();
			this.groupSelectedOptions();
			this.generateDOMSelectedItems();
			//this.generateDOMAllItems();
			this.updateDOMAllItems();
			this.setItemsOnSelected();
			this.setItemsOnAll();
		},
		
		setItemsAll: function() {
			for(var i = 0; i < this.categoryNames.length; i++){
				var categoryName = this.categoryNames[i]; 
				this.itemsAll[categoryName]               = new Array();
				this.itemsAll[categoryName + "_OPTGROUP"] = null;
			}
			var self = this;
			$("#" + self.container +"_allItemContainer option").each(function(){
				var categoryName = self.getCategoryName($(this)); 
				var optionType   = self.getOptionType($(this)); 
				if (optionType == "CATEGORY") {
					self.itemsAll[categoryName + "_OPTGROUP"]   = $(this).get(0);
				} else { 
					self.itemsAll[categoryName].push($(this).get(0));  
				}
			});
			
		},
		
		groupAllOptions: function() {
			if(this.allOptions != null){
				if(this.group) {			
					for(var i = 0; i < this.allOptions.length; i++) {
						if (this.groupedAllOptions[this.allOptions[i].category] == undefined) {
							this.groupedAllOptions[this.allOptions[i].category]= [];
							if(jQuery.inArray(this.allOptions[i].category, this.categoryNames) == -1){
								this.categoryNames.push(this.allOptions[i].category);
							}
						}
						this.groupedAllOptions[this.allOptions[i].category].push(this.allOptions[i]); 
					}
				} else {
					this.categoryNames.push("DUMMY-GROUP");
					this.groupedAllOptions["DUMMY-GROUP"]= [];				
					for(var i = 0; i < this.allOptions.length; i++) {
						this.groupedAllOptions["DUMMY-GROUP"].push(this.allOptions[i]); 
					}
					
				}
			}
			this.categoryNames.sort();
		},
		
		/**
		 * set listeners for required DOM elements. 
		 */
		initListeners: function() {
			this.addOnClickListener(this.container + "_btnSelect", 	    this.selectItem, 	    this);
			this.addOnClickListener(this.container + "_btnSelectAll", 	this.selectAllItem, 	this);
			this.addOnClickListener(this.container + "_btnDeselect",    this.deselectItem,      this);
			this.addOnClickListener(this.container + "_btnDeselectAll", this.deselectAllItem, 	this);
		},
		
		initObjects: function(){
			this.itemsAll			    = new Object();
			this.itemsOnAll      	    = new Object();
			this.itemsOnFly      	    = new Object();
			this.itemsOnSelected 	    = new Object();
			this.groupedAllOptions      = new Object();
			this.groupedSelectedOptions = new Object();
			this.categoryNames          = [];
		},
		
		createContainerDOM: function() {
			var sb = [];		
			sb[sb.length] = "<table>";
			sb[sb.length] =  "<tr>";
			sb[sb.length] =  "<td><font class=\"fntBold\">" + this.titleAllItems + "</font></td>";
			sb[sb.length] =  "<td></td>";
			sb[sb.length] =  "<td><font class=\"fntBold\">" + this.titleSelectedItems + "</font></td>";
			sb[sb.length] =  "</tr>";
			sb[sb.length] =  "<tr>";
			sb[sb.length] =  "<td width=\"25%\" valign=\"top\" rowspan=\"5\">"; 
			sb[sb.length] =  "<select id=\"" + this.container + "_allItemContainer\" multiple=\"multiple\"";
			sb[sb.length] =  "style=\"width: " + this.boxWidth + "px; height: "+ this.boxHeight +"px; visibility: visible;\">";
			sb[sb.length] =  "</select>";
			sb[sb.length] =  "</td>";
			sb[sb.length] =  "<td width=\"5%\" rowspan=\"5\">";
			sb[sb.length] =  "<input type = \"button\" id=\"" + this.container + "_btnSelect\"   value=\"&gt;\" style=\"width:24px;\" class=\"clsButtonTiny\"></input><br/>";
			sb[sb.length] =  "<input type = \"button\" id=\"" + this.container + "_btnSelectAll\"  value=\"&gt;&gt;\"   style=\"width:24px;\" class=\"clsButtonTiny\"></input><br/>";
			sb[sb.length] =  "<input type = \"button\" id=\"" + this.container + "_btnDeselect\"    value=\"&lt;\"  style=\"width:24px;\" class=\"clsButtonTiny\"></input> <br/>";
			sb[sb.length] =  "<input type = \"button\" id=\"" + this.container + "_btnDeselectAll\" value=\"&lt;&lt;\"  style=\"width:24px;\" class=\"clsButtonTiny\"></input><br/>";
			sb[sb.length] =  "</td>";
			sb[sb.length] =  "<td width=\"*\" rowspan=\"5\" valign=\"top\">";
			sb[sb.length] =  "<select id=\"" + this.container + "_selectedItemContainer\" multiple=\"multiple\"";
			sb[sb.length] =  "style=\"width: "+ this.boxWidth +"px; height: "+this.boxHeight+"px; visibility: visible;\">";
			sb[sb.length] =  "</select>";
			sb[sb.length] =  "</td>";
			sb[sb.length] =  "</tr>";
			sb[sb.length] = "</table>";
		    $(sb.join("")).appendTo("#" + this.container); 
		},
	
		initDomElements: function(objConfig) {
			this.container             = objConfig.container; //DOM ID of the whole DOM component container
			this.titleAllItems         = objConfig.titleAllItems;
			this.titleSelectedItems    = objConfig.titleSelectedItems;
			this.boxWidth			   = objConfig.boxWidth;
			this.boxHeight             = objConfig.boxHeight;
		},
		
		//apply JQ UI Themes to DOM elements
		applyThemesDecorations : function (){
			this.decorateAllButtons();
		},		
		//decorate all buttons
		decorateAllButtons: function (){
			this.decorateButton($('#'+this.container+"_btnSelect"));
			this.decorateButton($('#'+this.container+"_btnSelectAll"));
			this.decorateButton($('#'+this.container+"_btnDeselect"));
			this.decorateButton($('#'+this.container+"_btnDeselectAll"));
		},
		//Addes JQ UI Themes framework decorations to a button
		decorateButton : function (objButton){
			$(objButton).addClass('ui-state-default ui-corner-all');
			$(objButton).hover(
						function() { $(objButton).addClass('ui-state-hover'); }, 
						function() { $(objButton).removeClass('ui-state-hover'); }
					);
		},
		
		init: function(objConfig){
			this.group              = objConfig.group;
			this.optionValue        = objConfig.optionValue;
			this.optionText         = objConfig.optionText;
			
			this.initDomElements(objConfig);
			this.createContainerDOM();
			this.initObjects();
			this.initListeners();
			this.allOptions = objConfig.allOptions;
			this.groupAllOptions();
			this.generateDOMAllItems(this.groupedAllOptions);
			this.setItemsAll();
			this.applyThemesDecorations();
		}		
};
/**************************************************
 * Generating privilege selection DOM component - END
 **************************************************/
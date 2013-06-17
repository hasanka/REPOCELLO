This file will document all the changes to the jquery.jqGrid.js file

Modifications @author Navod Ediriweera @since 21 July 2010

*  1. Modified to Sort data locally with the flag 'sortlocally' (default - false) 

	Added new variable sortlocally to $.fn.jqGrid function with the default value as false
	Modified the Sort Data function to 
		a. Set the last page to 1 only if sortlocally is false
		b. execute populate() only if sortlocally is false
		c. execute sortArrayData() function if sortlocally is true	
		d. Calls deselectAfterSort if it is enabled based on the sortlocally flag 

	Only affacts SortData function.

*  2. Added a function to clear the screen 'screenClearFunc'. if present it should clear the screen (Can execute any give function object). currently executed after sorting.

	Added a call to the function screenClearFunc to execute it if it is present right after sorting.
	This function should be defined in the individual level if the screen needs to be cleared after the sorting. Cam execute any other function as well
		
	Only affacts SortData function.
		
*  3. Added a function to call when there are no records to found. Name - 'onNoRecordsFunc'	

	When the pages are loaded if there are no records the jqgrid by default displays "No data to view" message in the pager. 
	This function will be executed if there are no records in addition to the above behaviour. based on the reccount parameter in addition to the default behaviour.
	Ideally should be defined globally to all screens to achieve uniform behavour. 

	Only affects updatepager function	
	

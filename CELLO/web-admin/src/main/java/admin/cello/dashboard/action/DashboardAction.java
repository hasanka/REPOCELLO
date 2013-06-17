package admin.cello.dashboard.action;

import org.apache.struts2.convention.annotation.Results;
import org.apache.struts2.convention.annotation.Result;
import admin.cello.util.Constants;

import com.opensymphony.xwork2.ActionSupport;

/**
 * 
 * @author hasankachandrasekara
 *
 */

@Results(@Result(name=Constants.ResultTypes.SUCCESS,location=Constants.ViewTypes.DASHBOARD))
public class DashboardAction extends ActionSupport{
	private static final long serialVersionUID = 1L;
	/*
	 * retrive view
	 */
	public String showView(){
		return Constants.ResultTypes.SUCCESS;
	}
}

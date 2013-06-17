package admin.cello.user.action;

import java.util.ArrayList;
import java.util.List;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Results;
import org.apache.struts2.convention.annotation.Result;

import admin.cello.user.dto.UserDTO;
import admin.cello.util.Constants;

import com.opensymphony.xwork2.ActionSupport;
/**
 * 
 * @author hasankachandrasekara
 *
 */

@Results({
		  @Result(name=Constants.ResultTypes.SUCCESS,location=Constants.ViewTypes.USER),
		  @Result(name=Constants.ResultTypes.ERROR_PAGE,location=Constants.ViewTypes.ERROR404),
		  @Result(name=Constants.ResultTypes.JSON_DATA,type="json")
})
@ParentPackage("json-default")
public class UserAction extends ActionSupport{
	
	private static final long serialVersionUID = 1L;
	private long page=1;
	private long total=0;
	private long records=0;
	private UserDTO userDTO;
	private List<UserDTO>userList;
	
	
	public String showView(){
		return Constants.ResultTypes.SUCCESS;
	}

	public String searchUser(){
		try {
			userList=new ArrayList<UserDTO>();
			for(int i=0;i<10;i++){
				UserDTO temp=new UserDTO();
				temp.setId(i+"");
				temp.setLastName("lastName"+i);
				temp.setFirstName("firstName"+i);
				temp.setTitle("title"+i);
				temp.setStatus("status"+i);
				temp.setEmalAddress("emalAddress"+i);
				temp.setRole("role"+i);
				temp.setPhoneNumber("phoneNumber"+i);
				temp.setUserName("userName"+i);
				temp.setPassword("password"+i);
				userList.add(temp);
			}
			total=10;
			page=1;
		} catch (Exception e) {
			
		}	
		return Constants.ResultTypes.JSON_DATA;
	}

	public long getPage() {
		return page;
	}

	public void setPage(long page) {
		this.page = page;
	}

	public long getTotal() {
		return total;
	}

	public void setTotal(long total) {
		this.total = total;
	}

	public long getRecords() {
		return records;
	}

	public void setRecords(long records) {
		this.records = records;
	}

	public List<UserDTO> getUserList() {
		return userList;
	}

	public void setUserList(List<UserDTO> userList) {
		this.userList = userList;
	}

	public UserDTO getUserDTO() {
		return userDTO;
	}

	public void setUserDTO(UserDTO userDTO) {
		this.userDTO = userDTO;
	}
}

package admin.cello.user.dto;

import java.io.Serializable;
/**
 * 
 * @author hasankachandrasekara
 *
 */
public class UserDTO implements Serializable {
	
	private static final long serialVersionUID = 1L;
	private String id;
	private String firstName;
	private String lastName;
	private String title;
	private String emalAddress;
	private String status;
	private String role;
	private String phoneNumber;
	private String userName;
	private String  password;
	
	public UserDTO (){
		
	}
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getEmalAddress() {
		return emalAddress;
	}
	public void setEmalAddress(String emalAddress) {
		this.emalAddress = emalAddress;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
	
	
}

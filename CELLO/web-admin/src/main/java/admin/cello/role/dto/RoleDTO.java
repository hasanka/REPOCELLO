package admin.cello.role.dto;

import java.io.Serializable;

public class RoleDTO implements Serializable{

	private static final long serialVersionUID = 1L;
	private String roleId;
	private String roleName;
	private String status;
	
	
	public String getRoleId() {
		return roleId;
	}
	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
}

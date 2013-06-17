package admin.cello.role.action;
import java.util.ArrayList;
import java.util.List;

import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;

import admin.cello.role.dto.RoleDTO;
import admin.cello.util.Constants;

import com.opensymphony.xwork2.ActionSupport;
/**
 * 
 * @author hasankachandrasekara
 *
 */
@Results({
	@Result(name=Constants.ResultTypes.SUCCESS,location=Constants.ViewTypes.ROLE),
	@Result(name=Constants.ResultTypes.JSON_DATA,type="json"),
	@Result(name=Constants.ResultTypes.ERROR_PAGE,location=Constants.ViewTypes.ERROR404)
})
@ParentPackage("json-default")
public class RoleAction extends ActionSupport{
	private static final long serialVersionUID = 1L;

	private long page=1;
	private long total=0;
	private long records=0;
	private RoleDTO roleDTO;
	private List<RoleDTO>roleList;
	
	public String showView(){
		return Constants.ResultTypes.SUCCESS;
	}
	
	public String searchRole(){
		try {
			roleList=new ArrayList<RoleDTO>();
			for(int i=0;i<10;i++){
				RoleDTO temp=new RoleDTO();
				temp.setRoleId(i+"");
				temp.setRoleName("Role Name"+i);
				temp.setStatus("Status"+i);
				roleList.add(temp);
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

	public RoleDTO getRoleDTO() {
		return roleDTO;
	}

	public void setRoleDTO(RoleDTO roleDTO) {
		this.roleDTO = roleDTO;
	}

	public List<RoleDTO> getRoleList() {
		return roleList;
	}

	public void setRoleList(List<RoleDTO> roleList) {
		this.roleList = roleList;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
	
}

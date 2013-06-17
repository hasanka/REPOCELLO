package admin.cello.util;

public class Constants {
	public interface ResultTypes{
		public  static final String SUCCESS="success";
		public static final String JSON_DATA="data";
		public static final String ERROR_PAGE="error";
	}
	
	public interface ViewTypes{
		public static final String DASHBOARD="/private/dashboard/ui/dashboard.jsp";
		public static final String USER="/private/user/ui/user.jsp";
		public static final String ROLE="/private/role/ui/role.jsp";
		public static final String ERROR404="404.jsp";
	}
	
	public interface NameSpace{
		public static final String NAMESPACE_USER="/user";
	}
	
}

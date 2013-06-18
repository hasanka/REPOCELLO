package org.platform.exception;

public class CelloException  extends Exception{
	
	private static final long serialVersionUID = 1L;
	private String exceptionCode;
	
	public CelloException(String exceptionCode,Throwable couse){
		super(exceptionCode,couse);
		setExceptionCode(exceptionCode);
	}
	public String getExceptionCode() {
		return exceptionCode;
	}
	public void setExceptionCode(String exceptionCode) {
		this.exceptionCode = exceptionCode;
	}
	

}

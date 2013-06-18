package org.platform.exception;

public class CelloIllegalArgumentException extends CelloException{

	private static final long serialVersionUID = 1L;
	private String argument;
	public CelloIllegalArgumentException(String exceptionCode, Throwable couse,String argument) {
		super(exceptionCode, couse);
		setArgument(argument);
	}
	public String getArgument() {
		return argument;
	}
	public void setArgument(String argument) {
		this.argument = argument;
	}

	
	
}

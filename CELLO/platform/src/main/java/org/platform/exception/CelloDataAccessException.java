package org.platform.exception;

public class CelloDataAccessException extends CelloException {


	private static final long serialVersionUID = 1L;

	public CelloDataAccessException(String exceptionCode, Throwable couse) {
		super(exceptionCode, couse);
	}

}

package org.platform.util;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;


/**
 * 
 * @author hasankachandrasekara
 *
 */
public class CalenderUtil {
	
	
	/**
	 * Date Formats
	 */
	public static interface SimpleDateFormats {
		public static final String SDF_dd_MM_yyyy = "dd/MM/yyyy";
		public static final String SDF_HH_mm = "HH:mm";
		public static final String SDF_dd_MM_yyyy_HH_mm = "dd/MM/yyyy HH:mm";
		public static final String SDF_dd_MM_yyyy_HH_mm_ss = "dd/MM/yyyy HH:mm:ss";
		public static final String SDF_dd_MMM = "ddMMM";
		public static final String SDF_dd_MMM_yyyy = "dd MMM yyyy";
		public static final String yyyy_MM_dd_HH_mm_ss ="yyyyMMddHHmmss";
		public static final String dd_MM_yyyy_HH_mm_ss = "ddMMyyyyHHmmss";
		public static final String DAY_OF_WEEK = "EEE";
		
	}

    public static Date getTimeAddedDate(Date date, Date time) {

        GregorianCalendar timeCalender = new GregorianCalendar();
        timeCalender.setTime(time);

        GregorianCalendar dateCalender = new GregorianCalendar();
        dateCalender.setTime(date);

        dateCalender.set(GregorianCalendar.HOUR_OF_DAY, timeCalender.get(GregorianCalendar.HOUR_OF_DAY));
        dateCalender.set(GregorianCalendar.MINUTE, timeCalender.get(GregorianCalendar.MINUTE));
        dateCalender.set(GregorianCalendar.SECOND, timeCalender.get(GregorianCalendar.SECOND));

        return dateCalender.getTime();
    }
    
    /**
     * method to convert local date to the zulu date
     * 
     * @param localDate
     * @param isOffsetAddition
     * @param offsetInMins
     * @param isDstAddition
     * @param dstInMins
     * @return zuludate
     */
    public static Date getZuluDate(Date localDate, int offsetInMins, int dstInMins) {

        int offsetDiff = offsetInMins * -1;
        int dstDiff = dstInMins * -1;

        GregorianCalendar calander = new GregorianCalendar();
        calander.setTime(localDate);
        calander.add(GregorianCalendar.MINUTE, offsetDiff + dstDiff);

        return calander.getTime();
    }
    
    
    /**
     * method to convert local date to the zulu date by timepstamp
     * 
     * @param localDate
     * @param isOffsetAddition
     * @param offsetInMins
     * @param isDstAddition
     * @param dstInMins
     * @return zuludate
     */
    public static Timestamp getZuluTimestamp(Timestamp localDate, int offsetInMins, int dstInMins) {

        int offsetDiff = offsetInMins * -1;
        int dstDiff = dstInMins * -1;

        GregorianCalendar calander = new GregorianCalendar();
        calander.setTime(localDate);
        calander.add(GregorianCalendar.MINUTE, offsetDiff + dstDiff);

        return (new Timestamp(calander.getTime().getTime()));
    }

    /**
     * method to convert zulu date to the local date
     * 
     * @param localDate
     * @param isOffsetAddition
     * @param offsetInMins
     * @param isDstAddition
     * @param dstInMins
     * @return zuludate
     */
    public static Date getLocalDate(Date zuluDate, int offsetInMins, int dstInMins) {

        int offsetDiff = offsetInMins;
        int dstDiff = dstInMins;

        GregorianCalendar calander = new GregorianCalendar();
        calander.setTime(zuluDate);
        calander.add(GregorianCalendar.MINUTE, offsetDiff + dstDiff);

        return calander.getTime();
    }


    /**
     * methood to get the start time of a given day
     * @param date
     * @return
     */
    public static Date getStartTimeOfDate(Date date) {

        GregorianCalendar calander = new GregorianCalendar();
        calander.setTime(date);

        calander.set(GregorianCalendar.HOUR_OF_DAY, 0);
        calander.set(GregorianCalendar.MINUTE, 0);
        calander.set(GregorianCalendar.SECOND, 0);

        return calander.getTime();
    }
    
    
    /**
     * methood to get the end time of a given day
     * @param date
     * @return
     */
    public static Date getEndTimeOfDate(Date date) {

        GregorianCalendar calander = new GregorianCalendar();
        calander.setTime(date);

        calander.set(GregorianCalendar.HOUR_OF_DAY, 23);
        calander.set(GregorianCalendar.MINUTE, 59);
        calander.set(GregorianCalendar.SECOND, 59);

        return calander.getTime();
    }
    

    /**
     * method to parse date as string to date as java.util.Date
     * 
     * @param date
     * @param dateFormat
     * @return parsed date
     * @throws ParseException
     */
    public static Date getParsedTime(String date, String dateFormat) throws ParseException {

        SimpleDateFormat format = new SimpleDateFormat(dateFormat);
        Date parsedDate = format.parse(date);

        return parsedDate;
    }

    /**
     * method to parse date as string to date as java.util.Date only for time
     * 
     * @param date
     * @param dateFormat
     * @return parsed date
     * @throws ParseException
     */
    public static Date getOnlyTime(Date date) {

        GregorianCalendar calander = new GregorianCalendar();
        calander.setTime(date);

        calander.set(GregorianCalendar.YEAR, 1970);
        calander.set(GregorianCalendar.MONTH, 0);
        calander.set(GregorianCalendar.DATE, 1);

        return calander.getTime();
    }

    /**
     * method to parse date as string to date as java.util.Date only for date
     * 
     * @param date
     * @param dateFormat
     * @return parsed date
     * @throws ParseException
     */
    public static Date getOnlyDate(Date date) {

        GregorianCalendar calander = new GregorianCalendar();
        calander.setTime(date);
        calander.set(GregorianCalendar.HOUR, 0);
        calander.set(GregorianCalendar.HOUR_OF_DAY, 0);
        calander.set(GregorianCalendar.MINUTE, 0);
        calander.set(GregorianCalendar.SECOND, 0);
        calander.set(GregorianCalendar.MILLISECOND, 0);

        return calander.getTime();
    }
    
    /**
     * method to get offset + time + date
     * 
     * @param date
     * @param time
     * @param offset
     * @return
     */
    public static Date getOfssetAndTimeAddedDate(Date date, Date time, int offset) {

        Date timeAddedDate = getTimeAddedDate(date, time);
        GregorianCalendar calander = new GregorianCalendar();
        calander.setTime(timeAddedDate);

        calander.add(GregorianCalendar.DATE, offset);

        return calander.getTime();
    }
    
    /**
     * method to get offset in milli seconds + date
     * 
     * @param date
     * @param time
     * @param offset
     * @return
     */
    public static Date getOfssetInMilisecondAddedDate(Date date, int offset) {

        GregorianCalendar calander = new GregorianCalendar();
        calander.setTime(date);

        calander.add(GregorianCalendar.MILLISECOND, offset);
        return calander.getTime();
    }

    /**
     * method to get offset + time
     * 
     * @param date
     * @param time
     * @param offset
     * @return
     */
    public static Date getOfssetAddedTime(Date time, int offset) {

        GregorianCalendar calander = new GregorianCalendar();
        calander.setTime(time);

        calander.add(GregorianCalendar.DATE, offset);

        return calander.getTime();
    }

    /**
     * method to check is leap year or not
     * 
     * @param year
     * @return
     */
    private static boolean isLeapYear(int year) {
        return (year % 400 == 0) || ((year % 100 != 0) && (year % 4 == 0));
    }


    /**
     * method to get days to year
     * 
     * @param year
     * @return
     */
    private static int daysToYear(int year) {
        int daysToYear = (365 * year) + numLeapsToYear(year);
        return daysToYear;
    }

    /**
     * method to get mum leaps to year
     * 
     * @param year
     * @return
     */
    private static int numLeapsToYear(int year) {
        int num4y = (year - 1) / 4;
        int num100y = (year - 1) / 100;
        int num400y = (year - 1) / 400;
        return num4y - num100y + num400y;
    }

    /**
     * 
     * @param parseDate
     * @param dateFrom
     * @param dateTo
     * @return
     */
    public static boolean isBetween(Date parseDate, Date fromDate, Date toDate) {

        boolean status = false;
        // GregorianCalendar(int year, int month, int date, int hour, int
        // minute, int second)

        GregorianCalendar compareDate = getCalendar(parseDate);
        GregorianCalendar dateFrom = getCalendar(fromDate);
        GregorianCalendar dateTo = getCalendar(toDate);

        if (compareDate.after(dateFrom) && compareDate.before(dateTo)) {
            status = true;
        }
        return status;
    }
    
    /**
     * Compares two dates with/without considering time.
     * Returns 0 if parseDate = compareWithDate
     * Returns 1 if parseDate < compareWithDate
     * Returns 2 if parseDate > compareWithDate
     * 
     * @param parseDate
     * @param compareWithDate
     * @param considerTime
     * @return
     */
    public static int compareDates(Date parseDate, Date compareWithDate, boolean considerTime){
    	
    	if(!considerTime){
    		parseDate = getStartTimeOfDate(parseDate);
    		compareWithDate = getStartTimeOfDate(compareWithDate);
    	}
    	
    	int value = 0;
    	
    	if(isLessThan(parseDate, compareWithDate)){
    		value = 1;
    	}
    	else if(isGreaterThan(parseDate, compareWithDate)){
    		value = 2;
    	}
    	else {
    		value = 0;
    	}
    	
    	return value;
    }

    public static boolean isGreaterThan(Date parseDate, Date compareWithDate) {

        boolean status = false;
        // GregorianCalendar(int year, int month, int date, int hour, int
        // minute, int second)

        GregorianCalendar parseDate1 = getCalendar(parseDate);
        GregorianCalendar dateFrom = getCalendar(compareWithDate);

        if (parseDate1.after(dateFrom)) {
            status = true;
        }
        return status;
    }

    public static boolean isLessThan(Date parseDate, Date compareWithDate) {
        boolean status = false;

        GregorianCalendar parseDate1 = getCalendar(parseDate);
        GregorianCalendar dateFrom = getCalendar(compareWithDate);

        if (parseDate1.before(dateFrom)) {
            status = true;
        }
        return status;
    }

    /**
     * 
     * @param date
     * @return
     */
    public static GregorianCalendar getCalendar(Date date) {
        GregorianCalendar calendar = new GregorianCalendar();
        calendar.setTime(date);
        return calendar;
    }

    public static Date getDate(int iYear, int iMonth, int iDay) {

        GregorianCalendar day = new GregorianCalendar();
        day.set(GregorianCalendar.YEAR, iYear);
        day.set(GregorianCalendar.MONTH, iMonth);
        day.set(GregorianCalendar.DAY_OF_MONTH, iDay);
        return day.getTime();
    }
    
    /**
     * Checks a day falling between two days (days are in numbers 0-6)
     * @param targetDay
     * @param fromDay
     * @param toDay
     * @return
     */
    public static boolean isBetween(int targetDay, int fromDay, int toDay) {
    	return (fromDay <= toDay) ? (fromDay <= targetDay && toDay >= targetDay) : !(toDay < targetDay && toDay > fromDay);
    }
    
    public static Date getCurrentSystemTimeInZulu() {
		//it is assumed servers are configured with zulu time
    	Calendar cal = new GregorianCalendar();
    	cal.add(Calendar.MILLISECOND, -(cal.getTimeZone().getRawOffset() + cal.getTimeZone().getDSTSavings()));
		return cal.getTime();
	}
    
    public static String DateTimeWithSecondsToStringFormat(java.util.Date dtDate){
		String strDate = "";
		if (dtDate != null){
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
			strDate = simpleDateFormat.format(dtDate);
		}
		return strDate;
	}
    
    /**
     * Converts a Date object to a Calendar
	 * @param date
	 * @return
	 */
	public static Calendar formatDateToCalendar(Date date) {
		Calendar dtReturn = null;
		if (date != null) {

			dtReturn = Calendar.getInstance();
			dtReturn.setTime(date);
		}
		return dtReturn;
	}
	

	/**
     * Convert string to Calendar Object
     * 
     * @param strDate
     * @return Calendar
     */
    public static Calendar stringToCalendar(String strDate) {
    	if (!strDate.trim().equals("")) {
    		int date = Integer.parseInt(strDate.substring(0, 2));
    		int month = Integer.parseInt(strDate.substring(3, 5));
    		int year = Integer.parseInt(strDate.substring(6, 10));
    		
    		Calendar validDate = new GregorianCalendar(year, month - 1, date);
    		return validDate;
    	}
    	
    	return null;
    }
    
    /**
     * Conver the String to Calendar with time
     * 
     * @param strDate
     * @return Calendar
     */
    public static Calendar stringDateTimeToCalendar(String strDate) {
    	Calendar dtReturn = null;
    	
    	if (!strDate.equals("")){
    		int date = Integer.parseInt(strDate.substring(0,2));
    		int month = Integer.parseInt(strDate.substring(3,5));
    		int year = Integer.parseInt(strDate.substring(6,10));
    		
    		int hours = Integer.parseInt(strDate.substring(11,13));
    		int mints = Integer.parseInt(strDate.substring(14,16));
    		
    		Calendar validDate = new GregorianCalendar(year, month-1, date, hours, mints);
    		dtReturn = validDate;
    	}
    	
    	return dtReturn;
    }
    
    /**
	 * Convert Util date to Custom Format as String
	 * 
	 * @param dtDate
	 * @return String
	 */
	public static String dateToStringFormat(java.util.Date dtDate,String dateFormat) {
		String strDate = "";
		if (dtDate != null) {
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat(dateFormat);
			strDate = simpleDateFormat.format(dtDate);
		}
		return strDate;
	}
	
	/**
	 * Converts Calendar object to Custom Format as String
	 * 
	 * @param calendar
	 * @param dateFormat
	 * @return Formatted String
	 */
	public static String CalendarToStringFormat(Calendar calendar, String dateFormat) {
		String strDate = "";
		if (calendar != null) {
			Date dtDate = new Date(calendar.getTime().getTime());
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat(dateFormat);
			strDate = simpleDateFormat.format(dtDate);
		}
		return strDate;
	}
	
	/**
	 * Conver the String to Calendar with only time
	 * 
	 * @param strTime
	 * @return Calendar
	 */
	public static Calendar stringTimeToCalendar(String strTime) {
		Calendar dtReturn = null;
		
		if (!strTime.equals("")){	
			int hours = Integer.parseInt(strTime.substring(0,2));
			int mints = Integer.parseInt(strTime.substring(3,5));
			
			Calendar validDate = new GregorianCalendar(1970, 0, 1, hours, mints);
			dtReturn = validDate;
		}
		
		return dtReturn;
	}

	/**
	 * Add Days to Util Date
	 * @param date
	 * @param intDays
	 * @return
	 */
	public static java.util.Date addCalendarDays(java.util.Date date, int intDays) {

		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.DATE, intDays);

		return calendar.getTime();
	}
	/**
	 * 
	 * Convert string to Date Object
	 * @param strDate
	 * @return
	 */
	public static Date stringToDate(String strDate) {
		Date dtReturn = null;
		if (!strDate.equals("")) {
			int date = Integer.parseInt(strDate.substring(0, 2));
			int month = Integer.parseInt(strDate.substring(3, 5));
			int year = Integer.parseInt(strDate.substring(6, 10));

			Calendar validDate = new GregorianCalendar(year, month - 1, date);
			dtReturn = new Date(validDate.getTime().getTime());
		}
		return dtReturn;
	}	
	/**
     * Add last time of the day
     * @param Date
     * @return Date
     */
    public static java.util.Date setDayEndDateTime(String strDate){
    	java.util.Date dDate = stringToDate(strDate);
    	return setDayEndDateTime(dDate);
    }
    
	/**
     * Add last time of the day
     * @param Date
     * @return Date
     */
    public static java.util.Date setDayEndDateTime(java.util.Date dDate) {
    	Calendar cCal = GregorianCalendar.getInstance();
    	cCal.setTime(dDate);
    	cCal = setDayEndDateTime(cCal);
    	return cCal.getTime();
    }

	/**
     * Add last time of the day
     * @param Calendar
     * @return Calendar
     */
    public static Calendar setDayEndDateTime(Calendar cCal) {
    	cCal.set(Calendar.HOUR_OF_DAY, 23);
    	cCal.set(Calendar.MINUTE, 59);
    	return cCal;
    }  

    
	/**
	 * adds years, months,days,hours, minutes & seconds to a given date
	 * @param date
	 * @param years
	 * @param months
	 * @param days
	 * @param hours
	 * @param minutes
	 * @param seconds
	 * @return
	 */
	public static Date add(Date date, int years, int months, int days, int hours, int minutes, int seconds) {
		Calendar cal = Calendar.getInstance();
		
		cal.setTime(date);
		
		if (years != 0) {
			cal.add(Calendar.YEAR, years);
		}
		
		if (months != 0) {
			cal.add(Calendar.MONTH, months);
		}
		
		if (days != 0) {
			cal.add(Calendar.DAY_OF_MONTH, days);
		}
		
		if (hours != 0) {
			cal.add(Calendar.HOUR_OF_DAY, hours);
		}
		
		if (minutes != 0) {
			cal.add(Calendar.MINUTE, minutes);
		}
		
		if (seconds != 0) {
			cal.add(Calendar.SECOND, seconds);
		}
		
		return cal.getTime();
	}
	
	
	public static String getDifference(Date startDate, Date endDate) {
		StringBuilder contents = new StringBuilder();
		// Get difference in milliseconds
		long diffMillis = endDate.getTime() - startDate.getTime();
	
		long diffDays = diffMillis / (24 * 60 * 60 * 1000);

		if (diffDays > 0) {
			contents.append(diffDays + " Days ");
		}
		
		long diffHours = (diffMillis % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000);
		
		if (diffHours > 0) {
			contents.append(diffHours + " Hours ");
		}
		
		long diffMins = ((diffMillis % (24 * 60 * 60 * 1000)) % (60 * 60 * 1000)) / (60 * 1000);
		
		if (diffMins > 0) {
			if (contents.length() > 0) {
				contents.append("and " + diffMins + " Minutes ");
			} else {
				contents.append(diffMins + " Minutes ");
			}
		}
		
		return contents.toString();
	}
	
}

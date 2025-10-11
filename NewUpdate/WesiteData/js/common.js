var digits = "0123456789";

var lowercaseLetters = "abcdefghijklmnopqrstuvwxyz"

var uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

var whitespace = " \t\n\r";

var decimalPointDelimiter = "."

var phoneNumberDelimiters = "()- ";

var validUSPhoneChars = digits + phoneNumberDelimiters;

var validWorldPhoneChars = digits + phoneNumberDelimiters + "+";

var SSNDelimiters = "- ";

var validSSNChars = digits + SSNDelimiters;

var digitsInSocialSecurityNumber = 9;

var digitsInUSPhoneNumber = 10;

var ZIPCodeDelimiters = "-";

var ZIPCodeDelimeter = "-"

var validZIPCodeChars = digits + ZIPCodeDelimiters

var digitsInZIPCode1 = 5

var digitsInZIPCode2 = 5

var creditCardDelimiters = " "

var mPrefix = "You did not enter a value into the "
var mSuffix = " field. This is a required field. Please enter it now."

var sUSLastName = "Last Name"
var sUSFirstName = "First Name"
var sWorldLastName = "Family Name"
var sWorldFirstName = "Given Name"
var sTitle = "Title"
var sCompanyName = "Company Name"
var sUSAddress = "Street Address"
var sWorldAddress = "Address"
var sCity = "City"
var sStateCode = "State Code"
var sWorldState = "State, Province, or Prefecture"
var sCountry = "Country"
var sZIPCode = "ZIP Code"
var sWorldPostalCode = "Postal Code"
var sPhone = "Phone Number"
var sFax = "Fax Number"
var sDateOfBirth = "Date of Birth"
var sExpirationDate = "Expiration Date"
var sEmail = "Email"
var sSSN = "Social Security Number"
var sCreditCardNumber = "Credit Card Number"
var sOtherInfo = "Other Information"

var iStateCode = " must be a valid two character U.S. state abbreviation (like CA for California)."
var iZIPCode = " must be a 5 digit U.S. ZIP Code (like 11501)."
var iZIPCodeList = " must have 5 digit U.S. ZIP Codes (like 11501) separated by commas."
var iUSPhone = " must be a 10 digit U.S. phone number (like 415 555 1212)."
var iWorldPhone = " must be a valid international phone number."
var iSSN = " must be a 9 digit U.S. social security number (like 123 45 6789)."
var iEmail = " must be a valid email address (like foo@bar.com)."
var iCreditCardPrefix = "This is not a valid "
var iCreditCardSuffix = " credit card number. (Click the link on this form to see a list of sample numbers.)"
var iDay = " must be a day number between 1 and 31. "
var iMonth = " must be a month number between 1 and 12. "
var iYear = " must be a 2 or 4 digit year number. "
var iDatePrefix = "The Day, Month, and Year for ";
var iDateSuffix = " do not form a valid date.";
var iIntegerInRange1 = " must be between "
var iIntegerInRange2 = " and "
var iIntegerInRange3 = "."
var iStringLength1 = " must be between "
var iStringLength2 = " and "
var iStringLength3 = " characters in length."


var pEntryPrompt = "Please enter a "
var pStateCode = "2 character code (like CA)."
var pZIPCode = "5 digit U.S. ZIP Code (like 11501)."
var pUSPhone = "10 digit U.S. phone number (like 415 555 1212)."
var pWorldPhone = "international phone number."
var pSSN = "9 digit U.S. social security number (like 123 45 6789)."
var pEmail = "valid email address (like foo@bar.com)."
var pCreditCard = "valid credit card number."
var pDay = "day number between 1 and 31."
var pMonth = "month number between 1 and 12."
var pYear = "2 or 4 digit year number."
var defaultEmptyOK = false;
var maxLength = "number of characters entered is greater than the field size"

// New Array to hold Country Value ,CountryName and Country Region Id
// used in loadCountryList() and filterCountryByRegion() function
var allCountriesValue = new Array();
var allCountriesText = new Array();
var allCountriesRegionId = new Array();


function makeArray(n) {
//*** BUG: If I put this line in, I get two error messages:
//(1) Window.length can't be set by assignment
//(2) daysInMonth has no property indexed by 4
//If I leave it out, the code works fine.
//   this.length = n;
   for (var i = 1; i <= n; i++) {
      this[i] = 0
   }
   return this
}

var daysInMonth = makeArray(12);
daysInMonth[1] = 31;
daysInMonth[2] = 29;   // must programmatically check this
daysInMonth[3] = 31;
daysInMonth[4] = 30;
daysInMonth[5] = 31;
daysInMonth[6] = 30;
daysInMonth[7] = 31;
daysInMonth[8] = 31;
daysInMonth[9] = 30;
daysInMonth[10] = 31;
daysInMonth[11] = 30;
daysInMonth[12] = 31;

function isEmpty(s){   

	s = trim(s);
	return ((s == null) || (s.length == 0) || (s == ""))
}

function isWhitespace (s){   
	var i;
    if (isEmpty(s)) return true;
    for (i = 0; i < s.length; i++){
		var c = s.charAt(i);
		if (whitespace.indexOf(c) == -1) return false;
	}
	return true;
}

function reformat (s)

{   var arg;
    var sPos = 0;
    var resultString = "";

    for (var i = 1; i < reformat.arguments.length; i++) {
       arg = reformat.arguments[i];
       if (i % 2 == 1) resultString += arg;
       else {
	   resultString += s.substring(sPos, sPos + arg);
	   sPos += arg;
       }
    }
    return resultString;
}

function isSignedInteger (s)

{   if (isEmpty(s))
       if (isSignedInteger.arguments.length == 1) return defaultEmptyOK;
       else return (isSignedInteger.arguments[1] == true);

    else {
	var startPos = 0;
	var secondArg = defaultEmptyOK;

	if (isSignedInteger.arguments.length > 1)
	    secondArg = isSignedInteger.arguments[1];

	// skip leading + or -
	if ( (s.charAt(0) == "-") || (s.charAt(0) == "+") )
	   startPos = 1;
	return (isInteger(s.substring(startPos, s.length), secondArg))
    }
}
function Confirm12(s) {
            var confirm_value = document.createElement("INPUT");
                       var temp;
                       var ss=s;
                      
           temp  = ss.split(",");
           //confirm_value.style.width = "300px";
            confirm_value.type = "hidden";
            confirm_value.name = "confirm_value";

            // Modified By:Rajashree Patil
            // Date: 16 Jan 17
            // Display Partial Payment message only for partial payment.
            var msgstr = "";
            // Modified By:Shreekant Sawarkar
            // Date: 02/08/2017
            //Updated for prompting message about SD or Energy Bill Payment is selected.
            if (Number(temp[0]) < Number(temp[1])) {
//                msgstr = "The Payable Amount is Rs. " + temp[1] + ". You have opted to pay Rs. " + temp[0] + "\n" +
//                "Payment will be considered as " + temp[2] + ".\n" + 
//                "Partial payment of Energy Bills are subject to Delayed Payment Charges, interest " +
//                "and line disconnections as per standard MSEDCL procedure." + "\n" + "\n" +
                //                 "Please Confirm.";
                msgstr = "You have opted to pay Rs. " + temp[0] + ". \n" + "Payment will be considered as " + temp[2] + ".";
            }
            else if (Number(temp[0]) == Number(temp[1])) {
                msgstr = "You have opted to pay Rs. " + temp[0] + ". \n" + "Payment will be considered as " + temp[2] + ".";  
                }
            else {
                msgstr = "The Payable Amount is Rs. " + temp[1] + ". You have opted to pay Rs. " + temp[0] + ". \n" + " Payment will be considered as " + temp[2] + ".";
            }
            if (confirm(msgstr)) {
                confirm_value.value = "Yes";
            } else {
                confirm_value.value = "No";
            }
            return (confirm_value.value);
        }

//added on 15-06-23 for change in advance payment msg
//function ConfirmAdvPayment(s) {
//    var confirm_value = document.createElement("INPUT");
//    var temp;
//    var ss = s;

//    temp = ss.split(",");
//    //confirm_value.style.width = "300px";
//    confirm_value.type = "hidden";
//    confirm_value.name = "confirm_value";

//    // Modified By:Rajashree Patil
//    // Date: 16 Jan 17
//    // Display Partial Payment message only for partial payment.
//    var msgstr = "";
  
//        msgstr = "You have already paid your Energy Bill and Dues are nil. You have opted to pay Rs. " + temp[0] + " as Advance Payment. \n" + "Payment will be considered as " + temp[2] + ".";  // msg changed on 15-06-2023
    
//    if (confirm(msgstr)) {
//        confirm_value.value = "Yes";
//    } else {
//        confirm_value.value = "No";
//    }
//    return (confirm_value.value);
//}

// isPositiveInteger (STRING s [, BOOLEAN emptyOK])
//
// Returns true if string s is an integer > 0.
//
// For explanation of optional argument emptyOK,
// see comments of function isInteger.

function isPositiveInteger (s)
{   var secondArg = defaultEmptyOK;

    if (isPositiveInteger.arguments.length > 1)
	secondArg = isPositiveInteger.arguments[1];

    // The next line is a bit byzantine.  What it means is:
    // a) s must be a signed integer, AND
    // b) one of the following must be true:
    //    i)  s is empty and we are supposed to return true for
    //        empty strings
    //    ii) this is a positive, not negative, number

    return (isSignedInteger(s, secondArg)
	 && ( (isEmpty(s) && secondArg)  || (parseInt (s) > 0) ) );
}

// isNonnegativeInteger (STRING s [, BOOLEAN emptyOK])
//
// Returns true if string s is an integer >= 0.
//
// For explanation of optional argument emptyOK,
// see comments of function isInteger.

function isNonnegativeInteger (s)
{   var secondArg = defaultEmptyOK;

    if (isNonnegativeInteger.arguments.length > 1)
	secondArg = isNonnegativeInteger.arguments[1];

    // The next line is a bit byzantine.  What it means is:
    // a) s must be a signed integer, AND
    // b) one of the following must be true:
    //    i)  s is empty and we are supposed to return true for
    //        empty strings
    //    ii) this is a number >= 0

    return (isSignedInteger(s, secondArg)
	 && ( (isEmpty(s) && secondArg)  || (parseInt (s) >= 0) ) );
}

// isNegativeInteger (STRING s [, BOOLEAN emptyOK])
//
// Returns true if string s is an integer < 0.
//
// For explanation of optional argument emptyOK,
// see comments of function isInteger.

function isNegativeInteger (s)
{   var secondArg = defaultEmptyOK;

    if (isNegativeInteger.arguments.length > 1)
	secondArg = isNegativeInteger.arguments[1];

    // The next line is a bit byzantine.  What it means is:
    // a) s must be a signed integer, AND
    // b) one of the following must be true:
    //    i)  s is empty and we are supposed to return true for
    //        empty strings
    //    ii) this is a negative, not positive, number

    return (isSignedInteger(s, secondArg)
	 && ( (isEmpty(s) && secondArg)  || (parseInt (s) < 0) ) );
}

// isNonpositiveInteger (STRING s [, BOOLEAN emptyOK])
//
// Returns true if string s is an integer <= 0.
//
// For explanation of optional argument emptyOK,
// see comments of function isInteger.

function isNonpositiveInteger (s)
{   var secondArg = defaultEmptyOK;

    if (isNonpositiveInteger.arguments.length > 1)
	secondArg = isNonpositiveInteger.arguments[1];

    // The next line is a bit byzantine.  What it means is:
    // a) s must be a signed integer, AND
    // b) one of the following must be true:
    //    i)  s is empty and we are supposed to return true for
    //        empty strings
    //    ii) this is a number <= 0

    return (isSignedInteger(s, secondArg)
	 && ( (isEmpty(s) && secondArg)  || (parseInt (s) <= 0) ) );
}

// isFloat (STRING s [, BOOLEAN emptyOK])
//
// True if string s is an unsigned floating point (real) number.
//
// Also returns true for unsigned integers. If you wish
// to distinguish between integers and floating point numbers,
// first call isInteger, then call isFloat.
//
// Does not accept exponential notation.
//
// For explanation of optional argument emptyOK,
// see comments of function isInteger.

function isFloat (s)

{   var i;
    var seenDecimalPoint = false;

    if (isEmpty(s))
       if (isFloat.arguments.length == 1) return defaultEmptyOK;
       else return (isFloat.arguments[1] == true);

    if (s == decimalPointDelimiter) return false;

    // Search through string's characters one by one
    // until we find a non-numeric character.
    // When we do, return false; if we don't, return true.

    for (i = 0; i < s.length; i++)
    {
	// Check that current character is number.
	var c = s.charAt(i);

	if ((c == decimalPointDelimiter) && !seenDecimalPoint) seenDecimalPoint = true;
	else if (!isDigit(c)) return false;
    }

    // All characters are numbers.
    return true;
}

// isSignedFloat (STRING s [, BOOLEAN emptyOK])
//
// True if string s is a signed or unsigned floating point
// (real) number. First character is allowed to be + or -.
//
// Also returns true for unsigned integers. If you wish
// to distinguish between integers and floating point numbers,
// first call isSignedInteger, then call isSignedFloat.
//
// Does not accept exponential notation.
//
// For explanation of optional argument emptyOK,
// see comments of function isInteger.

function isSignedFloat (s)

{   if (isEmpty(s))
       if (isSignedFloat.arguments.length == 1) return defaultEmptyOK;
       else return (isSignedFloat.arguments[1] == true);

    else {
	var startPos = 0;
	var secondArg = defaultEmptyOK;

	if (isSignedFloat.arguments.length > 1)
	    secondArg = isSignedFloat.arguments[1];

	// skip leading + or -
	if ( (s.charAt(0) == "-") || (s.charAt(0) == "+") )
	   startPos = 1;
	return (isFloat(s.substring(startPos, s.length), secondArg))
    }
}

// isAlphabetic (STRING s [, BOOLEAN emptyOK])
//
// Returns true if string s is English letters
// (A .. Z, a..z) only.
//
// For explanation of optional argument emptyOK,
// see comments of function isInteger.
//
// NOTE: Need i18n version to support European characters.
// This could be tricky due to different character
// sets and orderings for various languages and platforms.

function isAlphabetic (s)

{   var i;

    if (isEmpty(s))
       if (isAlphabetic.arguments.length == 1) return defaultEmptyOK;
       else return (isAlphabetic.arguments[1] == true);

    // Search through string's characters one by one
    // until we find a non-alphabetic character.
    // When we do, return false; if we don't, return true.

    for (i = 0; i < s.length; i++)
    {
	// Check that current character is letter.
	var c = s.charAt(i);

	if (!isLetter(c))
	return false;
    }

    // All characters are letters.
    return true;
}

function isDigit (c){
	return ((c >= "0") && (c <= "9"))
}

function isLetter (c){
	return ( ((c >= "a") && (c <= "z")) || ((c >= "A") && (c <= "Z")) )
}
//added by rahul on 23-09-2020
function isLetterOrSpace(c) {
    return (((c >= "a") && (c <= "z")) || ((c >= "A") && (c <= "Z"))||c==" ")
}

function isLetterOrSpaceOrDigit(c) {
    return (((c >= "a") && (c <= "z")) || ((c >= "A") && (c <= "Z")) || c == " " || ((c >= "0") && (c <= "9")))
}

function isAlphabeticOrSpace(s) {
    var i;

    if (isEmpty(s))
        if (isAlphabetic.arguments.length == 1) return defaultEmptyOK;
        else return (isAlphabetic.arguments[1] == true);

    // Search through string's characters one by one
    // until we find a non-alphabetic character.
    // When we do, return false; if we don't, return true.

    for (i = 0; i < s.length; i++) {
        // Check that current character is letter.
        var c = s.charAt(i);

        if (!isLetterOrSpace(c))
            return false;
    }

    // All characters are letters.
    return true;
}

// digits are allowed as per mail from CGM IT Sir on 10-02-2024
function isAlphabeticOrSpaceOrDigit(s) {
    var i;

    if (isEmpty(s))
        if (isAlphabetic.arguments.length == 1) return defaultEmptyOK;
        else return (isAlphabetic.arguments[1] == true);

    // Search through string's characters one by one
    // until we find a non-alphabetic character.
    // When we do, return false; if we don't, return true.

    for (i = 0; i < s.length; i++) {
        // Check that current character is letter.
        var c = s.charAt(i);

        if (!isLetterOrSpaceOrDigit(c))
            return false;
    }

    // All characters are letters.
    return true;
}


function isLetterOrDigit (c)
{   return (isLetter(c) || isDigit(c))
}

function stripWhitespace (s){
	return stripCharsInBag (s, whitespace)
}

function stripCharsInBag (s, bag){
	var i;
	var returnString = "";
	for (i = 0; i < s.length; i++){
		var c = s.charAt(i);
		if (bag.indexOf(c) == -1) 
			returnString += c;
	}
	return returnString;
}

// remove whitespace from both sides of the string
function trim(stringToTrim) 
{
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}

// remove whitespace from left side of the string
function ltrim(stringToTrim) 
{
	return stringToTrim.replace(/^\s+/,"");
}

// remove whitespace from right side of the string
function rtrim(stringToTrim) 
{
	return stringToTrim.replace(/\s+$/,"");
}

function isAlphanumeric (s){

	var i;
	for (i = 0; i < s.length; i++){
		var c = s.charAt(i);
		if (! ( isLetter(c) || isDigit(c) || c==' ' || c=='-' || c=='_' ) )
			return false;
	}
	return true;
}
// added by sanjay on 08-10-2021 to check single quote and double quote
function isQuote(s) {

    var i;
    for (i = 0; i < s.length; i++) {
        var c = s.charCodeAt(i);
        if (c == 39 || c == 34) // single quote and double quote ASCII values
            return true;
    }
    return false;
}

// added by sanjay on 22-10-2021 to check any space in string
function isContainsSpace(s) {

    var i;
    for (i = 0; i < s.length; i++) {
        var c = s.charAt(i);
        if (c == ' ') // blank space
            return true;
    }
    return false;
}

function isDate (year, month, day)
{   // catch invalid years (not 2- or 4-digit) and invalid months and days.
    if (! (isYear(year, false) && isMonth(month, false) && isDay(day, false))) return false;

    // Explicitly change type to integer to make code work in both
    // JavaScript 1.1 and JavaScript 1.2.
    var intYear = parseInt(year);
    var intMonth = parseInt(month);
    var intDay = parseInt(day);

    // catch invalid days, except for February
    if (intDay > daysInMonth[intMonth]) return false;
	 
    if ((intMonth == 2) && (intDay > daysInFebruary(intYear))){

		 return false;
		//return warnInvalid(month, "Check Days in Febuary");
	}	
    else return true;
}

function daysInFebruary (year)
{   // February has 29 days in any year evenly divisible by four,
    // EXCEPT for centurial years which are not also divisible by 400.
    return (  ((year % 4 == 0) && ( (!(year % 100 == 0)) || (year % 400 == 0) ) ) ? 29 : 28 );
}

// Returns true if all characters in string s are numbers.
function isInteger (s){   

	var i;
    if (isEmpty(s))
       if (isInteger.arguments.length == 1) 
		   return defaultEmptyOK;
       else 
		   return (isInteger.arguments[1] == true);

    for (i = 0; i < s.length; i++){
		var c = s.charAt(i);
		if (!isDigit(c)) 
			return false;
	}    
    return true;
}

// isUSPhoneNumber returns true if string s is a valid U.S. Phone
// Number.  Must be 10 digits.
function isUSPhoneNumber (s){   
	if (isEmpty(s))
       if (isUSPhoneNumber.arguments.length == 1) return defaultEmptyOK;
       else return (isUSPhoneNumber.arguments[1] == true);
    return (isInteger(s) && s.length == digitsInUSPhoneNumber)
}

// isInternationalPhoneNumber returns true if string s is a valid
// international phone number.  Must be digits only; any length OK.
// May be prefixed by + character.

function isInternationalPhoneNumber (s)
{   if (isEmpty(s))
       if (isInternationalPhoneNumber.arguments.length == 1) return defaultEmptyOK;
       else return (isInternationalPhoneNumber.arguments[1] == true);
    return (isPositiveInteger(s))
}
// takes ZIPString, a string of 5 or 9 digits;
// if 9 digits, inserts separator hyphen

function reformatZIPCode (ZIPString)
{   if (ZIPString.length == 5) return ZIPString;
    else return (reformat (ZIPString, "", 5, "-", 4));
}

// isZIPCode returns true if string s is a valid
// U.S. ZIP code.  Must be 5 or 9 digits only.
function isZIPCode (s)
{  if (isEmpty(s))
       if (isZIPCode.arguments.length == 1) return defaultEmptyOK;
       else return (isZIPCode.arguments[1] == true);
   return (isInteger(s) &&
	    ((s.length == digitsInZIPCode1) ||
	     (s.length == digitsInZIPCode2)))
}

// Return true if s is a valid U.S. Postal Code
// (abbreviation for state).
function isStateCode(s)
{   if (isEmpty(s))
       if (isStateCode.arguments.length == 1) return defaultEmptyOK;
       else return (isStateCode.arguments[1] == true);
    return ( (USStateCodes.indexOf(s) != -1) &&
	     (s.indexOf(USStateCodeDelimiter) == -1) )
}

// isIntegerInRange returns true if string s is an integer
// within the range of integer arguments a and b, inclusive.
function isIntegerInRange (s, a, b)
{   if (isEmpty(s))
       if (isIntegerInRange.arguments.length == 3) return defaultEmptyOK;
       else return (isIntegerInRange.arguments[1] == true);

    // Catch non-integer strings to avoid creating a NaN below,
    // which isn't available on JavaScript 1.0 for Windows.
    if (!isInteger(s, false)) return false;

    // Now, explicitly change the type to integer via parseInt
    // so that the comparison code below will work both on
    // JavaScript 1.2 (which typechecks in equality comparisons)
    // and JavaScript 1.1 and before (which doesn't).
    var num = parseInt (s);
    return ((a <= num) && (num <= b));
}

function isLeapYear(intYear) {
	if (intYear % 100 == 0) {
		if (intYear % 400 == 0) { return true; }
	}
	else {
		if ((intYear % 4) == 0) { return true; }
	}
	return false;
}

//validate year for length = 4 only
function isYear (s)
{  	
	if (isEmpty(s))
       if (isYear.arguments.length == 1) return defaultEmptyOK;
       else return (isYear.arguments[1] == true);
    if (!isNonnegativeInteger(s)) return false;
    return (s.length == 4);
}

function isMonth (s)
{   if (isEmpty(s))
       if (isMonth.arguments.length == 1) return defaultEmptyOK;
       else return (isMonth.arguments[1] == true);
    return isIntegerInRange (s, 1, 12);
}

function isDay (s)
{   if (isEmpty(s))
       if (isDay.arguments.length == 1) return defaultEmptyOK;
       else return (isDay.arguments[1] == true);
    return isIntegerInRange (s, 1, 31);
}

function daysInFebruary (year)
{   // February has 29 days in any year evenly divisible by four,
    // EXCEPT for centurial years which are not also divisible by 400.
    return (  ((year % 4 == 0) && ( (!(year % 100 == 0)) || (year % 400 == 0) ) ) ? 29 : 28 );
}

var errorList = "";

function isInteractiveErrors() {
  return false;
}

function isErrorListEmpty() {
  return errorList.length==0;
}

function addToErrorList(s) {
  errorList += s + "\n";
}

function setErrorList(s) {
  errorList = s;
}

function clearErrorList() {
  errorList = "";
}

function showErrorList() {
  if (! isErrorListEmpty()) {
  	alert(errorList);
	clearErrorList();
  }
}

function displayErrors() {
	if (! isErrorListEmpty()) {
		showErrorList()
		return false;
	}
	else {
		return true;
	}
}

function isValidDate(d,convert) {

	var strDatestyle = "US"; //United States date style
	var strDate;
	var strDateArray;
	var strDay;
	var strMonth;
	var strYear;
	var intDay;
	var intMonth;
	var intYear;
	var booFound = false;
	var strSeparatorArray = new Array("-"," ","/",".");
	var intElementNr;
	var err = 0;
	var strMonthArray = new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
	strDate = d;
	if (strDate.length < 1) {
		return false;
	}
	if (strDate.toLowerCase()=="today" || strDate.toLowerCase()=="now"){return true;}

	for (intElementNr = 0; intElementNr < strSeparatorArray.length; intElementNr++) {
		if (strDate.indexOf(strSeparatorArray[intElementNr]) != -1) {
			strDateArray = strDate.split(strSeparatorArray[intElementNr]);
			if (strDateArray.length != 3) 
			{
				err = 1;
				return false;
			}
			else 
			{
				strDay = strDateArray[0];
				strMonth = strDateArray[1];
				strYear = strDateArray[2];
			}
			booFound = true;
		}
	}

	if (booFound == false) {
		if (strDate.length>5) {
			strDay = strDate.substr(0, 2);
			strMonth = strDate.substr(2, 2);
			strYear = strDate.substr(4);
		}
		else
			return false;
	}
	
	// verify year part	2 or 4 digits
	if (strYear.length != 2 && strYear.length != 4) {return false;}
	if (isNaN(strYear)){return false;}
	// US style (swap month and day)
	if (strDatestyle == "US") {
		strTemp = strDay;
		strDay = strMonth;
		strMonth = strTemp;
	}

	// verify 1 or 2 digit integer day
	if (strDay.length<1 || strDay.length>2) {return false;}
	if (isNaN(strDay)){return false;}
	
	// month may be digits of characters, hence following check
	intMonth = parseInt(strMonth, 10);
	if (isNaN(intMonth)) {
		for (i = 0;i<12;i++) {
			if (strMonth.toUpperCase() == strMonthArray[i].toUpperCase()) {
				intMonth = i+1;
				strMonth = strMonthArray[i];
				i = 12;
			}
		}
		if (isNaN(intMonth)) {
			err = 3;
			return false;
		}
	}

	intDay=parseInt(strDay,10);
	intYear = parseInt(strYear, 10);
	
	if (intMonth>12 || intMonth<1) {
		err = 5;
		return false;
	}
	
	// day in month check
	if (intDay < 1 || intDay > 31){return false;}
		
	if ((intMonth == 4 || intMonth == 6 || intMonth == 9 || intMonth == 11) && (intDay > 30)) {
		return false;
	}
	
	if (intMonth == 2) {
		if (LeapYear(intYear)) {
			if (intDay > 29) {return false;}
		}
		else 
		{
			if (intDay > 28) {return false;}
		}
	}
	
	if (!convert)
		return true;
	else
	{
		if (intYear<=99){intYear=intYear+2000;}
		return intDay+"/"+intMonth+"/"+intYear;
	}
}

// Notify user that required field theField is empty.
// String s describes expected contents of theField.value.
// Put focus in theField and return false.

function warnEmpty (theField, s)
{
    if( isInteractiveErrors()) {
	theField.focus()
	alert(mPrefix + s + mSuffix)
    }
    else
    {
	// if first error set focus
	if ( isErrorListEmpty() )
	{
	    theField.focus()
	}
	addToErrorList(mPrefix + s + mSuffix)
    }
    return false
}

// Notify user that contents of field theField are invalid.
// String s describes expected contents of theField.value.
// Put select theField, pu focus in it, and return false.

function warnInvalid (theField, s)
{
    if( isInteractiveErrors()) {
	theField.focus()
	theField.select()
	alert(s)
    }
    else
    {
	// if first error set focus
	if ( isErrorListEmpty() )
	{
	    //theField.focus()
	    //theField.select()
	}
	addToErrorList(s)
    }

    return false
}
function reformatUSPhone (USPhone)
{   return (reformat (USPhone, "(", 3, ") ", 3, "-", 4));
}
function chkSpecialChar(obj){
	var spChar = "`~!@$%^&*()=|'{}[];,?/\<>_- ";
	var flag=false;
	var s = obj;
	 for (i = 0; i < s.length; i++) {
	   var c = s.charAt(i);
	   if (!(spChar.indexOf(c) == -1)) {
		   return false;
	   }
	}
	return true;
}
function chkSpecialCharExceptSpace(obj) {
    var spChar = "`~!@$%^&*()=|'{}[];,?/\<>_-";
    var flag = false;
    var s = obj;
    for (i = 0; i < s.length; i++) {
        var c = s.charAt(i);
        if (!(spChar.indexOf(c) == -1)) {
            return false;
        }
    }
    return true;
}
function chklowerChar(obj){
	var spChar = lowercaseLetters;
	var flag=false;
	var s = obj;
	 for (i = 0; i < s.length; i++) {
	   var c = s.charAt(i);
	   if (!(spChar.indexOf(c) == -1)) {
		   return false;
	   }
	}
	return true;
}
function chkupperChar(obj){
	var spChar = uppercaseLetters;
	var flag=false;
	var s = obj;
	 for (i = 0; i < s.length; i++) {
	   var c = s.charAt(i);
	   if (!(spChar.indexOf(c) == -1)) {
		   return false;
	   }
	}
	return true;
}

function chkSpecialCharQuestionMark(obj){
	var spChar = "?";
	var flag=false;
	var s = obj;
	 for (i = 0; i < s.length; i++) {
	   var c = s.charAt(i);
	   if (!(spChar.indexOf(c) == -1)) {
		   return false;
	   }
	}
	return true;
}


function chkForCommaOnly(obj){
	var spChar = "`~!@#$%^&*()+=|'{}[];<>?";
	var flag=false;
	var s = obj;
	 for (i = 0; i < s.length; i++) {
	   var c = s.charAt(i);
	   if (!(spChar.indexOf(c) == -1)) {
		   return false;
	   }
	}
	
	return true;
}

function chkForAsterixOnly(obj){
	var spChar = "`~!@#$%^&()+=|'{}[];<>?";
	var flag=false;
	var s = obj;
	 for (i = 0; i < s.length; i++) {
	   var c = s.charAt(i);
	   if (!(spChar.indexOf(c) == -1)) {
		   return false;
	   }
	}
	
	return true;
}


function chkForCommaPlusHashOnly(obj){
	var spChar = "`~!@$%^&*()=|'{}[];<>?";
	var flag=false;
	var s = obj;
	 for (i = 0; i < s.length; i++) {
	   var c = s.charAt(i);
	   if (!(spChar.indexOf(c) == -1)) {
		   return false;
	   }
	}
	
	return true;
}


function fnAllowOnly(num, obj){
	var len = obj.value.length;
	if(len > num){
		alert("You cannot enter more than "+ num +" characters in this field");
		obj.focus();
		return false;
	}
}

//function isValidEmail(e){
//	
//	var alnum="a-zA-Z0-9";
//	exp="^[^@\\s]+@(["+alnum+"+\\-]+\\.)+["+alnum+"]["+alnum+"]["+alnum+"]?$";
//	emailregexp = new RegExp(exp);

//	result = e.match(emailregexp);
//	if (result != null)
//		return true;
//	else
//		return false;
//}
//updated by rahul on 28-07-2021 to allow new emails like .tech
//function isValidEmail(e) {
//   var exp = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,20})+$/;
////    var alnum = "a-zA-Z0-9";
////    var exp = "^[^@\\s]+@([" + alnum + "+\\-]+\\.)+[" + alnum + "][" + alnum + "][" + alnum + "][" + alnum + "]?$";
//    emailregexp = new RegExp(exp);

//    result = e.match(emailregexp);
//    if (result != null)
//        return true;
//    else
//        return false;
//}
//updated by sanjay on 26-08-2021 for allowing 2 dots before @ in mail id
function isValidEmail(e) {
    // var exp = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,20})+$/;
    //var exp = /^\w+([\.-]?\w+)+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,20})+$/; 
    var exp = /^\w+([\.-]?\w+)+([\.-]?)@\w+([\.-]?\w+)(\.\w{2,20})+$/;//added by sanjay on 15-09-2021
    // var exp = "^([0-9a-zA-Z]([-\.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$";
    //    var alnum = "a-zA-Z0-9";
    //    var exp = "^[^@\\s]+@([" + alnum + "+\\-]+\\.)+[" + alnum + "][" + alnum + "][" + alnum + "][" + alnum + "]?$";
    emailregexp = new RegExp(exp);

    result = e.match(emailregexp);
    if (result != null)
        return true;
    else
        return false;
}

function fnRestrictHTML(){
	var key = event.keyCode;
	if(key==60 || key==62)
		window.event.returnValue = false
}		

function fnAllowOnlyNumbers(){
	var key = event.keyCode;
	if(!((key>47 && key<58) || (key == 46))){
		event.returnValue = false;
	}
}
function fnAllowOnlyNumbersWithOutDecimals(){
	var key = event.keyCode;
	if(!((key>47 && key<58))){
		event.returnValue = false;
	}
}

function isString(textObj){

	var newLength = textObj.length;
	var extraChars = ".-,' ";
	var search;
	for(var i=0;i!=newLength;i++){
		aChar = textObj.substring(i,i+1);
		aChar = aChar.toUpperCase();
		search = extraChars.indexOf(aChar);
		if (search == -1 && (!( isLetter(aChar) || isDigit(aChar))))
			return false;
	}
	return true;
}

function checkTextLimit(field, maxlen){
   if(field.value.length > maxlen)
	 warnInvalid(field, maxLength);
   if (field.value.length > maxlen)
      field.value = field.value.substring(0, maxlen);    
}

function charInString (c, s){   
	for (i = 0; i < s.length; i++){   
		if (s.charAt(i) == c) 
			return true;
    }
    return false
}

// Removes initial (leading) whitespace characters from s.
// Global variable whitespace (see above)
// defines which characters are considered whitespace.
function stripInitialWhitespace(s){

	var i = 0;
    while ((i < s.length) && charInString (s.charAt(i), whitespace))
       i++;

    return s.substring (i, s.length);
}
function popUp( url, name, width, height, scrollbars ) {
	var top  = "50";
	var left = "50";

	if( scrollbars == null ) scrollbars = "1"

	var str = "";
	str += "resizable=1,location=0,directories=0,toolbar=0,titlebar=0,menubar=0,status= 0,";
	str += "scrollbars=" + scrollbars + ",";
	str += "width=" + width + ",";
	str += "height=" + height + ",";
	str += "top=" + top + ",";
	str += "left=" + left;

	window.open( url, name, str );
}

//To check the URL is valid or not and also adds "http/https" is not present.
function validateURL(str){

	var toLower = str.toLowerCase();
	var adds="http://";
	var matchStr = "https://";
	var chk=toLower.substring(0,7);
	var sChk=toLower.substring(0,8);
	result = chk.match(adds);
	sResult = sChk.match(matchStr);

	if (result || sResult){
		return toLower;
	}else if(!result){
		for(i=toLower.length;i!=-1; i--){
			var concatString=toLower.charAt(i);
			concatString=adds+toLower;
		}
	}
	return concatString;
}

function sortArray(x,y)
{
	var a = String(x).toUpperCase(); 
	var b = String(y).toUpperCase(); 
	if (a > b) 
		return 1 
	if (a < b) 
		return -1 
	return 0;
}

function sortArrayMove(x, y) 
{ 
	var a = (x.text).toUpperCase(); 
	var b = (y.text).toUpperCase(); 
	if (a > b) 
		return 1 
	if (a < b) 
		return -1 
	return 0;
}

// Dual list move function
function move( srcList, destList) 
{
	if ( srcList.selectedIndex == -1 )
	{
		return;
	}
	
	newDestList = new Array( destList.options.length );
	var len = 0;
	
	for( len = 0; len < destList.options.length; len++ ) 
	{
		if ( destList.options[ len ] != null )
		{
			newDestList[ len ] = new Option( destList.options[ len ].text, destList.options[ len ].value, destList.options[ len ].defaultSelected, destList.options[ len ].selected );
		}
	}
	
	for( var i = 0; i < srcList.options.length; i++ ) 
	{ 
		if ( srcList.options[i] != null && srcList.options[i].selected == true  )
		{
			newDestList[ len ] = new Option( srcList.options[i].text, srcList.options[i].value, srcList.options[i].defaultSelected, srcList.options[i].selected );
			len++;
		}
	}

	newDestList.sort( sortArrayMove );

	for ( var j = 0; j < newDestList.length; j++ ) 
	{
		if ( newDestList[ j ] != null )
		{
			destList.options[ j ] = newDestList[ j ];
			destList.options[ j ].selected = false;
		}
	}
	
	for( var i = srcList.options.length - 1; i >= 0; i-- ) 
	{ 
		if ( srcList.options[i] != null && srcList.options[i].selected == true  )
		{
			srcList.options[i]       = null;
		}
	}
}

// Dual list moveAll function
function moveAll( srcList, destList) 
{
	newDestList = new Array( destList.options.length );
	var len = 0;
	
	for( len = 0; len < destList.options.length; len++ ) 
	{
		if ( destList.options[ len ] != null )
		{
			newDestList[ len ] = new Option( destList.options[ len ].text, destList.options[ len ].value, destList.options[ len ].defaultSelected, destList.options[ len ].selected );
		}
	}
	
	for( var i = 0; i < srcList.options.length; i++ ) 
	{ 
		if ( srcList.options[i] != null )
		{
			newDestList[ len ] = new Option( srcList.options[i].text, srcList.options[i].value, srcList.options[i].defaultSelected, srcList.options[i].selected );
			len++;
		}
	}

	newDestList.sort( sortArrayMove );

	for ( var j = 0; j < newDestList.length; j++ ) 
	{
		if ( newDestList[ j ] != null )
		{
			destList.options[ j ] = newDestList[ j ];
			destList.options[ j ].selected = false;
		}
	}
	
	for( var i = srcList.options.length - 1; i >= 0; i-- ) 
	{ 
		srcList.options[i]       = null;
	}
}

function convertToDate(day,month,year) {
	var date = null;
	if(day > 0 && month > 0 && year > 0) {
		date = new Date(year,(month-1),day);
	}	
	return date;
}	

function compareTwoDates(fromDate,toDate)
{			
	var submitValue = false;
	var errorString ="";
	if(fromDate != null && toDate != null) {
		if(fromDate <= toDate) {
			//return true;
		}
		else {
			errorString += lstFromToDates+eNewLine;					
		}
	}
	else {
	}
	return errorString;		
}

function compareFromToDates(fromDate,toDate)
{			
	var submitValue = false;
	var errorString ="";
	if(fromDate != null && toDate != null) {
		if(fromDate <= toDate) {
			return true;
		} 
		else {
			return false;
		}
	} 
	else {
		return true;
	}
	return submitValue;		
}

function isCheckBoxSelected(obj) {
	var isCheck = false;
	for(i=0;i<obj.length;i++) {
		if(obj[i].checked) {
			isCheck = true;
			break;
		}
	}
	return isCheck;
}




// funtion for equal hight 
function sortNum(a,b) { return b-a} 
function fixH2(one,two) {
	if (document.getElementById(one)) {
		var obj=new Array(2);
		var option=[one,two];
		for(var i=0; i<option.length; i++) {
			document.getElementById(option[i]).style.height="auto";
			obj[i]=document.getElementById(option[i]).offsetHeight;
			nh=obj.sort(sortNum);
			}		
	 	nh1=nh.splice(1,2);
		for(var i=0; i<option.length; i++) {
			document.getElementById(option[i]).style.height=nh+"px";
			}
	}
}

window.onload=function()
{fixH2('left_navigation','page_content'); }

//function show_hide(ids){
//	//alert(true);
//	var object = document.getElementById(ids);
//	object.style.display =(object.style.display=='block') ? 'none':'block'; 
//}

function show_hide2(ids, act){
	//alert(true);
	var object = document.getElementById(ids);
	if (act=='hide'){object.style.display='none';}
	else {object.style.display='block';}
}
function isNumberKey(evt)
{
    //var e = event || evt;
	var charCode = (evt.which) ? evt.which : event.keyCode
		if (charCode > 31 && (charCode < 48 || charCode > 57))
		{
			document.contactForm.namedUsers.value ='';
			return false;
		}
			return true;
}
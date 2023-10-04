var eNewLine = "\n";



ebirthDates="Please select Date of Birth "
//-- Error messages for login page
var eLoginId = "Please enter Login Name";
var ePassword ="Please enter Password";
var eValidationLoginidAndPassword="Login Name and Password combination is incorrect";
var eValidationLoginidAndPasswordError="An error occured during Login Name and Password validation";

//-- Error messages for change password page
eCurrentPassword = "Please enter Current Password";
eNewPassword = "Please enter New Password";
eConfirmPassword = "Please enter Confirm Password";
ePasswordMatchRegistration="Password and Confirm Password do not match";
ePasswordMatch = "New Password and Confirm Password do not match";
eValidPassword="(Password must be between 8 and 20 characters with at least one lower-case, one upper-case, one numeric and one special character)";
eValidateCurrentPassword="Current Password is not correct.";
eValidateCurrentPasswordError="An error occured during changing Password.";
ecurrentOTP = "Please enter OTP"; //added by rahul on 28-02-2018
eValidateCurrentOTPError = "Invalid OTP"; //added by rahul on 28-02-2018

//-- Error messages for forgot password page
eFirstName= "Please enter First Name";
eLastName= "Please enter Last Name";
ePinCode= "Please enter Pincode";
ePinCodeNumeric="Please enter numeric Pin code"
eLandLineNumberNumeric="Please enter numeric LandLine Number"
eMobileNumberNumeric="Please enter valid Mobile Number"
eMobileNumber="Please enter mobile number";
eUidNumeric="Please enter numeric UID";
eEmail = "Please enter Email Id";
eEmailValid = "Please enter valid Email Id";
eBirthDate = "Please select your Birth Date";
eBirthMonth = "Please select your Birth Month";
eBirthYear = "Please select your Birth Year";
eSecurityQuestion = "Please select Secret Question";
eYourAnswer = "Please enter Your Answer";
eCustDetailCheck="Details filled by user does not match";
eCustDetailCheckError="Error ocurred while checking customers details";
eSecretQuestionError="Error Occured while getting secret Question"
eAnswerCheck="Answer does not match. Please enter correct answer";
eAnswerCheckError="Error ocurred while verifying your answer Please try again";

//-- Error messages for Provide Feedback page
eFeedback = "Please enter your Feedback";
eFutureDateBirthDateCheck="Todays Date and future date is not allowed for BirthDate";
eFutureDateIncorporationDateCheck="Todays Date and future date is not allowed for Incorporation Date";

////-- Error messages for Eneregy Bill Calculator page
//eConsumption = "Please enter Consumption";
//eConsumptionNumber = "Consumption must be a non-negative number";
//eConsumptionNumberValid="Please enter valid Consumption"
//eTariff = "Please select your Tariff";
//eComType = "Please select Commercial Type";
//eConnectedLoad = "Please enter Connected Load";
//eConnectedLoadNumber = "Connected Load must be a non-negative number";
//eConnectedLoadNumberValid="Please enter valid Connected Load"
//eSanctionedLoad = "Please enter Sanctioned Load";
//eSanctionedLoadNumber = "Sanctioned Load must be a non-negative number";
//eSanctionedLoadNumberValid="Please enter valid Sanctioned Load"
//ePhase  = "Please enter Phase";
//eSelectYourArea  = "Please Select your Area";
eBU  = "Please Select your BU";


//-- Error messages for Registration page
eConsumerNumber = "Please enter your Consumer Number";
eConsumerType = "Please select Consumer Type"; 
eUID = "Please enter your UID"; 
eGender = "Please select your Gender"; 
eMaritalStatus = "Please select your Marital Status"; 
eCompanyName = "Please enter your Company/Organization Name";  
eContactPerson = "Please enter your Contact Person";  
eDateOfIncorporationDate = "Please select Date of Incorporation";  
eDateOfIncorporationMonth = "Please select Month of Incorporation";  
eDateOfIncorporationYear = "Please select Year of Incorporation"; 
eTypeofIncorporation = "Please enter your Type of Incorporation"; 
eSecretAnswer = "Please enter your Secret Answer"; 
eAddress1 = "Please enter your Address"; 
eVillageTownCity = "Please enter your Village/ Town/ City"; 
eLoginName = "Please enter your Login Name";
eCaptchaText  = "Please enter Captcha Text";
eValidateCaptcha="Image text and input text do not match";
eValidateCaptchaError="An error occured during image text validation";
eStateListError="Error occured while loading State List";

eAddConsumerExists="Error occured while adding Consumer Number";
eConsumerNumberNotExists="Consumer Number and BU combination does not exist";
eConsumerBillingDataNotExists="Consumer Billing Data not available";
eValidateConsumerNo_Bu="Error occured while checking Consumer Number and BU";
eAddConsumerSuccesfully="Consumer is added successfully";
eRemoveConsumerError="Error occured while removing element";
eRemoveConsumerSuccessfully="Consumer is removed successfully";
eFeebackLengthValidation="Maximum length of Feedback is 80 characters";
eFeedBackSuccessful="Feedback is sent successfully";
eFeedbackFailure="Error occured while sending feedback";
eSelectConsumer="Select any of the consumer from list";
eSavePreferencesSuccess="Information is saved successfully";
eSavePreferencesFailure="Error occured while saving preferences";
eValidationHtConsumer="HT Consumers are not allowed to make payment using this site";
eValidationBillingData="Billing data not available for this Consumer";

consumerEmailNotificationSuccess="Email notification is send successfully";
consumerEmailNotificationFail="Error occured while sending email notification";
sessionValidationMessage="Your Session has been expired please Login again"

//-- Error messages for Eneregy Bill Calculator page
//-- LT Bill Calculator
eSupplyType = "Please select Supply Type";
eTariff = "Please select Tariff";
eSanctionedLoad = "Please enter Sanctioned Load";
eSanctionedLoadNumber = "Sanctioned Load must be a non-negative number";
eConnectedLoad = "Please enter Connected Load";
eConnectedLoadNumber = "Connected Load must be a non-negative number";
ePhase  = "Please select Phase";
eConsumption = "Please enter Consumption";
eConsumptionNumber = "Consumption must be a non-negative number";
//-- HT Bill Calculator
eContractDemand = "Please enter Contract Demand";
eContractDemandNumber = "Contract Demand must be a non-negative number";
ePowerFactor = "Please enter Power Factor";
ePowerFactorNumber = "Power Factor must be between 0 and 1, upto 3 decimals";
eSlot1Kwh = "Please enter Slot 1 KWH";
eSlot1KwhNumber = "Slot 1 KWH must be a non-negative number";
eSlot1Kva = "Please enter Slot 1 KVA";
eSlot1KvaNumber = "Slot 1 KVA must be a non-negative number";
eSlot2Kwh = "Please enter Slot 2 KWH";
eSlot2KwhNumber = "Slot 2 KWH must be a non-negative number";
eSlot2Kva = "Please enter Slot 2 KVA";
eSlot2KvaNumber = "Slot 2 KVA must be a non-negative number";
eSlot3Kwh = "Please enter Slot 3 KWH";
eSlot3KwhNumber = "Slot 3 KWH must be a non-negative number";
eSlot3Kva = "Please enter Slot 3 KVA";
eSlot3KvaNumber = "Slot 3 KVA must be a non-negative number";
eSlot4Kwh = "Please enter Slot 4 KWH";
eSlot4KwhNumber = "Slot 4 KWH must be a non-negative number";
eSlot4Kva = "Please enter Slot 4 KVA";
eSlot4KvaNumber = "Slot 4 KVA must be a non-negative number";
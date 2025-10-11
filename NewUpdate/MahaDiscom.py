class MahaDiscom:
    def __init__(self):
        self.Serverurl = 'https://wss.mahadiscom.in/wss/'
        self.LightBillsNames = []
        self.LightBillsNos = []
        self.Captcha = ""
        self.BillDetails = {}
        self.ConsumerNo = ""
        self.BillName = ""

    # Read data file
    def readDataFile(self):
        f = open('data.json')
        data = json.load(f)
        self.LightBillsNames =  data['LightBillsNames']
        self.LightBillsNos = data['LightBillsNos'] 
        f.close()
    
    # Remove all files in output
    def removeAllFiles(self):
        files = os.listdir("Output/")
        for file in files:
            file_path = os.path.join("Output/", file)
            if os.path.isfile(file_path):
                os.remove(file_path)
        print("All files deleted successfully.")
        
    # Print Data File
    def printData(self):
        print(self.LightBillsNames)
        print(self.LightBillsNos)

    # Refresh Captcha
    def RefreshCaptcha(self, ConsumerNo , BillName ,  RequestSession):

        self.ConsumerNo = ConsumerNo
        self.BillName = BillName

        actionurl = 'wss?uiActionName=RefreshCaptchaViewPay&IsAjax=true'
        url = self.Serverurl + actionurl
        view_details = {
            'FormName': 'NewConnection'
        }
        response = RequestSession.get(url, data=view_details)

        
        try:
            captcha = json.loads(response.text)
        except ValueError as err:
            print("Unable to parse json response " + str(err))
            self.Captcha = ""
            return

        if response.status_code == 200:
            self.Captcha = captcha
            self.GetBillData( RequestSession)
            return

        print("ERROR: Return code is Non-2xx : %d" % response.status_code)
        self.Captcha = ""
        return

    # Get Bill Data 
    def GetBillData(self, RequestSession):
        actionurl = 'wss?uiActionName=postViewPayBill&IsAjax=true'
        url = self.Serverurl + actionurl
        
        view_details = {
            'txtInput': self.Captcha,
            'BuNumber': "",
            'ConsumerNo': self.ConsumerNo
        }
        response = RequestSession.post(url, data=view_details)
        try:
            billdetails = json.loads(response.text)
        except ValueError as err:
            print("Unable to parse json response " + str(err))
            self.BillDetails = {}
            return

        if response.status_code == 200:
            self.BillDetails = billdetails
            self.GetPrintHtmlData(  RequestSession)
            return

        print("ERROR: Return code is Non-2xx : %d" % response.status_code)
        self.BillDetails = {} 
        return

    # Get Printable Bill Data 
    def GetPrintHtmlData(self, RequestSession):
        actionurl = 'wss'
        url = self.Serverurl + actionurl
        
        billMonth = self.BillDetails["billMonth"]
        hdnLatestBillMonth = billMonth[:-5].upper() + " " + billMonth[-4:]
        hdnBillMonth = billMonth[:-5].upper() + "-" + billMonth[-4:]

        

        view_details = {
            'hdnConsumerNumber': self.ConsumerNo,
            'hdnBillMonth': hdnBillMonth,
            'isViaForm': "",
            'hdnLatestBillMonth' : hdnLatestBillMonth,
            'hdnLanguage': "1",
            'hdnBILLING_TARIFF_CODE': self.BillDetails["BILLING_TARIFF_CODE"],
            'hdnAccountID': "",
            'ddlLanguage': "1",
            'uiActionName': "getPrintBillingData",
            'consumerNumber': "",
            'BUnumber': "",
            'hdnAccountID': "",
        }
        
        response = RequestSession.post(url, data=view_details)
        try:
            
            html = response.content
            soup = BeautifulSoup(html, "html.parser")

        except ValueError as err:
            print("Unable to parse json response " + str(err))
            return

        if response.status_code == 200:
            for div1 in soup.find_all("div", {'class':'printButtonContainer'}): 
                div1.decompose()
            with open("WesiteData/index.html", "w" , encoding="utf-8") as file:
                file.write(str(soup))
            self.SaveHtmlAsPdf2()
            return

        print("ERROR: Return code is Non-2xx : %d" % response.status_code)
         
        return


    # Save html file as pdf
    # Required more dependencies or external software
    # it is very fast
    # font is not accurate  
    def SaveHtmlAsPdf(self):
        config = pdfkit.configuration(wkhtmltopdf = r"wkhtmltopdf\\bin\\wkhtmltopdf.exe")  
        options = {
            'page-size': 'A4',
                
            'margin-left': '0mm',
            'margin-right': '0mm',
            'margin-bottom': '0mm',
            'margin-top': '5mm',
            'disable-smart-shrinking': '',
            'no-outline': None,
            'dpi': 800,
            "enable-local-file-access": "",
            "print-media-type": None
        }
        billMonth = self.BillDetails["billMonth"]
        billMonth = billMonth[:-5].upper() + "_" + billMonth[-4:]
        fileName = "Output/"+ self.BillName + "_" +billMonth  +".pdf"
        pdfkit.from_file('WesiteData/index.html', fileName , configuration = config , options=options)  
        print(fileName + " Done ")
        print()
    
    # Save html file as pdf
    # not required external software
    # it is slow 
    # print is accurate  
    def SaveHtmlAsPdf2(self):
        
        billMonth = self.BillDetails["billMonth"]
        billMonth = billMonth[:-5].upper() + "_" + billMonth[-4:]
        fileName = "Output/"+ self.BillName + "_" +billMonth  +".pdf"

        path = os.path.abspath('WesiteData/index.html')
        converter.convert(f'file:///{path}', fileName)
        print(fileName + " Done ")
        print()
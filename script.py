import json
import requests
from bs4 import BeautifulSoup
import pdfkit  
import os
from pydrive.drive import GoogleDrive
from pydrive.auth import GoogleAuth
from pyhtml2pdf import converter

class GDrive:
    def __init__(self):
        self.DriveService = None
        self.LightBillMainID = None
        self.YearFolderID = None
        self.MonthFOlderID = None

    # Create a folder on Drive, returns the newely created folders ID
    def createRemoteFolder(self , folderName, parentID ):
        body = {
          'title': folderName,
          'parents': [{'id': parentID}], 
          'mimeType': "application/vnd.google-apps.folder"
        }
        folder = self.DriveService.CreateFile(body)
        folder.Upload()
        return folder['id']
        

    # Create Drive credentials
    def createCredintails(self):
        gauth = GoogleAuth()
        gauth.LoadCredentialsFile("mycreds.json")
        if gauth.credentials is None:
            gauth.LocalWebserverAuth()
        elif gauth.access_token_expired:
            gauth.Refresh()
        else:
            gauth.Authorize()
        gauth.SaveCredentialsFile("mycreds.json")
        self.DriveService = GoogleDrive(gauth)

    # Upload All files in that folder
    def uploadFile(self ):
        path = "Output"   
        fileList = self.GetAllFiles(self.MonthFOlderID)
        for fileName in os.listdir(path):
            ans = self.GetFolderIDbyTittle(fileName, fileList)
            if(ans==None):
                body = {
                    'title': fileName,
                    'parents': [{'id': self.MonthFOlderID}], 
                }
                file1 = self.DriveService.CreateFile(body)
                file1.SetContentFile(os.path.join(path, fileName))
                file1.Upload()
                #print('title: %s, id: %s' % (file1['title'], file1['id']))
                print(fileName + " Uploaded")
                file1 = None
            else:
                print(fileName + " Exists")


    # Get All list of files and folder by folder ID in drive
    def GetAllFiles(self, folderID):
        query_str = "\'" + folderID + "\'" + " in parents and trashed=false"   
        fileList = self.DriveService.ListFile({'q': query_str}).GetList()
        return fileList
        
    # Get folder ID from folder list by matching tittle
    def GetFolderIDbyTittle(self, title , fileList):
        for file1 in fileList:
            if file1['title']== title:
                return file1['id'] 
        return None

    # Search Folder in that Parent
    def SearchFolderNameByID(self, folderName, parentID):
        fileList = self.GetAllFiles(parentID)
        ans = self.GetFolderIDbyTittle(folderName, fileList)
        if ans==None:
            ans = self.createRemoteFolder(folderName, parentID)
            print("Created folder in drive with name " + folderName )
        return ans

       
    # Get Folder ID by
    def SetUploadFolderID(self , keyYear, KeyMonth):
        if(self.LightBillMainID==None):
            self.LightBillMainID = self.SearchFolderNameByID("LightBills","root")
        if(self.YearFolderID==None):
            self.YearFolderID  = self.SearchFolderNameByID(keyYear,self.LightBillMainID)
        if(self.MonthFOlderID==None):
            self.MonthFOlderID=  self.SearchFolderNameByID(KeyMonth,self.YearFolderID)
         
            


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

def main():
    mahadiscom = MahaDiscom()
    mahadiscom.removeAllFiles()
    mahadiscom.readDataFile()

    for i in range(0, len(mahadiscom.LightBillsNos)  ):
        with requests.Session() as SingleSession:
            mahadiscom.RefreshCaptcha(mahadiscom.LightBillsNos[i] , mahadiscom.LightBillsNames[i] , SingleSession )
        
    print("Drive Processing")
    Mydrive = GDrive()
    Mydrive.createCredintails()

    billMonth = mahadiscom.BillDetails["billMonth"]
    bMonth = billMonth[:-5].upper()
    bYear = billMonth[-4:]

    Mydrive.SetUploadFolderID(bYear,bMonth)
    Mydrive.uploadFile()
    
        
    

if __name__ == "__main__":
    main()
        

 

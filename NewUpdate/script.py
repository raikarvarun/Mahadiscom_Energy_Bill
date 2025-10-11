import json
import requests
from bs4 import BeautifulSoup
import pdfkit  
import os
from pydrive.drive import GoogleDrive
from pydrive.auth import GoogleAuth
from pyhtml2pdf import converter

from GDrive import GDrive
from MahaDiscom import MahaDiscom





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
        

 

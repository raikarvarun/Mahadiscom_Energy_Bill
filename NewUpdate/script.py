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
    billMonth = "FEB 2026"
    
    for language in [1,2]:
        mainFolderName = "LightBills"
        outDirName = "Output/"
        if language==2:
            outDirName = "OutputMar/"
            mainFolderName ="LightBillsMar"
        
        mahadiscom = MahaDiscom()
        mahadiscom.removeAllFiles(outDirName)
        mahadiscom.readDataFile()

        for i in range(0, len(mahadiscom.LightBillsNos)  ):
            with requests.Session() as SingleSession:
                mahadiscom.NewGetBillData(mahadiscom.LightBillsNos[i] , mahadiscom.LightBillsNames[i] , billMonth, language, outDirName, SingleSession )
            
        print("Drive Processing")
        Mydrive = GDrive()
        Mydrive.createCredintails()

    
        bMonth = billMonth[:-5].upper()
        bYear = billMonth[-4:]

        Mydrive.SetUploadFolderID(mainFolderName,bYear,bMonth)
        Mydrive.uploadFile(outDirName)
    
        
    

if __name__ == "__main__":
    main()
        

 

from BillCrypto import BillCryptos
import os
import json
import base64
from bs4 import BeautifulSoup
from pyhtml2pdf import converter
from selenium import webdriver
import time


class MahaDiscom:
    def __init__(self):
        self.Serverurl = 'https://wss.mahadiscom.in/wss/'
        self.LightBillsNames = []
        self.LightBillsNos = []
        self.BillMonth= ""
        self.BillName = ""
        self.BillCrypto = BillCryptos()
        
    
    
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

     # Get Bill Data 
    def NewGetBillData(self,ConsumerNo, BillName , BillMonth, RequestSession):
        
        self.ConsumerNo = ConsumerNo
        self.BillName = BillName
        self.BillMonth= BillMonth
        
        buNumber = "0876"
        actionurl = 'wss'
        url = self.Serverurl + actionurl
        
        view_details = {
            'hdnConsumerNumber': self.BillCrypto.encrypt(ConsumerNo),
            'hdnBillMonth' : self.BillCrypto.encrypt(BillMonth), 
            'hdnLanguage' : "1", 
            'hdnBILLING_TARIFF_CODE' : "090" , 
            'hdnBu': self.BillCrypto.encrypt(buNumber),
            'ddlLanguage' : "2", 
            'uiActionName' : "getPrintBillingData"
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
            for script in soup.find_all("script", src=True):
                src = script["src"]
                if src.startswith("/"):
                    script["src"] = src[1:]
            with open("WesiteData/index.html", "w" , encoding="utf-8") as file:
                file.write(str(soup))
                
            driver = webdriver.Chrome()
            self.SaveHtmlAsPdf(driver)
            driver.quit()
            return

        print("ERROR: Return code is Non-2xx : %d" % response.status_code)
         
        return
    
    
    
    #new version
    def SaveHtmlAsPdf(self, driver):
        # ---- Bill month formatting ----
        billMonth = self.BillMonth
        billMonth = self.BillName + "_" + billMonth[:-5].upper() + "_" + billMonth[-4:]
        # JAN 2026 -> JAN_2026

        # ---- Output setup ----
        output_dir = "Output"
        os.makedirs(output_dir, exist_ok=True)

        fileName = os.path.join(output_dir, f"{billMonth}.pdf")

        # ---- Load local HTML ----
        path = os.path.abspath("WesiteData/index.html")
        driver.get(f"file:///{path}")

        # ---- Wait for JS to fully render ----
        time.sleep(3)  # simple & reliable for local files

        # ---- Print to PDF using Chrome DevTools ----
        pdf = driver.execute_cdp_cmd(
            "Page.printToPDF",
            {
                "printBackground": True,
                "paperWidth": 8.27,    # A4 width (inches)
                "paperHeight": 11.69,  # A4 height
                "marginTop": 0.4,
                "marginBottom": 0.4,
                "marginLeft": 0.4,
                "marginRight": 0.4
            }
        )

        # ---- Save PDF ----
        with open(fileName, "wb") as f:
            f.write(base64.b64decode(pdf["data"]))

        print(fileName, "Done")
        
        
    # Save html file as pdf
    # older version  
    def SaveHtmlAsPdf2(self, driver):
        billMonth = "JAN 2026"
        billMonth = billMonth[:-5].upper() + "_" + billMonth[-4:]
        # JAN 2026 -> JAN_2026

        output_dir = "Output"
        os.makedirs(output_dir, exist_ok=True)

        fileName = os.path.join(output_dir, "test.pdf")

        path = os.path.abspath("WesiteData/index.html")

        # Open local HTML in browser
        driver.get(f"file:///{path}")

        # Give JS time to load (important)
        driver.implicitly_wait(3)

        # Selenium 4 native PDF generation (NO private APIs)
        pdf = driver.execute_cdp_cmd(
            "Page.printToPDF",
            {
                "printBackground": True,
                "paperWidth": 8.27,   # A4 width (inches)
                "paperHeight": 11.69  # A4 height (inches)
            }
        )

        # Write PDF
        with open(fileName, "wb") as f:
            f.write(base64.b64decode(pdf["data"]))

        print(fileName, "Done")
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
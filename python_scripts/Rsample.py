import cv2

class Resample():
    def __init__(self, coverImageName, secretImageList):
        coverImage = cv2.imread(coverImageName)
        [r,c,d] = coverImage.shape
        totalSpace = r*c*d
        self.status = 'can fit'
        flag = True
        self.resampleIndex = 1
        self.oldImageList = []
        for secretImageName in secretImageList:
            secretImage = cv2.imread(secretImageName)
            self.oldImageList.append(secretImage)

        while(flag):
            spaceRequired = 0
            for secretImage in self.oldImageList:
                [row, col, depth] = secretImage.shape
                spaceRequired += row*col*depth*4
            
            if(totalSpace - spaceRequired > 0):
                flag = False
                break
            else:
                newImageList = []
                self.resampleIndex += 1
                for secretImage in self.oldImageList:
                    for i in range(0, self.resampleIndex):
                        newSecretImage = cv2.pyrDown(secretImage)
                    newImageList.append(newSecretImage)  
                self.oldImageList = newImageList.copy()

            if self.resampleIndex == 4:
                self.status = 'cannot fit'
                break
        
    def getImageList(self):
        return self.oldImageList

    def getResampleIndex(self):
        return self.resampleIndex

    def getStatus(self):
        return self.status
    

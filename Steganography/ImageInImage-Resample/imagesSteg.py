import cv2
import os

class HideImageInImage:
    def __init__(self):
        self.binary_list = []
        self.d_binary = []
        self.l = 0
        self.x = 0
        self.y = 0
        self.z = 0
    
    def modpix(self, num):
        s = list(format(num, '08b'))
        s[7] = self.binary_list[self.l]
        self.l += 1
        s[6] = self.binary_list[self.l]
        k = "".join(s)
        modnum = int(k, 2)
        self.l += 1
        return modnum

    def bindata(self, data):
        s = format(data, '08b')
        self.binary_list += s
    
    def checkEncode(self, coverImageName, secretImageNameList):
        encodeableImages = 0
        coverImage = cv2.imread(coverImageName)
        [row, col, depth] = coverImage.shape
        totalSpaceAvailable = row*col*depth
        for secretImageName in secretImageNameList:
            secretImage = cv2.imread(secretImageName)
            [srow, scol, sdepth] = secretImage.shape
            secretImageSize = srow*scol*sdepth*4
            totalSpaceAvailable -= secretImageSize
            if(totalSpaceAvailable >= 0):
                encodeableImages += 1
                continue
            else:
                break
        return encodeableImages

    def encode(self, coverImageName, secretImageNameList):
        self.binary_list = []
        self.d_binary = []
        self.l = 0
        self.x = 0
        self.y = 0
        self.z = 0
        if os.path.exists("key_file.txt"):
            os.remove("key_file.txt")
        img = cv2.imread(coverImageName)
        coverImage = img.copy()
        for secretImageName in secretImageNameList:
            secretImage = cv2.imread(secretImageName)
            [row, col, _] = coverImage.shape
            k=0
            while k<3:
                for i in range(0, secretImage.shape[0]):
                    for j in range(0, secretImage.shape[1]):
                        self.bindata(secretImage[i,j,k])
                k += 1
            length = len(self.binary_list)
            while self.z < 3:
                if self.l == length:
                    break
                for i in range(self.x, row):
                    if self.l == length:
                        break
                    elif(i == self.x):
                        for j in range(self.y, col):
                            if self.l == length:
                                break
                            coverImage[i,j,self.z] = self.modpix(coverImage[i,j,self.z])
                    else:
                        for j in range(0, col):
                            if self.l == length:
                                break
                            coverImage[i,j,self.z] = self.modpix(coverImage[i,j,self.z])
                self.z += 1
                self.x = 0
                self.y = 0
            self.z -= 1
            self.x = i
            self.y = j
            self.binary_list.clear()
            self.l = 0
            with open("key_file.txt", "a") as keys:
                keys.write(f"{secretImage.shape[0]}\n{secretImage.shape[1]}\n")
            
        cv2.imwrite("newCoverImage.png", coverImage)
        print("Encoded image saved as newCoverImage.png")

    def bin(self, key1, key2):
        for i in range(0, key1*key2*3):
            s = self.binary_list[(8*i):(8*(i+1))]
            b = "".join(s)
            num = int(b,2)
            self.d_binary.append(num)

    def genbin(self, num):
        s = format(num, '08b')
        self.binary_list += s[7]
        self.binary_list += s[6]
    
    def decode(self, coverImageName, keyFileName):
        self.x = 0
        self.y = 0
        self.z = 0
        self.l = 0

        with open(keyFileName) as keys:
            key_list = keys.readlines()
            key_list = [int(key.strip()) for key in key_list]
        numberOfImages = int(len(key_list)/2)

        for g in range(0, numberOfImages):
            self.binary_list = []
            self.d_binary = []
            key1 = key_list.pop(0)
            key2 = key_list.pop(0)
            self.l = key1*key2*8*3

            coverImage = cv2.imread(coverImageName)
            [row, col, _] = coverImage.shape

            for j in range(self.y, col):
                if(len(self.binary_list) == self.l):
                    break
                self.genbin(coverImage[self.x,j,self.z])
            if(self.x == row-1):
                self.z = self.z+1
                self.x = 0
            else:
                self.x = self.x+1

            while(self.z < 3):
                if(len(self.binary_list) == self.l):
                    break
                for i in range(self.x, row):
                    if(len(self.binary_list) == self.l):
                        break
                    for j in range(0, col):
                        if(len(self.binary_list) == self.l):
                            break
                        self.genbin(coverImage[i,j,self.z])
                self.x = 0
                self.z += 1
               
            self.z = self.z-1
            self.x = i
            self.y = j

            k = 0
            pos = 0
            i = 0
            j = 0

            self.bin(key1, key2)
            img = cv2.imread("blackmod.png")
            img1 = img.copy()
            blackImage = cv2.resize(img1, (key2, key1))
            while(k < 3):
                for i in range(0, key1):
                    for j in range(0, key2):
                        blackImage[i,j,k] = self.d_binary[pos]
                        pos = pos+1
                k = k+1
            cv2.imwrite(f"decodedImage{g+1}.png", blackImage)


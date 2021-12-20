import sys
import cv2
from Rsample import Resample
from imagesSteg import HideImageInImage


coverImageName = str(sys.argv[1])
secretImageNames = str(sys.argv[2]).split(',')
secretImageNameList = secretImageNames.copy()

obj = Resample(coverImageName, secretImageNameList)
status = obj.getStatus()
resampleIndex = obj.getResampleIndex()
if(status == 'can fit'):
    imageList = obj.getImageList()
    i = 0
    for image in imageList:
        cv2.imwrite(secretImageNames[i], image)
        i += 1
    obj2 = HideImageInImage()
    value = obj2.checkEncode(coverImageName, secretImageNameList)       
    print(f"no of encodable images is {value} out of {len(secretImageNames)}")
    keyFileName = str(sys.argv[3])
    newCoverImageName = str(sys.argv[4])
    obj2.encode(coverImageName, secretImageNameList, keyFileName, newCoverImageName, resampleIndex)
else:
    print(status)
    print("Too many secrets!")
    print('Try to reduce the no of secret Images')

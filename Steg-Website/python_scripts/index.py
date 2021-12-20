import sys
# from imagesSteg import HideImageInImage
# from resampling import ResampleImages
import cv2
from Rsample import Resample
# #code for hiding multiple images inside a cover Image
# #Encoding ->
# obj = HideImageInImage()
# #always pass the resampled images for encoding
# secretImageNameList = ['Rbird.jpg', 'Rlion.jpg', 'Roffice.jpg', 'Rbutterfly.jpg', 'Rfox.jpg']
# coverImageName = 'newCoverImage.png'

# #always check if there is enough space in the cover image to hide all the secret images
# n = obj.checkEncode(coverImageName, secretImageNameList)
# print(n)
# #n tells the no of images that can be encoded in the cover image

# obj.encode(coverImageName, secretImageNameList)

# #Decode ->
# dec = HideImageInImage()
# dec.decode(coverImageName,'key_file.txt')

# #code for resampling images specified in the list
# #note - python 3.9 does not support resample use python 3.7 or python 3.8
filename1 = str(sys.argv[1])
filename2 = str(sys.argv[2])
# filename1 = 'D:/web_dev/stegApp/python_scripts/bird.jpg'
# filename2= 'D:/web_dev/stegApp/python_scripts/building.jpg'
secretImageNameList = [filename1]
coverImageName = filename2

obj = Resample(coverImageName, secretImageNameList)
imageList = obj.getImageList()
for image in imageList:
    cv2.imwrite('D:/web_dev/stegApp/python_scripts/bird2.jpg', image)

print(f"Resample Index: {obj.getStatus()}")
print(f"Resample Index: {obj.getResampleIndex()}")

sys.stdout.flush()
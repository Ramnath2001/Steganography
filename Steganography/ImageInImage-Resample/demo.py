from imagesSteg import HideImageInImage
from resampling import ResampleImages

# #code for hiding multiple images inside a cover Image
# #Encoding ->
# obj = HideImageInImage()
# #always pass the resampled images for encoding
# secretImageNameList = ['Rbird.jpg', 'Rlion.jpg', 'Roffice.jpg', 'Rbutterfly.jpg', 'Rfox.jpg']
# coverImageName = 'newCoverImage.png'

# #always check if there is enough space in the cover image to hide all the secret images
# n = obj.checkEncode(coverImageName, secretImageNameList)
# print(n)
# #n tells the no of images that can be ecoded in the cover image

# obj.encode(coverImageName, secretImageNameList)

# #Decode ->
# dec = HideImageInImage()
# dec.decode(coverImageName,'key_file.txt')

# #code for resampling images specified in the list
# #note - python 3.9 does not support resample use python 3.7 or python 3.8
secretImageNameList = ['bird.jpg', 'lion.jpg', 'office.jpg', 'butterfly.jpg', 'fox.jpg']
for secretImageName in secretImageNameList:
    obj = ResampleImages(secretImageName)


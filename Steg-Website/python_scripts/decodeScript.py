import sys
import cv2
from imagesSteg import HideImageInImage

coverImageName = str(sys.argv[1])
keyFileName = str(sys.argv[2])
userId = str(sys.argv[3])

obj = HideImageInImage()
obj.decode(coverImageName, keyFileName, userId)
rsIndex = obj.getResampleIndex()
print(f'resample index: {rsIndex}')
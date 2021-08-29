import cv2
import numpy as np
from scipy.fftpack import dct,idct
import math

from EnhancedStegano import *

e = ESteg()

cover = cv2.imread('image_source/img.png')
b_cover,g_cover,r_cover = cv2.split(cover)

#reading images to insert
img1 = cv2.imread('image_source/Sample-Fingerprint-Image.png')
img2 = cv2.imread('image_source/img2.png')
img3 = cv2.imread('image_source/img3.png')
img4 = cv2.imread('image_source/img4.png')

key1 = e.EncodeFinal(img1,b_cover,0)
key2 = e.EncodeFinal(img2,b_cover,1)
key3 = e.EncodeFinal(img3,g_cover,0)
key4 = e.EncodeFinal(img4,g_cover,1)

print("Encoding Done")
#merging
newCover = cv2.merge([b_cover,g_cover,r_cover])

cv2.imwrite('EncodedImage.png', newCover)



#DECODING---------------------------DECODING---------------------------DECODING--------------------DECODING------
cover = cv2.imread('EncodedImage.png')
b_cover,g_cover,r_cover = cv2.split(cover)

keydec1 = key1[0]
keydec2 = key2[0]
keydec3 = key3[0]
keydec4 = key4[0]

newimg1 = e.decodeFinal(b_cover,keydec1,0,key1[1],key1[2],False)
newimg2 = e.decodeFinal(b_cover,keydec2,1,key2[1],key2[2],False)
newimg3 = e.decodeFinal(g_cover,keydec3,0,key3[1],key3[2],False)
newimg4 = e.decodeFinal(g_cover,keydec4,1,key4[1],key4[2],False)

cv2.imwrite('idct1.png', newimg1)

def mse(imageA, imageB):
	err = np.sum((imageA.astype("float") - imageB.astype("float")) ** 2)
	err /= float(imageA.shape[0] * imageA.shape[1])
	
	return err


sensorData = cv2.imread('image_source/Sample-Fingerprint-Image.png')
authData = cv2.imread('idct1.png')
prob = mse(sensorData,authData)
print(prob)
check = mse(sensorData,sensorData)
print(check)

cv2.imwrite('idct2.png', newimg2)
cv2.imwrite('idct3.png', newimg3)
cv2.imwrite('idct4.png', newimg4)

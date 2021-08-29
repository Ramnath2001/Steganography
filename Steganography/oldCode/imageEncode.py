import cv2
import numpy as np
import time
# import matlab.engine

#img = np.zeros((400,400,3))
#OriginalImg = cv2.imread('mountain.jpg')
# eng = matlab.engine.start_matlab()
# eng.resamplingImages(nargout=0)
# eng.quit()
img = cv2.imread('50mountain.jpg')
coverimg = cv2.imread('building.jpg')
newimg = coverimg.copy()
[row, col, depth] = newimg.shape

newd = []
l = 0
def modpix(num):
    s = list(format(num, '08b'))
    global newd
    global l
    s[7] = newd[l]

    k = "".join(s)
    
    modnum = int(k, 2)
    l += 1
    return modnum

def bindata(data):
    global newd
    s = format(data, '08b')
    newd += s    

print("Encoding in process.... pls wait")
k=0
while k<3:
    for i in range(0,img.shape[0]):
        for j in range(0,img.shape[1]):
            bindata(img[i,j,k])
    
    k += 1

length = len(newd)


for i in range(0, row):
    
    if l == length:
        break
    for j in range(0, col):
        if l == length:
            break
        newimg[i,j,0] = modpix(newimg[i,j,0])

print("Encoding done.")
print("Key1: {key1}".format(key1 = i))
print("Key2: {key2}".format(key2 = j))
print("Key3: {key3}".format(key3 = img.shape[0]))
print("key4: {key4}".format(key4 = img.shape[1]))

cv2.imwrite('compare.png', newimg)
print("Encode image saved as Mark4.png")


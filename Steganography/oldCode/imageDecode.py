import cv2
import numpy as np

img = cv2.imread('newCoverImage.png')
[row, col, d] = img.shape

start1 = 0
start2 = 0
newd = []
binary = []
def bin():
    global newd
    global binary
    for i in range(0,key3*key4*3):
        s = newd[(8*i):(8*(i+1))]
        b = "".join(s)
        num = int(b,2)
        binary.append(num)

def genbin(num):
    global newd
    s = format(num, '08b')
    newd += s[7]
    newd += s[6]


key1 = int(input("Enter key1: "))
key2 = int(input("Enter key2: "))
keyD = int(input("Enter keyD: "))
key3 = int(input("Enter key3: "))
key4 = int(input("Enter key4: "))
print("Decoding in process... pls wait.")

k=0
depth = keyD
l = key3*key4*8*3
print(l)
for j in range(key2,col):
    if(len(newd) == l):
        break
    genbin(img[key1,j,depth])

if(key1 == row-1):
    k = keyD+1
    start = 0
else:
    k = keyD
    start = key1+1


while(k<3):
    if(len(newd) == l):
        break
    for i in range(start,row):
        if(len(newd) == l):
            break
        for j in range(0,col):
            if(len(newd) == l):
                break
            genbin(img[i,j,k])
    start = 0
    k += 1

bin()
img1 = cv2.imread('blackmod.png')
black  = cv2.resize(img1, (key4,key3))
print(i)
print(j)
print(k)
k = 0
l = 0
while(k<3):
    for i in range(0,key3):
        for j in range(0,key4):
            black[i,j,k] = binary[l]
            l = l+1
    k = k+1

print("Decoding done.")
cv2.imwrite('hiddenImage.png', black)    

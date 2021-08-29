import cv2
import numpy as np

newd = []
l = 0

coverimg = cv2.imread('building.jpg')
newimg = coverimg.copy()
start1 = 0
start2 = 0
depth = 0


def modpix(num):
    s = list(format(num, '08b'))
    global newd
    global l
    s[7] = newd[l]
    l += 1
    s[6] = newd[l]
    k = "".join(s)
    modnum = int(k, 2)
    l += 1
    return modnum


def bindata(data):
    global newd
    s = format(data, '08b')
    newd += s


def encode(name):
    global newd
    img = cv2.imread(name)
    global newimg
    [row, col, d] = newimg.shape

    print("Encoding in process.... pls wait")
    k=0
    while k<3:
        for i in range(0,img.shape[0]):
            for j in range(0,img.shape[1]):
                bindata(img[i,j,k])

        k += 1

    length = len(newd)

    global start1
    global start2
    global depth
    global l

    while depth<3:
        if l == length:
            break
        for i in range(start1, row):
            if l == length:
                break
            elif(i == start1):
                for j in range(start2, col):
                    if l == length:
                        break
                    newimg[i,j,depth] = modpix(newimg[i,j,depth])
            else:
                for j in range(0, col):
                    if l == length:
                        break
                    newimg[i,j,depth] = modpix(newimg[i,j,depth])

        depth += 1
        start1 = 0
        start2 = 0
    
    depth -= 1
    start1 = i
    start2 = j
    print("Encoding done.")
    print("Key1: {key1}".format(key1 = i))
    print("Key2: {key2}".format(key2 = j))
    print("depth: {dept}".format(dept = depth))
    print("Key3: {key3}".format(key3 = img.shape[0]))
    print("key4: {key4}".format(key4 = img.shape[1]))

    cv2.imwrite('Mark4.png', newimg)
    print("Encode image saved as Mark4.png")

    newd.clear()
    l=0

    
def main():
    
    for i in range(0,1):
        name = input("Enter filename with extension: ")
        encode(name)


if __name__ == "__main__":
    main()
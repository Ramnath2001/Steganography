class ESteg:
	import cv2
	import numpy as np
	from scipy.fftpack import dct,idct
	
	##encode
	
	def dct2(a):
	    return dct(dct(a.T, norm='ortho').T, norm='ortho')
	
	def DecToBin(resizedImg):
	    data = []
	    size = 0                  
	    for i in resizedImg:
	        i = int(10*i)           ########
	        i = str(i)
	        if (int(i)<0):
	            i = 0 - int(i)
	            i = str(i)
	            data.append("101")
	            size= size + 3
	        for k in range(0,len(i)):
	            bi = bin(int(i[k])).replace("0b","")
	            while len(bi)!=4:
	                bi = "0" + bi
	            data.append(bi)
	            size = size+4
	        data.append("11")
	        size = size+2
	    return data, size
	
	def ImageToBin(img):
	    keyx = img.shape[0]
	    keyy = img.shape[1]
	    print(keyx, keyy)
	    resizedImg = img.reshape(-1)
	    data, size = DecToBin(resizedImg)
	    print(size)
	    return data, size, keyx, keyy
	
	def DCTResize(img,imgBool = True):
	    img = dct2(img)
	    if(imgBool):
	        pixelSizex = 40*img.shape[0]//100
	        pixelSizey = 40*img.shape[1]//100
	    else:
	        pixelSizex = img.shape[0]
	        pixelSizey = img.shape[1]
	    newImg = img[0:pixelSizex, 0:pixelSizey]
	    return newImg  
	
	def Encode(channel, data, half):
	    x = channel.shape[0]
	    y = channel.shape[1]
	    print(y)
	    channel = channel.reshape(-1)
	    if(half==0):
	        a=0
	        for i in data:
	            for j in i: 
	                for k in range(0,len(j)):
	                    l = int(j[k])
	                    if l > channel[a]%2:
	                        channel[a] = channel[a]+1
	                    if l < channel[a]%2:
	                        channel[a] = channel[a]-1
	                    a+=1
	        newChannel = np.asarray(channel)
	        newChannel = newChannel.reshape((x, y))
	    else:
	        a = int((x*y/2) + 1)
	        for i in data:
	            for j in i: 
	                for k in range(0,len(j)):
	                    l = int(j[k])
	                    if l > channel[a]%2:
	                        channel[a] = channel[a]+1
	                    if l < channel[a]%2:
	                        channel[a] = channel[a]-1
	                    a+=1
	        newChannel = np.asarray(channel)
	        newChannel = newChannel.reshape((x, y))
	    return newChannel
	
	def EncodeFinal(img,cover,half,imgBool = True):
	    b_img,g_img,r_img = cv2.split(img)
	    newb_img = DCTResize(b_img,imgBool)
	    newg_img = DCTResize(g_img,imgBool)
	    newr_img = DCTResize(r_img,imgBool)
	    imgDatab, sizeb, keyx, keyy = ImageToBin(newb_img)
	    imgDatag, sizeg, keyx, keyy = ImageToBin(newg_img)
	    imgDatar, sizer, keyx, keyy = ImageToBin(newr_img)
	    imgData1 = [imgDatab, imgDatag, imgDatar]
	    Encode(cover ,imgData1, half)
	    keydec = sizeb + sizeg + sizer
	    return (keydec,keyx,keyy)
	
	##decode
	
	def IDCT(img):
	    img = idct2(img)
	    return img
	
	def BinToImage(keyx, keyy, data):
	    dec = BintoDec(data)
	    newImage = np.asarray(dec)
	    newImage = newImage.reshape(keyx,keyy)
	    return newImage
	
	def idct2(a):
	    return idct(idct(a.T, norm='ortho').T, norm='ortho')    
	
	def BintoDec(data):
	    dec = []
	    for i in range(0,len(data)):
	        d = str(data[i])
	        a = "" 
	        e = (len(d))/4
	        if(d[:3])=="101":
	            a = "-"
	            d = d[3:]
	        while(len(d)!=0):        
	            a = a + str(int(d[:4],2))
	            d = d[4:]
	        #if (a!="" and a!="-"):
	        a = int(a)
	        a = a/10          #############
	        dec.append(a)
	    return dec
	
	def Decode(channel, key, half):
	    x = channel.shape[0]
	    y = channel.shape[1]
	    channel = channel.reshape(-1)
	    newChannel = []
	    b = ""
	    c = ""
	    a = 0
	    if(half==0):
	        for i in range(0,key):
	            b = b + str(channel[i]%2)
	            if(b=="11"):
	                newChannel.append(c)
	                b = ""
	                c = ""
	            if(b=="101"):
	                c = c+b
	                b = ""
	            if(len(b)==4):
	                c = c+b
	                b=""
	        newChannel = np.asarray(newChannel)
	    else:
	        a = int((x*y/2)+1)
	        for i in range(0,key):
	            b = b + str(channel[a+i]%2)
	            if(b=="11"):
	                newChannel.append(c)
	                b = ""
	                c = ""
	            if(b=="101"):
	                c = c+b
	                b = ""
	            if(len(b)==4):
	                c = c+b
	                b=""
	        newChannel = np.asarray(newChannel)
	    return newChannel
	
	def decodeFinal(channel, keydec, half,keyx,keyy,fingerprint = True):
	    channel1 = Decode(channel, keydec, half)
	    channel1 = channel1.reshape(3,keyx*keyy)
	    imgDatab = BinToImage(keyx, keyy, channel1[0])
	    imgDatag = BinToImage(keyx, keyy, channel1[1])
	    imgDatar = BinToImage(keyx, keyy, channel1[2])
	    if(not fingerprint):
	        x = 100*keyx//40
	        y = 100*keyy//40
	    else:
	        x = keyx
	        y = keyy
	    blank_imageb = np.zeros(shape=[x+1, y+1])
	    blank_imageg = np.zeros(shape=[x+1, y+1])
	    blank_imager = np.zeros(shape=[x+1, y+1])
	    blank_imageb[0:keyx,0:keyy] = imgDatab
	    blank_imageg[0:keyx,0:keyy] = imgDatag
	    blank_imager[0:keyx,0:keyy] = imgDatar
	    newImgb = IDCT(blank_imageb)
	    newImgg = IDCT(blank_imageg)
	    newImgr = IDCT(blank_imager)
	    newImg1 = cv2.merge([newImgb, newImgg, newImgr])
	    return newImg1
	

from hide_text_image import HideTextInImage

# #Encoding ->
enc = HideTextInImage("coverImageName.jpg", "SecretTextFileName.txt")
result = enc.validate() #result is either true of false. To check if the text data fits inside the image
enc.encode()

# #Decoding ->
dec = HideTextInImage("EncodedImageName.png", "KeyFileName.txt")
dec.decode()
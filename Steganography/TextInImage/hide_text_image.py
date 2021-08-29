import cv2
import random


class HideTextInImage:
    def __init__(self, image_name, filename):
        self.image_filename = image_name
        self.image = cv2.imread(image_name)
        self.filename = filename
        self.binary_list = []
        self.string_name = ""
        self.c = 1
        self.bin8 = ""

    def validate(self):
        with open(self.filename) as file:
            data = file.read()
        [row, col, _] = self.image.shape

        if len(data) * 8 > row * col:
            return False
        else:
            return True

    def modify_pixel(self, num):
        char_list = list(str(format(num, '08b')))
        char_list[7] = self.binary_list[0]
        self.binary_list.pop(0)
        k = "".join(char_list)
        modified_number = int(k, 2)
        return modified_number

    def encode(self):
        copy_image = self.image.copy()
        [row, col, _] = self.image.shape
        with open(self.filename) as file:
            data = file.read()

        data_length = len(data) * 8
        q = int(data_length / col) + 1
        key1 = random.randint(1, row-q-1)
        key2 = random.randint(1, col-1)

        for i in data:
            char_list = list(format(ord(i), '08b'))
            self.binary_list += char_list
        a = 1
        for i in range(key1 - 1, row):
            if a == (len(data) * 8) + 1:
                break
            elif i == key1 - 1:
                for j in range(key2 - 1, col):
                    if a == (len(data) * 8) + 1:
                        break
                    else:
                        copy_image[i, j, 0] = self.modify_pixel(self.image[i, j, 0])
                        a += 1
            else:
                for j in range(0, col):
                    if a == (len(data) * 8) + 1:
                        break
                    else:
                        copy_image[i, j, 0] = self.modify_pixel(self.image[i, j, 0])
                        a += 1
        key3 = i
        key4 = j

        with open("key_file.txt", "w") as keys:
            keys.write(f"{key1-1}\n{key2-1}\n{key3-1}\n{key4}")

        new_image_name = "encrypted_image.png"
        cv2.imwrite(new_image_name, copy_image)

    def decrypt(self, num):
        s = list(str(format(num, '08b')))
        self.bin8 += s[7]
        if self.c % 8 == 0:
            ch = chr(int(self.bin8, 2))
            self.string_name += ch
            self.bin8 = ''
        self.c += 1

    def decode(self):
        with open(self.filename) as keys:
            key_list = keys.readlines()
            key_list = [int(key.strip()) for key in key_list]

        key1 = key_list[0]
        key2 = key_list[1]
        key3 = key_list[2]
        key4 = key_list[3]
        [_, col, _] = self.image.shape

        for i in range(key1, key3 + 1):
            if i == key3 and i == key1:
                for j in range(key2, key4 + 1):
                    self.decrypt(self.image[i, j, 0])
            elif i == key3:
                for j in range(0, key4 + 1):
                    self.decrypt(self.image[i, j, 0])
            elif i == key1:
                for j in range(key2, col):
                    self.decrypt(self.image[i, j, 0])
            else:
                for j in range(0, col):
                    self.decrypt(self.image[i, j, 0])

        with open("secret_text.txt", "w") as file:
            file.write(self.string_name)
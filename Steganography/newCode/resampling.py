import resample

class ResampleImages():
    def __init__(self, filename):
        self.rs = resample.initialize()
        self.r = self.rs.resampleImages(filename)

    def get_r(self):
        return self.r


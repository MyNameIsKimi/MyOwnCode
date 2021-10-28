from typing import Any, Iterable, TypeAlias
import requests, time, datetime, os

class MyError(Exception):
    pass
class DataError(MyError):
    pass
class OperatingError(MyError):
    pass

class Father:
    def __init__(self) -> None:
        self.ec = "utf-8"

    def setEc(self, ec):
        self.ec = ec

    def getEc(self):
        return self.ec

class CountApplicationRunTime:

    def __init__(self) -> None:
        self.runTime = 0.0
        self.startTime = 0.0
        self.stopTime = 0.0
    def applicationStart(self):
        self.startTime = time.perf_counter()
        return self.startTime
    def applicationStop(self):
        self.stopTime = time.perf_counter()
        return self.stopTime
    def countFinal(self):
        self.runTime = self.stopTime - self.startTime
        return self.runTime

class WebPage(Father):
    def __init__(self, url):
        super().__init__()
        self.__URL = url
        self.__HEADER = {"user-agent": 
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"}
    def getURL(self) -> str:
        return self.__URL

    def getHEADER(self) -> dict:
        return self.__HEADER

    def setURL(self, url):
        self.__URL = url

    def setHEADER(self, header):
        self.__HEADER = header

    def content(self) -> bytes:
        return requests.get(self.__URL, headers=self.__HEADER).content

    def text(self) -> str:
        t = requests.get(self.__URL, headers=self.__HEADER)
        t.encoding = self.ec
        t = t.text
        return t
    
    def writeB(self, file_path, methods="wb", prompt=False) -> None or False:
        result = None
        try:
            open(file_path, methods).write(self.content())
        except FileNotFoundError:
            result = False
            if prompt == True:
                raise OperatingError("If the file does not exist, open the file in 'w' mode.")
        return result

    def writeS(self, file_path, methods="w", encode=None, prompt=False) -> None or False:
        result = None
        if encode == None:
            try:
                open(file_path, methods, encoding=self.ec).write(self.text())
            except FileNotFoundError:
                result = False
                if prompt == True:
                    raise OperatingError("If the file does not exist, open the file in 'w' mode.")
        else:
            try:
                open(file_path, methods, encoding=encode).write(self.text())
            except FileNotFoundError:
                result = False
                if prompt == True:
                    raise OperatingError("If the file does not exist, open the file in 'w' mode.")    
        return result


class MyStr(Father, str):
    def __init__(self, text) -> None:
        super().__init__()
        self.__TEXT = str(text.encode("utf-8"), encoding="utf-8")
        self.isUTF_8 = True
    
    def reloadText(self):
        if self.getEc() != "utf-8":
            self.isUTF_8 = False
            self.__TEXT = self.__TEXT.encode("utf-8")
        else:
            self.__TEXT = self.__TEXT.decode(self.ec)

    def setEc(self, ec):
        self.ec = ec
        self.reloadText()
        return None

    def getText(self) -> str:
        return self.__TEXT

    def setTEXT(self, text):
        self.__TEXT = text
    
    def decimalPlaces(self, num) -> str:
        seg = self.__TEXT.split(".")
        contrast = []
        for i in range(45, 58):
            if i == 47:
                continue
            contrast.append(i)
        if len(seg) > 2 or len(seg) < 1:
            raise DataError("The object must be a floating-point type")
        for i in list(self.__TEXT):
            if ord(i) in contrast:
                continue
            raise DataError("Illegal character found!!!")
        f = seg[1]
        result = ""
        if len(f) >= num:
            result = seg[0] + "."
            for i in range(0, num):
                result += f[i]
        else:
            result += self.__TEXT+(num-len(f))*"0"
        return result

    def countInt(self) -> int:
        result = 0
        for word in self.__TEXT:
            try:
                word = int(word)
                result += 1
            except ValueError:
                pass
        return result

    def countText(self) -> int:
        if self.__TEXT == None:
            print("bad")
        result = 0
        for word in self.__TEXT:
            try:
                word = int(word)
            except ValueError:
                result += 1
        return result

    def judgeCh(self) -> bool:
        if len(self.__TEXT) != 1:
            raise DataError("The judge object should have only one character")
        TF = False
        for i in range(65,91):
            if i == ord(self.__TEXT):
                TF = False
                return TF
            else:
                TF = True
        for i in range(97,123):
            if i == ord(self.__TEXT):
                TF = False
                return TF
            else:
                TF = True
        for i in range(48, 58):
            if i == ord(self.__TEXT):
                TF = False
                return TF
            else:
                TF = True
        return TF

    def toList(self) -> list:
        '''
        用途:接收一个字符串，排除掉重复的字符，将每一个字符(按第一次出现的顺序(区别于Python内置的"set"函数))单独列举出来;
        '''
        texts = []
        for word in self.__TEXT:
            if word not in texts:
                texts.append(word)
        return texts

    def statisticalTextNum(self) -> list:
        '''
        用途:接收一个字符串，统计每个字符出现的次数，将该字符与其出现的次数打包为一个元组，存储在最终返回的列表对象里;
        '''
        result = []
        x = []
        for word in self.__TEXT:
            if word not in x:
                x.append(word)
                num = 0    
                for word1 in self.__TEXT:
                    if word1 == word:
                        num += 1
                result.append((word,num))
        return result

    def findAnyText(self, target) -> int:
        '''
        用途：返回指定字符在字符串中第一次出现的位置
        '''
        x = 0
        isFind = False
        for i in self.__TEXT:
            if i == target:
                x += 1
                isFind = True
                break
            x += 1
        if isFind == False:
            x = None
        return x

class MyMath:

    def factorial(number: int) -> int:
        if number < 1:
            return None
        elif number == 1:
            return 1
        else:
            return myMath.factorial(number - 1) * number

    def A(up, down):
        result = 1
        for i in range(up):
            result *= down
            down -= 1 
        return result

    def C(up, down):
        return MyMath.A(up, down) / MyMath.A(up, up)


class MyTool(MyError):
    def __init__(self) -> None:
        pass

    def elementCount(array: list | dict, element) -> int | bool:
        result = False
        for i in array:
            if i == element:
                result += 1
        if type(result) == bool:
            result = None
            return result

        return result


    def equalsIterable(x: list | dict, y: list | dict) -> bool:
        result = False
        x_length = len(x)
        y_length = len(y)
        box = []
        if x_length != y_length:
            return result
        for i in x:
            if i in box:
                continue
            else:
                box.append(i)
                if MyTool.elementCount(x, i) == MyTool.elementCount(y, i):
                    continue
                else:
                    return result
        result = True
        return result

    def listRange(arrary: list):
        '''
        类似于js的for in, 每次yield数组的下标
        '''
        count = 0
        for i in arrary:
            yield count
            count += 1

    def getLastPath():
        '''
        返回当前的最后一个盘符
        '''
        now = "D:\\"
        u = []
        for i in range(ord("A"), ord("Z") + 1):
            u.append(i + ":\\")
        for p in u:
            try:
                os.listdir(p)
            except FileNotFoundError:
                now = u[u.index(p) - 1]
                break
        return now
    def eachCompare(ob, obBox, ifNum=False) -> bool or dict:
        '''
        用途：若第一个参数与第二个参数(列表，元组，字典)中任意一个元素值相等，便返回True,
        若第三个参数"ifNum"为真，便会附带返回匹配元素的下标
        '''
        result = False
        num = 0
        resultNum = ()
        for i in obBox:
            num += 1
            if i == ob:
                result = True
                break
        if ifNum == True:
            resultNum = (result, num)
            return resultNum
        return result

    def switch(ob, dicts, case=None):
        '''
        用途：返回参数2(字典)中「键」与参数1的值相等的元素的值，即使有多个元素的「键」与参数1的值相同，也只返回第一个与之相同元素的值
        '''
        result = None
        key = None
        for i in dicts:
            if i == ob:
                key = i
                break
        if key is None:
            return case
        result = dicts[key]
        return result
    
    def ListToStr(ob) -> str:
        result = ""
        for i in ob:
            result += str(i)
        return result

    def addZero(num,length) -> str:
        num_length = len(str(num))
        completion = int(length-num_length)*"0"
        result = completion+str(num)
        return result
    
    def listSort(ob) -> list:
        '''
        基于sort函数对列表中的元素进行排序，优先级: 数字 > 字母 >  英文字符串 > 中文字符串
        字符串排序依据是: "(1)短前长后" and "(2)中前英后"，优先级: (1) > (2)
        '''
        upper = [i  for i in range(ord("a"), ord("z")+1)]
        lower = [i  for i in range(ord("A"), ord("Z")+1)]
        num = []
        alphabet = []
        text = []
        for i in ob:
            try:
                i = int(i)
                num.append(i)
            except ValueError:
                try:
                    if MyTool.eachCompare(ord(i), upper) or MyTool.eachCompare(ord(i), lower):
                        alphabet.append(i)
                        continue
                except TypeError:
                    text.append(i)
                else:
                    text.append(i)
        num.sort()
        alphabet.sort()
        for i in text:
            if i[0] in upper or i[0] in lower:
                continue
            if len(i) > text.index(i)+1 and text.index(i) != len(text)-1:
                text[text.index(i)], text[text.index(i)+1] = text[text.index(i)+1], text[text.index(i)]
        result = num+alphabet+text
        return result
    
    def connect(arr, fetter):
        result = ""
        for i in arr:
            result += str(i)
            result += fetter
        result = result[0:-1]
        return result
    def setListLength(arr: list, length: int):
        return arr[0:length]
class Time:
    # 2021-09-04 14:16:50.872586
    def __init__(self):
        self.__NOW = MyStr(str(datetime.datetime.now()))
        self.__YEAR = self.__NOW.getText()[0:4]
        self.__MONTH = self.__NOW.getText()[5:7]
        self.__TODAY = self.__NOW.getText()[8:10]
        self.__HOUR = self.__NOW.getText()[11:13]
        self.__MINUTES = self.__NOW.getText()[14:16]
        self.__SECONDS = self.__NOW.getText()[17:19]
        self.__SMALLER = self.__NOW.getText()[20::]
        self.__HMS = self.__NOW.getText()[11:19]
    def now(self):
        return self.__NOW

    def thisHMS(self):
        return self.__HMS

    def thisYear(self):
        return self.__YEAR
    
    def thisMonth(self):
        result = 0
        month = self.__MONTH
        if month[0] == "0":
            result = month[1]
        else:
            result = month
        return result
    
    def today(self):
        result = 0
        thisDay = self.__TODAY
        if thisDay[0] == "0":
            result = (thisDay[1], "D")
        else:
            result = (thisDay, "D")
        return result
    
    def thisHour(self):
        result = -1
        hour = self.__HOUR
        if hour[0] == "0":
            result = (hour[1], "H")
        else:
            result = (hour, "H")
        return result
    
    def thisMinutes(self):
        result = -1
        minutes = self.__MINUTES
        if minutes[0] == "0":
            result = (minutes[1], "M")
        else:
            result = (minutes, "M")
        return result

    def thisSeconds(self):
        result = -1
        seconds = self.__SECONDS
        if seconds[0] == "0":
            result = seconds[1]
        else:
            result = seconds
        return result
    
    def smaller(self):
        return self.__SMALLER
    
    def correctTime(t: str): # 静态函数
        # 规范时间格式，比如"2-23-25" -> "02-23-25"
        sep = ""
        result = ""
        for i in t:
            try:
                i = int(i)
            except ValueError:
                sep = i
                break
        arr = t.split(sep)
        for i in range(len(arr)):
            if len(arr[i]) >= 3:
                result = "wdnmd"
                break
            elif len(arr[i]) == 1:
                arr[i] = str("0" + arr[i])
        result = MyTool.connect(arr, sep)
        return result

    def toSeconds(times: dict) -> int: # 静态函数
        # 将天, 时, 分转换成秒，需要在后面跟上标识: (2, "M")
        num, types = times
        result = 0
        ITS = {"D": 86400, "H": 3600, "M": 60}
        result = num * MyTool.switch(types, ITS)
        return result

    def twelveHourOrTwentyFourHour(times: str): # 静态函数
        # 二十四小时制和十二小时制相互转换
        try:
            hour = int(times[0:2])
        except ValueError:
            hour = int(MyStr("0" + times[0:2])[0:2])
        result = ""
        if hour >= 12:
            hour = hour % 12
            if hour == "0":
                hour += "0"
            result = str(hour)+times[2::]
        elif hour < 12:
            hour += 12
            result = str(hour) +times[2::]
        result = Time.correctTime(result)
        return result
    
    def timeGap(time1: str, time2: str) -> str:

        #获得天的数量
        day1 = time1[0:2]
        day2 = time2[0:2]
        day = int(day2) - int(day1) - 1
        # print(day)
        #获得时的数量
        hour1 = time1[3:5]
        hour2 = time2[3:5]
        hour = 24 - int(hour1) + int(hour2)
        # print(hour)
        #获得分的数量
        minutes1 = time1[6:8]
        minutes2 = time2[6:8]
        minutes = 60 - int(minutes1) + int(minutes2)
        # print(minutes)
        #获得秒的数量
        seconds1 = time1[9:11]
        seconds2 = time2[9:11]
        seconds = 60 - int(seconds1) + int(seconds2)
        # print(seconds)

        result = 0
        if (int(hour) == 24 and int(minutes) == 60) and int(seconds == 60):
            day += 1
            result = Time.toSeconds((day, "D"))
            return result
        
        result += Time.toSeconds((day, "D"))
        result += Time.toSeconds((hour, "H"))
        result += Time.toSeconds((minutes, "M"))
        result += int(seconds)
        return result

    def nowGap(target_time: str) -> str:
        now = MyTool.connect([Time().today()[0], Time().thisHour()[0], Time().thisMinutes()[0], Time().thisSeconds()], '-')
        now = Time.correctTime(now)
        result = Time.timeGap(now, target_time)
        return result
        
if __name__ == "__main__":
    pass
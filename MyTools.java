import java.util.Scanner;
public class MyTools {
    //构造函数
    // public MyTools(){
    //     System.out.println("Welcome to my tools...");
    // }

    //类似Python的input函数
    public static String input(String msg){
        System.out.print(msg);
        Scanner scanner = new Scanner(System.in);
        String result = scanner.nextLine();
        scanner.close();
        return result;
    }

//    个位数字符转数字
    public static short charToShort(char num){
        short result = 0;
        switch (num){
            case '0':
                break;
            case '1':
                result =  1;
                break;
            case '2':
                result = 2;
                break;
            case '3':
                result = 3;
                break;
            case '4':
                result = 4;
                break;
            case '5':
                result = 5;
                break;
            case '6':
                result = 6;
                break;
            case '7':
                result = 7;
                break;
            case '8':
                result = 8;
                break;
            case '9':
                result = 9;
                break;
        }
        return result;
    }

    //翻转数组
    public static char[] reversed(String array){
        char[] arr = array.toCharArray();
        int len = array.length();
        char[] result = new char[len];
        int num = len-1;
        for (int i = 0; i < len; i++){
            char now = arr[i];
            if (num == -1){
                break;
            }
            result[num] = now;
            num -= 1;
        }
        return result;

    }


    //类似Python的int函数
    public static int Int(String num) {
        char[] num1 = reversed(num);
        int result = 0;
        int jz = 1;
        for (int i = 0; i < num.length(); i++) {
            if (i == 0) {
                result += charToShort(num1[0]);
                continue;
            }
            jz *= 10;
            int nowNUmber = charToShort(num1[i]);
            result += nowNUmber * jz;

        }
        return result;
    }
    //批量打印
    public static void printSpecifiedNumberOf(Object msg, int num){
        for (int i = 0; i < num; i++){
            System.out.print(msg);
        }
    }
    public static void printSpecifiedNumberOf(Object msg, int num, Object end){
        for (int i = 0; i < num; i++){
            System.out.print(msg);
            System.out.print(end);
        }
    }
    //遍历打印，for循环效果
    public static void stringErgodic(String array){
        for (char a: array.toCharArray()){
            System.out.println(a);
        }
    }

    public static String replace(String array, char target){
        int delAtNum = 0;
        int num = 0;
        for (char a : array.toCharArray()){
            if (a == target){
                delAtNum += 1;
                continue;
            }
        }
        int returnLength = array.length() - delAtNum;
        char[] arr = new char[returnLength];
        for (char a : array.toCharArray()){
            if (a == target) {
                continue;
            }else {
                arr[num] = a;
                num += 1;
            }
        }
        String result = String.valueOf(arr);
        return result;
    }
    //实现Python的切片效果
    public static String slice(String array, String range){
        char[] range1 = new char[range.length()];
        int num = 0;
        for (char a : range.toCharArray()){
            if (a == ':'){
                if (num == 1){
                    num += 1;
                    continue;
                }
                range1[num] = '0';
                num += 1;
                continue;
            }else {
                range1[num] = a;
                num += 1;
            }
        }
        range = String.valueOf(range1);
        if (range.length() < 3){
            System.out.println("参数格式错误...");
            return null;
        }

        int start = charToShort(range.toCharArray()[0]);
        int stop = charToShort(range.toCharArray()[2]);
        if (range.toCharArray()[2] == '0'){

            stop = array.length();
        }
        char[] result = new char[array.length()];
        int arrayNum = 0;
        int resultNum = 0;
        for (; arrayNum < array.length(); arrayNum++){
            if (arrayNum < start | arrayNum >= stop){
                continue;
            }
            result[resultNum] = array.toCharArray()[arrayNum];
            resultNum += 1;
        }
        String finalResult = String.valueOf(result).trim();
        return finalResult;
    }
    //找浮点数里面的最小数
    public static int minimal(int[] array){
        int result = array[0];
        for (int i : array) {
            if (i < result){
                result = i;
            }
        }
        return result;
    }
    //字符串转整型数组
    public static int[] stringToIntArray(String target){
        // int numInts = 0;
        //String: "{1, 12, 123}" -> out: {1, 12, 123}

        return new int[6];
    }
    //类似于Python的type函数，用来判断对象的类型
    public static String type(String obj){
        return "<class 'String'>";
    }
    public static String type(String[] obj){
        return "<class 'StringArray'>";
    }
    public static String type(char obj){
        return "<class 'char'>";
    }
    public static String type(char[] obj){
        return "<class 'charArray'>";
    }
    public static String type(byte obj){
        return "<class 'byte'>";
    }
    public static String type(byte[] obj){
        return "<class 'byteArray'>";
    }
    public static String type(short obj){
        return "<class 'short'>";
    }
    public static String type(short[] obj){
        return "<class 'shortArray'>";
    }
    public static String type(int obj){
        return "<class 'int'>";
    }
    public static String type(int[] obj){
        return "<class 'intArray'>";
    }
    public static String type(float obj){
        return "<class 'float'>";
    }
    public static String type(float[] obj){
        return "<class 'floatArray'>";
    }
    public static String type(double obj){
        return "<class 'double'>";
    }
    public static String type(double[] obj){
        return "<class 'doubleArray'>";
    }
    public static String type(boolean obj){
        return "<class 'boolean'>";
    }
    public static Object type(Object obj){
        Object getClass = obj.getClass();
        String objectType = String.valueOf(getClass);
        return objectType;
    }
    //分割字符串，以指定字符的方式，类似Python的split函数
    public static String[] split(String array, char delimiter){
        String[] result = new String[99];
        int num = 0;
        StringBuffer sb = new StringBuffer();
        String transfer;
        for (char a : array.toCharArray()){
            if (a != delimiter){
                // System.out.println(a);
                sb.append(a);
                continue;
            }else{
                transfer = stringBufferToString(sb);
                result[num] = transfer;
                num += 1;
                sb.delete(0, sb.length());
            }
        }
        transfer = stringBufferToString(sb);
        result[num] = transfer;
        result = stringArrayThinBody(result, null);
        return result;
    }
    public static StringBuffer stringToStringBuffer(String str){
        StringBuffer result = new StringBuffer();
        result.append(str);
        return result;
    }
    public static String stringBufferToString(StringBuffer sb){
        String result = String.valueOf(sb);
        return result;
    }
    //数组删除指定元素
    public static String[] stringArrayThinBody(String[] array, Object delimiter){
        int num = 0;
        for (String a : array){
            if (a != delimiter){
                num += 1;
                continue;
            }
        }
        String[] result = new String[num];
        num = 0;
        for (String a : array){
            if (a != delimiter){
                result[num] = a;
                num += 1;
                continue;
            }
            
        }
        return result;
    }
    //print函数
    public static void print(String join, Object ...objects){
        for (Object i : objects){
            System.out.print(i + join);
        }
    }
    public static void print(Object ...objects){
        for (Object i : objects){
            System.out.print(i);
        }
    }
}

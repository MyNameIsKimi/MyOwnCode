class MyTools{

    max(array){
        var result = array[0];
        for (let i of array){
            if (i > result){
                result = i;
            }
        }
        return result;
    }
    min(array){
        var result = array[0];
        for (let i of array){
            if (i < result){
                result = i;
            }
        }
        return result;
    }

    sort(arr){
        var x;
        var result = new List(arr);
        for (let i = result.array().length - 1; i > 0; i--){
            for (let j = 0; j < i; j++){
                if (result.array()[j] > result.array()[j+1]){
                    x = result.array()[j];
                    result.change(j, result.array()[j+1]);
                    result.change(j+1, x);
                }
            }
        }
        return result.array();
        
    }
    
    arrayToString(array){
        var result = "";
        for (let i of array){

            result += i;
        }
        return result;
    }
    getBig(x, y){
        if (typeof(x) != "number" | typeof(y) != "number"){
            throw new Error("Need to int...");
        }
        return x > y ? x: y;
    }
    floatOperation(operations){
        var x, y, result, ope;
        var counter = 1;
        if (this.contains(operations, '+')){
            x = operations.split('+')[0];
            y = operations.split('+')[1];
            ope = '+';
        }else if (this.contains(operations, '-')){
            x = operations.split('-')[0];
            y = operations.split('-')[1];
            ope = '-';
        }else if (this.contains(operations, '*')){
            x = operations.split('*')[0];
            y = operations.split('*')[1];
            ope = '*';
        }
        x = parseFloat(x);
        y = parseFloat(y);
        switch (ope){
            case '+':
                result = this.floatAdd(x, y);
                break;
            case '-':
                if (x > y){
                    while (this.contains(String(y), '.')){
                        y *= 10;
                        counter *= 10;
                    }
                }
                x *= counter;
                result = (x - y) / counter;
                break;
            case '*':
                while (this.contains(String(x), '.') | this.contains(String(y), '.')){
                    if (this.contains(String(x), '.')){
                        x *= 10;
                        counter *= 10;
                    }else{
                        y *= 10;
                        counter *= 10;
                    }
                }
                result = x * y / counter;

        }
        return result;
    }


    floatAdd(x, y){
        var result = NaN;
        var x_float = 0;
        var y_float = 0;
        for (let i = 0; i < String(x).length; i++){
            if (String(x)[i] === '.'){
                x_float += i+1;
            }
        }
        for (let i = 0; i < String(y).length; i++){
            if (String(y)[i] === '.'){
                y_float += i+1;
            }
        }
        var x_float_length = String(x).length - x_float;
        var y_float_length = String(y).length - y_float;
        var effective = this.getBig(x_float_length, y_float_length);
        var add = x + y;
        add = String(add);
        var f = "";
        var yes = false;
        for (let i of add){
            if (i === '.'){
                yes = true;
                continue;
            }else if (yes === true){
                f += i;
            }
        }
        var float_content = this.stringToList(f).slice(0, effective);
        // console.log(float_content.array());
        float_content = this.arrayToString(float_content);
        var num_content = "";
        for (let i of add){
            if (i === '.'){
                break;
            }
            num_content += i;
        }
        result = num_content + '.' + float_content;
        return parseFloat(result);
    }


    isTheArray(obj){
        var result = false;
        if (obj.__proto__ === Array.prototype){
            result = true;
        }
        return result;
    }
    TypeEquals(x, y){
        var result = false;
        if (x.__proto__ === y.__proto__){
            result = true;
        }
        return result;
    }

    equals(x, y){
        var result = false;
        if (typeof(x) === "object"| typeof(y) === "object"){
            throw new Error("TypeError: Object type cannot be 'object'");
        }
        // else if (typeof(x) === "number" && typeof(y) === "number"){
        //     if (x - y < 1e8 | y - x < 1e8){
        //         result = true;
        //     }
        // }
        else if (typeof(x) != typeof(y)){
            return result;
        }
        else if (x === y){
            result = true
        }
        return result;
    }

    contains(text, target){
        var result = false;
        if (text.indexOf(target) != -1){
            result = true;
        }
        return result;
    }

    eachPrint(array){
        for (let i = 0; i < array.length; i++){
            this.print(array[i]);
        }
    }

    print(...objs){
        for (let i of objs){
            console.log(i);
            
        }
    }
    
    addZero(text,num){
        var zeroLength = num - String(text).length;
        var result = "";
        for (let i = 0; i < zeroLength; i++){
            result += "0";
        }
        result += String(text);
        return result;
    }

    stringToList(str){
        var result = new List([]);
        for (let i of str){
            result.append(i);
        }
        return result;
    }
    
    range(start, stop){
        var array = [];
        var s = start;
        while (s < stop){
            array.push(s);
            s += 1;
        }
        return array
    }



}

class List{
    #array
    #startValue
    constructor(array){
        if (arguments.length == 0){
            this.#startValue = new Array();
            this.#array = new Array();
        }
        else if (array.__proto__ != Array.prototype){
            var type = String(typeof(array));
            throw new Error(`TypeError: need to get an \"Array\", but get an \"${type}\"`)
        }else{
            this.#startValue = array;
            this.#array = array;
        }

        
    }

    array(){
        return this.#array;
    }

    length(){
        return this.#array.length;
    }
    forEach(func){
        for (let i in this.array()){
            func(this.array()[parseInt(i)])
        }
    }

    reset(){
        this.#array = this.#startValue;
    }

    reversed(){
        var length = this.#array.length;
        var result = new List();
        var x;
        for (let i = length - 1; i >= 0; i--){
            result.append(this.#array[i]);
        }
        this.#array = result.#array;
    }

    toString(){
        var result = "";
        for (let i of this.#array){
            result += i;
        }
        return result;
    }


    clear(){
        this.#array = [];
    }

    originalSort(){
        this.#array.sort();
    }

    sort(){
        var x;
        var result = new List(this.#array);
        for (let i = result.array().length - 1; i > 0; i--){
            for (let j = 0; j < i; j++){
                if (result.array()[j] > result.array()[j+1]){
                    x = result.array()[j];
                    result.change(j, result.array()[j+1]);
                    result.change(j+1, x);
                }
            }
        }
        this.#array = result.#array
    }

    append(obj){
        this.#array.push(obj);

    }

    delete(obj){
        var final = [];
        for (let i of this.#array){
            if (i != obj){
                final.push(i);
            }
        }
        this.#array = final;
    }

    pop(){
        this.#array.pop();
    }
    
    push(obj){
        this.#array.push(obj);
    }

    shift(obj){
        this.#array.shift(obj);
    }

    unshift(){
        this.#array.unshift();
    }

    change(index, obj){
        this.#array[index] = obj;
    }

    slice(start, stop){
        var result = new List([]);
        if (start < 0 | stop > this.#array.length){
            throw new Error("ElenmentError!!: stop > array.length or start < 0");
        }
        for (let i = 0; i < this.#array.length; i++){
            if (i >= start && i < stop){
                result.append(this.#array[i]);
            }
        }
        return result.array();
    }
    
    // 这个函数好像没什么卵用~
    // toArray(){
    //     var result = [];
    //     for (let i of this.#array){
    //         result.push(i);
    //     }
    //     return result;
    // }

    containsElenmentCount(elenment){
        var result = false;
        if (new MyTools().contains(this.#array, elenment)){
            result = 0;
            for (let i of this.array()){
                if (i === elenment){
                    result += 1;
                }
            }
        }
        return result;
    }

    getValueByString(string){
        var result = new List([]);
        for (let i of string){
            result.append(i);
        }
        return result;
    }
}

// class Integer{

//     getNumberByChar(target_char){
//         var value = new Map([['1', 1], ['2', 2], ['3', 3], ['4', 4],
//                             ['5', 5], ['6', 6], ['7', 7], ['8', 8],
//                             ['9', 9], ['0', 0]]);
//         for (let i of value){
//             if (i[0] === target_char){
//                 return value.get(i[0]);
//             }
//         }
//         throw new Error("InputNotIsNumber...")
//     }

//     int(number_text){
//         var numbers = new List().getValueByString(number_text);
//         numbers.reversed();
//         var results = new List();
//         for (let i in numbers){
//             i = parseInt(i)就离谱呀，我写这个函数就是为了实现这个功能,又绕回来了，我忘了js类型转换的函数名，准备自己写一个，写到这想起来了...
//         }
//     }
// }

class MyMath{
    random(start, stop){
        if (start > stop){
            throw new Error("\"start\" should be smaller than \"stop\"")
        }
        var root = Math.random();
        root = new List(new List().getValueByString(String(root)).slice(2, String(root).length)).toString();
        var num_length = String(stop).length;
        root = new List(new List().getValueByString(root).slice(0, num_length)).toString();
        root = parseInt(root);
        while (root < start | root > stop){
            root = Math.random();
            root = new List(new List().getValueByString(String(root)).slice(2, String(root).length)).toString();
            num_length = String(stop).length;
            root = new List(new List().getValueByString(root).slice(0, num_length)).toString();
            root = parseInt(root);
        }
        return root;
    }
}
module.exports = {
    MyTools,
    List,
    MyMath,
}

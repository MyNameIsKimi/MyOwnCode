class MyTools{

    static mapLength(map){
        var len = 0;
        for (let i of map){
            len++;
        }
        return len
    }

    static ord(character){
        if (character.length === 1 && character.__proto__ === String.prototype){
            return character.charCodeAt()
        }
        throw new Error("\"character\" must be A character")
    }

    static chr(charCode){
        return String.fromCharCode(charCode)
    }

    static sort(arr){
        var x;
        var result = new List(arr);
        for (let i = result.array().length - 1; i > 0; i--){
            for (let j = 0; j < i; j++){
                if (result.array()[j] > result.array()[j+1]){
                    x = result.array()[j];
                    result.set(j, result.array()[j+1]);
                    result.set(j+1, x);
                }
            }
        }
        return result.array();
        
    }

    static isIterable(obj){
        var result = true
        try{
            for (let i of obj){
                break
            }
        }catch(TypeError){
            result = false
        }
        return result
    }


    static getBig(x, y){
        if (typeof(x) != "number" | typeof(y) != "number"){
            throw new Error("Need to int...");
        }
        return x > y ? x: y;
    }


    static floatAdd(x, y){
        let x1 = x;
        let y1 = y;
        if (new List(String(x)).contains(".") === undefined && new List(String(y)).contains(".") === undefined){
            return x + y
        }
        let x_multiple = 1;
        let y_multiple = 1;
        while (new List(String(x)).contains('.')){
            x *= 10;
            x_multiple *= 10;
        }
        while (new List(String(y)).contains('.')){
            y *= 10;
            y_multiple *= 10;
        }
        x = x1;
        y = y1;
        x *= x_multiple > y_multiple? x_multiple: y_multiple;
        y *= x_multiple > y_multiple? x_multiple: y_multiple;
        // return [x_multiple, y_multiple]
    
        let result = x + y;
        let zero_count = new List(String(x_multiple > y_multiple? x_multiple: y_multiple)).elenmentCount().get("[0]")
        if (String(result).length <= zero_count){
            result = MyTools.addZero(String(result), zero_count + 1)
        }
        result = String(result)
        let temp = new List(result)
        temp.reversed()
        temp.afterInsert(zero_count - 1, '.')
        temp.reversed()
        result = ""
        for (let i of temp.array()){
            result += i
        }
        return parseFloat(result)
    }


    static isTheArray(obj){
        var result = false;
        if (obj.__proto__ === new Array().__proto__){
            result = true;
        }
        return result;
    }

    static typeEquals(x, y){
        var result = false;
        if (x.__proto__ === y.__proto__){
            result = true;
        }
        return result;
    }

    static eachPrint(array){
        for (let i = 0; i < array.length; i++){
            this.print(array[i]);
        }
    }

    static print(...objs){
        for (let i of objs){
            console.log(i);
            
        }
    }
    
    static addZero(text,num){
        var zeroLength = num - String(text).length;
        var result = "";
        for (let i = 0; i < zeroLength; i++){
            result += "0";
        }
        result += String(text);
        return result;
    }

    static stringToList(str){
        var result = new List([]);
        for (let i of str){
            result.append(i);
        }
        return result;
    }
    
    static range(start, stop){
        if (stop === undefined){
            stop = start
            start = 0
        }
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
    constructor(iterable){
        if (arguments.length == 0){
            this.#array = new Array();
        // 判断对象是否可迭代(其实不是很严谨这样判断，可以尝试用for来判断)
        }else if (typeof(iterable[Symbol.iterator]) === "function"){
            this.#array = new Array();
            for (let i of iterable){
                this.push(i)
            }
        }
        else if (iterable.__proto__ != new Array().__proto__){
            // var type = String(typeof(array));
            // throw new Error(`TypeError: need to get an \"Array\", but get an \"${type}\"`)
            this.#array = [iterable]
        }else{
            this.#array = iterable;
        }

        
    }

    indexOf(ele){
        var result = 0
        for (let i in this.#array){
            if (Array.isArray(ele) && Array.isArray(this.#array[parseInt(i)])){
                if (new List(ele).absEquals(new List(this.#array[parseInt(i)]))){
                    return parseInt(i)
                }
            }else if (this.#array[parseInt(i)] === ele){
                return parseInt(i)
            }
        }
        return false
    }

    array(){
        return this.#array;
    }

    length(){

        return this.#array.length;
    }

    forEach(func){
        for (let i of this.array()){
            func(i)
        }
    }

    absEquals(listB){
        if (listB.__proto__ != this.__proto__){
            throw new Error("The types of \"listB\" must be \"List\"")
        }

        var result = true
        var x = this.flat(true)
        var y = listB.flat(true)

        if (x.length != y.length){
            return false
        }
        for (let i in x){
            if (x[parseInt(i)] != y[parseInt(i)]){
                return false
            }
        }
        return true
    }

    equals(listB){
        if (listB.__proto__ != this.__proto__){
            throw new Error("The types of \"listB\" must be \"List\"")
        }
        var result = true
        var ele_count_this = this.elenmentCount()
        var ele_count_listB = listB.elenmentCount()
        for (let i of new List(ele_count_this.keys()).array()){
            if (ele_count_this.get(i) != ele_count_listB.get(i)){
                result = false
                break
            }
        }
        return result

    }

    // 将列表转换为一维列表, 如果"change"为true, 将改变原列表, "returns"为true, 将返回转换后的列表
    flat(returns, change){
        if (returns === undefined){
            returns = false
        }
        if (change === undefined){
            change = false
        }
        var result = new List()
        for (let i of this.#array){
            if (Array.isArray(i)){
                result.append('Array:')
                result.join(new List(new List(i).flat(true)))
                result.append(":Array")
                continue
            }
            result.append(i)
        }

        if (change === true){
            this.#array = result.array()
        }

        if (returns === true){
            return result.array()
        }
    }

    // outString(){
    //     var result = ""
    //     result += "{"
    //     for (let i in this.#array){
    //         if (parseInt(i) === this.#array.length - 1){
    //             result += this.#array[parseInt(i)]
    //             continue
    //         }
    //         result += this.#array[parseInt(i)]
    //         result += ", "
    //     }
    //     result += "}"
    //     return result

    // }

    showItems(){
        var isFlat = true
        var result = ""
        for (let i of this.#array){
            if (Array.isArray(i)){
                isFlat = false
                break
            }
        }

        if (isFlat){
            result += "["
            for (let i = 0; i < this.#array.length; i++){
                if (i === this.#array.length - 1){
                    if (this.#array[i].__proto__ === String.prototype){
                        result += "\"" + this.#array[i] + "\""
                        continue
                    }else if (this.#array[i].__proto__ === Map.prototype){
                        let index = 0
                        result += "Map("
                        for (let j of this.#array[i]){
                            if (index === MyTools.mapLength(this.#array[i]) - 1){
                                let key = j[0]
                                let value = j[1]
                                let keyType = typeof key
                                let valueType = typeof value
                                if (key.__proto__ === Array.prototype){
                                    key = new List(key).showItems()
                                }else if (key.__proto__ === String.prototype){
                                    key = "\"" + key + "\""
                                }else if (key.__proto__ === Map.prototype){
                                    keyType = "Map"
                                }else if (key.__proto__ === Array.prototype){
                                    keyType = "Array"
                                }
    
                                if (value.__proto__ === Array.prototype){
                                    value = new List(value).showItems()
                                }else if (value.__proto__ === String.prototype){
                                    value = "\"" + value + "\""
                                }else if (value.__proto__ === Map.prototype){
                                    valueType = "Map"
                                }else if (key.__proto__ === Array.prototype){
                                    valueType = "Array"
                                }

                                switch (keyType){
                                    case "string":
                                        keyType = "str"
                                        break
                                    case "number":
                                        keyType = "num"
                                        break
                                    case "boolean":
                                        keyType = "bool"
                                        break
                                    case "Array":
                                        keyType = "arr"
                                        break
                                }
                                switch (valueType){
                                    case "string":
                                        valueType = "str"
                                        break
                                    case "number":
                                        valueType = "num"
                                        break
                                    case "boolean":
                                        valueType = "bool"
                                        break
                                    case "Array":
                                        valueType = "arr"
                                        break
                                }
                                result += `${keyType}: ${key} -> `
                                result += `${valueType}: ${value}`
                                continue
                            }
                            let key = j[0]
                            let value = j[1]
                            let keyType = typeof key
                            let valueType = typeof value
                            if (key.__proto__ === Array.prototype){
                                key = new List(key).showItems()
                            }else if (key.__proto__ === String.prototype){
                                key = "\"" + key + "\""
                            }else if (key.__proto__ === Map.prototype){
                                keyType = "Map"
                            }else if (key.__proto__ === Array.prototype){
                                keyType = "Array"
                            }

                            if (value.__proto__ === Array.prototype){
                                value = new List(value).showItems()
                            }else if (value.__proto__ === String.prototype){
                                value = "\"" + value + "\""
                            }else if (value.__proto__ === Map.prototype){
                                valueType = "Map"
                            }else if (key.__proto__ === Array.prototype){
                                valueType = "Array"
                            }

                            switch (keyType){
                                case "string":
                                    keyType = "str"
                                    break
                                case "number":
                                    keyType = "num"
                                    break
                                case "boolean":
                                    keyType = "bool"
                                    break
                                case "Array":
                                    keyType = "arr"
                                    break
                            }
                            switch (valueType){
                                case "string":
                                    valueType = "str"
                                    break
                                case "number":
                                    valueType = "num"
                                    break
                                case "boolean":
                                    valueType = "bool"
                                    break
                                case "Array":
                                    valueType = "arr"
                                    break
                            }
                            result += `${keyType}: "${key}" -> `
                            result += `${valueType}: "${value}", `

                            index++;
                        }
                        result += ")"
                        continue
                    }
                    result += this.#array[i]
                    continue
                }
                if (this.#array[i].__proto__ === String.prototype){
                    result += "\"" + this.#array[i] + "\", "
                    continue
                }else if (this.#array[i].__proto__ === Map.prototype){
                    let index = 0
                    result += "Map("
                    for (let j of this.#array[i]){
                        if (index === MyTools.mapLength(this.#array[i]) - 1){
                            let key = j[0]
                            let value = j[1]
                            let keyType = typeof key
                            let valueType = typeof value
                            if (key.__proto__ === Array.prototype){
                                key = new List(key).showItems()
                            }else if (key.__proto__ === String.prototype){
                                key = "\"" + key + "\""
                            }else if (key.__proto__ === Map.prototype){
                                keyType = "Map"
                            }else if (key.__proto__ === Array.prototype){
                                keyType = "Array"
                            }

                            if (value.__proto__ === Array.prototype){
                                value = new List(value).showItems()
                            }else if (value.__proto__ === String.prototype){
                                value = "\"" + value + "\""
                            }else if (value.__proto__ === Map.prototype){
                                valueType = "Map"
                            }else if (key.__proto__ === Array.prototype){
                                valueType = "Array"
                            }

                            switch (keyType){
                                case "string":
                                    keyType = "str"
                                    break
                                case "number":
                                    keyType = "num"
                                    break
                                case "boolean":
                                    keyType = "bool"
                                    break
                                case "Array":
                                    keyType = "arr"
                                    break
                            }
                            switch (valueType){
                                case "string":
                                    valueType = "str"
                                    break
                                case "number":
                                    valueType = "num"
                                    break
                                case "boolean":
                                    valueType = "bool"
                                    break
                                case "Array":
                                    valueType = "arr"
                                    break
                            }
                            result += `${keyType}: ${key} -> `
                            result += `${valueType}: ${value}`
                            continue
                        }
                        let key = j[0]
                        let value = j[1]
                        let keyType = typeof key
                        let valueType = typeof value
                        if (key.__proto__ === Array.prototype){
                            key = new List(key).showItems()
                        }else if (key.__proto__ === String.prototype){
                            key = "\"" + key + "\""
                        }else if (key.__proto__ === Map.prototype){
                            keyType = "Map"
                        }else if (key.__proto__ === Array.prototype){
                            keyType = "Array"
                        }

                        if (value.__proto__ === Array.prototype){
                            value = new List(value).showItems()
                        }else if (value.__proto__ === String.prototype){
                            value = "\"" + value + "\""
                        }else if (value.__proto__ === Map.prototype){
                            valueType = "Map"
                        }else if (key.__proto__ === Array.prototype){
                            valueType = "Array"
                        }

                        switch (keyType){
                            case "string":
                                keyType = "str"
                                break
                            case "number":
                                keyType = "num"
                                break
                            case "boolean":
                                keyType = "bool"
                                break
                            case "Array":
                                keyType = "arr"
                                break
                        }
                        switch (valueType){
                            case "string":
                                valueType = "str"
                                break
                            case "number":
                                valueType = "num"
                                break
                            case "boolean":
                                valueType = "bool"
                                break
                            case "Array":
                                valueType = "arr"
                                break
                        }
                        result += `${keyType}: "${key}" -> `
                        result += `${valueType}: "${value}", `

                        index++;
                    }
                    result += ")"
                    continue
                }
                result += this.#array[i]
                result += ", "
            }
            result += "]"
            return result
        }else {
            result += "["
            for (let i = 0; i < this.#array.length; i++){
                if (i === this.#array.length - 1){
                    if (Array.isArray(this.#array[i])){
                        result += new List(this.#array[i]).showItems()
                        continue
                    }else if (this.#array[i].__proto__ === Map.prototype){
                        let index = 0
                        result += "Map("
                        for (let j of this.#array[i]){
                            if (index === MyTools.mapLength(this.#array[i]) - 1){
                                let key = j[0]
                                let value = j[1]
                                let keyType = typeof key
                                let valueType = typeof value
                                if (key.__proto__ === Array.prototype){
                                    key = new List(key).showItems()
                                }else if (key.__proto__ === String.prototype){
                                    key = "\"" + key + "\""
                                }else if (key.__proto__ === Map.prototype){
                                    keyType = "Map"
                                }else if (key.__proto__ === Array.prototype){
                                    keyType = "Array"
                                }
    
                                if (value.__proto__ === Array.prototype){
                                    value = new List(value).showItems()
                                }else if (value.__proto__ === String.prototype){
                                    value = "\"" + value + "\""
                                }else if (value.__proto__ === Map.prototype){
                                    valueType = "Map"
                                }else if (key.__proto__ === Array.prototype){
                                    valueType = "Array"
                                }

                                switch (keyType){
                                    case "string":
                                        keyType = "str"
                                        break
                                    case "number":
                                        keyType = "num"
                                        break
                                    case "boolean":
                                        keyType = "bool"
                                        break
                                    case "Array":
                                        keyType = "arr"
                                        break
                                }
                                switch (valueType){
                                    case "string":
                                        valueType = "str"
                                        break
                                    case "number":
                                        valueType = "num"
                                        break
                                    case "boolean":
                                        valueType = "bool"
                                        break
                                    case "Array":
                                        valueType = "arr"
                                        break
                                }
                                result += `${keyType}: ${key} -> `
                                result += `${valueType}: ${value}`
                                continue
                            }
                            let key = j[0]
                            let value = j[1]
                            let keyType = typeof key
                            let valueType = typeof value
                            if (key.__proto__ === Array.prototype){
                                key = new List(key).showItems()
                            }else if (key.__proto__ === String.prototype){
                                key = "\"" + key + "\""
                            }else if (key.__proto__ === Map.prototype){
                                keyType = "Map"
                            }else if (key.__proto__ === Array.prototype){
                                keyType = "Array"
                            }

                            if (value.__proto__ === Array.prototype){
                                value = new List(value).showItems()
                            }else if (value.__proto__ === String.prototype){
                                value = "\"" + value + "\""
                            }else if (value.__proto__ === Map.prototype){
                                valueType = "Map"
                            }else if (key.__proto__ === Array.prototype){
                                valueType = "Array"
                            }

                            switch (keyType){
                                case "string":
                                    keyType = "str"
                                    break
                                case "number":
                                    keyType = "num"
                                    break
                                case "boolean":
                                    keyType = "bool"
                                    break
                                case "Array":
                                    keyType = "arr"
                                    break
                            }
                            switch (valueType){
                                case "string":
                                    valueType = "str"
                                    break
                                case "number":
                                    valueType = "num"
                                    break
                                case "boolean":
                                    valueType = "bool"
                                    break
                                case "Array":
                                    valueType = "arr"
                                    break
                            }
                            result += `${keyType}: "${key}" -> `
                            result += `${valueType}: "${value}", `

                            index++;
                        }
                        result += ")"
                        continue
                    }else if (this.#array[i].__proto__ === String.prototype){
                        result += "\"" + this.#array[i] + "\""
                        continue
                    }
                    result += this.#array[i]
                    continue
                    
                }
                if (Array.isArray(this.#array[i])){
                    result += new List(this.#array[i]).showItems()
                    result += ", "
                    continue
                }else if (this.#array[i].__proto__ === Map.prototype){
                    let index = 0
                    result += "Map("
                    for (let j of this.#array[i]){
                        if (index === MyTools.mapLength(this.#array[i]) - 1){
                            let key = j[0]
                            let value = j[1]
                            let keyType = typeof key
                            let valueType = typeof value
                            if (key.__proto__ === Array.prototype){
                                key = new List(key).showItems()
                            }else if (key.__proto__ === String.prototype){
                                key = "\"" + key + "\""
                            }else if (key.__proto__ === Map.prototype){
                                keyType = "Map"
                            }else if (key.__proto__ === Array.prototype){
                                keyType = "Array"
                            }

                            if (value.__proto__ === Array.prototype){
                                value = new List(value).showItems()
                            }else if (value.__proto__ === String.prototype){
                                value = "\"" + value + "\""
                            }else if (value.__proto__ === Map.prototype){
                                valueType = "Map"
                            }else if (key.__proto__ === Array.prototype){
                                valueType = "Array"
                            }

                            switch (keyType){
                                case "string":
                                    keyType = "str"
                                    break
                                case "number":
                                    keyType = "num"
                                    break
                                case "boolean":
                                    keyType = "bool"
                                    break
                                case "Array":
                                    keyType = "arr"
                                    break
                            }
                            switch (valueType){
                                case "string":
                                    valueType = "str"
                                    break
                                case "number":
                                    valueType = "num"
                                    break
                                case "boolean":
                                    valueType = "bool"
                                    break
                                case "Array":
                                    valueType = "arr"
                                    break
                            }
                            result += `${keyType}: ${key} -> `
                            result += `${valueType}: ${value}`
                            continue
                        }
                        let key = j[0]
                        let value = j[1]
                        let keyType = typeof key
                        let valueType = typeof value
                        if (key.__proto__ === Array.prototype){
                            key = new List(key).showItems()
                        }else if (key.__proto__ === String.prototype){
                            key = "\"" + key + "\""
                        }else if (key.__proto__ === Map.prototype){
                            keyType = "Map"
                        }else if (key.__proto__ === Array.prototype){
                            keyType = "Array"
                        }

                        if (value.__proto__ === Array.prototype){
                            value = new List(value).showItems()
                        }else if (value.__proto__ === String.prototype){
                            value = "\"" + value + "\""
                        }else if (value.__proto__ === Map.prototype){
                            valueType = "Map"
                        }else if (key.__proto__ === Array.prototype){
                            valueType = "Array"
                        }

                        switch (keyType){
                            case "string":
                                keyType = "str"
                                break
                            case "number":
                                keyType = "num"
                                break
                            case "boolean":
                                keyType = "bool"
                                break
                            case "Array":
                                keyType = "arr"
                                break
                        }
                        switch (valueType){
                            case "string":
                                valueType = "str"
                                break
                            case "number":
                                valueType = "num"
                                break
                            case "boolean":
                                valueType = "bool"
                                break
                            case "Array":
                                valueType = "arr"
                                break
                        }
                        result += `${keyType}: "${key}" -> `
                        result += `${valueType}: "${value}", `

                        index++;
                    }
                    result += "), "
                    continue
                }else if (this.#array[i].__proto__ === String.prototype){
                    result += "\"" + this.#array[i] + "\", "
                    continue
                }
                result += this.#array[i]
                result += ", "
                
            }
            result += "]"
            return result
        }
    }

    // maxDepth(){
    //     var dep = 0
    //     // 判断是否是1维数组/包含数组
    //     let isFlat = true
    //     for (let i of this.#array){
    //         if (Array.isArray(i)){
    //             isFlat = false
    //             break
    //         }
    //     }
    //     if (isFlat){
    //         return 1
    //     }

    //     for (let i = 0; i < this.#array; i++){
    //         console.log(Arrar.isArray(this.#array[i]));
    //         if (!Array.isArray(this.#array[i])){
    //             continue
    //         }
    //         dep += this.maxDepth(this.#array[i])
    //     }
    //     return dep

    // }

    static toString(list){
        let result = "";
        for (let i of list.array()){
            result += i;
        }
        return result;
    }

    get(index){
        return this.#array[index]
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


    clear(){
        this.#array = [];
    }

    afterInsert(index, ele){
        var result = new List()
        for (let i = 0; i <= index; i++){
            result.append(this.#array[i])
        }
        result.append(ele)
        for (let i = index + 1; i < this.#array.length; i++){
            result.append(this.#array[i])
        }
        this.#array = result.array()
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
                    result.set(j, result.array()[j+1]);
                    result.set(j+1, x);
                }
            }
        }
        this.#array = result.#array
    }


    append(...obj){
        for (let i of obj){
            this.#array.push(i);
        }
        
    }

    join(listB){
        if (listB.__proto__ != this.__proto__){
            throw new Error("The types of \"listB\" must be \"List\"")
        }
        for (let i of listB.array()){
            this.append(i)
        }
    }


    delete(del_target){
        var final = [];
        var contains = false
        if (!Array.isArray(del_target)){
            var index = parseInt(del_target.split("index->")[1])
            for (let i in this.#array){
                if (parseInt(i) === index){
                    continue
                }
                final.push(this.#array[parseInt(i)])
            }
            this.#array = final
            return undefined
        }
        for (let i of this.#array){
            for (let j of del_target){
                if (j === i){
                    contains = true
                    break
                }
            }
            if (contains === false){
                final.push(i)
            }else {
                contains = false
            }

        }
        this.#array = final;
    }


    pop(){
        return this.#array.pop();
    }
    
    push(obj){
        return this.#array.push(obj);
    }

    shift(obj){
        return this.#array.shift(obj);
    }

    unshift(){
        return this.#array.unshift();
    }

    set(index, obj){
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

    elenmentCount(){
        var result = new Map()
        var box = []
        var num = 0
        for (let i of this.#array){
            num = 0
            if (box.indexOf(i) === -1){
                box.push(i)
                for (let j of this.#array){
                    if (Array.isArray(i) && new List(i).absEquals(new List(j))){
                        num += 1
                        continue
                    }
                    if (i === j){
                        num += 1
                    }
                }
                result.set("[" + String(i) + "]", num)
            }
        }
        return result
    }

    contains(ele, strictForArray){
        let result = 0
        if (strictForArray != undefined && strictForArray != true && strictForArray != false){
            throw new Error("Parameter value error: \"strictForArray\"")
        }
        if (strictForArray === undefined || strictForArray === false){
            for (let i of this.#array){
                // ele是数组
                if (Array.isArray(ele) && new List(ele).equals(new List(i))){
                    return result
                }else if (i === ele){
                    return result
                }
                result++;
            }
        }else if (strictForArray === true){
            for (let i of this.#array){
                // ele是数组
                if (Array.isArray(ele) && new List(ele).absEquals(new List(i))){
                    return result
                }else if (i === ele){
                    return result
                }
                result++;
            }
        }
        
    }

    static getValueByString(target_string){
        if (typeof(target_string) != "string"){
            target_string = String(target_string)
        }
        var result = new List([]);
        for (let i of target_string){
            result.append(i);
        }
        return result;
    }

    toString(){
        var result = "";
        for (let i of this.#array){
            result += i;
        }
        return result;
    }

}


class math{
    constructor(){
        var e = Math.E
        var pi = Math.PI
        var ln10 = Math.LN10
        var ln2 = Math.LN2
    }

    // 幂运算
    static pow(num, power){
        if (power === undefined){
            power = 1
        }
        return Math.pow(num, power)
    }

    // 返回数组中的最大值
    static max(array){
        var result = array[0]
        for (let i of array){
            if (i > result){
                result = i
            }
        }
        return result
    }

    // 返回数组中的最小值
    static min(array){
        var result = array[0]
        for (let i of array){
            if (i < result){
                result = i
            }
        }
        return result
    }

    // 比较大小，返回大值
    static bigger(x, y){
        if (x === y){
            return true;
        }
        return x > y ? x : y;
    }

    // 比较大小，返回小值
    static smaller(x, y){
        if (x === y){
            return true
        }
        return x < y ? x : y
    }



    static radianToAngle(rad){
        return rad * 57.29577951308232;
    }

    static angleToRadian(angle, pi){
        if (pi === undefined){
            pi = 3.14;
        }
        return angle * pi / 180;
    }

    static opposite(num){
        return num - 2 * num;
    }

    static equalsEndEdge(angle){
        if (angle >= 360){
            return angle % 360;
        }else if (angle < 360){
            return angle - 720;
        }
        
    }

    


    static floatOperation(expression){
        if (new List(expression).contains(" ")){
            var temp = ""
            for (let i of expression){
                if (i != " "){
                    temp += i
                }
            }
            expression = temp
        }
        var x, y, result, ope;
        var counter = 1;
        if (new List(expression).contains("+")){
            x = expression.split('+')[0];
            y = expression.split('+')[1];
            ope = '+';
        }else if (new List(expression).contains("-")){
            x = expression.split('-')[0];
            y = expression.split('-')[1];
            ope = '-';
        }else if (new List(expression).contains("*")){
            x = expression.split('*')[0];
            y = expression.split('*')[1];
            ope = '*';
        }else if (new List(expression).contains("/")){
            ope = '/';
        }
        x = parseFloat(x);
        y = parseFloat(y);
        switch (ope){
            case '+':
                result = MyTools.floatAdd(x, y);
                break;
            case '-':
                if (x > y){
                    while (new List(String(y)).contains(".")){
                        y *= 10;
                        counter *= 10;
                    }
                }
                x *= counter;
                result = (x - y) / counter;
                break;
            case '*':
                while (new List(String(x)).contains(".") | new List(String(y)).contains(".")){
                    if (new List(String(x)).contains(".")){
                        x *= 10;
                        counter *= 10;
                    }else{
                        y *= 10;
                        counter *= 10;
                    }
                }
                result = x * y / counter;
                break
            case '/':
                throw new Error("For some strange reason, division does not support exact calculation");
        }
        return result;
    }

    

    static circularAreaByRad(r, pi){
        if (pi === undefined){
            pi = this.pi
        }
        console.log(this.pi)
        return pi * this.pow(r, 2)
    }

    static circularAreaByDia(d, pi){
        if (pi === undefined){
            pi = this.pi
        }
        console.log(this.pi);
        return pi * this.pow(d/2, 2)
    }

}

class Random{
    // 随机正整数，参数不能包含负数
    static randPositiveInteger(min, max){
        if (min > max){
            throw new Error("\"min\" should be smaller than \"max\"");
        }else if (min < 0 | max < 0){
            throw new Error("range cannot be less than \"zero\"");
        }

        // 下面这段可以扩大正整数的最大取值范围，但一般用不上，因为默认已经都是一个17位的数了
        // var add = String(Math.random())
        // var add1 = new List(add)
        // add1.delete(["0", "."])
        // var root = Math.random() + add1.toString()

        var root = Math.random()

        root = new List(List.getValueByString(String(root)).slice(2, String(root).length)).toString();
        var num_length = Random.randint(1, String(max).length);
        root = new List(List.getValueByString(root).slice(0, num_length)).toString();
        root = parseInt(root);

        while (root < min | root > max){
            
            // add = String(Math.random())
            // add1 = new List(add)
            // add1.delete(["0", "."])
            // root = Math.random() + add1.toString()

            root = Math.random();

            root = new List(List.getValueByString(String(root)).slice(2, String(root).length)).toString();
            num_length = Random.randint(1, String(max).length);
            root = new List(List.getValueByString(root).slice(0, num_length)).toString();
            root = parseInt(root);

        }
        return root;
    }
    
    // 随机正浮点数，因为基于random函数，故参数同样不能包含负数
    static randPositiveFloat(min, max, float_length){

        if (min > max){
            throw new Error("\"min\" should be smaller than \"max\"");
        }else if (min < 0 | max < 0){
            throw new Error("range cannot be less than \"zero\"");
        }

        if (float_length === undefined){
            float_length = 1;
        }
        var forward_int = String(Random.randPositiveInteger(min, max - 1));
        var float = "";
        for (let i = 0; i < float_length; i++){
            float += String(Random.randPositiveInteger(1, 9));
        }
        var result = forward_int + '.' + float;
        result = parseFloat(result);
        return result;
    }

    // 范围完善的随机数
    static randint(start, stop){
        if (start > stop){
            throw new Error("\"max\" not less than the \"stop\"...")
        }
        // 正整数(包含0)
        if (start >= 0 && stop >= 0){
            if (start === stop){
                return start
            }
            return Random.randPositiveInteger(start, stop)
            
        }

        // 范围是负整数
        if (start < 0 && stop < 0){
            if (start === stop){
                return start
            }
            var temp = start
            start = stop
            stop = temp
            return math.opposite(Random.randint(math.opposite(start), math.opposite(stop)))
        }

        // 范围是负整数到整数
        if (start < 0 && stop >= 0){
            if (start > stop){
                throw new Error("\"max\" not less than the \"stop\"...")
            }else if (start === stop){
                return start
            }
            return Random.randint(0, 1) == 1? Random.randint(0, stop) : Random.randint(start, -1)

        }
    }

    static randChoice(choice_box){
        if (choice_box.__proto__ != new List().__proto__){
            throw new Error("The types of \"choice_box\" must be \"List\"")
        }
        var map = new Map([])
        for (let i = 1; i <= choice_box.length(); i++){
            map.set(i, choice_box.get(i - 1))
        }
        var target = Random.randint(1, choice_box.length())
        return map.get(target)
    }

    static extract(extract_number, from_datas){
        if (from_datas.__proto__ != new List().__proto__){
            throw new Error("The types of \"choice_box\" must be \"List\"")
        }
        if (extract_number > from_datas.length()){
            throw new Error("\"extract_number\" must be smaller than \"from_datas.length()\"")
        }
        if (extract_number === from_datas.length()){
            return from_datas
        }
        var el;
        var result = new List()
        while (result.length() < extract_number){
            el = Random.randChoice(from_datas)
            from_datas.delete([el])
            if (result.containsElenmentCount(new List([el])) === false){
                result.append(el)
            }
        }
        return result
    }
}

// exports = {
//     MyTools,
//     List,
//     math,
//     Random,
// }
export {MyTools, math, List, Random};

ES6 新增操作二进制数据的接口:ArrayBuffer、TypedArray、DataView

##ArrayBuffer
代表内存之中的一段二进制数据, ArrayBuffer 对象本身不提供读写接口,只能通过视图对象来操作。

##TypedArray 视图
共包括9种类型的视图来读写ArrayBuffer 对象

- Int8Array：8位有符号整数，长度1个字节
- Uint8Array：8位无符号整数，长度1个字节
- Uint8ClampedArray：8位无符号整数，长度1个字节，溢出处理不同
- Int16Array：16位有符号整数，长度2个字节
- Uint16Array：16位无符号整数，长度2个字节
- Int32Array：32位有符号整数，长度4个字节
- Uint32Array：32位无符号整数，长度4个字节
- Float32Array：32位浮点数，长度4个字节
- Float64Array：64位浮点数，长度8个字节

TypedArray 对象实现了很多数组的方法:

- TypedArray.prototype.copyWithin(target, start[, end = this.length])
- TypedArray.prototype.entries()
- TypedArray.prototype.every(callbackfn, thisArg?)
- TypedArray.prototype.fill(value, start=0, end=this.length)
- TypedArray.prototype.filter(callbackfn, thisArg?)
- TypedArray.prototype.find(predicate, thisArg?)
- TypedArray.prototype.findIndex(predicate, thisArg?)
- TypedArray.prototype.forEach(callbackfn, thisArg?)
- TypedArray.prototype.indexOf(searchElement, fromIndex=0)
- TypedArray.prototype.join(separator)
- TypedArray.prototype.keys()
- TypedArray.prototype.lastIndexOf(searchElement, fromIndex?)
- TypedArray.prototype.map(callbackfn, thisArg?)
- TypedArray.prototype.reduce(callbackfn, initialValue?)
- TypedArray.prototype.reduceRight(callbackfn, initialValue?)
- TypedArray.prototype.reverse()
- TypedArray.prototype.slice(start=0, end=this.length)
- TypedArray.prototype.some(callbackfn, thisArg?)
- TypedArray.prototype.sort(comparefn)
- TypedArray.prototype.toLocaleString(reserved1?, reserved2?)
- TypedArray.prototype.toString()
- TypedArray.prototype.values()

concat() 方法要另外实现

##DataView 视图
以复合格式的视图来读写ArrayBuffer 对象

- getInt8：读取1个字节，返回一个8位整数
- getUint8：读取1个字节，返回一个无符号的8位整数
- getInt16：读取2个字节，返回一个16位整数
- getUint16：读取2个字节，返回一个无符号的16位整数
- getInt32：读取4个字节，返回一个32位整数
- getUint32：读取4个字节，返回一个无符号的32位整数
- getFloat32：读取4个字节，返回一个32位浮点数
- getFloat64：读取8个字节，返回一个64位浮点数

参考: [二进制数组](http://es6.ruanyifeng.com/#docs/arraybuffer)
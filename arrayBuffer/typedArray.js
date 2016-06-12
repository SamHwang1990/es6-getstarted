/**
 * Created by sam on 16/6/12.
 */

;(function() {

  // TypedArray 视图对象用于以指定的格式初始化、读写ArrayBuffer 对象
  // TypedArray 提供以下9 中类型的视图:
  // Int8Array：8位有符号整数，长度1个字节
  // Uint8Array：8位无符号整数，长度1个字节
  // Uint8ClampedArray：8位无符号整数，长度1个字节，溢出处理不同
  // Int16Array：16位有符号整数，长度2个字节
  // Uint16Array：16位无符号整数，长度2个字节
  // Int32Array：32位有符号整数，长度4个字节
  // Uint32Array：32位无符号整数，长度4个字节
  // Float32Array：32位浮点数，长度4个字节
  // Float64Array：64位浮点数，长度8个字节

  // 每个类型的构造函数都有静态属性BYTES_PER_ELEMENT 来表示视图中每个元素对应的字节长度
  {
    console.log(...[
      Int8Array.BYTES_PER_ELEMENT,
      Uint8Array.BYTES_PER_ELEMENT,
      Int16Array.BYTES_PER_ELEMENT,
      Uint16Array.BYTES_PER_ELEMENT,
      Int32Array.BYTES_PER_ELEMENT,
      Uint32Array.BYTES_PER_ELEMENT,
      Float32Array.BYTES_PER_ELEMENT,
      Float64Array.BYTES_PER_ELEMENT
    ]);

  }

  // 视图初始化方法,以Int8Array 和Int16Array 为例
  {
    let bf = new ArrayBuffer(8);

    let int8Array = new Int8Array(bf);
    int8Array.fill(110);

    console.log(int8Array.buffer === bf);

    console.log(int8Array, int8Array.length, int8Array.byteLength);

    let int16Array = new Int16Array(bf);
    console.log(int16Array, int16Array.length, int16Array.byteLength, int16Array.byteOffset);

    int16Array = new Int16Array(bf, 2, 3);
    console.log(int16Array, int16Array.length, int16Array.byteLength, int16Array.byteOffset);

    int16Array = new Int16Array(int8Array);
    console.log(int16Array, int16Array.length, int16Array.byteLength);

    int16Array = new Int16Array([110, 112, 114]);
    console.log(int16Array, int16Array.length, int16Array.byteLength);

    int16Array = Int16Array.of(110, 112, 114);
    console.log(int16Array, int16Array.length, int16Array.byteLength);
  }

  {
    let arrayLen = 1000000000;

    // 做性能测试时注释调
    arrayLen = 10;

    let int8Array = new Int8Array(arrayLen);
    let anotherInt8Array = new Int8Array(arrayLen);
    int8Array.fill(250);

    console.log(Date.now());
    for (let i = 0; i < arrayLen; ++i) {
      anotherInt8Array[i] = int8Array[i];
    }
    console.log(Date.now());
    console.log(anotherInt8Array.length, anotherInt8Array.byteLength);

    // TypedArray.prototype.set(ArrayBuffer) 用于复制参数中的数组、TypedArray 到当前实例对象
    // 该方法是将参数的整段内存进行复制,所以,速度超级超级快!
    int8Array.fill(110);
    console.log(Date.now());
    anotherInt8Array.set(int8Array);
    console.log(Date.now());
    console.log(anotherInt8Array.length, anotherInt8Array.byteLength);
  }

  {
    let ab2Str = function(ab) {
      var uint16Array = new Uint16Array(ab);
      var str = [];
      for (let char of uint16Array) {
        str.push(String.fromCharCode(char));
      }
      return str.join('');
    };

    // 简化版
    ab2Str = function(ab) {
      return String.fromCharCode(...new Uint16Array(ab));
    };

    let str2ab = function(str) {
      var unit16Array = new Uint16Array(str.length);
      for (let i = 0; i < str.length; ++i) {
        unit16Array[i] = str.charCodeAt(i);
      }
      return unit16Array.buffer;
    };

    let name = 'sam';
    console.log(str2ab(name));
    console.log(ab2Str(str2ab(name)));
  }

})();
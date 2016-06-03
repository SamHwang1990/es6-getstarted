/**
 * Created by sam on 16/6/3.
 */

;(function() {

  {
    let obj = {
      name: 'SamHwang',
      year: '1990'
    };

    let fn = function hi() {
      return 'Hello World';
    };

    let addrs = [
      { first: '<Jane>', last: 'Bond' },
      { first: 'Lars', last: '<Croft>' }
    ];

    // 模板字符串可用于普通字符串, 多行字符串
    console.log(`Hi Everyone!`);
    console.log(`
      <ul>
        <li>first</li>
        <li>second</li>
      </ul>
    `);

    // 还可以放置表达式, 函数调用
    // 因为支持表达式, 所以还支持嵌套模板字符串
    console.log(`My name is ${'Sam'}, i'm ${2016 - 1990} years old!`);
    console.log(`My name is ${obj.name}, i born in ${obj.year}!`);
    console.log(`foo ${fn()} bar`);
    console.log(`
      <ul>
        ${addrs.map(addr => `
        <li>${addr.first} ${addr.last}</li>
        `).join('')}
      </ul>
    `)

  }
})();

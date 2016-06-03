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

    console.log(`Hi Everyone!`);
    console.log(`
      <ul>
        <li>first</li>
        <li>second</li>
      </ul>
    `);

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

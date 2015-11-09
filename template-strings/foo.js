/**
 * Created by sam on 15/11/9.
 */

;(function() {
  'use strict';

  var singer = {
    name: 'Eason Chan',
    locale: 'Hong Kong',
    toString: function() {
      return `${this.name}@${this.locale}`;
    }
  };

  console.log(`The singer who i love most is ${singer.name}`);
  console.log(`The information of singer who i love most is ${singer}`);    // if statement is object type, toString() will be invoke

  // pre wrap style
  console.log(`
  <h1>Name: ${singer.name}</h1>
  <p>Locale: ${singer.locale}</p>
  `);


  var SafeHtml = function(templateData) {
    var s = templateData[0];

    for (var i = 1; i < arguments.length; i++) {
      var arg = arguments[i];

      // Escape special characters in the substitution.
      s += arg.replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");

      s += templateData[i];
    }

    return s;

  };

  var bonk = {
    sender: "Hacker Steve <script>alert('xss');</script>"
  };

  console.log(SafeHtml`<p>${bonk.sender} sent you a bonk.</p>`);

})();

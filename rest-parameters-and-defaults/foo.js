/**
 * Created by sam on 15/11/10.
 */


;(function() {
  'use strict';

  // rest parameters demo
  var containsAll = function(hayStack, ...needles) {
    console.log(typeof needles);
    for (var i of needles) {
      if (hayStack.indexOf(i) < 0) {
        return false;
      }
    }
    return true;
  };

  console.log(containsAll('when i was young, i listened to the radio.', 'when', 'was'));
  console.log(containsAll('aha'));

  // default parameters demo
  var animalSentence = function(animal2='tiger', animal3='Bear') {
    console.log(`Lion, ${animal2} and ${animal3}, oh my god!`);
  };

  // parameters value calculate from left to right
  var animalSentenceFancy = function(animal2='tiger', animal3 = (animal2 == 'tiger') ? 'Bear' : 'Monkeys') {
    console.log(`Lion, ${animal2} and ${animal3}, oh my god!`);
  };

  animalSentence();
  animalSentence('elephants');
  animalSentence('elephants', 'whales');
  animalSentence(undefined, 'whales');

  animalSentenceFancy();
  animalSentenceFancy('elephants');
  animalSentenceFancy('elements', 'whales');

})();
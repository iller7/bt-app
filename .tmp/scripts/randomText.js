'use strict';

var RandomText;
(function () {

  //Create a class named RandomText and constructor
  RandomText = function RandomText() {
    //Default values.
    this.type = null;
    this.query = null;
    this.data = null;
  };
  //Static variables
  RandomText.TYPE = {
    PARAGRAPH: 1,
    SENTENCE: 2,
    WORD: 3
  };
  //Words to create RandomText ipsum text.
  RandomText.WORDS = ['lorem', 'ipsum', 'dolor', 'sit', 'amet,', 'consectetur', 'adipiscing', 'elit', 'ut', 'aliquam,', 'purus', 'sit', 'amet', 'luctus', 'venenatis,', 'lectus', 'magna', 'fringilla', 'urna,', 'porttitor', 'rhoncus', 'dolor', 'purus', 'non', 'enim', 'praesent', 'elementum', 'facilisis', 'leo,', 'vel', 'fringilla', 'est', 'ullamcorper', 'eget', 'nulla', 'facilisi', 'etiam', 'dignissim', 'diam', 'quis', 'enim', 'lobortis', 'scelerisque', 'fermentum', 'dui', 'faucibus', 'in', 'ornare', 'quam', 'viverra', 'orci', 'sagittis', 'eu', 'volutpat', 'odio', 'facilisis', 'mauris', 'sit', 'amet', 'massa', 'vitae', 'tortor', 'condimentum', 'lacinia', 'quis', 'vel', 'eros', 'donec', 'ac', 'odio', 'tempor', 'orci', 'dapibus', 'ultrices', 'in', 'iaculis', 'nunc', 'sed', 'augue', 'lacus,', 'viverra', 'vitae', 'congue', 'eu,', 'consequat', 'ac', 'felis', 'donec', 'et', 'odio', 'pellentesque', 'diam', 'volutpat', 'commodo', 'sed', 'egestas', 'egestas', 'fringilla', 'phasellus', 'faucibus', 'scelerisque', 'eleifend', 'donec', 'pretium', 'vulputate', 'sapien', 'nec', 'sagittis', 'aliquam', 'malesuada', 'bibendum', 'arcu', 'vitae', 'elementum', 'curabitur', 'vitae', 'nunc', 'sed', 'velit', 'dignissim', 'sodales', 'ut', 'eu', 'sem', 'integer', 'vitae', 'justo', 'eget', 'magna', 'fermentum', 'iaculis', 'eu', 'non', 'diam', 'phasellus', 'vestibulum', 'lorem', 'sed', 'risus', 'ultricies', 'tristique', 'nulla', 'aliquet', 'enim', 'tortor,', 'at', 'auctor', 'urna', 'nunc', 'id', 'cursus', 'metus', 'aliquam', 'eleifend', 'mi', 'in', 'nulla', 'posuere', 'sollicitudin', 'aliquam', 'ultrices', 'sagittis', 'orci,', 'a', 'scelerisque', 'purus', 'semper', 'eget', 'duis', 'at', 'tellus', 'at', 'urna', 'condimentum', 'mattis', 'pellentesque', 'id', 'nibh', 'tortor,', 'id', 'aliquet', 'lectus', 'proin', 'nibh', 'nisl,', 'condimentum', 'id', 'venenatis', 'a,', 'condimentum', 'vitae', 'sapien', 'pellentesque', 'habitant', 'morbi', 'tristique', 'senectus', 'et', 'netus', 'et', 'malesuada', 'fames', 'ac', 'turpis', 'egestas', 'sed', 'tempus,', 'urna', 'et', 'pharetra,', 'pharetra,', 'massa', 'massa', 'ultricies', 'mi,', 'quis', 'hendrerit', 'dolor', 'magna', 'eget', 'est', 'lorem', 'ipsum', 'dolor', 'sit', 'amet,', 'consectetur', 'adipiscing', 'elit', 'pellentesque', 'habitant', 'morbi', 'tristique', 'senectus', 'et', 'netus', 'et', 'malesuada', 'fames', 'ac', 'turpis', 'egestas', 'integer', 'eget', 'aliquet', 'nibh', 'praesent', 'tristique', 'magna', 'sit', 'amet', 'purus,', 'gravida,', 'quis,', 'blandit,', 'turpis,', 'cursus,', 'in,', 'hac,', 'habitasse,', 'platea,', 'dictumst,', 'quisque,', 'sagittis!', 'purus,', 'sit,', 'amet,', 'volutpat,', 'consequat!', 'mauris,', 'nunc,', 'congue,', 'nisi!', 'vitae,', 'suscipit,', 'tellus,', 'mauris,', 'a,', 'diam,', 'maecenas,', 'sed,', 'enim', 'ut', 'sem', 'viverra', 'aliquet', 'eget', 'sit', 'amet', 'tellus', 'cras', 'adipiscing', 'enim', 'eu', 'turpis', 'egestas', 'pretium', 'aenean', 'pharetra,', 'magna', 'ac', 'placerat', 'vestibulum,', 'lectus', 'mauris', 'ultrices', 'eros,', 'in', 'cursus', 'turpis', 'massa', 'tincidunt', 'dui', 'ut', 'ornare', 'lectus', 'sit', 'amet', 'est', 'placerat', 'in', 'egestas', 'erat', 'imperdiet', 'sed', 'euismod', 'nisi', 'porta', 'lorem', 'mollis', 'aliquam', 'ut', 'porttitor', 'leo', 'a', 'diam', 'sollicitudin', 'tempor', 'id', 'eu', 'nisl', 'nunc', 'mi', 'ipsum,', 'faucibus', 'vitae', 'aliquet', 'nec,', 'ullamcorper', 'sit', 'amet', 'risus', 'nullam', 'eget', 'felis', 'eget', 'nunc', 'lobortis', 'mattis', 'aliquam', 'faucibus', 'purus', 'in', 'massa', 'tempor', 'nec', 'feugiat', 'nisl', 'pretium', 'fusce', 'id', 'velit', 'ut', 'tortor', 'pretium', 'viverra', 'suspendisse', 'potenti', 'nullam', 'ac', 'tortor', 'vitae', 'purus', 'faucibus', 'ornare', 'suspendisse', 'sed', 'nisi', 'lacus,', 'sed', 'viverra', 'tellus', 'in', 'hac', 'habitasse', 'platea', 'dictumst', 'vestibulum', 'rhoncus', 'est', 'pellentesque', 'elit', 'ullamcorper', 'dignissim', 'cras', 'tincidunt', 'lobortis', 'feugiat', 'vivamus', 'at', 'augue', 'eget', 'arcu', 'dictum', 'varius', 'duis', 'at', 'consectetur'];
  //random integer method.
  RandomText.prototype.randomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  //text creator method with parameters: how many, what
  RandomText.prototype.populate = function (count, type) {
    switch (type) {
      // paragraphs are loads of sentences.
      case RandomText.TYPE.PARAGRAPH:
        for (var i = 0; i < count; i++) {
          var paragraphLength = this.randomInt(3, 30);
          var paragraph = this.populate(paragraphLength, RandomText.TYPE.SENTENCE);
        }
        return paragraph;
      // sentences are loads of words.
      case RandomText.TYPE.SENTENCE:
        var sentences = new Array();
        for (var i = 0; i < count; i++) {
          var sentenceLength = this.randomInt(5, 10);
          var words = this.populate(sentenceLength, RandomText.TYPE.WORD).split(' ');
          words[0] = words[0].substr(0, 1).toUpperCase() + words[0].substr(1);
          var sentence = words.join(' ');

          sentences.push(sentence);
        }
        return (sentences.join('. ') + '.').replace(/(\.\,|\,\.)/g, '.');
      // words are words
      case RandomText.TYPE.WORD:
        var wordIndex = this.randomInt(0, RandomText.WORDS.length - count - 1);
        return RandomText.WORDS.slice(wordIndex, wordIndex + count).join(' '); //.replace(/\.|\,/g, '');
    }
    // no type???
    return;
  };
  RandomText.prototype.createLorem = function (element) {

    var lorem = new Array();
    var count;
    element.value = '';

    if (/\d+-\d+[psw]/.test(this.query)) {
      var range = this.query.replace(/[a-z]/, '').split('-');
      count = Math.floor(Math.random() * parseInt(range[1])) + parseInt(range[0]);
    } else {
      count = parseInt(this.query);
    }

    if (/\d+p/.test(this.query)) {
      var type = RandomText.TYPE.PARAGRAPH;
    } else if (/\d+s/.test(this.query)) {
      var type = RandomText.TYPE.SENTENCE;
    } else if (/\d+w/.test(this.query)) {
      var type = RandomText.TYPE.WORD;
    }

    lorem.push(this.populate(count, type));
    lorem = lorem.join(' ');

    if (element) {
      element.value += lorem;
    }

    if (element == null) return lorem;
  };
})();
//# sourceMappingURL=randomText.js.map

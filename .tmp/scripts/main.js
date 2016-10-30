'use strict';

var btApp = function () {
  var theTextArea = document.getElementById('someText');
  var thePopulateButton = document.getElementById('populate');
  var theResetButton = document.getElementById('reset');
  var theGenerateButton = document.getElementById('generate');

  var init = function init() {

    // Event Handlers for the input fields
    if (thePopulateButton) {
      thePopulateButton.addEventListener('click', function (e) {
        e.preventDefault();
        populateRandomText(e);
        resizer(e);
        customValidator();
      });

      addMultipleEventListener(theTextArea, 'blur, click, touchstart, focus, change, keyup, paste', function (e) {
        if (!theTextArea.classList.length) transformLabel(this, e);
      });

      addMultipleEventListener(theTextArea, 'change, keyup, cut, paste', function (e) {
        resizer(e);
      });
    }

    if (theResetButton) {
      theResetButton.addEventListener('click', function (e) {
        e.preventDefault();
        resetTextarea();
        resizer(e);
      });
    }

    if (theGenerateButton) {
      theGenerateButton.addEventListener('click', function (e) {
        e.preventDefault();
        customValidator();
      });
    }

    // Run on load - populate the label/placeholder
    transformLabel(theTextArea);
    addConsoleMessage();
  };

  // Public Methods

  // Custom Validator
  var customValidator = function customValidator() {
    var thisValue = theTextArea.value.toLowerCase().trim();
    var thisValueLength = thisValue.length;

    if (thisValueLength) {
      // Something was entered in the field
      if (!isNumeric(thisValue)) {
        var commaCount = thisValueLength - thisValue.replace(/[\,]/g, '').length;
        var fullStopCount = thisValueLength - thisValue.replace(/[\.]/g, '').length;
        var wordArray = thisValue.replace(/[\,\.]/g, ' ').replace(/[^\w\s]/gi, '').trim().split(/[\s,]+/);
        var wordArrayCount = wordArray.length;

        if (wordArrayCount > 500) {
          // Too many words entered
          labelReporter('Please limit your content to 500 words', false);
        } else if (wordArrayCount < 5) {
          // Not enough words entered
          labelReporter('You need to add more than 5 words', false);
        } else {
          // Nearly there, now we need to check that there are no numbers within the string
          var matches = thisValue.match(/\d+/g);
          if (matches !== null) {
            labelReporter('The content supplied contains a number, please modify and try again', false);
          } else {
            // Looking good, now we can begin building the table
            labelReporter('Please wait, building the table with ' + wordArrayCount + ' entries now', false, 'valid');
            buildTable(wordArray.sort(), commaCount, fullStopCount);
          }
        }
      } else if (isNumeric(thisValue)) {
        // They supplied a number
        labelReporter('Sorry, no numbers allowed', false);
      } else {
        // Shouldn't reach here
        labelReporter('Sorry, that\'s not valid, please try again.', false);
      }
    } else {
      // Field is empty
      labelReporter('You need to write something in the box below', false);
    }

    function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }
    return false;
  };

  // Private Helpers

  // Add multiple event listeners in native js
  var addMultipleEventListener = function addMultipleEventListener(el, s, fn) {
    var evts = s.split(',');
    for (var i = 0, iLen = evts.length; i < iLen; i++) {
      el.addEventListener(evts[i].trim(), fn, false);
    }
  };

  // Use the RandomText class to generate some text
  var populateRandomText = function populateRandomText(e) {
    var randomText = new RandomText();
    randomText.type = RandomText.TEXT;
    randomText.query = '1p';
    randomText.createLorem(theTextArea);
    transformLabel(theTextArea, e);
  };

  // Reset the text area to empty
  var resetTextarea = function resetTextarea(e) {
    theTextArea.value = '';
    removeTable();
    transformLabel(theTextArea, e);
  };

  var removeTable = function removeTable(e) {
    var table = document.getElementsByTagName('table')[0];
    if (table) table.parentNode.removeChild(table);
    document.getElementById('testResults').classList.add('hide');
  };

  // Add some css tranformation and animation
  var transformLabel = function transformLabel(el) {
    var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    if (el) {
      if (el.value.length > 0 || el.autofocus) {
        labelReporter('Enter at least 5 words, but no more than 500 words please.', false, 'valid');
      } else {
        labelReporter('Please enter your text here...', true, '');
      }
    }
  };

  // Messaging via the label
  var labelReporter = function labelReporter(reporter, emptyStr) {
    var classState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'invalid';

    var thisMessage = theTextArea.nextElementSibling;
    thisMessage.innerHTML = reporter;
    theTextArea.className = '';
    if (classState) theTextArea.classList.add(classState);
    emptyStr ? theTextArea.classList.remove('validate') : theTextArea.classList.add('validate');
    emptyStr ? theTextArea.nextElementSibling.classList.remove('active') : theTextArea.nextElementSibling.classList.add('active');
  };

  // Display the array into a sorted table
  var buildTable = function buildTable(wordArray, commaCount, fullStopCount) {

    // Find the count of all words
    var countOccurence = function countOccurence(someArray, classifier) {
      return someArray.reduce(function (counter, item) {
        var p = item;
        counter[p] = counter.hasOwnProperty(p) ? counter[p] + 1 : 1;
        return counter;
      }, {});
    };

    // Find the count of all letters
    var countLetter = function countLetter(someArray) {
      return someArray.reduce(function (counter, item) {
        var p = item.charAt(0);
        counter[p] = counter.hasOwnProperty(p) ? counter[p] + 1 : 1;
        return counter;
      }, {});
    };

    // Issue with using Object.values polyfill
    var polyCounterAlternative = function polyCounterAlternative(obj1) {
      var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      return Object.keys(obj1).map(function (key) {
        return obj1[key];
      })[i];
    };

    // Table factory
    var populateTable = function populateTable(rows, cellsCount, obj1, obj2) {
      removeTable();
      var table = document.createElement('table');
      var thead = document.createElement('thead');
      var tbody = document.createElement('tbody');
      var thRow = document.createElement('tr');

      // Populate the thead with the letter and count per letters
      for (var i = 0; i < cellsCount; i++) {
        var headerLetter = Object.keys(obj1)[i];

        // polyfill causing issues :( going old school
        // let headerCount = Object.values(obj1)[i];
        var headerCount = polyCounterAlternative(obj1, i);
        var headerText = headerCount > 1 ? headerLetter + ' (' + headerCount + ')' : '' + headerLetter;

        thRow.appendChild(document.createElement('th'));
        thRow.cells[i].appendChild(document.createTextNode(headerText));
      }

      // Last column: Display the punctuations
      if (commaCount || fullStopCount) {
        thRow.appendChild(document.createElement('th'));
        thRow.cells[cellsCount].appendChild(document.createTextNode('Punctuations (' + (commaCount + fullStopCount) + ')'));
        thRow.cells[cellsCount].classList.add('punctuations');
      }

      // Create a table with just the thead created and an empty tbody
      thead.appendChild(thRow);
      table.appendChild(thead);
      table.appendChild(tbody);
      document.getElementById('generatedTable').appendChild(table);

      var tbodyContainer = document.getElementsByTagName('tbody')[0];
      var letterCountArray = polyCounterAlternative(letterCountObj); //Object.keys(letterCountObj).map(function (key) { return letterCountObj[key]; });

      // Top level loop: Start with all the available letters in the column      

      var _loop = function _loop(n) {
        var currentLetter = Object.keys(obj1)[n];
        var filteredObj = Object.keys(obj2).filter(function (el) {
          return el.charAt(0) == currentLetter;
        });

        // Given the currentLetter, populate each word into that row
        for (var m = 0; m < filteredObj.length; m++) {
          var currentWord = filteredObj[m];
          var currentWordCount = obj2[currentWord];

          // Row doesn't exist yet so we need to create it
          if (!tbodyContainer.rows[m]) {
            var row = document.createElement('tr');
            for (var k = 0; k <= cellsCount; k++) {
              row.appendChild(document.createElement('td'));
              row.cells[k].appendChild(document.createTextNode(''));
            }
            tbody.appendChild(row);
          }

          tbodyContainer.rows[m].cells[n].innerHTML = currentWord;
          if (currentWordCount > 1) tbodyContainer.rows[m].cells[n].innerHTML += '<strong>(' + currentWordCount + ')</strong>';
        }
      };

      for (var n = 0; n < Object.keys(obj1).length; n++) {
        _loop(n);
      }
      // Final Column, add the punctuations
      var p = 0;
      if (commaCount) {
        tbodyContainer.rows[p].cells[tbodyContainer.rows[0].cells.length - 1].innerHTML += '"," <strong>(' + commaCount + ')</strong>';
        p++;
      }
      if (fullStopCount) {
        tbodyContainer.rows[p].cells[tbodyContainer.rows[0].cells.length - 1].innerHTML += '"." <strong>(' + fullStopCount + ')</strong>';
        p++;
      }
    };

    // Build up the variables
    var wordCountObj = countOccurence(wordArray);
    var letterCountObj = countLetter(wordArray);
    var numberOfColumns = Object.keys(letterCountObj).length;
    // let letterCountArray = Object.keys(letterCountObj).map(function (key) { return letterCountObj[key]; });
    var maxNumberOfRows = Math.max.apply(null, Object.keys(wordCountObj).map(function (key) {
      return wordCountObj[key];
    }));

    var tableHtml = populateTable(maxNumberOfRows, numberOfColumns, letterCountObj, wordCountObj);
    document.getElementById('testResults').classList.remove('hide');
    labelReporter('Table built successfully! Please feel free to modify the text and select "Generate"', false, 'valid');
  };

  // Resize the textarea to handle the content within
  var resizer = function resizer(e) {
    function resize() {
      theTextArea.style.height = 'auto';
      theTextArea.style.height = theTextArea.scrollHeight + 'px';
    }
    /* 0-timeout to get the already changed text */
    function delayedResize() {
      window.setTimeout(resize, 0);
    }
    //theTextArea.focus();
    delayedResize();
  };

  // Serves no real purpose, but hello dev person!
  var addConsoleMessage = function addConsoleMessage() {
    if (typeof console !== 'undefined' && typeof console.log === 'function' && !window.test) {
      console.log('\n      %c                 *         .--.\n      %c                          / /  \'\n      %c *                       | |\n      %c                          \\ \\__,\n      %c             *         +   \'--\'  *\n      %c                 +   /\\\n      %c    +              .\'  \'.   *\n      %c           *      /======\\      +\n      %c                 ;:.  _   ;\n      %c                 |:. (_)  |\n      %c                 |:.  _   |\n      %c       +         |:. (_)  |          *\n      %c                 ;:.      ;\n      %c               .\' \\:.    / \'.\n      %c              / .-\'\':._.\'\'-. \\\n      %c              |/    /||\\    \\|\n      %c            _..--"""\'\'\'\'"""--.._\n      %c      _.-\'\'\'                    \'\'\'-._\n      %c    -\'        %cHello, BT Person%c        \'-\n      %c \n      %c Hi, this is Faizal, Hope you like the code!', 'color:#D0E3F1', 'color:#D0E3F1', 'color:#C0DAEC', 'color:#C0DAEC', 'color:#B0D1E8', 'color:#B0D1E8', 'color:#A1C7E3', 'color:#A1C7E3', 'color:#91BEDE', 'color:#91BEDE', 'color:#81B5D9', 'color:#81B5D9', 'color:#72ABD5', 'color:#72ABD5', 'color:#62A2D0', 'color:#62A2D0', 'color:#5299CB', 'color:#5299CB', 'color:#4390C7', 'color:#4390C7', 'color:#4390C7', 'color: #eaeaff', 'color: #60d671');
    }
  };
  return {
    init: init,
    customValidator: customValidator
  };
}();
btApp.init();
//# sourceMappingURL=main.js.map

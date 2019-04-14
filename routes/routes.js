module.exports = function(app) {
  app.get("/reformat/", function(req, res) {
    let inputString = req.query.string;
    let inWord = false;
    let wordsArray = [];
    let currentWord = "";
    let newLinesArray = []
    //we need to know which carraige return character we received
    let carraigeReturnChar = "";
    if (inputString.indexOf("\r\n") == 50) {
        carraigeReturnChar = "\r\n"
    } else {
        carraigeReturnChar = "\n"
    }

    //split inputString into lines
    let linesArray = inputString.split(carraigeReturnChar);
    // loop through the lines
    linesArray.forEach(line => {
        //loop through each index in the line
      for (i = 0; i < line.length; i++) {
          //if inside a word
        if (inWord) {
            //are we at the end of a word?
          if (line[i] == '"') {
            inWord = false;
            currentWord += "]";
            wordsArray.push(currentWord);
            currentWord = "";
          //if not at the end of the word  
          } else {
            currentWord += line[i];
          }
        } else {
          if (line[i] == '"') {
            inWord = true;
            currentWord += "[";
          }
        }
      }
    //join the words inside the line using " " & add the joined words to newLinesArray
      newLinesArray.push(wordsArray.join(" "));
    //clear wordsArray to use again for next line
      wordsArray = [];
    });
    //join the lines with new line character
    console.log(newLinesArray.join(carraigeReturnChar))
    res.send(newLinesArray.join(carraigeReturnChar));
  });
};

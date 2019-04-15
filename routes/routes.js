module.exports = function(app) {
  app.get("/reformat/", function(req, res) {
    let inWord = false;
    let wordsArray = [];
    let currentWord = "";
    let newLinesArray = []
    //save the carraige return character we received from the csvString
    let carraigeReturnChar = "";
    if (req.query.csvString.indexOf("\r\n") == 50) {
        carraigeReturnChar = "\r\n"
    } else {
        carraigeReturnChar = "\n"
    }

    //split the csvString into lines at the carraige rerurn character
    let linesArray = req.query.csvString.split(carraigeReturnChar);
    // loop through the lines
    linesArray.forEach(line => {
      //go through each character in the line
      for (i = 0; i < line.length; i++) {
        //if inside a word
        if (inWord) {
          //if we reach end of word
          if (line[i] == '"') {
            inWord = false;
            currentWord += "]";
            wordsArray.push(currentWord);
            currentWord = "";
          //if haven't reach end of word
          } else {
            //add current character to the currentWord
            currentWord += line[i];
          }
        //else if not inside word
        } else {
          //look for start of next word
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
    //join the lines with new line character & send
    res.send(newLinesArray.join(carraigeReturnChar));
  });
};

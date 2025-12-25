window.onload = function (){
    const submitButton = document.getElementById("submitButton");
    const textArea = document.getElementById("sParser");
    const outputArea = this.document.getElementById("output");
    
    submitButton.addEventListener("click", function() {
        var inputText = textArea.value;
        var result = inputText.replace(/ +/g, " ");
        result = result.replace(/\n+/g, "\n");
        result = result.replace(/[^\x00-\x7F]/g, "");
        let newSlides = result.match(/\n\s*\w{0,4}\.|\n.*\:/g);

        newSlides.forEach(newSlide => {
            let delimitedString = newSlide.replace(/\n/g, "\\\\");
            result = result.replace(newSlide, delimitedString);
        });

        splitResult = result.split("\\\\");
        console.log(result);
        for (var i = 0; i < splitResult.length; i++){
            var endString = splitResult[i].trim();
            endString = endString.replace(/\n/, "\n\n");
            splitResult[i] = endString;
        }
        result = splitResult.join("\\\\");
        let curDate = new Date();
        var dateText = (curDate.getMonth() + 1) + "." + curDate.getDate() + "." + curDate.getFullYear();
        outputArea.textContent = dateText + "\n" + result;
    });
}

// Example input
// Title
//  iiii.    text
// verse: verse.
//  2.    point
// verse: verse

// verse
// Point #2

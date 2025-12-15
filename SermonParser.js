window.onload = function (){
    const submitButton = document.getElementById("submitButton");
    const textArea = document.getElementById("sParser");
    const outputArea = this.document.getElementById("output");
    
    submitButton.addEventListener("click", function() {
        var inputText = textArea.value;
        var result = inputText.replace(/ +/g, " ");
        console.log(result);
        result = result.replace(/\n+/g, "\n");
        result = result.replace(/[^\x00-\x7F]/g, "");
        let newSlides = result.match(/\n\w{0,4}\.|\n.*\:/g);

        newSlides.forEach(newSlide => {
            let delimitedString = newSlide.replace(/\n/g, "\\\\");
            result = result.replace(newSlide, delimitedString);
        });
      outputArea.textContent = result;
    });
}

//Example input
// Title
// iiii.    text
// verse: verse.
// 2.    point
// verse: verse

// verse
// Point #2

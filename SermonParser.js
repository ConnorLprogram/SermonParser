window.onload = function (){
    const submitButton = document.getElementById("submitButton");
    const textArea = document.getElementById("sParser");
    const rowArea = document.getElementById("sRow");
    const widthArea = document.getElementById("sWidth");
    const outputArea = this.document.getElementById("output");
    
    submitButton.addEventListener("click", function() {
        //Change to parse int
        const MaxLines = +rowArea.value;
        const RowLength = +widthArea.value;
        if (MaxLines < 1){
            rowArea.innerHTML = "Must "
        }

        var inputText = textArea.value;
        var result = inputText.replace(/ +/g, " ");
        result = result.replace(/\n+/g, "\n");
        //result = result.replace(/[^\x00-\x7F\u2013\u2014]/g, "");
        let verseNums = result.match(/\d[a-zA-Z]/g);

        if (verseNums){
            verseNums.forEach(verseNum => {
                //console.log(verseNum);
                let splitVerseNum = verseNum[0] + " " + verseNum[1];
                result = result.replace(verseNum, splitVerseNum);
            });
        }

        let newSlides = result.match(/\n\s*\w{0,4}\.|\n.*\:/g);
        if(newSlides){
            newSlides.forEach(newSlide => {
                let delimitedString = newSlide.replace(/\n/g, "\\\\\n");
                result = result.replace(newSlide, delimitedString);
            });
        }

        splitResult = result.split("\\\\");
        // console.log(result);
        if (splitResult){
            for (var i = 0; i < splitResult.length; i++){
                var curSlide = splitResult.at(i);
                var tempCharCount = 0;
                var tempRowCount = 0;
                var slideBreakCount = 0;
                var newSlideBreak = [];
                var lastPeriod = 0;
                for (var j = 0; j < curSlide.length; j++){
                    if (curSlide.at(j) == "."){
                        lastPeriod = j;
                    }

                    if (curSlide.at(j) == "\n"){
                        ++tempRowCount;
                        tempCharCount = 0;
                    } else if (tempCharCount < RowLength){
                        ++tempCharCount;
                        // console.log(curSlide[j] + " " +j);
                    } else {
                        ++tempRowCount;
                        tempCharCount = RowLength - tempCharCount + 1;
                    }

                    if (tempRowCount >= MaxLines){
                        var newSlideBreakIndex = j;

                        const lastPeriodDifference = j - lastPeriod;
                        if (lastPeriodDifference < RowLength){
                            newSlideBreakIndex = lastPeriod + 1;
                            tempCharCount = lastPeriodDifference
                            console.log(newSlideBreakIndex);
                        }

                        newSlideBreak.push(newSlideBreakIndex + (slideBreakCount * 2));
                        ++slideBreakCount;
                        tempRowCount = 0;
                    }
                }
                
                
                newSlideBreak.slice(0, -1).forEach(slideBreak => {
                    splitResult[i] = splitResult[i].slice(0, slideBreak) + "\\\\" + splitResult[i].slice(slideBreak);
                    
                });

                if (tempRowCount > 2){
                    splitResult[i] = splitResult[i].slice(0, newSlideBreak.at(-1)) + "\\\\" + splitResult[i].slice(newSlideBreak.at(-1));
                }
            }
            result = splitResult.join("\\\\");
        }
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

// 123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345
// 1111111111222222222233333333334444444444555555555566666666667777777777888888888899999999990000000000

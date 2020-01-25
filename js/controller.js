function input() {
    // text inputs
    let timeline_box = document.getElementById("timeline_box");
    let text_box = document.getElementById("text_box");
    let names_box = document.getElementById("names_box");

    //settings
    let delay_box = document.getElementById("delay_box");
    let shif_box = document.getElementById("shift_box");
    let start_box = document.getElementById("start_box");

    let output_box = document.getElementById("output_box");


    //initiate letiables
    let timeline = timeline_box.value.split("\n");
    let text = text_box.value.split("\n");
    let names = names_box.value.split("\n");

    let delay = +delay_box.value;
    let shift = +shift_box.value;
    let start = +start_box.value;



    //caching values
    localStorage.setItem("timeline_box", timeline_box.value);
    localStorage.setItem("text_box", text_box.value);
    localStorage.setItem("names_box", names_box.value);

    localStorage.setItem("delay_box", delay_box.value);
    localStorage.setItem("shift_box", shift_box.value);
    localStorage.setItem("start_box", start_box.value);



    //check for input errors & remove them if possibe
    errors(timeline, text);

    //output results 
    let output_arr = convert(timeline, text, delay, shift, start);
    output_box.value = output_arr.join("\n");
}

// function output(clear_arr){
// 	let output_box = document.getElementById("output_box");
// 	//let srt = "";
// 	output_box.value = clear_arr.join("\n");	
// }

function errors(timeline, text) {
    //check if string is blank
    for (let i = 0; i < timeline.length; i++) {
        //timeline
        if (timeline[i] == "") {
            let errorMessage = document.createElement("span");
            errorMessage.innerHTML = "Time #" + (i + 1) + " is empty!" + "<br>";
            document.getElementById('errors').appendChild(errorMessage);
        }
        //text
        if (text[i] == "") {
            let errorMessage = document.createElement("span");
            errorMessage.innerHTML = "Text #" + (i + 1) + " is empty!" + "<br>";
            document.getElementById('errors').appendChild(errorMessage);
        }
        //remove accidental spaces from timeline	
        timeline[i] = timeline[i].replace(/\s+/g, '');
    }
    return timeline;
}

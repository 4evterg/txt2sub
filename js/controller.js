function input() {
  // text inputs
  let timeline_box = document.getElementById("timeline_box");
  let text_box = document.getElementById("text_box");
  let names_box = document.getElementById("names_box");

  //settings
  let delay_box = document.getElementById("delay_box");
  let shift_box = document.getElementById("shift_box");
  let start_box = document.getElementById("start_box");

  let output_box = document.getElementById("output_box");

  //caching values
  localStorage.setItem("timeline_box", timeline_box.value);
  localStorage.setItem("text_box", text_box.value);
  localStorage.setItem("names_box", names_box.value);

  localStorage.setItem("delay_box", delay_box.value);
  localStorage.setItem("shift_box", shift_box.value);
  localStorage.setItem("start_box", start_box.value);

  //initiate letiables
  if (timeline_box.value != "") Sub.timeline = timeline_box.value.split("\n");
  if (text_box.value != "") Sub.text = text_box.value.split("\n");
  if (names_box.value != "") Sub.names = names_box.value.split("\n");

  Sub.delay = +delay_box.value;
  Sub.shift = +shift_box.value;
  Sub.start = +start_box.value;

  //check for input errors & remove them if possibe
  //errors(timeline, text);
  errors();
  countRows();
  addNames();
  convert();
  //output results
  // let output_arr = convert(timeline, text, delay, shift, start);

  output_box.value = Sub.srt.join("\n");
}

// function output(clear_arr){
// 	let output_box = document.getElementById("output_box");
// 	//let srt = "";
// 	output_box.value = clear_arr.join("\n");
// }

function errors() {
  //check if string is blank
  for (let i = 0; i < Sub.timeline.length; i++) {
    //timeline
    if (Sub.timeline[i] == "") {
      let errorMessage = document.createElement("span");
      errorMessage.innerHTML = "Time #" + (i + 1) + " is empty!" + "<br>";
      document.getElementById("errors").appendChild(errorMessage);
    }
    //text
    if (Sub.text[i] == "") {
      let errorMessage = document.createElement("span");
      errorMessage.innerHTML = "Text #" + (i + 1) + " is empty!" + "<br>";
      document.getElementById("errors").appendChild(errorMessage);
    }
    //remove accidental spaces from timeline
    Sub.timeline[i] = Sub.timeline[i].replace(/\s+/g, "");
  }
  // return timeline;
}

// (() => {console.log("wtf");})

function countRows() {
  let color = "red";
  if (timeline_box.value.length == text_box.value.length) {
    color = "green";
  }
  let spans = document.querySelectorAll(".countRows");
  rowsOf = [
    timeline_box.value.length,
    names_box.value.length,
    text_box.value.length
  ];
  for (let i = 0; i < spans.length; i++) {
    spans[i].innerHTML = rowsOf[i];
    spans[i].style.color = color;
  }
  if (
    names_box.value.length != timeline_box.value.ength ||
    names_box.value.length != text_box.value.length
  ) {
    document.querySelector(".countNames").style.color = "red";
  }
}

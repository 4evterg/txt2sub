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

  //clear output from the previous time
  Sub.srt = [];

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
  Sub.startsFrom = +start_box.value;

  //clear up error messages
  new messages().clear();

  //check for input errors & remove them if possibe
  errors();
  countRows();
  addNames();
  convert();

  //output results
  output_box.value = Sub.srt.join("\n");
}

function errors() {
  //check if string is blank
  let error;
  for (let i = 0; i < Sub.timeline.length; i++) {
    //timeline
    if (Sub.timeline[i] == "") {
      error = "Time #" + (i + 1) + " is empty!";
      messages("e", error);
    }
    //text
    if (Sub.text[i] == "") {
      error = "Text #" + (i + 1) + " is empty!";
      messages("e", error);
    }
    //remove accidental spaces from timeline
    Sub.timeline[i] = Sub.timeline[i].replace(/\s+/g, "");
  }
}

function countRows() {
  let text = text_box.value.lineCount();
  let time = timeline_box.value.lineCount();
  let names = names_box.value.lineCount();

  let spans = document.querySelectorAll(".countRows");
  rowsOf = [time, names, text];

  if (time != text) {
    messages("e", "number of timeline and text strings doesn't match");
  } else if (names != time || names != text) {
    messages("w", "number of names strings doesn't match");
  }
  for (let i = 0; i < spans.length; i++) {
    spans[i].innerHTML = rowsOf[i];
  }
}

function messages(type, message) {
  let color;
  switch (type) {
    case "e": // error
      color = "var(--error)";
      break;
    case "w": // warning
      color = "var(--warning)";
      break;
    default:
      // ok
      color = "var(--ok)";
      break;
  }
  let indicator = document.getElementById("blackstrip");
  indicator.style.backgroundColor = color;

  if (type == "e") {
    let errorMessage = document.createElement("span");
    errorMessage.innerHTML += message + "<br>";
    document.getElementById("errors").appendChild(errorMessage);
  }

  //reset from the previous check
  this.clear = () => {
    document.getElementById("errors").innerHTML = "";
  };
}

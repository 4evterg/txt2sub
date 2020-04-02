//using those to count lines in textarea
String.prototype.lines = function() {
  return this.split(/\r*\n/);
};
String.prototype.lineCount = function() {
  return this.lines().length;
};

function input() {
  // text inputs
  const timeline_box = document.getElementById("timeline_box");
  const text_box = document.getElementById("text_box");
  const names_box = document.getElementById("names_box");

  //settings
  const delay_box = document.getElementById("delay_box");
  const shift_box = document.getElementById("shift_box");
  const start_box = document.getElementById("start_box");

  const output_box = document.getElementById("output_box");

  

  //clear output from the previous time
  Sub.output = [];

  //caching values
  sCache.save("timeline_box", timeline_box.value);
  sCache.save("text_box", text_box.value);
  sCache.save("names_box", names_box.value);

  sCache.save("delay_box", delay_box.value);
  sCache.save("shift_box", shift_box.value);
  sCache.save("start_box", start_box.value);

  //initiate letiables
  if (timeline_box.value != "") Sub.timeline = timeline_box.value.split("\n");
  if (text_box.value != "") Sub.text = text_box.value.split("\n");

  if (document.getElementById("names_cb").checked) {
    if (names_box.value != "") {
      Sub.names = names_box.value.split("\n");
    }
  } else {
    Sub.names[0] = "";
  }

  Sub.delay = +delay_box.value;
  Sub.shift = +shift_box.value;
  Sub.startsFrom = +start_box.value;

  logInput();

  //clear up error messages
  new messages().clear();

  //check for input errors & remove them if possibe
  errors();
  countRows();

  //converting timeline to ms
  // must be done before any other operation
  // most of them needed time in ms format
  Sub.timeline = toMiliSec(Sub.timeline);
  charsec(Sub.timeline, Sub.text);
  if (document.getElementById("unite_cb").checked) {
    let unite_length = document.getElementById("unite_length");
    let unite_time = document.getElementById("unite_time");
    sCache.save("unite_length", unite_length.value);
    sCache.save("unite_time", unite_time.value);
    combine(unite_length.value, unite_time.value);
  }

  convert();

  //output results
  output_box.value = Sub.output.join("\n");
  if (autodown_cb.checked){
    download("subtitles.srt", Sub.output.join("\n"));
  }
}

function errors() {
  //check if string is blank
  let error;
  for (let i = 0; i < Sub.timeline.length; i++) {
    //timeline
    if (Sub.timeline[i] == "") {
      error = "Time #" + (i + 1) + " is empty!";
      error += " </br>        (After: " + Sub.timeline[i - 1] + ")";
      messages(error, "e");
    }
    //text
    if (Sub.text[i] == "") {
      error = "Text #" + (i + 1) + " is empty!";
      error += " </br> (After: " + Sub.text[i - 1] + ")";
      messages(error, "e");
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
    messages("number of timeline and text strings doesn't match", "e");
  } else if (
    (names != time || names != text) &&
    document.getElementById("names_cb").checked
  ) {
    messages("number of names strings doesn't match", "w");
  }
  for (let i = 0; i < spans.length; i++) {
    spans[i].innerHTML = rowsOf[i];
  }
}

function logInput() {
  const text = Sub.text;
  const timeline = Sub.timeline;
  const names = Sub.names;
  const delay = Sub.delay;
  const shift = Sub.shift;
  const starts_from = Sub.startsFrom;
  sLog([{ text }, { timeline }, { names }], "t");
  sLog([{ delay }, { shift }, { starts_from }], "t");
}

function download(filename, text) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

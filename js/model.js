//using those to count lines in textarea
String.prototype.lines = function() {
  return this.split(/\r*\n/);
};
String.prototype.lineCount = function() {
  return this.lines().length;
};

const deleteMe = () => console.trace("Alloha");

//main object
let Sub = {
  timeline: ["00:01", "00:02"],
  text: ["You must input some data", "otherwise this app makes no sense"],
  names: [],
  delay: 0,
  shift: 500,
  startsFrom: 1,
  margin: 10,
  srt: [],
  set: function() {}
};

// timeline, text, delay, shift, startsFrom
function convert() {
  let length = Sub.timeline.length;
  ("use strict");
  //this size is choosen because of 4 rows on each sub + empty sub
  // 3 - cause empty sub doesn't need text
  let clear_arr = new Array(length * 4 + 3);

  // let margin = 10;

  //converting timeline to ms
  Sub.timeline = toMiliSec(Sub.timeline);

  console.log("%c starting params", "color: green");
  //Computed property names
  //console.log({delay, shift, startsFrom});
  // display info as a table
  //console.table([delay, shift, startsFrom]);
  //trace shows from where function was called
  deleteMe();

  //start and end codes of sub
  let starts = new Array(length);
  let ends = new Array(length);

  //this is for starts timecodes
  //adding a delay before start
  //+ shift subs to "right" + margin
  for (let i = 0; i < starts.length; i++) {
    starts[i] = Sub.timeline[i];
    starts[i] += Sub.delay * 1000; // *1000 because we take delay in seconds but working with ms
    starts[i] += Sub.shift; //shifting to right
    starts[i] += Sub.margin; // adding margins beetwen subs
  }

  //this one for ends
  //the diff is that ends have no margin
  for (let i = 0; i < ends.length - 1; i++) {
    ends[i] = Sub.timeline[i + 1];
    ends[i] += Sub.delay * 1000; // *1000 because we take delay in seconds but working with ms
    ends[i] += Sub.shift; //shifting to right
  }
  //end time of last sub
  ends[ends.length - 1] = starts[starts.length - 1] + 1000;

  // catching up those 1sec parts
  for (let i = 0; i < length; i++) {
    if (ends[i] - starts[i] < 1000) {
      console.log("less than 1 sec: " + ends[i]);
      let delta = 1000 - (ends[i] - starts[i]);
      console.log("delta: " + delta);
      starts[i + 1] += delta;
      ends[i] += delta;
      console.log("changed to: " + ends[i]);
    }
  }

  let counter = 0;
  for (let i = 0; i < length * 4; i += 4) {
    let start = msToTime(starts[counter]);
    let end = msToTime(ends[counter]);
    Sub.srt.push(counter + Sub.startsFrom);
    Sub.srt.push(start + " --> " + end);
    Sub.srt.push(Sub.text[counter]);
    Sub.srt.push("");
    counter++;
  }

  //empty sub
  //counter-1 cause of counter++ in the end of previos cycle
  Sub.srt.push(counter + Sub.startsFrom);
  Sub.srt.push(
    msToTime(ends[counter - 1] + Sub.margin) +
      " --> " +
      msToTime(ends[counter - 1] + 1000 + Sub.margin)
  );
  Sub.srt.push(" ");

  // return clear_arr;
}

//computing miliseconds
function toMiliSec(timeline) {
  let minutes = new Array(timeline.length);
  let seconds = new Array(timeline.length);
  let mili_s = new Array(timeline.length);
  for (let t = 0; t < timeline.length; t++) {
    //split mm:ss
    let temp_m = timeline[t][0] + timeline[t][1];
    let temp_s = timeline[t][3] + timeline[t][4];

    //transform mm and ss to m and s
    // +string - transform string to number
    // it is like number() but shortly
    minutes[t] = +temp_m;
    seconds[t] = +temp_s;

    //computing miliseconds
    mili_s[t] = (minutes[t] * 60 + seconds[t]) * 1000;
  }
  return mili_s;
}

function msToTime(s) {
  // Pad to 2 or 3 digits, default is 2
  function pad(n, z) {
    z = z || 2;
    return ("00" + n).slice(-z);
  }

  let ms = s % 1000;
  s = (s - ms) / 1000;
  let secs = s % 60;
  s = (s - secs) / 60;
  let mins = s % 60;
  let hrs = (s - mins) / 60;
  return pad(hrs) + ":" + pad(mins) + ":" + pad(secs) + "," + pad(ms, 3);
}

function addNames() {
  for (i = 0; i < Sub.names.length; i++) {
    //if (Sub.names[i] == "Диктор") {
    // .replace() to remove accdient spaces
    Sub.text[i] = "(" + Sub.names[i].replace(/\s+/g, "") + ") " + Sub.text[i];
    //}
  }
}

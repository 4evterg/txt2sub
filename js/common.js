// hide/show names textarea depending on names checkbox
var names_col = document.getElementById("names_col");
var names_cb = document.getElementById("names_cb");

var unite_cb = document.getElementById("unite_cb");
var unite_length = document.getElementById("unite_length");
var unite_time = document.getElementById("unite_time");

var autodown_cb = document.getElementById("autodown_cb");

var srt_cb = document.getElementById("srt_cb");
var ass_cb = document.getElementById("ass_cb");

names_cb.onchange = function() {
  if (names_cb.checked) {
    names_col.classList.add("show");
    sCache.save("names_cb", true);
  } else {
    names_col.classList.remove("show");
    sCache.save("names_cb", false);
  }
};
// call onchange to correctly displaying names after refresh (F5)
names_cb.onchange();

unite_cb.onchange = function() {
  if (unite_cb.checked) {
    unite_length.disabled = 0;
    unite_time.disabled = 0;
    sCache.save("unite_cb", true);
  } else {
    unite_length.disabled = 1;
    unite_time.disabled = 1;
    sCache.save("unite_cb", false);
  }
};
// call onchange to correctly displaying names after refresh (F5)
unite_cb.onchange();

autodown_cb.onchange = function() {
  if (autodown_cb.checked) {
    sCache.save("autodown_cb", true);
  } else {
    sCache.save("autodown_cb", false);
  }
};
autodown_cb.onchange();

let format_cb = function() {
  if (srt_cb.checked) {
    sCache.save("srt_cb", true);
    sCache.save("ass_cb", false);
  } else {
    sCache.save("srt_cb", false);
    sCache.save("ass_cb", true);
  }
};

srt_cb.onchange = format_cb;
ass_cb.onchange = format_cb;

srt_cb.onchange();
ass_cb.onchange();
// copy output textarea text on click
document.getElementById("output_box").onclick = () => {
  document.getElementById("output_box").select();
  document.execCommand("copy");
  sToast("Text copied in buffer!");
};

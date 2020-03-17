// hide/show names textarea depending on names checkbox
var names_col = document.getElementById("names_col");
var names_cb = document.getElementById("names_cb");

var unite_cb = document.getElementById("unite_cb");
var unite_length = document.getElementById("unite_length");
var unite_time = document.getElementById("unite_time");

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

// copy output textarea text on click
document.getElementById("output_box").onclick = () => {
  document.getElementById("output_box").select();
  document.execCommand("copy");
  sToast("Text copied in buffer!");
};

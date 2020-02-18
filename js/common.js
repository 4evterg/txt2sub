// hide/show names textarea depending on names checkbox
var names_col = document.getElementById("names_col");
var names_cb = document.getElementById("names_cb");

names_cb.onchange = function() {
  if (names_cb.checked) {
    names_col.classList.add("show");
  } else {
    names_col.classList.remove("show");
  }
};
// call onchange to correctly displaying names after refresh (F5)
names_cb.onchange();

// copy output textarea text on click
document.getElementById("output_box").onclick = () => {
  document.getElementById("output_box").select();
  document.execCommand("copy");
  sToast("Text copied in buffer!");
};

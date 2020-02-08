// Get the modal
var modal = document.getElementById("sModal");
var sm_content = document.getElementById("sm-content");
// Get the button that opens the modal
var btn = document.getElementById("sModalBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("sModal-close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.classList.add("show");
  sm_content.classList.add("show");
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.classList.remove("show");
  sm_content.classList.remove("show");
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.classList.remove("show");
    sm_content.classList.remove("show");
  }
};

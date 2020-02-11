function messages(message, type) {
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

function sLog(message, type) {
  switch (type) {
    case "e": // error
      color = "var(--error)";
      break;
    case "w": // warning
      color = "var(--warning)";
      break;
    case "in": // inputed data
      color = "var(--warning)";
      break;
    case "prog": // data in progress
      color = "var(--warning)";
      break;
    case "out": // outputed data
      color = "var(--warning)";
      break;
    default:
      // info
      color = "var(--ok)";
      break;
  }
}

// reset sLog_recent value after refresh
localStorage.setItem("sLog_recent", 0);

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
  let style = "";

  // where call is take place
  // if in html than value = null, so we change it to "html",
  // so we can pass checks and indicate properly
  let caller = sLog.caller ? sLog.caller.name : "html";
  recent = localStorage.getItem("sLog_recent");
  if (recent == "null") {
    recent = "html";
  }

  switch (type) {
    case "e": // error
      color = "var(--error)";
      break;
    case "w": // warning
      color = "var(--warning)";
      break;
    case "t": // in table view
      // format of message in this case
      // must be - [{obj1}, {obj2}, {obj3}, ....]
      this.table = true;
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

  if (caller != recent) {
    console.log(
      "%c ------- " + caller + "() -------",
      "color: white; font-weight: bold; background-color: black"
    );
  }

  // table style log or simple
  if (!this.table) {
    console.log(message);
  } else {
    let table_arr = {};
    for (let i = 0; i < message.length; i++) {
      const obj = message[i];
      const key = Object.keys(obj)[0];
      table_arr[key] = obj[key];
    }
    console.table(table_arr);
  }
  localStorage.setItem("sLog_recent", caller);
}

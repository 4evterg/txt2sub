// reset sLog_recent value after refresh
localStorage.setItem("sLog_recent", 0);

function messages(message, type) {
  let color;

  switch (type) {
    case "e": // error
      color = "var(--error)";
      let errorMessage = document.createElement("span");
      errorMessage.innerHTML += message + "<br>";
      document.getElementById("errors").appendChild(errorMessage);
      break;
    case "w": // warning
      color = "var(--warning)";
      sLog(message, "w");
      break;
    default:
      // ok
      color = "var(--ok)";
      break;
  }
  let indicator = document.getElementById("blackstrip");
  indicator.style.backgroundColor = color;

  //reset from the previous check
  this.clear = () => {
    document.getElementById("errors").innerHTML = "";
  };
}

function sLog(message, type) {
  let style = "background-color: ";

  // where call is take place
  // if in html than value = null, so we change it to "html",
  // so we can pass checks and indicate properly
  let caller = sLog.caller ? sLog.caller.name : "html";
  recent = localStorage.getItem("sLog_recent");
  if (recent == "null") {
    recent = "html";
  }

  // Just a little neat quirk
  // generate diferent backgrounds for diferent callers
  let bgc = "rgb(";
  bgc += caller.charCodeAt(0) * (caller.charCodeAt(2) % 2) + caller.length;
  bgc += ",";
  bgc += caller.charCodeAt(1) * (caller.charCodeAt(1) % 2) + caller.length * 10;
  bgc += ",";
  bgc += caller.charCodeAt(2) * (caller.charCodeAt(0) % 2) + caller.length * 20;
  bgc += ");";

  style += bgc;
  style += "color: #fff;";
  style += "text-shadow: 1px 1px 2px black;";

  if (caller != recent) {
    console.log(
      "%c ------- " + caller + "() ------- ",
      style + "font-weight: bold;"
    );
  }

  localStorage.setItem("sLog_recent", caller);

  switch (type) {
    case "e": // error
      console.log(
        "%c" + message,
        "background-color: #d72323; color: #fff; text-shadow: 1px 1px 2px black;"
      );
      return;
    case "w": // warning
      console.log(
        "%c" + message,
        "background-color: #ffd105; color: #fff; text-shadow: 1px 1px 2px black;"
      );
      return;
    case "t": // in table view
      // format of message in this case
      // must be - [{obj1}, {obj2}, {obj3}, ....]
      this.table = true;
      let table_arr = {};
      for (let i = 0; i < message.length; i++) {
        const obj = message[i];
        const key = Object.keys(obj)[0];
        table_arr[key] = obj[key];
      }
      console.table(table_arr);
      return;
    case "st": //simple table
      console.table(message);
      return;

    // Work in progress
    // case "it": // incrimented table
    //   // in case if we have cycle or smth else
    //   // stack up values and in the end
    //   // display them as a table
    //   // thru "dit" option
    //   it_arr.push(message);
    //   return;
    //   break;
    // case "dit": // display incrimented table result
    //   console.log("%c " + message, "background-color: black; color: white;");
    //   console.table(it_arr);
    //   return;
    //   break;
    case "out": // outputed data
      color = "var(--warning)";
      break;
    default:
      // info
      color = "var(--ok)";
      break;
  }

  console.log("%c" + message, color);
}

// -------------sToast-------------
function sToast(message) {
  var toast = document.getElementById("sToast");
  //reset from previous usage
  toast.innerHTML = "";
  toast.innerHTML = message;
  toast.classList.add("show");
  setTimeout(function() {
    toast.className = toast.className.replace("show", "");
  }, 2000);
}

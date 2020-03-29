let sCache = {
  save: function(id, value) {
    // adding this to control is it our varible our not (google, yandex, etc.)
    id += "_sCache";

    // checking if object was cached before
    // and it's value changed

    if (localStorage.getItem(id) == null || localStorage.getItem(id) != value) {
      localStorage.setItem(id, value);
      sLog("Varriable with id: " + id + " was added to cache!");
    }
  },
  check: function() {
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      let regex = /_sCache/;
      if (regex.test(key)) {
        let elem = key.replace(/_scache/gi, "");
        let regex_cb = /_cb/;
        if (regex_cb.test(elem)) {
          // JSON.parse because localstorage saves
          // true and false as a string rather than a boolean value
          document.getElementById(elem).checked = JSON.parse(
            localStorage.getItem(key)
          );
        } else {
          document.getElementById(elem).value = localStorage.getItem(key);
        }
      }
    }
  }
};

// immideatly check for cache
sCache.check();

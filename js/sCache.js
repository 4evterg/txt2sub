let sCache = {
  save: function(id, value) {
    // checking if object was cached before 
    // and it's value changed 
    if (localStorage.getItem(id) != null && localStorage.getItem(id) != value) {
      localStorage.setItem(id, value);
      sLog("Varriable with id: " + id + " was added to cache!");
      // sLog([{a}, {b}], "t");
    }
  },
  check: function() {
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (key != "sLog_recent") {
        document.getElementById(key).value = localStorage.getItem(key);
      }
    }
  }
};

// immideatly check for cache
sCache.check();

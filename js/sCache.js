let sCache = {
  save: function(id, value) {
    if (!localStorage.getItem(id)) {
      localStorage.setItem(id, value);
      console.trace("Varriable with id: " + id + " was added to cache!");
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

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
      document.getElementById(key).value = localStorage.getItem(key);
      console.log(key);
    }
  }
};

// immideatly check for cache
sCache.check();

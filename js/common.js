(function connectAll() {
    var controller = document.createElement("script");  
    var model = document.createElement("script");  
    controller.src = "js/controller.js";  
    model.src = "js/model.js";  
    document.body.appendChild(controller); 
	document.body.appendChild(model);  
	
	//check for values in cache 
	if (localStorage.getItem("timeline_box")){
		document.getElementById("timeline_box").value = localStorage.getItem("timeline_box");
	}
	if (localStorage.getItem("text_box")){
		document.getElementById("text_box").value = localStorage.getItem("text_box");
	}
	if (localStorage.getItem("delay_box")){
		document.getElementById("delay_box").value = localStorage.getItem("delay_box");
	}
	if (localStorage.getItem("shift_box")){
		document.getElementById("shift_box").value = localStorage.getItem("shift_box");
	}
	if (localStorage.getItem("start_box")){
		document.getElementById("start_box").value = localStorage.getItem("start_box");
	}
})()
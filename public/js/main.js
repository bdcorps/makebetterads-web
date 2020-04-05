$( document ).ready(function() {
	var data = <%- JSON.stringify(data) %>;
	console.log("this is patient info" + data);
});
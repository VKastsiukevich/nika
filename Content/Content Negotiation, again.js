var http = require("http");

function readStreamAsString(stream, callback) {
	var content = "";
	stream.on("data", function(chunk) {
		content += chunk;
	});
	stream.on("end", function() {
		callback(null, content);
	});
	stream.on("error", function(error) {
		callback(error);
	});
}

[ "text/html", "text/plain", "application/json"].forEach(function(type) {
	http.request({
		hostname: "eloquentjavascript.net",
		path: "/author",
		headers: {Accept: type}
	}, function(response) {
		if (response.statusCode != 200) {
			console.error("Error: " + response.statusMessage);
			return;
		}
		readStreamAsString(response, function(error, content) {
			console.log(content);
		});
	}).end();
});
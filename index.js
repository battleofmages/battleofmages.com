var aero = require("aero");

aero.start();

aero.app.param("ip", function(request, response, next, ip) {
	request.country = "de";
	next();
});

aero.app.get("/country/:ip", function(request, response) {
	response.end(request.country);
});
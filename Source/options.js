function refreshLicenses() {
	chrome.storage.local.get(
		[lastUpdatedKey, licensesKey],
		function (result) {
			var lastUpdated = result[lastUpdatedKey];
			var licenses = result[licensesKey];
			var value = "No licenses loaded.";

			if (licenses && licenses.length > 0) {
				let date = new Date(lastUpdated);
				let time = date.toLocaleDateString() + " " + date.toLocaleTimeString();
				value = licenses.length + " licenses loaded on " + time + ".";
			}

			writeOutput(value);
		}
	);
}

function writeOutput(value) {
	var outputElement = document.querySelector("#output");
	outputElement.innerHTML = value;
}

var lastUpdatedKey = "lastUpdated";
var licensesKey = "licenses";

refreshLicenses();
document.querySelector("#updateButton").addEventListener("click", function () {
	var request = new XMLHttpRequest();

	request.open("GET", "https://menu.gog.com/v1/account/licences", true);
	request.onreadystatechange = function () {
		if (request.readyState === 4) {
			if (request.status === 200) {
				let licenses = JSON.parse(request.responseText);
				if (licenses instanceof Array) {
					let settings = {};
					settings[lastUpdatedKey] = (new Date()).getTime();
					settings[licensesKey] = licenses;
					chrome.storage.local.set(
						settings,
						function () {
							refreshLicenses();
						}
					);
				} else {
					writeOutput("Invalid response.");
				}
			} else if (request.status === 401) {
				writeOutput("Please log in to GOG.");
			} else {
				writeOutput("Failed to retrieve your licenses.");
			}
		}
	};

	writeOutput("Loading...");
	request.send();
});

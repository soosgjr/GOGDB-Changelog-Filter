function filter(tabId) {
	chrome.storage.local.get(
		[isEnabledKey, licensesKey],
		function (storage) {
			if (storage[isEnabledKey]) {
				let licenses = storage[licensesKey];
				if (licenses) {
					chrome.tabs.executeScript(
						tabId,
						{ code: "(" + getIds + ")(\"" + selector + "\");" },
						function (result) {
							var ids = result[0];
							for (let i = 0; i < ids.length; i++) {
								let id = ids[i];
								if (licenses.indexOf(id) < 0) {
									chrome.tabs.executeScript(
										tabId,
										{ code: "(" + hideItem + ")(\"" + selector + "\", " + i + ");" }
									);
								}
							}
						}
					);
				}
			}
		}
	);
}

function getIds(selector) {
	var elements = document.querySelectorAll(selector);
	var result = [];

	for (let i = 0; i < elements.length; i++) {
		result.push(elements[i].innerHTML.trim());
	}

	return result;
}

function hideItem(selector, index) {
	var elements = document.querySelectorAll(selector);
	var parent = elements[index].parentNode.parentNode;
	parent.style.display = "none";
}

function toggle() {
	chrome.storage.local.get(
		[isEnabledKey],
		function (result) {
			var isEnabled = result[isEnabledKey];
			var settings = {};
			settings[isEnabledKey] = !isEnabled;
			chrome.storage.local.set(
				settings,
				function () {
					updateIcon();
				}
			);
		}
	);
}

function updateIcon() {
	chrome.storage.local.get(
		[isEnabledKey, licensesKey],
		function (storage) {
			var icon;
			var isEnabled = storage[isEnabledKey];

			if (isEnabled) {
				icon = "icon-16.png";
			} else {
				icon = "icon-16-disabled.png";
			}

			chrome.browserAction.setIcon({ path: icon });
		}
	);
}

var isEnabledKey = "isEnabled";
var licensesKey = "licenses";
var selector = ".col-change-id > a";
chrome.browserAction.onClicked.addListener(toggle);
updateIcon();

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	if (changeInfo.status === "complete" && tab.url) {
		filter(tabId);
	}
});

var self = require("sdk/self");
var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var clipboard = require("sdk/clipboard");
var notifications = require("sdk/notifications");
var prefList = require('sdk/simple-prefs');

var button = buttons.ActionButton({
  id: "ShtnIt",
  label: "Shtn It!",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick
});

function handleClick() {
	var tabs = require("sdk/tabs");
	shtnIt(tabs.activeTab.url);
}

function shtnIt(url)
{
	var returnData = '';
	url = encodeURIComponent(url);
	
	var Request = require("sdk/request").Request;
	var shtnItResponse = Request({
		url: "https://pximg.xyz/api/v2/shtn/create?url=" + url,
		onComplete: function (response) {
			var textR = response.text;
			var parsed = JSON.parse(textR);
			returnData = parsed.Message.url;
			clipboard.set(returnData);
			if (prefList.prefs['notificationsEnabled'] == true) {
				notifications.notify({
				  title: "Shtn It!",
				  text: "Your shortened link has been copied to the clipboard.\n" + returnData,
				  iconURL: "./icon-64.png"
				});
			}
		}
	});
	shtnItResponse.get();
}
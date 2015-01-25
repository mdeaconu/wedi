// ==UserScript==
// @name wediExt
// @include http://*
// @include https://*
// @require lib/microformat-shiv.js
// @require lib/jquery-1.6.4.min.js
// @require lib/jquery.microdata.js
// @require lib/jquery.microdata.json.js
// @all-frames true
// ==/UserScript==

var totalNotifications = 0;

/* microformats */
var microformats_items = microformats.getItems(),
	microformats_data = {'data': microformats_items, 'url': document.location.href};

if (microformats_items && microformats_items.items.length > 0) {
	totalNotifications += microformats_items.items.length;	
}

kango.addMessageListener('getMFData', function() {
	if (microformats_items && microformats_items.items.length > 0) {
		kango.dispatchMessage('sendMFData', microformats_data);
	}
});

/* microdata */
var microdata_json = $.microdata.json(),
	microdata_data = {'data': microdata_json, 'url': document.location.href};

if (microdata_json && microdata_data.items.length > 0) {
	totalNotifications += microdata_data.items.length;
}

kango.addMessageListener('getMDData', function() {
	if (microdata_json && microdata_json.items.length > 0) {
		kango.dispatchMessage('sendMDData', microdata_data);
	}
});

if (totalNotifications) {
	kango.dispatchMessage('content', totalNotifications);
}

// ==UserScript==
// @name wediExt
// @include http://*
// @include https://*
// @require lib/microformat-shiv.js
// @require lib/jquery-1.6.4.min.js
// @require lib/jquery.microdata.js
// @require lib/jquery.microdata.json.js
// ==/UserScript==


var checkPages = function() {
	var totalNotifications = 0;
	var notificationFlag = 0;
	/* microformats */
	var microformats_items = microformats.getItems();
	var microformats_data = {'data': microformats_items, 'url': document.location.href};

	if (microformats_items && microformats_items.items.length > 0) {
		totalNotifications += 1;
		notificationFlag |= 1 << 0;
	}

	kango.addMessageListener('getMFData', function() {
		if (microformats_items && microformats_items.items.length > 0) {
			kango.dispatchMessage('sendMFData', microformats_data);
		}
	});

	/* microdata */
	var microdata = $.microdata.json();
	var microdata_json = JSON.parse(microdata);
	var	microdata_data = {'data': microdata_json, 'url': document.location.href};

	if (microdata_json && microdata.length > 1) {
		totalNotifications += 1;
		notificationFlag |= 1 << 1;
	}

	kango.addMessageListener('getMDData', function() {
		if (microdata_json && microdata.length > 1) {
			kango.dispatchMessage('sendMDData', microdata_data);
		}
	});

	/* send content*/
	var data = {
		total: totalNotifications,
		flag: notificationFlag
	};

	if (totalNotifications) {
		kango.dispatchMessage('content', data);
	}
}

checkPages();

kango.addMessageListener('check', function(event) {
	checkPages();
});
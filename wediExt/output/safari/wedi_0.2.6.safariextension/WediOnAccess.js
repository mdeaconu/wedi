// ==UserScript==
// @name wediExt
// @include http://*
// @include https://*
// @require lib/microformat-shiv.js
// @require lib/jquery-1.6.4.min.js
// @require lib/jquery.microdata.js
// @require lib/jquery.microdata.json.js
// @require lib/helper.js
// @require WediExporter.js
// ==/UserScript==

var checkPages = function() {
	var totalNotifications = 0;
	var notificationFlag = 0;

	kango.addMessageListener('sendXML', function(event) {
		WediExporter(event.data);
	});

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
	console.log('microdata ' + microdata);
	if (microdata_json && microdata_json.items.length > 0) {
		totalNotifications += 1;
		notificationFlag |= 1 << 1;
	}

	kango.addMessageListener('getMDData', function() {
		if (microdata_json && microdata_json.items.length > 0) {
			kango.dispatchMessage('sendMDData', microdata_data);
		}
	});

	/* RDFa */
	var details = {
		method: 'GET',
		url: 'http://getschema.org/rdfaliteextractor',
		async: false,
		params: {'url': encodeURIComponent(document.location.href), 'out': 'json'},
		contentType: 'json'
	}

	var response = {};

	kango.xhr.send(details, function(data) {
        if (data.status == 200 && data.response != null) {
        	response = {'data':data.response, 'url': document.location.href};
        	if (Object.getOwnPropertyNames(data.response).length != 0) {
        		totalNotifications += 1;
        		notificationFlag |= 1 << 2;        		
        	}
        } else { 
	        kango.console.log('something went wrong[RDFa]');
        }
	});

	var connectionDetails = {
		method: 'POST',
		url: 'http://rdf-translator.appspot.com/convert/detect/pretty-xml/' + encodeURIComponent(document.location.href),
		async: false,
		contentType: 'application/rdf+xml'
	};

	kango.xhr.send(connectionDetails, function(data) {
		kango.console.log('status : ' + data.status);

        if (data.status == 200 && data.response != null) {
        	response['xml'] = data.response;
        	if (Object.getOwnPropertyNames(data.response).length != 0) {
        		kango.console.log('Ok');
        	}
        } else { 
	        kango.console.log('something went wrong');
        }
	});

	kango.addMessageListener('getRDFaData', function() {
		if (Object.getOwnPropertyNames(response).length != 0 && Object.getOwnPropertyNames(response.data).length != 0) {
			kango.dispatchMessage('sendRDFaData', response);
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

kango.addMessageListener('highlightMe', function(event) {
	var type = event.data.type;
	kango.console.log("type : " + type);

	var objList = document.querySelectorAll('[itemtype="' + type + '"]');
	console.log(objList);
	for (var i=0; i<objList.length; ++i) {
		var elem = objList[i];
		kango.console.log('elem : ' + elem.toString());
		elem.style.backgroundColor = 'blue';
	}
});
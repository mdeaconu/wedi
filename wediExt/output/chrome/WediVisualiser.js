function show_mf(envelope) {
	var code = document.getElementById("code_mf");

	if (envelope) {
		code = document.getElementById("code_mf");
		jsonstring = JSON.stringify(envelope.data)
		code.textContent = js_beautify(jsonstring);

		found_mf(envelope.data.items, envelope.url);
	}
}

function found_mf(items, url) {
	var found = document.getElementById("found_mf"),
	address = document.getElementById("address_mf"),
	out = [],
	types;

	if (items) {
		for (var i=0; i<items.length; ++i) {
			types = items[i].type;
			for (var x=0; x<types.length; ++x) {
				if (out.indexOf(types[x]) == -1) {
					out.push(types[x])
				}
			}
		}
	}

	if (out.length > 0) {
		found.textContent = " Found: " + out.join(", ");
	} else {
		found.textContent = " Sorry no microformats where found on this page";
	}

	address.textContent = url;
}

KangoAPI.onReady(function() {
	kango.dispatchMessage('offline');

	kango.addMessageListener('sendMFData', function(event) {
		show_mf(event.data);
	});

	kango.browser.tabs.getCurrent(function(tab) {
		if (!tab.isActive()) {
			return;
		}

		tab.dispatchMessage('getMFData');
	});                                
});
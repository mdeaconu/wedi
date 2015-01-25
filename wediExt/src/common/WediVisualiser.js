function show(envelope) {
	var code = document.getElementById("code");

	if (envelope) {
		code = document.getElementById("code");
		jsonstring = JSON.stringify(envelope.data)
		code.textContent = js_beautify(jsonstring);

		found(envelope.data.items, envelope.url);
	}
}

function found(items, url) {
	var found = document.getElementById("found"),
	address = document.getElementById("address"),
	out = [],
	types;

	if (items) {
		for (var i=0; i<items.length; ++i) {
			types = items[i].type;
			kango.console.log('types : ' + types);
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

	kango.addMessageListener('sendData', function(event) {
		show(event.data);
	});

	kango.browser.tabs.getCurrent(function(tab) {
		if (!tab.isActive()) {
			return;
		}

		tab.dispatchMessage('getData');
	});                                
});
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
		found.textContent = " No microformats where found on this page";
	}

	address.textContent = url;
}

function show_md(envelope) {
	var code = document.getElementById("code_md");

	if (envelope) {
		code = document.getElementById("code_md");
		jsonstring = JSON.stringify(envelope.data)
		code.textContent = js_beautify(jsonstring);

		found_md(envelope.data.items, envelope.url);
	}
}

function found_md(items, url) {
	var found = document.getElementById("found_md"),
	address = document.getElementById("address_md"),
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
		found.textContent = " No microdata where found on this page";
	}

	address.textContent = url;
}

KangoAPI.onReady(function() {
	kango.dispatchMessage('offline');

	kango.addMessageListener('sendMFData', function(event) {
		document.getElementById('empty').style.display = 'none';
		document.getElementById('mf').style.display = 'block';
		show_mf(event.data);
	});

	kango.addMessageListener('sendMDData', function(event) {
		document.getElementById('empty').style.display = 'none';
		document.getElementById('md').style.display = 'block';
		show_md(event.data);
	});

	kango.browser.tabs.getCurrent(function(tab) {
		if (!tab.isActive()) {
			return;
		}

		tab.dispatchMessage('getMFData');
	});                                

	kango.browser.tabs.getCurrent(function(tab) {
		if (!tab.isActive()) {
			return;
		}

		tab.dispatchMessage('getMDData');
	});
});
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
	tags = [],
	types;

	address.textContent = url;

	if (items) {
		for (var i=0; i<items.length; ++i) {
			types = items[i].type;
			if (typeof types != 'undefined') {
				for (var x=0; x<types.length; ++x) {
					if (tags.indexOf(types[x]) === -1) {
						tags.push(types[x])
					}
				}
			}
		}
	}
	if (tags.length > 0) {
		var dom = document.getElementById('tags_mf');
		var len = dom.childNodes.length;
		for (var x = len-1; x > 0; --x) {
			dom.removeChild(dom.childNodes[x]); 
		}
		for (var x = 0; x < tags.length; ++x) {
			var tagSpan = document.createElement('span');
			tagSpan.setAttribute('class', 'tag');
			tagSpan.innerHTML = tags[x];
			document.getElementById('tags_mf').appendChild(tagSpan);
		}		
	}
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
	tags = [],
	types;

	address.textContent = url;

	if (items) {
		for (var i=0; i<items.length; ++i) {
			types = items[i].type;
			if (typeof types != 'undefined') {
				for (var x=0; x<types.length; ++x) {
					if (tags.indexOf(types[x]) === -1) {
						tags.push(types[x])
					}
				}
			}
		}
	}
	kango.console.log('tags : ' + tags.length);
	if (tags.length > 0) {
		var dom = document.getElementById('tags_md');
		var len = dom.childNodes.length;
		for (var x = len-1; x > 0; --x) {
			dom.removeChild(dom.childNodes[x]); 
		}
		for (var x = 0; x < tags.length; ++x) {
			var tagSpan = document.createElement('span');
			tagSpan.setAttribute('class', 'tag');
			tagSpan.innerHTML = tags[x];
			document.getElementById('tags_md').appendChild(tagSpan);
		}		
	}
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
function show_rdf(envelope) {
	var code 	= document.getElementById("code_rdf");
	var address = document.getElementById("address_rdf");
	var xml		= document.getElementById("code_xml");

	if (envelope) {
		code = document.getElementById("code_rdf");
		jsonstring = JSON.stringify(envelope.data)
		code.textContent = js_beautify(jsonstring);

		address.textContent = envelope.url;  
		xml.textContent = envelope.xml;
	}	
}

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
	var address = document.getElementById("address_mf"),
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
	var address = document.getElementById("address_md"),
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
		KangoAPI.resizeWindow(500, 450);
		show_mf(event.data);
	});

	kango.addMessageListener('sendMDData', function(event) {
		document.getElementById('empty').style.display = 'none';
		document.getElementById('md').style.display = 'block';
		KangoAPI.resizeWindow(500, 450);
		show_md(event.data);
	});
	
	kango.addMessageListener('sendRDFaData', function(event) {
		document.getElementById('empty').style.display = 'none';
		document.getElementById('rdf').style.display = 'block';
		KangoAPI.resizeWindow(500, 450);
		show_rdf(event.data);
	});

	kango.browser.tabs.getCurrent(function(tab) {
		if (!tab.isActive()) {
			return;
		}

		tab.dispatchMessage('getRDFaData');
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
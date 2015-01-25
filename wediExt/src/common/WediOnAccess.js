// ==UserScript==
// @name wediExt
// @include http://*
// @include https://*
// @require lib/microformat-shiv.js
// @all-frames true
// ==/UserScript==

var items = microformats.getItems(),
	data = {'data': items, 'url': document.location.href};

if (items && items.items.length > 0) {
	kango.dispatchMessage('content', items.items.length);
}

kango.addMessageListener('getData', function() {
	kango.console.log('length : ' + items.items.length);
	if (items && items.items.length > 0) {
		kango.dispatchMessage('sendData', data);
	}
});

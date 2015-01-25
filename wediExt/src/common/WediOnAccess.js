// ==UserScript==
// @name wediExt
// @include http://*
// @include https://*
// @all-frames true
// ==/UserScript==

kango.invokeAsync('kango.storage.getItem', 'colorNumber', function(data) {
    var colorNumber = data || 0;
    var colors = ['red','green','blue'];
	document.body.style.background = colors[colorNumber++];
    if (colorNumber > colors.length) {
    	colorNumber = 0;
    }
    // Save color number
    kango.invokeAsync('kango.storage.setItem', 'colorNumber', colorNumber);

	kango.dispatchMessage('content', Math.floor((Math.random() * 20) + 1));
});
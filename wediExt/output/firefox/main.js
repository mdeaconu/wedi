function WediExtension() {
    var self = this;

	kango.addMessageListener('content', function(event) {
		self.setNotification(event.data);
	});

	kango.addMessageListener('offline', function(event) {
		self.clear();
	});
                         
	kango.ui.browserButton.setPopup({url:'wedipage_ui.html', width: 500, height:440});
}

WediExtension.prototype = {	
    _setOffline: function() {
        kango.ui.browserButton.setTooltipText(kango.i18n.getMessage('No notifications'));
        kango.ui.browserButton.setIcon('icons/button_gray.png');
        kango.ui.browserButton.setBadgeValue(0);
    },

	_setUnseenCount: function(count) {
		kango.ui.browserButton.setTooltipText(kango.i18n.getMessage('Unseen Notification count') + ': ' + count);
		kango.ui.browserButton.setIcon('icons/button.png');
		kango.ui.browserButton.setBadgeValue(count);
	},

	setNotification: function(count) {
		var self = this;
		if (count == 0) {
			self._setOffline();
		} else {
			self._setUnseenCount(count);
		}
	},

	clear: function() {
		var self = this;
		self._setOffline();
	}
};

var extension = new WediExtension();
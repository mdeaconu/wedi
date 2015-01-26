function WediExtension() {
    var self = this;

	kango.addMessageListener('content', function(event) {
		self.setNotification(event.data);
	});

	kango.addMessageListener('offline', function(event) {
		self.clear();
	});

	var check = function() {
		self.checkPage();
	}

	kango.browser.addEventListener(kango.browser.event.TAB_CHANGED, check);  
	kango.ui.browserButton.setPopup({url:'wedipage_ui.html', width: 500, height:450});
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

	setNotification: function(notifications) {
		var self = this;
		if (notifications.total == 0) {
			self._setOffline();
		} else {
			self._setUnseenCount(notifications.total);

			if (notifications.flag & (1 << 2)) {
				kango.ui.browserButton.setBadgeBackgroundColor([255,0,255,255]); // FUXIA
			} else if (notifications.flag & (1 << 1) && !(notifications.flag & (1 << 0))) {
				kango.ui.browserButton.setBadgeBackgroundColor([255,0,0,255]);  // RED
			} else if (notifications.flag & (1 << 0)) {
				kango.ui.browserButton.setBadgeBackgroundColor([35,168,62,255]); // GREEN
			}
		}
	},

	checkPage: function() {
		var self = this;
		kango.browser.tabs.getCurrent(function(tab) {
			if (!tab.isActive()) {
				return;
			}
			tab.dispatchMessage('check');
		});
	},

	clear: function() {
		var self = this;
		self._setOffline();
	}
};

var extension = new WediExtension();
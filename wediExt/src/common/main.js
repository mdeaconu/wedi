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

			kango.console.log('flag : ' + notifications.flag);

			switch (notifications.flag) {
			case 1: 
			case 2:
			case 4:
				kango.ui.browserButton.setBadgeBackgroundColor([35,168,62,255]); // GREEN
				break;
			case 3:
			case 5:
			case 6:
				kango.ui.browserButton.setBadgeBackgroundColor([255,0,0,255]);  // RED
				break;
			case 7:
				kango.ui.browserButton.setBadgeBackgroundColor([255,0,255,255]); // FUXIA
				break;	
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
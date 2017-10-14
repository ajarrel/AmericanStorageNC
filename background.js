"use strict";

chrome.runtime.onStartup.addListener(function(){
	chrome.tabs.create({ url: 'main.html', selected: true });
});
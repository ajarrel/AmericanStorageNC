"use strict";

chrome.runtime.onInstalled.addListener(function(){
	chrome.tabs.create({ url: 'main.html', selected: true });
});
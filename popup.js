'use strict';
document.addEventListener('DOMContentLoaded',function(){
	document.getElementById('goto').addEventListener('click', function(){
		chrome.tabs.create({ url: 'main.html', selected: true });
	});
});

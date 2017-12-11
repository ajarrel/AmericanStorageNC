"use strict";

chrome.runtime.onInstalled.addListener(function(){
	chrome.tabs.create({ url: 'main.html', selected: true });
	
	chrome.bookmarks.search({ url: "https://us.fleetmatics.com/login.aspx", title: "Fleetmatics - Truck GPS"}, function(results){
		console.log(results);
		if (results.length === 0){
			//create
		} //else ignore
	});
});

var bookmarks = { 
	parentId: 1,
	title: 'American Storage Links',
	index: 0,
	children: [
		{url: 'https://us.fleetmatics.com/login.aspx', title: 'Fleetmatics - Truck GPS', order: 4},
		{url: 'https://www.mytimestation.com/Login.asp', title: 'MyTimeStation - Punch In/Out', order: 3},
		{url: 'https://americanstorage.slack.com/', title: 'Slack - Interoffice Chat', order: 0},
		{url: 'https://outlook.office365.com/owa/?realm=americanstoragenc.com', title: 'Outlook - Company Webmail Login', order: 1},
		{url: 'https://www.dropbox.com/login', title: 'Dropbox - Company File Management', order: 6},
		{url: 'https://myhub.smdservers.net', title: 'MyHub - Sitelink on the web', order: 2},
		{url: 'https://sso.8x8.com/sso/login', title: '8x8 - Company phone system', order: 5},
		{url: 'https://www.sparefoot.com/', title: 'Sparefoot - Aggregator for Storage', order: 7},
		{title: 'Our Websites', order: 8, children:[
			{title: 'American Storage - Pittsboro / Chapel Hill / Apex / Cary', url: 'https://americanstoragenc.com' },
			{title: 'Excess Storage - Knightdale / Raleigh / Garner / Clayton', url: 'https://www.excessstoragenc.com' },
			{title: 'Harrisburg - Harrisburg / Charlotte / UNC-Charlotte', url: 'https://www.bestharrisburgselfstorage.com' },
			{title: 'The Attic - Concord / Kannapolis / Charlotte', url: 'https://theatticstoragenc.com' },
			{title: 'Speedway - Charlotte Motor Speedway / Harrisburg / UNC-Charlotte', url: 'https://www.bestcarolinastorage.com' },
			{title: 'AAA/A1 - Durham / Duke University / Morrisville', url: 'https://durhamstoragesolutions.com' }
		]},
		{title: 'Our Google Listings', order: 9, children:[
			
		]},
		{title: 'Training', order: 10, children:[
			
		]}
	]
};

function createBookmarkTree(b){ //b = bookmarkObj
	var tObj;
	
	/*if (b.parentId !== undefined){
		tObj = {parentId: b.parentId, title: b.title, index: 0}
	}
	else{
		
	}*/
}
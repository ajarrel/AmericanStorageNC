"use strict";

var wp = {
	"base_uri": "https://proapi.whitepages.com/3.3/identity_check",
	"api_key": "eb901e58d95e4533b1784e3dce21f7df",
	"primary.address.city": null,
	"primary.address.postal_code": null,
	"primary.address.state_code": null,
	"primary.address.street_line_1": null,
	"primary.name": null,
	"primary.address.country_code": null,
	
	responses: []
};

var options = {
	method: "GET"
};
var i=0;

$(document).on('click', '#send-input', function(){
	var str = $('#wp-input').val();
	var arr = str.split("\n");
	var tObj = { };
	for (var ix = 0; ix < arr.length; ix++){
		arr[ix] = JSON.parse(arr[ix]);
		arr[ix].api_key = wp.api_key;
	}
	/*	
		$.getJSON(wp.base_uri, arr[i], function(d){
			wp.responses.push(d);
		});
	*/
	arr[i].api_key = wp.api_key;
	
	var url = new URL(wp.base_uri);
	url.search = new URLSearchParams(arr[i]);
	
	fetch(url).then(response => {
		return response.json();
	}).then(data => {
		console.log(data);
	}).then(data => {
		url = new URL(wp.base_uri);
		url.search = new URLSearchParams(arr[++i]); //increment i before using
	}).catch(err => {
		console.warn(err);
		console.warn(arr[++i]);
	});
	
});

function syncFetch(uri){
	
}
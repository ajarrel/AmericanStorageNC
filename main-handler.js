'use strict';

//Google my places API key 

var ratesTable = [
	{ site: 'Site 1', order: 0, selector: 'table#rates-chart', uri: 'https://americanstoragenc.com/self-storage/pittsboro-west-nc-27312', type: 'ajax' },
	{ site: 'H and R', order: 3, selector: 'table#rates-chart', uri: 'https://www.excessstoragenc.com/self-storage-knightdale-hr.php', type: 'ajax' },
	{ site: 'Harrisburg', order: 4, selector: 'table#rates-chart', uri: 'https://www.bestharrisburgselfstorage.com/self-storage/harrisburg-nc-28075', type: 'ajax' },
	{ site: 'The Attic', order: 6, selector: 'table#rates-chart', uri: 'https://theatticstoragenc.com/self-storage-rates.php', type: 'ajax' },
	{ site: 'Site 2', order: 1, selector: 'table#rates-chart', uri: 'https://americanstoragenc.com/self-storage/pittsboro-east-nc-27312', type: 'ajax' },
	{ site: 'Smithfield', order: 2, selector: 'table#rates-chart', uri: 'https://www.excessstoragenc.com/self-storage-knightdale-smithfield.php', type: 'ajax' },
	{ site: 'Speedway', order: 5, selector: 'table.units-table', uri: 'https://www.bestcarolinastorage.com/self-storage-harrisburg-nc-91762', type: 'ajax' },
	{ site: 'AAA', order: 7, selector: 'table#rates-chart', uri: 'https://durhamstoragesolutions.com/self-storage/durham-nc-27703', type: 'ajax' },
	{ site: 'Armadillo', order: 8, selector: '#slwe-storage-units', uri: 'https://www.securestoragetransactions.com/sitelink/index_new.mvc?action=select_unit&UnitID=undefined&sid=601325', type: 'ajax' }
];
var sparefoot = [ //selector is div.unit-list, stored in index 0.selector
	{ 
		site: 'Site 1', order: 0, uri: 'https://www.sparefoot.com/Pittsboro-NC-self-storage/American-Self-Storage-Highway-64-155481', selector: 'div.unit-list',
		callback: function(){
			$('button[type="button"] > *').unwrap();
			$('span.button-content').filter(function(){ return ($(this).text() === 'Continue'); }).remove();
		},
		type: 'ajax'
	},
	{ site: 'H and R', order: 3, uri: 'https://www.sparefoot.com/Knightdale-NC-self-storage/Excess-Storage-Center-109843', selector: 'div.unit-list', type: 'ajax' },
	{ site: 'Harrisburg', order: 4, uri: 'https://www.sparefoot.com/Harrisburg-NC-self-storage/Harrisburg-Self-Storage-152501', selector: 'div.unit-list', type: 'ajax' },
	{ site: 'The Attic', order: 6, uri: 'https://www.sparefoot.com/Concord-NC-self-storage/The-Attic-Self-Storage-199468', selector: 'div.unit-list', type: 'ajax' },
	{ site: 'Site 2', order: 1, uri: 'https://www.sparefoot.com/Pittsboro-NC-self-storage/American-Self-Storage-Mt-Gilead-109842', selector: 'div.unit-list', type: 'ajax' },
	{ site: 'Smithfield', order: 2, uri: 'https://www.sparefoot.com/Knightdale-NC-self-storage/Excess-Storage-Center-Smithfield-Road-199467', selector: 'div.unit-list', type: 'ajax' },
	{ site: 'Speedway', order: 5, uri: 'https://www.sparefoot.com/Harrisburg-NC-self-storage/Speedway-Self-Storage-153068', selector: 'div.unit-list', type: 'ajax' },
	{ site: 'AAA', order: 7, uri: 'https://www.sparefoot.com/Durham-NC-self-storage/AAA-Mini-Storage-202242', selector: 'div.unit-list', type: 'ajax' },
	{ site: 'Armadillo', order: 8, uri: false, selector: 'div.unit-list', type: 'ajax' }
];

var website = [
	{ site: 'Site 1', order: 0, type: 'iframe', uri: 'https://americanstoragenc.com' },
	{ site: 'H and R', order: 3, type: 'iframe', uri: 'https://www.excessstoragenc.com' },
	{ site: 'Harrisburg', order: 4, type: 'iframe', uri: 'https://www.bestharrisburgselfstorage.com' },
	{ site: 'The Attic', order: 6, type: 'iframe', uri: 'https://theatticstoragenc.com' },
	{ site: 'Site 2', order: 1, type: 'iframe', uri: 'https://americanstoragenc.com' },
	{ site: 'Smithfield', order: 2, type: 'iframe', uri: 'https://www.excessstoragenc.com' },
	{ site: 'Speedway', order: 5, type: 'iframe', uri: 'https://www.bestcarolinastorage.com' },
	{ site: 'AAA', order: 7, type: 'iframe', uri: 'https://durhamstoragesolutions.com' },
	{ site: 'Armadillo', order: 8, type: 'iframe', uri: 'https://armadilloselfstoragenc.com/' }
];

var review = [
	{ site: 'Site 1', order: 0, type: 'iframe', placeid: 'ChIJT10VpoO2rIkRM3F1gaYq1Pg' },
	{ site: 'H and R', order: 3, type: 'iframe', placeid: 'ChIJ66SUJ35crIkRu4s9fwR3vBk' },
	{ site: 'Harrisburg', order: 4, type: 'iframe', placeid: 'ChIJ_SYf398ayYkRC8_NY0-XM4c' },
	{ site: 'The Attic', order: 6, type: 'iframe', placeid: 'ChIJE_hVDO4PVIgR6giaSbwdTiU' },
	{ site: 'Site 2', order: 1, type: 'iframe', placeid: 'ChIJ3yV5jha_rIkRJ-z0TApmqGo' },
	{ site: 'Smithfield', order: 2, type: 'iframe', placeid: 'ChIJRW7wTRlDrIkRTj3gFBSMoQA' },
	{ site: 'Speedway', order: 5, type: 'iframe', placeid: 'ChIJhc8GNwYbVIgRAWRZNg1weMk' },
	{ site: 'AAA', order: 7, type: 'iframe', placeid: 'ChIJszm3u1XjrIkR2GBARWhOYss' },
	{ site: 'Armadillo', order: 8, type:'iframe', placeid: 'ChIJA_jJX6cPU4gRFFiDRxL2VfQ' }
];

var promises = [],global;

$(document).ready(function(){
	$('button').click(function(){ //UI handler to assign/unassign classes for selected button
		$(this).addClass('clicked');
		$('button').not(this).removeClass('clicked');
	});
	
	getRatings(); 
	
	$('#pricing').click(ratesTable, getRemoteData);
	$('#sparefoot').click(sparefoot, getRemoteData);
	$('#website').click(website, getRemoteData);
	$('#google-review').click(review, getRemoteGoogleData); //special handler since data comes via API instead of AJAX/IFRAME
	
});

function getRemoteData(e){
	console.log(e);
	var ratesArray = e.data;
	
	$('#target').empty().append('<img src="img/spinner.gif"></img>Loading...hang tight');
	
	$(ratesArray).each(function(i){

		var deferred = new $.Deferred();
		
		var wrapper = $(document.createElement('h1')).attr('id',e.data[i].site).text(e.data[i].site +' — '+ e.data[i].rating); //moved outside IF
		
		if (e.data[i].type === 'ajax' && e.data[i].uri){
			$.get(e.data[i].uri, [], function(d){

				var h = $( d.replace(/<img\b[^>]*>/ig, '') ); //strip images out of response before wrapping in jQuery
				h.find('td.rate-button').remove();

				e.data[i].dom = $(document.createElement('div'))
					.addClass('cell')
					.append(h.find(e.data[i].selector))
					.prepend(wrapper);

				deferred.resolve();

			}, 'html');
		}//end 'ajax' if
		else if (e.data[i].type === 'iframe'){
			var iframe = $(document.createElement('iframe')).attr('src',e.data[i].uri);
			e.data[i].dom = $(document.createElement('div'))
					.addClass('cell')
					.append(iframe)
					.prepend(wrapper);
			deferred.resolve();
		}

		promises.push(deferred);

	});	
	$.when.apply(undefined, promises).promise().done(function(){
		buildDom(e.data);
	});
}

function buildDom(obj){
	console.log("Obj inside buildDom"); console.log(obj);
	var tArr = new Array(obj.length), order; //tie the length of this temp array to the ratesArray
	global = obj;
	
	$('#target').empty(); //clean #target before append
	
	$(obj).each(function(i){
		order = obj[i].order;
		tArr[order] = obj[i].dom;
	});
	
	$(tArr).each(function(){
		$(this).appendTo('#target');
	});
	
	if (obj[0].callback !== undefined){ //optional callback, if exists, call it AFTER appending DOM
		obj[0].callback();
	}
}

function getRemoteGoogleData(e){
	
	$(e.data).each(function(i){
		
		var wrapper = $(document.createElement('h1')).attr('id',e.data[i].site).text(e.data[i].site + ' — ' + e.data[i].rating);
		var pDom = $(document.createElement('div')).addClass('cell');
		
		$(e.data[i].gmap.reviews).each(function(){ //loops through each site's 5 reviews pulled from Google's API
			var tDom = $(iHtml);
			
			var tStr;
			
			switch(this.rating){
				case 5:
					tStr = 'fivestar';
				break;
				case 4:
					tStr = 'fourstar';
				break;
				case 3:
					tStr = 'threestar';
				break;
				case 2:
					tStr = 'twostar';
				break;
				case 1:
					tStr = 'onestar';
				break;
							  }//end switch
			
			tDom.find('.author').text(this.author_name); 
			tDom.find('.star-rating').text(this.rating + String.fromCharCode(9733).repeat(this.rating)).addClass(tStr);
			tDom.find('.reviewbody').text(this.text);
			tDom.find('.review-time').text(this.relative_time_description);
			
			pDom.prepend(tDom); //use prepend because iterating reviews in descending order, so prepend perservers order
			
		});
		
		pDom.prepend(wrapper); //put the wrapper in last
		
		e.data[i].dom = pDom;
		
	});
	
	buildDom(e.data);
}

function getRatings(){
	var map = new google.maps.Map(document.getElementById('map'),{
		center: {lat: -33.866, lng: 151.196},
		zoom: 15
	});
	var service = new google.maps.places.PlacesService(map);
	
	$(review).each(function(i){
		service.getDetails({
			placeId: review[i].placeid
		}, function(place, status){
			sparefoot[i].rating = place.rating + String.fromCharCode(9733); //put the star rating in it's own property
			website[i].rating = place.rating + String.fromCharCode(9733);
			review[i].rating = place.rating + String.fromCharCode(9733);
			ratesTable[i].rating = place.rating + String.fromCharCode(9733);
			
			sparefoot[i].gmap = place; //put the entire return result from google in the gmap property
			website[i].gmap = place;
			review[i].gmap = place;
			ratesTable[i].gmap = place;
		});
	});
}

function formatReview(r){
	$(r).each(function(i){
		//$(
	});
}

var iHtml = '<div class="review-container"><div class="pref"><span class="author"></span><span> - </span><span class="star-rating"></span><br><span class="review-time"></span></div><div class="reviewbody"></div></div>';
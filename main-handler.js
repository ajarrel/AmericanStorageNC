'use strict';

function round(value, decimals) {
	return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}


var ratesInterval = false; //anytime you run clearInterval on this variable, set to false again
//Google my places API key 
var ratings = {
	
};
var global, hash;
var ratesTable = [
	{ site: 'Site 1', order: 0, selector: 'table#rates-chart', uri: 'https://americanstoragenc.com/self-storage/pittsboro-west-nc-27312', type: 'ajax', loc: "L01A" },
	{ site: 'H and R', order: 3, selector: 'table#rates-chart', uri: 'https://www.excessstoragenc.com/self-storage-knightdale-hr.php', type: 'ajax', loc: "L002" },
	{ site: 'Harrisburg', order: 4, selector: 'table#rates-chart', uri: 'https://www.bestharrisburgselfstorage.com/self-storage/harrisburg-nc-28075', type: 'ajax', loc: "L003" },
	{ site: 'The Attic', order: 6, selector: 'table#rates-chart', uri: 'https://theatticstoragenc.com/self-storage-rates.php', type: 'ajax', loc: "L005" },
	{ site: 'Site 2', order: 1, selector: 'table#rates-chart', uri: 'https://americanstoragenc.com/self-storage/pittsboro-east-nc-27312', type: 'ajax', loc: "L001" },
	{ site: 'Smithfield', order: 2, selector: 'table#rates-chart', uri: 'https://www.excessstoragenc.com/self-storage-knightdale-smithfield.php', type: 'ajax', loc: "L006" },
	{ site: 'Speedway', order: 5, selector: 'table.units-table', uri: 'https://www.bestcarolinastorage.com/self-storage-harrisburg-nc-91762', type: 'ajax', loc: "L004" },
	{ site: 'AAA', order: 7, selector: 'table#rates-chart', uri: 'https://durhamstoragesolutions.com/self-storage/durham-nc-27703', type: 'ajax', loc: "L007" },
	{ site: 'Armadillo', order: 8, selector: '#slwe-storage-units', uri: 'https://www.securestoragetransactions.com/sitelink/index_new.mvc?action=select_unit&UnitID=undefined&sid=601325', type: 'ajax', loc: "L008" },
	{
		site: "ARMSouth", order: 9, selector: '', uri: '', type: 'ajax', loc: "L009"
	}
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
	{ site: 'Armadillo', order: 8, uri: false, selector: 'div.unit-list', type: 'ajax' },
	{ site: "ARMSouth", order: 9, uri: false, selsecotr: '', type: 'ajax' }
];

var website = [
	{ site: 'Site 1', order: 0, type: 'iframe', uri: 'https://americanstoragenc.com' },
	{ site: 'H and R', order: 3, type: 'iframe', uri: 'https://www.excessstoragenc.com' },
	{ site: 'Harrisburg', order: 4, type: 'iframe', uri: 'https://www.americanselfstore.com/self-storage/nc/harrisburg/harrisburg-self-storage/' },
	{ site: 'The Attic', order: 6, type: 'iframe', uri: 'https://www.americanselfstore.com/self-storage/nc/concord/attic-self-storage/' },
	{ site: 'Site 2', order: 1, type: 'iframe', uri: 'https://americanstoragenc.com' },
	{ site: 'Smithfield', order: 2, type: 'iframe', uri: 'https://www.excessstoragenc.com' },
	{ site: 'Speedway', order: 5, type: 'iframe', uri: 'https://www.americanselfstore.com/self-storage/nc/harrisburg/speedway-storage/' },
	{ site: 'AAA', order: 7, type: 'iframe', uri: 'https://www.americanselfstore.com/self-storage/nc/durham/aaa-ministorage/' },
	{ site: 'Armadillo', order: 8, type: 'iframe', uri: 'https://armadilloselfstoragenc.com/' },
	{ site: "ARMSouth", order: 9, type: 'iframe', uri: 'https://www.americanselfstore.com/self-storage/nc/high-point/armadillo-self-storage-south/' }
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
	{ site: 'Armadillo', order: 8, type:'iframe', placeid: 'ChIJA_jJX6cPU4gRFFiDRxL2VfQ' },
	{
		site: "ARMSouth", order: 9, type: "iframe", placeid: 'ChIJsS1IKVAOU4gRVIlir4kg2Xk'
	}
];

var promises = [],global;

$(document).ready(function(){
	$('button').click(function(){ //UI handler to assign/unassign classes for selected button
		$(this).addClass('clicked');
		$('button').not(this).removeClass('clicked');
	});
	
	getRatings(); 
	
	$('#pricing').click(ratesTable, pollChanges);
	$('#sparefoot').click(sparefoot, getRemoteData);
	$('#website').click(website, getRemoteData);
	$('#google-review').click(review, getRemoteGoogleData); //special handler since data comes via API instead of AJAX/IFRAME
	$('button.category').not('#pricing').click(function(){
		if(ratesInterval){
			clearInterval(ratesInterval);
			ratesInterval = false;
		}
	});
    $(document).on("click", "#refresh", pollChanges);
	
	$('#pricing').one(function(){ clearTimeout(st); }); //remove st in the event user clicks "WebSite Pricing before autofire"
	var st = setTimeout(pollChanges, 2500);
	
});
function pollChanges(){
    
    if(ratesInterval){
        
    }
    else{
        ratesInterval = setInterval(pollChanges, 60000);
    }
    
    $.getJSON("http://excessofc.gotdns.org/s/hash.json", function(d){
        if( d.hash === localStorage.hash ){
            console.log("Polled changes, no change. Local hash: "+localStorage.hash + " -- remote hash: "+d.hash);
            if(localStorage.getItem('cache') === null){
                getRatesData(false);
            }
            else{
                //rates should already be on-screen
                getRatesData(true);
            }
        }
        else{
            console.log("Polled changes, hash mismatch, updating rates. Local hash: "+localStorage.hash+" -- remote hash: "+d.hash);
            getRatesData(false);
        }
    });
}
function parseRatesData(d){
    d = sortRates(d, "order", /L[0-9]{2,3}A?/);
        localStorage.hash = d.hash;
		
		for(var site in d){
            if( site !== "hash" ){
                var wrapper = $(document.createElement('h1')).attr('id',d[site].code).text(d[site].name +' — '+ ratings[d[site].code].rating + ' — Occ: '+d[site].occupancy+'%');

                var d2 = $(document.createElement('div'))
                        .addClass('cell')
                        .prepend(wrapper).appendTo("#target");

                d[site] = sortRates(d[site], "dcArea", /[0-9]+/);

                for(var i in d[site]){
                    if( /[0-9]+/.test(i) ){ //test for i is an integer
                        d[site][i].dcPushRate += (/Park/.test(d[site][i].sTypeName)) ? 0 : 12; //test type for parking. If Parking space, add 0, if not, add 12 to rate
                        $(document.createElement('div'))
                            .addClass('row')
                            .append('<span class="unit-size"><span class="rate">$ ' + (d[site][i].dcPushRate) + '</span> - ' + d[site][i].dcWidth + ' x ' + d[site][i].dcLength + ' - ' + d[site][i].sTypeName + '</span><br>')
                            .append('<span class="special">' + d[site][i].bestDiscount + '</span><br>')
                            .append('<span class="unit-avail">Avail. Units: <span class="vacant">'+d[site][i].iTotalVacant + '</span> out of '+d[site][i].iTotalUnits + ' Total</span><br><span class="occupancy-outer">Occupancy: <span class="occupancy-inner">'+round(d[site][i].occupancyPercent,1) + '</span>%</span>').appendTo(d2);
                    }
                }
            }
		}
		
		$(".occupancy-inner").each(function(){
			var intVal = parseInt(this.innerText);
			
			if(intVal >= 90){
				$(this).parent().addClass('good').prepend("✔");
			}
			else if(intVal >= 80 && intVal < 90){
				$(this).parent().addClass('ok').prepend("⚠");
			}
			else{
				$(this).parent().addClass('bad').prepend("❌");
			}
		});
        
        dataRefreshTime();
}
function getRatesData(useCache = false){
	
	
    if(useCache){
        console.log("Cache set to true, pulling data from cache");
        if( $("div.row").length > 1){
            //Only update time as DOM is already in place and data is current
            dataRefreshTime();
        }
        else{
            //else populate page with data from cache
            $("#target").empty();
            parseRatesData(JSON.parse(localStorage.cache));
        }
    }
    else{
        $("#target").empty();
        console.log("Cache set to false, pulling data from server");
        $.getJSON("http://excessofc.gotdns.org/s/rates.json", function(d){
            
            parseRatesData(d);
            localStorage.lastRefresh = prettyTime();
            localStorage.cache = JSON.stringify(d);

        });
    }
}

function getRemoteData(e){
	
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
			
			ratings[ratesTable[i].loc] = { //this creates an object where the root properties are "L001" and "L002" etc to make access easier
				site: ratesTable[i].site,
				rating: place.rating + String.fromCharCode(9733)
			};
			
			sparefoot[i].gmap = place; //put the entire return result from google in the gmap property
			website[i].gmap = place;
			review[i].gmap = place;
			ratesTable[i].gmap = place;
		});
	});
}

function sortRates(obj, keyName, regexFilter = /.*/){//obj is the obj to sort, keyname is the root-level prop of obj to sort by (must be int), and regexFilter is a way to filter out values into sortable and non-sortable arrays. Default Regex will match anything (i.e. sort everything)
	
	var sortArr = []; //Sort array holds the values to be sorted
	var appendArr = []; //append array holds values to be tacked on at the end
	var returnObj = { }; //copy of initial object to reutn
	var last = 1000000; //hardcodes sortable limit of object
	
	for(var prop in obj){ //loop through passed object
		
		if(regexFilter.test(prop)){ //filter numeric properties into the sortArray
			sortArr.push([prop, obj[prop][keyName]]);
		}
		else{ //put non-numeric properties in the non-sorting array
			appendArr.push([prop, last++]);
		}
		
	}
	
	sortArr.sort(function(a, b){ //sort the sortable array
		return a[1] - b[1];
	});
	
	for(var i = 0; i < sortArr.length; i++){ //loop through the sortArray and append objects in the sort order into returnObj
		returnObj[i] = obj[sortArr[i][0]];
	}
	
	for(i = 0; i <  appendArr.length; i++){ //loop through the non-sorted Array and append property/value pair un-modified back into return obj
		returnObj[appendArr[i][0]] = obj[appendArr[i][0]];
	}
	
	return returnObj;
}

function dataRefreshTime(){
    var s = prettyTime();
    
    var str = 'no changes to data since '+localStorage.lastRefresh;
    
    $("#update-time").remove();
    $("#target").prepend('<span id="update-time">Data last synced at: '+s+' <a id="refresh" href="#">refresh data</a> - '+str+'<br></span>');
}
function prettyTime(){
    var nDate = new Date();
    var hours = nDate.getHours();
    var amPm = (nDate.getHours() >= 11) ? 'pm' : 'am';
    var minutes = (nDate.getMinutes() <= 9) ? ('0' + nDate.getMinutes()) : nDate.getMinutes();
    hours = (hours >= 12) ? hours - 12 : hours;
    var s = (nDate.getMonth()+1) +'/'+ nDate.getDate() + '  '+hours + ':' + minutes + ' '+amPm;
    
    return s;
}
var iHtml = '<div class="review-container"><div class="pref"><span class="author"></span><span> - </span><span class="star-rating"></span><br><span class="review-time"></span></div><div class="reviewbody"></div></div>';
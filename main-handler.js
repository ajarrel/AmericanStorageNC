'use strict';

function round(value, decimals) { //simple function to consistenly round float numbers
	return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}


var ratesInterval = false; //anytime you run clearInterval(ratesInterval) on this variable, set to false again
//Google my places API key 
var ratings = {
	
};
var options = { //placeholder for the options object
    
};
var global, hash; //deprecated global variables for holding the caching-hash check val, and global holds the JSON object for Website Prices
var ratesTable = [ //ratesTable holds the rates pages URL for each of the sites 
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

var website = [ //contains the URL of the homepage of every site
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

var review = [ //contains the Google PlaceID of every one of the 10 physical store locations 
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
	
	getRatings(); //preload the Google My business ratings info
	
	$('#pricing').click(ratesTable, pollChanges); //assign event handlers to the 4 main UI buttons
	$('#sparefoot').click(sparefoot, getRemoteData);
	$('#website').click(website, getRemoteData);
	$('#google-review').click(review, getRemoteGoogleData); //special handler since data comes via API instead of AJAX/IFRAME
	$('#comp').click(function(){
		$('#target').empty().append('<img height="1382" width="1571" src="img/comps.png" alt="Table with a list of comps"></img>');
	});
	
    $('button.category').not('#pricing').click(function(){ //anytime a button OTHER than Website Prices is clicked, check to see if ratesInterval is set. If it is, clearInterval
		if(ratesInterval){
			clearInterval(ratesInterval);
			ratesInterval = false;
		}
	});
    $(document).on("click", "#refresh", pollChanges); //binding in this fashion means this event handler will work regardless of whether the targeted element is in the DOM or not
	
	$('#pricing').one(function(){ clearTimeout(st); }); //remove st in the event user clicks "WebSite Pricing before autofire"
	var st = setTimeout(pollChanges, 2500); //show Website Prices (just as if user had clicked) 2.5 seconds after $(document).ready()
    
    if(localStorage.getItem("options") === null){ //init options. test if set before setting to default values
        var opts = {
            addProtection: false,
            showPush: true,
            showStandard: true,
            showReserved: true,
            showAllUnitTypes: false,
            showNextAvailUnit: true
        };
        localStorage.options = JSON.stringify(opts); //store in localStorage as a JSON string. Use JSON.parse(localStorage.options) to retrieve JSON obj
        options = opts;
    }
    else{ //else case means options already set---load into global options variable from localStorage
        options = JSON.parse(localStorage.options);
    }
	
});
function pollChanges(){ //core function that checks for changes to data and sycns if changes
    
    if(ratesInterval){ //if ratesInterval is set, do no thing because pollChanges should already be running every minute
        
    }
    else{ //if pollChanges was called and interval not set, set pollChanges to run on 1m interval 
        ratesInterval = setInterval(pollChanges, 60000);
    }
    
    $.getJSON("http://excessofc.gotdns.org/s/hash.json", function(d){ //get the rates object from the server
        if( d.hash === localStorage.hash ){ //if data is retrieved and hash from server === hash from localStorage, call getRatesData(false) to tell that function to use the local cached object to build the dom from instead. hash.json on the server is just an object in format { hash: HASHVALUEGOESHERE }. This is to minimize server load
            
			$('#offline').remove();//remove this elem if it exists
			
            if(localStorage.getItem('cache') === null){ //if cache doesn't exist, then call getRatesData with "false" --- this should be a rare first-run bug
                getRatesData(false);
            }
            else{
                //rates should already be on-screen
                getRatesData(true); //load data from cache
            }
        }
        else{ //hash mismatch, this means data is out of sync, so call getRatesData(false) to force refresh of data
            console.log("Polled changes, hash mismatch, updating rates. Local hash: "+localStorage.hash+" -- remote hash: "+d.hash);
            getRatesData(false);
        }
    }).fail(function(){
		$('#offline').remove();
		$("body").prepend('<span id="offline">Server may be offline. Click refresh to try again or contact AJ. Rates & availability below is cached and may be outdated</span>');
		getRatesData(true);
		
	});
}
function parseRatesData(d){
    d = sortRates(d, "order", /L[0-9]{2,3}A?/); //sort rates, d is the obj to sort, "order" is the key to sort by, and the last is a regex to filter out keys from sorting
        localStorage.hash = d.hash; //update localStorage hash
		
		for(var site in d){ //iterate through each of the physical stores
            if( site !== "hash" ){ // only run on the stores, not the meta properties (i.e. hash)
                
                var coloring = goodOrBad(d[site].effectiveRate);
				var secColor = goodOrBad(d[site].occBySize - d[site].occupancy);
				var ttip1 = '<span class="tooltiptext mod-ttip">Physical Occupancy</span>';
				var ttip2 = '<span class="tooltiptext mod-ttip">Occupancy by Area<br>*(occupied area / total rentable area)</span>';
                
                var wrapper = $(document.createElement('h1')).attr('id',d[site].code).html(d[site].name +' '+ ratings[d[site].code].rating +
							   ' Occ: <span id="phys-occupancy" class="tooltip">'+round(d[site].occupancy,1)+ttip1+
							   '%</span> / <span id="size-occupancy" class="tooltip '+secColor+'">'+round(d[site].occBySize,1)+ttip2+
							   '%</span><br>Effective rate: <span class="'+coloring+'">'+round(d[site].effectiveRate,1)+'%</span>'); //create the header of the (currently) 10 main divs (.cell) inside #target

                var d2 = $(document.createElement('div'))
                        .addClass('cell')
                        .prepend(wrapper).appendTo("#target"); //put wrapper at the beginning of the div d2, and insert d2 into #target

                d[site] = sortRates(d[site], "dcArea", /[0-9]+/); //sort each sub array by the "dcArea" property, filter out any numeric keys

                for(var i2 in d[site]){ //subloop through the properties of each parent site
                    if( /[0-9]+/.test(i2) && d[site].hasOwnProperty(i2) && d[site][i2].hasOwnProperty("effectiveRate") ){ //test for i is an integer BC integer property names are unit type fields. Named properties are meta-data
                        
                        var pp = 0;
                        var rateStr = '';
                        if(options.addProtection){ //test options.addPushrate
                            pp = (/Park/i.test(d[site][i2].sTypeName)) ? 0 : 12; //test type for parking. If Parking space, add 0, if not, add 12 to rate
                            var allIn = pp + d[site][i2].dcPushRate;
                            if(!pp){ //if pp !== true (0 = false) then push rate Str is good as is
                                rateStr = d[site][i2].dcPushRate;
                            }
                            else{ //else make a pretty explanation of how the all-in price works
                                rateStr = d[site][i2].dcPushRate + ' $'+pp+' = '+(d[site][i2].dcPushRate+pp);
                            }
                            
                        }

                        
                        var eStr = '+ Vacant: '+d[site][i2].iTotalVacant+'<br>- Reserved: '+d[site][i2].iTotalReserved+'<br>= Available: '+(d[site][i2].iTotalVacant - d[site][i2].iTotalReserved); //string to append to DOM in tDiv assignment below
                        var occ = round(d[site][i2].occupancyPercent,1); //set default occupancy calc for unit Types
                        d[site][i2].effectiveRate = round(parseFloat(d[site][i2].effectiveRate),1);
                        
                        if(d[site][i2].effectiveRate > 0){
                            var e = 'Effective rate: <span class="good">+ '+d[site][i2].effectiveRate+'%</span>';
                        }
                        else if(d[site][i2].effectiveRate < 0){
                            var e = 'Effective rate: <span class="bad"> '+d[site][i2].effectiveRate+'%</span>';
                        }
                        else{
                            var e = 'Effective rate: <span>'+d[site][i2].effectiveRate+'%</span>';
                        }
                        
                        if(options.showReserved && d[site][i2].iTotalReserved > 0){ //test option and if any are reserved
                            occ = round(d[site][i2].occupancyWithReserved,1) //modified occ% calc for unit type with reservations and option set
                        }

                        var tDiv = $(document.createElement('div'))
                            .addClass('row')
                            .data({
                                push: d[site][i2].dcPushRate,
                                pp: pp,
                                allIn: pp+d[site][i2].dcPushRate,
                                nextAvail: d[site][i2].sUnitName_FirstAvailable
                                
                            })
                            .append('<span class="unit-size"><span class="rate tooltip"><span class="tooltiptext">Web-visible rate: $'+d[site][i2].dcPushRate+'<br>Protection: $'+pp+'<br>All-in: $'+(d[site][i2].dcPushRate + pp)+'<br><br>'+eStr+'<br>'+e+'</span>$ ' + (d[site][i2].dcPushRate + pp) + '</span> - ' + d[site][i2].dcWidth + ' x ' + d[site][i2].dcLength + ' - ' + d[site][i2].sTypeName + '</span><br>')
                            .append('<span class="special">' + d[site][i2].bestDiscount + '</span><br>')
                            .append('<span class="unit-avail">Available: <span class="vacant">'+(d[site][i2].iTotalVacant - d[site][i2].iTotalReserved) + '</span> / '+d[site][i2].iTotalUnits +'</span><br><span class="occupancy-outer">Occupancy: <span class="occupancy-inner">'+occ+ '</span>%</span>').appendTo(d2); //this adds the bulk of the dom data for each unit type for each store
                        
                        if(options.showStandard){
                            $(tDiv).append('<br><span class="std-rate">Standard rate: $'+d[site][i2].dcStdRate+'</span>');
                        }
                        if(options.showNextAvailUnit){
                            $(tDiv).append('<br><span class="next-avail">Next availble: '+d[site][i2].sUnitName_FirstAvailable+'</span>');
                        }
                    }
                }
            }
		}
		
		$(".occupancy-inner").each(function(){ //add custom styling depending on the value of the occupancy of each unit type
			var intVal = parseInt(this.innerText);
			
			if(intVal >= 90){ //if occupancy > 90, addClass good and add a check mark at the beginning
				$(this).parent().addClass('good').prepend("✔");
			}
			else if(intVal >= 80 && intVal < 90){ //the rest of these cases should make sense in the context of the first case
				$(this).parent().addClass('ok').prepend("➖");
			}
			else{
				$(this).parent().addClass('bad').prepend("❌");
			}
		});
        
        dataRefreshTime(); //refresh data sync time
}
function getRatesData(useCache = false){ //useCache defaults to false, which means new data is pulled from the server
	
	
    if(useCache){ //useCache is a boolean flag. True means load from localStorage.cache (via JSON.parse)
        if( $("div.row").length > 1){
            //Only update time as DOM is already in place and data is current
            dataRefreshTime();
        }
        else{
            //else populate page with data from cache
			saveScrollLocations();
            $("#target").empty();
            parseRatesData(JSON.parse(localStorage.cache));
			restoreScrollLocations();
        }
    }
    else{ //else case means useCache === false, so clear #target and pull new data from server
        
        console.log("Cache set to false, pulling data from server");
        $.getJSON("http://excessofc.gotdns.org/s/rates.json", function(d){
			
			saveScrollLocations();
        	
			$("#target").empty(); //moved inside the success handler
			$('#offline').remove(); //remove if it exists
			
			
			//console.warn(d);
			//localStorage.debugStorage = d;
            parseRatesData(d); //once data download is done, build dom via call to parseRatesData and pass it the JSON obj returned from server
            localStorage.lastRefresh = prettyTime(); //store a pretty string of the current time in localStorage.lastRefresh
            localStorage.cache = JSON.stringify(d); //update cache 
			
			restoreScrollLocations();

        }).fail(function(){
			$('#offline').remove();
			$("body").prepend('<span id="offline">Server may be offline. Click refresh to try again or contact AJ. Rates & availability below is cached and may be outdated</span>');
		});
    }
}

function getRemoteData(e){ //deprecated function that only handles Website button and Sparefoot button
	
	var ratesArray = e.data;
	
	$('#target').empty().append('<img src="img/spinner.gif"></img>Loading...hang tight');
	
	$(ratesArray).each(function(i){

		var deferred = new $.Deferred();
		
		var wrapper = $(document.createElement('h1')).attr('id',e.data[i].site).text(e.data[i].site +' â€” '+ e.data[i].rating); //moved outside IF
		
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
	$.when.apply(undefined, promises).promise().done(function(){ //only run build DOM after every AJAX request is complete
		buildDom(e.data);
	});
}

function buildDom(obj){
	
	var tArr = new Array(obj.length), order; //tie the length of this temp array to the ratesArray
	global = obj;
	
	$('#target').empty(); //clean #target before append
	
	$(obj).each(function(i){ //iterate through obj and use the order property in obj to organize value is destination array tArry
		order = obj[i].order;
		tArr[order] = obj[i].dom;
	});
	
	$(tArr).each(function(){ //now that tArr is in the correct order, iterate through it and append to #target
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

function dataRefreshTime(){ //displays last time data was updated in a pretty string format
    var s = prettyTime();
    
    var str = 'no changes to data since '+localStorage.lastRefresh;
    
    $("#update-time").remove(); //delete the update time
    $("#target").prepend('<span id="update-time">Data last synced at: '+s+' <a id="refresh" href="#">refresh data</a> - '+str+'<br></span>'); //rebuild the #update-time portion of the DOM with correct data
}
function prettyTime(){ //gets the current time in a pretty format. Returns that pretty formatted string
    var nDate = new Date();
    var hours = nDate.getHours();
    var amPm = (nDate.getHours() >= 11) ? 'pm' : 'am';
    var minutes = (nDate.getMinutes() <= 9) ? ('0' + nDate.getMinutes()) : nDate.getMinutes();
    hours = (hours >= 12) ? hours - 12 : hours;
    var s = (nDate.getMonth()+1) +'/'+ nDate.getDate() + '  '+hours + ':' + minutes + ' '+amPm;
    
    return s;
}

function setOptions(o){ //just beginning to build a function to set options to control the program's execution
    var s = JSON.stringify(o);
    localStorage.options = s;
    options = o;
}
function goodOrBad(val, reverseColoring = false){
    if(reverseColoring){
        if(val < 0){
            return "good";
        }
        else if(val > 0){
            return "bad";
        }
        else{
            return "neutral";
        }
    }
    else{
        if(val > 0){
            return "good";
        }
        else if(val < 0){
            return "bad";
        }
        else{
            return "neutral";
        }
    }
}

function saveScrollLocations(){
	var o = { };
	o.window = [window.scrollX, window.scrollY];
	o.cells = [];
	var i;
	
	
	var cells = document.getElementsByClassName('cell');
	for(i = 0; i < cells.length; i++){
		o.cells.push( [cells[i].scrollLeft, cells[i].scrollTop] );
	}
	
	localStorage.scrollPositions = JSON.stringify(o);
}

function restoreScrollLocations(){
	if(localStorage.scrollPositions){
		
		var o = JSON.parse(localStorage.scrollPositions);
		
		window.scrollTo(o.window[0], o.window[1]);
		var i;
		
		var cells = document.getElementsByClassName('cell');
		
		for(i = 0; i < o.cells.length; i++){
			cells[i].scrollTo(o.cells[i][0], o.cells[i][1]);
		}
	}
}

function lookUpUser(token){
	fetch("https://slack.com/api/users.list?token="+token)
	.then(function(response){
		return response.json();
	})
	.then(function(mJson){
		console.log(mJson);
	});
}

function processWp(wp){
	var req = "https://proapi.whitepages.com/3.3/identity_check";
	var key = "eb901e58d95e4533b1784e3dce21f7df";
	
	console.log("headers");
	console.log("Valid Address,Name Match,Resident Name,Is Commercial,Is Forwarded,Type,Identity Score");
	
	for(var i = 0; i < 2; i++){
		wp[i].api_key = key;
		
		$.ajax(req,{
			async: false,
			cache: false,
			data: wp[i],
			dataType: 'json',
			method: 'GET'
		})
		.done(function(data){
			var h = data.primary_address_checks;
			var name = (h.resident) ? h.resident.name : "false";
			console.log(h.is_valid+','+h.match_to_name+','+name+','+h.is_commercial+','+h.is_forwader+','+h.type+','+data.identity_check_score);
		});
	}		
}

/*{
  "request": {
    "primary.address.country_code": "United States",
    "primary.address.city": "Knightdale",
    "primary.phone": "9196737452",
    "primary.name": "Adam Jarrell",
    "primary.address.street_line_1": "500 Meadow Run",
    "primary.email_address": "adam.jarrell@gmail.com",
    "primary.address.postal_code": "27545",
    "api_key": "eb901e58d95e4533b1784e3dce21f7df",
    "primary.address.state_code": "NC"
  },
  "primary_phone_checks": {
    "error": null,
    "warnings": [

    ],
    "is_valid": true,
    "country_code": "US",
    "is_commercial": false,
    "line_type": "Mobile",
    "carrier": "AT&T",
    "is_prepaid": null,
    "match_to_name": "No match",
    "match_to_address": "Metro match",
    "subscriber": {
      "name": "Suzanne Alicia Nelson",
      "age_range": {
        "from": 40,
        "to": 44
      }
    }
  },
  "secondary_phone_checks": null,
  "primary_address_checks": {
    "error": null,
    "warnings": [

    ],
    "is_valid": true,
    "input_completeness": "Complete",
    "match_to_name": "No match",
    "resident": {
      "name": "Yanira P Hernandez",
      "age_range": {
        "from": 45,
        "to": 49
      }
    },
    "is_commercial": false,
    "is_forwarder": false,
    "type": "Single unit"
  },
  "secondary_address_checks": null,
  "primary_email_address_checks": {
    "error": null,
    "warnings": [

    ],
    "is_valid": true,
    "is_autogenerated": false,
    "is_disposable": false,
    "email_first_seen_days": 2911,
    "email_domain_creation_days": 8513,
    "match_to_name": "Match",
    "match_to_address": "Metro match",
    "registered_owner": {
      "name": "Adam Lee Jarrell",
      "age_range": {
        "from": 30,
        "to": 34
      }
    }
  },
  "secondary_email_address_checks": null,
  "ip_address_checks": null,
  "identity_check_score": 289
}*/
var iHtml = '<div class="review-container"><div class="pref"><span class="author"></span><span> - </span><span class="star-rating"></span><br><span class="review-time"></span></div><div class="reviewbody"></div></div>';
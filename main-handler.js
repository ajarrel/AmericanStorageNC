'use strict';

var ratesTable = [
	{ site: 'Site 1', order: 0, selector: 'table#rates-chart', uri: 'https://americanstoragenc.com/self-storage/pittsboro-west-nc-27312' },
	{ site: 'H and R', order: 3, selector: 'table#rates-chart', uri: 'https://www.excessstoragenc.com/self-storage-knightdale-hr.php' },
	{ site: 'Harrisburg', order: 4, selector: 'table#rates-chart', uri: 'https://www.bestharrisburgselfstorage.com/self-storage/harrisburg-nc-28075' },
	{ site: 'The Attic', order: 6, selector: 'table#rates-chart', uri: 'https://theatticstoragenc.com/self-storage-rates.php' },
	{ site: 'Site 2', order: 1, selector: 'table#rates-chart', uri: 'https://americanstoragenc.com/self-storage/pittsboro-east-nc-27312' },
	{ site: 'Smithfield', order: 2, selector: 'table#rates-chart', uri: 'https://www.excessstoragenc.com/self-storage-knightdale-smithfield.php' },
	{ site: 'Speedway', order: 5, selector: 'table.units-table', uri: 'https://www.bestcarolinastorage.com/self-storage-harrisburg-nc-91762' },
	{ site: 'AAA', order: 7, selector: 'table#rates-chart', uri: 'https://durhamstoragesolutions.com/self-storage/durham-nc-27703' }
];
var sparefoot = [ //selector is div.unit-list, stored in index 0.selector
	{ 
		site: 'Site 1', order: 0, uri: 'https://www.sparefoot.com/Pittsboro-NC-self-storage/American-Self-Storage-Highway-64-155481', selector: 'div.unit-list',
		callback: function(){
			$('button[type="button"] > *').unwrap();
			$('span.button-content').filter(function(){ return ($(this).text() === 'Continue') }).remove();
		}
	},
	{ site: 'H and R', order: 3, uri: 'https://www.sparefoot.com/Knightdale-NC-self-storage/Excess-Storage-Center-109843', selector: 'div.unit-list' },
	{ site: 'Harrisburg', order: 4, uri: 'https://www.sparefoot.com/Harrisburg-NC-self-storage/Harrisburg-Self-Storage-152501', selector: 'div.unit-list' },
	{ site: 'The Attic', order: 6, uri: 'https://www.sparefoot.com/Concord-NC-self-storage/The-Attic-Self-Storage-199468', selector: 'div.unit-list' },
	{ site: 'Site 2', order: 1, uri: 'https://www.sparefoot.com/Pittsboro-NC-self-storage/American-Self-Storage-Mt-Gilead-109842', selector: 'div.unit-list' },
	{ site: 'Smithfield', order: 2, uri: 'https://www.sparefoot.com/Knightdale-NC-self-storage/Excess-Storage-Center-Smithfield-Road-199467', selector: 'div.unit-list' },
	{ site: 'Speedway', order: 5, uri: 'https://www.sparefoot.com/Harrisburg-NC-self-storage/Speedway-Self-Storage-153068', selector: 'div.unit-list' },
	{ site: 'AAA', order: 7, uri: 'https://www.sparefoot.com/Durham-NC-self-storage/AAA-Mini-Storage-202242', selector: 'div.unit-list' }
];

var promises = [],global;


$(document).ready(function(){
	$('button').click(function(){
		$(this).addClass('clicked');
		$('button').not(this).removeClass('clicked');
	});
	
	$('#pricing').click(ratesTable, getRemoteData);
	$('#sparefoot').click(sparefoot, getRemoteData);
	
});

function getRemoteData(e){
	console.log(e);
	var ratesArray = e.data;
	
	$('#target').empty();
	
	$(ratesArray).each(function(i){

		var deferred = new $.Deferred();
		$.get(e.data[i].uri, [], function(d){

			var h = $( d.replace(/<img\b[^>]*>/ig, '') ); //strip images out of response before wrapping in jQuery
			h.find('td.rate-button').remove();
			
			var wrapper = $(document.createElement('h1')).attr('id',e.data[i].site).text(e.data[i].site);

			e.data[i].dom = $(document.createElement('div'))
				.addClass('cell')
				.append(h.find(e.data[i].selector))
				.prepend(wrapper);
			
			deferred.resolve();

		}, 'html');
		
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
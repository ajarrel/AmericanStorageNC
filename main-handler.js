'use strict';

var ratesArray = [
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
	{ site: 'Site 1', order: 0, uri: 'https://americanstoragenc.com/self-storage/pittsboro-west-nc-27312', selector: 'div.unit-list' },
	{ site: 'H and R', order: 3, uri: 'https://www.sparefoot.com/Knightdale-NC-self-storage/Excess-Storage-Center-109843' },
	{ site: 'Harrisburg', order: 4, uri: 'https://www.bestharrisburgselfstorage.com/self-storage/harrisburg-nc-28075' },
	{ site: 'The Attic', order: 6, uri: 'https://theatticstoragenc.com/self-storage-rates.php' },
	{ site: 'Site 2', order: 1, uri: 'https://americanstoragenc.com/self-storage/pittsboro-east-nc-27312' },
	{ site: 'Smithfield', order: 2, uri: 'https://www.excessstoragenc.com/self-storage-knightdale-smithfield.php' },
	{ site: 'Speedway', order: 5, uri: 'https://www.bestcarolinastorage.com/self-storage-harrisburg-nc-91762' },
	{ site: 'AAA', order: 7, uri: 'https://durhamstoragesolutions.com/self-storage/durham-nc-27703' }
];

var promises = [];


$(document).ready(function(){
	$('button').click(function(){
		$(this).addClass('clicked');
		$('button').not(this).removeClass('clicked');
	});
	
	$('#pricing').click(getRates);
	
});

function getRates(){
	$(ratesArray).each(function(i){

		var deferred = new $.Deferred();
		$.get(ratesArray[i].uri, [], function(d){

			var h = $( d.replace(/<img\b[^>]*>/ig, '') ); //strip images out of response before wrapping in jQuery
			h.find('td.rate-button').remove();
			
			var wrapper = $(document.createElement('h1')).attr('id',ratesArray[i].site).text(ratesArray[i].site);

			ratesArray[i].dom = $(document.createElement('div'))
				.addClass('cell')
				.append(h.find(ratesArray[i].selector))
				.prepend(wrapper);
			
			deferred.resolve();

		}, 'html');
		
		promises.push(deferred);
		
	});
	
	$.when.apply(undefined, promises).promise().done(buildDom);
}

function buildDom(){
	var tArr = new Array(ratesArray.length), order; //tie the length of this temp array to the ratesArray
	
	$(ratesArray).each(function(i){
		order = ratesArray[i].order;
		
		tArr[order] = ratesArray[i].dom;
	});
	
	$(tArr).each(function(){
		$(this).appendTo('#target');
	});
}
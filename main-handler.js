"use strict";

var ratesArray = [
	{ site: "Site 1", selector: "table#rates-chart", uri: "https://americanstoragenc.com/self-storage/pittsboro-west-nc-27312" },
	{ site: "H and R", selector: "table#rates-chart", uri: "https://www.excessstoragenc.com/self-storage-knightdale-hr.php" },
	{ site: "Harrisburg", selector: "table#rates-chart", uri: "https://www.bestharrisburgselfstorage.com/self-storage/harrisburg-nc-28075" },
	{ site: "The Attic", selector: "table#rates-chart", uri: "https://theatticstoragenc.com/self-storage-rates.php" },
	{ site: "Site 2", selector: "table#rates-chart", uri: "https://americanstoragenc.com/self-storage/pittsboro-east-nc-27312" },
	{ site: "Smithfield", selector: "table#rates-chart", uri: "https://www.excessstoragenc.com/self-storage-knightdale-smithfield.php" },
	{ site: "Speedway", selector: "table.units-table", uri: "https://www.bestcarolinastorage.com/self-storage-harrisburg-nc-91762" },
	{ site: "AAA", selector: "table#rates-chart", uri: "https://durhamstoragesolutions.com/self-storage/durham-nc-27703" }
];

$(document).ready(function(){
	
	$('#pricing').click(getRates);
	
});

function getRates(){
	$(ratesArray).each(function(i){

		$.get(ratesArray[i].uri, [], function(d){

			var h = $(d);
			var wrapper = $(document.createElement('h1')).attr('id',ratesArray[i].site).text(ratesArray[i].site);

			$(document.createElement('div'))
				.addClass('cell')
				.append(h.find(ratesArray[i].selector))
				.prepend(wrapper)
				.appendTo('#target');


		}, "html");
	});
}
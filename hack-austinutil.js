"use strict";
var a = {
	uri: [],
	dom: [],
	logDom: function(){
		this.dom.forEach(function(val, key){
			console.log("Index: "+key+"   Account: "+val.account + '  Due Date:' + val.dueDate);
		});
	},
	interval: 2500
};

Array.prototype.deepCopy = function(){ //prototypes the native Array object in JS so that when you run array.deepCopy, it copies the array rather than a pointer to the array and returns the copied array
	var a, i, l;
	l = this.length;
	a = [];
	for(i = 0; i < l; i++){
		a[i] = this[i];
	}
	return a;
};

$('.occ_bodyText > a').each(function(index){
	var href = $(this).prop('href');
	
	a.uri.push(href);
	a.dom[index] = {
		elem: $(this)
	};
	
	setTimeout(function(){
			a.dom[index].elem.click();
			$.get(href, $('form[name="accountListForm"]').serialize(), function(d){
			var j = $(d);

			var arr = [];
			j.find('table.occ_chartLegend tr').each(function(){
				arr.push({
					label: $(this).children('td').first().text().trim(),
					field: $(this).children('td').last().text().trim()
				});
			});

			var b = j.find('div.occ_value:eq(1)').text();
			var r = /\$[\s]+/;
			var bill = "NULL";
			if(r.test(b)){
				bill = r.exec(b)[0];
			}

			a.dom[index].jq = j;
			a.dom[index].uri = href;
			a.dom[index].arr = [];
			a.dom[index].arr.push({label: "Due Date", field: j.find('div.occ_value').first().text() });
			a.dom[index].arr.push({label: "Account", field: j.find('span.wptheme-userAttributeValue').last().text() });
			a.dom[index].arr.push( { label: "Bill Amount", field: bill });
			a.dom[index].arr.push({ label: "Last Payment Date", field: j.find('div.occ_label > label').first().text() });
			a.dom[index].arr.push({ label: "Last Payment Amount", field: j.find('div.occ_value > label').first().text() });
			a.dom[index].arr.push({ label: "Amount due", field: j.find('div.occ_bodyBold').first().text() });
			a.dom[index].arr.push({ label: "Current balance", field: j.find('div.occ_bodyBold').last().text().trim() });
			a.dom[index].usage = arr.deepCopy();

		});
	}, (index+1)*a.interval);
	
});

var csv = '';

setTimeout(function(){
	var outer = 0; var inner = 0;
		for(outer = 0; outer < a.dom.length; outer++){
			for(inner = 0; inner < a.dom[outer].arr.length; inner++){
				csv  = csv + a.dom[outer].arr[inner].label + "\t" + a.dom[outer].arr[inner].field+"\t";
			}
			csv += "\n";
		}
	
	console.log(csv);
	
},a.uri.length*a.interval+(a.interval*2));
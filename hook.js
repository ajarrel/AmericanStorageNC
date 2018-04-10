"use strict";
var o = { }; var a = new Array(); var str = '', remarks = '', h, inv, iDate, iAmt, loc, localThis;
$('td.icon > a').each(function(){ 
	
	var tempObj = {
		url: $(this).prop('href'),
		invoice: $(this).parent().siblings('td:eq(3)').text(),
		invoiceDate: $(this).parent().siblings('td:eq(5)').text().replace(/\//g,"-"),
		invoiceAmt: $(this).parent().siblings('td:eq(9)').text()
	};
	
	var tempStr = 'invoice_' + tempObj.invoice + ' invoiceDate_' + tempObj.invoiceDate + ' invoiceAmt_' + tempObj.invoiceAmt;
	
	$(this).attr("title", tempStr);
	
	a.push(tempObj);
	
});
/*
$('td.icon > a').each(function(){ var tempObj = { url: $(this).prop('href'), invoice: $(this).parent().siblings('td:eq(3)').text(), invoiceDate: $(this).parent().siblings('td:eq(5)').text().replace(/\//g,'-'), invoiceAmt: $(this).parent().siblings('td:eq(9)').text() }; var tempStr = 'invoice_' + tempObj.invoice + ' invoiceDate_' + tempObj.invoiceDate + ' invoiceAmt_' + tempObj.invoiceAmt; $(this).attr('title', tempStr);
	
	//a.push(tempObj);

});

/*$(a).each(function(i){
	localThis = this;
	$.ajax({
		url: this.url,
		type: "GET",
		success: function(data, status, xhr){
			loc = xhr.getResponseHeader('Location');
			localThis.location = loc;
			
			str = str + localThis.location + '_invoice=' + localThis.invoice + '_invoiceDate=' + localThis.invoiceDate + '_invoiceAmt=' + localThis.invoiceAmt + '\n';
		}
		
	});
	
});*/
/*a = a.slice(0, 5);

$(a).each(function(){
	var tStr = '-invoiceDate-' + this.invoiceDate + '-invoiceAmt-' + this.invoiceAmt + '-invoice-' + this.invoice;
	tStr = tStr.substr(0,100) + ',\n';
	str = str + this.url + '\n';
	remarks = remarks + tStr;
});

setTimeout(function(){
	$('#copy-modal1').add('#copy-modal2').remove();
	$(document.createElement('textarea')).attr('id','copy-modal2').val(remarks).prependTo('body');
	$(document.createElement('textarea')).attr('id','copy-modal1').val(str).prependTo('body');
}, 100);
*/
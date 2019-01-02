// JavaScript Document
"use strict";
var urlParams = new URLSearchParams(window.location.search);
var aj = {
    now: new Date()
};

if(urlParams.has('TenantId') && urlParams.has('LedgerId')){
    
    var lCode = /L(01|00)(A|[0-9])/.exec(location.href)[0];
    
    $.post('https://inside.americanstoragenc.com/s/ledgerlookup.php',
           {"lCode": lCode,
            "TenantId": urlParams.get("TenantId"),
            "LedgerId": urlParams.get("LedgerId")
           }, function(d){
        
        aj.response = d;
        aj.oldest = new Date(aj.response[0].dMovedIn);

        var i = 0;
        for(i = 0; i < aj.response.length - 1; i++){
            aj.current = new Date(aj.response[i].dMovedIn);
            aj.next = new Date(aj.response[i+1].dMovedIn);
            if(aj.current > aj.next){
                aj.oldest = (aj.next > aj.oldest) ? aj.oldest : aj.next;
            }
        }
        
        aj.years = Math.round(((aj.now.getTime() - aj.oldest.getTime()) / 3.154e+10)*100) / 100;
        
        if(aj.years > 1){
            
            $('div.page-title').parent().css("width", "90%");
            
            $(document.createElement('div'))
            .attr('id', 'aj-title')
            .addClass('aj-emphasis')
            .text("This is a great customer and they've stored with us "+aj.years+" years")
            .css({
                fontSize: "18px",
                fontWeight: "bold",
                color: "black",
                border: "3px solid white",
                padding: "5px 10px 5px 10px",
                borderRadius: 5,
                lineHeight: "2em",
                backgroundColor: "lightgreen",
                width: "70%",
                textAlign: "center",
                float: "right"
            })
            .appendTo('div.page-title');
        }
        
    }, 'json');

}
else{
    console.warn('This url is not valid to execute on');
} 
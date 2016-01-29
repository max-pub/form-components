JSON.prettify = function(json) {
    if (typeof json != 'string') 
         json = JSON.stringify(json, undefined, 2);
         
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var 					color = 'red'; // number 
        if (/^"/.test(match)) 
            if (/:$/.test(match)) 		color = 'gray'; // key
            else 				color = 'green'; // string
        else if (/true|false/.test(match)) 	color = 'blue'; // boolean 
        else if (/null/.test(match)) 		color = 'magenta'; // null
        
        return '<span style="color:' + color + ';">' + match + '</span>';
    });
}

JSON.toDOM = function(JSONobject, DOMnode, prepend){
    if(!DOMnode) DOMnode = document.body;
    var PRE = document.createElement('pre');
    var HTML = JSON.prettify(JSONobject);
    if(prepend)	DOMnode.prependChild(PRE).innerHTML = HTML;
    else		DOMnode.appendChild(PRE).innerHTML  = HTML;
}

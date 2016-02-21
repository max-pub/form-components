JSON.view = function (json) {
    if (typeof json == 'string')
        json = JSON.parse(json);
    //    if (typeof json != 'string')
    json = JSON.stringify(json, undefined, 4);

    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var color = 'orange'; // number
        if (/^"/.test(match))
            if (/:$/.test(match)) color = 'silver'; // key
            else color = 'limegreen'; // string
        else if (/true|false/.test(match)) color = 'steelblue'; // boolean
        else if (/null/.test(match)) color = 'magenta'; // null

        return '<span style="color:' + color + ';">' + match + '</span>';
    });
}

JSON.toDOM = function (JSONobject, DOMnode, prepend) {
    if (!DOMnode) DOMnode = document.body;
    var PRE = document.createElement('pre');
    var HTML = JSON.view(JSONobject);
    if (prepend) DOMnode.prependChild(PRE).innerHTML = HTML;
    else DOMnode.appendChild(PRE).innerHTML = HTML;
}

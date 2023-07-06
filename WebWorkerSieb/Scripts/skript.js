var results = [];

$(document).ready(function ()
{
    "use strict";

    slider();

    
    $('#maxnum').on('input', function ()
    {
        slider();
    });

    var workertest;
    var timer;

    $('#starten').on('click', function ()
    {
        console.log('Click!');

        slider();

        workertest = new Worker('/Scripts/prim.js');

        workertest.addEventListener('message', function (evt)
        {
            results.push(evt.data);
        });

        workertest.postMessage({ maxnum: $('#maxnum').val() });

        timer = setInterval(function ()
        {
            if (results.length > 0)
            {
                var res = results.shift();

                $('#' + res.value).addClass(res.type);

                console.log(res);
            }
        }, 100);
    });

    $('#stopen').on('click', function ()
    {
        workertest.terminate();

        clearInterval(timer);

        results = [];
    });
});

function slider()
{
    "use strict";

    $('#rangeDisplay').text($('#maxnum').val());

    zeigezahlen($('#maxnum').val());
}

function zeigezahlen(max)
{
    "use strict";

    $('div.display').empty();

    for (var i = 1; i <= max; i++)
    {
        $('<span>', { "class": "number", text: (i > 1) ? i : "", id: i }).appendTo('div.display');
    }

    $('<div>', { "style": "clear:both; width:0; height:0;" }).appendTo('div.display');
}
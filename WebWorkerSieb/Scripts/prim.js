self.onmessage = function (evt)
{
    self.postMessage("Starte mit max: " + evt.data.maxnum);

    var maximum = evt.data.maxnum;

    var array = [true, true];

    for (var i = 2; i <= maximum; i++)
    {
        array.push(false);
    }

    for (var i = 2; i <= Math.floor(Math.sqrt(maximum)); i++)
    {
        if (i < array.length)
        {
            if (array[i] === false)
            {
                self.postMessage({ type: "prime", value: i });

                for (var j = i * i; j <= maximum; j += i)
                {
                    array[j] = true;

                    self.postMessage({ type: "tested", value: j });
                }
            }
        }
    }

    for (var i = Math.floor(Math.sqrt(maximum)) + 1; i <= maximum; i++)
    {
        if (i < array.length)
        {
            if (array[i] === false)
            {
                self.postMessage({ type: "prime", value: i });
            }
        }
    }
};
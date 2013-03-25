exports.jparse = function(doc)
{
    var parsed = '';
    var mat = ''; mat += doc;
    var lvl = 0;
    var inQuotes1 = false;  // '
    var inQuotes2 = false;  // "
    var n = mat.length;
    for (var i=0; i < n; i++)
    {
        var check = mat[i];
        if (mat[i] == '{' || mat[i] == '[')
        {
            if (mat[i] == '[')
            {
                parsed += '<br>';
                for (var j =0; j < lvl; j++) parsed += '&nbsp;&nbsp;&nbsp;&nbsp;';
            }

            lvl++;
            parsed += mat[i];

            parsed += '<br>';
            for (var j =0; j < lvl; j++) parsed += '&nbsp;&nbsp;&nbsp;&nbsp;';
        } else
        if (mat[i] == '}' || mat[i] == ']')
        {
            lvl--;

            parsed += '<br>';
            for (var j =0; j < lvl; j++) parsed += '&nbsp;&nbsp;&nbsp;&nbsp;';

            parsed += mat[i];
        } else
        if (mat[i] == ',')
        {
            parsed += mat[i];
            parsed += '<br>';
            for (var j =0; j < lvl; j++) parsed += '&nbsp;&nbsp;&nbsp;&nbsp;';
        } else
        if (mat[i] == ' ')
        {
            if (inQuotes1 == true || inQuotes2 == true)
            {
                parsed += mat[i];
            }
        } else
        if (mat[i] == '\'')
        {
            parsed += mat[i];
            inQuotes1 = !inQuotes1;
        } else
        if (mat[i] == '\"')
        {
            parsed += mat[i];
            inQuotes2 = !inQuotes2;
        } else
        if (mat[i] == ':')
        {
            parsed += ": ";
        } else
        {
            if (i + 1 < mat.length)
            {
                if (mat[i] == '\n') // && mat[i+1] == 'n')
                {} else parsed += mat[i];
            }
            else
                parsed += mat[i];
        }
    }

    return parsed;
};
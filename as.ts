interface As
{
    Bool(val: any, alt?: boolean): boolean;
    String(val: any, alt?: string): string;
    Int(val: any, alt?: number): number;
    Float(val: any, alt?: number): number;
    Html(val: any, alt?: string): string;
    HtmlLink(val: any, text?: string, urlFilter?: (s: string) => string, alt?: string): string;
    Object(val: any, alt?: string): any;
}

var as: As = (function ()
{
    var escapeHtml_entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&quot;',
        '"': '&#39;',
    };

    var typeString = 'string';
    var typeBoolean = 'boolean';
    var typeNumber = 'number';

    return {
        Bool: function (val, alt = false): boolean
        {
            var res = alt;
            if (typeof val === typeBoolean) {
                res = val;
            } else {
                if (typeof val === typeString) {
                    if (val == 'true' || val == 'True' || val == 'TRUE' || val == '1' || val == 'yes') { res = true; }
                } else {
                    if (typeof val === typeNumber) {
                        if (val == 1) { res = true; }
                    }
                }
            }
            return res;
        },

        String: function (val, alt = ''): string
        {
            var res = alt;
            if (typeof val === typeString) {
                res = val;
            } else {
                if (typeof val === typeNumber) {
                    res = '' + val;
                } else {
                    if (typeof val === typeBoolean) {
                        res = val ? 'true' : 'false';
                    }
                }
            }
            return res;
        },

        Int: function (val, alt = 0): number
        {
            var res = alt;
            if (typeof val === typeNumber) {
                res = Math.round(val);
            } else {
                if (typeof val === typeString) {
                    res = parseInt(val);
                    if (isNaN(res)) {
                        res = alt;
                    }
                }
            }
            return res;
        },

        Float: function (val, alt = 0.0): number
        {
            var res = alt;
            if (typeof val === typeNumber) {
                res = val;
            } else {
                if (typeof val === typeString) {
                    res = parseFloat(val);
                    if (isNaN(res)) {
                        res = alt;
                    }
                }
            }
            return res;
        },

        Html: function (val, alt = ''): string
        {
            var res = as.String(val, alt);
            return String(res).replace(/[&<>'"]/g, (s) => escapeHtml_entityMap[s]);
        },

        HtmlLink: function (val, text = '', urlFilter: (s: string) => string = null, alt = ''): string
        {
            var res = as.String(val, alt);
            if (urlFilter == null) {
                urlFilter = (s => s.substr(0, 4) == 'http' ? s : '');
            }
            var url = urlFilter(res);
            if (as.String(url) != '') {
                if (text == '') {
                    text = url;
                }
                res = '<a href="' + as.Html(url) + '">' + as.Html(text) + '</a>'
            }
            return res;
        },

        Object: function (val, alt = ''): any
        {
            var res = as.String(val, alt);
            var obj = null;
            try {
                obj = JSON.parse(res);
            } catch (exception) {
                obj = JSON.parse(alt);
            }
            return obj;
        },

        _last: 0
    }
})();

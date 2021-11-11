/* Merged Plone Javascript file
 * This file is dynamically assembled from separate parts.
 * Some of these parts have 3rd party licenses or copyright information attached
 * Such information is valid for that section,
 * not for the entire composite file
 * originating files are separated by - filename.js -
 */

/* - ++resource++plone.app.jquery.js - */
/*! jQuery v1.7.2 jquery.com | jquery.org/license */
(function(a, b) {
    function cy(a) {
        return f.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : !1
    }
    function cu(a) {
        if (!cj[a]) {
            var b = c.body
              , d = f("<" + a + ">").appendTo(b)
              , e = d.css("display");
            d.remove();
            if (e === "none" || e === "") {
                ck || (ck = c.createElement("iframe"),
                ck.frameBorder = ck.width = ck.height = 0),
                b.appendChild(ck);
                if (!cl || !ck.createElement)
                    cl = (ck.contentWindow || ck.contentDocument).document,
                    cl.write((f.support.boxModel ? "<!doctype html>" : "") + "<html><body>"),
                    cl.close();
                d = cl.createElement(a),
                cl.body.appendChild(d),
                e = f.css(d, "display"),
                b.removeChild(ck)
            }
            cj[a] = e
        }
        return cj[a]
    }
    function ct(a, b) {
        var c = {};
        f.each(cp.concat.apply([], cp.slice(0, b)), function() {
            c[this] = a
        });
        return c
    }
    function cs() {
        cq = b
    }
    function cr() {
        setTimeout(cs, 0);
        return cq = f.now()
    }
    function ci() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP")
        } catch (b) {}
    }
    function ch() {
        try {
            return new a.XMLHttpRequest
        } catch (b) {}
    }
    function cb(a, c) {
        a.dataFilter && (c = a.dataFilter(c, a.dataType));
        var d = a.dataTypes, e = {}, g, h, i = d.length, j, k = d[0], l, m, n, o, p;
        for (g = 1; g < i; g++) {
            if (g === 1)
                for (h in a.converters)
                    typeof h == "string" && (e[h.toLowerCase()] = a.converters[h]);
            l = k,
            k = d[g];
            if (k === "*")
                k = l;
            else if (l !== "*" && l !== k) {
                m = l + " " + k,
                n = e[m] || e["* " + k];
                if (!n) {
                    p = b;
                    for (o in e) {
                        j = o.split(" ");
                        if (j[0] === l || j[0] === "*") {
                            p = e[j[1] + " " + k];
                            if (p) {
                                o = e[o],
                                o === !0 ? n = p : p === !0 && (n = o);
                                break
                            }
                        }
                    }
                }
                !n && !p && f.error("No conversion from " + m.replace(" ", " to ")),
                n !== !0 && (c = n ? n(c) : p(o(c)))
            }
        }
        return c
    }
    function ca(a, c, d) {
        var e = a.contents, f = a.dataTypes, g = a.responseFields, h, i, j, k;
        for (i in g)
            i in d && (c[g[i]] = d[i]);
        while (f[0] === "*")
            f.shift(),
            h === b && (h = a.mimeType || c.getResponseHeader("content-type"));
        if (h)
            for (i in e)
                if (e[i] && e[i].test(h)) {
                    f.unshift(i);
                    break
                }
        if (f[0]in d)
            j = f[0];
        else {
            for (i in d) {
                if (!f[0] || a.converters[i + " " + f[0]]) {
                    j = i;
                    break
                }
                k || (k = i)
            }
            j = j || k
        }
        if (j) {
            j !== f[0] && f.unshift(j);
            return d[j]
        }
    }
    function b_(a, b, c, d) {
        if (f.isArray(b))
            f.each(b, function(b, e) {
                c || bD.test(a) ? d(a, e) : b_(a + "[" + (typeof e == "object" ? b : "") + "]", e, c, d)
            });
        else if (!c && f.type(b) === "object")
            for (var e in b)
                b_(a + "[" + e + "]", b[e], c, d);
        else
            d(a, b)
    }
    function b$(a, c) {
        var d, e, g = f.ajaxSettings.flatOptions || {};
        for (d in c)
            c[d] !== b && ((g[d] ? a : e || (e = {}))[d] = c[d]);
        e && f.extend(!0, a, e)
    }
    function bZ(a, c, d, e, f, g) {
        f = f || c.dataTypes[0],
        g = g || {},
        g[f] = !0;
        var h = a[f], i = 0, j = h ? h.length : 0, k = a === bS, l;
        for (; i < j && (k || !l); i++)
            l = h[i](c, d, e),
            typeof l == "string" && (!k || g[l] ? l = b : (c.dataTypes.unshift(l),
            l = bZ(a, c, d, e, l, g)));
        (k || !l) && !g["*"] && (l = bZ(a, c, d, e, "*", g));
        return l
    }
    function bY(a) {
        return function(b, c) {
            typeof b != "string" && (c = b,
            b = "*");
            if (f.isFunction(c)) {
                var d = b.toLowerCase().split(bO), e = 0, g = d.length, h, i, j;
                for (; e < g; e++)
                    h = d[e],
                    j = /^\+/.test(h),
                    j && (h = h.substr(1) || "*"),
                    i = a[h] = a[h] || [],
                    i[j ? "unshift" : "push"](c)
            }
        }
    }
    function bB(a, b, c) {
        var d = b === "width" ? a.offsetWidth : a.offsetHeight
          , e = b === "width" ? 1 : 0
          , g = 4;
        if (d > 0) {
            if (c !== "border")
                for (; e < g; e += 2)
                    c || (d -= parseFloat(f.css(a, "padding" + bx[e])) || 0),
                    c === "margin" ? d += parseFloat(f.css(a, c + bx[e])) || 0 : d -= parseFloat(f.css(a, "border" + bx[e] + "Width")) || 0;
            return d + "px"
        }
        d = by(a, b);
        if (d < 0 || d == null)
            d = a.style[b];
        if (bt.test(d))
            return d;
        d = parseFloat(d) || 0;
        if (c)
            for (; e < g; e += 2)
                d += parseFloat(f.css(a, "padding" + bx[e])) || 0,
                c !== "padding" && (d += parseFloat(f.css(a, "border" + bx[e] + "Width")) || 0),
                c === "margin" && (d += parseFloat(f.css(a, c + bx[e])) || 0);
        return d + "px"
    }
    function bo(a) {
        var b = c.createElement("div");
        bh.appendChild(b),
        b.innerHTML = a.outerHTML;
        return b.firstChild
    }
    function bn(a) {
        var b = (a.nodeName || "").toLowerCase();
        b === "input" ? bm(a) : b !== "script" && typeof a.getElementsByTagName != "undefined" && f.grep(a.getElementsByTagName("input"), bm)
    }
    function bm(a) {
        if (a.type === "checkbox" || a.type === "radio")
            a.defaultChecked = a.checked
    }
    function bl(a) {
        return typeof a.getElementsByTagName != "undefined" ? a.getElementsByTagName("*") : typeof a.querySelectorAll != "undefined" ? a.querySelectorAll("*") : []
    }
    function bk(a, b) {
        var c;
        b.nodeType === 1 && (b.clearAttributes && b.clearAttributes(),
        b.mergeAttributes && b.mergeAttributes(a),
        c = b.nodeName.toLowerCase(),
        c === "object" ? b.outerHTML = a.outerHTML : c !== "input" || a.type !== "checkbox" && a.type !== "radio" ? c === "option" ? b.selected = a.defaultSelected : c === "input" || c === "textarea" ? b.defaultValue = a.defaultValue : c === "script" && b.text !== a.text && (b.text = a.text) : (a.checked && (b.defaultChecked = b.checked = a.checked),
        b.value !== a.value && (b.value = a.value)),
        b.removeAttribute(f.expando),
        b.removeAttribute("_submit_attached"),
        b.removeAttribute("_change_attached"))
    }
    function bj(a, b) {
        if (b.nodeType === 1 && !!f.hasData(a)) {
            var c, d, e, g = f._data(a), h = f._data(b, g), i = g.events;
            if (i) {
                delete h.handle,
                h.events = {};
                for (c in i)
                    for (d = 0,
                    e = i[c].length; d < e; d++)
                        f.event.add(b, c, i[c][d])
            }
            h.data && (h.data = f.extend({}, h.data))
        }
    }
    function bi(a, b) {
        return f.nodeName(a, "table") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }
    function U(a) {
        var b = V.split("|")
          , c = a.createDocumentFragment();
        if (c.createElement)
            while (b.length)
                c.createElement(b.pop());
        return c
    }
    function T(a, b, c) {
        b = b || 0;
        if (f.isFunction(b))
            return f.grep(a, function(a, d) {
                var e = !!b.call(a, d, a);
                return e === c
            });
        if (b.nodeType)
            return f.grep(a, function(a, d) {
                return a === b === c
            });
        if (typeof b == "string") {
            var d = f.grep(a, function(a) {
                return a.nodeType === 1
            });
            if (O.test(b))
                return f.filter(b, d, !c);
            b = f.filter(b, d)
        }
        return f.grep(a, function(a, d) {
            return f.inArray(a, b) >= 0 === c
        })
    }
    function S(a) {
        return !a || !a.parentNode || a.parentNode.nodeType === 11
    }
    function K() {
        return !0
    }
    function J() {
        return !1
    }
    function n(a, b, c) {
        var d = b + "defer"
          , e = b + "queue"
          , g = b + "mark"
          , h = f._data(a, d);
        h && (c === "queue" || !f._data(a, e)) && (c === "mark" || !f._data(a, g)) && setTimeout(function() {
            !f._data(a, e) && !f._data(a, g) && (f.removeData(a, d, !0),
            h.fire())
        }, 0)
    }
    function m(a) {
        for (var b in a) {
            if (b === "data" && f.isEmptyObject(a[b]))
                continue;
            if (b !== "toJSON")
                return !1
        }
        return !0
    }
    function l(a, c, d) {
        if (d === b && a.nodeType === 1) {
            var e = "data-" + c.replace(k, "-$1").toLowerCase();
            d = a.getAttribute(e);
            if (typeof d == "string") {
                try {
                    d = d === "true" ? !0 : d === "false" ? !1 : d === "null" ? null : f.isNumeric(d) ? +d : j.test(d) ? f.parseJSON(d) : d
                } catch (g) {}
                f.data(a, c, d)
            } else
                d = b
        }
        return d
    }
    function h(a) {
        var b = g[a] = {}, c, d;
        a = a.split(/\s+/);
        for (c = 0,
        d = a.length; c < d; c++)
            b[a[c]] = !0;
        return b
    }
    var c = a.document
      , d = a.navigator
      , e = a.location
      , f = function() {
        function J() {
            if (!e.isReady) {
                try {
                    c.documentElement.doScroll("left")
                } catch (a) {
                    setTimeout(J, 1);
                    return
                }
                e.ready()
            }
        }
        var e = function(a, b) {
            return new e.fn.init(a,b,h)
        }, f = a.jQuery, g = a.$, h, i = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, j = /\S/, k = /^\s+/, l = /\s+$/, m = /^<(\w+)\s*\/?>(?:<\/\1>)?$/, n = /^[\],:{}\s]*$/, o = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, p = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, q = /(?:^|:|,)(?:\s*\[)+/g, r = /(webkit)[ \/]([\w.]+)/, s = /(opera)(?:.*version)?[ \/]([\w.]+)/, t = /(msie) ([\w.]+)/, u = /(mozilla)(?:.*? rv:([\w.]+))?/, v = /-([a-z]|[0-9])/ig, w = /^-ms-/, x = function(a, b) {
            return (b + "").toUpperCase()
        }, y = d.userAgent, z, A, B, C = Object.prototype.toString, D = Object.prototype.hasOwnProperty, E = Array.prototype.push, F = Array.prototype.slice, G = String.prototype.trim, H = Array.prototype.indexOf, I = {};
        e.fn = e.prototype = {
            constructor: e,
            init: function(a, d, f) {
                var g, h, j, k;
                if (!a)
                    return this;
                if (a.nodeType) {
                    this.context = this[0] = a,
                    this.length = 1;
                    return this
                }
                if (a === "body" && !d && c.body) {
                    this.context = c,
                    this[0] = c.body,
                    this.selector = a,
                    this.length = 1;
                    return this
                }
                if (typeof a == "string") {
                    a.charAt(0) !== "<" || a.charAt(a.length - 1) !== ">" || a.length < 3 ? g = i.exec(a) : g = [null, a, null];
                    if (g && (g[1] || !d)) {
                        if (g[1]) {
                            d = d instanceof e ? d[0] : d,
                            k = d ? d.ownerDocument || d : c,
                            j = m.exec(a),
                            j ? e.isPlainObject(d) ? (a = [c.createElement(j[1])],
                            e.fn.attr.call(a, d, !0)) : a = [k.createElement(j[1])] : (j = e.buildFragment([g[1]], [k]),
                            a = (j.cacheable ? e.clone(j.fragment) : j.fragment).childNodes);
                            return e.merge(this, a)
                        }
                        h = c.getElementById(g[2]);
                        if (h && h.parentNode) {
                            if (h.id !== g[2])
                                return f.find(a);
                            this.length = 1,
                            this[0] = h
                        }
                        this.context = c,
                        this.selector = a;
                        return this
                    }
                    return !d || d.jquery ? (d || f).find(a) : this.constructor(d).find(a)
                }
                if (e.isFunction(a))
                    return f.ready(a);
                a.selector !== b && (this.selector = a.selector,
                this.context = a.context);
                return e.makeArray(a, this)
            },
            selector: "",
            jquery: "1.7.2",
            length: 0,
            size: function() {
                return this.length
            },
            toArray: function() {
                return F.call(this, 0)
            },
            get: function(a) {
                return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a]
            },
            pushStack: function(a, b, c) {
                var d = this.constructor();
                e.isArray(a) ? E.apply(d, a) : e.merge(d, a),
                d.prevObject = this,
                d.context = this.context,
                b === "find" ? d.selector = this.selector + (this.selector ? " " : "") + c : b && (d.selector = this.selector + "." + b + "(" + c + ")");
                return d
            },
            each: function(a, b) {
                return e.each(this, a, b)
            },
            ready: function(a) {
                e.bindReady(),
                A.add(a);
                return this
            },
            eq: function(a) {
                a = +a;
                return a === -1 ? this.slice(a) : this.slice(a, a + 1)
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            slice: function() {
                return this.pushStack(F.apply(this, arguments), "slice", F.call(arguments).join(","))
            },
            map: function(a) {
                return this.pushStack(e.map(this, function(b, c) {
                    return a.call(b, c, b)
                }))
            },
            end: function() {
                return this.prevObject || this.constructor(null)
            },
            push: E,
            sort: [].sort,
            splice: [].splice
        },
        e.fn.init.prototype = e.fn,
        e.extend = e.fn.extend = function() {
            var a, c, d, f, g, h, i = arguments[0] || {}, j = 1, k = arguments.length, l = !1;
            typeof i == "boolean" && (l = i,
            i = arguments[1] || {},
            j = 2),
            typeof i != "object" && !e.isFunction(i) && (i = {}),
            k === j && (i = this,
            --j);
            for (; j < k; j++)
                if ((a = arguments[j]) != null)
                    for (c in a) {
                        d = i[c],
                        f = a[c];
                        if (i === f)
                            continue;
                        l && f && (e.isPlainObject(f) || (g = e.isArray(f))) ? (g ? (g = !1,
                        h = d && e.isArray(d) ? d : []) : h = d && e.isPlainObject(d) ? d : {},
                        i[c] = e.extend(l, h, f)) : f !== b && (i[c] = f)
                    }
            return i
        }
        ,
        e.extend({
            noConflict: function(b) {
                a.$ === e && (a.$ = g),
                b && a.jQuery === e && (a.jQuery = f);
                return e
            },
            isReady: !1,
            readyWait: 1,
            holdReady: function(a) {
                a ? e.readyWait++ : e.ready(!0)
            },
            ready: function(a) {
                if (a === !0 && !--e.readyWait || a !== !0 && !e.isReady) {
                    if (!c.body)
                        return setTimeout(e.ready, 1);
                    e.isReady = !0;
                    if (a !== !0 && --e.readyWait > 0)
                        return;
                    A.fireWith(c, [e]),
                    e.fn.trigger && e(c).trigger("ready").off("ready")
                }
            },
            bindReady: function() {
                if (!A) {
                    A = e.Callbacks("once memory");
                    if (c.readyState === "complete")
                        return setTimeout(e.ready, 1);
                    if (c.addEventListener)
                        c.addEventListener("DOMContentLoaded", B, !1),
                        a.addEventListener("load", e.ready, !1);
                    else if (c.attachEvent) {
                        c.attachEvent("onreadystatechange", B),
                        a.attachEvent("onload", e.ready);
                        var b = !1;
                        try {
                            b = a.frameElement == null
                        } catch (d) {}
                        c.documentElement.doScroll && b && J()
                    }
                }
            },
            isFunction: function(a) {
                return e.type(a) === "function"
            },
            isArray: Array.isArray || function(a) {
                return e.type(a) === "array"
            }
            ,
            isWindow: function(a) {
                return a != null && a == a.window
            },
            isNumeric: function(a) {
                return !isNaN(parseFloat(a)) && isFinite(a)
            },
            type: function(a) {
                return a == null ? String(a) : I[C.call(a)] || "object"
            },
            isPlainObject: function(a) {
                if (!a || e.type(a) !== "object" || a.nodeType || e.isWindow(a))
                    return !1;
                try {
                    if (a.constructor && !D.call(a, "constructor") && !D.call(a.constructor.prototype, "isPrototypeOf"))
                        return !1
                } catch (c) {
                    return !1
                }
                var d;
                for (d in a)
                    ;
                return d === b || D.call(a, d)
            },
            isEmptyObject: function(a) {
                for (var b in a)
                    return !1;
                return !0
            },
            error: function(a) {
                throw new Error(a)
            },
            parseJSON: function(b) {
                if (typeof b != "string" || !b)
                    return null;
                b = e.trim(b);
                if (a.JSON && a.JSON.parse)
                    return a.JSON.parse(b);
                if (n.test(b.replace(o, "@").replace(p, "]").replace(q, "")))
                    return (new Function("return " + b))();
                e.error("Invalid JSON: " + b)
            },
            parseXML: function(c) {
                if (typeof c != "string" || !c)
                    return null;
                var d, f;
                try {
                    a.DOMParser ? (f = new DOMParser,
                    d = f.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"),
                    d.async = "false",
                    d.loadXML(c))
                } catch (g) {
                    d = b
                }
                (!d || !d.documentElement || d.getElementsByTagName("parsererror").length) && e.error("Invalid XML: " + c);
                return d
            },
            noop: function() {},
            globalEval: function(b) {
                b && j.test(b) && (a.execScript || function(b) {
                    a.eval.call(a, b)
                }
                )(b)
            },
            camelCase: function(a) {
                return a.replace(w, "ms-").replace(v, x)
            },
            nodeName: function(a, b) {
                return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
            },
            each: function(a, c, d) {
                var f, g = 0, h = a.length, i = h === b || e.isFunction(a);
                if (d) {
                    if (i) {
                        for (f in a)
                            if (c.apply(a[f], d) === !1)
                                break
                    } else
                        for (; g < h; )
                            if (c.apply(a[g++], d) === !1)
                                break
                } else if (i) {
                    for (f in a)
                        if (c.call(a[f], f, a[f]) === !1)
                            break
                } else
                    for (; g < h; )
                        if (c.call(a[g], g, a[g++]) === !1)
                            break;
                return a
            },
            trim: G ? function(a) {
                return a == null ? "" : G.call(a)
            }
            : function(a) {
                return a == null ? "" : (a + "").replace(k, "").replace(l, "")
            }
            ,
            makeArray: function(a, b) {
                var c = b || [];
                if (a != null) {
                    var d = e.type(a);
                    a.length == null || d === "string" || d === "function" || d === "regexp" || e.isWindow(a) ? E.call(c, a) : e.merge(c, a)
                }
                return c
            },
            inArray: function(a, b, c) {
                var d;
                if (b) {
                    if (H)
                        return H.call(b, a, c);
                    d = b.length,
                    c = c ? c < 0 ? Math.max(0, d + c) : c : 0;
                    for (; c < d; c++)
                        if (c in b && b[c] === a)
                            return c
                }
                return -1
            },
            merge: function(a, c) {
                var d = a.length
                  , e = 0;
                if (typeof c.length == "number")
                    for (var f = c.length; e < f; e++)
                        a[d++] = c[e];
                else
                    while (c[e] !== b)
                        a[d++] = c[e++];
                a.length = d;
                return a
            },
            grep: function(a, b, c) {
                var d = [], e;
                c = !!c;
                for (var f = 0, g = a.length; f < g; f++)
                    e = !!b(a[f], f),
                    c !== e && d.push(a[f]);
                return d
            },
            map: function(a, c, d) {
                var f, g, h = [], i = 0, j = a.length, k = a instanceof e || j !== b && typeof j == "number" && (j > 0 && a[0] && a[j - 1] || j === 0 || e.isArray(a));
                if (k)
                    for (; i < j; i++)
                        f = c(a[i], i, d),
                        f != null && (h[h.length] = f);
                else
                    for (g in a)
                        f = c(a[g], g, d),
                        f != null && (h[h.length] = f);
                return h.concat.apply([], h)
            },
            guid: 1,
            proxy: function(a, c) {
                if (typeof c == "string") {
                    var d = a[c];
                    c = a,
                    a = d
                }
                if (!e.isFunction(a))
                    return b;
                var f = F.call(arguments, 2)
                  , g = function() {
                    return a.apply(c, f.concat(F.call(arguments)))
                };
                g.guid = a.guid = a.guid || g.guid || e.guid++;
                return g
            },
            access: function(a, c, d, f, g, h, i) {
                var j, k = d == null, l = 0, m = a.length;
                if (d && typeof d == "object") {
                    for (l in d)
                        e.access(a, c, l, d[l], 1, h, f);
                    g = 1
                } else if (f !== b) {
                    j = i === b && e.isFunction(f),
                    k && (j ? (j = c,
                    c = function(a, b, c) {
                        return j.call(e(a), c)
                    }
                    ) : (c.call(a, f),
                    c = null));
                    if (c)
                        for (; l < m; l++)
                            c(a[l], d, j ? f.call(a[l], l, c(a[l], d)) : f, i);
                    g = 1
                }
                return g ? a : k ? c.call(a) : m ? c(a[0], d) : h
            },
            now: function() {
                return (new Date).getTime()
            },
            uaMatch: function(a) {
                a = a.toLowerCase();
                var b = r.exec(a) || s.exec(a) || t.exec(a) || a.indexOf("compatible") < 0 && u.exec(a) || [];
                return {
                    browser: b[1] || "",
                    version: b[2] || "0"
                }
            },
            sub: function() {
                function a(b, c) {
                    return new a.fn.init(b,c)
                }
                e.extend(!0, a, this),
                a.superclass = this,
                a.fn = a.prototype = this(),
                a.fn.constructor = a,
                a.sub = this.sub,
                a.fn.init = function(d, f) {
                    f && f instanceof e && !(f instanceof a) && (f = a(f));
                    return e.fn.init.call(this, d, f, b)
                }
                ,
                a.fn.init.prototype = a.fn;
                var b = a(c);
                return a
            },
            browser: {}
        }),
        e.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(a, b) {
            I["[object " + b + "]"] = b.toLowerCase()
        }),
        z = e.uaMatch(y),
        z.browser && (e.browser[z.browser] = !0,
        e.browser.version = z.version),
        e.browser.webkit && (e.browser.safari = !0),
        j.test(" ") && (k = /^[\s\xA0]+/,
        l = /[\s\xA0]+$/),
        h = e(c),
        c.addEventListener ? B = function() {
            c.removeEventListener("DOMContentLoaded", B, !1),
            e.ready()
        }
        : c.attachEvent && (B = function() {
            c.readyState === "complete" && (c.detachEvent("onreadystatechange", B),
            e.ready())
        }
        );
        return e
    }()
      , g = {};
    f.Callbacks = function(a) {
        a = a ? g[a] || h(a) : {};
        var c = [], d = [], e, i, j, k, l, m, n = function(b) {
            var d, e, g, h, i;
            for (d = 0,
            e = b.length; d < e; d++)
                g = b[d],
                h = f.type(g),
                h === "array" ? n(g) : h === "function" && (!a.unique || !p.has(g)) && c.push(g)
        }, o = function(b, f) {
            f = f || [],
            e = !a.memory || [b, f],
            i = !0,
            j = !0,
            m = k || 0,
            k = 0,
            l = c.length;
            for (; c && m < l; m++)
                if (c[m].apply(b, f) === !1 && a.stopOnFalse) {
                    e = !0;
                    break
                }
            j = !1,
            c && (a.once ? e === !0 ? p.disable() : c = [] : d && d.length && (e = d.shift(),
            p.fireWith(e[0], e[1])))
        }, p = {
            add: function() {
                if (c) {
                    var a = c.length;
                    n(arguments),
                    j ? l = c.length : e && e !== !0 && (k = a,
                    o(e[0], e[1]))
                }
                return this
            },
            remove: function() {
                if (c) {
                    var b = arguments
                      , d = 0
                      , e = b.length;
                    for (; d < e; d++)
                        for (var f = 0; f < c.length; f++)
                            if (b[d] === c[f]) {
                                j && f <= l && (l--,
                                f <= m && m--),
                                c.splice(f--, 1);
                                if (a.unique)
                                    break
                            }
                }
                return this
            },
            has: function(a) {
                if (c) {
                    var b = 0
                      , d = c.length;
                    for (; b < d; b++)
                        if (a === c[b])
                            return !0
                }
                return !1
            },
            empty: function() {
                c = [];
                return this
            },
            disable: function() {
                c = d = e = b;
                return this
            },
            disabled: function() {
                return !c
            },
            lock: function() {
                d = b,
                (!e || e === !0) && p.disable();
                return this
            },
            locked: function() {
                return !d
            },
            fireWith: function(b, c) {
                d && (j ? a.once || d.push([b, c]) : (!a.once || !e) && o(b, c));
                return this
            },
            fire: function() {
                p.fireWith(this, arguments);
                return this
            },
            fired: function() {
                return !!i
            }
        };
        return p
    }
    ;
    var i = [].slice;
    f.extend({
        Deferred: function(a) {
            var b = f.Callbacks("once memory"), c = f.Callbacks("once memory"), d = f.Callbacks("memory"), e = "pending", g = {
                resolve: b,
                reject: c,
                notify: d
            }, h = {
                done: b.add,
                fail: c.add,
                progress: d.add,
                state: function() {
                    return e
                },
                isResolved: b.fired,
                isRejected: c.fired,
                then: function(a, b, c) {
                    i.done(a).fail(b).progress(c);
                    return this
                },
                always: function() {
                    i.done.apply(i, arguments).fail.apply(i, arguments);
                    return this
                },
                pipe: function(a, b, c) {
                    return f.Deferred(function(d) {
                        f.each({
                            done: [a, "resolve"],
                            fail: [b, "reject"],
                            progress: [c, "notify"]
                        }, function(a, b) {
                            var c = b[0], e = b[1], g;
                            f.isFunction(c) ? i[a](function() {
                                g = c.apply(this, arguments),
                                g && f.isFunction(g.promise) ? g.promise().then(d.resolve, d.reject, d.notify) : d[e + "With"](this === i ? d : this, [g])
                            }) : i[a](d[e])
                        })
                    }).promise()
                },
                promise: function(a) {
                    if (a == null)
                        a = h;
                    else
                        for (var b in h)
                            a[b] = h[b];
                    return a
                }
            }, i = h.promise({}), j;
            for (j in g)
                i[j] = g[j].fire,
                i[j + "With"] = g[j].fireWith;
            i.done(function() {
                e = "resolved"
            }, c.disable, d.lock).fail(function() {
                e = "rejected"
            }, b.disable, d.lock),
            a && a.call(i, i);
            return i
        },
        when: function(a) {
            function m(a) {
                return function(b) {
                    e[a] = arguments.length > 1 ? i.call(arguments, 0) : b,
                    j.notifyWith(k, e)
                }
            }
            function l(a) {
                return function(c) {
                    b[a] = arguments.length > 1 ? i.call(arguments, 0) : c,
                    --g || j.resolveWith(j, b)
                }
            }
            var b = i.call(arguments, 0)
              , c = 0
              , d = b.length
              , e = Array(d)
              , g = d
              , h = d
              , j = d <= 1 && a && f.isFunction(a.promise) ? a : f.Deferred()
              , k = j.promise();
            if (d > 1) {
                for (; c < d; c++)
                    b[c] && b[c].promise && f.isFunction(b[c].promise) ? b[c].promise().then(l(c), j.reject, m(c)) : --g;
                g || j.resolveWith(j, b)
            } else
                j !== a && j.resolveWith(j, d ? [a] : []);
            return k
        }
    }),
    f.support = function() {
        var b, d, e, g, h, i, j, k, l, m, n, o, p = c.createElement("div"), q = c.documentElement;
        p.setAttribute("className", "t"),
        p.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",
        d = p.getElementsByTagName("*"),
        e = p.getElementsByTagName("a")[0];
        if (!d || !d.length || !e)
            return {};
        g = c.createElement("select"),
        h = g.appendChild(c.createElement("option")),
        i = p.getElementsByTagName("input")[0],
        b = {
            leadingWhitespace: p.firstChild.nodeType === 3,
            tbody: !p.getElementsByTagName("tbody").length,
            htmlSerialize: !!p.getElementsByTagName("link").length,
            style: /top/.test(e.getAttribute("style")),
            hrefNormalized: e.getAttribute("href") === "/a",
            opacity: /^0.55/.test(e.style.opacity),
            cssFloat: !!e.style.cssFloat,
            checkOn: i.value === "on",
            optSelected: h.selected,
            getSetAttribute: p.className !== "t",
            enctype: !!c.createElement("form").enctype,
            html5Clone: c.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0,
            pixelMargin: !0
        },
        f.boxModel = b.boxModel = c.compatMode === "CSS1Compat",
        i.checked = !0,
        b.noCloneChecked = i.cloneNode(!0).checked,
        g.disabled = !0,
        b.optDisabled = !h.disabled;
        try {
            delete p.test
        } catch (r) {
            b.deleteExpando = !1
        }
        !p.addEventListener && p.attachEvent && p.fireEvent && (p.attachEvent("onclick", function() {
            b.noCloneEvent = !1
        }),
        p.cloneNode(!0).fireEvent("onclick")),
        i = c.createElement("input"),
        i.value = "t",
        i.setAttribute("type", "radio"),
        b.radioValue = i.value === "t",
        i.setAttribute("checked", "checked"),
        i.setAttribute("name", "t"),
        p.appendChild(i),
        j = c.createDocumentFragment(),
        j.appendChild(p.lastChild),
        b.checkClone = j.cloneNode(!0).cloneNode(!0).lastChild.checked,
        b.appendChecked = i.checked,
        j.removeChild(i),
        j.appendChild(p);
        if (p.attachEvent)
            for (n in {
                submit: 1,
                change: 1,
                focusin: 1
            })
                m = "on" + n,
                o = m in p,
                o || (p.setAttribute(m, "return;"),
                o = typeof p[m] == "function"),
                b[n + "Bubbles"] = o;
        j.removeChild(p),
        j = g = h = p = i = null,
        f(function() {
            var d, e, g, h, i, j, l, m, n, q, r, s, t, u = c.getElementsByTagName("body")[0];
            !u || (m = 1,
            t = "padding:0;margin:0;border:",
            r = "position:absolute;top:0;left:0;width:1px;height:1px;",
            s = t + "0;visibility:hidden;",
            n = "style='" + r + t + "5px solid #000;",
            q = "<div " + n + "display:block;'><div style='" + t + "0;display:block;overflow:hidden;'></div></div>" + "<table " + n + "' cellpadding='0' cellspacing='0'>" + "<tr><td></td></tr></table>",
            d = c.createElement("div"),
            d.style.cssText = s + "width:0;height:0;position:static;top:0;margin-top:" + m + "px",
            u.insertBefore(d, u.firstChild),
            p = c.createElement("div"),
            d.appendChild(p),
            p.innerHTML = "<table><tr><td style='" + t + "0;display:none'></td><td>t</td></tr></table>",
            k = p.getElementsByTagName("td"),
            o = k[0].offsetHeight === 0,
            k[0].style.display = "",
            k[1].style.display = "none",
            b.reliableHiddenOffsets = o && k[0].offsetHeight === 0,
            a.getComputedStyle && (p.innerHTML = "",
            l = c.createElement("div"),
            l.style.width = "0",
            l.style.marginRight = "0",
            p.style.width = "2px",
            p.appendChild(l),
            b.reliableMarginRight = (parseInt((a.getComputedStyle(l, null) || {
                marginRight: 0
            }).marginRight, 10) || 0) === 0),
            typeof p.style.zoom != "undefined" && (p.innerHTML = "",
            p.style.width = p.style.padding = "1px",
            p.style.border = 0,
            p.style.overflow = "hidden",
            p.style.display = "inline",
            p.style.zoom = 1,
            b.inlineBlockNeedsLayout = p.offsetWidth === 3,
            p.style.display = "block",
            p.style.overflow = "visible",
            p.innerHTML = "<div style='width:5px;'></div>",
            b.shrinkWrapBlocks = p.offsetWidth !== 3),
            p.style.cssText = r + s,
            p.innerHTML = q,
            e = p.firstChild,
            g = e.firstChild,
            i = e.nextSibling.firstChild.firstChild,
            j = {
                doesNotAddBorder: g.offsetTop !== 5,
                doesAddBorderForTableAndCells: i.offsetTop === 5
            },
            g.style.position = "fixed",
            g.style.top = "20px",
            j.fixedPosition = g.offsetTop === 20 || g.offsetTop === 15,
            g.style.position = g.style.top = "",
            e.style.overflow = "hidden",
            e.style.position = "relative",
            j.subtractsBorderForOverflowNotVisible = g.offsetTop === -5,
            j.doesNotIncludeMarginInBodyOffset = u.offsetTop !== m,
            a.getComputedStyle && (p.style.marginTop = "1%",
            b.pixelMargin = (a.getComputedStyle(p, null) || {
                marginTop: 0
            }).marginTop !== "1%"),
            typeof d.style.zoom != "undefined" && (d.style.zoom = 1),
            u.removeChild(d),
            l = p = d = null,
            f.extend(b, j))
        });
        return b
    }();
    var j = /^(?:\{.*\}|\[.*\])$/
      , k = /([A-Z])/g;
    f.extend({
        cache: {},
        uuid: 0,
        expando: "jQuery" + (f.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function(a) {
            a = a.nodeType ? f.cache[a[f.expando]] : a[f.expando];
            return !!a && !m(a)
        },
        data: function(a, c, d, e) {
            if (!!f.acceptData(a)) {
                var g, h, i, j = f.expando, k = typeof c == "string", l = a.nodeType, m = l ? f.cache : a, n = l ? a[j] : a[j] && j, o = c === "events";
                if ((!n || !m[n] || !o && !e && !m[n].data) && k && d === b)
                    return;
                n || (l ? a[j] = n = ++f.uuid : n = j),
                m[n] || (m[n] = {},
                l || (m[n].toJSON = f.noop));
                if (typeof c == "object" || typeof c == "function")
                    e ? m[n] = f.extend(m[n], c) : m[n].data = f.extend(m[n].data, c);
                g = h = m[n],
                e || (h.data || (h.data = {}),
                h = h.data),
                d !== b && (h[f.camelCase(c)] = d);
                if (o && !h[c])
                    return g.events;
                k ? (i = h[c],
                i == null && (i = h[f.camelCase(c)])) : i = h;
                return i
            }
        },
        removeData: function(a, b, c) {
            if (!!f.acceptData(a)) {
                var d, e, g, h = f.expando, i = a.nodeType, j = i ? f.cache : a, k = i ? a[h] : h;
                if (!j[k])
                    return;
                if (b) {
                    d = c ? j[k] : j[k].data;
                    if (d) {
                        f.isArray(b) || (b in d ? b = [b] : (b = f.camelCase(b),
                        b in d ? b = [b] : b = b.split(" ")));
                        for (e = 0,
                        g = b.length; e < g; e++)
                            delete d[b[e]];
                        if (!(c ? m : f.isEmptyObject)(d))
                            return
                    }
                }
                if (!c) {
                    delete j[k].data;
                    if (!m(j[k]))
                        return
                }
                f.support.deleteExpando || !j.setInterval ? delete j[k] : j[k] = null,
                i && (f.support.deleteExpando ? delete a[h] : a.removeAttribute ? a.removeAttribute(h) : a[h] = null)
            }
        },
        _data: function(a, b, c) {
            return f.data(a, b, c, !0)
        },
        acceptData: function(a) {
            if (a.nodeName) {
                var b = f.noData[a.nodeName.toLowerCase()];
                if (b)
                    return b !== !0 && a.getAttribute("classid") === b
            }
            return !0
        }
    }),
    f.fn.extend({
        data: function(a, c) {
            var d, e, g, h, i, j = this[0], k = 0, m = null;
            if (a === b) {
                if (this.length) {
                    m = f.data(j);
                    if (j.nodeType === 1 && !f._data(j, "parsedAttrs")) {
                        g = j.attributes;
                        for (i = g.length; k < i; k++)
                            h = g[k].name,
                            h.indexOf("data-") === 0 && (h = f.camelCase(h.substring(5)),
                            l(j, h, m[h]));
                        f._data(j, "parsedAttrs", !0)
                    }
                }
                return m
            }
            if (typeof a == "object")
                return this.each(function() {
                    f.data(this, a)
                });
            d = a.split(".", 2),
            d[1] = d[1] ? "." + d[1] : "",
            e = d[1] + "!";
            return f.access(this, function(c) {
                if (c === b) {
                    m = this.triggerHandler("getData" + e, [d[0]]),
                    m === b && j && (m = f.data(j, a),
                    m = l(j, a, m));
                    return m === b && d[1] ? this.data(d[0]) : m
                }
                d[1] = c,
                this.each(function() {
                    var b = f(this);
                    b.triggerHandler("setData" + e, d),
                    f.data(this, a, c),
                    b.triggerHandler("changeData" + e, d)
                })
            }, null, c, arguments.length > 1, null, !1)
        },
        removeData: function(a) {
            return this.each(function() {
                f.removeData(this, a)
            })
        }
    }),
    f.extend({
        _mark: function(a, b) {
            a && (b = (b || "fx") + "mark",
            f._data(a, b, (f._data(a, b) || 0) + 1))
        },
        _unmark: function(a, b, c) {
            a !== !0 && (c = b,
            b = a,
            a = !1);
            if (b) {
                c = c || "fx";
                var d = c + "mark"
                  , e = a ? 0 : (f._data(b, d) || 1) - 1;
                e ? f._data(b, d, e) : (f.removeData(b, d, !0),
                n(b, c, "mark"))
            }
        },
        queue: function(a, b, c) {
            var d;
            if (a) {
                b = (b || "fx") + "queue",
                d = f._data(a, b),
                c && (!d || f.isArray(c) ? d = f._data(a, b, f.makeArray(c)) : d.push(c));
                return d || []
            }
        },
        dequeue: function(a, b) {
            b = b || "fx";
            var c = f.queue(a, b)
              , d = c.shift()
              , e = {};
            d === "inprogress" && (d = c.shift()),
            d && (b === "fx" && c.unshift("inprogress"),
            f._data(a, b + ".run", e),
            d.call(a, function() {
                f.dequeue(a, b)
            }, e)),
            c.length || (f.removeData(a, b + "queue " + b + ".run", !0),
            n(a, b, "queue"))
        }
    }),
    f.fn.extend({
        queue: function(a, c) {
            var d = 2;
            typeof a != "string" && (c = a,
            a = "fx",
            d--);
            if (arguments.length < d)
                return f.queue(this[0], a);
            return c === b ? this : this.each(function() {
                var b = f.queue(this, a, c);
                a === "fx" && b[0] !== "inprogress" && f.dequeue(this, a)
            })
        },
        dequeue: function(a) {
            return this.each(function() {
                f.dequeue(this, a)
            })
        },
        delay: function(a, b) {
            a = f.fx ? f.fx.speeds[a] || a : a,
            b = b || "fx";
            return this.queue(b, function(b, c) {
                var d = setTimeout(b, a);
                c.stop = function() {
                    clearTimeout(d)
                }
            })
        },
        clearQueue: function(a) {
            return this.queue(a || "fx", [])
        },
        promise: function(a, c) {
            function m() {
                --h || d.resolveWith(e, [e])
            }
            typeof a != "string" && (c = a,
            a = b),
            a = a || "fx";
            var d = f.Deferred(), e = this, g = e.length, h = 1, i = a + "defer", j = a + "queue", k = a + "mark", l;
            while (g--)
                if (l = f.data(e[g], i, b, !0) || (f.data(e[g], j, b, !0) || f.data(e[g], k, b, !0)) && f.data(e[g], i, f.Callbacks("once memory"), !0))
                    h++,
                    l.add(m);
            m();
            return d.promise(c)
        }
    });
    var o = /[\n\t\r]/g, p = /\s+/, q = /\r/g, r = /^(?:button|input)$/i, s = /^(?:button|input|object|select|textarea)$/i, t = /^a(?:rea)?$/i, u = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, v = f.support.getSetAttribute, w, x, y;
    f.fn.extend({
        attr: function(a, b) {
            return f.access(this, f.attr, a, b, arguments.length > 1)
        },
        removeAttr: function(a) {
            return this.each(function() {
                f.removeAttr(this, a)
            })
        },
        prop: function(a, b) {
            return f.access(this, f.prop, a, b, arguments.length > 1)
        },
        removeProp: function(a) {
            a = f.propFix[a] || a;
            return this.each(function() {
                try {
                    this[a] = b,
                    delete this[a]
                } catch (c) {}
            })
        },
        addClass: function(a) {
            var b, c, d, e, g, h, i;
            if (f.isFunction(a))
                return this.each(function(b) {
                    f(this).addClass(a.call(this, b, this.className))
                });
            if (a && typeof a == "string") {
                b = a.split(p);
                for (c = 0,
                d = this.length; c < d; c++) {
                    e = this[c];
                    if (e.nodeType === 1)
                        if (!e.className && b.length === 1)
                            e.className = a;
                        else {
                            g = " " + e.className + " ";
                            for (h = 0,
                            i = b.length; h < i; h++)
                                ~g.indexOf(" " + b[h] + " ") || (g += b[h] + " ");
                            e.className = f.trim(g)
                        }
                }
            }
            return this
        },
        removeClass: function(a) {
            var c, d, e, g, h, i, j;
            if (f.isFunction(a))
                return this.each(function(b) {
                    f(this).removeClass(a.call(this, b, this.className))
                });
            if (a && typeof a == "string" || a === b) {
                c = (a || "").split(p);
                for (d = 0,
                e = this.length; d < e; d++) {
                    g = this[d];
                    if (g.nodeType === 1 && g.className)
                        if (a) {
                            h = (" " + g.className + " ").replace(o, " ");
                            for (i = 0,
                            j = c.length; i < j; i++)
                                h = h.replace(" " + c[i] + " ", " ");
                            g.className = f.trim(h)
                        } else
                            g.className = ""
                }
            }
            return this
        },
        toggleClass: function(a, b) {
            var c = typeof a
              , d = typeof b == "boolean";
            if (f.isFunction(a))
                return this.each(function(c) {
                    f(this).toggleClass(a.call(this, c, this.className, b), b)
                });
            return this.each(function() {
                if (c === "string") {
                    var e, g = 0, h = f(this), i = b, j = a.split(p);
                    while (e = j[g++])
                        i = d ? i : !h.hasClass(e),
                        h[i ? "addClass" : "removeClass"](e)
                } else if (c === "undefined" || c === "boolean")
                    this.className && f._data(this, "__className__", this.className),
                    this.className = this.className || a === !1 ? "" : f._data(this, "__className__") || ""
            })
        },
        hasClass: function(a) {
            var b = " " + a + " "
              , c = 0
              , d = this.length;
            for (; c < d; c++)
                if (this[c].nodeType === 1 && (" " + this[c].className + " ").replace(o, " ").indexOf(b) > -1)
                    return !0;
            return !1
        },
        val: function(a) {
            var c, d, e, g = this[0];
            {
                if (!!arguments.length) {
                    e = f.isFunction(a);
                    return this.each(function(d) {
                        var g = f(this), h;
                        if (this.nodeType === 1) {
                            e ? h = a.call(this, d, g.val()) : h = a,
                            h == null ? h = "" : typeof h == "number" ? h += "" : f.isArray(h) && (h = f.map(h, function(a) {
                                return a == null ? "" : a + ""
                            })),
                            c = f.valHooks[this.type] || f.valHooks[this.nodeName.toLowerCase()];
                            if (!c || !("set"in c) || c.set(this, h, "value") === b)
                                this.value = h
                        }
                    })
                }
                if (g) {
                    c = f.valHooks[g.type] || f.valHooks[g.nodeName.toLowerCase()];
                    if (c && "get"in c && (d = c.get(g, "value")) !== b)
                        return d;
                    d = g.value;
                    return typeof d == "string" ? d.replace(q, "") : d == null ? "" : d
                }
            }
        }
    }),
    f.extend({
        valHooks: {
            option: {
                get: function(a) {
                    var b = a.attributes.value;
                    return !b || b.specified ? a.value : a.text
                }
            },
            select: {
                get: function(a) {
                    var b, c, d, e, g = a.selectedIndex, h = [], i = a.options, j = a.type === "select-one";
                    if (g < 0)
                        return null;
                    c = j ? g : 0,
                    d = j ? g + 1 : i.length;
                    for (; c < d; c++) {
                        e = i[c];
                        if (e.selected && (f.support.optDisabled ? !e.disabled : e.getAttribute("disabled") === null) && (!e.parentNode.disabled || !f.nodeName(e.parentNode, "optgroup"))) {
                            b = f(e).val();
                            if (j)
                                return b;
                            h.push(b)
                        }
                    }
                    if (j && !h.length && i.length)
                        return f(i[g]).val();
                    return h
                },
                set: function(a, b) {
                    var c = f.makeArray(b);
                    f(a).find("option").each(function() {
                        this.selected = f.inArray(f(this).val(), c) >= 0
                    }),
                    c.length || (a.selectedIndex = -1);
                    return c
                }
            }
        },
        attrFn: {
            val: !0,
            css: !0,
            html: !0,
            text: !0,
            data: !0,
            width: !0,
            height: !0,
            offset: !0
        },
        attr: function(a, c, d, e) {
            var g, h, i, j = a.nodeType;
            if (!!a && j !== 3 && j !== 8 && j !== 2) {
                if (e && c in f.attrFn)
                    return f(a)[c](d);
                if (typeof a.getAttribute == "undefined")
                    return f.prop(a, c, d);
                i = j !== 1 || !f.isXMLDoc(a),
                i && (c = c.toLowerCase(),
                h = f.attrHooks[c] || (u.test(c) ? x : w));
                if (d !== b) {
                    if (d === null) {
                        f.removeAttr(a, c);
                        return
                    }
                    if (h && "set"in h && i && (g = h.set(a, d, c)) !== b)
                        return g;
                    a.setAttribute(c, "" + d);
                    return d
                }
                if (h && "get"in h && i && (g = h.get(a, c)) !== null)
                    return g;
                g = a.getAttribute(c);
                return g === null ? b : g
            }
        },
        removeAttr: function(a, b) {
            var c, d, e, g, h, i = 0;
            if (b && a.nodeType === 1) {
                d = b.toLowerCase().split(p),
                g = d.length;
                for (; i < g; i++)
                    e = d[i],
                    e && (c = f.propFix[e] || e,
                    h = u.test(e),
                    h || f.attr(a, e, ""),
                    a.removeAttribute(v ? e : c),
                    h && c in a && (a[c] = !1))
            }
        },
        attrHooks: {
            type: {
                set: function(a, b) {
                    if (r.test(a.nodeName) && a.parentNode)
                        f.error("type property can't be changed");
                    else if (!f.support.radioValue && b === "radio" && f.nodeName(a, "input")) {
                        var c = a.value;
                        a.setAttribute("type", b),
                        c && (a.value = c);
                        return b
                    }
                }
            },
            value: {
                get: function(a, b) {
                    if (w && f.nodeName(a, "button"))
                        return w.get(a, b);
                    return b in a ? a.value : null
                },
                set: function(a, b, c) {
                    if (w && f.nodeName(a, "button"))
                        return w.set(a, b, c);
                    a.value = b
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function(a, c, d) {
            var e, g, h, i = a.nodeType;
            if (!!a && i !== 3 && i !== 8 && i !== 2) {
                h = i !== 1 || !f.isXMLDoc(a),
                h && (c = f.propFix[c] || c,
                g = f.propHooks[c]);
                return d !== b ? g && "set"in g && (e = g.set(a, d, c)) !== b ? e : a[c] = d : g && "get"in g && (e = g.get(a, c)) !== null ? e : a[c]
            }
        },
        propHooks: {
            tabIndex: {
                get: function(a) {
                    var c = a.getAttributeNode("tabindex");
                    return c && c.specified ? parseInt(c.value, 10) : s.test(a.nodeName) || t.test(a.nodeName) && a.href ? 0 : b
                }
            }
        }
    }),
    f.attrHooks.tabindex = f.propHooks.tabIndex,
    x = {
        get: function(a, c) {
            var d, e = f.prop(a, c);
            return e === !0 || typeof e != "boolean" && (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b
        },
        set: function(a, b, c) {
            var d;
            b === !1 ? f.removeAttr(a, c) : (d = f.propFix[c] || c,
            d in a && (a[d] = !0),
            a.setAttribute(c, c.toLowerCase()));
            return c
        }
    },
    v || (y = {
        name: !0,
        id: !0,
        coords: !0
    },
    w = f.valHooks.button = {
        get: function(a, c) {
            var d;
            d = a.getAttributeNode(c);
            return d && (y[c] ? d.nodeValue !== "" : d.specified) ? d.nodeValue : b
        },
        set: function(a, b, d) {
            var e = a.getAttributeNode(d);
            e || (e = c.createAttribute(d),
            a.setAttributeNode(e));
            return e.nodeValue = b + ""
        }
    },
    f.attrHooks.tabindex.set = w.set,
    f.each(["width", "height"], function(a, b) {
        f.attrHooks[b] = f.extend(f.attrHooks[b], {
            set: function(a, c) {
                if (c === "") {
                    a.setAttribute(b, "auto");
                    return c
                }
            }
        })
    }),
    f.attrHooks.contenteditable = {
        get: w.get,
        set: function(a, b, c) {
            b === "" && (b = "false"),
            w.set(a, b, c)
        }
    }),
    f.support.hrefNormalized || f.each(["href", "src", "width", "height"], function(a, c) {
        f.attrHooks[c] = f.extend(f.attrHooks[c], {
            get: function(a) {
                var d = a.getAttribute(c, 2);
                return d === null ? b : d
            }
        })
    }),
    f.support.style || (f.attrHooks.style = {
        get: function(a) {
            return a.style.cssText.toLowerCase() || b
        },
        set: function(a, b) {
            return a.style.cssText = "" + b
        }
    }),
    f.support.optSelected || (f.propHooks.selected = f.extend(f.propHooks.selected, {
        get: function(a) {
            var b = a.parentNode;
            b && (b.selectedIndex,
            b.parentNode && b.parentNode.selectedIndex);
            return null
        }
    })),
    f.support.enctype || (f.propFix.enctype = "encoding"),
    f.support.checkOn || f.each(["radio", "checkbox"], function() {
        f.valHooks[this] = {
            get: function(a) {
                return a.getAttribute("value") === null ? "on" : a.value
            }
        }
    }),
    f.each(["radio", "checkbox"], function() {
        f.valHooks[this] = f.extend(f.valHooks[this], {
            set: function(a, b) {
                if (f.isArray(b))
                    return a.checked = f.inArray(f(a).val(), b) >= 0
            }
        })
    });
    var z = /^(?:textarea|input|select)$/i
      , A = /^([^\.]*)?(?:\.(.+))?$/
      , B = /(?:^|\s)hover(\.\S+)?\b/
      , C = /^key/
      , D = /^(?:mouse|contextmenu)|click/
      , E = /^(?:focusinfocus|focusoutblur)$/
      , F = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/
      , G = function(a) {
        var b = F.exec(a);
        b && (b[1] = (b[1] || "").toLowerCase(),
        b[3] = b[3] && new RegExp("(?:^|\\s)" + b[3] + "(?:\\s|$)"));
        return b
    }
      , H = function(a, b) {
        var c = a.attributes || {};
        return (!b[1] || a.nodeName.toLowerCase() === b[1]) && (!b[2] || (c.id || {}).value === b[2]) && (!b[3] || b[3].test((c["class"] || {}).value))
    }
      , I = function(a) {
        return f.event.special.hover ? a : a.replace(B, "mouseenter$1 mouseleave$1")
    };
    f.event = {
        add: function(a, c, d, e, g) {
            var h, i, j, k, l, m, n, o, p, q, r, s;
            if (!(a.nodeType === 3 || a.nodeType === 8 || !c || !d || !(h = f._data(a)))) {
                d.handler && (p = d,
                d = p.handler,
                g = p.selector),
                d.guid || (d.guid = f.guid++),
                j = h.events,
                j || (h.events = j = {}),
                i = h.handle,
                i || (h.handle = i = function(a) {
                    return typeof f != "undefined" && (!a || f.event.triggered !== a.type) ? f.event.dispatch.apply(i.elem, arguments) : b
                }
                ,
                i.elem = a),
                c = f.trim(I(c)).split(" ");
                for (k = 0; k < c.length; k++) {
                    l = A.exec(c[k]) || [],
                    m = l[1],
                    n = (l[2] || "").split(".").sort(),
                    s = f.event.special[m] || {},
                    m = (g ? s.delegateType : s.bindType) || m,
                    s = f.event.special[m] || {},
                    o = f.extend({
                        type: m,
                        origType: l[1],
                        data: e,
                        handler: d,
                        guid: d.guid,
                        selector: g,
                        quick: g && G(g),
                        namespace: n.join(".")
                    }, p),
                    r = j[m];
                    if (!r) {
                        r = j[m] = [],
                        r.delegateCount = 0;
                        if (!s.setup || s.setup.call(a, e, n, i) === !1)
                            a.addEventListener ? a.addEventListener(m, i, !1) : a.attachEvent && a.attachEvent("on" + m, i)
                    }
                    s.add && (s.add.call(a, o),
                    o.handler.guid || (o.handler.guid = d.guid)),
                    g ? r.splice(r.delegateCount++, 0, o) : r.push(o),
                    f.event.global[m] = !0
                }
                a = null
            }
        },
        global: {},
        remove: function(a, b, c, d, e) {
            var g = f.hasData(a) && f._data(a), h, i, j, k, l, m, n, o, p, q, r, s;
            if (!!g && !!(o = g.events)) {
                b = f.trim(I(b || "")).split(" ");
                for (h = 0; h < b.length; h++) {
                    i = A.exec(b[h]) || [],
                    j = k = i[1],
                    l = i[2];
                    if (!j) {
                        for (j in o)
                            f.event.remove(a, j + b[h], c, d, !0);
                        continue
                    }
                    p = f.event.special[j] || {},
                    j = (d ? p.delegateType : p.bindType) || j,
                    r = o[j] || [],
                    m = r.length,
                    l = l ? new RegExp("(^|\\.)" + l.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
                    for (n = 0; n < r.length; n++)
                        s = r[n],
                        (e || k === s.origType) && (!c || c.guid === s.guid) && (!l || l.test(s.namespace)) && (!d || d === s.selector || d === "**" && s.selector) && (r.splice(n--, 1),
                        s.selector && r.delegateCount--,
                        p.remove && p.remove.call(a, s));
                    r.length === 0 && m !== r.length && ((!p.teardown || p.teardown.call(a, l) === !1) && f.removeEvent(a, j, g.handle),
                    delete o[j])
                }
                f.isEmptyObject(o) && (q = g.handle,
                q && (q.elem = null),
                f.removeData(a, ["events", "handle"], !0))
            }
        },
        customEvent: {
            getData: !0,
            setData: !0,
            changeData: !0
        },
        trigger: function(c, d, e, g) {
            if (!e || e.nodeType !== 3 && e.nodeType !== 8) {
                var h = c.type || c, i = [], j, k, l, m, n, o, p, q, r, s;
                if (E.test(h + f.event.triggered))
                    return;
                h.indexOf("!") >= 0 && (h = h.slice(0, -1),
                k = !0),
                h.indexOf(".") >= 0 && (i = h.split("."),
                h = i.shift(),
                i.sort());
                if ((!e || f.event.customEvent[h]) && !f.event.global[h])
                    return;
                c = typeof c == "object" ? c[f.expando] ? c : new f.Event(h,c) : new f.Event(h),
                c.type = h,
                c.isTrigger = !0,
                c.exclusive = k,
                c.namespace = i.join("."),
                c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + i.join("\\.(?:.*\\.)?") + "(\\.|$)") : null,
                o = h.indexOf(":") < 0 ? "on" + h : "";
                if (!e) {
                    j = f.cache;
                    for (l in j)
                        j[l].events && j[l].events[h] && f.event.trigger(c, d, j[l].handle.elem, !0);
                    return
                }
                c.result = b,
                c.target || (c.target = e),
                d = d != null ? f.makeArray(d) : [],
                d.unshift(c),
                p = f.event.special[h] || {};
                if (p.trigger && p.trigger.apply(e, d) === !1)
                    return;
                r = [[e, p.bindType || h]];
                if (!g && !p.noBubble && !f.isWindow(e)) {
                    s = p.delegateType || h,
                    m = E.test(s + h) ? e : e.parentNode,
                    n = null;
                    for (; m; m = m.parentNode)
                        r.push([m, s]),
                        n = m;
                    n && n === e.ownerDocument && r.push([n.defaultView || n.parentWindow || a, s])
                }
                for (l = 0; l < r.length && !c.isPropagationStopped(); l++)
                    m = r[l][0],
                    c.type = r[l][1],
                    q = (f._data(m, "events") || {})[c.type] && f._data(m, "handle"),
                    q && q.apply(m, d),
                    q = o && m[o],
                    q && f.acceptData(m) && q.apply(m, d) === !1 && c.preventDefault();
                c.type = h,
                !g && !c.isDefaultPrevented() && (!p._default || p._default.apply(e.ownerDocument, d) === !1) && (h !== "click" || !f.nodeName(e, "a")) && f.acceptData(e) && o && e[h] && (h !== "focus" && h !== "blur" || c.target.offsetWidth !== 0) && !f.isWindow(e) && (n = e[o],
                n && (e[o] = null),
                f.event.triggered = h,
                e[h](),
                f.event.triggered = b,
                n && (e[o] = n));
                return c.result
            }
        },
        dispatch: function(c) {
            c = f.event.fix(c || a.event);
            var d = (f._data(this, "events") || {})[c.type] || [], e = d.delegateCount, g = [].slice.call(arguments, 0), h = !c.exclusive && !c.namespace, i = f.event.special[c.type] || {}, j = [], k, l, m, n, o, p, q, r, s, t, u;
            g[0] = c,
            c.delegateTarget = this;
            if (!i.preDispatch || i.preDispatch.call(this, c) !== !1) {
                if (e && (!c.button || c.type !== "click")) {
                    n = f(this),
                    n.context = this.ownerDocument || this;
                    for (m = c.target; m != this; m = m.parentNode || this)
                        if (m.disabled !== !0) {
                            p = {},
                            r = [],
                            n[0] = m;
                            for (k = 0; k < e; k++)
                                s = d[k],
                                t = s.selector,
                                p[t] === b && (p[t] = s.quick ? H(m, s.quick) : n.is(t)),
                                p[t] && r.push(s);
                            r.length && j.push({
                                elem: m,
                                matches: r
                            })
                        }
                }
                d.length > e && j.push({
                    elem: this,
                    matches: d.slice(e)
                });
                for (k = 0; k < j.length && !c.isPropagationStopped(); k++) {
                    q = j[k],
                    c.currentTarget = q.elem;
                    for (l = 0; l < q.matches.length && !c.isImmediatePropagationStopped(); l++) {
                        s = q.matches[l];
                        if (h || !c.namespace && !s.namespace || c.namespace_re && c.namespace_re.test(s.namespace))
                            c.data = s.data,
                            c.handleObj = s,
                            o = ((f.event.special[s.origType] || {}).handle || s.handler).apply(q.elem, g),
                            o !== b && (c.result = o,
                            o === !1 && (c.preventDefault(),
                            c.stopPropagation()))
                    }
                }
                i.postDispatch && i.postDispatch.call(this, c);
                return c.result
            }
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(a, b) {
                a.which == null && (a.which = b.charCode != null ? b.charCode : b.keyCode);
                return a
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(a, d) {
                var e, f, g, h = d.button, i = d.fromElement;
                a.pageX == null && d.clientX != null && (e = a.target.ownerDocument || c,
                f = e.documentElement,
                g = e.body,
                a.pageX = d.clientX + (f && f.scrollLeft || g && g.scrollLeft || 0) - (f && f.clientLeft || g && g.clientLeft || 0),
                a.pageY = d.clientY + (f && f.scrollTop || g && g.scrollTop || 0) - (f && f.clientTop || g && g.clientTop || 0)),
                !a.relatedTarget && i && (a.relatedTarget = i === a.target ? d.toElement : i),
                !a.which && h !== b && (a.which = h & 1 ? 1 : h & 2 ? 3 : h & 4 ? 2 : 0);
                return a
            }
        },
        fix: function(a) {
            if (a[f.expando])
                return a;
            var d, e, g = a, h = f.event.fixHooks[a.type] || {}, i = h.props ? this.props.concat(h.props) : this.props;
            a = f.Event(g);
            for (d = i.length; d; )
                e = i[--d],
                a[e] = g[e];
            a.target || (a.target = g.srcElement || c),
            a.target.nodeType === 3 && (a.target = a.target.parentNode),
            a.metaKey === b && (a.metaKey = a.ctrlKey);
            return h.filter ? h.filter(a, g) : a
        },
        special: {
            ready: {
                setup: f.bindReady
            },
            load: {
                noBubble: !0
            },
            focus: {
                delegateType: "focusin"
            },
            blur: {
                delegateType: "focusout"
            },
            beforeunload: {
                setup: function(a, b, c) {
                    f.isWindow(this) && (this.onbeforeunload = c)
                },
                teardown: function(a, b) {
                    this.onbeforeunload === b && (this.onbeforeunload = null)
                }
            }
        },
        simulate: function(a, b, c, d) {
            var e = f.extend(new f.Event, c, {
                type: a,
                isSimulated: !0,
                originalEvent: {}
            });
            d ? f.event.trigger(e, null, b) : f.event.dispatch.call(b, e),
            e.isDefaultPrevented() && c.preventDefault()
        }
    },
    f.event.handle = f.event.dispatch,
    f.removeEvent = c.removeEventListener ? function(a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1)
    }
    : function(a, b, c) {
        a.detachEvent && a.detachEvent("on" + b, c)
    }
    ,
    f.Event = function(a, b) {
        if (!(this instanceof f.Event))
            return new f.Event(a,b);
        a && a.type ? (this.originalEvent = a,
        this.type = a.type,
        this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? K : J) : this.type = a,
        b && f.extend(this, b),
        this.timeStamp = a && a.timeStamp || f.now(),
        this[f.expando] = !0
    }
    ,
    f.Event.prototype = {
        preventDefault: function() {
            this.isDefaultPrevented = K;
            var a = this.originalEvent;
            !a || (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
        },
        stopPropagation: function() {
            this.isPropagationStopped = K;
            var a = this.originalEvent;
            !a || (a.stopPropagation && a.stopPropagation(),
            a.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = K,
            this.stopPropagation()
        },
        isDefaultPrevented: J,
        isPropagationStopped: J,
        isImmediatePropagationStopped: J
    },
    f.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(a, b) {
        f.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function(a) {
                var c = this, d = a.relatedTarget, e = a.handleObj, g = e.selector, h;
                if (!d || d !== c && !f.contains(c, d))
                    a.type = e.origType,
                    h = e.handler.apply(this, arguments),
                    a.type = b;
                return h
            }
        }
    }),
    f.support.submitBubbles || (f.event.special.submit = {
        setup: function() {
            if (f.nodeName(this, "form"))
                return !1;
            f.event.add(this, "click._submit keypress._submit", function(a) {
                var c = a.target
                  , d = f.nodeName(c, "input") || f.nodeName(c, "button") ? c.form : b;
                d && !d._submit_attached && (f.event.add(d, "submit._submit", function(a) {
                    a._submit_bubble = !0
                }),
                d._submit_attached = !0)
            })
        },
        postDispatch: function(a) {
            a._submit_bubble && (delete a._submit_bubble,
            this.parentNode && !a.isTrigger && f.event.simulate("submit", this.parentNode, a, !0))
        },
        teardown: function() {
            if (f.nodeName(this, "form"))
                return !1;
            f.event.remove(this, "._submit")
        }
    }),
    f.support.changeBubbles || (f.event.special.change = {
        setup: function() {
            if (z.test(this.nodeName)) {
                if (this.type === "checkbox" || this.type === "radio")
                    f.event.add(this, "propertychange._change", function(a) {
                        a.originalEvent.propertyName === "checked" && (this._just_changed = !0)
                    }),
                    f.event.add(this, "click._change", function(a) {
                        this._just_changed && !a.isTrigger && (this._just_changed = !1,
                        f.event.simulate("change", this, a, !0))
                    });
                return !1
            }
            f.event.add(this, "beforeactivate._change", function(a) {
                var b = a.target;
                z.test(b.nodeName) && !b._change_attached && (f.event.add(b, "change._change", function(a) {
                    this.parentNode && !a.isSimulated && !a.isTrigger && f.event.simulate("change", this.parentNode, a, !0)
                }),
                b._change_attached = !0)
            })
        },
        handle: function(a) {
            var b = a.target;
            if (this !== b || a.isSimulated || a.isTrigger || b.type !== "radio" && b.type !== "checkbox")
                return a.handleObj.handler.apply(this, arguments)
        },
        teardown: function() {
            f.event.remove(this, "._change");
            return z.test(this.nodeName)
        }
    }),
    f.support.focusinBubbles || f.each({
        focus: "focusin",
        blur: "focusout"
    }, function(a, b) {
        var d = 0
          , e = function(a) {
            f.event.simulate(b, a.target, f.event.fix(a), !0)
        };
        f.event.special[b] = {
            setup: function() {
                d++ === 0 && c.addEventListener(a, e, !0)
            },
            teardown: function() {
                --d === 0 && c.removeEventListener(a, e, !0)
            }
        }
    }),
    f.fn.extend({
        on: function(a, c, d, e, g) {
            var h, i;
            if (typeof a == "object") {
                typeof c != "string" && (d = d || c,
                c = b);
                for (i in a)
                    this.on(i, c, d, a[i], g);
                return this
            }
            d == null && e == null ? (e = c,
            d = c = b) : e == null && (typeof c == "string" ? (e = d,
            d = b) : (e = d,
            d = c,
            c = b));
            if (e === !1)
                e = J;
            else if (!e)
                return this;
            g === 1 && (h = e,
            e = function(a) {
                f().off(a);
                return h.apply(this, arguments)
            }
            ,
            e.guid = h.guid || (h.guid = f.guid++));
            return this.each(function() {
                f.event.add(this, a, e, d, c)
            })
        },
        one: function(a, b, c, d) {
            return this.on(a, b, c, d, 1)
        },
        off: function(a, c, d) {
            if (a && a.preventDefault && a.handleObj) {
                var e = a.handleObj;
                f(a.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace : e.origType, e.selector, e.handler);
                return this
            }
            if (typeof a == "object") {
                for (var g in a)
                    this.off(g, c, a[g]);
                return this
            }
            if (c === !1 || typeof c == "function")
                d = c,
                c = b;
            d === !1 && (d = J);
            return this.each(function() {
                f.event.remove(this, a, d, c)
            })
        },
        bind: function(a, b, c) {
            return this.on(a, null, b, c)
        },
        unbind: function(a, b) {
            return this.off(a, null, b)
        },
        live: function(a, b, c) {
            f(this.context).on(a, this.selector, b, c);
            return this
        },
        die: function(a, b) {
            f(this.context).off(a, this.selector || "**", b);
            return this
        },
        delegate: function(a, b, c, d) {
            return this.on(b, a, c, d)
        },
        undelegate: function(a, b, c) {
            return arguments.length == 1 ? this.off(a, "**") : this.off(b, a, c)
        },
        trigger: function(a, b) {
            return this.each(function() {
                f.event.trigger(a, b, this)
            })
        },
        triggerHandler: function(a, b) {
            if (this[0])
                return f.event.trigger(a, b, this[0], !0)
        },
        toggle: function(a) {
            var b = arguments
              , c = a.guid || f.guid++
              , d = 0
              , e = function(c) {
                var e = (f._data(this, "lastToggle" + a.guid) || 0) % d;
                f._data(this, "lastToggle" + a.guid, e + 1),
                c.preventDefault();
                return b[e].apply(this, arguments) || !1
            };
            e.guid = c;
            while (d < b.length)
                b[d++].guid = c;
            return this.click(e)
        },
        hover: function(a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        }
    }),
    f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
        f.fn[b] = function(a, c) {
            c == null && (c = a,
            a = null);
            return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
        }
        ,
        f.attrFn && (f.attrFn[b] = !0),
        C.test(b) && (f.event.fixHooks[b] = f.event.keyHooks),
        D.test(b) && (f.event.fixHooks[b] = f.event.mouseHooks)
    }),
    function() {
        function x(a, b, c, e, f, g) {
            for (var h = 0, i = e.length; h < i; h++) {
                var j = e[h];
                if (j) {
                    var k = !1;
                    j = j[a];
                    while (j) {
                        if (j[d] === c) {
                            k = e[j.sizset];
                            break
                        }
                        if (j.nodeType === 1) {
                            g || (j[d] = c,
                            j.sizset = h);
                            if (typeof b != "string") {
                                if (j === b) {
                                    k = !0;
                                    break
                                }
                            } else if (m.filter(b, [j]).length > 0) {
                                k = j;
                                break
                            }
                        }
                        j = j[a]
                    }
                    e[h] = k
                }
            }
        }
        function w(a, b, c, e, f, g) {
            for (var h = 0, i = e.length; h < i; h++) {
                var j = e[h];
                if (j) {
                    var k = !1;
                    j = j[a];
                    while (j) {
                        if (j[d] === c) {
                            k = e[j.sizset];
                            break
                        }
                        j.nodeType === 1 && !g && (j[d] = c,
                        j.sizset = h);
                        if (j.nodeName.toLowerCase() === b) {
                            k = j;
                            break
                        }
                        j = j[a]
                    }
                    e[h] = k
                }
            }
        }
        var a = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g
          , d = "sizcache" + (Math.random() + "").replace(".", "")
          , e = 0
          , g = Object.prototype.toString
          , h = !1
          , i = !0
          , j = /\\/g
          , k = /\r\n/g
          , l = /\W/;
        [0, 0].sort(function() {
            i = !1;
            return 0
        });
        var m = function(b, d, e, f) {
            e = e || [],
            d = d || c;
            var h = d;
            if (d.nodeType !== 1 && d.nodeType !== 9)
                return [];
            if (!b || typeof b != "string")
                return e;
            var i, j, k, l, n, q, r, t, u = !0, v = m.isXML(d), w = [], x = b;
            do {
                a.exec(""),
                i = a.exec(x);
                if (i) {
                    x = i[3],
                    w.push(i[1]);
                    if (i[2]) {
                        l = i[3];
                        break
                    }
                }
            } while (i);
            if (w.length > 1 && p.exec(b))
                if (w.length === 2 && o.relative[w[0]])
                    j = y(w[0] + w[1], d, f);
                else {
                    j = o.relative[w[0]] ? [d] : m(w.shift(), d);
                    while (w.length)
                        b = w.shift(),
                        o.relative[b] && (b += w.shift()),
                        j = y(b, j, f)
                }
            else {
                !f && w.length > 1 && d.nodeType === 9 && !v && o.match.ID.test(w[0]) && !o.match.ID.test(w[w.length - 1]) && (n = m.find(w.shift(), d, v),
                d = n.expr ? m.filter(n.expr, n.set)[0] : n.set[0]);
                if (d) {
                    n = f ? {
                        expr: w.pop(),
                        set: s(f)
                    } : m.find(w.pop(), w.length === 1 && (w[0] === "~" || w[0] === "+") && d.parentNode ? d.parentNode : d, v),
                    j = n.expr ? m.filter(n.expr, n.set) : n.set,
                    w.length > 0 ? k = s(j) : u = !1;
                    while (w.length)
                        q = w.pop(),
                        r = q,
                        o.relative[q] ? r = w.pop() : q = "",
                        r == null && (r = d),
                        o.relative[q](k, r, v)
                } else
                    k = w = []
            }
            k || (k = j),
            k || m.error(q || b);
            if (g.call(k) === "[object Array]")
                if (!u)
                    e.push.apply(e, k);
                else if (d && d.nodeType === 1)
                    for (t = 0; k[t] != null; t++)
                        k[t] && (k[t] === !0 || k[t].nodeType === 1 && m.contains(d, k[t])) && e.push(j[t]);
                else
                    for (t = 0; k[t] != null; t++)
                        k[t] && k[t].nodeType === 1 && e.push(j[t]);
            else
                s(k, e);
            l && (m(l, h, e, f),
            m.uniqueSort(e));
            return e
        };
        m.uniqueSort = function(a) {
            if (u) {
                h = i,
                a.sort(u);
                if (h)
                    for (var b = 1; b < a.length; b++)
                        a[b] === a[b - 1] && a.splice(b--, 1)
            }
            return a
        }
        ,
        m.matches = function(a, b) {
            return m(a, null, null, b)
        }
        ,
        m.matchesSelector = function(a, b) {
            return m(b, null, null, [a]).length > 0
        }
        ,
        m.find = function(a, b, c) {
            var d, e, f, g, h, i;
            if (!a)
                return [];
            for (e = 0,
            f = o.order.length; e < f; e++) {
                h = o.order[e];
                if (g = o.leftMatch[h].exec(a)) {
                    i = g[1],
                    g.splice(1, 1);
                    if (i.substr(i.length - 1) !== "\\") {
                        g[1] = (g[1] || "").replace(j, ""),
                        d = o.find[h](g, b, c);
                        if (d != null) {
                            a = a.replace(o.match[h], "");
                            break
                        }
                    }
                }
            }
            d || (d = typeof b.getElementsByTagName != "undefined" ? b.getElementsByTagName("*") : []);
            return {
                set: d,
                expr: a
            }
        }
        ,
        m.filter = function(a, c, d, e) {
            var f, g, h, i, j, k, l, n, p, q = a, r = [], s = c, t = c && c[0] && m.isXML(c[0]);
            while (a && c.length) {
                for (h in o.filter)
                    if ((f = o.leftMatch[h].exec(a)) != null && f[2]) {
                        k = o.filter[h],
                        l = f[1],
                        g = !1,
                        f.splice(1, 1);
                        if (l.substr(l.length - 1) === "\\")
                            continue;
                        s === r && (r = []);
                        if (o.preFilter[h]) {
                            f = o.preFilter[h](f, s, d, r, e, t);
                            if (!f)
                                g = i = !0;
                            else if (f === !0)
                                continue
                        }
                        if (f)
                            for (n = 0; (j = s[n]) != null; n++)
                                j && (i = k(j, f, n, s),
                                p = e ^ i,
                                d && i != null ? p ? g = !0 : s[n] = !1 : p && (r.push(j),
                                g = !0));
                        if (i !== b) {
                            d || (s = r),
                            a = a.replace(o.match[h], "");
                            if (!g)
                                return [];
                            break
                        }
                    }
                if (a === q)
                    if (g == null)
                        m.error(a);
                    else
                        break;
                q = a
            }
            return s
        }
        ,
        m.error = function(a) {
            throw new Error("Syntax error, unrecognized expression: " + a)
        }
        ;
        var n = m.getText = function(a) {
            var b, c, d = a.nodeType, e = "";
            if (d) {
                if (d === 1 || d === 9 || d === 11) {
                    if (typeof a.textContent == "string")
                        return a.textContent;
                    if (typeof a.innerText == "string")
                        return a.innerText.replace(k, "");
                    for (a = a.firstChild; a; a = a.nextSibling)
                        e += n(a)
                } else if (d === 3 || d === 4)
                    return a.nodeValue
            } else
                for (b = 0; c = a[b]; b++)
                    c.nodeType !== 8 && (e += n(c));
            return e
        }
          , o = m.selectors = {
            order: ["ID", "NAME", "TAG"],
            match: {
                ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
                ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
                TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
                POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
            },
            leftMatch: {},
            attrMap: {
                "class": "className",
                "for": "htmlFor"
            },
            attrHandle: {
                href: function(a) {
                    return a.getAttribute("href")
                },
                type: function(a) {
                    return a.getAttribute("type")
                }
            },
            relative: {
                "+": function(a, b) {
                    var c = typeof b == "string"
                      , d = c && !l.test(b)
                      , e = c && !d;
                    d && (b = b.toLowerCase());
                    for (var f = 0, g = a.length, h; f < g; f++)
                        if (h = a[f]) {
                            while ((h = h.previousSibling) && h.nodeType !== 1)
                                ;
                            a[f] = e || h && h.nodeName.toLowerCase() === b ? h || !1 : h === b
                        }
                    e && m.filter(b, a, !0)
                },
                ">": function(a, b) {
                    var c, d = typeof b == "string", e = 0, f = a.length;
                    if (d && !l.test(b)) {
                        b = b.toLowerCase();
                        for (; e < f; e++) {
                            c = a[e];
                            if (c) {
                                var g = c.parentNode;
                                a[e] = g.nodeName.toLowerCase() === b ? g : !1
                            }
                        }
                    } else {
                        for (; e < f; e++)
                            c = a[e],
                            c && (a[e] = d ? c.parentNode : c.parentNode === b);
                        d && m.filter(b, a, !0)
                    }
                },
                "": function(a, b, c) {
                    var d, f = e++, g = x;
                    typeof b == "string" && !l.test(b) && (b = b.toLowerCase(),
                    d = b,
                    g = w),
                    g("parentNode", b, f, a, d, c)
                },
                "~": function(a, b, c) {
                    var d, f = e++, g = x;
                    typeof b == "string" && !l.test(b) && (b = b.toLowerCase(),
                    d = b,
                    g = w),
                    g("previousSibling", b, f, a, d, c)
                }
            },
            find: {
                ID: function(a, b, c) {
                    if (typeof b.getElementById != "undefined" && !c) {
                        var d = b.getElementById(a[1]);
                        return d && d.parentNode ? [d] : []
                    }
                },
                NAME: function(a, b) {
                    if (typeof b.getElementsByName != "undefined") {
                        var c = []
                          , d = b.getElementsByName(a[1]);
                        for (var e = 0, f = d.length; e < f; e++)
                            d[e].getAttribute("name") === a[1] && c.push(d[e]);
                        return c.length === 0 ? null : c
                    }
                },
                TAG: function(a, b) {
                    if (typeof b.getElementsByTagName != "undefined")
                        return b.getElementsByTagName(a[1])
                }
            },
            preFilter: {
                CLASS: function(a, b, c, d, e, f) {
                    a = " " + a[1].replace(j, "") + " ";
                    if (f)
                        return a;
                    for (var g = 0, h; (h = b[g]) != null; g++)
                        h && (e ^ (h.className && (" " + h.className + " ").replace(/[\t\n\r]/g, " ").indexOf(a) >= 0) ? c || d.push(h) : c && (b[g] = !1));
                    return !1
                },
                ID: function(a) {
                    return a[1].replace(j, "")
                },
                TAG: function(a, b) {
                    return a[1].replace(j, "").toLowerCase()
                },
                CHILD: function(a) {
                    if (a[1] === "nth") {
                        a[2] || m.error(a[0]),
                        a[2] = a[2].replace(/^\+|\s*/g, "");
                        var b = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2] === "even" && "2n" || a[2] === "odd" && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);
                        a[2] = b[1] + (b[2] || 1) - 0,
                        a[3] = b[3] - 0
                    } else
                        a[2] && m.error(a[0]);
                    a[0] = e++;
                    return a
                },
                ATTR: function(a, b, c, d, e, f) {
                    var g = a[1] = a[1].replace(j, "");
                    !f && o.attrMap[g] && (a[1] = o.attrMap[g]),
                    a[4] = (a[4] || a[5] || "").replace(j, ""),
                    a[2] === "~=" && (a[4] = " " + a[4] + " ");
                    return a
                },
                PSEUDO: function(b, c, d, e, f) {
                    if (b[1] === "not")
                        if ((a.exec(b[3]) || "").length > 1 || /^\w/.test(b[3]))
                            b[3] = m(b[3], null, null, c);
                        else {
                            var g = m.filter(b[3], c, d, !0 ^ f);
                            d || e.push.apply(e, g);
                            return !1
                        }
                    else if (o.match.POS.test(b[0]) || o.match.CHILD.test(b[0]))
                        return !0;
                    return b
                },
                POS: function(a) {
                    a.unshift(!0);
                    return a
                }
            },
            filters: {
                enabled: function(a) {
                    return a.disabled === !1 && a.type !== "hidden"
                },
                disabled: function(a) {
                    return a.disabled === !0
                },
                checked: function(a) {
                    return a.checked === !0
                },
                selected: function(a) {
                    a.parentNode && a.parentNode.selectedIndex;
                    return a.selected === !0
                },
                parent: function(a) {
                    return !!a.firstChild
                },
                empty: function(a) {
                    return !a.firstChild
                },
                has: function(a, b, c) {
                    return !!m(c[3], a).length
                },
                header: function(a) {
                    return /h\d/i.test(a.nodeName)
                },
                text: function(a) {
                    var b = a.getAttribute("type")
                      , c = a.type;
                    return a.nodeName.toLowerCase() === "input" && "text" === c && (b === c || b === null)
                },
                radio: function(a) {
                    return a.nodeName.toLowerCase() === "input" && "radio" === a.type
                },
                checkbox: function(a) {
                    return a.nodeName.toLowerCase() === "input" && "checkbox" === a.type
                },
                file: function(a) {
                    return a.nodeName.toLowerCase() === "input" && "file" === a.type
                },
                password: function(a) {
                    return a.nodeName.toLowerCase() === "input" && "password" === a.type
                },
                submit: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return (b === "input" || b === "button") && "submit" === a.type
                },
                image: function(a) {
                    return a.nodeName.toLowerCase() === "input" && "image" === a.type
                },
                reset: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return (b === "input" || b === "button") && "reset" === a.type
                },
                button: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return b === "input" && "button" === a.type || b === "button"
                },
                input: function(a) {
                    return /input|select|textarea|button/i.test(a.nodeName)
                },
                focus: function(a) {
                    return a === a.ownerDocument.activeElement
                }
            },
            setFilters: {
                first: function(a, b) {
                    return b === 0
                },
                last: function(a, b, c, d) {
                    return b === d.length - 1
                },
                even: function(a, b) {
                    return b % 2 === 0
                },
                odd: function(a, b) {
                    return b % 2 === 1
                },
                lt: function(a, b, c) {
                    return b < c[3] - 0
                },
                gt: function(a, b, c) {
                    return b > c[3] - 0
                },
                nth: function(a, b, c) {
                    return c[3] - 0 === b
                },
                eq: function(a, b, c) {
                    return c[3] - 0 === b
                }
            },
            filter: {
                PSEUDO: function(a, b, c, d) {
                    var e = b[1]
                      , f = o.filters[e];
                    if (f)
                        return f(a, c, b, d);
                    if (e === "contains")
                        return (a.textContent || a.innerText || n([a]) || "").indexOf(b[3]) >= 0;
                    if (e === "not") {
                        var g = b[3];
                        for (var h = 0, i = g.length; h < i; h++)
                            if (g[h] === a)
                                return !1;
                        return !0
                    }
                    m.error(e)
                },
                CHILD: function(a, b) {
                    var c, e, f, g, h, i, j, k = b[1], l = a;
                    switch (k) {
                    case "only":
                    case "first":
                        while (l = l.previousSibling)
                            if (l.nodeType === 1)
                                return !1;
                        if (k === "first")
                            return !0;
                        l = a;
                    case "last":
                        while (l = l.nextSibling)
                            if (l.nodeType === 1)
                                return !1;
                        return !0;
                    case "nth":
                        c = b[2],
                        e = b[3];
                        if (c === 1 && e === 0)
                            return !0;
                        f = b[0],
                        g = a.parentNode;
                        if (g && (g[d] !== f || !a.nodeIndex)) {
                            i = 0;
                            for (l = g.firstChild; l; l = l.nextSibling)
                                l.nodeType === 1 && (l.nodeIndex = ++i);
                            g[d] = f
                        }
                        j = a.nodeIndex - e;
                        return c === 0 ? j === 0 : j % c === 0 && j / c >= 0
                    }
                },
                ID: function(a, b) {
                    return a.nodeType === 1 && a.getAttribute("id") === b
                },
                TAG: function(a, b) {
                    return b === "*" && a.nodeType === 1 || !!a.nodeName && a.nodeName.toLowerCase() === b
                },
                CLASS: function(a, b) {
                    return (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > -1
                },
                ATTR: function(a, b) {
                    var c = b[1]
                      , d = m.attr ? m.attr(a, c) : o.attrHandle[c] ? o.attrHandle[c](a) : a[c] != null ? a[c] : a.getAttribute(c)
                      , e = d + ""
                      , f = b[2]
                      , g = b[4];
                    return d == null ? f === "!=" : !f && m.attr ? d != null : f === "=" ? e === g : f === "*=" ? e.indexOf(g) >= 0 : f === "~=" ? (" " + e + " ").indexOf(g) >= 0 : g ? f === "!=" ? e !== g : f === "^=" ? e.indexOf(g) === 0 : f === "$=" ? e.substr(e.length - g.length) === g : f === "|=" ? e === g || e.substr(0, g.length + 1) === g + "-" : !1 : e && d !== !1
                },
                POS: function(a, b, c, d) {
                    var e = b[2]
                      , f = o.setFilters[e];
                    if (f)
                        return f(a, c, b, d)
                }
            }
        }
          , p = o.match.POS
          , q = function(a, b) {
            return "\\" + (b - 0 + 1)
        };
        for (var r in o.match)
            o.match[r] = new RegExp(o.match[r].source + /(?![^\[]*\])(?![^\(]*\))/.source),
            o.leftMatch[r] = new RegExp(/(^(?:.|\r|\n)*?)/.source + o.match[r].source.replace(/\\(\d+)/g, q));
        o.match.globalPOS = p;
        var s = function(a, b) {
            a = Array.prototype.slice.call(a, 0);
            if (b) {
                b.push.apply(b, a);
                return b
            }
            return a
        };
        try {
            Array.prototype.slice.call(c.documentElement.childNodes, 0)[0].nodeType
        } catch (t) {
            s = function(a, b) {
                var c = 0
                  , d = b || [];
                if (g.call(a) === "[object Array]")
                    Array.prototype.push.apply(d, a);
                else if (typeof a.length == "number")
                    for (var e = a.length; c < e; c++)
                        d.push(a[c]);
                else
                    for (; a[c]; c++)
                        d.push(a[c]);
                return d
            }
        }
        var u, v;
        c.documentElement.compareDocumentPosition ? u = function(a, b) {
            if (a === b) {
                h = !0;
                return 0
            }
            if (!a.compareDocumentPosition || !b.compareDocumentPosition)
                return a.compareDocumentPosition ? -1 : 1;
            return a.compareDocumentPosition(b) & 4 ? -1 : 1
        }
        : (u = function(a, b) {
            if (a === b) {
                h = !0;
                return 0
            }
            if (a.sourceIndex && b.sourceIndex)
                return a.sourceIndex - b.sourceIndex;
            var c, d, e = [], f = [], g = a.parentNode, i = b.parentNode, j = g;
            if (g === i)
                return v(a, b);
            if (!g)
                return -1;
            if (!i)
                return 1;
            while (j)
                e.unshift(j),
                j = j.parentNode;
            j = i;
            while (j)
                f.unshift(j),
                j = j.parentNode;
            c = e.length,
            d = f.length;
            for (var k = 0; k < c && k < d; k++)
                if (e[k] !== f[k])
                    return v(e[k], f[k]);
            return k === c ? v(a, f[k], -1) : v(e[k], b, 1)
        }
        ,
        v = function(a, b, c) {
            if (a === b)
                return c;
            var d = a.nextSibling;
            while (d) {
                if (d === b)
                    return -1;
                d = d.nextSibling
            }
            return 1
        }
        ),
        function() {
            var a = c.createElement("div")
              , d = "script" + (new Date).getTime()
              , e = c.documentElement;
            a.innerHTML = "<a name='" + d + "'/>",
            e.insertBefore(a, e.firstChild),
            c.getElementById(d) && (o.find.ID = function(a, c, d) {
                if (typeof c.getElementById != "undefined" && !d) {
                    var e = c.getElementById(a[1]);
                    return e ? e.id === a[1] || typeof e.getAttributeNode != "undefined" && e.getAttributeNode("id").nodeValue === a[1] ? [e] : b : []
                }
            }
            ,
            o.filter.ID = function(a, b) {
                var c = typeof a.getAttributeNode != "undefined" && a.getAttributeNode("id");
                return a.nodeType === 1 && c && c.nodeValue === b
            }
            ),
            e.removeChild(a),
            e = a = null
        }(),
        function() {
            var a = c.createElement("div");
            a.appendChild(c.createComment("")),
            a.getElementsByTagName("*").length > 0 && (o.find.TAG = function(a, b) {
                var c = b.getElementsByTagName(a[1]);
                if (a[1] === "*") {
                    var d = [];
                    for (var e = 0; c[e]; e++)
                        c[e].nodeType === 1 && d.push(c[e]);
                    c = d
                }
                return c
            }
            ),
            a.innerHTML = "<a href='#'></a>",
            a.firstChild && typeof a.firstChild.getAttribute != "undefined" && a.firstChild.getAttribute("href") !== "#" && (o.attrHandle.href = function(a) {
                return a.getAttribute("href", 2)
            }
            ),
            a = null
        }(),
        c.querySelectorAll && function() {
            var a = m
              , b = c.createElement("div")
              , d = "__sizzle__";
            b.innerHTML = "<p class='TEST'></p>";
            if (!b.querySelectorAll || b.querySelectorAll(".TEST").length !== 0) {
                m = function(b, e, f, g) {
                    e = e || c;
                    if (!g && !m.isXML(e)) {
                        var h = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);
                        if (h && (e.nodeType === 1 || e.nodeType === 9)) {
                            if (h[1])
                                return s(e.getElementsByTagName(b), f);
                            if (h[2] && o.find.CLASS && e.getElementsByClassName)
                                return s(e.getElementsByClassName(h[2]), f)
                        }
                        if (e.nodeType === 9) {
                            if (b === "body" && e.body)
                                return s([e.body], f);
                            if (h && h[3]) {
                                var i = e.getElementById(h[3]);
                                if (!i || !i.parentNode)
                                    return s([], f);
                                if (i.id === h[3])
                                    return s([i], f)
                            }
                            try {
                                return s(e.querySelectorAll(b), f)
                            } catch (j) {}
                        } else if (e.nodeType === 1 && e.nodeName.toLowerCase() !== "object") {
                            var k = e
                              , l = e.getAttribute("id")
                              , n = l || d
                              , p = e.parentNode
                              , q = /^\s*[+~]/.test(b);
                            l ? n = n.replace(/'/g, "\\$&") : e.setAttribute("id", n),
                            q && p && (e = e.parentNode);
                            try {
                                if (!q || p)
                                    return s(e.querySelectorAll("[id='" + n + "'] " + b), f)
                            } catch (r) {} finally {
                                l || k.removeAttribute("id")
                            }
                        }
                    }
                    return a(b, e, f, g)
                }
                ;
                for (var e in a)
                    m[e] = a[e];
                b = null
            }
        }(),
        function() {
            var a = c.documentElement
              , b = a.matchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a.msMatchesSelector;
            if (b) {
                var d = !b.call(c.createElement("div"), "div")
                  , e = !1;
                try {
                    b.call(c.documentElement, "[test!='']:sizzle")
                } catch (f) {
                    e = !0
                }
                m.matchesSelector = function(a, c) {
                    c = c.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                    if (!m.isXML(a))
                        try {
                            if (e || !o.match.PSEUDO.test(c) && !/!=/.test(c)) {
                                var f = b.call(a, c);
                                if (f || !d || a.document && a.document.nodeType !== 11)
                                    return f
                            }
                        } catch (g) {}
                    return m(c, null, null, [a]).length > 0
                }
            }
        }(),
        function() {
            var a = c.createElement("div");
            a.innerHTML = "<div class='test e'></div><div class='test'></div>";
            if (!!a.getElementsByClassName && a.getElementsByClassName("e").length !== 0) {
                a.lastChild.className = "e";
                if (a.getElementsByClassName("e").length === 1)
                    return;
                o.order.splice(1, 0, "CLASS"),
                o.find.CLASS = function(a, b, c) {
                    if (typeof b.getElementsByClassName != "undefined" && !c)
                        return b.getElementsByClassName(a[1])
                }
                ,
                a = null
            }
        }(),
        c.documentElement.contains ? m.contains = function(a, b) {
            return a !== b && (a.contains ? a.contains(b) : !0)
        }
        : c.documentElement.compareDocumentPosition ? m.contains = function(a, b) {
            return !!(a.compareDocumentPosition(b) & 16)
        }
        : m.contains = function() {
            return !1
        }
        ,
        m.isXML = function(a) {
            var b = (a ? a.ownerDocument || a : 0).documentElement;
            return b ? b.nodeName !== "HTML" : !1
        }
        ;
        var y = function(a, b, c) {
            var d, e = [], f = "", g = b.nodeType ? [b] : b;
            while (d = o.match.PSEUDO.exec(a))
                f += d[0],
                a = a.replace(o.match.PSEUDO, "");
            a = o.relative[a] ? a + "*" : a;
            for (var h = 0, i = g.length; h < i; h++)
                m(a, g[h], e, c);
            return m.filter(f, e)
        };
        m.attr = f.attr,
        m.selectors.attrMap = {},
        f.find = m,
        f.expr = m.selectors,
        f.expr[":"] = f.expr.filters,
        f.unique = m.uniqueSort,
        f.text = m.getText,
        f.isXMLDoc = m.isXML,
        f.contains = m.contains
    }();
    var L = /Until$/
      , M = /^(?:parents|prevUntil|prevAll)/
      , N = /,/
      , O = /^.[^:#\[\.,]*$/
      , P = Array.prototype.slice
      , Q = f.expr.match.globalPOS
      , R = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    f.fn.extend({
        find: function(a) {
            var b = this, c, d;
            if (typeof a != "string")
                return f(a).filter(function() {
                    for (c = 0,
                    d = b.length; c < d; c++)
                        if (f.contains(b[c], this))
                            return !0
                });
            var e = this.pushStack("", "find", a), g, h, i;
            for (c = 0,
            d = this.length; c < d; c++) {
                g = e.length,
                f.find(a, this[c], e);
                if (c > 0)
                    for (h = g; h < e.length; h++)
                        for (i = 0; i < g; i++)
                            if (e[i] === e[h]) {
                                e.splice(h--, 1);
                                break
                            }
            }
            return e
        },
        has: function(a) {
            var b = f(a);
            return this.filter(function() {
                for (var a = 0, c = b.length; a < c; a++)
                    if (f.contains(this, b[a]))
                        return !0
            })
        },
        not: function(a) {
            return this.pushStack(T(this, a, !1), "not", a)
        },
        filter: function(a) {
            return this.pushStack(T(this, a, !0), "filter", a)
        },
        is: function(a) {
            return !!a && (typeof a == "string" ? Q.test(a) ? f(a, this.context).index(this[0]) >= 0 : f.filter(a, this).length > 0 : this.filter(a).length > 0)
        },
        closest: function(a, b) {
            var c = [], d, e, g = this[0];
            if (f.isArray(a)) {
                var h = 1;
                while (g && g.ownerDocument && g !== b) {
                    for (d = 0; d < a.length; d++)
                        f(g).is(a[d]) && c.push({
                            selector: a[d],
                            elem: g,
                            level: h
                        });
                    g = g.parentNode,
                    h++
                }
                return c
            }
            var i = Q.test(a) || typeof a != "string" ? f(a, b || this.context) : 0;
            for (d = 0,
            e = this.length; d < e; d++) {
                g = this[d];
                while (g) {
                    if (i ? i.index(g) > -1 : f.find.matchesSelector(g, a)) {
                        c.push(g);
                        break
                    }
                    g = g.parentNode;
                    if (!g || !g.ownerDocument || g === b || g.nodeType === 11)
                        break
                }
            }
            c = c.length > 1 ? f.unique(c) : c;
            return this.pushStack(c, "closest", a)
        },
        index: function(a) {
            if (!a)
                return this[0] && this[0].parentNode ? this.prevAll().length : -1;
            if (typeof a == "string")
                return f.inArray(this[0], f(a));
            return f.inArray(a.jquery ? a[0] : a, this)
        },
        add: function(a, b) {
            var c = typeof a == "string" ? f(a, b) : f.makeArray(a && a.nodeType ? [a] : a)
              , d = f.merge(this.get(), c);
            return this.pushStack(S(c[0]) || S(d[0]) ? d : f.unique(d))
        },
        andSelf: function() {
            return this.add(this.prevObject)
        }
    }),
    f.each({
        parent: function(a) {
            var b = a.parentNode;
            return b && b.nodeType !== 11 ? b : null
        },
        parents: function(a) {
            return f.dir(a, "parentNode")
        },
        parentsUntil: function(a, b, c) {
            return f.dir(a, "parentNode", c)
        },
        next: function(a) {
            return f.nth(a, 2, "nextSibling")
        },
        prev: function(a) {
            return f.nth(a, 2, "previousSibling")
        },
        nextAll: function(a) {
            return f.dir(a, "nextSibling")
        },
        prevAll: function(a) {
            return f.dir(a, "previousSibling")
        },
        nextUntil: function(a, b, c) {
            return f.dir(a, "nextSibling", c)
        },
        prevUntil: function(a, b, c) {
            return f.dir(a, "previousSibling", c)
        },
        siblings: function(a) {
            return f.sibling((a.parentNode || {}).firstChild, a)
        },
        children: function(a) {
            return f.sibling(a.firstChild)
        },
        contents: function(a) {
            return f.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : f.makeArray(a.childNodes)
        }
    }, function(a, b) {
        f.fn[a] = function(c, d) {
            var e = f.map(this, b, c);
            L.test(a) || (d = c),
            d && typeof d == "string" && (e = f.filter(d, e)),
            e = this.length > 1 && !R[a] ? f.unique(e) : e,
            (this.length > 1 || N.test(d)) && M.test(a) && (e = e.reverse());
            return this.pushStack(e, a, P.call(arguments).join(","))
        }
    }),
    f.extend({
        filter: function(a, b, c) {
            c && (a = ":not(" + a + ")");
            return b.length === 1 ? f.find.matchesSelector(b[0], a) ? [b[0]] : [] : f.find.matches(a, b)
        },
        dir: function(a, c, d) {
            var e = []
              , g = a[c];
            while (g && g.nodeType !== 9 && (d === b || g.nodeType !== 1 || !f(g).is(d)))
                g.nodeType === 1 && e.push(g),
                g = g[c];
            return e
        },
        nth: function(a, b, c, d) {
            b = b || 1;
            var e = 0;
            for (; a; a = a[c])
                if (a.nodeType === 1 && ++e === b)
                    break;
            return a
        },
        sibling: function(a, b) {
            var c = [];
            for (; a; a = a.nextSibling)
                a.nodeType === 1 && a !== b && c.push(a);
            return c
        }
    });
    var V = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video"
      , W = / jQuery\d+="(?:\d+|null)"/g
      , X = /^\s+/
      , Y = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig
      , Z = /<([\w:]+)/
      , $ = /<tbody/i
      , _ = /<|&#?\w+;/
      , ba = /<(?:script|style)/i
      , bb = /<(?:script|object|embed|option|style)/i
      , bc = new RegExp("<(?:" + V + ")[\\s/>]","i")
      , bd = /checked\s*(?:[^=]|=\s*.checked.)/i
      , be = /\/(java|ecma)script/i
      , bf = /^\s*<!(?:\[CDATA\[|\-\-)/
      , bg = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        area: [1, "<map>", "</map>"],
        _default: [0, "", ""]
    }
      , bh = U(c);
    bg.optgroup = bg.option,
    bg.tbody = bg.tfoot = bg.colgroup = bg.caption = bg.thead,
    bg.th = bg.td,
    f.support.htmlSerialize || (bg._default = [1, "div<div>", "</div>"]),
    f.fn.extend({
        text: function(a) {
            return f.access(this, function(a) {
                return a === b ? f.text(this) : this.empty().append((this[0] && this[0].ownerDocument || c).createTextNode(a))
            }, null, a, arguments.length)
        },
        wrapAll: function(a) {
            if (f.isFunction(a))
                return this.each(function(b) {
                    f(this).wrapAll(a.call(this, b))
                });
            if (this[0]) {
                var b = f(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]),
                b.map(function() {
                    var a = this;
                    while (a.firstChild && a.firstChild.nodeType === 1)
                        a = a.firstChild;
                    return a
                }).append(this)
            }
            return this
        },
        wrapInner: function(a) {
            if (f.isFunction(a))
                return this.each(function(b) {
                    f(this).wrapInner(a.call(this, b))
                });
            return this.each(function() {
                var b = f(this)
                  , c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a)
            })
        },
        wrap: function(a) {
            var b = f.isFunction(a);
            return this.each(function(c) {
                f(this).wrapAll(b ? a.call(this, c) : a)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                f.nodeName(this, "body") || f(this).replaceWith(this.childNodes)
            }).end()
        },
        append: function() {
            return this.domManip(arguments, !0, function(a) {
                this.nodeType === 1 && this.appendChild(a)
            })
        },
        prepend: function() {
            return this.domManip(arguments, !0, function(a) {
                this.nodeType === 1 && this.insertBefore(a, this.firstChild)
            })
        },
        before: function() {
            if (this[0] && this[0].parentNode)
                return this.domManip(arguments, !1, function(a) {
                    this.parentNode.insertBefore(a, this)
                });
            if (arguments.length) {
                var a = f.clean(arguments);
                a.push.apply(a, this.toArray());
                return this.pushStack(a, "before", arguments)
            }
        },
        after: function() {
            if (this[0] && this[0].parentNode)
                return this.domManip(arguments, !1, function(a) {
                    this.parentNode.insertBefore(a, this.nextSibling)
                });
            if (arguments.length) {
                var a = this.pushStack(this, "after", arguments);
                a.push.apply(a, f.clean(arguments));
                return a
            }
        },
        remove: function(a, b) {
            for (var c = 0, d; (d = this[c]) != null; c++)
                if (!a || f.filter(a, [d]).length)
                    !b && d.nodeType === 1 && (f.cleanData(d.getElementsByTagName("*")),
                    f.cleanData([d])),
                    d.parentNode && d.parentNode.removeChild(d);
            return this
        },
        empty: function() {
            for (var a = 0, b; (b = this[a]) != null; a++) {
                b.nodeType === 1 && f.cleanData(b.getElementsByTagName("*"));
                while (b.firstChild)
                    b.removeChild(b.firstChild)
            }
            return this
        },
        clone: function(a, b) {
            a = a == null ? !1 : a,
            b = b == null ? a : b;
            return this.map(function() {
                return f.clone(this, a, b)
            })
        },
        html: function(a) {
            return f.access(this, function(a) {
                var c = this[0] || {}
                  , d = 0
                  , e = this.length;
                if (a === b)
                    return c.nodeType === 1 ? c.innerHTML.replace(W, "") : null;
                if (typeof a == "string" && !ba.test(a) && (f.support.leadingWhitespace || !X.test(a)) && !bg[(Z.exec(a) || ["", ""])[1].toLowerCase()]) {
                    a = a.replace(Y, "<$1></$2>");
                    try {
                        for (; d < e; d++)
                            c = this[d] || {},
                            c.nodeType === 1 && (f.cleanData(c.getElementsByTagName("*")),
                            c.innerHTML = a);
                        c = 0
                    } catch (g) {}
                }
                c && this.empty().append(a)
            }, null, a, arguments.length)
        },
        replaceWith: function(a) {
            if (this[0] && this[0].parentNode) {
                if (f.isFunction(a))
                    return this.each(function(b) {
                        var c = f(this)
                          , d = c.html();
                        c.replaceWith(a.call(this, b, d))
                    });
                typeof a != "string" && (a = f(a).detach());
                return this.each(function() {
                    var b = this.nextSibling
                      , c = this.parentNode;
                    f(this).remove(),
                    b ? f(b).before(a) : f(c).append(a)
                })
            }
            return this.length ? this.pushStack(f(f.isFunction(a) ? a() : a), "replaceWith", a) : this
        },
        detach: function(a) {
            return this.remove(a, !0)
        },
        domManip: function(a, c, d) {
            var e, g, h, i, j = a[0], k = [];
            if (!f.support.checkClone && arguments.length === 3 && typeof j == "string" && bd.test(j))
                return this.each(function() {
                    f(this).domManip(a, c, d, !0)
                });
            if (f.isFunction(j))
                return this.each(function(e) {
                    var g = f(this);
                    a[0] = j.call(this, e, c ? g.html() : b),
                    g.domManip(a, c, d)
                });
            if (this[0]) {
                i = j && j.parentNode,
                f.support.parentNode && i && i.nodeType === 11 && i.childNodes.length === this.length ? e = {
                    fragment: i
                } : e = f.buildFragment(a, this, k),
                h = e.fragment,
                h.childNodes.length === 1 ? g = h = h.firstChild : g = h.firstChild;
                if (g) {
                    c = c && f.nodeName(g, "tr");
                    for (var l = 0, m = this.length, n = m - 1; l < m; l++)
                        d.call(c ? bi(this[l], g) : this[l], e.cacheable || m > 1 && l < n ? f.clone(h, !0, !0) : h)
                }
                k.length && f.each(k, function(a, b) {
                    b.src ? f.ajax({
                        type: "GET",
                        global: !1,
                        url: b.src,
                        async: !1,
                        dataType: "script"
                    }) : f.globalEval((b.text || b.textContent || b.innerHTML || "").replace(bf, "/*$0*/")),
                    b.parentNode && b.parentNode.removeChild(b)
                })
            }
            return this
        }
    }),
    f.buildFragment = function(a, b, d) {
        var e, g, h, i, j = a[0];
        b && b[0] && (i = b[0].ownerDocument || b[0]),
        i.createDocumentFragment || (i = c),
        a.length === 1 && typeof j == "string" && j.length < 512 && i === c && j.charAt(0) === "<" && !bb.test(j) && (f.support.checkClone || !bd.test(j)) && (f.support.html5Clone || !bc.test(j)) && (g = !0,
        h = f.fragments[j],
        h && h !== 1 && (e = h)),
        e || (e = i.createDocumentFragment(),
        f.clean(a, i, e, d)),
        g && (f.fragments[j] = h ? e : 1);
        return {
            fragment: e,
            cacheable: g
        }
    }
    ,
    f.fragments = {},
    f.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(a, b) {
        f.fn[a] = function(c) {
            var d = []
              , e = f(c)
              , g = this.length === 1 && this[0].parentNode;
            if (g && g.nodeType === 11 && g.childNodes.length === 1 && e.length === 1) {
                e[b](this[0]);
                return this
            }
            for (var h = 0, i = e.length; h < i; h++) {
                var j = (h > 0 ? this.clone(!0) : this).get();
                f(e[h])[b](j),
                d = d.concat(j)
            }
            return this.pushStack(d, a, e.selector)
        }
    }),
    f.extend({
        clone: function(a, b, c) {
            var d, e, g, h = f.support.html5Clone || f.isXMLDoc(a) || !bc.test("<" + a.nodeName + ">") ? a.cloneNode(!0) : bo(a);
            if ((!f.support.noCloneEvent || !f.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !f.isXMLDoc(a)) {
                bk(a, h),
                d = bl(a),
                e = bl(h);
                for (g = 0; d[g]; ++g)
                    e[g] && bk(d[g], e[g])
            }
            if (b) {
                bj(a, h);
                if (c) {
                    d = bl(a),
                    e = bl(h);
                    for (g = 0; d[g]; ++g)
                        bj(d[g], e[g])
                }
            }
            d = e = null;
            return h
        },
        clean: function(a, b, d, e) {
            var g, h, i, j = [];
            b = b || c,
            typeof b.createElement == "undefined" && (b = b.ownerDocument || b[0] && b[0].ownerDocument || c);
            for (var k = 0, l; (l = a[k]) != null; k++) {
                typeof l == "number" && (l += "");
                if (!l)
                    continue;
                if (typeof l == "string")
                    if (!_.test(l))
                        l = b.createTextNode(l);
                    else {
                        l = l.replace(Y, "<$1></$2>");
                        var m = (Z.exec(l) || ["", ""])[1].toLowerCase(), n = bg[m] || bg._default, o = n[0], p = b.createElement("div"), q = bh.childNodes, r;
                        b === c ? bh.appendChild(p) : U(b).appendChild(p),
                        p.innerHTML = n[1] + l + n[2];
                        while (o--)
                            p = p.lastChild;
                        if (!f.support.tbody) {
                            var s = $.test(l)
                              , t = m === "table" && !s ? p.firstChild && p.firstChild.childNodes : n[1] === "<table>" && !s ? p.childNodes : [];
                            for (i = t.length - 1; i >= 0; --i)
                                f.nodeName(t[i], "tbody") && !t[i].childNodes.length && t[i].parentNode.removeChild(t[i])
                        }
                        !f.support.leadingWhitespace && X.test(l) && p.insertBefore(b.createTextNode(X.exec(l)[0]), p.firstChild),
                        l = p.childNodes,
                        p && (p.parentNode.removeChild(p),
                        q.length > 0 && (r = q[q.length - 1],
                        r && r.parentNode && r.parentNode.removeChild(r)))
                    }
                var u;
                if (!f.support.appendChecked)
                    if (l[0] && typeof (u = l.length) == "number")
                        for (i = 0; i < u; i++)
                            bn(l[i]);
                    else
                        bn(l);
                l.nodeType ? j.push(l) : j = f.merge(j, l)
            }
            if (d) {
                g = function(a) {
                    return !a.type || be.test(a.type)
                }
                ;
                for (k = 0; j[k]; k++) {
                    h = j[k];
                    if (e && f.nodeName(h, "script") && (!h.type || be.test(h.type)))
                        e.push(h.parentNode ? h.parentNode.removeChild(h) : h);
                    else {
                        if (h.nodeType === 1) {
                            var v = f.grep(h.getElementsByTagName("script"), g);
                            j.splice.apply(j, [k + 1, 0].concat(v))
                        }
                        d.appendChild(h)
                    }
                }
            }
            return j
        },
        cleanData: function(a) {
            var b, c, d = f.cache, e = f.event.special, g = f.support.deleteExpando;
            for (var h = 0, i; (i = a[h]) != null; h++) {
                if (i.nodeName && f.noData[i.nodeName.toLowerCase()])
                    continue;
                c = i[f.expando];
                if (c) {
                    b = d[c];
                    if (b && b.events) {
                        for (var j in b.events)
                            e[j] ? f.event.remove(i, j) : f.removeEvent(i, j, b.handle);
                        b.handle && (b.handle.elem = null)
                    }
                    g ? delete i[f.expando] : i.removeAttribute && i.removeAttribute(f.expando),
                    delete d[c]
                }
            }
        }
    });
    var bp = /alpha\([^)]*\)/i, bq = /opacity=([^)]*)/, br = /([A-Z]|^ms)/g, bs = /^[\-+]?(?:\d*\.)?\d+$/i, bt = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i, bu = /^([\-+])=([\-+.\de]+)/, bv = /^margin/, bw = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, bx = ["Top", "Right", "Bottom", "Left"], by, bz, bA;
    f.fn.css = function(a, c) {
        return f.access(this, function(a, c, d) {
            return d !== b ? f.style(a, c, d) : f.css(a, c)
        }, a, c, arguments.length > 1)
    }
    ,
    f.extend({
        cssHooks: {
            opacity: {
                get: function(a, b) {
                    if (b) {
                        var c = by(a, "opacity");
                        return c === "" ? "1" : c
                    }
                    return a.style.opacity
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": f.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(a, c, d, e) {
            if (!!a && a.nodeType !== 3 && a.nodeType !== 8 && !!a.style) {
                var g, h, i = f.camelCase(c), j = a.style, k = f.cssHooks[i];
                c = f.cssProps[i] || i;
                if (d === b) {
                    if (k && "get"in k && (g = k.get(a, !1, e)) !== b)
                        return g;
                    return j[c]
                }
                h = typeof d,
                h === "string" && (g = bu.exec(d)) && (d = +(g[1] + 1) * +g[2] + parseFloat(f.css(a, c)),
                h = "number");
                if (d == null || h === "number" && isNaN(d))
                    return;
                h === "number" && !f.cssNumber[i] && (d += "px");
                if (!k || !("set"in k) || (d = k.set(a, d)) !== b)
                    try {
                        j[c] = d
                    } catch (l) {}
            }
        },
        css: function(a, c, d) {
            var e, g;
            c = f.camelCase(c),
            g = f.cssHooks[c],
            c = f.cssProps[c] || c,
            c === "cssFloat" && (c = "float");
            if (g && "get"in g && (e = g.get(a, !0, d)) !== b)
                return e;
            if (by)
                return by(a, c)
        },
        swap: function(a, b, c) {
            var d = {}, e, f;
            for (f in b)
                d[f] = a.style[f],
                a.style[f] = b[f];
            e = c.call(a);
            for (f in b)
                a.style[f] = d[f];
            return e
        }
    }),
    f.curCSS = f.css,
    c.defaultView && c.defaultView.getComputedStyle && (bz = function(a, b) {
        var c, d, e, g, h = a.style;
        b = b.replace(br, "-$1").toLowerCase(),
        (d = a.ownerDocument.defaultView) && (e = d.getComputedStyle(a, null)) && (c = e.getPropertyValue(b),
        c === "" && !f.contains(a.ownerDocument.documentElement, a) && (c = f.style(a, b))),
        !f.support.pixelMargin && e && bv.test(b) && bt.test(c) && (g = h.width,
        h.width = c,
        c = e.width,
        h.width = g);
        return c
    }
    ),
    c.documentElement.currentStyle && (bA = function(a, b) {
        var c, d, e, f = a.currentStyle && a.currentStyle[b], g = a.style;
        f == null && g && (e = g[b]) && (f = e),
        bt.test(f) && (c = g.left,
        d = a.runtimeStyle && a.runtimeStyle.left,
        d && (a.runtimeStyle.left = a.currentStyle.left),
        g.left = b === "fontSize" ? "1em" : f,
        f = g.pixelLeft + "px",
        g.left = c,
        d && (a.runtimeStyle.left = d));
        return f === "" ? "auto" : f
    }
    ),
    by = bz || bA,
    f.each(["height", "width"], function(a, b) {
        f.cssHooks[b] = {
            get: function(a, c, d) {
                if (c)
                    return a.offsetWidth !== 0 ? bB(a, b, d) : f.swap(a, bw, function() {
                        return bB(a, b, d)
                    })
            },
            set: function(a, b) {
                return bs.test(b) ? b + "px" : b
            }
        }
    }),
    f.support.opacity || (f.cssHooks.opacity = {
        get: function(a, b) {
            return bq.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : b ? "1" : ""
        },
        set: function(a, b) {
            var c = a.style
              , d = a.currentStyle
              , e = f.isNumeric(b) ? "alpha(opacity=" + b * 100 + ")" : ""
              , g = d && d.filter || c.filter || "";
            c.zoom = 1;
            if (b >= 1 && f.trim(g.replace(bp, "")) === "") {
                c.removeAttribute("filter");
                if (d && !d.filter)
                    return
            }
            c.filter = bp.test(g) ? g.replace(bp, e) : g + " " + e
        }
    }),
    f(function() {
        f.support.reliableMarginRight || (f.cssHooks.marginRight = {
            get: function(a, b) {
                return f.swap(a, {
                    display: "inline-block"
                }, function() {
                    return b ? by(a, "margin-right") : a.style.marginRight
                })
            }
        })
    }),
    f.expr && f.expr.filters && (f.expr.filters.hidden = function(a) {
        var b = a.offsetWidth
          , c = a.offsetHeight;
        return b === 0 && c === 0 || !f.support.reliableHiddenOffsets && (a.style && a.style.display || f.css(a, "display")) === "none"
    }
    ,
    f.expr.filters.visible = function(a) {
        return !f.expr.filters.hidden(a)
    }
    ),
    f.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(a, b) {
        f.cssHooks[a + b] = {
            expand: function(c) {
                var d, e = typeof c == "string" ? c.split(" ") : [c], f = {};
                for (d = 0; d < 4; d++)
                    f[a + bx[d] + b] = e[d] || e[d - 2] || e[0];
                return f
            }
        }
    });
    var bC = /%20/g, bD = /\[\]$/, bE = /\r?\n/g, bF = /#.*$/, bG = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, bH = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i, bI = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/, bJ = /^(?:GET|HEAD)$/, bK = /^\/\//, bL = /\?/, bM = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, bN = /^(?:select|textarea)/i, bO = /\s+/, bP = /([?&])_=[^&]*/, bQ = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/, bR = f.fn.load, bS = {}, bT = {}, bU, bV, bW = ["*/"] + ["*"];
    try {
        bU = e.href
    } catch (bX) {
        bU = c.createElement("a"),
        bU.href = "",
        bU = bU.href
    }
    bV = bQ.exec(bU.toLowerCase()) || [],
    f.fn.extend({
        load: function(a, c, d) {
            if (typeof a != "string" && bR)
                return bR.apply(this, arguments);
            if (!this.length)
                return this;
            var e = a.indexOf(" ");
            if (e >= 0) {
                var g = a.slice(e, a.length);
                a = a.slice(0, e)
            }
            var h = "GET";
            c && (f.isFunction(c) ? (d = c,
            c = b) : typeof c == "object" && (c = f.param(c, f.ajaxSettings.traditional),
            h = "POST"));
            var i = this;
            f.ajax({
                url: a,
                type: h,
                dataType: "html",
                data: c,
                complete: function(a, b, c) {
                    c = a.responseText,
                    a.isResolved() && (a.done(function(a) {
                        c = a
                    }),
                    i.html(g ? f("<div>").append(c.replace(bM, "")).find(g) : c)),
                    d && i.each(d, [c, b, a])
                }
            });
            return this
        },
        serialize: function() {
            return f.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? f.makeArray(this.elements) : this
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || bN.test(this.nodeName) || bH.test(this.type))
            }).map(function(a, b) {
                var c = f(this).val();
                return c == null ? null : f.isArray(c) ? f.map(c, function(a, c) {
                    return {
                        name: b.name,
                        value: a.replace(bE, "\r\n")
                    }
                }) : {
                    name: b.name,
                    value: c.replace(bE, "\r\n")
                }
            }).get()
        }
    }),
    f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(a, b) {
        f.fn[b] = function(a) {
            return this.on(b, a)
        }
    }),
    f.each(["get", "post"], function(a, c) {
        f[c] = function(a, d, e, g) {
            f.isFunction(d) && (g = g || e,
            e = d,
            d = b);
            return f.ajax({
                type: c,
                url: a,
                data: d,
                success: e,
                dataType: g
            })
        }
    }),
    f.extend({
        getScript: function(a, c) {
            return f.get(a, b, c, "script")
        },
        getJSON: function(a, b, c) {
            return f.get(a, b, c, "json")
        },
        ajaxSetup: function(a, b) {
            b ? b$(a, f.ajaxSettings) : (b = a,
            a = f.ajaxSettings),
            b$(a, b);
            return a
        },
        ajaxSettings: {
            url: bU,
            isLocal: bI.test(bV[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": bW
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": a.String,
                "text html": !0,
                "text json": f.parseJSON,
                "text xml": f.parseXML
            },
            flatOptions: {
                context: !0,
                url: !0
            }
        },
        ajaxPrefilter: bY(bS),
        ajaxTransport: bY(bT),
        ajax: function(a, c) {
            function w(a, c, l, m) {
                if (s !== 2) {
                    s = 2,
                    q && clearTimeout(q),
                    p = b,
                    n = m || "",
                    v.readyState = a > 0 ? 4 : 0;
                    var o, r, u, w = c, x = l ? ca(d, v, l) : b, y, z;
                    if (a >= 200 && a < 300 || a === 304) {
                        if (d.ifModified) {
                            if (y = v.getResponseHeader("Last-Modified"))
                                f.lastModified[k] = y;
                            if (z = v.getResponseHeader("Etag"))
                                f.etag[k] = z
                        }
                        if (a === 304)
                            w = "notmodified",
                            o = !0;
                        else
                            try {
                                r = cb(d, x),
                                w = "success",
                                o = !0
                            } catch (A) {
                                w = "parsererror",
                                u = A
                            }
                    } else {
                        u = w;
                        if (!w || a)
                            w = "error",
                            a < 0 && (a = 0)
                    }
                    v.status = a,
                    v.statusText = "" + (c || w),
                    o ? h.resolveWith(e, [r, w, v]) : h.rejectWith(e, [v, w, u]),
                    v.statusCode(j),
                    j = b,
                    t && g.trigger("ajax" + (o ? "Success" : "Error"), [v, d, o ? r : u]),
                    i.fireWith(e, [v, w]),
                    t && (g.trigger("ajaxComplete", [v, d]),
                    --f.active || f.event.trigger("ajaxStop"))
                }
            }
            typeof a == "object" && (c = a,
            a = b),
            c = c || {};
            var d = f.ajaxSetup({}, c), e = d.context || d, g = e !== d && (e.nodeType || e instanceof f) ? f(e) : f.event, h = f.Deferred(), i = f.Callbacks("once memory"), j = d.statusCode || {}, k, l = {}, m = {}, n, o, p, q, r, s = 0, t, u, v = {
                readyState: 0,
                setRequestHeader: function(a, b) {
                    if (!s) {
                        var c = a.toLowerCase();
                        a = m[c] = m[c] || a,
                        l[a] = b
                    }
                    return this
                },
                getAllResponseHeaders: function() {
                    return s === 2 ? n : null
                },
                getResponseHeader: function(a) {
                    var c;
                    if (s === 2) {
                        if (!o) {
                            o = {};
                            while (c = bG.exec(n))
                                o[c[1].toLowerCase()] = c[2]
                        }
                        c = o[a.toLowerCase()]
                    }
                    return c === b ? null : c
                },
                overrideMimeType: function(a) {
                    s || (d.mimeType = a);
                    return this
                },
                abort: function(a) {
                    a = a || "abort",
                    p && p.abort(a),
                    w(0, a);
                    return this
                }
            };
            h.promise(v),
            v.success = v.done,
            v.error = v.fail,
            v.complete = i.add,
            v.statusCode = function(a) {
                if (a) {
                    var b;
                    if (s < 2)
                        for (b in a)
                            j[b] = [j[b], a[b]];
                    else
                        b = a[v.status],
                        v.then(b, b)
                }
                return this
            }
            ,
            d.url = ((a || d.url) + "").replace(bF, "").replace(bK, bV[1] + "//"),
            d.dataTypes = f.trim(d.dataType || "*").toLowerCase().split(bO),
            d.crossDomain == null && (r = bQ.exec(d.url.toLowerCase()),
            d.crossDomain = !(!r || r[1] == bV[1] && r[2] == bV[2] && (r[3] || (r[1] === "http:" ? 80 : 443)) == (bV[3] || (bV[1] === "http:" ? 80 : 443)))),
            d.data && d.processData && typeof d.data != "string" && (d.data = f.param(d.data, d.traditional)),
            bZ(bS, d, c, v);
            if (s === 2)
                return !1;
            t = d.global,
            d.type = d.type.toUpperCase(),
            d.hasContent = !bJ.test(d.type),
            t && f.active++ === 0 && f.event.trigger("ajaxStart");
            if (!d.hasContent) {
                d.data && (d.url += (bL.test(d.url) ? "&" : "?") + d.data,
                delete d.data),
                k = d.url;
                if (d.cache === !1) {
                    var x = f.now()
                      , y = d.url.replace(bP, "$1_=" + x);
                    d.url = y + (y === d.url ? (bL.test(d.url) ? "&" : "?") + "_=" + x : "")
                }
            }
            (d.data && d.hasContent && d.contentType !== !1 || c.contentType) && v.setRequestHeader("Content-Type", d.contentType),
            d.ifModified && (k = k || d.url,
            f.lastModified[k] && v.setRequestHeader("If-Modified-Since", f.lastModified[k]),
            f.etag[k] && v.setRequestHeader("If-None-Match", f.etag[k])),
            v.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + (d.dataTypes[0] !== "*" ? ", " + bW + "; q=0.01" : "") : d.accepts["*"]);
            for (u in d.headers)
                v.setRequestHeader(u, d.headers[u]);
            if (d.beforeSend && (d.beforeSend.call(e, v, d) === !1 || s === 2)) {
                v.abort();
                return !1
            }
            for (u in {
                success: 1,
                error: 1,
                complete: 1
            })
                v[u](d[u]);
            p = bZ(bT, d, c, v);
            if (!p)
                w(-1, "No Transport");
            else {
                v.readyState = 1,
                t && g.trigger("ajaxSend", [v, d]),
                d.async && d.timeout > 0 && (q = setTimeout(function() {
                    v.abort("timeout")
                }, d.timeout));
                try {
                    s = 1,
                    p.send(l, w)
                } catch (z) {
                    if (s < 2)
                        w(-1, z);
                    else
                        throw z
                }
            }
            return v
        },
        param: function(a, c) {
            var d = []
              , e = function(a, b) {
                b = f.isFunction(b) ? b() : b,
                d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
            };
            c === b && (c = f.ajaxSettings.traditional);
            if (f.isArray(a) || a.jquery && !f.isPlainObject(a))
                f.each(a, function() {
                    e(this.name, this.value)
                });
            else
                for (var g in a)
                    b_(g, a[g], c, e);
            return d.join("&").replace(bC, "+")
        }
    }),
    f.extend({
        active: 0,
        lastModified: {},
        etag: {}
    });
    var cc = f.now()
      , cd = /(\=)\?(&|$)|\?\?/i;
    f.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            return f.expando + "_" + cc++
        }
    }),
    f.ajaxPrefilter("json jsonp", function(b, c, d) {
        var e = typeof b.data == "string" && /^application\/x\-www\-form\-urlencoded/.test(b.contentType);
        if (b.dataTypes[0] === "jsonp" || b.jsonp !== !1 && (cd.test(b.url) || e && cd.test(b.data))) {
            var g, h = b.jsonpCallback = f.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, i = a[h], j = b.url, k = b.data, l = "$1" + h + "$2";
            b.jsonp !== !1 && (j = j.replace(cd, l),
            b.url === j && (e && (k = k.replace(cd, l)),
            b.data === k && (j += (/\?/.test(j) ? "&" : "?") + b.jsonp + "=" + h))),
            b.url = j,
            b.data = k,
            a[h] = function(a) {
                g = [a]
            }
            ,
            d.always(function() {
                a[h] = i,
                g && f.isFunction(i) && a[h](g[0])
            }),
            b.converters["script json"] = function() {
                g || f.error(h + " was not called");
                return g[0]
            }
            ,
            b.dataTypes[0] = "json";
            return "script"
        }
    }),
    f.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function(a) {
                f.globalEval(a);
                return a
            }
        }
    }),
    f.ajaxPrefilter("script", function(a) {
        a.cache === b && (a.cache = !1),
        a.crossDomain && (a.type = "GET",
        a.global = !1)
    }),
    f.ajaxTransport("script", function(a) {
        if (a.crossDomain) {
            var d, e = c.head || c.getElementsByTagName("head")[0] || c.documentElement;
            return {
                send: function(f, g) {
                    d = c.createElement("script"),
                    d.async = "async",
                    a.scriptCharset && (d.charset = a.scriptCharset),
                    d.src = a.url,
                    d.onload = d.onreadystatechange = function(a, c) {
                        if (c || !d.readyState || /loaded|complete/.test(d.readyState))
                            d.onload = d.onreadystatechange = null,
                            e && d.parentNode && e.removeChild(d),
                            d = b,
                            c || g(200, "success")
                    }
                    ,
                    e.insertBefore(d, e.firstChild)
                },
                abort: function() {
                    d && d.onload(0, 1)
                }
            }
        }
    });
    var ce = a.ActiveXObject ? function() {
        for (var a in cg)
            cg[a](0, 1)
    }
    : !1, cf = 0, cg;
    f.ajaxSettings.xhr = a.ActiveXObject ? function() {
        return !this.isLocal && ch() || ci()
    }
    : ch,
    function(a) {
        f.extend(f.support, {
            ajax: !!a,
            cors: !!a && "withCredentials"in a
        })
    }(f.ajaxSettings.xhr()),
    f.support.ajax && f.ajaxTransport(function(c) {
        if (!c.crossDomain || f.support.cors) {
            var d;
            return {
                send: function(e, g) {
                    var h = c.xhr(), i, j;
                    c.username ? h.open(c.type, c.url, c.async, c.username, c.password) : h.open(c.type, c.url, c.async);
                    if (c.xhrFields)
                        for (j in c.xhrFields)
                            h[j] = c.xhrFields[j];
                    c.mimeType && h.overrideMimeType && h.overrideMimeType(c.mimeType),
                    !c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (j in e)
                            h.setRequestHeader(j, e[j])
                    } catch (k) {}
                    h.send(c.hasContent && c.data || null),
                    d = function(a, e) {
                        var j, k, l, m, n;
                        try {
                            if (d && (e || h.readyState === 4)) {
                                d = b,
                                i && (h.onreadystatechange = f.noop,
                                ce && delete cg[i]);
                                if (e)
                                    h.readyState !== 4 && h.abort();
                                else {
                                    j = h.status,
                                    l = h.getAllResponseHeaders(),
                                    m = {},
                                    n = h.responseXML,
                                    n && n.documentElement && (m.xml = n);
                                    try {
                                        m.text = h.responseText
                                    } catch (a) {}
                                    try {
                                        k = h.statusText
                                    } catch (o) {
                                        k = ""
                                    }
                                    !j && c.isLocal && !c.crossDomain ? j = m.text ? 200 : 404 : j === 1223 && (j = 204)
                                }
                            }
                        } catch (p) {
                            e || g(-1, p)
                        }
                        m && g(j, k, m, l)
                    }
                    ,
                    !c.async || h.readyState === 4 ? d() : (i = ++cf,
                    ce && (cg || (cg = {},
                    f(a).unload(ce)),
                    cg[i] = d),
                    h.onreadystatechange = d)
                },
                abort: function() {
                    d && d(0, 1)
                }
            }
        }
    });
    var cj = {}, ck, cl, cm = /^(?:toggle|show|hide)$/, cn = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i, co, cp = [["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"], ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"], ["opacity"]], cq;
    f.fn.extend({
        show: function(a, b, c) {
            var d, e;
            if (a || a === 0)
                return this.animate(ct("show", 3), a, b, c);
            for (var g = 0, h = this.length; g < h; g++)
                d = this[g],
                d.style && (e = d.style.display,
                !f._data(d, "olddisplay") && e === "none" && (e = d.style.display = ""),
                (e === "" && f.css(d, "display") === "none" || !f.contains(d.ownerDocument.documentElement, d)) && f._data(d, "olddisplay", cu(d.nodeName)));
            for (g = 0; g < h; g++) {
                d = this[g];
                if (d.style) {
                    e = d.style.display;
                    if (e === "" || e === "none")
                        d.style.display = f._data(d, "olddisplay") || ""
                }
            }
            return this
        },
        hide: function(a, b, c) {
            if (a || a === 0)
                return this.animate(ct("hide", 3), a, b, c);
            var d, e, g = 0, h = this.length;
            for (; g < h; g++)
                d = this[g],
                d.style && (e = f.css(d, "display"),
                e !== "none" && !f._data(d, "olddisplay") && f._data(d, "olddisplay", e));
            for (g = 0; g < h; g++)
                this[g].style && (this[g].style.display = "none");
            return this
        },
        _toggle: f.fn.toggle,
        toggle: function(a, b, c) {
            var d = typeof a == "boolean";
            f.isFunction(a) && f.isFunction(b) ? this._toggle.apply(this, arguments) : a == null || d ? this.each(function() {
                var b = d ? a : f(this).is(":hidden");
                f(this)[b ? "show" : "hide"]()
            }) : this.animate(ct("toggle", 3), a, b, c);
            return this
        },
        fadeTo: function(a, b, c, d) {
            return this.filter(":hidden").css("opacity", 0).show().end().animate({
                opacity: b
            }, a, c, d)
        },
        animate: function(a, b, c, d) {
            function g() {
                e.queue === !1 && f._mark(this);
                var b = f.extend({}, e), c = this.nodeType === 1, d = c && f(this).is(":hidden"), g, h, i, j, k, l, m, n, o, p, q;
                b.animatedProperties = {};
                for (i in a) {
                    g = f.camelCase(i),
                    i !== g && (a[g] = a[i],
                    delete a[i]);
                    if ((k = f.cssHooks[g]) && "expand"in k) {
                        l = k.expand(a[g]),
                        delete a[g];
                        for (i in l)
                            i in a || (a[i] = l[i])
                    }
                }
                for (g in a) {
                    h = a[g],
                    f.isArray(h) ? (b.animatedProperties[g] = h[1],
                    h = a[g] = h[0]) : b.animatedProperties[g] = b.specialEasing && b.specialEasing[g] || b.easing || "swing";
                    if (h === "hide" && d || h === "show" && !d)
                        return b.complete.call(this);
                    c && (g === "height" || g === "width") && (b.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY],
                    f.css(this, "display") === "inline" && f.css(this, "float") === "none" && (!f.support.inlineBlockNeedsLayout || cu(this.nodeName) === "inline" ? this.style.display = "inline-block" : this.style.zoom = 1))
                }
                b.overflow != null && (this.style.overflow = "hidden");
                for (i in a)
                    j = new f.fx(this,b,i),
                    h = a[i],
                    cm.test(h) ? (q = f._data(this, "toggle" + i) || (h === "toggle" ? d ? "show" : "hide" : 0),
                    q ? (f._data(this, "toggle" + i, q === "show" ? "hide" : "show"),
                    j[q]()) : j[h]()) : (m = cn.exec(h),
                    n = j.cur(),
                    m ? (o = parseFloat(m[2]),
                    p = m[3] || (f.cssNumber[i] ? "" : "px"),
                    p !== "px" && (f.style(this, i, (o || 1) + p),
                    n = (o || 1) / j.cur() * n,
                    f.style(this, i, n + p)),
                    m[1] && (o = (m[1] === "-=" ? -1 : 1) * o + n),
                    j.custom(n, o, p)) : j.custom(n, h, ""));
                return !0
            }
            var e = f.speed(b, c, d);
            if (f.isEmptyObject(a))
                return this.each(e.complete, [!1]);
            a = f.extend({}, a);
            return e.queue === !1 ? this.each(g) : this.queue(e.queue, g)
        },
        stop: function(a, c, d) {
            typeof a != "string" && (d = c,
            c = a,
            a = b),
            c && a !== !1 && this.queue(a || "fx", []);
            return this.each(function() {
                function h(a, b, c) {
                    var e = b[c];
                    f.removeData(a, c, !0),
                    e.stop(d)
                }
                var b, c = !1, e = f.timers, g = f._data(this);
                d || f._unmark(!0, this);
                if (a == null)
                    for (b in g)
                        g[b] && g[b].stop && b.indexOf(".run") === b.length - 4 && h(this, g, b);
                else
                    g[b = a + ".run"] && g[b].stop && h(this, g, b);
                for (b = e.length; b--; )
                    e[b].elem === this && (a == null || e[b].queue === a) && (d ? e[b](!0) : e[b].saveState(),
                    c = !0,
                    e.splice(b, 1));
                (!d || !c) && f.dequeue(this, a)
            })
        }
    }),
    f.each({
        slideDown: ct("show", 1),
        slideUp: ct("hide", 1),
        slideToggle: ct("toggle", 1),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(a, b) {
        f.fn[a] = function(a, c, d) {
            return this.animate(b, a, c, d)
        }
    }),
    f.extend({
        speed: function(a, b, c) {
            var d = a && typeof a == "object" ? f.extend({}, a) : {
                complete: c || !c && b || f.isFunction(a) && a,
                duration: a,
                easing: c && b || b && !f.isFunction(b) && b
            };
            d.duration = f.fx.off ? 0 : typeof d.duration == "number" ? d.duration : d.duration in f.fx.speeds ? f.fx.speeds[d.duration] : f.fx.speeds._default;
            if (d.queue == null || d.queue === !0)
                d.queue = "fx";
            d.old = d.complete,
            d.complete = function(a) {
                f.isFunction(d.old) && d.old.call(this),
                d.queue ? f.dequeue(this, d.queue) : a !== !1 && f._unmark(this)
            }
            ;
            return d
        },
        easing: {
            linear: function(a) {
                return a
            },
            swing: function(a) {
                return -Math.cos(a * Math.PI) / 2 + .5
            }
        },
        timers: [],
        fx: function(a, b, c) {
            this.options = b,
            this.elem = a,
            this.prop = c,
            b.orig = b.orig || {}
        }
    }),
    f.fx.prototype = {
        update: function() {
            this.options.step && this.options.step.call(this.elem, this.now, this),
            (f.fx.step[this.prop] || f.fx.step._default)(this)
        },
        cur: function() {
            if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null))
                return this.elem[this.prop];
            var a, b = f.css(this.elem, this.prop);
            return isNaN(a = parseFloat(b)) ? !b || b === "auto" ? 0 : b : a
        },
        custom: function(a, c, d) {
            function h(a) {
                return e.step(a)
            }
            var e = this
              , g = f.fx;
            this.startTime = cq || cr(),
            this.end = c,
            this.now = this.start = a,
            this.pos = this.state = 0,
            this.unit = d || this.unit || (f.cssNumber[this.prop] ? "" : "px"),
            h.queue = this.options.queue,
            h.elem = this.elem,
            h.saveState = function() {
                f._data(e.elem, "fxshow" + e.prop) === b && (e.options.hide ? f._data(e.elem, "fxshow" + e.prop, e.start) : e.options.show && f._data(e.elem, "fxshow" + e.prop, e.end))
            }
            ,
            h() && f.timers.push(h) && !co && (co = setInterval(g.tick, g.interval))
        },
        show: function() {
            var a = f._data(this.elem, "fxshow" + this.prop);
            this.options.orig[this.prop] = a || f.style(this.elem, this.prop),
            this.options.show = !0,
            a !== b ? this.custom(this.cur(), a) : this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur()),
            f(this.elem).show()
        },
        hide: function() {
            this.options.orig[this.prop] = f._data(this.elem, "fxshow" + this.prop) || f.style(this.elem, this.prop),
            this.options.hide = !0,
            this.custom(this.cur(), 0)
        },
        step: function(a) {
            var b, c, d, e = cq || cr(), g = !0, h = this.elem, i = this.options;
            if (a || e >= i.duration + this.startTime) {
                this.now = this.end,
                this.pos = this.state = 1,
                this.update(),
                i.animatedProperties[this.prop] = !0;
                for (b in i.animatedProperties)
                    i.animatedProperties[b] !== !0 && (g = !1);
                if (g) {
                    i.overflow != null && !f.support.shrinkWrapBlocks && f.each(["", "X", "Y"], function(a, b) {
                        h.style["overflow" + b] = i.overflow[a]
                    }),
                    i.hide && f(h).hide();
                    if (i.hide || i.show)
                        for (b in i.animatedProperties)
                            f.style(h, b, i.orig[b]),
                            f.removeData(h, "fxshow" + b, !0),
                            f.removeData(h, "toggle" + b, !0);
                    d = i.complete,
                    d && (i.complete = !1,
                    d.call(h))
                }
                return !1
            }
            i.duration == Infinity ? this.now = e : (c = e - this.startTime,
            this.state = c / i.duration,
            this.pos = f.easing[i.animatedProperties[this.prop]](this.state, c, 0, 1, i.duration),
            this.now = this.start + (this.end - this.start) * this.pos),
            this.update();
            return !0
        }
    },
    f.extend(f.fx, {
        tick: function() {
            var a, b = f.timers, c = 0;
            for (; c < b.length; c++)
                a = b[c],
                !a() && b[c] === a && b.splice(c--, 1);
            b.length || f.fx.stop()
        },
        interval: 13,
        stop: function() {
            clearInterval(co),
            co = null
        },
        speeds: {
            slow: 600,
            fast: 200,
            _default: 400
        },
        step: {
            opacity: function(a) {
                f.style(a.elem, "opacity", a.now)
            },
            _default: function(a) {
                a.elem.style && a.elem.style[a.prop] != null ? a.elem.style[a.prop] = a.now + a.unit : a.elem[a.prop] = a.now
            }
        }
    }),
    f.each(cp.concat.apply([], cp), function(a, b) {
        b.indexOf("margin") && (f.fx.step[b] = function(a) {
            f.style(a.elem, b, Math.max(0, a.now) + a.unit)
        }
        )
    }),
    f.expr && f.expr.filters && (f.expr.filters.animated = function(a) {
        return f.grep(f.timers, function(b) {
            return a === b.elem
        }).length
    }
    );
    var cv, cw = /^t(?:able|d|h)$/i, cx = /^(?:body|html)$/i;
    "getBoundingClientRect"in c.documentElement ? cv = function(a, b, c, d) {
        try {
            d = a.getBoundingClientRect()
        } catch (e) {}
        if (!d || !f.contains(c, a))
            return d ? {
                top: d.top,
                left: d.left
            } : {
                top: 0,
                left: 0
            };
        var g = b.body
          , h = cy(b)
          , i = c.clientTop || g.clientTop || 0
          , j = c.clientLeft || g.clientLeft || 0
          , k = h.pageYOffset || f.support.boxModel && c.scrollTop || g.scrollTop
          , l = h.pageXOffset || f.support.boxModel && c.scrollLeft || g.scrollLeft
          , m = d.top + k - i
          , n = d.left + l - j;
        return {
            top: m,
            left: n
        }
    }
    : cv = function(a, b, c) {
        var d, e = a.offsetParent, g = a, h = b.body, i = b.defaultView, j = i ? i.getComputedStyle(a, null) : a.currentStyle, k = a.offsetTop, l = a.offsetLeft;
        while ((a = a.parentNode) && a !== h && a !== c) {
            if (f.support.fixedPosition && j.position === "fixed")
                break;
            d = i ? i.getComputedStyle(a, null) : a.currentStyle,
            k -= a.scrollTop,
            l -= a.scrollLeft,
            a === e && (k += a.offsetTop,
            l += a.offsetLeft,
            f.support.doesNotAddBorder && (!f.support.doesAddBorderForTableAndCells || !cw.test(a.nodeName)) && (k += parseFloat(d.borderTopWidth) || 0,
            l += parseFloat(d.borderLeftWidth) || 0),
            g = e,
            e = a.offsetParent),
            f.support.subtractsBorderForOverflowNotVisible && d.overflow !== "visible" && (k += parseFloat(d.borderTopWidth) || 0,
            l += parseFloat(d.borderLeftWidth) || 0),
            j = d
        }
        if (j.position === "relative" || j.position === "static")
            k += h.offsetTop,
            l += h.offsetLeft;
        f.support.fixedPosition && j.position === "fixed" && (k += Math.max(c.scrollTop, h.scrollTop),
        l += Math.max(c.scrollLeft, h.scrollLeft));
        return {
            top: k,
            left: l
        }
    }
    ,
    f.fn.offset = function(a) {
        if (arguments.length)
            return a === b ? this : this.each(function(b) {
                f.offset.setOffset(this, a, b)
            });
        var c = this[0]
          , d = c && c.ownerDocument;
        if (!d)
            return null;
        if (c === d.body)
            return f.offset.bodyOffset(c);
        return cv(c, d, d.documentElement)
    }
    ,
    f.offset = {
        bodyOffset: function(a) {
            var b = a.offsetTop
              , c = a.offsetLeft;
            f.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat(f.css(a, "marginTop")) || 0,
            c += parseFloat(f.css(a, "marginLeft")) || 0);
            return {
                top: b,
                left: c
            }
        },
        setOffset: function(a, b, c) {
            var d = f.css(a, "position");
            d === "static" && (a.style.position = "relative");
            var e = f(a), g = e.offset(), h = f.css(a, "top"), i = f.css(a, "left"), j = (d === "absolute" || d === "fixed") && f.inArray("auto", [h, i]) > -1, k = {}, l = {}, m, n;
            j ? (l = e.position(),
            m = l.top,
            n = l.left) : (m = parseFloat(h) || 0,
            n = parseFloat(i) || 0),
            f.isFunction(b) && (b = b.call(a, c, g)),
            b.top != null && (k.top = b.top - g.top + m),
            b.left != null && (k.left = b.left - g.left + n),
            "using"in b ? b.using.call(a, k) : e.css(k)
        }
    },
    f.fn.extend({
        position: function() {
            if (!this[0])
                return null;
            var a = this[0]
              , b = this.offsetParent()
              , c = this.offset()
              , d = cx.test(b[0].nodeName) ? {
                top: 0,
                left: 0
            } : b.offset();
            c.top -= parseFloat(f.css(a, "marginTop")) || 0,
            c.left -= parseFloat(f.css(a, "marginLeft")) || 0,
            d.top += parseFloat(f.css(b[0], "borderTopWidth")) || 0,
            d.left += parseFloat(f.css(b[0], "borderLeftWidth")) || 0;
            return {
                top: c.top - d.top,
                left: c.left - d.left
            }
        },
        offsetParent: function() {
            return this.map(function() {
                var a = this.offsetParent || c.body;
                while (a && !cx.test(a.nodeName) && f.css(a, "position") === "static")
                    a = a.offsetParent;
                return a
            })
        }
    }),
    f.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(a, c) {
        var d = /Y/.test(c);
        f.fn[a] = function(e) {
            return f.access(this, function(a, e, g) {
                var h = cy(a);
                if (g === b)
                    return h ? c in h ? h[c] : f.support.boxModel && h.document.documentElement[e] || h.document.body[e] : a[e];
                h ? h.scrollTo(d ? f(h).scrollLeft() : g, d ? g : f(h).scrollTop()) : a[e] = g
            }, a, e, arguments.length, null)
        }
    }),
    f.each({
        Height: "height",
        Width: "width"
    }, function(a, c) {
        var d = "client" + a
          , e = "scroll" + a
          , g = "offset" + a;
        f.fn["inner" + a] = function() {
            var a = this[0];
            return a ? a.style ? parseFloat(f.css(a, c, "padding")) : this[c]() : null
        }
        ,
        f.fn["outer" + a] = function(a) {
            var b = this[0];
            return b ? b.style ? parseFloat(f.css(b, c, a ? "margin" : "border")) : this[c]() : null
        }
        ,
        f.fn[c] = function(a) {
            return f.access(this, function(a, c, h) {
                var i, j, k, l;
                if (f.isWindow(a)) {
                    i = a.document,
                    j = i.documentElement[d];
                    return f.support.boxModel && j || i.body && i.body[d] || j
                }
                if (a.nodeType === 9) {
                    i = a.documentElement;
                    if (i[d] >= i[e])
                        return i[d];
                    return Math.max(a.body[e], i[e], a.body[g], i[g])
                }
                if (h === b) {
                    k = f.css(a, c),
                    l = parseFloat(k);
                    return f.isNumeric(l) ? l : k
                }
                f(a).css(c, h)
            }, c, a, arguments.length, null)
        }
    }),
    a.jQuery = a.$ = f,
    typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function() {
        return f
    })
}
)(window);

/* - collective.js.jqueryui.custom.min.js - */

/* collective.js.jqueryui: jquery.ui.core.min.js */

/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(e, t) {
    function i(t, i) {
        var a, n, r, o = t.nodeName.toLowerCase();
        return "area" === o ? (a = t.parentNode,
        n = a.name,
        t.href && n && "map" === a.nodeName.toLowerCase() ? (r = e("img[usemap=#" + n + "]")[0],
        !!r && s(r)) : !1) : (/input|select|textarea|button|object/.test(o) ? !t.disabled : "a" === o ? t.href || i : i) && s(t)
    }
    function s(t) {
        return e.expr.filters.visible(t) && !e(t).parents().addBack().filter(function() {
            return "hidden" === e.css(this, "visibility")
        }).length
    }
    var a = 0
      , n = /^ui-id-\d+$/;
    e.ui = e.ui || {},
    e.extend(e.ui, {
        version: "1.10.2",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    }),
    e.fn.extend({
        focus: function(t) {
            return function(i, s) {
                return "number" == typeof i ? this.each(function() {
                    var t = this;
                    setTimeout(function() {
                        e(t).focus(),
                        s && s.call(t)
                    }, i)
                }) : t.apply(this, arguments)
            }
        }(e.fn.focus),
        scrollParent: function() {
            var t;
            return t = e.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
                return /(relative|absolute|fixed)/.test(e.css(this, "position")) && /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
            }).eq(0) : this.parents().filter(function() {
                return /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
            }).eq(0),
            /fixed/.test(this.css("position")) || !t.length ? e(document) : t
        },
        zIndex: function(i) {
            if (i !== t)
                return this.css("zIndex", i);
            if (this.length)
                for (var s, a, n = e(this[0]); n.length && n[0] !== document; ) {
                    if (s = n.css("position"),
                    ("absolute" === s || "relative" === s || "fixed" === s) && (a = parseInt(n.css("zIndex"), 10),
                    !isNaN(a) && 0 !== a))
                        return a;
                    n = n.parent()
                }
            return 0
        },
        uniqueId: function() {
            return this.each(function() {
                this.id || (this.id = "ui-id-" + ++a)
            })
        },
        removeUniqueId: function() {
            return this.each(function() {
                n.test(this.id) && e(this).removeAttr("id")
            })
        }
    }),
    e.extend(e.expr[":"], {
        data: e.expr.createPseudo ? e.expr.createPseudo(function(t) {
            return function(i) {
                return !!e.data(i, t)
            }
        }) : function(t, i, s) {
            return !!e.data(t, s[3])
        }
        ,
        focusable: function(t) {
            return i(t, !isNaN(e.attr(t, "tabindex")))
        },
        tabbable: function(t) {
            var s = e.attr(t, "tabindex")
              , a = isNaN(s);
            return (a || s >= 0) && i(t, !a)
        }
    }),
    e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function(i, s) {
        function a(t, i, s, a) {
            return e.each(n, function() {
                i -= parseFloat(e.css(t, "padding" + this)) || 0,
                s && (i -= parseFloat(e.css(t, "border" + this + "Width")) || 0),
                a && (i -= parseFloat(e.css(t, "margin" + this)) || 0)
            }),
            i
        }
        var n = "Width" === s ? ["Left", "Right"] : ["Top", "Bottom"]
          , r = s.toLowerCase()
          , o = {
            innerWidth: e.fn.innerWidth,
            innerHeight: e.fn.innerHeight,
            outerWidth: e.fn.outerWidth,
            outerHeight: e.fn.outerHeight
        };
        e.fn["inner" + s] = function(i) {
            return i === t ? o["inner" + s].call(this) : this.each(function() {
                e(this).css(r, a(this, i) + "px")
            })
        }
        ,
        e.fn["outer" + s] = function(t, i) {
            return "number" != typeof t ? o["outer" + s].call(this, t) : this.each(function() {
                e(this).css(r, a(this, t, !0, i) + "px")
            })
        }
    }),
    e.fn.addBack || (e.fn.addBack = function(e) {
        return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
    }
    ),
    e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function(t) {
        return function(i) {
            return arguments.length ? t.call(this, e.camelCase(i)) : t.call(this)
        }
    }(e.fn.removeData)),
    e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),
    e.support.selectstart = "onselectstart"in document.createElement("div"),
    e.fn.extend({
        disableSelection: function() {
            return this.bind((e.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(e) {
                e.preventDefault()
            })
        },
        enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        }
    }),
    e.extend(e.ui, {
        plugin: {
            add: function(t, i, s) {
                var a, n = e.ui[t].prototype;
                for (a in s)
                    n.plugins[a] = n.plugins[a] || [],
                    n.plugins[a].push([i, s[a]])
            },
            call: function(e, t, i) {
                var s, a = e.plugins[t];
                if (a && e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType)
                    for (s = 0; a.length > s; s++)
                        e.options[a[s][0]] && a[s][1].apply(e.element, i)
            }
        },
        hasScroll: function(t, i) {
            if ("hidden" === e(t).css("overflow"))
                return !1;
            var s = i && "left" === i ? "scrollLeft" : "scrollTop"
              , a = !1;
            return t[s] > 0 ? !0 : (t[s] = 1,
            a = t[s] > 0,
            t[s] = 0,
            a)
        }
    })
}
)(jQuery);

/* collective.js.jqueryui: jquery.ui.widget.min.js */

/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(e, t) {
    var i = 0
      , s = Array.prototype.slice
      , n = e.cleanData;
    e.cleanData = function(t) {
        for (var i, s = 0; null != (i = t[s]); s++)
            try {
                e(i).triggerHandler("remove")
            } catch (a) {}
        n(t)
    }
    ,
    e.widget = function(i, s, n) {
        var a, r, o, h, l = {}, u = i.split(".")[0];
        i = i.split(".")[1],
        a = u + "-" + i,
        n || (n = s,
        s = e.Widget),
        e.expr[":"][a.toLowerCase()] = function(t) {
            return !!e.data(t, a)
        }
        ,
        e[u] = e[u] || {},
        r = e[u][i],
        o = e[u][i] = function(e, i) {
            return this._createWidget ? (arguments.length && this._createWidget(e, i),
            t) : new o(e,i)
        }
        ,
        e.extend(o, r, {
            version: n.version,
            _proto: e.extend({}, n),
            _childConstructors: []
        }),
        h = new s,
        h.options = e.widget.extend({}, h.options),
        e.each(n, function(i, n) {
            return e.isFunction(n) ? (l[i] = function() {
                var e = function() {
                    return s.prototype[i].apply(this, arguments)
                }
                  , t = function(e) {
                    return s.prototype[i].apply(this, e)
                };
                return function() {
                    var i, s = this._super, a = this._superApply;
                    return this._super = e,
                    this._superApply = t,
                    i = n.apply(this, arguments),
                    this._super = s,
                    this._superApply = a,
                    i
                }
            }(),
            t) : (l[i] = n,
            t)
        }),
        o.prototype = e.widget.extend(h, {
            widgetEventPrefix: r ? h.widgetEventPrefix : i
        }, l, {
            constructor: o,
            namespace: u,
            widgetName: i,
            widgetFullName: a
        }),
        r ? (e.each(r._childConstructors, function(t, i) {
            var s = i.prototype;
            e.widget(s.namespace + "." + s.widgetName, o, i._proto)
        }),
        delete r._childConstructors) : s._childConstructors.push(o),
        e.widget.bridge(i, o)
    }
    ,
    e.widget.extend = function(i) {
        for (var n, a, r = s.call(arguments, 1), o = 0, h = r.length; h > o; o++)
            for (n in r[o])
                a = r[o][n],
                r[o].hasOwnProperty(n) && a !== t && (i[n] = e.isPlainObject(a) ? e.isPlainObject(i[n]) ? e.widget.extend({}, i[n], a) : e.widget.extend({}, a) : a);
        return i
    }
    ,
    e.widget.bridge = function(i, n) {
        var a = n.prototype.widgetFullName || i;
        e.fn[i] = function(r) {
            var o = "string" == typeof r
              , h = s.call(arguments, 1)
              , l = this;
            return r = !o && h.length ? e.widget.extend.apply(null, [r].concat(h)) : r,
            o ? this.each(function() {
                var s, n = e.data(this, a);
                return n ? e.isFunction(n[r]) && "_" !== r.charAt(0) ? (s = n[r].apply(n, h),
                s !== n && s !== t ? (l = s && s.jquery ? l.pushStack(s.get()) : s,
                !1) : t) : e.error("no such method '" + r + "' for " + i + " widget instance") : e.error("cannot call methods on " + i + " prior to initialization; " + "attempted to call method '" + r + "'")
            }) : this.each(function() {
                var t = e.data(this, a);
                t ? t.option(r || {})._init() : e.data(this, a, new n(r,this))
            }),
            l
        }
    }
    ,
    e.Widget = function() {}
    ,
    e.Widget._childConstructors = [],
    e.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: !1,
            create: null
        },
        _createWidget: function(t, s) {
            s = e(s || this.defaultElement || this)[0],
            this.element = e(s),
            this.uuid = i++,
            this.eventNamespace = "." + this.widgetName + this.uuid,
            this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t),
            this.bindings = e(),
            this.hoverable = e(),
            this.focusable = e(),
            s !== this && (e.data(s, this.widgetFullName, this),
            this._on(!0, this.element, {
                remove: function(e) {
                    e.target === s && this.destroy()
                }
            }),
            this.document = e(s.style ? s.ownerDocument : s.document || s),
            this.window = e(this.document[0].defaultView || this.document[0].parentWindow)),
            this._create(),
            this._trigger("create", null, this._getCreateEventData()),
            this._init()
        },
        _getCreateOptions: e.noop,
        _getCreateEventData: e.noop,
        _create: e.noop,
        _init: e.noop,
        destroy: function() {
            this._destroy(),
            this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),
            this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"),
            this.bindings.unbind(this.eventNamespace),
            this.hoverable.removeClass("ui-state-hover"),
            this.focusable.removeClass("ui-state-focus")
        },
        _destroy: e.noop,
        widget: function() {
            return this.element
        },
        option: function(i, s) {
            var n, a, r, o = i;
            if (0 === arguments.length)
                return e.widget.extend({}, this.options);
            if ("string" == typeof i)
                if (o = {},
                n = i.split("."),
                i = n.shift(),
                n.length) {
                    for (a = o[i] = e.widget.extend({}, this.options[i]),
                    r = 0; n.length - 1 > r; r++)
                        a[n[r]] = a[n[r]] || {},
                        a = a[n[r]];
                    if (i = n.pop(),
                    s === t)
                        return a[i] === t ? null : a[i];
                    a[i] = s
                } else {
                    if (s === t)
                        return this.options[i] === t ? null : this.options[i];
                    o[i] = s
                }
            return this._setOptions(o),
            this
        },
        _setOptions: function(e) {
            var t;
            for (t in e)
                this._setOption(t, e[t]);
            return this
        },
        _setOption: function(e, t) {
            return this.options[e] = t,
            "disabled" === e && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!t).attr("aria-disabled", t),
            this.hoverable.removeClass("ui-state-hover"),
            this.focusable.removeClass("ui-state-focus")),
            this
        },
        enable: function() {
            return this._setOption("disabled", !1)
        },
        disable: function() {
            return this._setOption("disabled", !0)
        },
        _on: function(i, s, n) {
            var a, r = this;
            "boolean" != typeof i && (n = s,
            s = i,
            i = !1),
            n ? (s = a = e(s),
            this.bindings = this.bindings.add(s)) : (n = s,
            s = this.element,
            a = this.widget()),
            e.each(n, function(n, o) {
                function h() {
                    return i || r.options.disabled !== !0 && !e(this).hasClass("ui-state-disabled") ? ("string" == typeof o ? r[o] : o).apply(r, arguments) : t
                }
                "string" != typeof o && (h.guid = o.guid = o.guid || h.guid || e.guid++);
                var l = n.match(/^(\w+)\s*(.*)$/)
                  , u = l[1] + r.eventNamespace
                  , c = l[2];
                c ? a.delegate(c, u, h) : s.bind(u, h)
            })
        },
        _off: function(e, t) {
            t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace,
            e.unbind(t).undelegate(t)
        },
        _delay: function(e, t) {
            function i() {
                return ("string" == typeof e ? s[e] : e).apply(s, arguments)
            }
            var s = this;
            return setTimeout(i, t || 0)
        },
        _hoverable: function(t) {
            this.hoverable = this.hoverable.add(t),
            this._on(t, {
                mouseenter: function(t) {
                    e(t.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function(t) {
                    e(t.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function(t) {
            this.focusable = this.focusable.add(t),
            this._on(t, {
                focusin: function(t) {
                    e(t.currentTarget).addClass("ui-state-focus")
                },
                focusout: function(t) {
                    e(t.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function(t, i, s) {
            var n, a, r = this.options[t];
            if (s = s || {},
            i = e.Event(i),
            i.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(),
            i.target = this.element[0],
            a = i.originalEvent)
                for (n in a)
                    n in i || (i[n] = a[n]);
            return this.element.trigger(i, s),
            !(e.isFunction(r) && r.apply(this.element[0], [i].concat(s)) === !1 || i.isDefaultPrevented())
        }
    },
    e.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(t, i) {
        e.Widget.prototype["_" + t] = function(s, n, a) {
            "string" == typeof n && (n = {
                effect: n
            });
            var r, o = n ? n === !0 || "number" == typeof n ? i : n.effect || i : t;
            n = n || {},
            "number" == typeof n && (n = {
                duration: n
            }),
            r = !e.isEmptyObject(n),
            n.complete = a,
            n.delay && s.delay(n.delay),
            r && e.effects && e.effects.effect[o] ? s[t](n) : o !== t && s[o] ? s[o](n.duration, n.easing, a) : s.queue(function(i) {
                e(this)[t](),
                a && a.call(s[0]),
                i()
            })
        }
    })
}
)(jQuery);

/* collective.js.jqueryui: jquery.ui.mouse.min.js */

/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(e) {
    var t = !1;
    e(document).mouseup(function() {
        t = !1
    }),
    e.widget("ui.mouse", {
        version: "1.10.2",
        options: {
            cancel: "input,textarea,button,select,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var t = this;
            this.element.bind("mousedown." + this.widgetName, function(e) {
                return t._mouseDown(e)
            }).bind("click." + this.widgetName, function(i) {
                return !0 === e.data(i.target, t.widgetName + ".preventClickEvent") ? (e.removeData(i.target, t.widgetName + ".preventClickEvent"),
                i.stopImmediatePropagation(),
                !1) : undefined
            }),
            this.started = !1
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName),
            this._mouseMoveDelegate && e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
        },
        _mouseDown: function(i) {
            if (!t) {
                this._mouseStarted && this._mouseUp(i),
                this._mouseDownEvent = i;
                var s = this
                  , n = 1 === i.which
                  , a = "string" == typeof this.options.cancel && i.target.nodeName ? e(i.target).closest(this.options.cancel).length : !1;
                return n && !a && this._mouseCapture(i) ? (this.mouseDelayMet = !this.options.delay,
                this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                    s.mouseDelayMet = !0
                }, this.options.delay)),
                this._mouseDistanceMet(i) && this._mouseDelayMet(i) && (this._mouseStarted = this._mouseStart(i) !== !1,
                !this._mouseStarted) ? (i.preventDefault(),
                !0) : (!0 === e.data(i.target, this.widgetName + ".preventClickEvent") && e.removeData(i.target, this.widgetName + ".preventClickEvent"),
                this._mouseMoveDelegate = function(e) {
                    return s._mouseMove(e)
                }
                ,
                this._mouseUpDelegate = function(e) {
                    return s._mouseUp(e)
                }
                ,
                e(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate),
                i.preventDefault(),
                t = !0,
                !0)) : !0
            }
        },
        _mouseMove: function(t) {
            return e.ui.ie && (!document.documentMode || 9 > document.documentMode) && !t.button ? this._mouseUp(t) : this._mouseStarted ? (this._mouseDrag(t),
            t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1,
            this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)),
            !this._mouseStarted)
        },
        _mouseUp: function(t) {
            return e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate),
            this._mouseStarted && (this._mouseStarted = !1,
            t.target === this._mouseDownEvent.target && e.data(t.target, this.widgetName + ".preventClickEvent", !0),
            this._mouseStop(t)),
            !1
        },
        _mouseDistanceMet: function(e) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function() {
            return this.mouseDelayMet
        },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() {
            return !0
        }
    })
}
)(jQuery);

/* collective.js.jqueryui: jquery.ui.position.min.js */

/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(t, e) {
    function i(t, e, i) {
        return [parseFloat(t[0]) * (p.test(t[0]) ? e / 100 : 1), parseFloat(t[1]) * (p.test(t[1]) ? i / 100 : 1)]
    }
    function s(e, i) {
        return parseInt(t.css(e, i), 10) || 0
    }
    function n(e) {
        var i = e[0];
        return 9 === i.nodeType ? {
            width: e.width(),
            height: e.height(),
            offset: {
                top: 0,
                left: 0
            }
        } : t.isWindow(i) ? {
            width: e.width(),
            height: e.height(),
            offset: {
                top: e.scrollTop(),
                left: e.scrollLeft()
            }
        } : i.preventDefault ? {
            width: 0,
            height: 0,
            offset: {
                top: i.pageY,
                left: i.pageX
            }
        } : {
            width: e.outerWidth(),
            height: e.outerHeight(),
            offset: e.offset()
        }
    }
    t.ui = t.ui || {};
    var a, o = Math.max, r = Math.abs, h = Math.round, l = /left|center|right/, c = /top|center|bottom/, u = /[\+\-]\d+(\.[\d]+)?%?/, d = /^\w+/, p = /%$/, f = t.fn.position;
    t.position = {
        scrollbarWidth: function() {
            if (a !== e)
                return a;
            var i, s, n = t("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"), o = n.children()[0];
            return t("body").append(n),
            i = o.offsetWidth,
            n.css("overflow", "scroll"),
            s = o.offsetWidth,
            i === s && (s = n[0].clientWidth),
            n.remove(),
            a = i - s
        },
        getScrollInfo: function(e) {
            var i = e.isWindow ? "" : e.element.css("overflow-x")
              , s = e.isWindow ? "" : e.element.css("overflow-y")
              , n = "scroll" === i || "auto" === i && e.width < e.element[0].scrollWidth
              , a = "scroll" === s || "auto" === s && e.height < e.element[0].scrollHeight;
            return {
                width: a ? t.position.scrollbarWidth() : 0,
                height: n ? t.position.scrollbarWidth() : 0
            }
        },
        getWithinInfo: function(e) {
            var i = t(e || window)
              , s = t.isWindow(i[0]);
            return {
                element: i,
                isWindow: s,
                offset: i.offset() || {
                    left: 0,
                    top: 0
                },
                scrollLeft: i.scrollLeft(),
                scrollTop: i.scrollTop(),
                width: s ? i.width() : i.outerWidth(),
                height: s ? i.height() : i.outerHeight()
            }
        }
    },
    t.fn.position = function(e) {
        if (!e || !e.of)
            return f.apply(this, arguments);
        e = t.extend({}, e);
        var a, p, m, g, v, _, b = t(e.of), y = t.position.getWithinInfo(e.within), w = t.position.getScrollInfo(y), x = (e.collision || "flip").split(" "), k = {};
        return _ = n(b),
        b[0].preventDefault && (e.at = "left top"),
        p = _.width,
        m = _.height,
        g = _.offset,
        v = t.extend({}, g),
        t.each(["my", "at"], function() {
            var t, i, s = (e[this] || "").split(" ");
            1 === s.length && (s = l.test(s[0]) ? s.concat(["center"]) : c.test(s[0]) ? ["center"].concat(s) : ["center", "center"]),
            s[0] = l.test(s[0]) ? s[0] : "center",
            s[1] = c.test(s[1]) ? s[1] : "center",
            t = u.exec(s[0]),
            i = u.exec(s[1]),
            k[this] = [t ? t[0] : 0, i ? i[0] : 0],
            e[this] = [d.exec(s[0])[0], d.exec(s[1])[0]]
        }),
        1 === x.length && (x[1] = x[0]),
        "right" === e.at[0] ? v.left += p : "center" === e.at[0] && (v.left += p / 2),
        "bottom" === e.at[1] ? v.top += m : "center" === e.at[1] && (v.top += m / 2),
        a = i(k.at, p, m),
        v.left += a[0],
        v.top += a[1],
        this.each(function() {
            var n, l, c = t(this), u = c.outerWidth(), d = c.outerHeight(), f = s(this, "marginLeft"), _ = s(this, "marginTop"), D = u + f + s(this, "marginRight") + w.width, T = d + _ + s(this, "marginBottom") + w.height, C = t.extend({}, v), M = i(k.my, c.outerWidth(), c.outerHeight());
            "right" === e.my[0] ? C.left -= u : "center" === e.my[0] && (C.left -= u / 2),
            "bottom" === e.my[1] ? C.top -= d : "center" === e.my[1] && (C.top -= d / 2),
            C.left += M[0],
            C.top += M[1],
            t.support.offsetFractions || (C.left = h(C.left),
            C.top = h(C.top)),
            n = {
                marginLeft: f,
                marginTop: _
            },
            t.each(["left", "top"], function(i, s) {
                t.ui.position[x[i]] && t.ui.position[x[i]][s](C, {
                    targetWidth: p,
                    targetHeight: m,
                    elemWidth: u,
                    elemHeight: d,
                    collisionPosition: n,
                    collisionWidth: D,
                    collisionHeight: T,
                    offset: [a[0] + M[0], a[1] + M[1]],
                    my: e.my,
                    at: e.at,
                    within: y,
                    elem: c
                })
            }),
            e.using && (l = function(t) {
                var i = g.left - C.left
                  , s = i + p - u
                  , n = g.top - C.top
                  , a = n + m - d
                  , h = {
                    target: {
                        element: b,
                        left: g.left,
                        top: g.top,
                        width: p,
                        height: m
                    },
                    element: {
                        element: c,
                        left: C.left,
                        top: C.top,
                        width: u,
                        height: d
                    },
                    horizontal: 0 > s ? "left" : i > 0 ? "right" : "center",
                    vertical: 0 > a ? "top" : n > 0 ? "bottom" : "middle"
                };
                u > p && p > r(i + s) && (h.horizontal = "center"),
                d > m && m > r(n + a) && (h.vertical = "middle"),
                h.important = o(r(i), r(s)) > o(r(n), r(a)) ? "horizontal" : "vertical",
                e.using.call(this, t, h)
            }
            ),
            c.offset(t.extend(C, {
                using: l
            }))
        })
    }
    ,
    t.ui.position = {
        fit: {
            left: function(t, e) {
                var i, s = e.within, n = s.isWindow ? s.scrollLeft : s.offset.left, a = s.width, r = t.left - e.collisionPosition.marginLeft, h = n - r, l = r + e.collisionWidth - a - n;
                e.collisionWidth > a ? h > 0 && 0 >= l ? (i = t.left + h + e.collisionWidth - a - n,
                t.left += h - i) : t.left = l > 0 && 0 >= h ? n : h > l ? n + a - e.collisionWidth : n : h > 0 ? t.left += h : l > 0 ? t.left -= l : t.left = o(t.left - r, t.left)
            },
            top: function(t, e) {
                var i, s = e.within, n = s.isWindow ? s.scrollTop : s.offset.top, a = e.within.height, r = t.top - e.collisionPosition.marginTop, h = n - r, l = r + e.collisionHeight - a - n;
                e.collisionHeight > a ? h > 0 && 0 >= l ? (i = t.top + h + e.collisionHeight - a - n,
                t.top += h - i) : t.top = l > 0 && 0 >= h ? n : h > l ? n + a - e.collisionHeight : n : h > 0 ? t.top += h : l > 0 ? t.top -= l : t.top = o(t.top - r, t.top)
            }
        },
        flip: {
            left: function(t, e) {
                var i, s, n = e.within, a = n.offset.left + n.scrollLeft, o = n.width, h = n.isWindow ? n.scrollLeft : n.offset.left, l = t.left - e.collisionPosition.marginLeft, c = l - h, u = l + e.collisionWidth - o - h, d = "left" === e.my[0] ? -e.elemWidth : "right" === e.my[0] ? e.elemWidth : 0, p = "left" === e.at[0] ? e.targetWidth : "right" === e.at[0] ? -e.targetWidth : 0, f = -2 * e.offset[0];
                0 > c ? (i = t.left + d + p + f + e.collisionWidth - o - a,
                (0 > i || r(c) > i) && (t.left += d + p + f)) : u > 0 && (s = t.left - e.collisionPosition.marginLeft + d + p + f - h,
                (s > 0 || u > r(s)) && (t.left += d + p + f))
            },
            top: function(t, e) {
                var i, s, n = e.within, a = n.offset.top + n.scrollTop, o = n.height, h = n.isWindow ? n.scrollTop : n.offset.top, l = t.top - e.collisionPosition.marginTop, c = l - h, u = l + e.collisionHeight - o - h, d = "top" === e.my[1], p = d ? -e.elemHeight : "bottom" === e.my[1] ? e.elemHeight : 0, f = "top" === e.at[1] ? e.targetHeight : "bottom" === e.at[1] ? -e.targetHeight : 0, m = -2 * e.offset[1];
                0 > c ? (s = t.top + p + f + m + e.collisionHeight - o - a,
                t.top + p + f + m > c && (0 > s || r(c) > s) && (t.top += p + f + m)) : u > 0 && (i = t.top - e.collisionPosition.marginTop + p + f + m - h,
                t.top + p + f + m > u && (i > 0 || u > r(i)) && (t.top += p + f + m))
            }
        },
        flipfit: {
            left: function() {
                t.ui.position.flip.left.apply(this, arguments),
                t.ui.position.fit.left.apply(this, arguments)
            },
            top: function() {
                t.ui.position.flip.top.apply(this, arguments),
                t.ui.position.fit.top.apply(this, arguments)
            }
        }
    },
    function() {
        var e, i, s, n, a, o = document.getElementsByTagName("body")[0], r = document.createElement("div");
        e = document.createElement(o ? "div" : "body"),
        s = {
            visibility: "hidden",
            width: 0,
            height: 0,
            border: 0,
            margin: 0,
            background: "none"
        },
        o && t.extend(s, {
            position: "absolute",
            left: "-1000px",
            top: "-1000px"
        });
        for (a in s)
            e.style[a] = s[a];
        e.appendChild(r),
        i = o || document.documentElement,
        i.insertBefore(e, i.firstChild),
        r.style.cssText = "position: absolute; left: 10.7432222px;",
        n = t(r).offset().left,
        t.support.offsetFractions = n > 10 && 11 > n,
        e.innerHTML = "",
        i.removeChild(e)
    }()
}
)(jQuery);

/* collective.js.jqueryui: jquery.ui.draggable.min.js */

/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(e) {
    e.widget("ui.draggable", e.ui.mouse, {
        version: "1.10.2",
        widgetEventPrefix: "drag",
        options: {
            addClasses: !0,
            appendTo: "parent",
            axis: !1,
            connectToSortable: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            iframeFix: !1,
            opacity: !1,
            refreshPositions: !1,
            revert: !1,
            revertDuration: 500,
            scope: "default",
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: !1,
            snapMode: "both",
            snapTolerance: 20,
            stack: !1,
            zIndex: !1,
            drag: null,
            start: null,
            stop: null
        },
        _create: function() {
            "original" !== this.options.helper || /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative"),
            this.options.addClasses && this.element.addClass("ui-draggable"),
            this.options.disabled && this.element.addClass("ui-draggable-disabled"),
            this._mouseInit()
        },
        _destroy: function() {
            this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),
            this._mouseDestroy()
        },
        _mouseCapture: function(t) {
            var i = this.options;
            return this.helper || i.disabled || e(t.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(t),
            this.handle ? (e(i.iframeFix === !0 ? "iframe" : i.iframeFix).each(function() {
                e("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({
                    width: this.offsetWidth + "px",
                    height: this.offsetHeight + "px",
                    position: "absolute",
                    opacity: "0.001",
                    zIndex: 1e3
                }).css(e(this).offset()).appendTo("body")
            }),
            !0) : !1)
        },
        _mouseStart: function(t) {
            var i = this.options;
            return this.helper = this._createHelper(t),
            this.helper.addClass("ui-draggable-dragging"),
            this._cacheHelperProportions(),
            e.ui.ddmanager && (e.ui.ddmanager.current = this),
            this._cacheMargins(),
            this.cssPosition = this.helper.css("position"),
            this.scrollParent = this.helper.scrollParent(),
            this.offset = this.positionAbs = this.element.offset(),
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            },
            e.extend(this.offset, {
                click: {
                    left: t.pageX - this.offset.left,
                    top: t.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            }),
            this.originalPosition = this.position = this._generatePosition(t),
            this.originalPageX = t.pageX,
            this.originalPageY = t.pageY,
            i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt),
            i.containment && this._setContainment(),
            this._trigger("start", t) === !1 ? (this._clear(),
            !1) : (this._cacheHelperProportions(),
            e.ui.ddmanager && !i.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t),
            this._mouseDrag(t, !0),
            e.ui.ddmanager && e.ui.ddmanager.dragStart(this, t),
            !0)
        },
        _mouseDrag: function(t, i) {
            if (this.position = this._generatePosition(t),
            this.positionAbs = this._convertPositionTo("absolute"),
            !i) {
                var s = this._uiHash();
                if (this._trigger("drag", t, s) === !1)
                    return this._mouseUp({}),
                    !1;
                this.position = s.position
            }
            return this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"),
            this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"),
            e.ui.ddmanager && e.ui.ddmanager.drag(this, t),
            !1
        },
        _mouseStop: function(t) {
            var i, s = this, n = !1, a = !1;
            for (e.ui.ddmanager && !this.options.dropBehaviour && (a = e.ui.ddmanager.drop(this, t)),
            this.dropped && (a = this.dropped,
            this.dropped = !1),
            i = this.element[0]; i && (i = i.parentNode); )
                i === document && (n = !0);
            return n || "original" !== this.options.helper ? ("invalid" === this.options.revert && !a || "valid" === this.options.revert && a || this.options.revert === !0 || e.isFunction(this.options.revert) && this.options.revert.call(this.element, a) ? e(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                s._trigger("stop", t) !== !1 && s._clear()
            }) : this._trigger("stop", t) !== !1 && this._clear(),
            !1) : !1
        },
        _mouseUp: function(t) {
            return e("div.ui-draggable-iframeFix").each(function() {
                this.parentNode.removeChild(this)
            }),
            e.ui.ddmanager && e.ui.ddmanager.dragStop(this, t),
            e.ui.mouse.prototype._mouseUp.call(this, t)
        },
        cancel: function() {
            return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(),
            this
        },
        _getHandle: function(t) {
            return this.options.handle ? !!e(t.target).closest(this.element.find(this.options.handle)).length : !0
        },
        _createHelper: function(t) {
            var i = this.options
              , s = e.isFunction(i.helper) ? e(i.helper.apply(this.element[0], [t])) : "clone" === i.helper ? this.element.clone().removeAttr("id") : this.element;
            return s.parents("body").length || s.appendTo("parent" === i.appendTo ? this.element[0].parentNode : i.appendTo),
            s[0] === this.element[0] || /(fixed|absolute)/.test(s.css("position")) || s.css("position", "absolute"),
            s
        },
        _adjustOffsetFromHelper: function(t) {
            "string" == typeof t && (t = t.split(" ")),
            e.isArray(t) && (t = {
                left: +t[0],
                top: +t[1] || 0
            }),
            "left"in t && (this.offset.click.left = t.left + this.margins.left),
            "right"in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left),
            "top"in t && (this.offset.click.top = t.top + this.margins.top),
            "bottom"in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var t = this.offsetParent.offset();
            return "absolute" === this.cssPosition && this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(),
            t.top += this.scrollParent.scrollTop()),
            (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && e.ui.ie) && (t = {
                top: 0,
                left: 0
            }),
            {
                top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if ("relative" === this.cssPosition) {
                var e = this.element.position();
                return {
                    top: e.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: e.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var t, i, s, n = this.options;
            if ("parent" === n.containment && (n.containment = this.helper[0].parentNode),
            ("document" === n.containment || "window" === n.containment) && (this.containment = ["document" === n.containment ? 0 : e(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, "document" === n.containment ? 0 : e(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, ("document" === n.containment ? 0 : e(window).scrollLeft()) + e("document" === n.containment ? document : window).width() - this.helperProportions.width - this.margins.left, ("document" === n.containment ? 0 : e(window).scrollTop()) + (e("document" === n.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]),
            /^(document|window|parent)$/.test(n.containment) || n.containment.constructor === Array)
                n.containment.constructor === Array && (this.containment = n.containment);
            else {
                if (i = e(n.containment),
                s = i[0],
                !s)
                    return;
                t = "hidden" !== e(s).css("overflow"),
                this.containment = [(parseInt(e(s).css("borderLeftWidth"), 10) || 0) + (parseInt(e(s).css("paddingLeft"), 10) || 0), (parseInt(e(s).css("borderTopWidth"), 10) || 0) + (parseInt(e(s).css("paddingTop"), 10) || 0), (t ? Math.max(s.scrollWidth, s.offsetWidth) : s.offsetWidth) - (parseInt(e(s).css("borderRightWidth"), 10) || 0) - (parseInt(e(s).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (t ? Math.max(s.scrollHeight, s.offsetHeight) : s.offsetHeight) - (parseInt(e(s).css("borderBottomWidth"), 10) || 0) - (parseInt(e(s).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom],
                this.relative_container = i
            }
        },
        _convertPositionTo: function(t, i) {
            i || (i = this.position);
            var s = "absolute" === t ? 1 : -1
              , n = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent
              , a = /(html|body)/i.test(n[0].tagName);
            return {
                top: i.top + this.offset.relative.top * s + this.offset.parent.top * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : a ? 0 : n.scrollTop()) * s,
                left: i.left + this.offset.relative.left * s + this.offset.parent.left * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : a ? 0 : n.scrollLeft()) * s
            }
        },
        _generatePosition: function(t) {
            var i, s, n, a, o = this.options, r = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, h = /(html|body)/i.test(r[0].tagName), l = t.pageX, u = t.pageY;
            return this.originalPosition && (this.containment && (this.relative_container ? (s = this.relative_container.offset(),
            i = [this.containment[0] + s.left, this.containment[1] + s.top, this.containment[2] + s.left, this.containment[3] + s.top]) : i = this.containment,
            t.pageX - this.offset.click.left < i[0] && (l = i[0] + this.offset.click.left),
            t.pageY - this.offset.click.top < i[1] && (u = i[1] + this.offset.click.top),
            t.pageX - this.offset.click.left > i[2] && (l = i[2] + this.offset.click.left),
            t.pageY - this.offset.click.top > i[3] && (u = i[3] + this.offset.click.top)),
            o.grid && (n = o.grid[1] ? this.originalPageY + Math.round((u - this.originalPageY) / o.grid[1]) * o.grid[1] : this.originalPageY,
            u = i ? n - this.offset.click.top >= i[1] || n - this.offset.click.top > i[3] ? n : n - this.offset.click.top >= i[1] ? n - o.grid[1] : n + o.grid[1] : n,
            a = o.grid[0] ? this.originalPageX + Math.round((l - this.originalPageX) / o.grid[0]) * o.grid[0] : this.originalPageX,
            l = i ? a - this.offset.click.left >= i[0] || a - this.offset.click.left > i[2] ? a : a - this.offset.click.left >= i[0] ? a - o.grid[0] : a + o.grid[0] : a)),
            {
                top: u - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : h ? 0 : r.scrollTop()),
                left: l - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : h ? 0 : r.scrollLeft())
            }
        },
        _clear: function() {
            this.helper.removeClass("ui-draggable-dragging"),
            this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(),
            this.helper = null,
            this.cancelHelperRemoval = !1
        },
        _trigger: function(t, i, s) {
            return s = s || this._uiHash(),
            e.ui.plugin.call(this, t, [i, s]),
            "drag" === t && (this.positionAbs = this._convertPositionTo("absolute")),
            e.Widget.prototype._trigger.call(this, t, i, s)
        },
        plugins: {},
        _uiHash: function() {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    }),
    e.ui.plugin.add("draggable", "connectToSortable", {
        start: function(t, i) {
            var s = e(this).data("ui-draggable")
              , n = s.options
              , a = e.extend({}, i, {
                item: s.element
            });
            s.sortables = [],
            e(n.connectToSortable).each(function() {
                var i = e.data(this, "ui-sortable");
                i && !i.options.disabled && (s.sortables.push({
                    instance: i,
                    shouldRevert: i.options.revert
                }),
                i.refreshPositions(),
                i._trigger("activate", t, a))
            })
        },
        stop: function(t, i) {
            var s = e(this).data("ui-draggable")
              , n = e.extend({}, i, {
                item: s.element
            });
            e.each(s.sortables, function() {
                this.instance.isOver ? (this.instance.isOver = 0,
                s.cancelHelperRemoval = !0,
                this.instance.cancelHelperRemoval = !1,
                this.shouldRevert && (this.instance.options.revert = this.shouldRevert),
                this.instance._mouseStop(t),
                this.instance.options.helper = this.instance.options._helper,
                "original" === s.options.helper && this.instance.currentItem.css({
                    top: "auto",
                    left: "auto"
                })) : (this.instance.cancelHelperRemoval = !1,
                this.instance._trigger("deactivate", t, n))
            })
        },
        drag: function(t, i) {
            var s = e(this).data("ui-draggable")
              , n = this;
            e.each(s.sortables, function() {
                var a = !1
                  , o = this;
                this.instance.positionAbs = s.positionAbs,
                this.instance.helperProportions = s.helperProportions,
                this.instance.offset.click = s.offset.click,
                this.instance._intersectsWith(this.instance.containerCache) && (a = !0,
                e.each(s.sortables, function() {
                    return this.instance.positionAbs = s.positionAbs,
                    this.instance.helperProportions = s.helperProportions,
                    this.instance.offset.click = s.offset.click,
                    this !== o && this.instance._intersectsWith(this.instance.containerCache) && e.contains(o.instance.element[0], this.instance.element[0]) && (a = !1),
                    a
                })),
                a ? (this.instance.isOver || (this.instance.isOver = 1,
                this.instance.currentItem = e(n).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item", !0),
                this.instance.options._helper = this.instance.options.helper,
                this.instance.options.helper = function() {
                    return i.helper[0]
                }
                ,
                t.target = this.instance.currentItem[0],
                this.instance._mouseCapture(t, !0),
                this.instance._mouseStart(t, !0, !0),
                this.instance.offset.click.top = s.offset.click.top,
                this.instance.offset.click.left = s.offset.click.left,
                this.instance.offset.parent.left -= s.offset.parent.left - this.instance.offset.parent.left,
                this.instance.offset.parent.top -= s.offset.parent.top - this.instance.offset.parent.top,
                s._trigger("toSortable", t),
                s.dropped = this.instance.element,
                s.currentItem = s.element,
                this.instance.fromOutside = s),
                this.instance.currentItem && this.instance._mouseDrag(t)) : this.instance.isOver && (this.instance.isOver = 0,
                this.instance.cancelHelperRemoval = !0,
                this.instance.options.revert = !1,
                this.instance._trigger("out", t, this.instance._uiHash(this.instance)),
                this.instance._mouseStop(t, !0),
                this.instance.options.helper = this.instance.options._helper,
                this.instance.currentItem.remove(),
                this.instance.placeholder && this.instance.placeholder.remove(),
                s._trigger("fromSortable", t),
                s.dropped = !1)
            })
        }
    }),
    e.ui.plugin.add("draggable", "cursor", {
        start: function() {
            var t = e("body")
              , i = e(this).data("ui-draggable").options;
            t.css("cursor") && (i._cursor = t.css("cursor")),
            t.css("cursor", i.cursor)
        },
        stop: function() {
            var t = e(this).data("ui-draggable").options;
            t._cursor && e("body").css("cursor", t._cursor)
        }
    }),
    e.ui.plugin.add("draggable", "opacity", {
        start: function(t, i) {
            var s = e(i.helper)
              , n = e(this).data("ui-draggable").options;
            s.css("opacity") && (n._opacity = s.css("opacity")),
            s.css("opacity", n.opacity)
        },
        stop: function(t, i) {
            var s = e(this).data("ui-draggable").options;
            s._opacity && e(i.helper).css("opacity", s._opacity)
        }
    }),
    e.ui.plugin.add("draggable", "scroll", {
        start: function() {
            var t = e(this).data("ui-draggable");
            t.scrollParent[0] !== document && "HTML" !== t.scrollParent[0].tagName && (t.overflowOffset = t.scrollParent.offset())
        },
        drag: function(t) {
            var i = e(this).data("ui-draggable")
              , s = i.options
              , n = !1;
            i.scrollParent[0] !== document && "HTML" !== i.scrollParent[0].tagName ? (s.axis && "x" === s.axis || (i.overflowOffset.top + i.scrollParent[0].offsetHeight - t.pageY < s.scrollSensitivity ? i.scrollParent[0].scrollTop = n = i.scrollParent[0].scrollTop + s.scrollSpeed : t.pageY - i.overflowOffset.top < s.scrollSensitivity && (i.scrollParent[0].scrollTop = n = i.scrollParent[0].scrollTop - s.scrollSpeed)),
            s.axis && "y" === s.axis || (i.overflowOffset.left + i.scrollParent[0].offsetWidth - t.pageX < s.scrollSensitivity ? i.scrollParent[0].scrollLeft = n = i.scrollParent[0].scrollLeft + s.scrollSpeed : t.pageX - i.overflowOffset.left < s.scrollSensitivity && (i.scrollParent[0].scrollLeft = n = i.scrollParent[0].scrollLeft - s.scrollSpeed))) : (s.axis && "x" === s.axis || (t.pageY - e(document).scrollTop() < s.scrollSensitivity ? n = e(document).scrollTop(e(document).scrollTop() - s.scrollSpeed) : e(window).height() - (t.pageY - e(document).scrollTop()) < s.scrollSensitivity && (n = e(document).scrollTop(e(document).scrollTop() + s.scrollSpeed))),
            s.axis && "y" === s.axis || (t.pageX - e(document).scrollLeft() < s.scrollSensitivity ? n = e(document).scrollLeft(e(document).scrollLeft() - s.scrollSpeed) : e(window).width() - (t.pageX - e(document).scrollLeft()) < s.scrollSensitivity && (n = e(document).scrollLeft(e(document).scrollLeft() + s.scrollSpeed)))),
            n !== !1 && e.ui.ddmanager && !s.dropBehaviour && e.ui.ddmanager.prepareOffsets(i, t)
        }
    }),
    e.ui.plugin.add("draggable", "snap", {
        start: function() {
            var t = e(this).data("ui-draggable")
              , i = t.options;
            t.snapElements = [],
            e(i.snap.constructor !== String ? i.snap.items || ":data(ui-draggable)" : i.snap).each(function() {
                var i = e(this)
                  , s = i.offset();
                this !== t.element[0] && t.snapElements.push({
                    item: this,
                    width: i.outerWidth(),
                    height: i.outerHeight(),
                    top: s.top,
                    left: s.left
                })
            })
        },
        drag: function(t, i) {
            var s, n, a, o, r, h, l, u, c, d, p = e(this).data("ui-draggable"), f = p.options, m = f.snapTolerance, g = i.offset.left, v = g + p.helperProportions.width, y = i.offset.top, b = y + p.helperProportions.height;
            for (c = p.snapElements.length - 1; c >= 0; c--)
                r = p.snapElements[c].left,
                h = r + p.snapElements[c].width,
                l = p.snapElements[c].top,
                u = l + p.snapElements[c].height,
                g > r - m && h + m > g && y > l - m && u + m > y || g > r - m && h + m > g && b > l - m && u + m > b || v > r - m && h + m > v && y > l - m && u + m > y || v > r - m && h + m > v && b > l - m && u + m > b ? ("inner" !== f.snapMode && (s = m >= Math.abs(l - b),
                n = m >= Math.abs(u - y),
                a = m >= Math.abs(r - v),
                o = m >= Math.abs(h - g),
                s && (i.position.top = p._convertPositionTo("relative", {
                    top: l - p.helperProportions.height,
                    left: 0
                }).top - p.margins.top),
                n && (i.position.top = p._convertPositionTo("relative", {
                    top: u,
                    left: 0
                }).top - p.margins.top),
                a && (i.position.left = p._convertPositionTo("relative", {
                    top: 0,
                    left: r - p.helperProportions.width
                }).left - p.margins.left),
                o && (i.position.left = p._convertPositionTo("relative", {
                    top: 0,
                    left: h
                }).left - p.margins.left)),
                d = s || n || a || o,
                "outer" !== f.snapMode && (s = m >= Math.abs(l - y),
                n = m >= Math.abs(u - b),
                a = m >= Math.abs(r - g),
                o = m >= Math.abs(h - v),
                s && (i.position.top = p._convertPositionTo("relative", {
                    top: l,
                    left: 0
                }).top - p.margins.top),
                n && (i.position.top = p._convertPositionTo("relative", {
                    top: u - p.helperProportions.height,
                    left: 0
                }).top - p.margins.top),
                a && (i.position.left = p._convertPositionTo("relative", {
                    top: 0,
                    left: r
                }).left - p.margins.left),
                o && (i.position.left = p._convertPositionTo("relative", {
                    top: 0,
                    left: h - p.helperProportions.width
                }).left - p.margins.left)),
                !p.snapElements[c].snapping && (s || n || a || o || d) && p.options.snap.snap && p.options.snap.snap.call(p.element, t, e.extend(p._uiHash(), {
                    snapItem: p.snapElements[c].item
                })),
                p.snapElements[c].snapping = s || n || a || o || d) : (p.snapElements[c].snapping && p.options.snap.release && p.options.snap.release.call(p.element, t, e.extend(p._uiHash(), {
                    snapItem: p.snapElements[c].item
                })),
                p.snapElements[c].snapping = !1)
        }
    }),
    e.ui.plugin.add("draggable", "stack", {
        start: function() {
            var t, i = this.data("ui-draggable").options, s = e.makeArray(e(i.stack)).sort(function(t, i) {
                return (parseInt(e(t).css("zIndex"), 10) || 0) - (parseInt(e(i).css("zIndex"), 10) || 0)
            });
            s.length && (t = parseInt(e(s[0]).css("zIndex"), 10) || 0,
            e(s).each(function(i) {
                e(this).css("zIndex", t + i)
            }),
            this.css("zIndex", t + s.length))
        }
    }),
    e.ui.plugin.add("draggable", "zIndex", {
        start: function(t, i) {
            var s = e(i.helper)
              , n = e(this).data("ui-draggable").options;
            s.css("zIndex") && (n._zIndex = s.css("zIndex")),
            s.css("zIndex", n.zIndex)
        },
        stop: function(t, i) {
            var s = e(this).data("ui-draggable").options;
            s._zIndex && e(i.helper).css("zIndex", s._zIndex)
        }
    })
}
)(jQuery);

/* collective.js.jqueryui: jquery.ui.droppable.min.js */

/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(e) {
    function t(e, t, i) {
        return e > t && t + i > e
    }
    e.widget("ui.droppable", {
        version: "1.10.2",
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            activeClass: !1,
            addClasses: !0,
            greedy: !1,
            hoverClass: !1,
            scope: "default",
            tolerance: "intersect",
            activate: null,
            deactivate: null,
            drop: null,
            out: null,
            over: null
        },
        _create: function() {
            var t = this.options
              , i = t.accept;
            this.isover = !1,
            this.isout = !0,
            this.accept = e.isFunction(i) ? i : function(e) {
                return e.is(i)
            }
            ,
            this.proportions = {
                width: this.element[0].offsetWidth,
                height: this.element[0].offsetHeight
            },
            e.ui.ddmanager.droppables[t.scope] = e.ui.ddmanager.droppables[t.scope] || [],
            e.ui.ddmanager.droppables[t.scope].push(this),
            t.addClasses && this.element.addClass("ui-droppable")
        },
        _destroy: function() {
            for (var t = 0, i = e.ui.ddmanager.droppables[this.options.scope]; i.length > t; t++)
                i[t] === this && i.splice(t, 1);
            this.element.removeClass("ui-droppable ui-droppable-disabled")
        },
        _setOption: function(t, i) {
            "accept" === t && (this.accept = e.isFunction(i) ? i : function(e) {
                return e.is(i)
            }
            ),
            e.Widget.prototype._setOption.apply(this, arguments)
        },
        _activate: function(t) {
            var i = e.ui.ddmanager.current;
            this.options.activeClass && this.element.addClass(this.options.activeClass),
            i && this._trigger("activate", t, this.ui(i))
        },
        _deactivate: function(t) {
            var i = e.ui.ddmanager.current;
            this.options.activeClass && this.element.removeClass(this.options.activeClass),
            i && this._trigger("deactivate", t, this.ui(i))
        },
        _over: function(t) {
            var i = e.ui.ddmanager.current;
            i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass),
            this._trigger("over", t, this.ui(i)))
        },
        _out: function(t) {
            var i = e.ui.ddmanager.current;
            i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass),
            this._trigger("out", t, this.ui(i)))
        },
        _drop: function(t, i) {
            var s = i || e.ui.ddmanager.current
              , n = !1;
            return s && (s.currentItem || s.element)[0] !== this.element[0] ? (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() {
                var t = e.data(this, "ui-droppable");
                return t.options.greedy && !t.options.disabled && t.options.scope === s.options.scope && t.accept.call(t.element[0], s.currentItem || s.element) && e.ui.intersect(s, e.extend(t, {
                    offset: t.element.offset()
                }), t.options.tolerance) ? (n = !0,
                !1) : undefined
            }),
            n ? !1 : this.accept.call(this.element[0], s.currentItem || s.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass),
            this.options.hoverClass && this.element.removeClass(this.options.hoverClass),
            this._trigger("drop", t, this.ui(s)),
            this.element) : !1) : !1
        },
        ui: function(e) {
            return {
                draggable: e.currentItem || e.element,
                helper: e.helper,
                position: e.position,
                offset: e.positionAbs
            }
        }
    }),
    e.ui.intersect = function(e, i, s) {
        if (!i.offset)
            return !1;
        var n, a, o = (e.positionAbs || e.position.absolute).left, r = o + e.helperProportions.width, h = (e.positionAbs || e.position.absolute).top, l = h + e.helperProportions.height, u = i.offset.left, c = u + i.proportions.width, d = i.offset.top, p = d + i.proportions.height;
        switch (s) {
        case "fit":
            return o >= u && c >= r && h >= d && p >= l;
        case "intersect":
            return o + e.helperProportions.width / 2 > u && c > r - e.helperProportions.width / 2 && h + e.helperProportions.height / 2 > d && p > l - e.helperProportions.height / 2;
        case "pointer":
            return n = (e.positionAbs || e.position.absolute).left + (e.clickOffset || e.offset.click).left,
            a = (e.positionAbs || e.position.absolute).top + (e.clickOffset || e.offset.click).top,
            t(a, d, i.proportions.height) && t(n, u, i.proportions.width);
        case "touch":
            return (h >= d && p >= h || l >= d && p >= l || d > h && l > p) && (o >= u && c >= o || r >= u && c >= r || u > o && r > c);
        default:
            return !1
        }
    }
    ,
    e.ui.ddmanager = {
        current: null,
        droppables: {
            "default": []
        },
        prepareOffsets: function(t, i) {
            var s, n, a = e.ui.ddmanager.droppables[t.options.scope] || [], o = i ? i.type : null, r = (t.currentItem || t.element).find(":data(ui-droppable)").addBack();
            e: for (s = 0; a.length > s; s++)
                if (!(a[s].options.disabled || t && !a[s].accept.call(a[s].element[0], t.currentItem || t.element))) {
                    for (n = 0; r.length > n; n++)
                        if (r[n] === a[s].element[0]) {
                            a[s].proportions.height = 0;
                            continue e
                        }
                    a[s].visible = "none" !== a[s].element.css("display"),
                    a[s].visible && ("mousedown" === o && a[s]._activate.call(a[s], i),
                    a[s].offset = a[s].element.offset(),
                    a[s].proportions = {
                        width: a[s].element[0].offsetWidth,
                        height: a[s].element[0].offsetHeight
                    })
                }
        },
        drop: function(t, i) {
            var s = !1;
            return e.each((e.ui.ddmanager.droppables[t.options.scope] || []).slice(), function() {
                this.options && (!this.options.disabled && this.visible && e.ui.intersect(t, this, this.options.tolerance) && (s = this._drop.call(this, i) || s),
                !this.options.disabled && this.visible && this.accept.call(this.element[0], t.currentItem || t.element) && (this.isout = !0,
                this.isover = !1,
                this._deactivate.call(this, i)))
            }),
            s
        },
        dragStart: function(t, i) {
            t.element.parentsUntil("body").bind("scroll.droppable", function() {
                t.options.refreshPositions || e.ui.ddmanager.prepareOffsets(t, i)
            })
        },
        drag: function(t, i) {
            t.options.refreshPositions && e.ui.ddmanager.prepareOffsets(t, i),
            e.each(e.ui.ddmanager.droppables[t.options.scope] || [], function() {
                if (!this.options.disabled && !this.greedyChild && this.visible) {
                    var s, n, a, o = e.ui.intersect(t, this, this.options.tolerance), r = !o && this.isover ? "isout" : o && !this.isover ? "isover" : null;
                    r && (this.options.greedy && (n = this.options.scope,
                    a = this.element.parents(":data(ui-droppable)").filter(function() {
                        return e.data(this, "ui-droppable").options.scope === n
                    }),
                    a.length && (s = e.data(a[0], "ui-droppable"),
                    s.greedyChild = "isover" === r)),
                    s && "isover" === r && (s.isover = !1,
                    s.isout = !0,
                    s._out.call(s, i)),
                    this[r] = !0,
                    this["isout" === r ? "isover" : "isout"] = !1,
                    this["isover" === r ? "_over" : "_out"].call(this, i),
                    s && "isout" === r && (s.isout = !1,
                    s.isover = !0,
                    s._over.call(s, i)))
                }
            })
        },
        dragStop: function(t, i) {
            t.element.parentsUntil("body").unbind("scroll.droppable"),
            t.options.refreshPositions || e.ui.ddmanager.prepareOffsets(t, i)
        }
    }
}
)(jQuery);

/* collective.js.jqueryui: jquery.ui.selectable.min.js */

/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(e) {
    e.widget("ui.selectable", e.ui.mouse, {
        version: "1.10.2",
        options: {
            appendTo: "body",
            autoRefresh: !0,
            distance: 0,
            filter: "*",
            tolerance: "touch",
            selected: null,
            selecting: null,
            start: null,
            stop: null,
            unselected: null,
            unselecting: null
        },
        _create: function() {
            var t, i = this;
            this.element.addClass("ui-selectable"),
            this.dragged = !1,
            this.refresh = function() {
                t = e(i.options.filter, i.element[0]),
                t.addClass("ui-selectee"),
                t.each(function() {
                    var t = e(this)
                      , i = t.offset();
                    e.data(this, "selectable-item", {
                        element: this,
                        $element: t,
                        left: i.left,
                        top: i.top,
                        right: i.left + t.outerWidth(),
                        bottom: i.top + t.outerHeight(),
                        startselected: !1,
                        selected: t.hasClass("ui-selected"),
                        selecting: t.hasClass("ui-selecting"),
                        unselecting: t.hasClass("ui-unselecting")
                    })
                })
            }
            ,
            this.refresh(),
            this.selectees = t.addClass("ui-selectee"),
            this._mouseInit(),
            this.helper = e("<div class='ui-selectable-helper'></div>")
        },
        _destroy: function() {
            this.selectees.removeClass("ui-selectee").removeData("selectable-item"),
            this.element.removeClass("ui-selectable ui-selectable-disabled"),
            this._mouseDestroy()
        },
        _mouseStart: function(t) {
            var i = this
              , s = this.options;
            this.opos = [t.pageX, t.pageY],
            this.options.disabled || (this.selectees = e(s.filter, this.element[0]),
            this._trigger("start", t),
            e(s.appendTo).append(this.helper),
            this.helper.css({
                left: t.pageX,
                top: t.pageY,
                width: 0,
                height: 0
            }),
            s.autoRefresh && this.refresh(),
            this.selectees.filter(".ui-selected").each(function() {
                var s = e.data(this, "selectable-item");
                s.startselected = !0,
                t.metaKey || t.ctrlKey || (s.$element.removeClass("ui-selected"),
                s.selected = !1,
                s.$element.addClass("ui-unselecting"),
                s.unselecting = !0,
                i._trigger("unselecting", t, {
                    unselecting: s.element
                }))
            }),
            e(t.target).parents().addBack().each(function() {
                var s, n = e.data(this, "selectable-item");
                return n ? (s = !t.metaKey && !t.ctrlKey || !n.$element.hasClass("ui-selected"),
                n.$element.removeClass(s ? "ui-unselecting" : "ui-selected").addClass(s ? "ui-selecting" : "ui-unselecting"),
                n.unselecting = !s,
                n.selecting = s,
                n.selected = s,
                s ? i._trigger("selecting", t, {
                    selecting: n.element
                }) : i._trigger("unselecting", t, {
                    unselecting: n.element
                }),
                !1) : undefined
            }))
        },
        _mouseDrag: function(t) {
            if (this.dragged = !0,
            !this.options.disabled) {
                var i, s = this, n = this.options, a = this.opos[0], o = this.opos[1], r = t.pageX, h = t.pageY;
                return a > r && (i = r,
                r = a,
                a = i),
                o > h && (i = h,
                h = o,
                o = i),
                this.helper.css({
                    left: a,
                    top: o,
                    width: r - a,
                    height: h - o
                }),
                this.selectees.each(function() {
                    var i = e.data(this, "selectable-item")
                      , l = !1;
                    i && i.element !== s.element[0] && ("touch" === n.tolerance ? l = !(i.left > r || a > i.right || i.top > h || o > i.bottom) : "fit" === n.tolerance && (l = i.left > a && r > i.right && i.top > o && h > i.bottom),
                    l ? (i.selected && (i.$element.removeClass("ui-selected"),
                    i.selected = !1),
                    i.unselecting && (i.$element.removeClass("ui-unselecting"),
                    i.unselecting = !1),
                    i.selecting || (i.$element.addClass("ui-selecting"),
                    i.selecting = !0,
                    s._trigger("selecting", t, {
                        selecting: i.element
                    }))) : (i.selecting && ((t.metaKey || t.ctrlKey) && i.startselected ? (i.$element.removeClass("ui-selecting"),
                    i.selecting = !1,
                    i.$element.addClass("ui-selected"),
                    i.selected = !0) : (i.$element.removeClass("ui-selecting"),
                    i.selecting = !1,
                    i.startselected && (i.$element.addClass("ui-unselecting"),
                    i.unselecting = !0),
                    s._trigger("unselecting", t, {
                        unselecting: i.element
                    }))),
                    i.selected && (t.metaKey || t.ctrlKey || i.startselected || (i.$element.removeClass("ui-selected"),
                    i.selected = !1,
                    i.$element.addClass("ui-unselecting"),
                    i.unselecting = !0,
                    s._trigger("unselecting", t, {
                        unselecting: i.element
                    })))))
                }),
                !1
            }
        },
        _mouseStop: function(t) {
            var i = this;
            return this.dragged = !1,
            e(".ui-unselecting", this.element[0]).each(function() {
                var s = e.data(this, "selectable-item");
                s.$element.removeClass("ui-unselecting"),
                s.unselecting = !1,
                s.startselected = !1,
                i._trigger("unselected", t, {
                    unselected: s.element
                })
            }),
            e(".ui-selecting", this.element[0]).each(function() {
                var s = e.data(this, "selectable-item");
                s.$element.removeClass("ui-selecting").addClass("ui-selected"),
                s.selecting = !1,
                s.selected = !0,
                s.startselected = !0,
                i._trigger("selected", t, {
                    selected: s.element
                })
            }),
            this._trigger("stop", t),
            this.helper.remove(),
            !1
        }
    })
}
)(jQuery);

/* collective.js.jqueryui: jquery.ui.sortable.min.js */

/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(t) {
    function e(t, e, i) {
        return t > e && e + i > t
    }
    function i(t) {
        return /left|right/.test(t.css("float")) || /inline|table-cell/.test(t.css("display"))
    }
    t.widget("ui.sortable", t.ui.mouse, {
        version: "1.10.2",
        widgetEventPrefix: "sort",
        ready: !1,
        options: {
            appendTo: "parent",
            axis: !1,
            connectWith: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            dropOnEmpty: !0,
            forcePlaceholderSize: !1,
            forceHelperSize: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            items: "> *",
            opacity: !1,
            placeholder: !1,
            revert: !1,
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1e3,
            activate: null,
            beforeStop: null,
            change: null,
            deactivate: null,
            out: null,
            over: null,
            receive: null,
            remove: null,
            sort: null,
            start: null,
            stop: null,
            update: null
        },
        _create: function() {
            var t = this.options;
            this.containerCache = {},
            this.element.addClass("ui-sortable"),
            this.refresh(),
            this.floating = this.items.length ? "x" === t.axis || i(this.items[0].item) : !1,
            this.offset = this.element.offset(),
            this._mouseInit(),
            this.ready = !0
        },
        _destroy: function() {
            this.element.removeClass("ui-sortable ui-sortable-disabled"),
            this._mouseDestroy();
            for (var t = this.items.length - 1; t >= 0; t--)
                this.items[t].item.removeData(this.widgetName + "-item");
            return this
        },
        _setOption: function(e, i) {
            "disabled" === e ? (this.options[e] = i,
            this.widget().toggleClass("ui-sortable-disabled", !!i)) : t.Widget.prototype._setOption.apply(this, arguments)
        },
        _mouseCapture: function(e, i) {
            var s = null
              , n = !1
              , a = this;
            return this.reverting ? !1 : this.options.disabled || "static" === this.options.type ? !1 : (this._refreshItems(e),
            t(e.target).parents().each(function() {
                return t.data(this, a.widgetName + "-item") === a ? (s = t(this),
                !1) : undefined
            }),
            t.data(e.target, a.widgetName + "-item") === a && (s = t(e.target)),
            s ? !this.options.handle || i || (t(this.options.handle, s).find("*").addBack().each(function() {
                this === e.target && (n = !0)
            }),
            n) ? (this.currentItem = s,
            this._removeCurrentsFromItems(),
            !0) : !1 : !1)
        },
        _mouseStart: function(e, i, s) {
            var n, a, o = this.options;
            if (this.currentContainer = this,
            this.refreshPositions(),
            this.helper = this._createHelper(e),
            this._cacheHelperProportions(),
            this._cacheMargins(),
            this.scrollParent = this.helper.scrollParent(),
            this.offset = this.currentItem.offset(),
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            },
            t.extend(this.offset, {
                click: {
                    left: e.pageX - this.offset.left,
                    top: e.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            }),
            this.helper.css("position", "absolute"),
            this.cssPosition = this.helper.css("position"),
            this.originalPosition = this._generatePosition(e),
            this.originalPageX = e.pageX,
            this.originalPageY = e.pageY,
            o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt),
            this.domPosition = {
                prev: this.currentItem.prev()[0],
                parent: this.currentItem.parent()[0]
            },
            this.helper[0] !== this.currentItem[0] && this.currentItem.hide(),
            this._createPlaceholder(),
            o.containment && this._setContainment(),
            o.cursor && "auto" !== o.cursor && (a = this.document.find("body"),
            this.storedCursor = a.css("cursor"),
            a.css("cursor", o.cursor),
            this.storedStylesheet = t("<style>*{ cursor: " + o.cursor + " !important; }</style>").appendTo(a)),
            o.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")),
            this.helper.css("opacity", o.opacity)),
            o.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")),
            this.helper.css("zIndex", o.zIndex)),
            this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()),
            this._trigger("start", e, this._uiHash()),
            this._preserveHelperProportions || this._cacheHelperProportions(),
            !s)
                for (n = this.containers.length - 1; n >= 0; n--)
                    this.containers[n]._trigger("activate", e, this._uiHash(this));
            return t.ui.ddmanager && (t.ui.ddmanager.current = this),
            t.ui.ddmanager && !o.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e),
            this.dragging = !0,
            this.helper.addClass("ui-sortable-helper"),
            this._mouseDrag(e),
            !0
        },
        _mouseDrag: function(e) {
            var i, s, n, a, o = this.options, r = !1;
            for (this.position = this._generatePosition(e),
            this.positionAbs = this._convertPositionTo("absolute"),
            this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs),
            this.options.scroll && (this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - e.pageY < o.scrollSensitivity ? this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop + o.scrollSpeed : e.pageY - this.overflowOffset.top < o.scrollSensitivity && (this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop - o.scrollSpeed),
            this.overflowOffset.left + this.scrollParent[0].offsetWidth - e.pageX < o.scrollSensitivity ? this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft + o.scrollSpeed : e.pageX - this.overflowOffset.left < o.scrollSensitivity && (this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft - o.scrollSpeed)) : (e.pageY - t(document).scrollTop() < o.scrollSensitivity ? r = t(document).scrollTop(t(document).scrollTop() - o.scrollSpeed) : t(window).height() - (e.pageY - t(document).scrollTop()) < o.scrollSensitivity && (r = t(document).scrollTop(t(document).scrollTop() + o.scrollSpeed)),
            e.pageX - t(document).scrollLeft() < o.scrollSensitivity ? r = t(document).scrollLeft(t(document).scrollLeft() - o.scrollSpeed) : t(window).width() - (e.pageX - t(document).scrollLeft()) < o.scrollSensitivity && (r = t(document).scrollLeft(t(document).scrollLeft() + o.scrollSpeed))),
            r !== !1 && t.ui.ddmanager && !o.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e)),
            this.positionAbs = this._convertPositionTo("absolute"),
            this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"),
            this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"),
            i = this.items.length - 1; i >= 0; i--)
                if (s = this.items[i],
                n = s.item[0],
                a = this._intersectsWithPointer(s),
                a && s.instance === this.currentContainer && n !== this.currentItem[0] && this.placeholder[1 === a ? "next" : "prev"]()[0] !== n && !t.contains(this.placeholder[0], n) && ("semi-dynamic" === this.options.type ? !t.contains(this.element[0], n) : !0)) {
                    if (this.direction = 1 === a ? "down" : "up",
                    "pointer" !== this.options.tolerance && !this._intersectsWithSides(s))
                        break;
                    this._rearrange(e, s),
                    this._trigger("change", e, this._uiHash());
                    break
                }
            return this._contactContainers(e),
            t.ui.ddmanager && t.ui.ddmanager.drag(this, e),
            this._trigger("sort", e, this._uiHash()),
            this.lastPositionAbs = this.positionAbs,
            !1
        },
        _mouseStop: function(e, i) {
            if (e) {
                if (t.ui.ddmanager && !this.options.dropBehaviour && t.ui.ddmanager.drop(this, e),
                this.options.revert) {
                    var s = this
                      , n = this.placeholder.offset()
                      , a = this.options.axis
                      , o = {};
                    a && "x" !== a || (o.left = n.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollLeft)),
                    a && "y" !== a || (o.top = n.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop)),
                    this.reverting = !0,
                    t(this.helper).animate(o, parseInt(this.options.revert, 10) || 500, function() {
                        s._clear(e)
                    })
                } else
                    this._clear(e, i);
                return !1
            }
        },
        cancel: function() {
            if (this.dragging) {
                this._mouseUp({
                    target: null
                }),
                "original" === this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
                for (var e = this.containers.length - 1; e >= 0; e--)
                    this.containers[e]._trigger("deactivate", null, this._uiHash(this)),
                    this.containers[e].containerCache.over && (this.containers[e]._trigger("out", null, this._uiHash(this)),
                    this.containers[e].containerCache.over = 0)
            }
            return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
            "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(),
            t.extend(this, {
                helper: null,
                dragging: !1,
                reverting: !1,
                _noFinalSort: null
            }),
            this.domPosition.prev ? t(this.domPosition.prev).after(this.currentItem) : t(this.domPosition.parent).prepend(this.currentItem)),
            this
        },
        serialize: function(e) {
            var i = this._getItemsAsjQuery(e && e.connected)
              , s = [];
            return e = e || {},
            t(i).each(function() {
                var i = (t(e.item || this).attr(e.attribute || "id") || "").match(e.expression || /(.+)[\-=_](.+)/);
                i && s.push((e.key || i[1] + "[]") + "=" + (e.key && e.expression ? i[1] : i[2]))
            }),
            !s.length && e.key && s.push(e.key + "="),
            s.join("&")
        },
        toArray: function(e) {
            var i = this._getItemsAsjQuery(e && e.connected)
              , s = [];
            return e = e || {},
            i.each(function() {
                s.push(t(e.item || this).attr(e.attribute || "id") || "")
            }),
            s
        },
        _intersectsWith: function(t) {
            var e = this.positionAbs.left
              , i = e + this.helperProportions.width
              , s = this.positionAbs.top
              , n = s + this.helperProportions.height
              , a = t.left
              , o = a + t.width
              , r = t.top
              , h = r + t.height
              , l = this.offset.click.top
              , c = this.offset.click.left
              , u = s + l > r && h > s + l && e + c > a && o > e + c;
            return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > t[this.floating ? "width" : "height"] ? u : e + this.helperProportions.width / 2 > a && o > i - this.helperProportions.width / 2 && s + this.helperProportions.height / 2 > r && h > n - this.helperProportions.height / 2
        },
        _intersectsWithPointer: function(t) {
            var i = "x" === this.options.axis || e(this.positionAbs.top + this.offset.click.top, t.top, t.height)
              , s = "y" === this.options.axis || e(this.positionAbs.left + this.offset.click.left, t.left, t.width)
              , n = i && s
              , a = this._getDragVerticalDirection()
              , o = this._getDragHorizontalDirection();
            return n ? this.floating ? o && "right" === o || "down" === a ? 2 : 1 : a && ("down" === a ? 2 : 1) : !1
        },
        _intersectsWithSides: function(t) {
            var i = e(this.positionAbs.top + this.offset.click.top, t.top + t.height / 2, t.height)
              , s = e(this.positionAbs.left + this.offset.click.left, t.left + t.width / 2, t.width)
              , n = this._getDragVerticalDirection()
              , a = this._getDragHorizontalDirection();
            return this.floating && a ? "right" === a && s || "left" === a && !s : n && ("down" === n && i || "up" === n && !i)
        },
        _getDragVerticalDirection: function() {
            var t = this.positionAbs.top - this.lastPositionAbs.top;
            return 0 !== t && (t > 0 ? "down" : "up")
        },
        _getDragHorizontalDirection: function() {
            var t = this.positionAbs.left - this.lastPositionAbs.left;
            return 0 !== t && (t > 0 ? "right" : "left")
        },
        refresh: function(t) {
            return this._refreshItems(t),
            this.refreshPositions(),
            this
        },
        _connectWith: function() {
            var t = this.options;
            return t.connectWith.constructor === String ? [t.connectWith] : t.connectWith
        },
        _getItemsAsjQuery: function(e) {
            var i, s, n, a, o = [], r = [], h = this._connectWith();
            if (h && e)
                for (i = h.length - 1; i >= 0; i--)
                    for (n = t(h[i]),
                    s = n.length - 1; s >= 0; s--)
                        a = t.data(n[s], this.widgetFullName),
                        a && a !== this && !a.options.disabled && r.push([t.isFunction(a.options.items) ? a.options.items.call(a.element) : t(a.options.items, a.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), a]);
            for (r.push([t.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : t(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]),
            i = r.length - 1; i >= 0; i--)
                r[i][0].each(function() {
                    o.push(this)
                });
            return t(o)
        },
        _removeCurrentsFromItems: function() {
            var e = this.currentItem.find(":data(" + this.widgetName + "-item)");
            this.items = t.grep(this.items, function(t) {
                for (var i = 0; e.length > i; i++)
                    if (e[i] === t.item[0])
                        return !1;
                return !0
            })
        },
        _refreshItems: function(e) {
            this.items = [],
            this.containers = [this];
            var i, s, n, a, o, r, h, l, c = this.items, u = [[t.isFunction(this.options.items) ? this.options.items.call(this.element[0], e, {
                item: this.currentItem
            }) : t(this.options.items, this.element), this]], d = this._connectWith();
            if (d && this.ready)
                for (i = d.length - 1; i >= 0; i--)
                    for (n = t(d[i]),
                    s = n.length - 1; s >= 0; s--)
                        a = t.data(n[s], this.widgetFullName),
                        a && a !== this && !a.options.disabled && (u.push([t.isFunction(a.options.items) ? a.options.items.call(a.element[0], e, {
                            item: this.currentItem
                        }) : t(a.options.items, a.element), a]),
                        this.containers.push(a));
            for (i = u.length - 1; i >= 0; i--)
                for (o = u[i][1],
                r = u[i][0],
                s = 0,
                l = r.length; l > s; s++)
                    h = t(r[s]),
                    h.data(this.widgetName + "-item", o),
                    c.push({
                        item: h,
                        instance: o,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0
                    })
        },
        refreshPositions: function(e) {
            this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
            var i, s, n, a;
            for (i = this.items.length - 1; i >= 0; i--)
                s = this.items[i],
                s.instance !== this.currentContainer && this.currentContainer && s.item[0] !== this.currentItem[0] || (n = this.options.toleranceElement ? t(this.options.toleranceElement, s.item) : s.item,
                e || (s.width = n.outerWidth(),
                s.height = n.outerHeight()),
                a = n.offset(),
                s.left = a.left,
                s.top = a.top);
            if (this.options.custom && this.options.custom.refreshContainers)
                this.options.custom.refreshContainers.call(this);
            else
                for (i = this.containers.length - 1; i >= 0; i--)
                    a = this.containers[i].element.offset(),
                    this.containers[i].containerCache.left = a.left,
                    this.containers[i].containerCache.top = a.top,
                    this.containers[i].containerCache.width = this.containers[i].element.outerWidth(),
                    this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
            return this
        },
        _createPlaceholder: function(e) {
            e = e || this;
            var i, s = e.options;
            s.placeholder && s.placeholder.constructor !== String || (i = s.placeholder,
            s.placeholder = {
                element: function() {
                    var s = e.currentItem[0].nodeName.toLowerCase()
                      , n = t(e.document[0].createElement(s)).addClass(i || e.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
                    return "tr" === s ? n.append("<td colspan='99'>&#160;</td>") : "img" === s && n.attr("src", e.currentItem.attr("src")),
                    i || n.css("visibility", "hidden"),
                    n
                },
                update: function(t, n) {
                    (!i || s.forcePlaceholderSize) && (n.height() || n.height(e.currentItem.innerHeight() - parseInt(e.currentItem.css("paddingTop") || 0, 10) - parseInt(e.currentItem.css("paddingBottom") || 0, 10)),
                    n.width() || n.width(e.currentItem.innerWidth() - parseInt(e.currentItem.css("paddingLeft") || 0, 10) - parseInt(e.currentItem.css("paddingRight") || 0, 10)))
                }
            }),
            e.placeholder = t(s.placeholder.element.call(e.element, e.currentItem)),
            e.currentItem.after(e.placeholder),
            s.placeholder.update(e, e.placeholder)
        },
        _contactContainers: function(s) {
            var n, a, o, r, h, l, c, u, d, p, f = null, m = null;
            for (n = this.containers.length - 1; n >= 0; n--)
                if (!t.contains(this.currentItem[0], this.containers[n].element[0]))
                    if (this._intersectsWith(this.containers[n].containerCache)) {
                        if (f && t.contains(this.containers[n].element[0], f.element[0]))
                            continue;
                        f = this.containers[n],
                        m = n
                    } else
                        this.containers[n].containerCache.over && (this.containers[n]._trigger("out", s, this._uiHash(this)),
                        this.containers[n].containerCache.over = 0);
            if (f)
                if (1 === this.containers.length)
                    this.containers[m].containerCache.over || (this.containers[m]._trigger("over", s, this._uiHash(this)),
                    this.containers[m].containerCache.over = 1);
                else {
                    for (o = 1e4,
                    r = null,
                    p = f.floating || i(this.currentItem),
                    h = p ? "left" : "top",
                    l = p ? "width" : "height",
                    c = this.positionAbs[h] + this.offset.click[h],
                    a = this.items.length - 1; a >= 0; a--)
                        t.contains(this.containers[m].element[0], this.items[a].item[0]) && this.items[a].item[0] !== this.currentItem[0] && (!p || e(this.positionAbs.top + this.offset.click.top, this.items[a].top, this.items[a].height)) && (u = this.items[a].item.offset()[h],
                        d = !1,
                        Math.abs(u - c) > Math.abs(u + this.items[a][l] - c) && (d = !0,
                        u += this.items[a][l]),
                        o > Math.abs(u - c) && (o = Math.abs(u - c),
                        r = this.items[a],
                        this.direction = d ? "up" : "down"));
                    if (!r && !this.options.dropOnEmpty)
                        return;
                    if (this.currentContainer === this.containers[m])
                        return;
                    r ? this._rearrange(s, r, null, !0) : this._rearrange(s, null, this.containers[m].element, !0),
                    this._trigger("change", s, this._uiHash()),
                    this.containers[m]._trigger("change", s, this._uiHash(this)),
                    this.currentContainer = this.containers[m],
                    this.options.placeholder.update(this.currentContainer, this.placeholder),
                    this.containers[m]._trigger("over", s, this._uiHash(this)),
                    this.containers[m].containerCache.over = 1
                }
        },
        _createHelper: function(e) {
            var i = this.options
              , s = t.isFunction(i.helper) ? t(i.helper.apply(this.element[0], [e, this.currentItem])) : "clone" === i.helper ? this.currentItem.clone() : this.currentItem;
            return s.parents("body").length || t("parent" !== i.appendTo ? i.appendTo : this.currentItem[0].parentNode)[0].appendChild(s[0]),
            s[0] === this.currentItem[0] && (this._storedCSS = {
                width: this.currentItem[0].style.width,
                height: this.currentItem[0].style.height,
                position: this.currentItem.css("position"),
                top: this.currentItem.css("top"),
                left: this.currentItem.css("left")
            }),
            (!s[0].style.width || i.forceHelperSize) && s.width(this.currentItem.width()),
            (!s[0].style.height || i.forceHelperSize) && s.height(this.currentItem.height()),
            s
        },
        _adjustOffsetFromHelper: function(e) {
            "string" == typeof e && (e = e.split(" ")),
            t.isArray(e) && (e = {
                left: +e[0],
                top: +e[1] || 0
            }),
            "left"in e && (this.offset.click.left = e.left + this.margins.left),
            "right"in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left),
            "top"in e && (this.offset.click.top = e.top + this.margins.top),
            "bottom"in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top)
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var e = this.offsetParent.offset();
            return "absolute" === this.cssPosition && this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(),
            e.top += this.scrollParent.scrollTop()),
            (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && t.ui.ie) && (e = {
                top: 0,
                left: 0
            }),
            {
                top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if ("relative" === this.cssPosition) {
                var t = this.currentItem.position();
                return {
                    top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                top: parseInt(this.currentItem.css("marginTop"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var e, i, s, n = this.options;
            "parent" === n.containment && (n.containment = this.helper[0].parentNode),
            ("document" === n.containment || "window" === n.containment) && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, t("document" === n.containment ? document : window).width() - this.helperProportions.width - this.margins.left, (t("document" === n.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]),
            /^(document|window|parent)$/.test(n.containment) || (e = t(n.containment)[0],
            i = t(n.containment).offset(),
            s = "hidden" !== t(e).css("overflow"),
            this.containment = [i.left + (parseInt(t(e).css("borderLeftWidth"), 10) || 0) + (parseInt(t(e).css("paddingLeft"), 10) || 0) - this.margins.left, i.top + (parseInt(t(e).css("borderTopWidth"), 10) || 0) + (parseInt(t(e).css("paddingTop"), 10) || 0) - this.margins.top, i.left + (s ? Math.max(e.scrollWidth, e.offsetWidth) : e.offsetWidth) - (parseInt(t(e).css("borderLeftWidth"), 10) || 0) - (parseInt(t(e).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, i.top + (s ? Math.max(e.scrollHeight, e.offsetHeight) : e.offsetHeight) - (parseInt(t(e).css("borderTopWidth"), 10) || 0) - (parseInt(t(e).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top])
        },
        _convertPositionTo: function(e, i) {
            i || (i = this.position);
            var s = "absolute" === e ? 1 : -1
              , n = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent
              , a = /(html|body)/i.test(n[0].tagName);
            return {
                top: i.top + this.offset.relative.top * s + this.offset.parent.top * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : a ? 0 : n.scrollTop()) * s,
                left: i.left + this.offset.relative.left * s + this.offset.parent.left * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : a ? 0 : n.scrollLeft()) * s
            }
        },
        _generatePosition: function(e) {
            var i, s, n = this.options, a = e.pageX, o = e.pageY, r = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, h = /(html|body)/i.test(r[0].tagName);
            return "relative" !== this.cssPosition || this.scrollParent[0] !== document && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()),
            this.originalPosition && (this.containment && (e.pageX - this.offset.click.left < this.containment[0] && (a = this.containment[0] + this.offset.click.left),
            e.pageY - this.offset.click.top < this.containment[1] && (o = this.containment[1] + this.offset.click.top),
            e.pageX - this.offset.click.left > this.containment[2] && (a = this.containment[2] + this.offset.click.left),
            e.pageY - this.offset.click.top > this.containment[3] && (o = this.containment[3] + this.offset.click.top)),
            n.grid && (i = this.originalPageY + Math.round((o - this.originalPageY) / n.grid[1]) * n.grid[1],
            o = this.containment ? i - this.offset.click.top >= this.containment[1] && i - this.offset.click.top <= this.containment[3] ? i : i - this.offset.click.top >= this.containment[1] ? i - n.grid[1] : i + n.grid[1] : i,
            s = this.originalPageX + Math.round((a - this.originalPageX) / n.grid[0]) * n.grid[0],
            a = this.containment ? s - this.offset.click.left >= this.containment[0] && s - this.offset.click.left <= this.containment[2] ? s : s - this.offset.click.left >= this.containment[0] ? s - n.grid[0] : s + n.grid[0] : s)),
            {
                top: o - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : h ? 0 : r.scrollTop()),
                left: a - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : h ? 0 : r.scrollLeft())
            }
        },
        _rearrange: function(t, e, i, s) {
            i ? i[0].appendChild(this.placeholder[0]) : e.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? e.item[0] : e.item[0].nextSibling),
            this.counter = this.counter ? ++this.counter : 1;
            var n = this.counter;
            this._delay(function() {
                n === this.counter && this.refreshPositions(!s)
            })
        },
        _clear: function(t, e) {
            this.reverting = !1;
            var i, s = [];
            if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem),
            this._noFinalSort = null,
            this.helper[0] === this.currentItem[0]) {
                for (i in this._storedCSS)
                    ("auto" === this._storedCSS[i] || "static" === this._storedCSS[i]) && (this._storedCSS[i] = "");
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            } else
                this.currentItem.show();
            for (this.fromOutside && !e && s.push(function(t) {
                this._trigger("receive", t, this._uiHash(this.fromOutside))
            }),
            !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || e || s.push(function(t) {
                this._trigger("update", t, this._uiHash())
            }),
            this !== this.currentContainer && (e || (s.push(function(t) {
                this._trigger("remove", t, this._uiHash())
            }),
            s.push(function(t) {
                return function(e) {
                    t._trigger("receive", e, this._uiHash(this))
                }
            }
            .call(this, this.currentContainer)),
            s.push(function(t) {
                return function(e) {
                    t._trigger("update", e, this._uiHash(this))
                }
            }
            .call(this, this.currentContainer)))),
            i = this.containers.length - 1; i >= 0; i--)
                e || s.push(function(t) {
                    return function(e) {
                        t._trigger("deactivate", e, this._uiHash(this))
                    }
                }
                .call(this, this.containers[i])),
                this.containers[i].containerCache.over && (s.push(function(t) {
                    return function(e) {
                        t._trigger("out", e, this._uiHash(this))
                    }
                }
                .call(this, this.containers[i])),
                this.containers[i].containerCache.over = 0);
            if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor),
            this.storedStylesheet.remove()),
            this._storedOpacity && this.helper.css("opacity", this._storedOpacity),
            this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex),
            this.dragging = !1,
            this.cancelHelperRemoval) {
                if (!e) {
                    for (this._trigger("beforeStop", t, this._uiHash()),
                    i = 0; s.length > i; i++)
                        s[i].call(this, t);
                    this._trigger("stop", t, this._uiHash())
                }
                return this.fromOutside = !1,
                !1
            }
            if (e || this._trigger("beforeStop", t, this._uiHash()),
            this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
            this.helper[0] !== this.currentItem[0] && this.helper.remove(),
            this.helper = null,
            !e) {
                for (i = 0; s.length > i; i++)
                    s[i].call(this, t);
                this._trigger("stop", t, this._uiHash())
            }
            return this.fromOutside = !1,
            !0
        },
        _trigger: function() {
            t.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
        },
        _uiHash: function(e) {
            var i = e || this;
            return {
                helper: i.helper,
                placeholder: i.placeholder || t([]),
                position: i.position,
                originalPosition: i.originalPosition,
                offset: i.positionAbs,
                item: i.currentItem,
                sender: e ? e.element : null
            }
        }
    })
}
)(jQuery);

/* collective.js.jqueryui: jquery.ui.accordion.min.js */

/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(t) {
    var e = 0
      , i = {}
      , s = {};
    i.height = i.paddingTop = i.paddingBottom = i.borderTopWidth = i.borderBottomWidth = "hide",
    s.height = s.paddingTop = s.paddingBottom = s.borderTopWidth = s.borderBottomWidth = "show",
    t.widget("ui.accordion", {
        version: "1.10.2",
        options: {
            active: 0,
            animate: {},
            collapsible: !1,
            event: "click",
            header: "> li > :first-child,> :not(li):even",
            heightStyle: "auto",
            icons: {
                activeHeader: "ui-icon-triangle-1-s",
                header: "ui-icon-triangle-1-e"
            },
            activate: null,
            beforeActivate: null
        },
        _create: function() {
            var e = this.options;
            this.prevShow = this.prevHide = t(),
            this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role", "tablist"),
            e.collapsible || e.active !== !1 && null != e.active || (e.active = 0),
            this._processPanels(),
            0 > e.active && (e.active += this.headers.length),
            this._refresh()
        },
        _getCreateEventData: function() {
            return {
                header: this.active,
                panel: this.active.length ? this.active.next() : t(),
                content: this.active.length ? this.active.next() : t()
            }
        },
        _createIcons: function() {
            var e = this.options.icons;
            e && (t("<span>").addClass("ui-accordion-header-icon ui-icon " + e.header).prependTo(this.headers),
            this.active.children(".ui-accordion-header-icon").removeClass(e.header).addClass(e.activeHeader),
            this.headers.addClass("ui-accordion-icons"))
        },
        _destroyIcons: function() {
            this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()
        },
        _destroy: function() {
            var t;
            this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"),
            this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").each(function() {
                /^ui-accordion/.test(this.id) && this.removeAttribute("id")
            }),
            this._destroyIcons(),
            t = this.headers.next().css("display", "").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").each(function() {
                /^ui-accordion/.test(this.id) && this.removeAttribute("id")
            }),
            "content" !== this.options.heightStyle && t.css("height", "")
        },
        _setOption: function(t, e) {
            return "active" === t ? (this._activate(e),
            undefined) : ("event" === t && (this.options.event && this._off(this.headers, this.options.event),
            this._setupEvents(e)),
            this._super(t, e),
            "collapsible" !== t || e || this.options.active !== !1 || this._activate(0),
            "icons" === t && (this._destroyIcons(),
            e && this._createIcons()),
            "disabled" === t && this.headers.add(this.headers.next()).toggleClass("ui-state-disabled", !!e),
            undefined)
        },
        _keydown: function(e) {
            if (!e.altKey && !e.ctrlKey) {
                var i = t.ui.keyCode
                  , s = this.headers.length
                  , n = this.headers.index(e.target)
                  , a = !1;
                switch (e.keyCode) {
                case i.RIGHT:
                case i.DOWN:
                    a = this.headers[(n + 1) % s];
                    break;
                case i.LEFT:
                case i.UP:
                    a = this.headers[(n - 1 + s) % s];
                    break;
                case i.SPACE:
                case i.ENTER:
                    this._eventHandler(e);
                    break;
                case i.HOME:
                    a = this.headers[0];
                    break;
                case i.END:
                    a = this.headers[s - 1]
                }
                a && (t(e.target).attr("tabIndex", -1),
                t(a).attr("tabIndex", 0),
                a.focus(),
                e.preventDefault())
            }
        },
        _panelKeyDown: function(e) {
            e.keyCode === t.ui.keyCode.UP && e.ctrlKey && t(e.currentTarget).prev().focus()
        },
        refresh: function() {
            var e = this.options;
            this._processPanels(),
            (e.active === !1 && e.collapsible === !0 || !this.headers.length) && (e.active = !1,
            this.active = t()),
            e.active === !1 ? this._activate(0) : this.active.length && !t.contains(this.element[0], this.active[0]) ? this.headers.length === this.headers.find(".ui-state-disabled").length ? (e.active = !1,
            this.active = t()) : this._activate(Math.max(0, e.active - 1)) : e.active = this.headers.index(this.active),
            this._destroyIcons(),
            this._refresh()
        },
        _processPanels: function() {
            this.headers = this.element.find(this.options.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all"),
            this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide()
        },
        _refresh: function() {
            var i, s = this.options, n = s.heightStyle, a = this.element.parent(), o = this.accordionId = "ui-accordion-" + (this.element.attr("id") || ++e);
            this.active = this._findActive(s.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all"),
            this.active.next().addClass("ui-accordion-content-active").show(),
            this.headers.attr("role", "tab").each(function(e) {
                var i = t(this)
                  , s = i.attr("id")
                  , n = i.next()
                  , a = n.attr("id");
                s || (s = o + "-header-" + e,
                i.attr("id", s)),
                a || (a = o + "-panel-" + e,
                n.attr("id", a)),
                i.attr("aria-controls", a),
                n.attr("aria-labelledby", s)
            }).next().attr("role", "tabpanel"),
            this.headers.not(this.active).attr({
                "aria-selected": "false",
                tabIndex: -1
            }).next().attr({
                "aria-expanded": "false",
                "aria-hidden": "true"
            }).hide(),
            this.active.length ? this.active.attr({
                "aria-selected": "true",
                tabIndex: 0
            }).next().attr({
                "aria-expanded": "true",
                "aria-hidden": "false"
            }) : this.headers.eq(0).attr("tabIndex", 0),
            this._createIcons(),
            this._setupEvents(s.event),
            "fill" === n ? (i = a.height(),
            this.element.siblings(":visible").each(function() {
                var e = t(this)
                  , s = e.css("position");
                "absolute" !== s && "fixed" !== s && (i -= e.outerHeight(!0))
            }),
            this.headers.each(function() {
                i -= t(this).outerHeight(!0)
            }),
            this.headers.next().each(function() {
                t(this).height(Math.max(0, i - t(this).innerHeight() + t(this).height()))
            }).css("overflow", "auto")) : "auto" === n && (i = 0,
            this.headers.next().each(function() {
                i = Math.max(i, t(this).css("height", "").height())
            }).height(i))
        },
        _activate: function(e) {
            var i = this._findActive(e)[0];
            i !== this.active[0] && (i = i || this.active[0],
            this._eventHandler({
                target: i,
                currentTarget: i,
                preventDefault: t.noop
            }))
        },
        _findActive: function(e) {
            return "number" == typeof e ? this.headers.eq(e) : t()
        },
        _setupEvents: function(e) {
            var i = {
                keydown: "_keydown"
            };
            e && t.each(e.split(" "), function(t, e) {
                i[e] = "_eventHandler"
            }),
            this._off(this.headers.add(this.headers.next())),
            this._on(this.headers, i),
            this._on(this.headers.next(), {
                keydown: "_panelKeyDown"
            }),
            this._hoverable(this.headers),
            this._focusable(this.headers)
        },
        _eventHandler: function(e) {
            var i = this.options
              , s = this.active
              , n = t(e.currentTarget)
              , a = n[0] === s[0]
              , o = a && i.collapsible
              , r = o ? t() : n.next()
              , h = s.next()
              , l = {
                oldHeader: s,
                oldPanel: h,
                newHeader: o ? t() : n,
                newPanel: r
            };
            e.preventDefault(),
            a && !i.collapsible || this._trigger("beforeActivate", e, l) === !1 || (i.active = o ? !1 : this.headers.index(n),
            this.active = a ? t() : n,
            this._toggle(l),
            s.removeClass("ui-accordion-header-active ui-state-active"),
            i.icons && s.children(".ui-accordion-header-icon").removeClass(i.icons.activeHeader).addClass(i.icons.header),
            a || (n.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"),
            i.icons && n.children(".ui-accordion-header-icon").removeClass(i.icons.header).addClass(i.icons.activeHeader),
            n.next().addClass("ui-accordion-content-active")))
        },
        _toggle: function(e) {
            var i = e.newPanel
              , s = this.prevShow.length ? this.prevShow : e.oldPanel;
            this.prevShow.add(this.prevHide).stop(!0, !0),
            this.prevShow = i,
            this.prevHide = s,
            this.options.animate ? this._animate(i, s, e) : (s.hide(),
            i.show(),
            this._toggleComplete(e)),
            s.attr({
                "aria-expanded": "false",
                "aria-hidden": "true"
            }),
            s.prev().attr("aria-selected", "false"),
            i.length && s.length ? s.prev().attr("tabIndex", -1) : i.length && this.headers.filter(function() {
                return 0 === t(this).attr("tabIndex")
            }).attr("tabIndex", -1),
            i.attr({
                "aria-expanded": "true",
                "aria-hidden": "false"
            }).prev().attr({
                "aria-selected": "true",
                tabIndex: 0
            })
        },
        _animate: function(t, e, n) {
            var a, o, r, h = this, l = 0, c = t.length && (!e.length || t.index() < e.index()), u = this.options.animate || {}, d = c && u.down || u, p = function() {
                h._toggleComplete(n)
            };
            return "number" == typeof d && (r = d),
            "string" == typeof d && (o = d),
            o = o || d.easing || u.easing,
            r = r || d.duration || u.duration,
            e.length ? t.length ? (a = t.show().outerHeight(),
            e.animate(i, {
                duration: r,
                easing: o,
                step: function(t, e) {
                    e.now = Math.round(t)
                }
            }),
            t.hide().animate(s, {
                duration: r,
                easing: o,
                complete: p,
                step: function(t, i) {
                    i.now = Math.round(t),
                    "height" !== i.prop ? l += i.now : "content" !== h.options.heightStyle && (i.now = Math.round(a - e.outerHeight() - l),
                    l = 0)
                }
            }),
            undefined) : e.animate(i, r, o, p) : t.animate(s, r, o, p)
        },
        _toggleComplete: function(t) {
            var e = t.oldPanel;
            e.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"),
            e.length && (e.parent()[0].className = e.parent()[0].className),
            this._trigger("activate", null, t)
        }
    })
}
)(jQuery);

/* collective.js.jqueryui: jquery.ui.autocomplete.min.js */

/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(e) {
    var t = 0;
    e.widget("ui.autocomplete", {
        version: "1.10.2",
        defaultElement: "<input>",
        options: {
            appendTo: null,
            autoFocus: !1,
            delay: 300,
            minLength: 1,
            position: {
                my: "left top",
                at: "left bottom",
                collision: "none"
            },
            source: null,
            change: null,
            close: null,
            focus: null,
            open: null,
            response: null,
            search: null,
            select: null
        },
        pending: 0,
        _create: function() {
            var t, i, s, n = this.element[0].nodeName.toLowerCase(), a = "textarea" === n, o = "input" === n;
            this.isMultiLine = a ? !0 : o ? !1 : this.element.prop("isContentEditable"),
            this.valueMethod = this.element[a || o ? "val" : "text"],
            this.isNewMenu = !0,
            this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off"),
            this._on(this.element, {
                keydown: function(n) {
                    if (this.element.prop("readOnly"))
                        return t = !0,
                        s = !0,
                        i = !0,
                        undefined;
                    t = !1,
                    s = !1,
                    i = !1;
                    var a = e.ui.keyCode;
                    switch (n.keyCode) {
                    case a.PAGE_UP:
                        t = !0,
                        this._move("previousPage", n);
                        break;
                    case a.PAGE_DOWN:
                        t = !0,
                        this._move("nextPage", n);
                        break;
                    case a.UP:
                        t = !0,
                        this._keyEvent("previous", n);
                        break;
                    case a.DOWN:
                        t = !0,
                        this._keyEvent("next", n);
                        break;
                    case a.ENTER:
                    case a.NUMPAD_ENTER:
                        this.menu.active && (t = !0,
                        n.preventDefault(),
                        this.menu.select(n));
                        break;
                    case a.TAB:
                        this.menu.active && this.menu.select(n);
                        break;
                    case a.ESCAPE:
                        this.menu.element.is(":visible") && (this._value(this.term),
                        this.close(n),
                        n.preventDefault());
                        break;
                    default:
                        i = !0,
                        this._searchTimeout(n)
                    }
                },
                keypress: function(s) {
                    if (t)
                        return t = !1,
                        s.preventDefault(),
                        undefined;
                    if (!i) {
                        var n = e.ui.keyCode;
                        switch (s.keyCode) {
                        case n.PAGE_UP:
                            this._move("previousPage", s);
                            break;
                        case n.PAGE_DOWN:
                            this._move("nextPage", s);
                            break;
                        case n.UP:
                            this._keyEvent("previous", s);
                            break;
                        case n.DOWN:
                            this._keyEvent("next", s)
                        }
                    }
                },
                input: function(e) {
                    return s ? (s = !1,
                    e.preventDefault(),
                    undefined) : (this._searchTimeout(e),
                    undefined)
                },
                focus: function() {
                    this.selectedItem = null,
                    this.previous = this._value()
                },
                blur: function(e) {
                    return this.cancelBlur ? (delete this.cancelBlur,
                    undefined) : (clearTimeout(this.searching),
                    this.close(e),
                    this._change(e),
                    undefined)
                }
            }),
            this._initSource(),
            this.menu = e("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({
                input: e(),
                role: null
            }).hide().data("ui-menu"),
            this._on(this.menu.element, {
                mousedown: function(t) {
                    t.preventDefault(),
                    this.cancelBlur = !0,
                    this._delay(function() {
                        delete this.cancelBlur
                    });
                    var i = this.menu.element[0];
                    e(t.target).closest(".ui-menu-item").length || this._delay(function() {
                        var t = this;
                        this.document.one("mousedown", function(s) {
                            s.target === t.element[0] || s.target === i || e.contains(i, s.target) || t.close()
                        })
                    })
                },
                menufocus: function(t, i) {
                    if (this.isNewMenu && (this.isNewMenu = !1,
                    t.originalEvent && /^mouse/.test(t.originalEvent.type)))
                        return this.menu.blur(),
                        this.document.one("mousemove", function() {
                            e(t.target).trigger(t.originalEvent)
                        }),
                        undefined;
                    var s = i.item.data("ui-autocomplete-item");
                    !1 !== this._trigger("focus", t, {
                        item: s
                    }) ? t.originalEvent && /^key/.test(t.originalEvent.type) && this._value(s.value) : this.liveRegion.text(s.value)
                },
                menuselect: function(e, t) {
                    var i = t.item.data("ui-autocomplete-item")
                      , s = this.previous;
                    this.element[0] !== this.document[0].activeElement && (this.element.focus(),
                    this.previous = s,
                    this._delay(function() {
                        this.previous = s,
                        this.selectedItem = i
                    })),
                    !1 !== this._trigger("select", e, {
                        item: i
                    }) && this._value(i.value),
                    this.term = this._value(),
                    this.close(e),
                    this.selectedItem = i
                }
            }),
            this.liveRegion = e("<span>", {
                role: "status",
                "aria-live": "polite"
            }).addClass("ui-helper-hidden-accessible").insertAfter(this.element),
            this._on(this.window, {
                beforeunload: function() {
                    this.element.removeAttr("autocomplete")
                }
            })
        },
        _destroy: function() {
            clearTimeout(this.searching),
            this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"),
            this.menu.element.remove(),
            this.liveRegion.remove()
        },
        _setOption: function(e, t) {
            this._super(e, t),
            "source" === e && this._initSource(),
            "appendTo" === e && this.menu.element.appendTo(this._appendTo()),
            "disabled" === e && t && this.xhr && this.xhr.abort()
        },
        _appendTo: function() {
            var t = this.options.appendTo;
            return t && (t = t.jquery || t.nodeType ? e(t) : this.document.find(t).eq(0)),
            t || (t = this.element.closest(".ui-front")),
            t.length || (t = this.document[0].body),
            t
        },
        _initSource: function() {
            var t, i, s = this;
            e.isArray(this.options.source) ? (t = this.options.source,
            this.source = function(i, s) {
                s(e.ui.autocomplete.filter(t, i.term))
            }
            ) : "string" == typeof this.options.source ? (i = this.options.source,
            this.source = function(t, n) {
                s.xhr && s.xhr.abort(),
                s.xhr = e.ajax({
                    url: i,
                    data: t,
                    dataType: "json",
                    success: function(e) {
                        n(e)
                    },
                    error: function() {
                        n([])
                    }
                })
            }
            ) : this.source = this.options.source
        },
        _searchTimeout: function(e) {
            clearTimeout(this.searching),
            this.searching = this._delay(function() {
                this.term !== this._value() && (this.selectedItem = null,
                this.search(null, e))
            }, this.options.delay)
        },
        search: function(e, t) {
            return e = null != e ? e : this._value(),
            this.term = this._value(),
            e.length < this.options.minLength ? this.close(t) : this._trigger("search", t) !== !1 ? this._search(e) : undefined
        },
        _search: function(e) {
            this.pending++,
            this.element.addClass("ui-autocomplete-loading"),
            this.cancelSearch = !1,
            this.source({
                term: e
            }, this._response())
        },
        _response: function() {
            var e = this
              , i = ++t;
            return function(s) {
                i === t && e.__response(s),
                e.pending--,
                e.pending || e.element.removeClass("ui-autocomplete-loading")
            }
        },
        __response: function(e) {
            e && (e = this._normalize(e)),
            this._trigger("response", null, {
                content: e
            }),
            !this.options.disabled && e && e.length && !this.cancelSearch ? (this._suggest(e),
            this._trigger("open")) : this._close()
        },
        close: function(e) {
            this.cancelSearch = !0,
            this._close(e)
        },
        _close: function(e) {
            this.menu.element.is(":visible") && (this.menu.element.hide(),
            this.menu.blur(),
            this.isNewMenu = !0,
            this._trigger("close", e))
        },
        _change: function(e) {
            this.previous !== this._value() && this._trigger("change", e, {
                item: this.selectedItem
            })
        },
        _normalize: function(t) {
            return t.length && t[0].label && t[0].value ? t : e.map(t, function(t) {
                return "string" == typeof t ? {
                    label: t,
                    value: t
                } : e.extend({
                    label: t.label || t.value,
                    value: t.value || t.label
                }, t)
            })
        },
        _suggest: function(t) {
            var i = this.menu.element.empty();
            this._renderMenu(i, t),
            this.isNewMenu = !0,
            this.menu.refresh(),
            i.show(),
            this._resizeMenu(),
            i.position(e.extend({
                of: this.element
            }, this.options.position)),
            this.options.autoFocus && this.menu.next()
        },
        _resizeMenu: function() {
            var e = this.menu.element;
            e.outerWidth(Math.max(e.width("").outerWidth() + 1, this.element.outerWidth()))
        },
        _renderMenu: function(t, i) {
            var s = this;
            e.each(i, function(e, i) {
                s._renderItemData(t, i)
            })
        },
        _renderItemData: function(e, t) {
            return this._renderItem(e, t).data("ui-autocomplete-item", t)
        },
        _renderItem: function(t, i) {
            return e("<li>").append(e("<a>").text(i.label)).appendTo(t)
        },
        _move: function(e, t) {
            return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(e) || this.menu.isLastItem() && /^next/.test(e) ? (this._value(this.term),
            this.menu.blur(),
            undefined) : (this.menu[e](t),
            undefined) : (this.search(null, t),
            undefined)
        },
        widget: function() {
            return this.menu.element
        },
        _value: function() {
            return this.valueMethod.apply(this.element, arguments)
        },
        _keyEvent: function(e, t) {
            (!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(e, t),
            t.preventDefault())
        }
    }),
    e.extend(e.ui.autocomplete, {
        escapeRegex: function(e) {
            return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
        },
        filter: function(t, i) {
            var s = RegExp(e.ui.autocomplete.escapeRegex(i), "i");
            return e.grep(t, function(e) {
                return s.test(e.label || e.value || e)
            })
        }
    }),
    e.widget("ui.autocomplete", e.ui.autocomplete, {
        options: {
            messages: {
                noResults: "No search results.",
                results: function(e) {
                    return e + (e > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
                }
            }
        },
        __response: function(e) {
            var t;
            this._superApply(arguments),
            this.options.disabled || this.cancelSearch || (t = e && e.length ? this.options.messages.results(e.length) : this.options.messages.noResults,
            this.liveRegion.text(t))
        }
    })
}
)(jQuery);

/* collective.js.jqueryui: jquery.ui.button.min.js */

/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(t) {
    var e, i, s, n, a = "ui-button ui-widget ui-state-default ui-corner-all", o = "ui-state-hover ui-state-active ", r = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only", h = function() {
        var e = t(this).find(":ui-button");
        setTimeout(function() {
            e.button("refresh")
        }, 1)
    }, l = function(e) {
        var i = e.name
          , s = e.form
          , n = t([]);
        return i && (i = i.replace(/'/g, "\\'"),
        n = s ? t(s).find("[name='" + i + "']") : t("[name='" + i + "']", e.ownerDocument).filter(function() {
            return !this.form
        })),
        n
    };
    t.widget("ui.button", {
        version: "1.10.2",
        defaultElement: "<button>",
        options: {
            disabled: null,
            text: !0,
            label: null,
            icons: {
                primary: null,
                secondary: null
            }
        },
        _create: function() {
            this.element.closest("form").unbind("reset" + this.eventNamespace).bind("reset" + this.eventNamespace, h),
            "boolean" != typeof this.options.disabled ? this.options.disabled = !!this.element.prop("disabled") : this.element.prop("disabled", this.options.disabled),
            this._determineButtonType(),
            this.hasTitle = !!this.buttonElement.attr("title");
            var o = this
              , r = this.options
              , c = "checkbox" === this.type || "radio" === this.type
              , u = c ? "" : "ui-state-active"
              , d = "ui-state-focus";
            null === r.label && (r.label = "input" === this.type ? this.buttonElement.val() : this.buttonElement.html()),
            this._hoverable(this.buttonElement),
            this.buttonElement.addClass(a).attr("role", "button").bind("mouseenter" + this.eventNamespace, function() {
                r.disabled || this === e && t(this).addClass("ui-state-active")
            }).bind("mouseleave" + this.eventNamespace, function() {
                r.disabled || t(this).removeClass(u)
            }).bind("click" + this.eventNamespace, function(t) {
                r.disabled && (t.preventDefault(),
                t.stopImmediatePropagation())
            }),
            this.element.bind("focus" + this.eventNamespace, function() {
                o.buttonElement.addClass(d)
            }).bind("blur" + this.eventNamespace, function() {
                o.buttonElement.removeClass(d)
            }),
            c && (this.element.bind("change" + this.eventNamespace, function() {
                n || o.refresh()
            }),
            this.buttonElement.bind("mousedown" + this.eventNamespace, function(t) {
                r.disabled || (n = !1,
                i = t.pageX,
                s = t.pageY)
            }).bind("mouseup" + this.eventNamespace, function(t) {
                r.disabled || (i !== t.pageX || s !== t.pageY) && (n = !0)
            })),
            "checkbox" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function() {
                return r.disabled || n ? !1 : undefined
            }) : "radio" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function() {
                if (r.disabled || n)
                    return !1;
                t(this).addClass("ui-state-active"),
                o.buttonElement.attr("aria-pressed", "true");
                var e = o.element[0];
                l(e).not(e).map(function() {
                    return t(this).button("widget")[0]
                }).removeClass("ui-state-active").attr("aria-pressed", "false")
            }) : (this.buttonElement.bind("mousedown" + this.eventNamespace, function() {
                return r.disabled ? !1 : (t(this).addClass("ui-state-active"),
                e = this,
                o.document.one("mouseup", function() {
                    e = null
                }),
                undefined)
            }).bind("mouseup" + this.eventNamespace, function() {
                return r.disabled ? !1 : (t(this).removeClass("ui-state-active"),
                undefined)
            }).bind("keydown" + this.eventNamespace, function(e) {
                return r.disabled ? !1 : ((e.keyCode === t.ui.keyCode.SPACE || e.keyCode === t.ui.keyCode.ENTER) && t(this).addClass("ui-state-active"),
                undefined)
            }).bind("keyup" + this.eventNamespace + " blur" + this.eventNamespace, function() {
                t(this).removeClass("ui-state-active")
            }),
            this.buttonElement.is("a") && this.buttonElement.keyup(function(e) {
                e.keyCode === t.ui.keyCode.SPACE && t(this).click()
            })),
            this._setOption("disabled", r.disabled),
            this._resetButton()
        },
        _determineButtonType: function() {
            var t, e, i;
            this.type = this.element.is("[type=checkbox]") ? "checkbox" : this.element.is("[type=radio]") ? "radio" : this.element.is("input") ? "input" : "button",
            "checkbox" === this.type || "radio" === this.type ? (t = this.element.parents().last(),
            e = "label[for='" + this.element.attr("id") + "']",
            this.buttonElement = t.find(e),
            this.buttonElement.length || (t = t.length ? t.siblings() : this.element.siblings(),
            this.buttonElement = t.filter(e),
            this.buttonElement.length || (this.buttonElement = t.find(e))),
            this.element.addClass("ui-helper-hidden-accessible"),
            i = this.element.is(":checked"),
            i && this.buttonElement.addClass("ui-state-active"),
            this.buttonElement.prop("aria-pressed", i)) : this.buttonElement = this.element
        },
        widget: function() {
            return this.buttonElement
        },
        _destroy: function() {
            this.element.removeClass("ui-helper-hidden-accessible"),
            this.buttonElement.removeClass(a + " " + o + " " + r).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()),
            this.hasTitle || this.buttonElement.removeAttr("title")
        },
        _setOption: function(t, e) {
            return this._super(t, e),
            "disabled" === t ? (e ? this.element.prop("disabled", !0) : this.element.prop("disabled", !1),
            undefined) : (this._resetButton(),
            undefined)
        },
        refresh: function() {
            var e = this.element.is("input, button") ? this.element.is(":disabled") : this.element.hasClass("ui-button-disabled");
            e !== this.options.disabled && this._setOption("disabled", e),
            "radio" === this.type ? l(this.element[0]).each(function() {
                t(this).is(":checked") ? t(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : t(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
            }) : "checkbox" === this.type && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"))
        },
        _resetButton: function() {
            if ("input" === this.type)
                return this.options.label && this.element.val(this.options.label),
                undefined;
            var e = this.buttonElement.removeClass(r)
              , i = t("<span></span>", this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(e.empty()).text()
              , s = this.options.icons
              , n = s.primary && s.secondary
              , a = [];
            s.primary || s.secondary ? (this.options.text && a.push("ui-button-text-icon" + (n ? "s" : s.primary ? "-primary" : "-secondary")),
            s.primary && e.prepend("<span class='ui-button-icon-primary ui-icon " + s.primary + "'></span>"),
            s.secondary && e.append("<span class='ui-button-icon-secondary ui-icon " + s.secondary + "'></span>"),
            this.options.text || (a.push(n ? "ui-button-icons-only" : "ui-button-icon-only"),
            this.hasTitle || e.attr("title", t.trim(i)))) : a.push("ui-button-text-only"),
            e.addClass(a.join(" "))
        }
    }),
    t.widget("ui.buttonset", {
        version: "1.10.2",
        options: {
            items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"
        },
        _create: function() {
            this.element.addClass("ui-buttonset")
        },
        _init: function() {
            this.refresh()
        },
        _setOption: function(t, e) {
            "disabled" === t && this.buttons.button("option", t, e),
            this._super(t, e)
        },
        refresh: function() {
            var e = "rtl" === this.element.css("direction");
            this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function() {
                return t(this).button("widget")[0]
            }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(e ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(e ? "ui-corner-left" : "ui-corner-right").end().end()
        },
        _destroy: function() {
            this.element.removeClass("ui-buttonset"),
            this.buttons.map(function() {
                return t(this).button("widget")[0]
            }).removeClass("ui-corner-left ui-corner-right").end().button("destroy")
        }
    })
}
)(jQuery);

/* collective.js.jqueryui: jquery.ui.datepicker.min.js */

/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(t, e) {
    function i() {
        this._curInst = null,
        this._keyEvent = !1,
        this._disabledInputs = [],
        this._datepickerShowing = !1,
        this._inDialog = !1,
        this._mainDivId = "ui-datepicker-div",
        this._inlineClass = "ui-datepicker-inline",
        this._appendClass = "ui-datepicker-append",
        this._triggerClass = "ui-datepicker-trigger",
        this._dialogClass = "ui-datepicker-dialog",
        this._disableClass = "ui-datepicker-disabled",
        this._unselectableClass = "ui-datepicker-unselectable",
        this._currentClass = "ui-datepicker-current-day",
        this._dayOverClass = "ui-datepicker-days-cell-over",
        this.regional = [],
        this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: !1,
            showMonthAfterYear: !1,
            yearSuffix: ""
        },
        this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: !1,
            hideIfNoPrevNext: !1,
            navigationAsDateFormat: !1,
            gotoCurrent: !1,
            changeMonth: !1,
            changeYear: !1,
            yearRange: "c-10:c+10",
            showOtherMonths: !1,
            selectOtherMonths: !1,
            showWeek: !1,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: !0,
            showButtonPanel: !1,
            autoSize: !1,
            disabled: !1
        },
        t.extend(this._defaults, this.regional[""]),
        this.dpDiv = s(t("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
    }
    function s(e) {
        var i = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
        return e.delegate(i, "mouseout", function() {
            t(this).removeClass("ui-state-hover"),
            -1 !== this.className.indexOf("ui-datepicker-prev") && t(this).removeClass("ui-datepicker-prev-hover"),
            -1 !== this.className.indexOf("ui-datepicker-next") && t(this).removeClass("ui-datepicker-next-hover")
        }).delegate(i, "mouseover", function() {
            t.datepicker._isDisabledDatepicker(a.inline ? e.parent()[0] : a.input[0]) || (t(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),
            t(this).addClass("ui-state-hover"),
            -1 !== this.className.indexOf("ui-datepicker-prev") && t(this).addClass("ui-datepicker-prev-hover"),
            -1 !== this.className.indexOf("ui-datepicker-next") && t(this).addClass("ui-datepicker-next-hover"))
        })
    }
    function n(e, i) {
        t.extend(e, i);
        for (var s in i)
            null == i[s] && (e[s] = i[s]);
        return e
    }
    t.extend(t.ui, {
        datepicker: {
            version: "1.10.2"
        }
    });
    var a, r = "datepicker", o = (new Date).getTime();
    t.extend(i.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        _widgetDatepicker: function() {
            return this.dpDiv
        },
        setDefaults: function(t) {
            return n(this._defaults, t || {}),
            this
        },
        _attachDatepicker: function(e, i) {
            var s, n, a;
            s = e.nodeName.toLowerCase(),
            n = "div" === s || "span" === s,
            e.id || (this.uuid += 1,
            e.id = "dp" + this.uuid),
            a = this._newInst(t(e), n),
            a.settings = t.extend({}, i || {}),
            "input" === s ? this._connectDatepicker(e, a) : n && this._inlineDatepicker(e, a)
        },
        _newInst: function(e, i) {
            var n = e[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
            return {
                id: n,
                input: e,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: i,
                dpDiv: i ? s(t("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
            }
        },
        _connectDatepicker: function(e, i) {
            var s = t(e);
            i.append = t([]),
            i.trigger = t([]),
            s.hasClass(this.markerClassName) || (this._attachments(s, i),
            s.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp),
            this._autoSize(i),
            t.data(e, r, i),
            i.settings.disabled && this._disableDatepicker(e))
        },
        _attachments: function(e, i) {
            var s, n, a, r = this._get(i, "appendText"), o = this._get(i, "isRTL");
            i.append && i.append.remove(),
            r && (i.append = t("<span class='" + this._appendClass + "'>" + r + "</span>"),
            e[o ? "before" : "after"](i.append)),
            e.unbind("focus", this._showDatepicker),
            i.trigger && i.trigger.remove(),
            s = this._get(i, "showOn"),
            ("focus" === s || "both" === s) && e.focus(this._showDatepicker),
            ("button" === s || "both" === s) && (n = this._get(i, "buttonText"),
            a = this._get(i, "buttonImage"),
            i.trigger = t(this._get(i, "buttonImageOnly") ? t("<img/>").addClass(this._triggerClass).attr({
                src: a,
                alt: n,
                title: n
            }) : t("<button type='button'></button>").addClass(this._triggerClass).html(a ? t("<img/>").attr({
                src: a,
                alt: n,
                title: n
            }) : n)),
            e[o ? "before" : "after"](i.trigger),
            i.trigger.click(function() {
                return t.datepicker._datepickerShowing && t.datepicker._lastInput === e[0] ? t.datepicker._hideDatepicker() : t.datepicker._datepickerShowing && t.datepicker._lastInput !== e[0] ? (t.datepicker._hideDatepicker(),
                t.datepicker._showDatepicker(e[0])) : t.datepicker._showDatepicker(e[0]),
                !1
            }))
        },
        _autoSize: function(t) {
            if (this._get(t, "autoSize") && !t.inline) {
                var e, i, s, n, a = new Date(2009,11,20), r = this._get(t, "dateFormat");
                r.match(/[DM]/) && (e = function(t) {
                    for (i = 0,
                    s = 0,
                    n = 0; t.length > n; n++)
                        t[n].length > i && (i = t[n].length,
                        s = n);
                    return s
                }
                ,
                a.setMonth(e(this._get(t, r.match(/MM/) ? "monthNames" : "monthNamesShort"))),
                a.setDate(e(this._get(t, r.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - a.getDay())),
                t.input.attr("size", this._formatDate(t, a).length)
            }
        },
        _inlineDatepicker: function(e, i) {
            var s = t(e);
            s.hasClass(this.markerClassName) || (s.addClass(this.markerClassName).append(i.dpDiv),
            t.data(e, r, i),
            this._setDate(i, this._getDefaultDate(i), !0),
            this._updateDatepicker(i),
            this._updateAlternate(i),
            i.settings.disabled && this._disableDatepicker(e),
            i.dpDiv.css("display", "block"))
        },
        _dialogDatepicker: function(e, i, s, a, o) {
            var h, l, c, u, d, p = this._dialogInst;
            return p || (this.uuid += 1,
            h = "dp" + this.uuid,
            this._dialogInput = t("<input type='text' id='" + h + "' style='position: absolute; top: -100px; width: 0px;'/>"),
            this._dialogInput.keydown(this._doKeyDown),
            t("body").append(this._dialogInput),
            p = this._dialogInst = this._newInst(this._dialogInput, !1),
            p.settings = {},
            t.data(this._dialogInput[0], r, p)),
            n(p.settings, a || {}),
            i = i && i.constructor === Date ? this._formatDate(p, i) : i,
            this._dialogInput.val(i),
            this._pos = o ? o.length ? o : [o.pageX, o.pageY] : null,
            this._pos || (l = document.documentElement.clientWidth,
            c = document.documentElement.clientHeight,
            u = document.documentElement.scrollLeft || document.body.scrollLeft,
            d = document.documentElement.scrollTop || document.body.scrollTop,
            this._pos = [l / 2 - 100 + u, c / 2 - 150 + d]),
            this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"),
            p.settings.onSelect = s,
            this._inDialog = !0,
            this.dpDiv.addClass(this._dialogClass),
            this._showDatepicker(this._dialogInput[0]),
            t.blockUI && t.blockUI(this.dpDiv),
            t.data(this._dialogInput[0], r, p),
            this
        },
        _destroyDatepicker: function(e) {
            var i, s = t(e), n = t.data(e, r);
            s.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(),
            t.removeData(e, r),
            "input" === i ? (n.append.remove(),
            n.trigger.remove(),
            s.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : ("div" === i || "span" === i) && s.removeClass(this.markerClassName).empty())
        },
        _enableDatepicker: function(e) {
            var i, s, n = t(e), a = t.data(e, r);
            n.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(),
            "input" === i ? (e.disabled = !1,
            a.trigger.filter("button").each(function() {
                this.disabled = !1
            }).end().filter("img").css({
                opacity: "1.0",
                cursor: ""
            })) : ("div" === i || "span" === i) && (s = n.children("." + this._inlineClass),
            s.children().removeClass("ui-state-disabled"),
            s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)),
            this._disabledInputs = t.map(this._disabledInputs, function(t) {
                return t === e ? null : t
            }))
        },
        _disableDatepicker: function(e) {
            var i, s, n = t(e), a = t.data(e, r);
            n.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(),
            "input" === i ? (e.disabled = !0,
            a.trigger.filter("button").each(function() {
                this.disabled = !0
            }).end().filter("img").css({
                opacity: "0.5",
                cursor: "default"
            })) : ("div" === i || "span" === i) && (s = n.children("." + this._inlineClass),
            s.children().addClass("ui-state-disabled"),
            s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)),
            this._disabledInputs = t.map(this._disabledInputs, function(t) {
                return t === e ? null : t
            }),
            this._disabledInputs[this._disabledInputs.length] = e)
        },
        _isDisabledDatepicker: function(t) {
            if (!t)
                return !1;
            for (var e = 0; this._disabledInputs.length > e; e++)
                if (this._disabledInputs[e] === t)
                    return !0;
            return !1
        },
        _getInst: function(e) {
            try {
                return t.data(e, r)
            } catch (i) {
                throw "Missing instance data for this datepicker"
            }
        },
        _optionDatepicker: function(i, s, a) {
            var r, o, h, l, c = this._getInst(i);
            return 2 === arguments.length && "string" == typeof s ? "defaults" === s ? t.extend({}, t.datepicker._defaults) : c ? "all" === s ? t.extend({}, c.settings) : this._get(c, s) : null : (r = s || {},
            "string" == typeof s && (r = {},
            r[s] = a),
            c && (this._curInst === c && this._hideDatepicker(),
            o = this._getDateDatepicker(i, !0),
            h = this._getMinMaxDate(c, "min"),
            l = this._getMinMaxDate(c, "max"),
            n(c.settings, r),
            null !== h && r.dateFormat !== e && r.minDate === e && (c.settings.minDate = this._formatDate(c, h)),
            null !== l && r.dateFormat !== e && r.maxDate === e && (c.settings.maxDate = this._formatDate(c, l)),
            "disabled"in r && (r.disabled ? this._disableDatepicker(i) : this._enableDatepicker(i)),
            this._attachments(t(i), c),
            this._autoSize(c),
            this._setDate(c, o),
            this._updateAlternate(c),
            this._updateDatepicker(c)),
            e)
        },
        _changeDatepicker: function(t, e, i) {
            this._optionDatepicker(t, e, i)
        },
        _refreshDatepicker: function(t) {
            var e = this._getInst(t);
            e && this._updateDatepicker(e)
        },
        _setDateDatepicker: function(t, e) {
            var i = this._getInst(t);
            i && (this._setDate(i, e),
            this._updateDatepicker(i),
            this._updateAlternate(i))
        },
        _getDateDatepicker: function(t, e) {
            var i = this._getInst(t);
            return i && !i.inline && this._setDateFromField(i, e),
            i ? this._getDate(i) : null
        },
        _doKeyDown: function(e) {
            var i, s, n, a = t.datepicker._getInst(e.target), r = !0, o = a.dpDiv.is(".ui-datepicker-rtl");
            if (a._keyEvent = !0,
            t.datepicker._datepickerShowing)
                switch (e.keyCode) {
                case 9:
                    t.datepicker._hideDatepicker(),
                    r = !1;
                    break;
                case 13:
                    return n = t("td." + t.datepicker._dayOverClass + ":not(." + t.datepicker._currentClass + ")", a.dpDiv),
                    n[0] && t.datepicker._selectDay(e.target, a.selectedMonth, a.selectedYear, n[0]),
                    i = t.datepicker._get(a, "onSelect"),
                    i ? (s = t.datepicker._formatDate(a),
                    i.apply(a.input ? a.input[0] : null, [s, a])) : t.datepicker._hideDatepicker(),
                    !1;
                case 27:
                    t.datepicker._hideDatepicker();
                    break;
                case 33:
                    t.datepicker._adjustDate(e.target, e.ctrlKey ? -t.datepicker._get(a, "stepBigMonths") : -t.datepicker._get(a, "stepMonths"), "M");
                    break;
                case 34:
                    t.datepicker._adjustDate(e.target, e.ctrlKey ? +t.datepicker._get(a, "stepBigMonths") : +t.datepicker._get(a, "stepMonths"), "M");
                    break;
                case 35:
                    (e.ctrlKey || e.metaKey) && t.datepicker._clearDate(e.target),
                    r = e.ctrlKey || e.metaKey;
                    break;
                case 36:
                    (e.ctrlKey || e.metaKey) && t.datepicker._gotoToday(e.target),
                    r = e.ctrlKey || e.metaKey;
                    break;
                case 37:
                    (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, o ? 1 : -1, "D"),
                    r = e.ctrlKey || e.metaKey,
                    e.originalEvent.altKey && t.datepicker._adjustDate(e.target, e.ctrlKey ? -t.datepicker._get(a, "stepBigMonths") : -t.datepicker._get(a, "stepMonths"), "M");
                    break;
                case 38:
                    (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, -7, "D"),
                    r = e.ctrlKey || e.metaKey;
                    break;
                case 39:
                    (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, o ? -1 : 1, "D"),
                    r = e.ctrlKey || e.metaKey,
                    e.originalEvent.altKey && t.datepicker._adjustDate(e.target, e.ctrlKey ? +t.datepicker._get(a, "stepBigMonths") : +t.datepicker._get(a, "stepMonths"), "M");
                    break;
                case 40:
                    (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, 7, "D"),
                    r = e.ctrlKey || e.metaKey;
                    break;
                default:
                    r = !1
                }
            else
                36 === e.keyCode && e.ctrlKey ? t.datepicker._showDatepicker(this) : r = !1;
            r && (e.preventDefault(),
            e.stopPropagation())
        },
        _doKeyPress: function(i) {
            var s, n, a = t.datepicker._getInst(i.target);
            return t.datepicker._get(a, "constrainInput") ? (s = t.datepicker._possibleChars(t.datepicker._get(a, "dateFormat")),
            n = String.fromCharCode(null == i.charCode ? i.keyCode : i.charCode),
            i.ctrlKey || i.metaKey || " " > n || !s || s.indexOf(n) > -1) : e
        },
        _doKeyUp: function(e) {
            var i, s = t.datepicker._getInst(e.target);
            if (s.input.val() !== s.lastVal)
                try {
                    i = t.datepicker.parseDate(t.datepicker._get(s, "dateFormat"), s.input ? s.input.val() : null, t.datepicker._getFormatConfig(s)),
                    i && (t.datepicker._setDateFromField(s),
                    t.datepicker._updateAlternate(s),
                    t.datepicker._updateDatepicker(s))
                } catch (n) {}
            return !0
        },
        _showDatepicker: function(e) {
            if (e = e.target || e,
            "input" !== e.nodeName.toLowerCase() && (e = t("input", e.parentNode)[0]),
            !t.datepicker._isDisabledDatepicker(e) && t.datepicker._lastInput !== e) {
                var i, s, a, r, o, h, l;
                i = t.datepicker._getInst(e),
                t.datepicker._curInst && t.datepicker._curInst !== i && (t.datepicker._curInst.dpDiv.stop(!0, !0),
                i && t.datepicker._datepickerShowing && t.datepicker._hideDatepicker(t.datepicker._curInst.input[0])),
                s = t.datepicker._get(i, "beforeShow"),
                a = s ? s.apply(e, [e, i]) : {},
                a !== !1 && (n(i.settings, a),
                i.lastVal = null,
                t.datepicker._lastInput = e,
                t.datepicker._setDateFromField(i),
                t.datepicker._inDialog && (e.value = ""),
                t.datepicker._pos || (t.datepicker._pos = t.datepicker._findPos(e),
                t.datepicker._pos[1] += e.offsetHeight),
                r = !1,
                t(e).parents().each(function() {
                    return r |= "fixed" === t(this).css("position"),
                    !r
                }),
                o = {
                    left: t.datepicker._pos[0],
                    top: t.datepicker._pos[1]
                },
                t.datepicker._pos = null,
                i.dpDiv.empty(),
                i.dpDiv.css({
                    position: "absolute",
                    display: "block",
                    top: "-1000px"
                }),
                t.datepicker._updateDatepicker(i),
                o = t.datepicker._checkOffset(i, o, r),
                i.dpDiv.css({
                    position: t.datepicker._inDialog && t.blockUI ? "static" : r ? "fixed" : "absolute",
                    display: "none",
                    left: o.left + "px",
                    top: o.top + "px"
                }),
                i.inline || (h = t.datepicker._get(i, "showAnim"),
                l = t.datepicker._get(i, "duration"),
                i.dpDiv.zIndex(t(e).zIndex() + 1),
                t.datepicker._datepickerShowing = !0,
                t.effects && t.effects.effect[h] ? i.dpDiv.show(h, t.datepicker._get(i, "showOptions"), l) : i.dpDiv[h || "show"](h ? l : null),
                i.input.is(":visible") && !i.input.is(":disabled") && i.input.focus(),
                t.datepicker._curInst = i))
            }
        },
        _updateDatepicker: function(e) {
            this.maxRows = 4,
            a = e,
            e.dpDiv.empty().append(this._generateHTML(e)),
            this._attachHandlers(e),
            e.dpDiv.find("." + this._dayOverClass + " a").mouseover();
            var i, s = this._getNumberOfMonths(e), n = s[1], r = 17;
            e.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),
            n > 1 && e.dpDiv.addClass("ui-datepicker-multi-" + n).css("width", r * n + "em"),
            e.dpDiv[(1 !== s[0] || 1 !== s[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"),
            e.dpDiv[(this._get(e, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"),
            e === t.datepicker._curInst && t.datepicker._datepickerShowing && e.input && e.input.is(":visible") && !e.input.is(":disabled") && e.input[0] !== document.activeElement && e.input.focus(),
            e.yearshtml && (i = e.yearshtml,
            setTimeout(function() {
                i === e.yearshtml && e.yearshtml && e.dpDiv.find("select.ui-datepicker-year:first").replaceWith(e.yearshtml),
                i = e.yearshtml = null
            }, 0))
        },
        _getBorders: function(t) {
            var e = function(t) {
                return {
                    thin: 1,
                    medium: 2,
                    thick: 3
                }[t] || t
            };
            return [parseFloat(e(t.css("border-left-width"))), parseFloat(e(t.css("border-top-width")))]
        },
        _checkOffset: function(e, i, s) {
            var n = e.dpDiv.outerWidth()
              , a = e.dpDiv.outerHeight()
              , r = e.input ? e.input.outerWidth() : 0
              , o = e.input ? e.input.outerHeight() : 0
              , h = document.documentElement.clientWidth + (s ? 0 : t(document).scrollLeft())
              , l = document.documentElement.clientHeight + (s ? 0 : t(document).scrollTop());
            return i.left -= this._get(e, "isRTL") ? n - r : 0,
            i.left -= s && i.left === e.input.offset().left ? t(document).scrollLeft() : 0,
            i.top -= s && i.top === e.input.offset().top + o ? t(document).scrollTop() : 0,
            i.left -= Math.min(i.left, i.left + n > h && h > n ? Math.abs(i.left + n - h) : 0),
            i.top -= Math.min(i.top, i.top + a > l && l > a ? Math.abs(a + o) : 0),
            i
        },
        _findPos: function(e) {
            for (var i, s = this._getInst(e), n = this._get(s, "isRTL"); e && ("hidden" === e.type || 1 !== e.nodeType || t.expr.filters.hidden(e)); )
                e = e[n ? "previousSibling" : "nextSibling"];
            return i = t(e).offset(),
            [i.left, i.top]
        },
        _hideDatepicker: function(e) {
            var i, s, n, a, o = this._curInst;
            !o || e && o !== t.data(e, r) || this._datepickerShowing && (i = this._get(o, "showAnim"),
            s = this._get(o, "duration"),
            n = function() {
                t.datepicker._tidyDialog(o)
            }
            ,
            t.effects && (t.effects.effect[i] || t.effects[i]) ? o.dpDiv.hide(i, t.datepicker._get(o, "showOptions"), s, n) : o.dpDiv["slideDown" === i ? "slideUp" : "fadeIn" === i ? "fadeOut" : "hide"](i ? s : null, n),
            i || n(),
            this._datepickerShowing = !1,
            a = this._get(o, "onClose"),
            a && a.apply(o.input ? o.input[0] : null, [o.input ? o.input.val() : "", o]),
            this._lastInput = null,
            this._inDialog && (this._dialogInput.css({
                position: "absolute",
                left: "0",
                top: "-100px"
            }),
            t.blockUI && (t.unblockUI(),
            t("body").append(this.dpDiv))),
            this._inDialog = !1)
        },
        _tidyDialog: function(t) {
            t.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },
        _checkExternalClick: function(e) {
            if (t.datepicker._curInst) {
                var i = t(e.target)
                  , s = t.datepicker._getInst(i[0]);
                (i[0].id !== t.datepicker._mainDivId && 0 === i.parents("#" + t.datepicker._mainDivId).length && !i.hasClass(t.datepicker.markerClassName) && !i.closest("." + t.datepicker._triggerClass).length && t.datepicker._datepickerShowing && (!t.datepicker._inDialog || !t.blockUI) || i.hasClass(t.datepicker.markerClassName) && t.datepicker._curInst !== s) && t.datepicker._hideDatepicker()
            }
        },
        _adjustDate: function(e, i, s) {
            var n = t(e)
              , a = this._getInst(n[0]);
            this._isDisabledDatepicker(n[0]) || (this._adjustInstDate(a, i + ("M" === s ? this._get(a, "showCurrentAtPos") : 0), s),
            this._updateDatepicker(a))
        },
        _gotoToday: function(e) {
            var i, s = t(e), n = this._getInst(s[0]);
            this._get(n, "gotoCurrent") && n.currentDay ? (n.selectedDay = n.currentDay,
            n.drawMonth = n.selectedMonth = n.currentMonth,
            n.drawYear = n.selectedYear = n.currentYear) : (i = new Date,
            n.selectedDay = i.getDate(),
            n.drawMonth = n.selectedMonth = i.getMonth(),
            n.drawYear = n.selectedYear = i.getFullYear()),
            this._notifyChange(n),
            this._adjustDate(s)
        },
        _selectMonthYear: function(e, i, s) {
            var n = t(e)
              , a = this._getInst(n[0]);
            a["selected" + ("M" === s ? "Month" : "Year")] = a["draw" + ("M" === s ? "Month" : "Year")] = parseInt(i.options[i.selectedIndex].value, 10),
            this._notifyChange(a),
            this._adjustDate(n)
        },
        _selectDay: function(e, i, s, n) {
            var a, r = t(e);
            t(n).hasClass(this._unselectableClass) || this._isDisabledDatepicker(r[0]) || (a = this._getInst(r[0]),
            a.selectedDay = a.currentDay = t("a", n).html(),
            a.selectedMonth = a.currentMonth = i,
            a.selectedYear = a.currentYear = s,
            this._selectDate(e, this._formatDate(a, a.currentDay, a.currentMonth, a.currentYear)))
        },
        _clearDate: function(e) {
            var i = t(e);
            this._selectDate(i, "")
        },
        _selectDate: function(e, i) {
            var s, n = t(e), a = this._getInst(n[0]);
            i = null != i ? i : this._formatDate(a),
            a.input && a.input.val(i),
            this._updateAlternate(a),
            s = this._get(a, "onSelect"),
            s ? s.apply(a.input ? a.input[0] : null, [i, a]) : a.input && a.input.trigger("change"),
            a.inline ? this._updateDatepicker(a) : (this._hideDatepicker(),
            this._lastInput = a.input[0],
            "object" != typeof a.input[0] && a.input.focus(),
            this._lastInput = null)
        },
        _updateAlternate: function(e) {
            var i, s, n, a = this._get(e, "altField");
            a && (i = this._get(e, "altFormat") || this._get(e, "dateFormat"),
            s = this._getDate(e),
            n = this.formatDate(i, s, this._getFormatConfig(e)),
            t(a).each(function() {
                t(this).val(n)
            }))
        },
        noWeekends: function(t) {
            var e = t.getDay();
            return [e > 0 && 6 > e, ""]
        },
        iso8601Week: function(t) {
            var e, i = new Date(t.getTime());
            return i.setDate(i.getDate() + 4 - (i.getDay() || 7)),
            e = i.getTime(),
            i.setMonth(0),
            i.setDate(1),
            Math.floor(Math.round((e - i) / 864e5) / 7) + 1
        },
        parseDate: function(i, s, n) {
            if (null == i || null == s)
                throw "Invalid arguments";
            if (s = "object" == typeof s ? "" + s : s + "",
            "" === s)
                return null;
            var a, r, o, h, l = 0, c = (n ? n.shortYearCutoff : null) || this._defaults.shortYearCutoff, u = "string" != typeof c ? c : (new Date).getFullYear() % 100 + parseInt(c, 10), d = (n ? n.dayNamesShort : null) || this._defaults.dayNamesShort, p = (n ? n.dayNames : null) || this._defaults.dayNames, f = (n ? n.monthNamesShort : null) || this._defaults.monthNamesShort, m = (n ? n.monthNames : null) || this._defaults.monthNames, g = -1, v = -1, _ = -1, b = -1, y = !1, w = function(t) {
                var e = i.length > a + 1 && i.charAt(a + 1) === t;
                return e && a++,
                e
            }, k = function(t) {
                var e = w(t)
                  , i = "@" === t ? 14 : "!" === t ? 20 : "y" === t && e ? 4 : "o" === t ? 3 : 2
                  , n = RegExp("^\\d{1," + i + "}")
                  , a = s.substring(l).match(n);
                if (!a)
                    throw "Missing number at position " + l;
                return l += a[0].length,
                parseInt(a[0], 10)
            }, x = function(i, n, a) {
                var r = -1
                  , o = t.map(w(i) ? a : n, function(t, e) {
                    return [[e, t]]
                }).sort(function(t, e) {
                    return -(t[1].length - e[1].length)
                });
                if (t.each(o, function(t, i) {
                    var n = i[1];
                    return s.substr(l, n.length).toLowerCase() === n.toLowerCase() ? (r = i[0],
                    l += n.length,
                    !1) : e
                }),
                -1 !== r)
                    return r + 1;
                throw "Unknown name at position " + l
            }, D = function() {
                if (s.charAt(l) !== i.charAt(a))
                    throw "Unexpected literal at position " + l;
                l++
            };
            for (a = 0; i.length > a; a++)
                if (y)
                    "'" !== i.charAt(a) || w("'") ? D() : y = !1;
                else
                    switch (i.charAt(a)) {
                    case "d":
                        _ = k("d");
                        break;
                    case "D":
                        x("D", d, p);
                        break;
                    case "o":
                        b = k("o");
                        break;
                    case "m":
                        v = k("m");
                        break;
                    case "M":
                        v = x("M", f, m);
                        break;
                    case "y":
                        g = k("y");
                        break;
                    case "@":
                        h = new Date(k("@")),
                        g = h.getFullYear(),
                        v = h.getMonth() + 1,
                        _ = h.getDate();
                        break;
                    case "!":
                        h = new Date((k("!") - this._ticksTo1970) / 1e4),
                        g = h.getFullYear(),
                        v = h.getMonth() + 1,
                        _ = h.getDate();
                        break;
                    case "'":
                        w("'") ? D() : y = !0;
                        break;
                    default:
                        D()
                    }
            if (s.length > l && (o = s.substr(l),
            !/^\s+/.test(o)))
                throw "Extra/unparsed characters found in date: " + o;
            if (-1 === g ? g = (new Date).getFullYear() : 100 > g && (g += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (u >= g ? 0 : -100)),
            b > -1)
                for (v = 1,
                _ = b; ; ) {
                    if (r = this._getDaysInMonth(g, v - 1),
                    r >= _)
                        break;
                    v++,
                    _ -= r
                }
            if (h = this._daylightSavingAdjust(new Date(g,v - 1,_)),
            h.getFullYear() !== g || h.getMonth() + 1 !== v || h.getDate() !== _)
                throw "Invalid date";
            return h
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: 1e7 * 60 * 60 * 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)),
        formatDate: function(t, e, i) {
            if (!e)
                return "";
            var s, n = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort, a = (i ? i.dayNames : null) || this._defaults.dayNames, r = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort, o = (i ? i.monthNames : null) || this._defaults.monthNames, h = function(e) {
                var i = t.length > s + 1 && t.charAt(s + 1) === e;
                return i && s++,
                i
            }, l = function(t, e, i) {
                var s = "" + e;
                if (h(t))
                    for (; i > s.length; )
                        s = "0" + s;
                return s
            }, c = function(t, e, i, s) {
                return h(t) ? s[e] : i[e]
            }, u = "", d = !1;
            if (e)
                for (s = 0; t.length > s; s++)
                    if (d)
                        "'" !== t.charAt(s) || h("'") ? u += t.charAt(s) : d = !1;
                    else
                        switch (t.charAt(s)) {
                        case "d":
                            u += l("d", e.getDate(), 2);
                            break;
                        case "D":
                            u += c("D", e.getDay(), n, a);
                            break;
                        case "o":
                            u += l("o", Math.round((new Date(e.getFullYear(),e.getMonth(),e.getDate()).getTime() - new Date(e.getFullYear(),0,0).getTime()) / 864e5), 3);
                            break;
                        case "m":
                            u += l("m", e.getMonth() + 1, 2);
                            break;
                        case "M":
                            u += c("M", e.getMonth(), r, o);
                            break;
                        case "y":
                            u += h("y") ? e.getFullYear() : (10 > e.getYear() % 100 ? "0" : "") + e.getYear() % 100;
                            break;
                        case "@":
                            u += e.getTime();
                            break;
                        case "!":
                            u += 1e4 * e.getTime() + this._ticksTo1970;
                            break;
                        case "'":
                            h("'") ? u += "'" : d = !0;
                            break;
                        default:
                            u += t.charAt(s)
                        }
            return u
        },
        _possibleChars: function(t) {
            var e, i = "", s = !1, n = function(i) {
                var s = t.length > e + 1 && t.charAt(e + 1) === i;
                return s && e++,
                s
            };
            for (e = 0; t.length > e; e++)
                if (s)
                    "'" !== t.charAt(e) || n("'") ? i += t.charAt(e) : s = !1;
                else
                    switch (t.charAt(e)) {
                    case "d":
                    case "m":
                    case "y":
                    case "@":
                        i += "0123456789";
                        break;
                    case "D":
                    case "M":
                        return null;
                    case "'":
                        n("'") ? i += "'" : s = !0;
                        break;
                    default:
                        i += t.charAt(e)
                    }
            return i
        },
        _get: function(t, i) {
            return t.settings[i] !== e ? t.settings[i] : this._defaults[i]
        },
        _setDateFromField: function(t, e) {
            if (t.input.val() !== t.lastVal) {
                var i = this._get(t, "dateFormat")
                  , s = t.lastVal = t.input ? t.input.val() : null
                  , n = this._getDefaultDate(t)
                  , a = n
                  , r = this._getFormatConfig(t);
                try {
                    a = this.parseDate(i, s, r) || n
                } catch (o) {
                    s = e ? "" : s
                }
                t.selectedDay = a.getDate(),
                t.drawMonth = t.selectedMonth = a.getMonth(),
                t.drawYear = t.selectedYear = a.getFullYear(),
                t.currentDay = s ? a.getDate() : 0,
                t.currentMonth = s ? a.getMonth() : 0,
                t.currentYear = s ? a.getFullYear() : 0,
                this._adjustInstDate(t)
            }
        },
        _getDefaultDate: function(t) {
            return this._restrictMinMax(t, this._determineDate(t, this._get(t, "defaultDate"), new Date))
        },
        _determineDate: function(e, i, s) {
            var n = function(t) {
                var e = new Date;
                return e.setDate(e.getDate() + t),
                e
            }
              , a = function(i) {
                try {
                    return t.datepicker.parseDate(t.datepicker._get(e, "dateFormat"), i, t.datepicker._getFormatConfig(e))
                } catch (s) {}
                for (var n = (i.toLowerCase().match(/^c/) ? t.datepicker._getDate(e) : null) || new Date, a = n.getFullYear(), r = n.getMonth(), o = n.getDate(), h = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, l = h.exec(i); l; ) {
                    switch (l[2] || "d") {
                    case "d":
                    case "D":
                        o += parseInt(l[1], 10);
                        break;
                    case "w":
                    case "W":
                        o += 7 * parseInt(l[1], 10);
                        break;
                    case "m":
                    case "M":
                        r += parseInt(l[1], 10),
                        o = Math.min(o, t.datepicker._getDaysInMonth(a, r));
                        break;
                    case "y":
                    case "Y":
                        a += parseInt(l[1], 10),
                        o = Math.min(o, t.datepicker._getDaysInMonth(a, r))
                    }
                    l = h.exec(i)
                }
                return new Date(a,r,o)
            }
              , r = null == i || "" === i ? s : "string" == typeof i ? a(i) : "number" == typeof i ? isNaN(i) ? s : n(i) : new Date(i.getTime());
            return r = r && "Invalid Date" == "" + r ? s : r,
            r && (r.setHours(0),
            r.setMinutes(0),
            r.setSeconds(0),
            r.setMilliseconds(0)),
            this._daylightSavingAdjust(r)
        },
        _daylightSavingAdjust: function(t) {
            return t ? (t.setHours(t.getHours() > 12 ? t.getHours() + 2 : 0),
            t) : null
        },
        _setDate: function(t, e, i) {
            var s = !e
              , n = t.selectedMonth
              , a = t.selectedYear
              , r = this._restrictMinMax(t, this._determineDate(t, e, new Date));
            t.selectedDay = t.currentDay = r.getDate(),
            t.drawMonth = t.selectedMonth = t.currentMonth = r.getMonth(),
            t.drawYear = t.selectedYear = t.currentYear = r.getFullYear(),
            n === t.selectedMonth && a === t.selectedYear || i || this._notifyChange(t),
            this._adjustInstDate(t),
            t.input && t.input.val(s ? "" : this._formatDate(t))
        },
        _getDate: function(t) {
            var e = !t.currentYear || t.input && "" === t.input.val() ? null : this._daylightSavingAdjust(new Date(t.currentYear,t.currentMonth,t.currentDay));
            return e
        },
        _attachHandlers: function(e) {
            var i = this._get(e, "stepMonths")
              , s = "#" + e.id.replace(/\\\\/g, "\\");
            e.dpDiv.find("[data-handler]").map(function() {
                var e = {
                    prev: function() {
                        window["DP_jQuery_" + o].datepicker._adjustDate(s, -i, "M")
                    },
                    next: function() {
                        window["DP_jQuery_" + o].datepicker._adjustDate(s, +i, "M")
                    },
                    hide: function() {
                        window["DP_jQuery_" + o].datepicker._hideDatepicker()
                    },
                    today: function() {
                        window["DP_jQuery_" + o].datepicker._gotoToday(s)
                    },
                    selectDay: function() {
                        return window["DP_jQuery_" + o].datepicker._selectDay(s, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this),
                        !1
                    },
                    selectMonth: function() {
                        return window["DP_jQuery_" + o].datepicker._selectMonthYear(s, this, "M"),
                        !1
                    },
                    selectYear: function() {
                        return window["DP_jQuery_" + o].datepicker._selectMonthYear(s, this, "Y"),
                        !1
                    }
                };
                t(this).bind(this.getAttribute("data-event"), e[this.getAttribute("data-handler")])
            })
        },
        _generateHTML: function(t) {
            var e, i, s, n, a, r, o, h, l, c, u, d, p, f, m, g, v, _, b, y, w, k, x, D, T, C, S, M, N, I, P, A, z, H, E, F, O, W, j, R = new Date, L = this._daylightSavingAdjust(new Date(R.getFullYear(),R.getMonth(),R.getDate())), Y = this._get(t, "isRTL"), B = this._get(t, "showButtonPanel"), J = this._get(t, "hideIfNoPrevNext"), Q = this._get(t, "navigationAsDateFormat"), K = this._getNumberOfMonths(t), V = this._get(t, "showCurrentAtPos"), U = this._get(t, "stepMonths"), q = 1 !== K[0] || 1 !== K[1], X = this._daylightSavingAdjust(t.currentDay ? new Date(t.currentYear,t.currentMonth,t.currentDay) : new Date(9999,9,9)), G = this._getMinMaxDate(t, "min"), $ = this._getMinMaxDate(t, "max"), Z = t.drawMonth - V, te = t.drawYear;
            if (0 > Z && (Z += 12,
            te--),
            $)
                for (e = this._daylightSavingAdjust(new Date($.getFullYear(),$.getMonth() - K[0] * K[1] + 1,$.getDate())),
                e = G && G > e ? G : e; this._daylightSavingAdjust(new Date(te,Z,1)) > e; )
                    Z--,
                    0 > Z && (Z = 11,
                    te--);
            for (t.drawMonth = Z,
            t.drawYear = te,
            i = this._get(t, "prevText"),
            i = Q ? this.formatDate(i, this._daylightSavingAdjust(new Date(te,Z - U,1)), this._getFormatConfig(t)) : i,
            s = this._canAdjustMonth(t, -1, te, Z) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "e" : "w") + "'>" + i + "</span></a>" : J ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "e" : "w") + "'>" + i + "</span></a>",
            n = this._get(t, "nextText"),
            n = Q ? this.formatDate(n, this._daylightSavingAdjust(new Date(te,Z + U,1)), this._getFormatConfig(t)) : n,
            a = this._canAdjustMonth(t, 1, te, Z) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + n + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "w" : "e") + "'>" + n + "</span></a>" : J ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + n + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "w" : "e") + "'>" + n + "</span></a>",
            r = this._get(t, "currentText"),
            o = this._get(t, "gotoCurrent") && t.currentDay ? X : L,
            r = Q ? this.formatDate(r, o, this._getFormatConfig(t)) : r,
            h = t.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(t, "closeText") + "</button>",
            l = B ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (Y ? h : "") + (this._isInRange(t, o) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + r + "</button>" : "") + (Y ? "" : h) + "</div>" : "",
            c = parseInt(this._get(t, "firstDay"), 10),
            c = isNaN(c) ? 0 : c,
            u = this._get(t, "showWeek"),
            d = this._get(t, "dayNames"),
            p = this._get(t, "dayNamesMin"),
            f = this._get(t, "monthNames"),
            m = this._get(t, "monthNamesShort"),
            g = this._get(t, "beforeShowDay"),
            v = this._get(t, "showOtherMonths"),
            _ = this._get(t, "selectOtherMonths"),
            b = this._getDefaultDate(t),
            y = "",
            k = 0; K[0] > k; k++) {
                for (x = "",
                this.maxRows = 4,
                D = 0; K[1] > D; D++) {
                    if (T = this._daylightSavingAdjust(new Date(te,Z,t.selectedDay)),
                    C = " ui-corner-all",
                    S = "",
                    q) {
                        if (S += "<div class='ui-datepicker-group",
                        K[1] > 1)
                            switch (D) {
                            case 0:
                                S += " ui-datepicker-group-first",
                                C = " ui-corner-" + (Y ? "right" : "left");
                                break;
                            case K[1] - 1:
                                S += " ui-datepicker-group-last",
                                C = " ui-corner-" + (Y ? "left" : "right");
                                break;
                            default:
                                S += " ui-datepicker-group-middle",
                                C = ""
                            }
                        S += "'>"
                    }
                    for (S += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + C + "'>" + (/all|left/.test(C) && 0 === k ? Y ? a : s : "") + (/all|right/.test(C) && 0 === k ? Y ? s : a : "") + this._generateMonthYearHeader(t, Z, te, G, $, k > 0 || D > 0, f, m) + "</div><table class='ui-datepicker-calendar'><thead>" + "<tr>",
                    M = u ? "<th class='ui-datepicker-week-col'>" + this._get(t, "weekHeader") + "</th>" : "",
                    w = 0; 7 > w; w++)
                        N = (w + c) % 7,
                        M += "<th" + ((w + c + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + ">" + "<span title='" + d[N] + "'>" + p[N] + "</span></th>";
                    for (S += M + "</tr></thead><tbody>",
                    I = this._getDaysInMonth(te, Z),
                    te === t.selectedYear && Z === t.selectedMonth && (t.selectedDay = Math.min(t.selectedDay, I)),
                    P = (this._getFirstDayOfMonth(te, Z) - c + 7) % 7,
                    A = Math.ceil((P + I) / 7),
                    z = q ? this.maxRows > A ? this.maxRows : A : A,
                    this.maxRows = z,
                    H = this._daylightSavingAdjust(new Date(te,Z,1 - P)),
                    E = 0; z > E; E++) {
                        for (S += "<tr>",
                        F = u ? "<td class='ui-datepicker-week-col'>" + this._get(t, "calculateWeek")(H) + "</td>" : "",
                        w = 0; 7 > w; w++)
                            O = g ? g.apply(t.input ? t.input[0] : null, [H]) : [!0, ""],
                            W = H.getMonth() !== Z,
                            j = W && !_ || !O[0] || G && G > H || $ && H > $,
                            F += "<td class='" + ((w + c + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (W ? " ui-datepicker-other-month" : "") + (H.getTime() === T.getTime() && Z === t.selectedMonth && t._keyEvent || b.getTime() === H.getTime() && b.getTime() === T.getTime() ? " " + this._dayOverClass : "") + (j ? " " + this._unselectableClass + " ui-state-disabled" : "") + (W && !v ? "" : " " + O[1] + (H.getTime() === X.getTime() ? " " + this._currentClass : "") + (H.getTime() === L.getTime() ? " ui-datepicker-today" : "")) + "'" + (W && !v || !O[2] ? "" : " title='" + O[2].replace(/'/g, "&#39;") + "'") + (j ? "" : " data-handler='selectDay' data-event='click' data-month='" + H.getMonth() + "' data-year='" + H.getFullYear() + "'") + ">" + (W && !v ? "&#xa0;" : j ? "<span class='ui-state-default'>" + H.getDate() + "</span>" : "<a class='ui-state-default" + (H.getTime() === L.getTime() ? " ui-state-highlight" : "") + (H.getTime() === X.getTime() ? " ui-state-active" : "") + (W ? " ui-priority-secondary" : "") + "' href='#'>" + H.getDate() + "</a>") + "</td>",
                            H.setDate(H.getDate() + 1),
                            H = this._daylightSavingAdjust(H);
                        S += F + "</tr>"
                    }
                    Z++,
                    Z > 11 && (Z = 0,
                    te++),
                    S += "</tbody></table>" + (q ? "</div>" + (K[0] > 0 && D === K[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""),
                    x += S
                }
                y += x
            }
            return y += l,
            t._keyEvent = !1,
            y
        },
        _generateMonthYearHeader: function(t, e, i, s, n, a, r, o) {
            var h, l, c, u, d, p, f, m, g = this._get(t, "changeMonth"), v = this._get(t, "changeYear"), _ = this._get(t, "showMonthAfterYear"), b = "<div class='ui-datepicker-title'>", y = "";
            if (a || !g)
                y += "<span class='ui-datepicker-month'>" + r[e] + "</span>";
            else {
                for (h = s && s.getFullYear() === i,
                l = n && n.getFullYear() === i,
                y += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>",
                c = 0; 12 > c; c++)
                    (!h || c >= s.getMonth()) && (!l || n.getMonth() >= c) && (y += "<option value='" + c + "'" + (c === e ? " selected='selected'" : "") + ">" + o[c] + "</option>");
                y += "</select>"
            }
            if (_ || (b += y + (!a && g && v ? "" : "&#xa0;")),
            !t.yearshtml)
                if (t.yearshtml = "",
                a || !v)
                    b += "<span class='ui-datepicker-year'>" + i + "</span>";
                else {
                    for (u = this._get(t, "yearRange").split(":"),
                    d = (new Date).getFullYear(),
                    p = function(t) {
                        var e = t.match(/c[+\-].*/) ? i + parseInt(t.substring(1), 10) : t.match(/[+\-].*/) ? d + parseInt(t, 10) : parseInt(t, 10);
                        return isNaN(e) ? d : e
                    }
                    ,
                    f = p(u[0]),
                    m = Math.max(f, p(u[1] || "")),
                    f = s ? Math.max(f, s.getFullYear()) : f,
                    m = n ? Math.min(m, n.getFullYear()) : m,
                    t.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; m >= f; f++)
                        t.yearshtml += "<option value='" + f + "'" + (f === i ? " selected='selected'" : "") + ">" + f + "</option>";
                    t.yearshtml += "</select>",
                    b += t.yearshtml,
                    t.yearshtml = null
                }
            return b += this._get(t, "yearSuffix"),
            _ && (b += (!a && g && v ? "" : "&#xa0;") + y),
            b += "</div>"
        },
        _adjustInstDate: function(t, e, i) {
            var s = t.drawYear + ("Y" === i ? e : 0)
              , n = t.drawMonth + ("M" === i ? e : 0)
              , a = Math.min(t.selectedDay, this._getDaysInMonth(s, n)) + ("D" === i ? e : 0)
              , r = this._restrictMinMax(t, this._daylightSavingAdjust(new Date(s,n,a)));
            t.selectedDay = r.getDate(),
            t.drawMonth = t.selectedMonth = r.getMonth(),
            t.drawYear = t.selectedYear = r.getFullYear(),
            ("M" === i || "Y" === i) && this._notifyChange(t)
        },
        _restrictMinMax: function(t, e) {
            var i = this._getMinMaxDate(t, "min")
              , s = this._getMinMaxDate(t, "max")
              , n = i && i > e ? i : e;
            return s && n > s ? s : n
        },
        _notifyChange: function(t) {
            var e = this._get(t, "onChangeMonthYear");
            e && e.apply(t.input ? t.input[0] : null, [t.selectedYear, t.selectedMonth + 1, t])
        },
        _getNumberOfMonths: function(t) {
            var e = this._get(t, "numberOfMonths");
            return null == e ? [1, 1] : "number" == typeof e ? [1, e] : e
        },
        _getMinMaxDate: function(t, e) {
            return this._determineDate(t, this._get(t, e + "Date"), null)
        },
        _getDaysInMonth: function(t, e) {
            return 32 - this._daylightSavingAdjust(new Date(t,e,32)).getDate()
        },
        _getFirstDayOfMonth: function(t, e) {
            return new Date(t,e,1).getDay()
        },
        _canAdjustMonth: function(t, e, i, s) {
            var n = this._getNumberOfMonths(t)
              , a = this._daylightSavingAdjust(new Date(i,s + (0 > e ? e : n[0] * n[1]),1));
            return 0 > e && a.setDate(this._getDaysInMonth(a.getFullYear(), a.getMonth())),
            this._isInRange(t, a)
        },
        _isInRange: function(t, e) {
            var i, s, n = this._getMinMaxDate(t, "min"), a = this._getMinMaxDate(t, "max"), r = null, o = null, h = this._get(t, "yearRange");
            return h && (i = h.split(":"),
            s = (new Date).getFullYear(),
            r = parseInt(i[0], 10),
            o = parseInt(i[1], 10),
            i[0].match(/[+\-].*/) && (r += s),
            i[1].match(/[+\-].*/) && (o += s)),
            (!n || e.getTime() >= n.getTime()) && (!a || e.getTime() <= a.getTime()) && (!r || e.getFullYear() >= r) && (!o || o >= e.getFullYear())
        },
        _getFormatConfig: function(t) {
            var e = this._get(t, "shortYearCutoff");
            return e = "string" != typeof e ? e : (new Date).getFullYear() % 100 + parseInt(e, 10),
            {
                shortYearCutoff: e,
                dayNamesShort: this._get(t, "dayNamesShort"),
                dayNames: this._get(t, "dayNames"),
                monthNamesShort: this._get(t, "monthNamesShort"),
                monthNames: this._get(t, "monthNames")
            }
        },
        _formatDate: function(t, e, i, s) {
            e || (t.currentDay = t.selectedDay,
            t.currentMonth = t.selectedMonth,
            t.currentYear = t.selectedYear);
            var n = e ? "object" == typeof e ? e : this._daylightSavingAdjust(new Date(s,i,e)) : this._daylightSavingAdjust(new Date(t.currentYear,t.currentMonth,t.currentDay));
            return this.formatDate(this._get(t, "dateFormat"), n, this._getFormatConfig(t))
        }
    }),
    t.fn.datepicker = function(e) {
        if (!this.length)
            return this;
        t.datepicker.initialized || (t(document).mousedown(t.datepicker._checkExternalClick),
        t.datepicker.initialized = !0),
        0 === t("#" + t.datepicker._mainDivId).length && t("body").append(t.datepicker.dpDiv);
        var i = Array.prototype.slice.call(arguments, 1);
        return "string" != typeof e || "isDisabled" !== e && "getDate" !== e && "widget" !== e ? "option" === e && 2 === arguments.length && "string" == typeof arguments[1] ? t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this[0]].concat(i)) : this.each(function() {
            "string" == typeof e ? t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this].concat(i)) : t.datepicker._attachDatepicker(this, e)
        }) : t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this[0]].concat(i))
    }
    ,
    t.datepicker = new i,
    t.datepicker.initialized = !1,
    t.datepicker.uuid = (new Date).getTime(),
    t.datepicker.version = "1.10.2",
    window["DP_jQuery_" + o] = t
}
)(jQuery);

/* collective.js.jqueryui: jquery-ui-i18n.js */

/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Includes: jquery.ui.datepicker-af.js, jquery.ui.datepicker-ar-DZ.js, jquery.ui.datepicker-ar.js, jquery.ui.datepicker-az.js, jquery.ui.datepicker-be.js, jquery.ui.datepicker-bg.js, jquery.ui.datepicker-bs.js, jquery.ui.datepicker-ca.js, jquery.ui.datepicker-cs.js, jquery.ui.datepicker-cy-GB.js, jquery.ui.datepicker-da.js, jquery.ui.datepicker-de.js, jquery.ui.datepicker-el.js, jquery.ui.datepicker-en-AU.js, jquery.ui.datepicker-en-GB.js, jquery.ui.datepicker-en-NZ.js, jquery.ui.datepicker-eo.js, jquery.ui.datepicker-es.js, jquery.ui.datepicker-et.js, jquery.ui.datepicker-eu.js, jquery.ui.datepicker-fa.js, jquery.ui.datepicker-fi.js, jquery.ui.datepicker-fo.js, jquery.ui.datepicker-fr-CA.js, jquery.ui.datepicker-fr-CH.js, jquery.ui.datepicker-fr.js, jquery.ui.datepicker-gl.js, jquery.ui.datepicker-he.js, jquery.ui.datepicker-hi.js, jquery.ui.datepicker-hr.js, jquery.ui.datepicker-hu.js, jquery.ui.datepicker-hy.js, jquery.ui.datepicker-id.js, jquery.ui.datepicker-is.js, jquery.ui.datepicker-it.js, jquery.ui.datepicker-ja.js, jquery.ui.datepicker-ka.js, jquery.ui.datepicker-kk.js, jquery.ui.datepicker-km.js, jquery.ui.datepicker-ko.js, jquery.ui.datepicker-ky.js, jquery.ui.datepicker-lb.js, jquery.ui.datepicker-lt.js, jquery.ui.datepicker-lv.js, jquery.ui.datepicker-mk.js, jquery.ui.datepicker-ml.js, jquery.ui.datepicker-ms.js, jquery.ui.datepicker-nb.js, jquery.ui.datepicker-nl-BE.js, jquery.ui.datepicker-nl.js, jquery.ui.datepicker-nn.js, jquery.ui.datepicker-no.js, jquery.ui.datepicker-pl.js, jquery.ui.datepicker-pt-BR.js, jquery.ui.datepicker-pt.js, jquery.ui.datepicker-rm.js, jquery.ui.datepicker-ro.js, jquery.ui.datepicker-ru.js, jquery.ui.datepicker-sk.js, jquery.ui.datepicker-sl.js, jquery.ui.datepicker-sq.js, jquery.ui.datepicker-sr-SR.js, jquery.ui.datepicker-sr.js, jquery.ui.datepicker-sv.js, jquery.ui.datepicker-ta.js, jquery.ui.datepicker-th.js, jquery.ui.datepicker-tj.js, jquery.ui.datepicker-tr.js, jquery.ui.datepicker-uk.js, jquery.ui.datepicker-vi.js, jquery.ui.datepicker-zh-CN.js, jquery.ui.datepicker-zh-HK.js, jquery.ui.datepicker-zh-TW.js
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
jQuery(function(e) {
    e.datepicker.regional.af = {
        closeText: "Selekteer",
        prevText: "Vorige",
        nextText: "Volgende",
        currentText: "Vandag",
        monthNames: ["Januarie", "Februarie", "Maart", "April", "Mei", "Junie", "Julie", "Augustus", "September", "Oktober", "November", "Desember"],
        monthNamesShort: ["Jan", "Feb", "Mrt", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"],
        dayNames: ["Sondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrydag", "Saterdag"],
        dayNamesShort: ["Son", "Maa", "Din", "Woe", "Don", "Vry", "Sat"],
        dayNamesMin: ["So", "Ma", "Di", "Wo", "Do", "Vr", "Sa"],
        weekHeader: "Wk",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.af)
}),
jQuery(function(e) {
    e.datepicker.regional["ar-DZ"] = {
        closeText: "إغلاق",
        prevText: "&#x3C;السابق",
        nextText: "التالي&#x3E;",
        currentText: "اليوم",
        monthNames: ["جانفي", "فيفري", "مارس", "أفريل", "ماي", "جوان", "جويلية", "أوت", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
        monthNamesShort: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        dayNames: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
        dayNamesShort: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
        dayNamesMin: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
        weekHeader: "أسبوع",
        dateFormat: "dd/mm/yy",
        firstDay: 6,
        isRTL: !0,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional["ar-DZ"])
}),
jQuery(function(e) {
    e.datepicker.regional.ar = {
        closeText: "إغلاق",
        prevText: "&#x3C;السابق",
        nextText: "التالي&#x3E;",
        currentText: "اليوم",
        monthNames: ["كانون الثاني", "شباط", "آذار", "نيسان", "مايو", "حزيران", "تموز", "آب", "أيلول", "تشرين الأول", "تشرين الثاني", "كانون الأول"],
        monthNamesShort: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        dayNames: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
        dayNamesShort: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
        dayNamesMin: ["ح", "ن", "ث", "ر", "خ", "ج", "س"],
        weekHeader: "أسبوع",
        dateFormat: "dd/mm/yy",
        firstDay: 6,
        isRTL: !0,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.ar)
}),
jQuery(function(e) {
    e.datepicker.regional.az = {
        closeText: "Bağla",
        prevText: "&#x3C;Geri",
        nextText: "İrəli&#x3E;",
        currentText: "Bugün",
        monthNames: ["Yanvar", "Fevral", "Mart", "Aprel", "May", "İyun", "İyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"],
        monthNamesShort: ["Yan", "Fev", "Mar", "Apr", "May", "İyun", "İyul", "Avq", "Sen", "Okt", "Noy", "Dek"],
        dayNames: ["Bazar", "Bazar ertəsi", "Çərşənbə axşamı", "Çərşənbə", "Cümə axşamı", "Cümə", "Şənbə"],
        dayNamesShort: ["B", "Be", "Ça", "Ç", "Ca", "C", "Ş"],
        dayNamesMin: ["B", "B", "Ç", "С", "Ç", "C", "Ş"],
        weekHeader: "Hf",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.az)
}),
jQuery(function(e) {
    e.datepicker.regional.be = {
        closeText: "Зачыніць",
        prevText: "&larr;Папяр.",
        nextText: "Наст.&rarr;",
        currentText: "Сёньня",
        monthNames: ["Студзень", "Люты", "Сакавік", "Красавік", "Травень", "Чэрвень", "Ліпень", "Жнівень", "Верасень", "Кастрычнік", "Лістапад", "Сьнежань"],
        monthNamesShort: ["Сту", "Лют", "Сак", "Кра", "Тра", "Чэр", "Ліп", "Жні", "Вер", "Кас", "Ліс", "Сьн"],
        dayNames: ["нядзеля", "панядзелак", "аўторак", "серада", "чацьвер", "пятніца", "субота"],
        dayNamesShort: ["ндз", "пнд", "аўт", "срд", "чцв", "птн", "сбт"],
        dayNamesMin: ["Нд", "Пн", "Аў", "Ср", "Чц", "Пт", "Сб"],
        weekHeader: "Тд",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.be)
}),
jQuery(function(e) {
    e.datepicker.regional.bg = {
        closeText: "затвори",
        prevText: "&#x3C;назад",
        nextText: "напред&#x3E;",
        nextBigText: "&#x3E;&#x3E;",
        currentText: "днес",
        monthNames: ["Януари", "Февруари", "Март", "Април", "Май", "Юни", "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"],
        monthNamesShort: ["Яну", "Фев", "Мар", "Апр", "Май", "Юни", "Юли", "Авг", "Сеп", "Окт", "Нов", "Дек"],
        dayNames: ["Неделя", "Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък", "Събота"],
        dayNamesShort: ["Нед", "Пон", "Вто", "Сря", "Чет", "Пет", "Съб"],
        dayNamesMin: ["Не", "По", "Вт", "Ср", "Че", "Пе", "Съ"],
        weekHeader: "Wk",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.bg)
}),
jQuery(function(e) {
    e.datepicker.regional.bs = {
        closeText: "Zatvori",
        prevText: "&#x3C;",
        nextText: "&#x3E;",
        currentText: "Danas",
        monthNames: ["Januar", "Februar", "Mart", "April", "Maj", "Juni", "Juli", "August", "Septembar", "Oktobar", "Novembar", "Decembar"],
        monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
        dayNames: ["Nedelja", "Ponedeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota"],
        dayNamesShort: ["Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub"],
        dayNamesMin: ["Ne", "Po", "Ut", "Sr", "Če", "Pe", "Su"],
        weekHeader: "Wk",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.bs)
}),
jQuery(function(e) {
    e.datepicker.regional.ca = {
        closeText: "Tanca",
        prevText: "Anterior",
        nextText: "Següent",
        currentText: "Avui",
        monthNames: ["gener", "febrer", "març", "abril", "maig", "juny", "juliol", "agost", "setembre", "octubre", "novembre", "desembre"],
        monthNamesShort: ["gen", "feb", "març", "abr", "maig", "juny", "jul", "ag", "set", "oct", "nov", "des"],
        dayNames: ["diumenge", "dilluns", "dimarts", "dimecres", "dijous", "divendres", "dissabte"],
        dayNamesShort: ["dg", "dl", "dt", "dc", "dj", "dv", "ds"],
        dayNamesMin: ["dg", "dl", "dt", "dc", "dj", "dv", "ds"],
        weekHeader: "Set",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.ca)
}),
jQuery(function(e) {
    e.datepicker.regional.cs = {
        closeText: "Zavřít",
        prevText: "&#x3C;Dříve",
        nextText: "Později&#x3E;",
        currentText: "Nyní",
        monthNames: ["leden", "únor", "březen", "duben", "květen", "červen", "červenec", "srpen", "září", "říjen", "listopad", "prosinec"],
        monthNamesShort: ["led", "úno", "bře", "dub", "kvě", "čer", "čvc", "srp", "zář", "říj", "lis", "pro"],
        dayNames: ["neděle", "pondělí", "úterý", "středa", "čtvrtek", "pátek", "sobota"],
        dayNamesShort: ["ne", "po", "út", "st", "čt", "pá", "so"],
        dayNamesMin: ["ne", "po", "út", "st", "čt", "pá", "so"],
        weekHeader: "Týd",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.cs)
}),
jQuery(function(e) {
    e.datepicker.regional["cy-GB"] = {
        closeText: "Done",
        prevText: "Prev",
        nextText: "Next",
        currentText: "Today",
        monthNames: ["Ionawr", "Chwefror", "Mawrth", "Ebrill", "Mai", "Mehefin", "Gorffennaf", "Awst", "Medi", "Hydref", "Tachwedd", "Rhagfyr"],
        monthNamesShort: ["Ion", "Chw", "Maw", "Ebr", "Mai", "Meh", "Gor", "Aws", "Med", "Hyd", "Tac", "Rha"],
        dayNames: ["Dydd Sul", "Dydd Llun", "Dydd Mawrth", "Dydd Mercher", "Dydd Iau", "Dydd Gwener", "Dydd Sadwrn"],
        dayNamesShort: ["Sul", "Llu", "Maw", "Mer", "Iau", "Gwe", "Sad"],
        dayNamesMin: ["Su", "Ll", "Ma", "Me", "Ia", "Gw", "Sa"],
        weekHeader: "Wy",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional["cy-GB"])
}),
jQuery(function(e) {
    e.datepicker.regional.da = {
        closeText: "Luk",
        prevText: "&#x3C;Forrige",
        nextText: "Næste&#x3E;",
        currentText: "Idag",
        monthNames: ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"],
        monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
        dayNames: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"],
        dayNamesShort: ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"],
        dayNamesMin: ["Sø", "Ma", "Ti", "On", "To", "Fr", "Lø"],
        weekHeader: "Uge",
        dateFormat: "dd-mm-yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.da)
}),
jQuery(function(e) {
    e.datepicker.regional.de = {
        closeText: "Schließen",
        prevText: "&#x3C;Zurück",
        nextText: "Vor&#x3E;",
        currentText: "Heute",
        monthNames: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
        monthNamesShort: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
        dayNames: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
        dayNamesShort: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
        dayNamesMin: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
        weekHeader: "KW",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.de)
}),
jQuery(function(e) {
    e.datepicker.regional.el = {
        closeText: "Κλείσιμο",
        prevText: "Προηγούμενος",
        nextText: "Επόμενος",
        currentText: "Τρέχων Μήνας",
        monthNames: ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"],
        monthNamesShort: ["Ιαν", "Φεβ", "Μαρ", "Απρ", "Μαι", "Ιουν", "Ιουλ", "Αυγ", "Σεπ", "Οκτ", "Νοε", "Δεκ"],
        dayNames: ["Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο"],
        dayNamesShort: ["Κυρ", "Δευ", "Τρι", "Τετ", "Πεμ", "Παρ", "Σαβ"],
        dayNamesMin: ["Κυ", "Δε", "Τρ", "Τε", "Πε", "Πα", "Σα"],
        weekHeader: "Εβδ",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.el)
}),
jQuery(function(e) {
    e.datepicker.regional["en-AU"] = {
        closeText: "Done",
        prevText: "Prev",
        nextText: "Next",
        currentText: "Today",
        monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        weekHeader: "Wk",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional["en-AU"])
}),
jQuery(function(e) {
    e.datepicker.regional["en-GB"] = {
        closeText: "Done",
        prevText: "Prev",
        nextText: "Next",
        currentText: "Today",
        monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        weekHeader: "Wk",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional["en-GB"])
}),
jQuery(function(e) {
    e.datepicker.regional["en-NZ"] = {
        closeText: "Done",
        prevText: "Prev",
        nextText: "Next",
        currentText: "Today",
        monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        weekHeader: "Wk",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional["en-NZ"])
}),
jQuery(function(e) {
    e.datepicker.regional.eo = {
        closeText: "Fermi",
        prevText: "&#x3C;Anta",
        nextText: "Sekv&#x3E;",
        currentText: "Nuna",
        monthNames: ["Januaro", "Februaro", "Marto", "Aprilo", "Majo", "Junio", "Julio", "Aŭgusto", "Septembro", "Oktobro", "Novembro", "Decembro"],
        monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aŭg", "Sep", "Okt", "Nov", "Dec"],
        dayNames: ["Dimanĉo", "Lundo", "Mardo", "Merkredo", "Ĵaŭdo", "Vendredo", "Sabato"],
        dayNamesShort: ["Dim", "Lun", "Mar", "Mer", "Ĵaŭ", "Ven", "Sab"],
        dayNamesMin: ["Di", "Lu", "Ma", "Me", "Ĵa", "Ve", "Sa"],
        weekHeader: "Sb",
        dateFormat: "dd/mm/yy",
        firstDay: 0,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.eo)
}),
jQuery(function(e) {
    e.datepicker.regional.es = {
        closeText: "Cerrar",
        prevText: "&#x3C;Ant",
        nextText: "Sig&#x3E;",
        currentText: "Hoy",
        monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
        dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Juv", "Vie", "Sáb"],
        dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"],
        weekHeader: "Sm",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.es)
}),
jQuery(function(e) {
    e.datepicker.regional.et = {
        closeText: "Sulge",
        prevText: "Eelnev",
        nextText: "Järgnev",
        currentText: "Täna",
        monthNames: ["Jaanuar", "Veebruar", "Märts", "Aprill", "Mai", "Juuni", "Juuli", "August", "September", "Oktoober", "November", "Detsember"],
        monthNamesShort: ["Jaan", "Veebr", "Märts", "Apr", "Mai", "Juuni", "Juuli", "Aug", "Sept", "Okt", "Nov", "Dets"],
        dayNames: ["Pühapäev", "Esmaspäev", "Teisipäev", "Kolmapäev", "Neljapäev", "Reede", "Laupäev"],
        dayNamesShort: ["Pühap", "Esmasp", "Teisip", "Kolmap", "Neljap", "Reede", "Laup"],
        dayNamesMin: ["P", "E", "T", "K", "N", "R", "L"],
        weekHeader: "näd",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.et)
}),
jQuery(function(e) {
    e.datepicker.regional.eu = {
        closeText: "Egina",
        prevText: "&#x3C;Aur",
        nextText: "Hur&#x3E;",
        currentText: "Gaur",
        monthNames: ["urtarrila", "otsaila", "martxoa", "apirila", "maiatza", "ekaina", "uztaila", "abuztua", "iraila", "urria", "azaroa", "abendua"],
        monthNamesShort: ["urt.", "ots.", "mar.", "api.", "mai.", "eka.", "uzt.", "abu.", "ira.", "urr.", "aza.", "abe."],
        dayNames: ["igandea", "astelehena", "asteartea", "asteazkena", "osteguna", "ostirala", "larunbata"],
        dayNamesShort: ["ig.", "al.", "ar.", "az.", "og.", "ol.", "lr."],
        dayNamesMin: ["ig", "al", "ar", "az", "og", "ol", "lr"],
        weekHeader: "As",
        dateFormat: "yy-mm-dd",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.eu)
}),
jQuery(function(e) {
    e.datepicker.regional.fa = {
        closeText: "بستن",
        prevText: "&#x3C;قبلی",
        nextText: "بعدی&#x3E;",
        currentText: "امروز",
        monthNames: ["فروردين", "ارديبهشت", "خرداد", "تير", "مرداد", "شهريور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"],
        monthNamesShort: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        dayNames: ["يکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه"],
        dayNamesShort: ["ی", "د", "س", "چ", "پ", "ج", "ش"],
        dayNamesMin: ["ی", "د", "س", "چ", "پ", "ج", "ش"],
        weekHeader: "هف",
        dateFormat: "yy/mm/dd",
        firstDay: 6,
        isRTL: !0,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.fa)
}),
jQuery(function(e) {
    e.datepicker.regional.fi = {
        closeText: "Sulje",
        prevText: "&#xAB;Edellinen",
        nextText: "Seuraava&#xBB;",
        currentText: "Tänään",
        monthNames: ["Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kesäkuu", "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"],
        monthNamesShort: ["Tammi", "Helmi", "Maalis", "Huhti", "Touko", "Kesä", "Heinä", "Elo", "Syys", "Loka", "Marras", "Joulu"],
        dayNamesShort: ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"],
        dayNames: ["Sunnuntai", "Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai"],
        dayNamesMin: ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"],
        weekHeader: "Vk",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.fi)
}),
jQuery(function(e) {
    e.datepicker.regional.fo = {
        closeText: "Lat aftur",
        prevText: "&#x3C;Fyrra",
        nextText: "Næsta&#x3E;",
        currentText: "Í dag",
        monthNames: ["Januar", "Februar", "Mars", "Apríl", "Mei", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"],
        monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"],
        dayNames: ["Sunnudagur", "Mánadagur", "Týsdagur", "Mikudagur", "Hósdagur", "Fríggjadagur", "Leyardagur"],
        dayNamesShort: ["Sun", "Mán", "Týs", "Mik", "Hós", "Frí", "Ley"],
        dayNamesMin: ["Su", "Má", "Tý", "Mi", "Hó", "Fr", "Le"],
        weekHeader: "Vk",
        dateFormat: "dd-mm-yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.fo)
}),
jQuery(function(e) {
    e.datepicker.regional["fr-CA"] = {
        closeText: "Fermer",
        prevText: "Précédent",
        nextText: "Suivant",
        currentText: "Aujourd'hui",
        monthNames: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
        monthNamesShort: ["janv.", "févr.", "mars", "avril", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."],
        dayNames: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
        dayNamesShort: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
        dayNamesMin: ["D", "L", "M", "M", "J", "V", "S"],
        weekHeader: "Sem.",
        dateFormat: "yy-mm-dd",
        firstDay: 0,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional["fr-CA"])
}),
jQuery(function(e) {
    e.datepicker.regional["fr-CH"] = {
        closeText: "Fermer",
        prevText: "&#x3C;Préc",
        nextText: "Suiv&#x3E;",
        currentText: "Courant",
        monthNames: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
        monthNamesShort: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"],
        dayNames: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
        dayNamesShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
        dayNamesMin: ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"],
        weekHeader: "Sm",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional["fr-CH"])
}),
jQuery(function(e) {
    e.datepicker.regional.fr = {
        closeText: "Fermer",
        prevText: "Précédent",
        nextText: "Suivant",
        currentText: "Aujourd'hui",
        monthNames: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
        monthNamesShort: ["Janv.", "Févr.", "Mars", "Avril", "Mai", "Juin", "Juil.", "Août", "Sept.", "Oct.", "Nov.", "Déc."],
        dayNames: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
        dayNamesShort: ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."],
        dayNamesMin: ["D", "L", "M", "M", "J", "V", "S"],
        weekHeader: "Sem.",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.fr)
}),
jQuery(function(e) {
    e.datepicker.regional.gl = {
        closeText: "Pechar",
        prevText: "&#x3C;Ant",
        nextText: "Seg&#x3E;",
        currentText: "Hoxe",
        monthNames: ["Xaneiro", "Febreiro", "Marzo", "Abril", "Maio", "Xuño", "Xullo", "Agosto", "Setembro", "Outubro", "Novembro", "Decembro"],
        monthNamesShort: ["Xan", "Feb", "Mar", "Abr", "Mai", "Xuñ", "Xul", "Ago", "Set", "Out", "Nov", "Dec"],
        dayNames: ["Domingo", "Luns", "Martes", "Mércores", "Xoves", "Venres", "Sábado"],
        dayNamesShort: ["Dom", "Lun", "Mar", "Mér", "Xov", "Ven", "Sáb"],
        dayNamesMin: ["Do", "Lu", "Ma", "Mé", "Xo", "Ve", "Sá"],
        weekHeader: "Sm",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.gl)
}),
jQuery(function(e) {
    e.datepicker.regional.he = {
        closeText: "סגור",
        prevText: "&#x3C;הקודם",
        nextText: "הבא&#x3E;",
        currentText: "היום",
        monthNames: ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"],
        monthNamesShort: ["ינו", "פבר", "מרץ", "אפר", "מאי", "יוני", "יולי", "אוג", "ספט", "אוק", "נוב", "דצמ"],
        dayNames: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"],
        dayNamesShort: ["א'", "ב'", "ג'", "ד'", "ה'", "ו'", "שבת"],
        dayNamesMin: ["א'", "ב'", "ג'", "ד'", "ה'", "ו'", "שבת"],
        weekHeader: "Wk",
        dateFormat: "dd/mm/yy",
        firstDay: 0,
        isRTL: !0,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.he)
}),
jQuery(function(e) {
    e.datepicker.regional.hi = {
        closeText: "बंद",
        prevText: "पिछला",
        nextText: "अगला",
        currentText: "आज",
        monthNames: ["जनवरी ", "फरवरी", "मार्च", "अप्रेल", "मई", "जून", "जूलाई", "अगस्त ", "सितम्बर", "अक्टूबर", "नवम्बर", "दिसम्बर"],
        monthNamesShort: ["जन", "फर", "मार्च", "अप्रेल", "मई", "जून", "जूलाई", "अग", "सित", "अक्ट", "नव", "दि"],
        dayNames: ["रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"],
        dayNamesShort: ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"],
        dayNamesMin: ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"],
        weekHeader: "हफ्ता",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.hi)
}),
jQuery(function(e) {
    e.datepicker.regional.hr = {
        closeText: "Zatvori",
        prevText: "&#x3C;",
        nextText: "&#x3E;",
        currentText: "Danas",
        monthNames: ["Siječanj", "Veljača", "Ožujak", "Travanj", "Svibanj", "Lipanj", "Srpanj", "Kolovoz", "Rujan", "Listopad", "Studeni", "Prosinac"],
        monthNamesShort: ["Sij", "Velj", "Ožu", "Tra", "Svi", "Lip", "Srp", "Kol", "Ruj", "Lis", "Stu", "Pro"],
        dayNames: ["Nedjelja", "Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota"],
        dayNamesShort: ["Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub"],
        dayNamesMin: ["Ne", "Po", "Ut", "Sr", "Če", "Pe", "Su"],
        weekHeader: "Tje",
        dateFormat: "dd.mm.yy.",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.hr)
}),
jQuery(function(e) {
    e.datepicker.regional.hu = {
        closeText: "bezár",
        prevText: "vissza",
        nextText: "előre",
        currentText: "ma",
        monthNames: ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"],
        monthNamesShort: ["Jan", "Feb", "Már", "Ápr", "Máj", "Jún", "Júl", "Aug", "Szep", "Okt", "Nov", "Dec"],
        dayNames: ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"],
        dayNamesShort: ["Vas", "Hét", "Ked", "Sze", "Csü", "Pén", "Szo"],
        dayNamesMin: ["V", "H", "K", "Sze", "Cs", "P", "Szo"],
        weekHeader: "Hét",
        dateFormat: "yy.mm.dd.",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !0,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.hu)
}),
jQuery(function(e) {
    e.datepicker.regional.hy = {
        closeText: "Փակել",
        prevText: "&#x3C;Նախ.",
        nextText: "Հաջ.&#x3E;",
        currentText: "Այսօր",
        monthNames: ["Հունվար", "Փետրվար", "Մարտ", "Ապրիլ", "Մայիս", "Հունիս", "Հուլիս", "Օգոստոս", "Սեպտեմբեր", "Հոկտեմբեր", "Նոյեմբեր", "Դեկտեմբեր"],
        monthNamesShort: ["Հունվ", "Փետր", "Մարտ", "Ապր", "Մայիս", "Հունիս", "Հուլ", "Օգս", "Սեպ", "Հոկ", "Նոյ", "Դեկ"],
        dayNames: ["կիրակի", "եկուշաբթի", "երեքշաբթի", "չորեքշաբթի", "հինգշաբթի", "ուրբաթ", "շաբաթ"],
        dayNamesShort: ["կիր", "երկ", "երք", "չրք", "հնգ", "ուրբ", "շբթ"],
        dayNamesMin: ["կիր", "երկ", "երք", "չրք", "հնգ", "ուրբ", "շբթ"],
        weekHeader: "ՇԲՏ",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.hy)
}),
jQuery(function(e) {
    e.datepicker.regional.id = {
        closeText: "Tutup",
        prevText: "&#x3C;mundur",
        nextText: "maju&#x3E;",
        currentText: "hari ini",
        monthNames: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "Nopember", "Desember"],
        monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agus", "Sep", "Okt", "Nop", "Des"],
        dayNames: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],
        dayNamesShort: ["Min", "Sen", "Sel", "Rab", "kam", "Jum", "Sab"],
        dayNamesMin: ["Mg", "Sn", "Sl", "Rb", "Km", "jm", "Sb"],
        weekHeader: "Mg",
        dateFormat: "dd/mm/yy",
        firstDay: 0,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.id)
}),
jQuery(function(e) {
    e.datepicker.regional.is = {
        closeText: "Loka",
        prevText: "&#x3C; Fyrri",
        nextText: "Næsti &#x3E;",
        currentText: "Í dag",
        monthNames: ["Janúar", "Febrúar", "Mars", "Apríl", "Maí", "Júní", "Júlí", "Ágúst", "September", "Október", "Nóvember", "Desember"],
        monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "Maí", "Jún", "Júl", "Ágú", "Sep", "Okt", "Nóv", "Des"],
        dayNames: ["Sunnudagur", "Mánudagur", "Þriðjudagur", "Miðvikudagur", "Fimmtudagur", "Föstudagur", "Laugardagur"],
        dayNamesShort: ["Sun", "Mán", "Þri", "Mið", "Fim", "Fös", "Lau"],
        dayNamesMin: ["Su", "Má", "Þr", "Mi", "Fi", "Fö", "La"],
        weekHeader: "Vika",
        dateFormat: "dd/mm/yy",
        firstDay: 0,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.is)
}),
jQuery(function(e) {
    e.datepicker.regional.it = {
        closeText: "Chiudi",
        prevText: "&#x3C;Prec",
        nextText: "Succ&#x3E;",
        currentText: "Oggi",
        monthNames: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
        monthNamesShort: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"],
        dayNames: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"],
        dayNamesShort: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
        dayNamesMin: ["Do", "Lu", "Ma", "Me", "Gi", "Ve", "Sa"],
        weekHeader: "Sm",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.it)
}),
jQuery(function(e) {
    e.datepicker.regional.ja = {
        closeText: "閉じる",
        prevText: "&#x3C;前",
        nextText: "次&#x3E;",
        currentText: "今日",
        monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
        monthNamesShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
        dayNames: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],
        dayNamesShort: ["日", "月", "火", "水", "木", "金", "土"],
        dayNamesMin: ["日", "月", "火", "水", "木", "金", "土"],
        weekHeader: "週",
        dateFormat: "yy/mm/dd",
        firstDay: 0,
        isRTL: !1,
        showMonthAfterYear: !0,
        yearSuffix: "年"
    },
    e.datepicker.setDefaults(e.datepicker.regional.ja)
}),
jQuery(function(e) {
    e.datepicker.regional.ka = {
        closeText: "დახურვა",
        prevText: "&#x3c; წინა",
        nextText: "შემდეგი &#x3e;",
        currentText: "დღეს",
        monthNames: ["იანვარი", "თებერვალი", "მარტი", "აპრილი", "მაისი", "ივნისი", "ივლისი", "აგვისტო", "სექტემბერი", "ოქტომბერი", "ნოემბერი", "დეკემბერი"],
        monthNamesShort: ["იან", "თებ", "მარ", "აპრ", "მაი", "ივნ", "ივლ", "აგვ", "სექ", "ოქტ", "ნოე", "დეკ"],
        dayNames: ["კვირა", "ორშაბათი", "სამშაბათი", "ოთხშაბათი", "ხუთშაბათი", "პარასკევი", "შაბათი"],
        dayNamesShort: ["კვ", "ორშ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ"],
        dayNamesMin: ["კვ", "ორშ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ"],
        weekHeader: "კვირა",
        dateFormat: "dd-mm-yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.ka)
}),
jQuery(function(e) {
    e.datepicker.regional.kk = {
        closeText: "Жабу",
        prevText: "&#x3C;Алдыңғы",
        nextText: "Келесі&#x3E;",
        currentText: "Бүгін",
        monthNames: ["Қаңтар", "Ақпан", "Наурыз", "Сәуір", "Мамыр", "Маусым", "Шілде", "Тамыз", "Қыркүйек", "Қазан", "Қараша", "Желтоқсан"],
        monthNamesShort: ["Қаң", "Ақп", "Нау", "Сәу", "Мам", "Мау", "Шіл", "Там", "Қыр", "Қаз", "Қар", "Жел"],
        dayNames: ["Жексенбі", "Дүйсенбі", "Сейсенбі", "Сәрсенбі", "Бейсенбі", "Жұма", "Сенбі"],
        dayNamesShort: ["жкс", "дсн", "ссн", "срс", "бсн", "жма", "снб"],
        dayNamesMin: ["Жк", "Дс", "Сс", "Ср", "Бс", "Жм", "Сн"],
        weekHeader: "Не",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.kk)
}),
jQuery(function(e) {
    e.datepicker.regional.km = {
        closeText: "ធ្វើ​រួច",
        prevText: "មុន",
        nextText: "បន្ទាប់",
        currentText: "ថ្ងៃ​នេះ",
        monthNames: ["មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"],
        monthNamesShort: ["មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"],
        dayNames: ["អាទិត្យ", "ចន្ទ", "អង្គារ", "ពុធ", "ព្រហស្បតិ៍", "សុក្រ", "សៅរ៍"],
        dayNamesShort: ["អា", "ច", "អ", "ពុ", "ព្រហ", "សុ", "សៅ"],
        dayNamesMin: ["អា", "ច", "អ", "ពុ", "ព្រហ", "សុ", "សៅ"],
        weekHeader: "សប្ដាហ៍",
        dateFormat: "dd-mm-yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.km)
}),
jQuery(function(e) {
    e.datepicker.regional.ko = {
        closeText: "닫기",
        prevText: "이전달",
        nextText: "다음달",
        currentText: "오늘",
        monthNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
        monthNamesShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
        dayNames: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
        dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
        dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
        weekHeader: "Wk",
        dateFormat: "yy-mm-dd",
        firstDay: 0,
        isRTL: !1,
        showMonthAfterYear: !0,
        yearSuffix: "년"
    },
    e.datepicker.setDefaults(e.datepicker.regional.ko)
}),
jQuery(function(e) {
    e.datepicker.regional.ky = {
        closeText: "Жабуу",
        prevText: "&#x3c;Мур",
        nextText: "Кий&#x3e;",
        currentText: "Бүгүн",
        monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        monthNamesShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
        dayNames: ["жекшемби", "дүйшөмбү", "шейшемби", "шаршемби", "бейшемби", "жума", "ишемби"],
        dayNamesShort: ["жек", "дүй", "шей", "шар", "бей", "жум", "ише"],
        dayNamesMin: ["Жк", "Дш", "Шш", "Шр", "Бш", "Жм", "Иш"],
        weekHeader: "Жум",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.ky)
}),
jQuery(function(e) {
    e.datepicker.regional.lb = {
        closeText: "Fäerdeg",
        prevText: "Zréck",
        nextText: "Weider",
        currentText: "Haut",
        monthNames: ["Januar", "Februar", "Mäerz", "Abrëll", "Mee", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
        monthNamesShort: ["Jan", "Feb", "Mäe", "Abr", "Mee", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
        dayNames: ["Sonndeg", "Méindeg", "Dënschdeg", "Mëttwoch", "Donneschdeg", "Freideg", "Samschdeg"],
        dayNamesShort: ["Son", "Méi", "Dën", "Mët", "Don", "Fre", "Sam"],
        dayNamesMin: ["So", "Mé", "Dë", "Më", "Do", "Fr", "Sa"],
        weekHeader: "W",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.lb)
}),
jQuery(function(e) {
    e.datepicker.regional.lt = {
        closeText: "Uždaryti",
        prevText: "&#x3C;Atgal",
        nextText: "Pirmyn&#x3E;",
        currentText: "Šiandien",
        monthNames: ["Sausis", "Vasaris", "Kovas", "Balandis", "Gegužė", "Birželis", "Liepa", "Rugpjūtis", "Rugsėjis", "Spalis", "Lapkritis", "Gruodis"],
        monthNamesShort: ["Sau", "Vas", "Kov", "Bal", "Geg", "Bir", "Lie", "Rugp", "Rugs", "Spa", "Lap", "Gru"],
        dayNames: ["sekmadienis", "pirmadienis", "antradienis", "trečiadienis", "ketvirtadienis", "penktadienis", "šeštadienis"],
        dayNamesShort: ["sek", "pir", "ant", "tre", "ket", "pen", "šeš"],
        dayNamesMin: ["Se", "Pr", "An", "Tr", "Ke", "Pe", "Še"],
        weekHeader: "Wk",
        dateFormat: "yy-mm-dd",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.lt)
}),
jQuery(function(e) {
    e.datepicker.regional.lv = {
        closeText: "Aizvērt",
        prevText: "Iepr",
        nextText: "Nāka",
        currentText: "Šodien",
        monthNames: ["Janvāris", "Februāris", "Marts", "Aprīlis", "Maijs", "Jūnijs", "Jūlijs", "Augusts", "Septembris", "Oktobris", "Novembris", "Decembris"],
        monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "Mai", "Jūn", "Jūl", "Aug", "Sep", "Okt", "Nov", "Dec"],
        dayNames: ["svētdiena", "pirmdiena", "otrdiena", "trešdiena", "ceturtdiena", "piektdiena", "sestdiena"],
        dayNamesShort: ["svt", "prm", "otr", "tre", "ctr", "pkt", "sst"],
        dayNamesMin: ["Sv", "Pr", "Ot", "Tr", "Ct", "Pk", "Ss"],
        weekHeader: "Nav",
        dateFormat: "dd-mm-yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.lv)
}),
jQuery(function(e) {
    e.datepicker.regional.mk = {
        closeText: "Затвори",
        prevText: "&#x3C;",
        nextText: "&#x3E;",
        currentText: "Денес",
        monthNames: ["Јануари", "Февруари", "Март", "Април", "Мај", "Јуни", "Јули", "Август", "Септември", "Октомври", "Ноември", "Декември"],
        monthNamesShort: ["Јан", "Фев", "Мар", "Апр", "Мај", "Јун", "Јул", "Авг", "Сеп", "Окт", "Ное", "Дек"],
        dayNames: ["Недела", "Понеделник", "Вторник", "Среда", "Четврток", "Петок", "Сабота"],
        dayNamesShort: ["Нед", "Пон", "Вто", "Сре", "Чет", "Пет", "Саб"],
        dayNamesMin: ["Не", "По", "Вт", "Ср", "Че", "Пе", "Са"],
        weekHeader: "Сед",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.mk)
}),
jQuery(function(e) {
    e.datepicker.regional.ml = {
        closeText: "ശരി",
        prevText: "മുന്നത്തെ",
        nextText: "അടുത്തത് ",
        currentText: "ഇന്ന്",
        monthNames: ["ജനുവരി", "ഫെബ്രുവരി", "മാര്‍ച്ച്", "ഏപ്രില്‍", "മേയ്", "ജൂണ്‍", "ജൂലൈ", "ആഗസ്റ്റ്", "സെപ്റ്റംബര്‍", "ഒക്ടോബര്‍", "നവംബര്‍", "ഡിസംബര്‍"],
        monthNamesShort: ["ജനു", "ഫെബ്", "മാര്‍", "ഏപ്രി", "മേയ്", "ജൂണ്‍", "ജൂലാ", "ആഗ", "സെപ്", "ഒക്ടോ", "നവം", "ഡിസ"],
        dayNames: ["ഞായര്‍", "തിങ്കള്‍", "ചൊവ്വ", "ബുധന്‍", "വ്യാഴം", "വെള്ളി", "ശനി"],
        dayNamesShort: ["ഞായ", "തിങ്ക", "ചൊവ്വ", "ബുധ", "വ്യാഴം", "വെള്ളി", "ശനി"],
        dayNamesMin: ["ഞാ", "തി", "ചൊ", "ബു", "വ്യാ", "വെ", "ശ"],
        weekHeader: "ആ",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.ml)
}),
jQuery(function(e) {
    e.datepicker.regional.ms = {
        closeText: "Tutup",
        prevText: "&#x3C;Sebelum",
        nextText: "Selepas&#x3E;",
        currentText: "hari ini",
        monthNames: ["Januari", "Februari", "Mac", "April", "Mei", "Jun", "Julai", "Ogos", "September", "Oktober", "November", "Disember"],
        monthNamesShort: ["Jan", "Feb", "Mac", "Apr", "Mei", "Jun", "Jul", "Ogo", "Sep", "Okt", "Nov", "Dis"],
        dayNames: ["Ahad", "Isnin", "Selasa", "Rabu", "Khamis", "Jumaat", "Sabtu"],
        dayNamesShort: ["Aha", "Isn", "Sel", "Rab", "kha", "Jum", "Sab"],
        dayNamesMin: ["Ah", "Is", "Se", "Ra", "Kh", "Ju", "Sa"],
        weekHeader: "Mg",
        dateFormat: "dd/mm/yy",
        firstDay: 0,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.ms)
}),
jQuery(function(e) {
    e.datepicker.regional.nb = {
        closeText: "Lukk",
        prevText: "&#xAB;Forrige",
        nextText: "Neste&#xBB;",
        currentText: "I dag",
        monthNames: ["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember"],
        monthNamesShort: ["jan", "feb", "mar", "apr", "mai", "jun", "jul", "aug", "sep", "okt", "nov", "des"],
        dayNamesShort: ["søn", "man", "tir", "ons", "tor", "fre", "lør"],
        dayNames: ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"],
        dayNamesMin: ["sø", "ma", "ti", "on", "to", "fr", "lø"],
        weekHeader: "Uke",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.nb)
}),
jQuery(function(e) {
    e.datepicker.regional["nl-BE"] = {
        closeText: "Sluiten",
        prevText: "←",
        nextText: "→",
        currentText: "Vandaag",
        monthNames: ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"],
        monthNamesShort: ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"],
        dayNames: ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"],
        dayNamesShort: ["zon", "maa", "din", "woe", "don", "vri", "zat"],
        dayNamesMin: ["zo", "ma", "di", "wo", "do", "vr", "za"],
        weekHeader: "Wk",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional["nl-BE"])
}),
jQuery(function(e) {
    e.datepicker.regional.nl = {
        closeText: "Sluiten",
        prevText: "←",
        nextText: "→",
        currentText: "Vandaag",
        monthNames: ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"],
        monthNamesShort: ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"],
        dayNames: ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"],
        dayNamesShort: ["zon", "maa", "din", "woe", "don", "vri", "zat"],
        dayNamesMin: ["zo", "ma", "di", "wo", "do", "vr", "za"],
        weekHeader: "Wk",
        dateFormat: "dd-mm-yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.nl)
}),
jQuery(function(e) {
    e.datepicker.regional.nn = {
        closeText: "Lukk",
        prevText: "&#xAB;Førre",
        nextText: "Neste&#xBB;",
        currentText: "I dag",
        monthNames: ["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember"],
        monthNamesShort: ["jan", "feb", "mar", "apr", "mai", "jun", "jul", "aug", "sep", "okt", "nov", "des"],
        dayNamesShort: ["sun", "mån", "tys", "ons", "tor", "fre", "lau"],
        dayNames: ["sundag", "måndag", "tysdag", "onsdag", "torsdag", "fredag", "laurdag"],
        dayNamesMin: ["su", "må", "ty", "on", "to", "fr", "la"],
        weekHeader: "Veke",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.nn)
}),
jQuery(function(e) {
    e.datepicker.regional.no = {
        closeText: "Lukk",
        prevText: "&#xAB;Forrige",
        nextText: "Neste&#xBB;",
        currentText: "I dag",
        monthNames: ["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember"],
        monthNamesShort: ["jan", "feb", "mar", "apr", "mai", "jun", "jul", "aug", "sep", "okt", "nov", "des"],
        dayNamesShort: ["søn", "man", "tir", "ons", "tor", "fre", "lør"],
        dayNames: ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"],
        dayNamesMin: ["sø", "ma", "ti", "on", "to", "fr", "lø"],
        weekHeader: "Uke",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.no)
}),
jQuery(function(e) {
    e.datepicker.regional.pl = {
        closeText: "Zamknij",
        prevText: "&#x3C;Poprzedni",
        nextText: "Następny&#x3E;",
        currentText: "Dziś",
        monthNames: ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"],
        monthNamesShort: ["Sty", "Lu", "Mar", "Kw", "Maj", "Cze", "Lip", "Sie", "Wrz", "Pa", "Lis", "Gru"],
        dayNames: ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"],
        dayNamesShort: ["Nie", "Pn", "Wt", "Śr", "Czw", "Pt", "So"],
        dayNamesMin: ["N", "Pn", "Wt", "Śr", "Cz", "Pt", "So"],
        weekHeader: "Tydz",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.pl)
}),
jQuery(function(e) {
    e.datepicker.regional["pt-BR"] = {
        closeText: "Fechar",
        prevText: "&#x3C;Anterior",
        nextText: "Próximo&#x3E;",
        currentText: "Hoje",
        monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
        dayNames: ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"],
        dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
        dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
        weekHeader: "Sm",
        dateFormat: "dd/mm/yy",
        firstDay: 0,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional["pt-BR"])
}),
jQuery(function(e) {
    e.datepicker.regional.pt = {
        closeText: "Fechar",
        prevText: "&#x3C;Anterior",
        nextText: "Seguinte",
        currentText: "Hoje",
        monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
        dayNames: ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"],
        dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
        dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
        weekHeader: "Sem",
        dateFormat: "dd/mm/yy",
        firstDay: 0,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.pt)
}),
jQuery(function(e) {
    e.datepicker.regional.rm = {
        closeText: "Serrar",
        prevText: "&#x3C;Suandant",
        nextText: "Precedent&#x3E;",
        currentText: "Actual",
        monthNames: ["Schaner", "Favrer", "Mars", "Avrigl", "Matg", "Zercladur", "Fanadur", "Avust", "Settember", "October", "November", "December"],
        monthNamesShort: ["Scha", "Fev", "Mar", "Avr", "Matg", "Zer", "Fan", "Avu", "Sett", "Oct", "Nov", "Dec"],
        dayNames: ["Dumengia", "Glindesdi", "Mardi", "Mesemna", "Gievgia", "Venderdi", "Sonda"],
        dayNamesShort: ["Dum", "Gli", "Mar", "Mes", "Gie", "Ven", "Som"],
        dayNamesMin: ["Du", "Gl", "Ma", "Me", "Gi", "Ve", "So"],
        weekHeader: "emna",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.rm)
}),
jQuery(function(e) {
    e.datepicker.regional.ro = {
        closeText: "Închide",
        prevText: "&#xAB; Luna precedentă",
        nextText: "Luna următoare &#xBB;",
        currentText: "Azi",
        monthNames: ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"],
        monthNamesShort: ["Ian", "Feb", "Mar", "Apr", "Mai", "Iun", "Iul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        dayNames: ["Duminică", "Luni", "Marţi", "Miercuri", "Joi", "Vineri", "Sâmbătă"],
        dayNamesShort: ["Dum", "Lun", "Mar", "Mie", "Joi", "Vin", "Sâm"],
        dayNamesMin: ["Du", "Lu", "Ma", "Mi", "Jo", "Vi", "Sâ"],
        weekHeader: "Săpt",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.ro)
}),
jQuery(function(e) {
    e.datepicker.regional.ru = {
        closeText: "Закрыть",
        prevText: "&#x3C;Пред",
        nextText: "След&#x3E;",
        currentText: "Сегодня",
        monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        monthNamesShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
        dayNames: ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
        dayNamesShort: ["вск", "пнд", "втр", "срд", "чтв", "птн", "сбт"],
        dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        weekHeader: "Нед",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.ru)
}),
jQuery(function(e) {
    e.datepicker.regional.sk = {
        closeText: "Zavrieť",
        prevText: "&#x3C;Predchádzajúci",
        nextText: "Nasledujúci&#x3E;",
        currentText: "Dnes",
        monthNames: ["január", "február", "marec", "apríl", "máj", "jún", "júl", "august", "september", "október", "november", "december"],
        monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "Máj", "Jún", "Júl", "Aug", "Sep", "Okt", "Nov", "Dec"],
        dayNames: ["nedeľa", "pondelok", "utorok", "streda", "štvrtok", "piatok", "sobota"],
        dayNamesShort: ["Ned", "Pon", "Uto", "Str", "Štv", "Pia", "Sob"],
        dayNamesMin: ["Ne", "Po", "Ut", "St", "Št", "Pia", "So"],
        weekHeader: "Ty",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.sk)
}),
jQuery(function(e) {
    e.datepicker.regional.sl = {
        closeText: "Zapri",
        prevText: "&#x3C;Prejšnji",
        nextText: "Naslednji&#x3E;",
        currentText: "Trenutni",
        monthNames: ["Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December"],
        monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Avg", "Sep", "Okt", "Nov", "Dec"],
        dayNames: ["Nedelja", "Ponedeljek", "Torek", "Sreda", "Četrtek", "Petek", "Sobota"],
        dayNamesShort: ["Ned", "Pon", "Tor", "Sre", "Čet", "Pet", "Sob"],
        dayNamesMin: ["Ne", "Po", "To", "Sr", "Če", "Pe", "So"],
        weekHeader: "Teden",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.sl)
}),
jQuery(function(e) {
    e.datepicker.regional.sq = {
        closeText: "mbylle",
        prevText: "&#x3C;mbrapa",
        nextText: "Përpara&#x3E;",
        currentText: "sot",
        monthNames: ["Janar", "Shkurt", "Mars", "Prill", "Maj", "Qershor", "Korrik", "Gusht", "Shtator", "Tetor", "Nëntor", "Dhjetor"],
        monthNamesShort: ["Jan", "Shk", "Mar", "Pri", "Maj", "Qer", "Kor", "Gus", "Sht", "Tet", "Nën", "Dhj"],
        dayNames: ["E Diel", "E Hënë", "E Martë", "E Mërkurë", "E Enjte", "E Premte", "E Shtune"],
        dayNamesShort: ["Di", "Hë", "Ma", "Më", "En", "Pr", "Sh"],
        dayNamesMin: ["Di", "Hë", "Ma", "Më", "En", "Pr", "Sh"],
        weekHeader: "Ja",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.sq)
}),
jQuery(function(e) {
    e.datepicker.regional["sr-SR"] = {
        closeText: "Zatvori",
        prevText: "&#x3C;",
        nextText: "&#x3E;",
        currentText: "Danas",
        monthNames: ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"],
        monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Avg", "Sep", "Okt", "Nov", "Dec"],
        dayNames: ["Nedelja", "Ponedeljak", "Utorak", "Sreda", "Četvrtak", "Petak", "Subota"],
        dayNamesShort: ["Ned", "Pon", "Uto", "Sre", "Čet", "Pet", "Sub"],
        dayNamesMin: ["Ne", "Po", "Ut", "Sr", "Če", "Pe", "Su"],
        weekHeader: "Sed",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional["sr-SR"])
}),
jQuery(function(e) {
    e.datepicker.regional.sr = {
        closeText: "Затвори",
        prevText: "&#x3C;",
        nextText: "&#x3E;",
        currentText: "Данас",
        monthNames: ["Јануар", "Фебруар", "Март", "Април", "Мај", "Јун", "Јул", "Август", "Септембар", "Октобар", "Новембар", "Децембар"],
        monthNamesShort: ["Јан", "Феб", "Мар", "Апр", "Мај", "Јун", "Јул", "Авг", "Сеп", "Окт", "Нов", "Дец"],
        dayNames: ["Недеља", "Понедељак", "Уторак", "Среда", "Четвртак", "Петак", "Субота"],
        dayNamesShort: ["Нед", "Пон", "Уто", "Сре", "Чет", "Пет", "Суб"],
        dayNamesMin: ["Не", "По", "Ут", "Ср", "Че", "Пе", "Су"],
        weekHeader: "Сед",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.sr)
}),
jQuery(function(e) {
    e.datepicker.regional.sv = {
        closeText: "Stäng",
        prevText: "&#xAB;Förra",
        nextText: "Nästa&#xBB;",
        currentText: "Idag",
        monthNames: ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"],
        monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
        dayNamesShort: ["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"],
        dayNames: ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"],
        dayNamesMin: ["Sö", "Må", "Ti", "On", "To", "Fr", "Lö"],
        weekHeader: "Ve",
        dateFormat: "yy-mm-dd",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.sv)
}),
jQuery(function(e) {
    e.datepicker.regional.ta = {
        closeText: "மூடு",
        prevText: "முன்னையது",
        nextText: "அடுத்தது",
        currentText: "இன்று",
        monthNames: ["தை", "மாசி", "பங்குனி", "சித்திரை", "வைகாசி", "ஆனி", "ஆடி", "ஆவணி", "புரட்டாசி", "ஐப்பசி", "கார்த்திகை", "மார்கழி"],
        monthNamesShort: ["தை", "மாசி", "பங்", "சித்", "வைகா", "ஆனி", "ஆடி", "ஆவ", "புர", "ஐப்", "கார்", "மார்"],
        dayNames: ["ஞாயிற்றுக்கிழமை", "திங்கட்கிழமை", "செவ்வாய்க்கிழமை", "புதன்கிழமை", "வியாழக்கிழமை", "வெள்ளிக்கிழமை", "சனிக்கிழமை"],
        dayNamesShort: ["ஞாயிறு", "திங்கள்", "செவ்வாய்", "புதன்", "வியாழன்", "வெள்ளி", "சனி"],
        dayNamesMin: ["ஞா", "தி", "செ", "பு", "வி", "வெ", "ச"],
        weekHeader: "Не",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.ta)
}),
jQuery(function(e) {
    e.datepicker.regional.th = {
        closeText: "ปิด",
        prevText: "&#xAB;&#xA0;ย้อน",
        nextText: "ถัดไป&#xA0;&#xBB;",
        currentText: "วันนี้",
        monthNames: ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"],
        monthNamesShort: ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."],
        dayNames: ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"],
        dayNamesShort: ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."],
        dayNamesMin: ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."],
        weekHeader: "Wk",
        dateFormat: "dd/mm/yy",
        firstDay: 0,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.th)
}),
jQuery(function(e) {
    e.datepicker.regional.tj = {
        closeText: "Идома",
        prevText: "&#x3c;Қафо",
        nextText: "Пеш&#x3e;",
        currentText: "Имрӯз",
        monthNames: ["Январ", "Феврал", "Март", "Апрел", "Май", "Июн", "Июл", "Август", "Сентябр", "Октябр", "Ноябр", "Декабр"],
        monthNamesShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
        dayNames: ["якшанбе", "душанбе", "сешанбе", "чоршанбе", "панҷшанбе", "ҷумъа", "шанбе"],
        dayNamesShort: ["якш", "душ", "сеш", "чор", "пан", "ҷум", "шан"],
        dayNamesMin: ["Як", "Дш", "Сш", "Чш", "Пш", "Ҷм", "Шн"],
        weekHeader: "Хф",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.tj)
}),
jQuery(function(e) {
    e.datepicker.regional.tr = {
        closeText: "kapat",
        prevText: "&#x3C;geri",
        nextText: "ileri&#x3e",
        currentText: "bugün",
        monthNames: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
        monthNamesShort: ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"],
        dayNames: ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"],
        dayNamesShort: ["Pz", "Pt", "Sa", "Ça", "Pe", "Cu", "Ct"],
        dayNamesMin: ["Pz", "Pt", "Sa", "Ça", "Pe", "Cu", "Ct"],
        weekHeader: "Hf",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.tr)
}),
jQuery(function(e) {
    e.datepicker.regional.uk = {
        closeText: "Закрити",
        prevText: "&#x3C;",
        nextText: "&#x3E;",
        currentText: "Сьогодні",
        monthNames: ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"],
        monthNamesShort: ["Січ", "Лют", "Бер", "Кві", "Тра", "Чер", "Лип", "Сер", "Вер", "Жов", "Лис", "Гру"],
        dayNames: ["неділя", "понеділок", "вівторок", "середа", "четвер", "п’ятниця", "субота"],
        dayNamesShort: ["нед", "пнд", "вів", "срд", "чтв", "птн", "сбт"],
        dayNamesMin: ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        weekHeader: "Тиж",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.uk)
}),
jQuery(function(e) {
    e.datepicker.regional.vi = {
        closeText: "Đóng",
        prevText: "&#x3C;Trước",
        nextText: "Tiếp&#x3E;",
        currentText: "Hôm nay",
        monthNames: ["Tháng Một", "Tháng Hai", "Tháng Ba", "Tháng Tư", "Tháng Năm", "Tháng Sáu", "Tháng Bảy", "Tháng Tám", "Tháng Chín", "Tháng Mười", "Tháng Mười Một", "Tháng Mười Hai"],
        monthNamesShort: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
        dayNames: ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"],
        dayNamesShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
        dayNamesMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
        weekHeader: "Tu",
        dateFormat: "dd/mm/yy",
        firstDay: 0,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: ""
    },
    e.datepicker.setDefaults(e.datepicker.regional.vi)
}),
jQuery(function(e) {
    e.datepicker.regional["zh-CN"] = {
        closeText: "关闭",
        prevText: "&#x3C;上月",
        nextText: "下月&#x3E;",
        currentText: "今天",
        monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
        dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
        dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
        weekHeader: "周",
        dateFormat: "yy-mm-dd",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !0,
        yearSuffix: "年"
    },
    e.datepicker.setDefaults(e.datepicker.regional["zh-CN"])
}),
jQuery(function(e) {
    e.datepicker.regional["zh-HK"] = {
        closeText: "關閉",
        prevText: "&#x3C;上月",
        nextText: "下月&#x3E;",
        currentText: "今天",
        monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
        dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
        dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
        weekHeader: "周",
        dateFormat: "dd-mm-yy",
        firstDay: 0,
        isRTL: !1,
        showMonthAfterYear: !0,
        yearSuffix: "年"
    },
    e.datepicker.setDefaults(e.datepicker.regional["zh-HK"])
}),
jQuery(function(e) {
    e.datepicker.regional["zh-TW"] = {
        closeText: "關閉",
        prevText: "&#x3C;上月",
        nextText: "下月&#x3E;",
        currentText: "今天",
        monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
        dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
        dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
        weekHeader: "周",
        dateFormat: "yy/mm/dd",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !0,
        yearSuffix: "年"
    },
    e.datepicker.setDefaults(e.datepicker.regional["zh-TW"])
});

/* collective.js.jqueryui: jquery.ui.menu.min.js */

/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(t) {
    t.widget("ui.menu", {
        version: "1.10.2",
        defaultElement: "<ul>",
        delay: 300,
        options: {
            icons: {
                submenu: "ui-icon-carat-1-e"
            },
            menus: "ul",
            position: {
                my: "left top",
                at: "right top"
            },
            role: "menu",
            blur: null,
            focus: null,
            select: null
        },
        _create: function() {
            this.activeMenu = this.element,
            this.mouseHandled = !1,
            this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({
                role: this.options.role,
                tabIndex: 0
            }).bind("click" + this.eventNamespace, t.proxy(function(t) {
                this.options.disabled && t.preventDefault()
            }, this)),
            this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true"),
            this._on({
                "mousedown .ui-menu-item > a": function(t) {
                    t.preventDefault()
                },
                "click .ui-state-disabled > a": function(t) {
                    t.preventDefault()
                },
                "click .ui-menu-item:has(a)": function(e) {
                    var i = t(e.target).closest(".ui-menu-item");
                    !this.mouseHandled && i.not(".ui-state-disabled").length && (this.mouseHandled = !0,
                    this.select(e),
                    i.has(".ui-menu").length ? this.expand(e) : this.element.is(":focus") || (this.element.trigger("focus", [!0]),
                    this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)))
                },
                "mouseenter .ui-menu-item": function(e) {
                    var i = t(e.currentTarget);
                    i.siblings().children(".ui-state-active").removeClass("ui-state-active"),
                    this.focus(e, i)
                },
                mouseleave: "collapseAll",
                "mouseleave .ui-menu": "collapseAll",
                focus: function(t, e) {
                    var i = this.active || this.element.children(".ui-menu-item").eq(0);
                    e || this.focus(t, i)
                },
                blur: function(e) {
                    this._delay(function() {
                        t.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(e)
                    })
                },
                keydown: "_keydown"
            }),
            this.refresh(),
            this._on(this.document, {
                click: function(e) {
                    t(e.target).closest(".ui-menu").length || this.collapseAll(e),
                    this.mouseHandled = !1
                }
            })
        },
        _destroy: function() {
            this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(),
            this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function() {
                var e = t(this);
                e.data("ui-menu-submenu-carat") && e.remove()
            }),
            this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")
        },
        _keydown: function(e) {
            function i(t) {
                return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
            }
            var s, n, a, o, r, h = !0;
            switch (e.keyCode) {
            case t.ui.keyCode.PAGE_UP:
                this.previousPage(e);
                break;
            case t.ui.keyCode.PAGE_DOWN:
                this.nextPage(e);
                break;
            case t.ui.keyCode.HOME:
                this._move("first", "first", e);
                break;
            case t.ui.keyCode.END:
                this._move("last", "last", e);
                break;
            case t.ui.keyCode.UP:
                this.previous(e);
                break;
            case t.ui.keyCode.DOWN:
                this.next(e);
                break;
            case t.ui.keyCode.LEFT:
                this.collapse(e);
                break;
            case t.ui.keyCode.RIGHT:
                this.active && !this.active.is(".ui-state-disabled") && this.expand(e);
                break;
            case t.ui.keyCode.ENTER:
            case t.ui.keyCode.SPACE:
                this._activate(e);
                break;
            case t.ui.keyCode.ESCAPE:
                this.collapse(e);
                break;
            default:
                h = !1,
                n = this.previousFilter || "",
                a = String.fromCharCode(e.keyCode),
                o = !1,
                clearTimeout(this.filterTimer),
                a === n ? o = !0 : a = n + a,
                r = RegExp("^" + i(a), "i"),
                s = this.activeMenu.children(".ui-menu-item").filter(function() {
                    return r.test(t(this).children("a").text())
                }),
                s = o && -1 !== s.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : s,
                s.length || (a = String.fromCharCode(e.keyCode),
                r = RegExp("^" + i(a), "i"),
                s = this.activeMenu.children(".ui-menu-item").filter(function() {
                    return r.test(t(this).children("a").text())
                })),
                s.length ? (this.focus(e, s),
                s.length > 1 ? (this.previousFilter = a,
                this.filterTimer = this._delay(function() {
                    delete this.previousFilter
                }, 1e3)) : delete this.previousFilter) : delete this.previousFilter
            }
            h && e.preventDefault()
        },
        _activate: function(t) {
            this.active.is(".ui-state-disabled") || (this.active.children("a[aria-haspopup='true']").length ? this.expand(t) : this.select(t))
        },
        refresh: function() {
            var e, i = this.options.icons.submenu, s = this.element.find(this.options.menus);
            s.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({
                role: this.options.role,
                "aria-hidden": "true",
                "aria-expanded": "false"
            }).each(function() {
                var e = t(this)
                  , s = e.prev("a")
                  , n = t("<span>").addClass("ui-menu-icon ui-icon " + i).data("ui-menu-submenu-carat", !0);
                s.attr("aria-haspopup", "true").prepend(n),
                e.attr("aria-labelledby", s.attr("id"))
            }),
            e = s.add(this.element),
            e.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "presentation").children("a").uniqueId().addClass("ui-corner-all").attr({
                tabIndex: -1,
                role: this._itemRole()
            }),
            e.children(":not(.ui-menu-item)").each(function() {
                var e = t(this);
                /[^\-\u2014\u2013\s]/.test(e.text()) || e.addClass("ui-widget-content ui-menu-divider")
            }),
            e.children(".ui-state-disabled").attr("aria-disabled", "true"),
            this.active && !t.contains(this.element[0], this.active[0]) && this.blur()
        },
        _itemRole: function() {
            return {
                menu: "menuitem",
                listbox: "option"
            }[this.options.role]
        },
        _setOption: function(t, e) {
            "icons" === t && this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(e.submenu),
            this._super(t, e)
        },
        focus: function(t, e) {
            var i, s;
            this.blur(t, t && "focus" === t.type),
            this._scrollIntoView(e),
            this.active = e.first(),
            s = this.active.children("a").addClass("ui-state-focus"),
            this.options.role && this.element.attr("aria-activedescendant", s.attr("id")),
            this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active"),
            t && "keydown" === t.type ? this._close() : this.timer = this._delay(function() {
                this._close()
            }, this.delay),
            i = e.children(".ui-menu"),
            i.length && /^mouse/.test(t.type) && this._startOpening(i),
            this.activeMenu = e.parent(),
            this._trigger("focus", t, {
                item: e
            })
        },
        _scrollIntoView: function(e) {
            var i, s, n, a, o, r;
            this._hasScroll() && (i = parseFloat(t.css(this.activeMenu[0], "borderTopWidth")) || 0,
            s = parseFloat(t.css(this.activeMenu[0], "paddingTop")) || 0,
            n = e.offset().top - this.activeMenu.offset().top - i - s,
            a = this.activeMenu.scrollTop(),
            o = this.activeMenu.height(),
            r = e.height(),
            0 > n ? this.activeMenu.scrollTop(a + n) : n + r > o && this.activeMenu.scrollTop(a + n - o + r))
        },
        blur: function(t, e) {
            e || clearTimeout(this.timer),
            this.active && (this.active.children("a").removeClass("ui-state-focus"),
            this.active = null,
            this._trigger("blur", t, {
                item: this.active
            }))
        },
        _startOpening: function(t) {
            clearTimeout(this.timer),
            "true" === t.attr("aria-hidden") && (this.timer = this._delay(function() {
                this._close(),
                this._open(t)
            }, this.delay))
        },
        _open: function(e) {
            var i = t.extend({
                of: this.active
            }, this.options.position);
            clearTimeout(this.timer),
            this.element.find(".ui-menu").not(e.parents(".ui-menu")).hide().attr("aria-hidden", "true"),
            e.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(i)
        },
        collapseAll: function(e, i) {
            clearTimeout(this.timer),
            this.timer = this._delay(function() {
                var s = i ? this.element : t(e && e.target).closest(this.element.find(".ui-menu"));
                s.length || (s = this.element),
                this._close(s),
                this.blur(e),
                this.activeMenu = s
            }, this.delay)
        },
        _close: function(t) {
            t || (t = this.active ? this.active.parent() : this.element),
            t.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find("a.ui-state-active").removeClass("ui-state-active")
        },
        collapse: function(t) {
            var e = this.active && this.active.parent().closest(".ui-menu-item", this.element);
            e && e.length && (this._close(),
            this.focus(t, e))
        },
        expand: function(t) {
            var e = this.active && this.active.children(".ui-menu ").children(".ui-menu-item").first();
            e && e.length && (this._open(e.parent()),
            this._delay(function() {
                this.focus(t, e)
            }))
        },
        next: function(t) {
            this._move("next", "first", t)
        },
        previous: function(t) {
            this._move("prev", "last", t)
        },
        isFirstItem: function() {
            return this.active && !this.active.prevAll(".ui-menu-item").length
        },
        isLastItem: function() {
            return this.active && !this.active.nextAll(".ui-menu-item").length
        },
        _move: function(t, e, i) {
            var s;
            this.active && (s = "first" === t || "last" === t ? this.active["first" === t ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[t + "All"](".ui-menu-item").eq(0)),
            s && s.length && this.active || (s = this.activeMenu.children(".ui-menu-item")[e]()),
            this.focus(i, s)
        },
        nextPage: function(e) {
            var i, s, n;
            return this.active ? (this.isLastItem() || (this._hasScroll() ? (s = this.active.offset().top,
            n = this.element.height(),
            this.active.nextAll(".ui-menu-item").each(function() {
                return i = t(this),
                0 > i.offset().top - s - n
            }),
            this.focus(e, i)) : this.focus(e, this.activeMenu.children(".ui-menu-item")[this.active ? "last" : "first"]())),
            undefined) : (this.next(e),
            undefined)
        },
        previousPage: function(e) {
            var i, s, n;
            return this.active ? (this.isFirstItem() || (this._hasScroll() ? (s = this.active.offset().top,
            n = this.element.height(),
            this.active.prevAll(".ui-menu-item").each(function() {
                return i = t(this),
                i.offset().top - s + n > 0
            }),
            this.focus(e, i)) : this.focus(e, this.activeMenu.children(".ui-menu-item").first())),
            undefined) : (this.next(e),
            undefined)
        },
        _hasScroll: function() {
            return this.element.outerHeight() < this.element.prop("scrollHeight")
        },
        select: function(e) {
            this.active = this.active || t(e.target).closest(".ui-menu-item");
            var i = {
                item: this.active
            };
            this.active.has(".ui-menu").length || this.collapseAll(e, !0),
            this._trigger("select", e, i)
        }
    })
}
)(jQuery);

/* collective.js.jqueryui: jquery.ui.effect.min.js */

/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(t, e) {
    var i = "ui-effects-";
    t.effects = {
        effect: {}
    },
    function(t, e) {
        function i(t, e, i) {
            var s = u[e.type] || {};
            return null == t ? i || !e.def ? null : e.def : (t = s.floor ? ~~t : parseFloat(t),
            isNaN(t) ? e.def : s.mod ? (t + s.mod) % s.mod : 0 > t ? 0 : t > s.max ? s.max : t)
        }
        function s(i) {
            var s = l()
              , n = s._rgba = [];
            return i = i.toLowerCase(),
            f(h, function(t, a) {
                var o, r = a.re.exec(i), h = r && a.parse(r), l = a.space || "rgba";
                return h ? (o = s[l](h),
                s[c[l].cache] = o[c[l].cache],
                n = s._rgba = o._rgba,
                !1) : e
            }),
            n.length ? ("0,0,0,0" === n.join() && t.extend(n, a.transparent),
            s) : a[i]
        }
        function n(t, e, i) {
            return i = (i + 1) % 1,
            1 > 6 * i ? t + 6 * (e - t) * i : 1 > 2 * i ? e : 2 > 3 * i ? t + 6 * (e - t) * (2 / 3 - i) : t
        }
        var a, o = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor", r = /^([\-+])=\s*(\d+\.?\d*)/, h = [{
            re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            parse: function(t) {
                return [t[1], t[2], t[3], t[4]]
            }
        }, {
            re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            parse: function(t) {
                return [2.55 * t[1], 2.55 * t[2], 2.55 * t[3], t[4]]
            }
        }, {
            re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
            parse: function(t) {
                return [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)]
            }
        }, {
            re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
            parse: function(t) {
                return [parseInt(t[1] + t[1], 16), parseInt(t[2] + t[2], 16), parseInt(t[3] + t[3], 16)]
            }
        }, {
            re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            space: "hsla",
            parse: function(t) {
                return [t[1], t[2] / 100, t[3] / 100, t[4]]
            }
        }], l = t.Color = function(e, i, s, n) {
            return new t.Color.fn.parse(e,i,s,n)
        }
        , c = {
            rgba: {
                props: {
                    red: {
                        idx: 0,
                        type: "byte"
                    },
                    green: {
                        idx: 1,
                        type: "byte"
                    },
                    blue: {
                        idx: 2,
                        type: "byte"
                    }
                }
            },
            hsla: {
                props: {
                    hue: {
                        idx: 0,
                        type: "degrees"
                    },
                    saturation: {
                        idx: 1,
                        type: "percent"
                    },
                    lightness: {
                        idx: 2,
                        type: "percent"
                    }
                }
            }
        }, u = {
            "byte": {
                floor: !0,
                max: 255
            },
            percent: {
                max: 1
            },
            degrees: {
                mod: 360,
                floor: !0
            }
        }, d = l.support = {}, p = t("<p>")[0], f = t.each;
        p.style.cssText = "background-color:rgba(1,1,1,.5)",
        d.rgba = p.style.backgroundColor.indexOf("rgba") > -1,
        f(c, function(t, e) {
            e.cache = "_" + t,
            e.props.alpha = {
                idx: 3,
                type: "percent",
                def: 1
            }
        }),
        l.fn = t.extend(l.prototype, {
            parse: function(n, o, r, h) {
                if (n === e)
                    return this._rgba = [null, null, null, null],
                    this;
                (n.jquery || n.nodeType) && (n = t(n).css(o),
                o = e);
                var u = this
                  , d = t.type(n)
                  , p = this._rgba = [];
                return o !== e && (n = [n, o, r, h],
                d = "array"),
                "string" === d ? this.parse(s(n) || a._default) : "array" === d ? (f(c.rgba.props, function(t, e) {
                    p[e.idx] = i(n[e.idx], e)
                }),
                this) : "object" === d ? (n instanceof l ? f(c, function(t, e) {
                    n[e.cache] && (u[e.cache] = n[e.cache].slice())
                }) : f(c, function(e, s) {
                    var a = s.cache;
                    f(s.props, function(t, e) {
                        if (!u[a] && s.to) {
                            if ("alpha" === t || null == n[t])
                                return;
                            u[a] = s.to(u._rgba)
                        }
                        u[a][e.idx] = i(n[t], e, !0)
                    }),
                    u[a] && 0 > t.inArray(null, u[a].slice(0, 3)) && (u[a][3] = 1,
                    s.from && (u._rgba = s.from(u[a])))
                }),
                this) : e
            },
            is: function(t) {
                var i = l(t)
                  , s = !0
                  , n = this;
                return f(c, function(t, a) {
                    var o, r = i[a.cache];
                    return r && (o = n[a.cache] || a.to && a.to(n._rgba) || [],
                    f(a.props, function(t, i) {
                        return null != r[i.idx] ? s = r[i.idx] === o[i.idx] : e
                    })),
                    s
                }),
                s
            },
            _space: function() {
                var t = []
                  , e = this;
                return f(c, function(i, s) {
                    e[s.cache] && t.push(i)
                }),
                t.pop()
            },
            transition: function(t, e) {
                var s = l(t)
                  , n = s._space()
                  , a = c[n]
                  , o = 0 === this.alpha() ? l("transparent") : this
                  , r = o[a.cache] || a.to(o._rgba)
                  , h = r.slice();
                return s = s[a.cache],
                f(a.props, function(t, n) {
                    var a = n.idx
                      , o = r[a]
                      , l = s[a]
                      , c = u[n.type] || {};
                    null !== l && (null === o ? h[a] = l : (c.mod && (l - o > c.mod / 2 ? o += c.mod : o - l > c.mod / 2 && (o -= c.mod)),
                    h[a] = i((l - o) * e + o, n)))
                }),
                this[n](h)
            },
            blend: function(e) {
                if (1 === this._rgba[3])
                    return this;
                var i = this._rgba.slice()
                  , s = i.pop()
                  , n = l(e)._rgba;
                return l(t.map(i, function(t, e) {
                    return (1 - s) * n[e] + s * t
                }))
            },
            toRgbaString: function() {
                var e = "rgba("
                  , i = t.map(this._rgba, function(t, e) {
                    return null == t ? e > 2 ? 1 : 0 : t
                });
                return 1 === i[3] && (i.pop(),
                e = "rgb("),
                e + i.join() + ")"
            },
            toHslaString: function() {
                var e = "hsla("
                  , i = t.map(this.hsla(), function(t, e) {
                    return null == t && (t = e > 2 ? 1 : 0),
                    e && 3 > e && (t = Math.round(100 * t) + "%"),
                    t
                });
                return 1 === i[3] && (i.pop(),
                e = "hsl("),
                e + i.join() + ")"
            },
            toHexString: function(e) {
                var i = this._rgba.slice()
                  , s = i.pop();
                return e && i.push(~~(255 * s)),
                "#" + t.map(i, function(t) {
                    return t = (t || 0).toString(16),
                    1 === t.length ? "0" + t : t
                }).join("")
            },
            toString: function() {
                return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
            }
        }),
        l.fn.parse.prototype = l.fn,
        c.hsla.to = function(t) {
            if (null == t[0] || null == t[1] || null == t[2])
                return [null, null, null, t[3]];
            var e, i, s = t[0] / 255, n = t[1] / 255, a = t[2] / 255, o = t[3], r = Math.max(s, n, a), h = Math.min(s, n, a), l = r - h, c = r + h, u = .5 * c;
            return e = h === r ? 0 : s === r ? 60 * (n - a) / l + 360 : n === r ? 60 * (a - s) / l + 120 : 60 * (s - n) / l + 240,
            i = 0 === l ? 0 : .5 >= u ? l / c : l / (2 - c),
            [Math.round(e) % 360, i, u, null == o ? 1 : o]
        }
        ,
        c.hsla.from = function(t) {
            if (null == t[0] || null == t[1] || null == t[2])
                return [null, null, null, t[3]];
            var e = t[0] / 360
              , i = t[1]
              , s = t[2]
              , a = t[3]
              , o = .5 >= s ? s * (1 + i) : s + i - s * i
              , r = 2 * s - o;
            return [Math.round(255 * n(r, o, e + 1 / 3)), Math.round(255 * n(r, o, e)), Math.round(255 * n(r, o, e - 1 / 3)), a]
        }
        ,
        f(c, function(s, n) {
            var a = n.props
              , o = n.cache
              , h = n.to
              , c = n.from;
            l.fn[s] = function(s) {
                if (h && !this[o] && (this[o] = h(this._rgba)),
                s === e)
                    return this[o].slice();
                var n, r = t.type(s), u = "array" === r || "object" === r ? s : arguments, d = this[o].slice();
                return f(a, function(t, e) {
                    var s = u["object" === r ? t : e.idx];
                    null == s && (s = d[e.idx]),
                    d[e.idx] = i(s, e)
                }),
                c ? (n = l(c(d)),
                n[o] = d,
                n) : l(d)
            }
            ,
            f(a, function(e, i) {
                l.fn[e] || (l.fn[e] = function(n) {
                    var a, o = t.type(n), h = "alpha" === e ? this._hsla ? "hsla" : "rgba" : s, l = this[h](), c = l[i.idx];
                    return "undefined" === o ? c : ("function" === o && (n = n.call(this, c),
                    o = t.type(n)),
                    null == n && i.empty ? this : ("string" === o && (a = r.exec(n),
                    a && (n = c + parseFloat(a[2]) * ("+" === a[1] ? 1 : -1))),
                    l[i.idx] = n,
                    this[h](l)))
                }
                )
            })
        }),
        l.hook = function(e) {
            var i = e.split(" ");
            f(i, function(e, i) {
                t.cssHooks[i] = {
                    set: function(e, n) {
                        var a, o, r = "";
                        if ("transparent" !== n && ("string" !== t.type(n) || (a = s(n)))) {
                            if (n = l(a || n),
                            !d.rgba && 1 !== n._rgba[3]) {
                                for (o = "backgroundColor" === i ? e.parentNode : e; ("" === r || "transparent" === r) && o && o.style; )
                                    try {
                                        r = t.css(o, "backgroundColor"),
                                        o = o.parentNode
                                    } catch (h) {}
                                n = n.blend(r && "transparent" !== r ? r : "_default")
                            }
                            n = n.toRgbaString()
                        }
                        try {
                            e.style[i] = n
                        } catch (h) {}
                    }
                },
                t.fx.step[i] = function(e) {
                    e.colorInit || (e.start = l(e.elem, i),
                    e.end = l(e.end),
                    e.colorInit = !0),
                    t.cssHooks[i].set(e.elem, e.start.transition(e.end, e.pos))
                }
            })
        }
        ,
        l.hook(o),
        t.cssHooks.borderColor = {
            expand: function(t) {
                var e = {};
                return f(["Top", "Right", "Bottom", "Left"], function(i, s) {
                    e["border" + s + "Color"] = t
                }),
                e
            }
        },
        a = t.Color.names = {
            aqua: "#00ffff",
            black: "#000000",
            blue: "#0000ff",
            fuchsia: "#ff00ff",
            gray: "#808080",
            green: "#008000",
            lime: "#00ff00",
            maroon: "#800000",
            navy: "#000080",
            olive: "#808000",
            purple: "#800080",
            red: "#ff0000",
            silver: "#c0c0c0",
            teal: "#008080",
            white: "#ffffff",
            yellow: "#ffff00",
            transparent: [null, null, null, 0],
            _default: "#ffffff"
        }
    }(jQuery),
    function() {
        function i(e) {
            var i, s, n = e.ownerDocument.defaultView ? e.ownerDocument.defaultView.getComputedStyle(e, null) : e.currentStyle, a = {};
            if (n && n.length && n[0] && n[n[0]])
                for (s = n.length; s--; )
                    i = n[s],
                    "string" == typeof n[i] && (a[t.camelCase(i)] = n[i]);
            else
                for (i in n)
                    "string" == typeof n[i] && (a[i] = n[i]);
            return a
        }
        function s(e, i) {
            var s, n, o = {};
            for (s in i)
                n = i[s],
                e[s] !== n && (a[s] || (t.fx.step[s] || !isNaN(parseFloat(n))) && (o[s] = n));
            return o
        }
        var n = ["add", "remove", "toggle"]
          , a = {
            border: 1,
            borderBottom: 1,
            borderColor: 1,
            borderLeft: 1,
            borderRight: 1,
            borderTop: 1,
            borderWidth: 1,
            margin: 1,
            padding: 1
        };
        t.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(e, i) {
            t.fx.step[i] = function(t) {
                ("none" !== t.end && !t.setAttr || 1 === t.pos && !t.setAttr) && (jQuery.style(t.elem, i, t.end),
                t.setAttr = !0)
            }
        }),
        t.fn.addBack || (t.fn.addBack = function(t) {
            return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
        }
        ),
        t.effects.animateClass = function(e, a, o, r) {
            var h = t.speed(a, o, r);
            return this.queue(function() {
                var a, o = t(this), r = o.attr("class") || "", l = h.children ? o.find("*").addBack() : o;
                l = l.map(function() {
                    var e = t(this);
                    return {
                        el: e,
                        start: i(this)
                    }
                }),
                a = function() {
                    t.each(n, function(t, i) {
                        e[i] && o[i + "Class"](e[i])
                    })
                }
                ,
                a(),
                l = l.map(function() {
                    return this.end = i(this.el[0]),
                    this.diff = s(this.start, this.end),
                    this
                }),
                o.attr("class", r),
                l = l.map(function() {
                    var e = this
                      , i = t.Deferred()
                      , s = t.extend({}, h, {
                        queue: !1,
                        complete: function() {
                            i.resolve(e)
                        }
                    });
                    return this.el.animate(this.diff, s),
                    i.promise()
                }),
                t.when.apply(t, l.get()).done(function() {
                    a(),
                    t.each(arguments, function() {
                        var e = this.el;
                        t.each(this.diff, function(t) {
                            e.css(t, "")
                        })
                    }),
                    h.complete.call(o[0])
                })
            })
        }
        ,
        t.fn.extend({
            addClass: function(e) {
                return function(i, s, n, a) {
                    return s ? t.effects.animateClass.call(this, {
                        add: i
                    }, s, n, a) : e.apply(this, arguments)
                }
            }(t.fn.addClass),
            removeClass: function(e) {
                return function(i, s, n, a) {
                    return arguments.length > 1 ? t.effects.animateClass.call(this, {
                        remove: i
                    }, s, n, a) : e.apply(this, arguments)
                }
            }(t.fn.removeClass),
            toggleClass: function(i) {
                return function(s, n, a, o, r) {
                    return "boolean" == typeof n || n === e ? a ? t.effects.animateClass.call(this, n ? {
                        add: s
                    } : {
                        remove: s
                    }, a, o, r) : i.apply(this, arguments) : t.effects.animateClass.call(this, {
                        toggle: s
                    }, n, a, o)
                }
            }(t.fn.toggleClass),
            switchClass: function(e, i, s, n, a) {
                return t.effects.animateClass.call(this, {
                    add: i,
                    remove: e
                }, s, n, a)
            }
        })
    }(),
    function() {
        function s(e, i, s, n) {
            return t.isPlainObject(e) && (i = e,
            e = e.effect),
            e = {
                effect: e
            },
            null == i && (i = {}),
            t.isFunction(i) && (n = i,
            s = null,
            i = {}),
            ("number" == typeof i || t.fx.speeds[i]) && (n = s,
            s = i,
            i = {}),
            t.isFunction(s) && (n = s,
            s = null),
            i && t.extend(e, i),
            s = s || i.duration,
            e.duration = t.fx.off ? 0 : "number" == typeof s ? s : s in t.fx.speeds ? t.fx.speeds[s] : t.fx.speeds._default,
            e.complete = n || i.complete,
            e
        }
        function n(e) {
            return !e || "number" == typeof e || t.fx.speeds[e] ? !0 : "string" != typeof e || t.effects.effect[e] ? t.isFunction(e) ? !0 : "object" != typeof e || e.effect ? !1 : !0 : !0
        }
        t.extend(t.effects, {
            version: "1.10.2",
            save: function(t, e) {
                for (var s = 0; e.length > s; s++)
                    null !== e[s] && t.data(i + e[s], t[0].style[e[s]])
            },
            restore: function(t, s) {
                var n, a;
                for (a = 0; s.length > a; a++)
                    null !== s[a] && (n = t.data(i + s[a]),
                    n === e && (n = ""),
                    t.css(s[a], n))
            },
            setMode: function(t, e) {
                return "toggle" === e && (e = t.is(":hidden") ? "show" : "hide"),
                e
            },
            getBaseline: function(t, e) {
                var i, s;
                switch (t[0]) {
                case "top":
                    i = 0;
                    break;
                case "middle":
                    i = .5;
                    break;
                case "bottom":
                    i = 1;
                    break;
                default:
                    i = t[0] / e.height
                }
                switch (t[1]) {
                case "left":
                    s = 0;
                    break;
                case "center":
                    s = .5;
                    break;
                case "right":
                    s = 1;
                    break;
                default:
                    s = t[1] / e.width
                }
                return {
                    x: s,
                    y: i
                }
            },
            createWrapper: function(e) {
                if (e.parent().is(".ui-effects-wrapper"))
                    return e.parent();
                var i = {
                    width: e.outerWidth(!0),
                    height: e.outerHeight(!0),
                    "float": e.css("float")
                }
                  , s = t("<div></div>").addClass("ui-effects-wrapper").css({
                    fontSize: "100%",
                    background: "transparent",
                    border: "none",
                    margin: 0,
                    padding: 0
                })
                  , n = {
                    width: e.width(),
                    height: e.height()
                }
                  , a = document.activeElement;
                try {
                    a.id
                } catch (o) {
                    a = document.body
                }
                return e.wrap(s),
                (e[0] === a || t.contains(e[0], a)) && t(a).focus(),
                s = e.parent(),
                "static" === e.css("position") ? (s.css({
                    position: "relative"
                }),
                e.css({
                    position: "relative"
                })) : (t.extend(i, {
                    position: e.css("position"),
                    zIndex: e.css("z-index")
                }),
                t.each(["top", "left", "bottom", "right"], function(t, s) {
                    i[s] = e.css(s),
                    isNaN(parseInt(i[s], 10)) && (i[s] = "auto")
                }),
                e.css({
                    position: "relative",
                    top: 0,
                    left: 0,
                    right: "auto",
                    bottom: "auto"
                })),
                e.css(n),
                s.css(i).show()
            },
            removeWrapper: function(e) {
                var i = document.activeElement;
                return e.parent().is(".ui-effects-wrapper") && (e.parent().replaceWith(e),
                (e[0] === i || t.contains(e[0], i)) && t(i).focus()),
                e
            },
            setTransition: function(e, i, s, n) {
                return n = n || {},
                t.each(i, function(t, i) {
                    var a = e.cssUnit(i);
                    a[0] > 0 && (n[i] = a[0] * s + a[1])
                }),
                n
            }
        }),
        t.fn.extend({
            effect: function() {
                function e(e) {
                    function s() {
                        t.isFunction(a) && a.call(n[0]),
                        t.isFunction(e) && e()
                    }
                    var n = t(this)
                      , a = i.complete
                      , r = i.mode;
                    (n.is(":hidden") ? "hide" === r : "show" === r) ? (n[r](),
                    s()) : o.call(n[0], i, s)
                }
                var i = s.apply(this, arguments)
                  , n = i.mode
                  , a = i.queue
                  , o = t.effects.effect[i.effect];
                return t.fx.off || !o ? n ? this[n](i.duration, i.complete) : this.each(function() {
                    i.complete && i.complete.call(this)
                }) : a === !1 ? this.each(e) : this.queue(a || "fx", e)
            },
            show: function(t) {
                return function(e) {
                    if (n(e))
                        return t.apply(this, arguments);
                    var i = s.apply(this, arguments);
                    return i.mode = "show",
                    this.effect.call(this, i)
                }
            }(t.fn.show),
            hide: function(t) {
                return function(e) {
                    if (n(e))
                        return t.apply(this, arguments);
                    var i = s.apply(this, arguments);
                    return i.mode = "hide",
                    this.effect.call(this, i)
                }
            }(t.fn.hide),
            toggle: function(t) {
                return function(e) {
                    if (n(e) || "boolean" == typeof e)
                        return t.apply(this, arguments);
                    var i = s.apply(this, arguments);
                    return i.mode = "toggle",
                    this.effect.call(this, i)
                }
            }(t.fn.toggle),
            cssUnit: function(e) {
                var i = this.css(e)
                  , s = [];
                return t.each(["em", "px", "%", "pt"], function(t, e) {
                    i.indexOf(e) > 0 && (s = [parseFloat(i), e])
                }),
                s
            }
        })
    }(),
    function() {
        var e = {};
        t.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(t, i) {
            e[i] = function(e) {
                return Math.pow(e, t + 2)
            }
        }),
        t.extend(e, {
            Sine: function(t) {
                return 1 - Math.cos(t * Math.PI / 2)
            },
            Circ: function(t) {
                return 1 - Math.sqrt(1 - t * t)
            },
            Elastic: function(t) {
                return 0 === t || 1 === t ? t : -Math.pow(2, 8 * (t - 1)) * Math.sin((80 * (t - 1) - 7.5) * Math.PI / 15)
            },
            Back: function(t) {
                return t * t * (3 * t - 2)
            },
            Bounce: function(t) {
                for (var e, i = 4; ((e = Math.pow(2, --i)) - 1) / 11 > t; )
                    ;
                return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((3 * e - 2) / 22 - t, 2)
            }
        }),
        t.each(e, function(e, i) {
            t.easing["easeIn" + e] = i,
            t.easing["easeOut" + e] = function(t) {
                return 1 - i(1 - t)
            }
            ,
            t.easing["easeInOut" + e] = function(t) {
                return .5 > t ? i(2 * t) / 2 : 1 - i(-2 * t + 2) / 2
            }
        })
    }()
}
)(jQuery);

/* collective.js.jqueryui: jquery.ui.effect-drop.min.js */

/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(t) {
    t.effects.effect.drop = function(e, i) {
        var s, n = t(this), a = ["position", "top", "bottom", "left", "right", "opacity", "height", "width"], o = t.effects.setMode(n, e.mode || "hide"), r = "show" === o, h = e.direction || "left", l = "up" === h || "down" === h ? "top" : "left", c = "up" === h || "left" === h ? "pos" : "neg", u = {
            opacity: r ? 1 : 0
        };
        t.effects.save(n, a),
        n.show(),
        t.effects.createWrapper(n),
        s = e.distance || n["top" === l ? "outerHeight" : "outerWidth"](!0) / 2,
        r && n.css("opacity", 0).css(l, "pos" === c ? -s : s),
        u[l] = (r ? "pos" === c ? "+=" : "-=" : "pos" === c ? "-=" : "+=") + s,
        n.animate(u, {
            queue: !1,
            duration: e.duration,
            easing: e.easing,
            complete: function() {
                "hide" === o && n.hide(),
                t.effects.restore(n, a),
                t.effects.removeWrapper(n),
                i()
            }
        })
    }
}
)(jQuery);

/* collective.js.jqueryui: jquery.ui.effect-fade.min.js */

/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(t) {
    t.effects.effect.fade = function(e, i) {
        var s = t(this)
          , n = t.effects.setMode(s, e.mode || "toggle");
        s.animate({
            opacity: n
        }, {
            queue: !1,
            duration: e.duration,
            easing: e.easing,
            complete: i
        })
    }
}
)(jQuery);

/* collective.js.jqueryui: jquery.ui.effect-slide.min.js */

/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(t) {
    t.effects.effect.slide = function(e, i) {
        var s, n = t(this), a = ["position", "top", "bottom", "left", "right", "width", "height"], o = t.effects.setMode(n, e.mode || "show"), r = "show" === o, h = e.direction || "left", l = "up" === h || "down" === h ? "top" : "left", c = "up" === h || "left" === h, u = {};
        t.effects.save(n, a),
        n.show(),
        s = e.distance || n["top" === l ? "outerHeight" : "outerWidth"](!0),
        t.effects.createWrapper(n).css({
            overflow: "hidden"
        }),
        r && n.css(l, c ? isNaN(s) ? "-" + s : -s : s),
        u[l] = (r ? c ? "+=" : "-=" : c ? "-=" : "+=") + s,
        n.animate(u, {
            queue: !1,
            duration: e.duration,
            easing: e.easing,
            complete: function() {
                "hide" === o && n.hide(),
                t.effects.restore(n, a),
                t.effects.removeWrapper(n),
                i()
            }
        })
    }
}
)(jQuery);

/* - jquery-integration.js - */
// https://www.unibo.it/portal_javascripts/jquery-integration.js?original=1
var jq = jQuery;
if (typeof cssQuery === 'undefined') {
    var cssQuery = function(s, f) {
        return jQuery.makeArray(jQuery(s, f))
    }
}

/* - ++resource++unibo.fields/datetimewidget.js - */
// https://www.unibo.it/portal_javascripts/++resource++unibo.fields/datetimewidget.js?original=1
(function($) {
    "use strict";
    if ((typeof window.datetimewidget) === 'undefined') {
        window.datetimewidget = {}
    }
    var datetimewidget = window.datetimewidget;
    datetimewidget.initCalendarWidget = function() {
        var widgets = $('div.calendar-widget');
        if (widgets.length > 0) {
            widgets.calendarwidget()
        }
    }
    ;
    $.fn.extend({
        calendarwidget: function(options) {
            return this.each(function() {
                var $this = $(this), $year_input = $this.find('input.year'), $month_input = $this.find('select.month'), $day_input = $this.find('input.day'), default_date = $this.data('calendarDefault'), value = null, settings;
                if (default_date) {
                    default_date = default_date.split("-");
                    value = new Date(default_date[0],default_date[1] - 1,default_date[2])
                }
                settings = $.extend(true, {
                    selectors: true,
                    trigger: true,
                    format: $this.data('calendarFormat'),
                    yearRange: $this.data('calendarYearrange'),
                    firstDay: 1,
                    lang: $this.data('calendarLang'),
                    value: value,
                    change: function() {
                        var value = this.getValue("yyyy-m-d").split("-");
                        $year_input.val(value[0]);
                        $month_input.val(value[1]);
                        $day_input.val(value[2])
                    }
                }, options);
                if ($.fn.dateinput) {
                    $this.find('input.date').dateinput({
                        selectors: settings.selectors,
                        trigger: settings.trigger,
                        format: settings.format,
                        yearRange: settings.yearRange,
                        firstDay: settings.firstDay,
                        lang: settings.lang,
                        value: settings.value,
                        change: settings.change
                    }).unbind('change').bind('onShow', function() {
                        var trigger_offset = $(this).next().offset();
                        $(this).data('dateinput').getCalendar().offset({
                            top: trigger_offset.top + 20,
                            left: trigger_offset.left
                        })
                    })
                }
            })
        }
    });
    $(document).ready(function() {
        datetimewidget.initCalendarWidget()
    })
}(jQuery));

/* - register_function.js - */
// https://www.unibo.it/portal_javascripts/register_function.js?original=1
var bugRiddenCrashPronePieceOfJunk = (navigator.userAgent.indexOf('MSIE 5') !== -1 && navigator.userAgent.indexOf('Mac') !== -1);
var W3CDOM = (!bugRiddenCrashPronePieceOfJunk && typeof document.getElementsByTagName !== 'undefined' && typeof document.createElement !== 'undefined');
var registerEventListener = function(elem, event, func) {
    jQuery(elem).bind(event, func)
};
var unRegisterEventListener = function(elem, event, func) {
    jQuery(elem).unbind(event, func)
};
var registerPloneFunction = jQuery;
function getContentArea() {
    var node = jQuery('#region-content,#content');
    return node.length ? node[0] : null
}

/* - plone_javascript_variables.js - */
// https://www.unibo.it/portal_javascripts/plone_javascript_variables.js?original=1
var portal_url = 'https://www.unibo.it';
var base_url = 'https://www.unibo.it/it/servizi-e-opportunita/servizi-online/il-mio-portale';
var form_modified_message = 'Il modulo non è stato salvato. Tutte le modifiche che hai apportato saranno perse';
var form_resubmit_message = 'Hai già premuto il pulsante di conferma. Vuoi veramente inviare di nuovo questo modulo?';
var external_links_open_new_window = 'true';
var mark_special_links = 'false';
var ajax_noresponse_message = 'Nessuna risposta dal server. Riprova più tardi';

/* - ++resource++plone.app.jquerytools.js - */
!function($) {
    function Overlay(trigger, conf) {
        var closers, overlay, opened, self = this, fire = trigger.add(self), w = $(window), maskConf = $.tools.expose && (conf.mask || conf.expose), uid = Math.random().toString().slice(10);
        maskConf && ("string" == typeof maskConf && (maskConf = {
            color: maskConf
        }),
        maskConf.closeOnClick = maskConf.closeOnEsc = !1);
        var jq = conf.target || trigger.attr("rel");
        if (overlay = jq ? $(jq) : trigger,
        !overlay.length)
            throw "Could not find Overlay: " + jq;
        trigger && trigger.index(overlay) == -1 && trigger.click(function(e) {
            return self.load(e),
            e.preventDefault()
        }),
        $.extend(self, {
            load: function(e) {
                if (self.isOpened())
                    return self;
                var eff = effects[conf.effect];
                if (!eff)
                    throw 'Overlay: cannot find effect : "' + conf.effect + '"';
                if (conf.oneInstance && $.each(instances, function() {
                    this.close(e)
                }),
                e = e || $.Event(),
                e.type = "onBeforeLoad",
                fire.trigger(e),
                e.isDefaultPrevented())
                    return self;
                opened = !0,
                maskConf && $(overlay).expose(maskConf);
                var top = conf.top
                  , left = conf.left
                  , oWidth = overlay.outerWidth(!0)
                  , oHeight = overlay.outerHeight(!0);
                return "string" == typeof top && (top = "center" == top ? Math.max((w.height() - oHeight) / 2, 0) : parseInt(top, 10) / 100 * w.height()),
                "center" == left && (left = Math.max((w.width() - oWidth) / 2, 0)),
                eff[0].call(self, {
                    top: top,
                    left: left
                }, function() {
                    opened && (e.type = "onLoad",
                    fire.trigger(e))
                }),
                maskConf && conf.closeOnClick && $.mask.getMask().one("click", self.close),
                conf.closeOnClick && $(document).on("click." + uid, function(e) {
                    $(e.target).parents(overlay).length || self.close(e)
                }),
                conf.closeOnEsc && $(document).on("keydown." + uid, function(e) {
                    27 == e.keyCode && self.close(e)
                }),
                self
            },
            close: function(e) {
                return self.isOpened() ? (e = e || $.Event(),
                e.type = "onBeforeClose",
                fire.trigger(e),
                e.isDefaultPrevented() ? void 0 : (opened = !1,
                effects[conf.effect][1].call(self, function() {
                    e.type = "onClose",
                    fire.trigger(e)
                }),
                $(document).off("click." + uid + " keydown." + uid),
                maskConf && $.mask.close(),
                self)) : self
            },
            getOverlay: function() {
                return overlay
            },
            getTrigger: function() {
                return trigger
            },
            getClosers: function() {
                return closers
            },
            isOpened: function() {
                return opened
            },
            getConf: function() {
                return conf
            }
        }),
        $.each("onBeforeLoad,onStart,onLoad,onBeforeClose,onClose".split(","), function(i, name) {
            $.isFunction(conf[name]) && $(self).on(name, conf[name]),
            self[name] = function(fn) {
                return fn && $(self).on(name, fn),
                self
            }
        }),
        closers = overlay.find(conf.close || ".close"),
        closers.length || conf.close || (closers = $('<a class="close"></a>'),
        overlay.prepend(closers)),
        closers.click(function(e) {
            self.close(e)
        }),
        conf.load && self.load()
    }
    $.tools = $.tools || {
        version: "@VERSION"
    },
    $.tools.overlay = {
        addEffect: function(name, loadFn, closeFn) {
            effects[name] = [loadFn, closeFn]
        },
        conf: {
            close: null,
            closeOnClick: !0,
            closeOnEsc: !0,
            closeSpeed: "fast",
            effect: "default",
            fixed: !/msie/.test(navigator.userAgent.toLowerCase()) || navigator.appVersion > 6,
            left: "center",
            load: !1,
            mask: null,
            oneInstance: !0,
            speed: "normal",
            target: null,
            top: "10%"
        }
    };
    var instances = []
      , effects = {};
    $.tools.overlay.addEffect("default", function(pos, onLoad) {
        var conf = this.getConf()
          , w = $(window);
        conf.fixed || (pos.top += w.scrollTop(),
        pos.left += w.scrollLeft()),
        pos.position = conf.fixed ? "fixed" : "absolute",
        this.getOverlay().css(pos).fadeIn(conf.speed, onLoad)
    }, function(onClose) {
        this.getOverlay().fadeOut(this.getConf().closeSpeed, onClose)
    }),
    $.fn.overlay = function(conf) {
        var el = this.data("overlay");
        return el ? el : ($.isFunction(conf) && (conf = {
            onBeforeLoad: conf
        }),
        conf = $.extend(!0, {}, $.tools.overlay.conf, conf),
        this.each(function() {
            el = new Overlay($(this),conf),
            instances.push(el),
            $(this).data("overlay", el)
        }),
        conf.api ? el : this)
    }
}(jQuery),
function($) {
    function find(root, query) {
        var el = $(query);
        return el.length < 2 ? el : root.parent().find(query)
    }
    function Scrollable(root, conf) {
        var self = this
          , fire = root.add(self)
          , itemWrap = root.children()
          , index = 0
          , vertical = conf.vertical;
        if (current || (current = self),
        itemWrap.length > 1 && (itemWrap = $(conf.items, root)),
        conf.size > 1 && (conf.circular = !1),
        $.extend(self, {
            getConf: function() {
                return conf
            },
            getIndex: function() {
                return index
            },
            getSize: function() {
                return self.getItems().size()
            },
            getNaviButtons: function() {
                return prev.add(next)
            },
            getRoot: function() {
                return root
            },
            getItemWrap: function() {
                return itemWrap
            },
            getItems: function() {
                return itemWrap.find(conf.item).not("." + conf.clonedClass)
            },
            move: function(offset, time) {
                return self.seekTo(index + offset, time)
            },
            next: function(time) {
                return self.move(conf.size, time)
            },
            prev: function(time) {
                return self.move(-conf.size, time)
            },
            begin: function(time) {
                return self.seekTo(0, time)
            },
            end: function(time) {
                return self.seekTo(self.getSize() - 1, time)
            },
            focus: function() {
                return current = self,
                self
            },
            addItem: function(item) {
                return item = $(item),
                conf.circular ? (itemWrap.children().last().before(item),
                itemWrap.children().first().replaceWith(item.clone().addClass(conf.clonedClass))) : (itemWrap.append(item),
                next.removeClass("disabled")),
                fire.trigger("onAddItem", [item]),
                self
            },
            seekTo: function(i, time, fn) {
                if (i.jquery || (i *= 1),
                conf.circular && 0 === i && index == -1 && 0 !== time)
                    return self;
                if (!conf.circular && i < 0 || i > self.getSize() || i < -1)
                    return self;
                var item = i;
                i.jquery ? i = self.getItems().index(i) : item = self.getItems().eq(i);
                var e = $.Event("onBeforeSeek");
                if (!fn && (fire.trigger(e, [i, time]),
                e.isDefaultPrevented() || !item.length))
                    return self;
                var props = vertical ? {
                    top: -item.position().top
                } : {
                    left: -item.position().left
                };
                return index = i,
                current = self,
                void 0 === time && (time = conf.speed),
                itemWrap.animate(props, time, conf.easing, fn || function() {
                    fire.trigger("onSeek", [i])
                }
                ),
                self
            }
        }),
        $.each(["onBeforeSeek", "onSeek", "onAddItem"], function(i, name) {
            $.isFunction(conf[name]) && $(self).on(name, conf[name]),
            self[name] = function(fn) {
                return fn && $(self).on(name, fn),
                self
            }
        }),
        conf.circular) {
            var cloned1 = self.getItems().slice(-1).clone().prependTo(itemWrap)
              , cloned2 = self.getItems().eq(1).clone().appendTo(itemWrap);
            cloned1.add(cloned2).addClass(conf.clonedClass),
            self.onBeforeSeek(function(e, i, time) {
                if (!e.isDefaultPrevented())
                    return i == -1 ? (self.seekTo(cloned1, time, function() {
                        self.end(0)
                    }),
                    e.preventDefault()) : void (i == self.getSize() && self.seekTo(cloned2, time, function() {
                        self.begin(0)
                    }))
            });
            var hidden_parents = root.parents().add(root).filter(function() {
                if ("none" === $(this).css("display"))
                    return !0
            });
            hidden_parents.length ? (hidden_parents.show(),
            self.seekTo(0, 0, function() {}),
            hidden_parents.hide()) : self.seekTo(0, 0, function() {})
        }
        var prev = find(root, conf.prev).click(function(e) {
            e.stopPropagation(),
            self.prev()
        })
          , next = find(root, conf.next).click(function(e) {
            e.stopPropagation(),
            self.next()
        });
        if (conf.circular || (self.onBeforeSeek(function(e, i) {
            setTimeout(function() {
                e.isDefaultPrevented() || (prev.toggleClass(conf.disabledClass, i <= 0),
                next.toggleClass(conf.disabledClass, i >= self.getSize() - 1))
            }, 1)
        }),
        conf.initialIndex || prev.addClass(conf.disabledClass)),
        self.getSize() < 2 && prev.add(next).addClass(conf.disabledClass),
        conf.mousewheel && $.fn.mousewheel && root.mousewheel(function(e, delta) {
            if (conf.mousewheel)
                return self.move(delta < 0 ? 1 : -1, conf.wheelSpeed || 50),
                !1
        }),
        conf.touch) {
            var touch = {};
            itemWrap[0].ontouchstart = function(e) {
                var t = e.touches[0];
                touch.x = t.clientX,
                touch.y = t.clientY
            }
            ,
            itemWrap[0].ontouchmove = function(e) {
                if (1 == e.touches.length && !itemWrap.is(":animated")) {
                    var t = e.touches[0]
                      , deltaX = touch.x - t.clientX
                      , deltaY = touch.y - t.clientY;
                    self[vertical && deltaY > 0 || !vertical && deltaX > 0 ? "next" : "prev"](),
                    e.preventDefault()
                }
            }
        }
        conf.keyboard && $(document).on("keydown.scrollable", function(evt) {
            if (!(!conf.keyboard || evt.altKey || evt.ctrlKey || evt.metaKey || $(evt.target).is(":input") || "static" != conf.keyboard && current != self)) {
                var key = evt.keyCode;
                return !vertical || 38 != key && 40 != key ? vertical || 37 != key && 39 != key ? void 0 : (self.move(37 == key ? -1 : 1),
                evt.preventDefault()) : (self.move(38 == key ? -1 : 1),
                evt.preventDefault())
            }
        }),
        conf.initialIndex && self.seekTo(conf.initialIndex, 0, function() {})
    }
    $.tools = $.tools || {
        version: "@VERSION"
    },
    $.tools.scrollable = {
        conf: {
            activeClass: "active",
            circular: !1,
            clonedClass: "cloned",
            disabledClass: "disabled",
            easing: "swing",
            initialIndex: 0,
            item: "> *",
            items: ".items",
            keyboard: !0,
            mousewheel: !1,
            next: ".next",
            prev: ".prev",
            size: 1,
            speed: 400,
            vertical: !1,
            touch: !0,
            wheelSpeed: 0
        }
    };
    var current;
    $.fn.scrollable = function(conf) {
        var el = this.data("scrollable");
        return el ? el : (conf = $.extend({}, $.tools.scrollable.conf, conf),
        this.each(function() {
            el = new Scrollable($(this),conf),
            $(this).data("scrollable", el)
        }),
        conf.api ? el : this)
    }
}(jQuery),
function($) {
    function Tabs(root, paneSelector, conf) {
        var current, self = this, trigger = root.add(this), tabs = root.find(conf.tabs), panes = paneSelector.jquery ? paneSelector : root.children(paneSelector);
        tabs.length || (tabs = root.children()),
        panes.length || (panes = root.parent().find(paneSelector)),
        panes.length || (panes = $(paneSelector)),
        $.extend(this, {
            click: function(i, e) {
                var tab = tabs.eq(i)
                  , firstRender = !root.data("tabs");
                if ("string" == typeof i && i.replace("#", "") && (tab = tabs.filter('[href*="' + i.replace("#", "") + '"]'),
                i = Math.max(tabs.index(tab), 0)),
                conf.rotate) {
                    var last = tabs.length - 1;
                    if (i < 0)
                        return self.click(last, e);
                    if (i > last)
                        return self.click(0, e)
                }
                if (!tab.length) {
                    if (current >= 0)
                        return self;
                    i = conf.initialIndex,
                    tab = tabs.eq(i)
                }
                if (i === current)
                    return self;
                if (e = e || $.Event(),
                e.type = "onBeforeClick",
                trigger.trigger(e, [i]),
                !e.isDefaultPrevented()) {
                    var effect = firstRender ? conf.initialEffect && conf.effect || "default" : conf.effect;
                    return effects[effect].call(self, i, function() {
                        current = i,
                        e.type = "onClick",
                        trigger.trigger(e, [i])
                    }),
                    tabs.removeClass(conf.current),
                    tab.addClass(conf.current),
                    self
                }
            },
            getConf: function() {
                return conf
            },
            getTabs: function() {
                return tabs
            },
            getPanes: function() {
                return panes
            },
            getCurrentPane: function() {
                return panes.eq(current)
            },
            getCurrentTab: function() {
                return tabs.eq(current)
            },
            getIndex: function() {
                return current
            },
            next: function() {
                return self.click(current + 1)
            },
            prev: function() {
                return self.click(current - 1)
            },
            destroy: function() {
                return tabs.off(conf.event).removeClass(conf.current),
                panes.find('a[href^="#"]').off("click.T"),
                self
            }
        }),
        $.each("onBeforeClick,onClick".split(","), function(i, name) {
            $.isFunction(conf[name]) && $(self).on(name, conf[name]),
            self[name] = function(fn) {
                return fn && $(self).on(name, fn),
                self
            }
        }),
        conf.history && $.fn.history && ($.tools.history.init(tabs),
        conf.event = "history"),
        tabs.each(function(i) {
            $(this).on(conf.event, function(e) {
                return self.click(i, e),
                e.preventDefault()
            })
        }),
        panes.find('a[href^="#"]').on("click.T", function(e) {
            self.click($(this).attr("href"), e)
        }),
        location.hash && "a" == conf.tabs && root.find('[href="' + location.hash + '"]').length ? self.click(location.hash) : (0 === conf.initialIndex || conf.initialIndex > 0) && self.click(conf.initialIndex)
    }
    $.tools = $.tools || {
        version: "@VERSION"
    },
    $.tools.tabs = {
        conf: {
            tabs: "a",
            current: "current",
            onBeforeClick: null,
            onClick: null,
            effect: "default",
            initialEffect: !1,
            initialIndex: 0,
            event: "click",
            rotate: !1,
            slideUpSpeed: 400,
            slideDownSpeed: 400,
            history: !1
        },
        addEffect: function(name, fn) {
            effects[name] = fn
        }
    };
    var animating, w, effects = {
        default: function(i, done) {
            this.getPanes().hide().eq(i).show(),
            done.call()
        },
        fade: function(i, done) {
            var conf = this.getConf()
              , speed = conf.fadeOutSpeed
              , panes = this.getPanes();
            speed ? panes.fadeOut(speed) : panes.hide(),
            panes.eq(i).fadeIn(conf.fadeInSpeed, done)
        },
        slide: function(i, done) {
            var conf = this.getConf();
            this.getPanes().slideUp(conf.slideUpSpeed),
            this.getPanes().eq(i).slideDown(conf.slideDownSpeed, done)
        },
        ajax: function(i, done) {
            this.getPanes().eq(0).load(this.getTabs().eq(i).attr("href"), done)
        }
    };
    $.tools.tabs.addEffect("horizontal", function(i, done) {
        if (!animating) {
            var nextPane = this.getPanes().eq(i)
              , currentPane = this.getCurrentPane();
            w || (w = this.getPanes().eq(0).width()),
            animating = !0,
            nextPane.show(),
            currentPane.animate({
                width: 0
            }, {
                step: function(now) {
                    nextPane.css("width", w - now)
                },
                complete: function() {
                    $(this).hide(),
                    done.call(),
                    animating = !1
                }
            }),
            currentPane.length || (done.call(),
            animating = !1)
        }
    }),
    $.fn.tabs = function(paneSelector, conf) {
        var el = this.data("tabs");
        return el && (el.destroy(),
        this.removeData("tabs")),
        $.isFunction(conf) && (conf = {
            onBeforeClick: conf
        }),
        conf = $.extend({}, $.tools.tabs.conf, conf),
        this.each(function() {
            el = new Tabs($(this),paneSelector,conf),
            $(this).data("tabs", el)
        }),
        conf.api ? el : this
    }
}(jQuery),
function($) {
    function setIframeLocation(h) {
        if (h) {
            var doc = iframe.contentWindow.document;
            doc.open().close(),
            doc.location.hash = h
        }
    }
    var hash, iframe, links, inited;
    $.tools = $.tools || {
        version: "@VERSION"
    },
    $.tools.history = {
        init: function(els) {
            inited || ($.browser.msie && $.browser.version < "8" ? iframe || (iframe = $("<iframe/>").attr("src", "javascript:false;").hide().get(0),
            $("body").append(iframe),
            setInterval(function() {
                var idoc = iframe.contentWindow.document
                  , h = idoc.location.hash;
                hash !== h && $(window).trigger("hash", h)
            }, 100),
            setIframeLocation(location.hash || "#")) : setInterval(function() {
                var h = location.hash;
                h !== hash && $(window).trigger("hash", h)
            }, 100),
            links = links ? links.add(els) : els,
            els.click(function(e) {
                var href = $(this).attr("href");
                if (iframe && setIframeLocation(href),
                "#" != href.slice(0, 1))
                    return location.href = "#" + href,
                    e.preventDefault()
            }),
            inited = !0)
        }
    },
    $(window).on("hash", function(e, h) {
        h ? links.filter(function() {
            var href = $(this).attr("href");
            return href == h || href == h.replace("#", "")
        }).trigger("history", [h]) : links.eq(0).trigger("history", [h]),
        hash = h
    }),
    $.fn.history = function(fn) {
        return $.tools.history.init(this),
        this.on("history", fn)
    }
}(jQuery),
function($) {
    function viewport() {
        if (/msie/.test(navigator.userAgent.toLowerCase())) {
            var d = $(document).height()
              , w = $(window).height();
            return [window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, d - w < 20 ? w : d]
        }
        return [$(document).width(), $(document).height()]
    }
    function call(fn) {
        if (fn)
            return fn.call($.mask)
    }
    $.tools = $.tools || {
        version: "@VERSION"
    };
    var tool;
    tool = $.tools.expose = {
        conf: {
            maskId: "exposeMask",
            loadSpeed: "slow",
            closeSpeed: "fast",
            closeOnClick: !0,
            closeOnEsc: !0,
            zIndex: 9998,
            opacity: .8,
            startOpacity: 0,
            color: "#fff",
            onLoad: null,
            onClose: null
        }
    };
    var mask, exposed, loaded, config, overlayIndex;
    $.mask = {
        load: function(conf, els) {
            if (loaded)
                return this;
            "string" == typeof conf && (conf = {
                color: conf
            }),
            conf = conf || config,
            config = conf = $.extend($.extend({}, tool.conf), conf),
            mask = $("#" + conf.maskId),
            mask.length || (mask = $("<div/>").attr("id", conf.maskId),
            $("body").append(mask));
            var size = viewport();
            return mask.css({
                position: "absolute",
                top: 0,
                left: 0,
                width: size[0],
                height: size[1],
                display: "none",
                opacity: conf.startOpacity,
                zIndex: conf.zIndex
            }),
            conf.color && mask.css("backgroundColor", conf.color),
            call(conf.onBeforeLoad) === !1 ? this : (conf.closeOnEsc && $(document).on("keydown.mask", function(e) {
                27 == e.keyCode && $.mask.close(e)
            }),
            conf.closeOnClick && mask.on("click.mask", function(e) {
                $.mask.close(e)
            }),
            $(window).on("resize.mask", function() {
                $.mask.fit()
            }),
            els && els.length && (overlayIndex = els.eq(0).css("zIndex"),
            $.each(els, function() {
                var el = $(this);
                /relative|absolute|fixed/i.test(el.css("position")) || el.css("position", "relative")
            }),
            exposed = els.css({
                zIndex: Math.max(conf.zIndex + 1, "auto" == overlayIndex ? 0 : overlayIndex)
            })),
            mask.css({
                display: "block"
            }).fadeTo(conf.loadSpeed, conf.opacity, function() {
                $.mask.fit(),
                call(conf.onLoad),
                loaded = "full"
            }),
            loaded = !0,
            this)
        },
        close: function() {
            if (loaded) {
                if (call(config.onBeforeClose) === !1)
                    return this;
                mask.fadeOut(config.closeSpeed, function() {
                    exposed && exposed.css({
                        zIndex: overlayIndex
                    }),
                    loaded = !1,
                    call(config.onClose)
                }),
                $(document).off("keydown.mask"),
                mask.off("click.mask"),
                $(window).off("resize.mask")
            }
            return this
        },
        fit: function() {
            if (loaded) {
                var size = viewport();
                mask.css({
                    width: size[0],
                    height: size[1]
                })
            }
        },
        getMask: function() {
            return mask
        },
        isLoaded: function(fully) {
            return fully ? "full" == loaded : loaded
        },
        getConf: function() {
            return config
        },
        getExposed: function() {
            return exposed
        }
    },
    $.fn.mask = function(conf) {
        return $.mask.load(conf),
        this
    }
    ,
    $.fn.expose = function(conf) {
        return $.mask.load(conf, this),
        this
    }
}(jQuery);

/* - ++resource++plone.app.jquerytools.form.js - */
/*!
 * jQuery Form Plugin
 * version: 3.51.0-2014.06.20
 * Requires jQuery v1.5 or later
 * Copyright (c) 2014 M. Alsup
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Project repository: https://github.com/malsup/form
 * Dual licensed under the MIT and GPL licenses.
 * https://github.com/malsup/form#copyright-and-license
 */
/*global ActiveXObject */

// AMD support
(function(factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        // using AMD; register as anon module
        define(['jquery'], factory);
    } else {
        // no AMD; invoke directly
        factory((typeof (jQuery) != 'undefined') ? jQuery : window.Zepto);
    }
}
(function($) {
    "use strict";

    /*
    Usage Note:
    -----------
    Do not use both ajaxSubmit and ajaxForm on the same form.  These
    functions are mutually exclusive.  Use ajaxSubmit if you want
    to bind your own submit handler to the form.  For example,

    $(document).ready(function() {
        $('#myForm').on('submit', function(e) {
            e.preventDefault(); // <-- important
            $(this).ajaxSubmit({
                target: '#output'
            });
        });
    });

    Use ajaxForm when you want the plugin to manage all the event binding
    for you.  For example,

    $(document).ready(function() {
        $('#myForm').ajaxForm({
            target: '#output'
        });
    });

    You can also use ajaxForm with delegation (requires jQuery v1.7+), so the
    form does not have to exist when you invoke ajaxForm:

    $('#myForm').ajaxForm({
        delegation: true,
        target: '#output'
    });

    When using ajaxForm, the ajaxSubmit function will be invoked for you
    at the appropriate time.
*/

    /**
 * Feature detection
 */
    var feature = {};
    feature.fileapi = $("<input type='file'/>").get(0).files !== undefined;
    feature.formdata = window.FormData !== undefined;

    var hasProp = !!$.fn.prop;

    // attr2 uses prop when it can but checks the return type for
    // an expected string.  this accounts for the case where a form 
    // contains inputs with names like "action" or "method"; in those
    // cases "prop" returns the element
    $.fn.attr2 = function() {
        if (!hasProp) {
            return this.attr.apply(this, arguments);
        }
        var val = this.prop.apply(this, arguments);
        if ((val && val.jquery) || typeof val === 'string') {
            return val;
        }
        return this.attr.apply(this, arguments);
    }
    ;

    /**
 * ajaxSubmit() provides a mechanism for immediately submitting
 * an HTML form using AJAX.
 */
    $.fn.ajaxSubmit = function(options) {
        /*jshint scripturl:true */

        // fast fail if nothing selected (http://dev.jquery.com/ticket/2752)
        if (!this.length) {
            log('ajaxSubmit: skipping submit process - no element selected');
            return this;
        }

        var method, action, url, $form = this;

        if (typeof options == 'function') {
            options = {
                success: options
            };
        } else if (options === undefined) {
            options = {};
        }

        method = options.type || this.attr2('method');
        action = options.url || this.attr2('action');

        url = (typeof action === 'string') ? $.trim(action) : '';
        url = url || window.location.href || '';
        if (url) {
            // clean url (don't include hash vaue)
            url = (url.match(/^([^#]+)/) || [])[1];
        }

        options = $.extend(true, {
            url: url,
            success: $.ajaxSettings.success,
            type: method || $.ajaxSettings.type,
            iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank'
        }, options);

        // hook for manipulating the form data before it is extracted;
        // convenient for use with rich editors like tinyMCE or FCKEditor
        var veto = {};
        this.trigger('form-pre-serialize', [this, options, veto]);
        if (veto.veto) {
            log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');
            return this;
        }

        // provide opportunity to alter form data before it is serialized
        if (options.beforeSerialize && options.beforeSerialize(this, options) === false) {
            log('ajaxSubmit: submit aborted via beforeSerialize callback');
            return this;
        }

        var traditional = options.traditional;
        if (traditional === undefined) {
            traditional = $.ajaxSettings.traditional;
        }

        var elements = [];
        var qx, a = this.formToArray(options.semantic, elements);
        if (options.data) {
            options.extraData = options.data;
            qx = $.param(options.data, traditional);
        }

        // give pre-submit callback an opportunity to abort the submit
        if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
            log('ajaxSubmit: submit aborted via beforeSubmit callback');
            return this;
        }

        // fire vetoable 'validate' event
        this.trigger('form-submit-validate', [a, this, options, veto]);
        if (veto.veto) {
            log('ajaxSubmit: submit vetoed via form-submit-validate trigger');
            return this;
        }

        var q = $.param(a, traditional);
        if (qx) {
            q = (q ? (q + '&' + qx) : qx);
        }
        if (options.type.toUpperCase() == 'GET') {
            options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
            options.data = null;
            // data is null for 'get'
        } else {
            options.data = q;
            // data is the query string for 'post'
        }

        var callbacks = [];
        if (options.resetForm) {
            callbacks.push(function() {
                $form.resetForm();
            });
        }
        if (options.clearForm) {
            callbacks.push(function() {
                $form.clearForm(options.includeHidden);
            });
        }

        // perform a load on the target only if dataType is not provided
        if (!options.dataType && options.target) {
            var oldSuccess = options.success || function() {}
            ;
            callbacks.push(function(data) {
                var fn = options.replaceTarget ? 'replaceWith' : 'html';
                $(options.target)[fn](data).each(oldSuccess, arguments);
            });
        } else if (options.success) {
            callbacks.push(options.success);
        }

        options.success = function(data, status, xhr) {
            // jQuery 1.4+ passes xhr as 3rd arg
            var context = options.context || this;
            // jQuery 1.4+ supports scope context
            for (var i = 0, max = callbacks.length; i < max; i++) {
                callbacks[i].apply(context, [data, status, xhr || $form, $form]);
            }
        }
        ;

        if (options.error) {
            var oldError = options.error;
            options.error = function(xhr, status, error) {
                var context = options.context || this;
                oldError.apply(context, [xhr, status, error, $form]);
            }
            ;
        }

        if (options.complete) {
            var oldComplete = options.complete;
            options.complete = function(xhr, status) {
                var context = options.context || this;
                oldComplete.apply(context, [xhr, status, $form]);
            }
            ;
        }

        // are there files to upload?

        // [value] (issue #113), also see comment:
        // https://github.com/malsup/form/commit/588306aedba1de01388032d5f42a60159eea9228#commitcomment-2180219
        var fileInputs = $('input[type=file]:enabled', this).filter(function() {
            return $(this).val() !== '';
        });

        var hasFileInputs = fileInputs.length > 0;
        var mp = 'multipart/form-data';
        var multipart = ($form.attr('enctype') == mp || $form.attr('encoding') == mp);

        var fileAPI = feature.fileapi && feature.formdata;
        log("fileAPI :" + fileAPI);
        var shouldUseFrame = (hasFileInputs || multipart) && !fileAPI;

        var jqxhr;

        // options.iframe allows user to force iframe mode
        // 06-NOV-09: now defaulting to iframe mode if file input is detected
        if (options.iframe !== false && (options.iframe || shouldUseFrame)) {
            // hack to fix Safari hang (thanks to Tim Molendijk for this)
            // see:  http://groups.google.com/group/jquery-dev/browse_thread/thread/36395b7ab510dd5d
            if (options.closeKeepAlive) {
                $.get(options.closeKeepAlive, function() {
                    jqxhr = fileUploadIframe(a);
                });
            } else {
                jqxhr = fileUploadIframe(a);
            }
        } else if ((hasFileInputs || multipart) && fileAPI) {
            jqxhr = fileUploadXhr(a);
        } else {
            jqxhr = $.ajax(options);
        }

        $form.removeData('jqxhr').data('jqxhr', jqxhr);

        // clear element array
        for (var k = 0; k < elements.length; k++) {
            elements[k] = null;
        }

        // fire 'notify' event
        this.trigger('form-submit-notify', [this, options]);
        return this;

        // utility fn for deep serialization
        function deepSerialize(extraData) {
            var serialized = $.param(extraData, options.traditional).split('&');
            var len = serialized.length;
            var result = [];
            var i, part;
            for (i = 0; i < len; i++) {
                // #252; undo param space replacement
                serialized[i] = serialized[i].replace(/\+/g, ' ');
                part = serialized[i].split('=');
                // #278; use array instead of object storage, favoring array serializations
                result.push([decodeURIComponent(part[0]), decodeURIComponent(part[1])]);
            }
            return result;
        }

        // XMLHttpRequest Level 2 file uploads (big hat tip to francois2metz)
        function fileUploadXhr(a) {
            var formdata = new FormData();

            for (var i = 0; i < a.length; i++) {
                formdata.append(a[i].name, a[i].value);
            }

            if (options.extraData) {
                var serializedData = deepSerialize(options.extraData);
                for (i = 0; i < serializedData.length; i++) {
                    if (serializedData[i]) {
                        formdata.append(serializedData[i][0], serializedData[i][1]);
                    }
                }
            }

            options.data = null;

            var s = $.extend(true, {}, $.ajaxSettings, options, {
                contentType: false,
                processData: false,
                cache: false,
                type: method || 'POST'
            });

            if (options.uploadProgress) {
                // workaround because jqXHR does not expose upload property
                s.xhr = function() {
                    var xhr = $.ajaxSettings.xhr();
                    if (xhr.upload) {
                        xhr.upload.addEventListener('progress', function(event) {
                            var percent = 0;
                            var position = event.loaded || event.position;
                            /*event.position is deprecated*/
                            var total = event.total;
                            if (event.lengthComputable) {
                                percent = Math.ceil(position / total * 100);
                            }
                            options.uploadProgress(event, position, total, percent);
                        }, false);
                    }
                    return xhr;
                }
                ;
            }

            s.data = null;
            var beforeSend = s.beforeSend;
            s.beforeSend = function(xhr, o) {
                //Send FormData() provided by user
                if (options.formData) {
                    o.data = options.formData;
                } else {
                    o.data = formdata;
                }
                if (beforeSend) {
                    beforeSend.call(this, xhr, o);
                }
            }
            ;
            return $.ajax(s);
        }

        // private function for handling file uploads (hat tip to YAHOO!)
        function fileUploadIframe(a) {
            var form = $form[0], el, i, s, g, id, $io, io, xhr, sub, n, timedOut, timeoutHandle;
            var deferred = $.Deferred();

            // #341
            deferred.abort = function(status) {
                xhr.abort(status);
            }
            ;

            if (a) {
                // ensure that every serialized input is still enabled
                for (i = 0; i < elements.length; i++) {
                    el = $(elements[i]);
                    if (hasProp) {
                        el.prop('disabled', false);
                    } else {
                        el.removeAttr('disabled');
                    }
                }
            }

            s = $.extend(true, {}, $.ajaxSettings, options);
            s.context = s.context || s;
            id = 'jqFormIO' + (new Date().getTime());
            if (s.iframeTarget) {
                $io = $(s.iframeTarget);
                n = $io.attr2('name');
                if (!n) {
                    $io.attr2('name', id);
                } else {
                    id = n;
                }
            } else {
                $io = $('<iframe name="' + id + '" src="' + s.iframeSrc + '" />');
                $io.css({
                    position: 'absolute',
                    top: '-1000px',
                    left: '-1000px'
                });
            }
            io = $io[0];

            xhr = {
                // mock object
                aborted: 0,
                responseText: null,
                responseXML: null,
                status: 0,
                statusText: 'n/a',
                getAllResponseHeaders: function() {},
                getResponseHeader: function() {},
                setRequestHeader: function() {},
                abort: function(status) {
                    var e = (status === 'timeout' ? 'timeout' : 'aborted');
                    log('aborting upload... ' + e);
                    this.aborted = 1;

                    try {
                        // #214, #257
                        if (io.contentWindow.document.execCommand) {
                            io.contentWindow.document.execCommand('Stop');
                        }
                    } catch (ignore) {}

                    $io.attr('src', s.iframeSrc);
                    // abort op in progress
                    xhr.error = e;
                    if (s.error) {
                        s.error.call(s.context, xhr, e, status);
                    }
                    if (g) {
                        $.event.trigger("ajaxError", [xhr, s, e]);
                    }
                    if (s.complete) {
                        s.complete.call(s.context, xhr, e);
                    }
                }
            };

            g = s.global;
            // trigger ajax global events so that activity/block indicators work like normal
            if (g && 0 === $.active++) {
                $.event.trigger("ajaxStart");
            }
            if (g) {
                $.event.trigger("ajaxSend", [xhr, s]);
            }

            if (s.beforeSend && s.beforeSend.call(s.context, xhr, s) === false) {
                if (s.global) {
                    $.active--;
                }
                deferred.reject();
                return deferred;
            }
            if (xhr.aborted) {
                deferred.reject();
                return deferred;
            }

            // add submitting element to data if we know it
            sub = form.clk;
            if (sub) {
                n = sub.name;
                if (n && !sub.disabled) {
                    s.extraData = s.extraData || {};
                    s.extraData[n] = sub.value;
                    if (sub.type == "image") {
                        s.extraData[n + '.x'] = form.clk_x;
                        s.extraData[n + '.y'] = form.clk_y;
                    }
                }
            }

            var CLIENT_TIMEOUT_ABORT = 1;
            var SERVER_ABORT = 2;

            function getDoc(frame) {
                /* it looks like contentWindow or contentDocument do not
             * carry the protocol property in ie8, when running under ssl
             * frame.document is the only valid response document, since
             * the protocol is know but not on the other two objects. strange?
             * "Same origin policy" http://en.wikipedia.org/wiki/Same_origin_policy
             */

                var doc = null;

                // IE8 cascading access check
                try {
                    if (frame.contentWindow) {
                        doc = frame.contentWindow.document;
                    }
                } catch (err) {
                    // IE8 access denied under ssl & missing protocol
                    log('cannot get iframe.contentWindow document: ' + err);
                }

                if (doc) {
                    // successful getting content
                    return doc;
                }

                try {
                    // simply checking may throw in ie8 under ssl or mismatched protocol
                    doc = frame.contentDocument ? frame.contentDocument : frame.document;
                } catch (err) {
                    // last attempt
                    log('cannot get iframe.contentDocument: ' + err);
                    doc = frame.document;
                }
                return doc;
            }

            // Rails CSRF hack (thanks to Yvan Barthelemy)
            var csrf_token = $('meta[name=csrf-token]').attr('content');
            var csrf_param = $('meta[name=csrf-param]').attr('content');
            if (csrf_param && csrf_token) {
                s.extraData = s.extraData || {};
                s.extraData[csrf_param] = csrf_token;
            }

            // take a breath so that pending repaints get some cpu time before the upload starts
            function doSubmit() {
                // make sure form attrs are set
                var t = $form.attr2('target')
                  , a = $form.attr2('action')
                  , mp = 'multipart/form-data'
                  , et = $form.attr('enctype') || $form.attr('encoding') || mp;

                // update form attrs in IE friendly way
                form.setAttribute('target', id);
                if (!method || /post/i.test(method)) {
                    form.setAttribute('method', 'POST');
                }
                if (a != s.url) {
                    form.setAttribute('action', s.url);
                }

                // ie borks in some cases when setting encoding
                if (!s.skipEncodingOverride && (!method || /post/i.test(method))) {
                    $form.attr({
                        encoding: 'multipart/form-data',
                        enctype: 'multipart/form-data'
                    });
                }

                // support timout
                if (s.timeout) {
                    timeoutHandle = setTimeout(function() {
                        timedOut = true;
                        cb(CLIENT_TIMEOUT_ABORT);
                    }, s.timeout);
                }

                // look for server aborts
                function checkState() {
                    try {
                        var state = getDoc(io).readyState;
                        log('state = ' + state);
                        if (state && state.toLowerCase() == 'uninitialized') {
                            setTimeout(checkState, 50);
                        }
                    } catch (e) {
                        log('Server abort: ', e, ' (', e.name, ')');
                        cb(SERVER_ABORT);
                        if (timeoutHandle) {
                            clearTimeout(timeoutHandle);
                        }
                        timeoutHandle = undefined;
                    }
                }

                // add "extra" data to form if provided in options
                var extraInputs = [];
                try {
                    if (s.extraData) {
                        for (var n in s.extraData) {
                            if (s.extraData.hasOwnProperty(n)) {
                                // if using the $.param format that allows for multiple values with the same name
                                if ($.isPlainObject(s.extraData[n]) && s.extraData[n].hasOwnProperty('name') && s.extraData[n].hasOwnProperty('value')) {
                                    extraInputs.push($('<input type="hidden" name="' + s.extraData[n].name + '">').val(s.extraData[n].value).appendTo(form)[0]);
                                } else {
                                    extraInputs.push($('<input type="hidden" name="' + n + '">').val(s.extraData[n]).appendTo(form)[0]);
                                }
                            }
                        }
                    }

                    if (!s.iframeTarget) {
                        // add iframe to doc and submit the form
                        $io.appendTo('body');
                    }
                    if (io.attachEvent) {
                        io.attachEvent('onload', cb);
                    } else {
                        io.addEventListener('load', cb, false);
                    }
                    setTimeout(checkState, 15);

                    try {
                        form.submit();
                    } catch (err) {
                        // just in case form has element with name/id of 'submit'
                        var submitFn = document.createElement('form').submit;
                        submitFn.apply(form);
                    }
                } finally {
                    // reset attrs and remove "extra" input elements
                    form.setAttribute('action', a);
                    form.setAttribute('enctype', et);
                    // #380
                    if (t) {
                        form.setAttribute('target', t);
                    } else {
                        $form.removeAttr('target');
                    }
                    $(extraInputs).remove();
                }
            }

            if (s.forceSync) {
                doSubmit();
            } else {
                setTimeout(doSubmit, 10);
                // this lets dom updates render
            }

            var data, doc, domCheckCount = 50, callbackProcessed;

            function cb(e) {
                if (xhr.aborted || callbackProcessed) {
                    return;
                }

                doc = getDoc(io);
                if (!doc) {
                    log('cannot access response document');
                    e = SERVER_ABORT;
                }
                if (e === CLIENT_TIMEOUT_ABORT && xhr) {
                    xhr.abort('timeout');
                    deferred.reject(xhr, 'timeout');
                    return;
                } else if (e == SERVER_ABORT && xhr) {
                    xhr.abort('server abort');
                    deferred.reject(xhr, 'error', 'server abort');
                    return;
                }

                if (!doc || doc.location.href == s.iframeSrc) {
                    // response not received yet
                    if (!timedOut) {
                        return;
                    }
                }
                if (io.detachEvent) {
                    io.detachEvent('onload', cb);
                } else {
                    io.removeEventListener('load', cb, false);
                }

                var status = 'success', errMsg;
                try {
                    if (timedOut) {
                        throw 'timeout';
                    }

                    var isXml = s.dataType == 'xml' || doc.XMLDocument || $.isXMLDoc(doc);
                    log('isXml=' + isXml);
                    if (!isXml && window.opera && (doc.body === null || !doc.body.innerHTML)) {
                        if (--domCheckCount) {
                            // in some browsers (Opera) the iframe DOM is not always traversable when
                            // the onload callback fires, so we loop a bit to accommodate
                            log('requeing onLoad callback, DOM not available');
                            setTimeout(cb, 250);
                            return;
                        }
                        // let this fall through because server response could be an empty document
                        //log('Could not access iframe DOM after mutiple tries.');
                        //throw 'DOMException: not available';
                    }

                    //log('response detected');
                    var docRoot = doc.body ? doc.body : doc.documentElement;
                    xhr.responseText = docRoot ? docRoot.innerHTML : null;
                    xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
                    if (isXml) {
                        s.dataType = 'xml';
                    }
                    xhr.getResponseHeader = function(header) {
                        var headers = {
                            'content-type': s.dataType
                        };
                        return headers[header.toLowerCase()];
                    }
                    ;
                    // support for XHR 'status' & 'statusText' emulation :
                    if (docRoot) {
                        xhr.status = Number(docRoot.getAttribute('status')) || xhr.status;
                        xhr.statusText = docRoot.getAttribute('statusText') || xhr.statusText;
                    }

                    var dt = (s.dataType || '').toLowerCase();
                    var scr = /(json|script|text)/.test(dt);
                    if (scr || s.textarea) {
                        // see if user embedded response in textarea
                        var ta = doc.getElementsByTagName('textarea')[0];
                        if (ta) {
                            xhr.responseText = ta.value;
                            // support for XHR 'status' & 'statusText' emulation :
                            xhr.status = Number(ta.getAttribute('status')) || xhr.status;
                            xhr.statusText = ta.getAttribute('statusText') || xhr.statusText;
                        } else if (scr) {
                            // account for browsers injecting pre around json response
                            var pre = doc.getElementsByTagName('pre')[0];
                            var b = doc.getElementsByTagName('body')[0];
                            if (pre) {
                                xhr.responseText = pre.textContent ? pre.textContent : pre.innerText;
                            } else if (b) {
                                xhr.responseText = b.textContent ? b.textContent : b.innerText;
                            }
                        }
                    } else if (dt == 'xml' && !xhr.responseXML && xhr.responseText) {
                        xhr.responseXML = toXml(xhr.responseText);
                    }

                    try {
                        data = httpData(xhr, dt, s);
                    } catch (err) {
                        status = 'parsererror';
                        xhr.error = errMsg = (err || status);
                    }
                } catch (err) {
                    log('error caught: ', err);
                    status = 'error';
                    xhr.error = errMsg = (err || status);
                }

                if (xhr.aborted) {
                    log('upload aborted');
                    status = null;
                }

                if (xhr.status) {
                    // we've set xhr.status
                    status = (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) ? 'success' : 'error';
                }

                // ordering of these callbacks/triggers is odd, but that's how $.ajax does it
                if (status === 'success') {
                    if (s.success) {
                        s.success.call(s.context, data, 'success', xhr);
                    }
                    deferred.resolve(xhr.responseText, 'success', xhr);
                    if (g) {
                        $.event.trigger("ajaxSuccess", [xhr, s]);
                    }
                } else if (status) {
                    if (errMsg === undefined) {
                        errMsg = xhr.statusText;
                    }
                    if (s.error) {
                        s.error.call(s.context, xhr, status, errMsg);
                    }
                    deferred.reject(xhr, 'error', errMsg);
                    if (g) {
                        $.event.trigger("ajaxError", [xhr, s, errMsg]);
                    }
                }

                if (g) {
                    $.event.trigger("ajaxComplete", [xhr, s]);
                }

                if (g && !--$.active) {
                    $.event.trigger("ajaxStop");
                }

                if (s.complete) {
                    s.complete.call(s.context, xhr, status);
                }

                callbackProcessed = true;
                if (s.timeout) {
                    clearTimeout(timeoutHandle);
                }

                // clean up
                setTimeout(function() {
                    if (!s.iframeTarget) {
                        $io.remove();
                    } else {
                        //adding else to clean up existing iframe response.
                        $io.attr('src', s.iframeSrc);
                    }
                    xhr.responseXML = null;
                }, 100);
            }

            var toXml = $.parseXML || function(s, doc) {
                // use parseXML if available (jQuery 1.5+)
                if (window.ActiveXObject) {
                    doc = new ActiveXObject('Microsoft.XMLDOM');
                    doc.async = 'false';
                    doc.loadXML(s);
                } else {
                    doc = (new DOMParser()).parseFromString(s, 'text/xml');
                }
                return (doc && doc.documentElement && doc.documentElement.nodeName != 'parsererror') ? doc : null;
            }
            ;
            var parseJSON = $.parseJSON || function(s) {
                /*jslint evil:true */
                return window['eval']('(' + s + ')');
            }
            ;

            var httpData = function(xhr, type, s) {
                // mostly lifted from jq1.4.4

                var ct = xhr.getResponseHeader('content-type') || ''
                  , xml = type === 'xml' || !type && ct.indexOf('xml') >= 0
                  , data = xml ? xhr.responseXML : xhr.responseText;

                if (xml && data.documentElement.nodeName === 'parsererror') {
                    if ($.error) {
                        $.error('parsererror');
                    }
                }
                if (s && s.dataFilter) {
                    data = s.dataFilter(data, type);
                }
                if (typeof data === 'string') {
                    if (type === 'json' || !type && ct.indexOf('json') >= 0) {
                        data = parseJSON(data);
                    } else if (type === "script" || !type && ct.indexOf("javascript") >= 0) {
                        $.globalEval(data);
                    }
                }
                return data;
            };

            return deferred;
        }
    }
    ;

    /**
 * ajaxForm() provides a mechanism for fully automating form submission.
 *
 * The advantages of using this method instead of ajaxSubmit() are:
 *
 * 1: This method will include coordinates for <input type="image" /> elements (if the element
 *    is used to submit the form).
 * 2. This method will include the submit element's name/value data (for the element that was
 *    used to submit the form).
 * 3. This method binds the submit() method to the form for you.
 *
 * The options argument for ajaxForm works exactly as it does for ajaxSubmit.  ajaxForm merely
 * passes the options argument along after properly binding events for submit elements and
 * the form itself.
 */
    $.fn.ajaxForm = function(options) {
        options = options || {};
        options.delegation = options.delegation && $.isFunction($.fn.on);

        // in jQuery 1.3+ we can fix mistakes with the ready state
        if (!options.delegation && this.length === 0) {
            var o = {
                s: this.selector,
                c: this.context
            };
            if (!$.isReady && o.s) {
                log('DOM not ready, queuing ajaxForm');
                $(function() {
                    $(o.s, o.c).ajaxForm(options);
                });
                return this;
            }
            // is your DOM ready?  http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
            log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
            return this;
        }

        if (options.delegation) {
            $(document).off('submit.form-plugin', this.selector, doAjaxSubmit).off('click.form-plugin', this.selector, captureSubmittingElement).on('submit.form-plugin', this.selector, options, doAjaxSubmit).on('click.form-plugin', this.selector, options, captureSubmittingElement);
            return this;
        }

        return this.ajaxFormUnbind().bind('submit.form-plugin', options, doAjaxSubmit).bind('click.form-plugin', options, captureSubmittingElement);
    }
    ;

    // private event handlers
    function doAjaxSubmit(e) {
        /*jshint validthis:true */
        var options = e.data;
        if (!e.isDefaultPrevented()) {
            // if event has been canceled, don't proceed
            e.preventDefault();
            $(e.target).ajaxSubmit(options);
            // #365
        }
    }

    function captureSubmittingElement(e) {
        /*jshint validthis:true */
        var target = e.target;
        var $el = $(target);
        if (!($el.is("[type=submit],[type=image]"))) {
            // is this a child element of the submit el?  (ex: a span within a button)
            var t = $el.closest('[type=submit]');
            if (t.length === 0) {
                return;
            }
            target = t[0];
        }
        var form = this;
        form.clk = target;
        if (target.type == 'image') {
            if (e.offsetX !== undefined) {
                form.clk_x = e.offsetX;
                form.clk_y = e.offsetY;
            } else if (typeof $.fn.offset == 'function') {
                var offset = $el.offset();
                form.clk_x = e.pageX - offset.left;
                form.clk_y = e.pageY - offset.top;
            } else {
                form.clk_x = e.pageX - target.offsetLeft;
                form.clk_y = e.pageY - target.offsetTop;
            }
        }
        // clear form vars
        setTimeout(function() {
            form.clk = form.clk_x = form.clk_y = null;
        }, 100);
    }

    // ajaxFormUnbind unbinds the event handlers that were bound by ajaxForm
    $.fn.ajaxFormUnbind = function() {
        return this.unbind('submit.form-plugin click.form-plugin');
    }
    ;

    /**
 * formToArray() gathers form element data into an array of objects that can
 * be passed to any of the following ajax functions: $.get, $.post, or load.
 * Each object in the array has both a 'name' and 'value' property.  An example of
 * an array for a simple login form might be:
 *
 * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
 *
 * It is this array that is passed to pre-submit callback functions provided to the
 * ajaxSubmit() and ajaxForm() methods.
 */
    $.fn.formToArray = function(semantic, elements) {
        var a = [];
        if (this.length === 0) {
            return a;
        }

        var form = this[0];
        var formId = this.attr('id');
        var els = semantic ? form.getElementsByTagName('*') : form.elements;
        var els2;

        if (els && !/MSIE [678]/.test(navigator.userAgent)) {
            // #390
            els = $(els).get();
            // convert to standard array
        }

        // #386; account for inputs outside the form which use the 'form' attribute
        if (formId) {
            els2 = $(':input[form="' + formId + '"]').get();
            // hat tip @thet
            if (els2.length) {
                els = (els || []).concat(els2);
            }
        }

        if (!els || !els.length) {
            return a;
        }

        var i, j, n, v, el, max, jmax;
        for (i = 0,
        max = els.length; i < max; i++) {
            el = els[i];
            n = el.name;
            if (!n || el.disabled) {
                continue;
            }

            if (semantic && form.clk && el.type == "image") {
                // handle image inputs on the fly when semantic == true
                if (form.clk == el) {
                    a.push({
                        name: n,
                        value: $(el).val(),
                        type: el.type
                    });
                    a.push({
                        name: n + '.x',
                        value: form.clk_x
                    }, {
                        name: n + '.y',
                        value: form.clk_y
                    });
                }
                continue;
            }

            v = $.fieldValue(el, true);
            if (v && v.constructor == Array) {
                if (elements) {
                    elements.push(el);
                }
                for (j = 0,
                jmax = v.length; j < jmax; j++) {
                    a.push({
                        name: n,
                        value: v[j]
                    });
                }
            } else if (feature.fileapi && el.type == 'file') {
                if (elements) {
                    elements.push(el);
                }
                var files = el.files;
                if (files.length) {
                    for (j = 0; j < files.length; j++) {
                        a.push({
                            name: n,
                            value: files[j],
                            type: el.type
                        });
                    }
                } else {
                    // #180
                    a.push({
                        name: n,
                        value: '',
                        type: el.type
                    });
                }
            } else if (v !== null && typeof v != 'undefined') {
                if (elements) {
                    elements.push(el);
                }
                a.push({
                    name: n,
                    value: v,
                    type: el.type,
                    required: el.required
                });
            }
        }

        if (!semantic && form.clk) {
            // input type=='image' are not found in elements array! handle it here
            var $input = $(form.clk)
              , input = $input[0];
            n = input.name;
            if (n && !input.disabled && input.type == 'image') {
                a.push({
                    name: n,
                    value: $input.val()
                });
                a.push({
                    name: n + '.x',
                    value: form.clk_x
                }, {
                    name: n + '.y',
                    value: form.clk_y
                });
            }
        }
        return a;
    }
    ;

    /**
 * Serializes form data into a 'submittable' string. This method will return a string
 * in the format: name1=value1&amp;name2=value2
 */
    $.fn.formSerialize = function(semantic) {
        //hand off to jQuery.param for proper encoding
        return $.param(this.formToArray(semantic));
    }
    ;

    /**
 * Serializes all field elements in the jQuery object into a query string.
 * This method will return a string in the format: name1=value1&amp;name2=value2
 */
    $.fn.fieldSerialize = function(successful) {
        var a = [];
        this.each(function() {
            var n = this.name;
            if (!n) {
                return;
            }
            var v = $.fieldValue(this, successful);
            if (v && v.constructor == Array) {
                for (var i = 0, max = v.length; i < max; i++) {
                    a.push({
                        name: n,
                        value: v[i]
                    });
                }
            } else if (v !== null && typeof v != 'undefined') {
                a.push({
                    name: this.name,
                    value: v
                });
            }
        });
        //hand off to jQuery.param for proper encoding
        return $.param(a);
    }
    ;

    /**
 * Returns the value(s) of the element in the matched set.  For example, consider the following form:
 *
 *  <form><fieldset>
 *      <input name="A" type="text" />
 *      <input name="A" type="text" />
 *      <input name="B" type="checkbox" value="B1" />
 *      <input name="B" type="checkbox" value="B2"/>
 *      <input name="C" type="radio" value="C1" />
 *      <input name="C" type="radio" value="C2" />
 *  </fieldset></form>
 *
 *  var v = $('input[type=text]').fieldValue();
 *  // if no values are entered into the text inputs
 *  v == ['','']
 *  // if values entered into the text inputs are 'foo' and 'bar'
 *  v == ['foo','bar']
 *
 *  var v = $('input[type=checkbox]').fieldValue();
 *  // if neither checkbox is checked
 *  v === undefined
 *  // if both checkboxes are checked
 *  v == ['B1', 'B2']
 *
 *  var v = $('input[type=radio]').fieldValue();
 *  // if neither radio is checked
 *  v === undefined
 *  // if first radio is checked
 *  v == ['C1']
 *
 * The successful argument controls whether or not the field element must be 'successful'
 * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
 * The default value of the successful argument is true.  If this value is false the value(s)
 * for each element is returned.
 *
 * Note: This method *always* returns an array.  If no valid value can be determined the
 *    array will be empty, otherwise it will contain one or more values.
 */
    $.fn.fieldValue = function(successful) {
        for (var val = [], i = 0, max = this.length; i < max; i++) {
            var el = this[i];
            var v = $.fieldValue(el, successful);
            if (v === null || typeof v == 'undefined' || (v.constructor == Array && !v.length)) {
                continue;
            }
            if (v.constructor == Array) {
                $.merge(val, v);
            } else {
                val.push(v);
            }
        }
        return val;
    }
    ;

    /**
 * Returns the value of the field element.
 */
    $.fieldValue = function(el, successful) {
        var n = el.name
          , t = el.type
          , tag = el.tagName.toLowerCase();
        if (successful === undefined) {
            successful = true;
        }

        if (successful && (!n || el.disabled || t == 'reset' || t == 'button' || (t == 'checkbox' || t == 'radio') && !el.checked || (t == 'submit' || t == 'image') && el.form && el.form.clk != el || tag == 'select' && el.selectedIndex == -1)) {
            return null;
        }

        if (tag == 'select') {
            var index = el.selectedIndex;
            if (index < 0) {
                return null;
            }
            var a = []
              , ops = el.options;
            var one = (t == 'select-one');
            var max = (one ? index + 1 : ops.length);
            for (var i = (one ? index : 0); i < max; i++) {
                var op = ops[i];
                if (op.selected) {
                    var v = op.value;
                    if (!v) {
                        // extra pain for IE...
                        v = (op.attributes && op.attributes.value && !(op.attributes.value.specified)) ? op.text : op.value;
                    }
                    if (one) {
                        return v;
                    }
                    a.push(v);
                }
            }
            return a;
        }
        return $(el).val();
    }
    ;

    /**
 * Clears the form data.  Takes the following actions on the form's input fields:
 *  - input text fields will have their 'value' property set to the empty string
 *  - select elements will have their 'selectedIndex' property set to -1
 *  - checkbox and radio inputs will have their 'checked' property set to false
 *  - inputs of type submit, button, reset, and hidden will *not* be effected
 *  - button elements will *not* be effected
 */
    $.fn.clearForm = function(includeHidden) {
        return this.each(function() {
            $('input,select,textarea', this).clearFields(includeHidden);
        });
    }
    ;

    /**
 * Clears the selected form elements.
 */
    $.fn.clearFields = $.fn.clearInputs = function(includeHidden) {
        var re = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
        // 'hidden' is not in this list
        return this.each(function() {
            var t = this.type
              , tag = this.tagName.toLowerCase();
            if (re.test(t) || tag == 'textarea') {
                this.value = '';
            } else if (t == 'checkbox' || t == 'radio') {
                this.checked = false;
            } else if (tag == 'select') {
                this.selectedIndex = -1;
            } else if (t == "file") {
                if (/MSIE/.test(navigator.userAgent)) {
                    $(this).replaceWith($(this).clone(true));
                } else {
                    $(this).val('');
                }
            } else if (includeHidden) {
                // includeHidden can be the value true, or it can be a selector string
                // indicating a special test; for example:
                //  $('#myForm').clearForm('.special:hidden')
                // the above would clean hidden inputs that have the class of 'special'
                if ((includeHidden === true && /hidden/.test(t)) || (typeof includeHidden == 'string' && $(this).is(includeHidden))) {
                    this.value = '';
                }
            }
        });
    }
    ;

    /**
 * Resets the form data.  Causes all form elements to be reset to their original value.
 */
    $.fn.resetForm = function() {
        return this.each(function() {
            // guard against an input with the name of 'reset'
            // note that IE reports the reset function as an 'object'
            if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType)) {
                this.reset();
            }
        });
    }
    ;

    /**
 * Enables or disables any matching elements.
 */
    $.fn.enable = function(b) {
        if (b === undefined) {
            b = true;
        }
        return this.each(function() {
            this.disabled = !b;
        });
    }
    ;

    /**
 * Checks/unchecks any matching checkboxes or radio buttons and
 * selects/deselects and matching option elements.
 */
    $.fn.selected = function(select) {
        if (select === undefined) {
            select = true;
        }
        return this.each(function() {
            var t = this.type;
            if (t == 'checkbox' || t == 'radio') {
                this.checked = select;
            } else if (this.tagName.toLowerCase() == 'option') {
                var $sel = $(this).parent('select');
                if (select && $sel[0] && $sel[0].type == 'select-one') {
                    // deselect all other options
                    $sel.find('option').selected(false);
                }
                this.selected = select;
            }
        });
    }
    ;

    // expose debug var
    $.fn.ajaxSubmit.debug = false;

    // helper fn for console logging
    function log() {
        if (!$.fn.ajaxSubmit.debug) {
            return;
        }
        var msg = '[jquery.form] ' + Array.prototype.join.call(arguments, '');
        if (window.console && window.console.log) {
            window.console.log(msg);
        } else if (window.opera && window.opera.postError) {
            window.opera.postError(msg);
        }
    }

}));

/* - ++resource++plone.app.jquerytools.overlayhelpers.js - */
// https://www.unibo.it/portal_javascripts/++resource++plone.app.jquerytools.overlayhelpers.js?original=1
var pb = {
    spinner: {},
    overlay_counter: 1
};
jQuery.tools.overlay.conf.oneInstance = false;
(function($) {
    jQuery.tools.overlay.addEffect('default', function(pos, onLoad) {
        var conf = this.getConf()
          , w = $(window)
          , ovl = this.getOverlay()
          , op = ovl.parent().offsetParent().offset();
        if (!conf.fixed) {
            pos.top += w.scrollTop() - op.top;
            pos.left += w.scrollLeft() - op.left
        }
        pos.position = conf.fixed ? 'fixed' : 'absolute';
        ovl.css(pos).fadeIn(conf.speed, onLoad)
    }, function(onClose) {
        this.getOverlay().fadeOut(this.getConf().closeSpeed, onClose)
    });
    pb.spinner.show = function() {
        $('body').css('cursor', 'wait')
    }
    ;
    pb.spinner.hide = function() {
        $('body').css('cursor', '')
    }
}(jQuery));
jQuery(function($) {
    $.fn.prepOverlay = function(pba) {
        return this.each(function() {
            var o, pbo, config, onBeforeLoad, onLoad, src, parts;
            o = $(this);
            pbo = $.extend(true, {
                'width': '60%'
            }, pba);
            config = pbo.config || {};
            onBeforeLoad = pb[pbo.subtype];
            if (onBeforeLoad) {
                config.onBeforeLoad = onBeforeLoad
            }
            onLoad = config.onLoad;
            config.onLoad = function() {
                if (onLoad) {
                    onLoad.apply(this, arguments)
                }
                pb.fi_focus(this.getOverlay())
            }
            ;
            src = o.attr('href') || o.attr('src') || o.attr('action');
            if (pbo.urlmatch) {
                src = src.replace(new RegExp(pbo.urlmatch), pbo.urlreplace)
            }
            if (pbo.subtype === 'inline') {
                src = src.replace(/^.+#/, '#');
                $("[id='" + src.replace('#', '') + "']").addClass('overlay');
                o.removeAttr('href').attr('rel', src);
                o.overlay()
            } else {
                pbo.nt = 'pb_' + pb.overlay_counter;
                pb.overlay_counter += 1;
                pbo.selector = pbo.filter || pbo.selector;
                if (!pbo.selector) {
                    parts = src.split(' ');
                    src = parts.shift();
                    pbo.selector = parts.join(' ')
                }
                pbo.src = src;
                pbo.config = config;
                pbo.source = o;
                pb.remove_overlay(o);
                o.data('pbo', pbo);
                o.attr('rel', '#' + pbo.nt);
                o.addClass('link-overlay');
                register_handler = function(evt, o, hnd) {
                    switch (evt) {
                    case undefined:
                        o.click(hnd);
                        break;
                    case 'click':
                        o.click(hnd);
                        break;
                    case 'hover':
                        o.hover(hnd);
                        break;
                    case 'dblclick':
                        o.dblclick(hnd);
                        break;
                    default:
                        throw "Unsupported event"
                    }
                }
                switch (pbo.subtype) {
                case 'image':
                    register_handler(pbo.event, o, pb.image_click);
                    break;
                case 'ajax':
                    register_handler(pbo.event, o, pb.ajax_click);
                    break;
                case 'iframe':
                    pb.create_content_div(pbo);
                    o.overlay(config);
                    break;
                default:
                    throw "Unsupported overlay type"
                }
                o.css('cursor', 'pointer')
            }
        })
    }
    ;
    pb.remove_overlay = function(o) {
        var old_data = o.data('pbo');
        if (old_data) {
            switch (old_data.subtype) {
            case 'image':
                o.unbind('click', pb.image_click);
                break;
            case 'ajax':
                o.unbind('click', pb.ajax_click);
                break;
            default:
                o.unbind('click');
                break
            }
            if (old_data.nt) {
                $('#' + old_data.nt).remove()
            }
        }
    }
    ;
    pb.create_content_div = function(pbo, trigger) {
        var content, close_message, pbw = pbo.width;
        if (typeof close_box_message === 'undefined') {
            close_message = 'Close this box.'
        } else {
            close_message = close_box_message
        }
        content = $('<div id="' + pbo.nt + '" class="overlay overlay-' + pbo.subtype + ' ' + (pbo.cssclass || '') + '"><div class="close"><a href="#" class="hiddenStructure" title="Close this box">' + close_message + '</a></div></div>');
        content.data('pbo', pbo);
        if (pbw) {
            if (pbw.indexOf('%') > 0) {
                content.width(parseInt(pbw, 10) / 100 * $(window).width())
            } else {
                content.width(pbw)
            }
        }
        content.appendTo($("body"));
        return content
    }
    ;
    pb.image_click = function(event) {
        var ethis, content, api, img, el, pbo;
        ethis = $(this);
        pbo = ethis.data('pbo');
        content = $(ethis.attr('rel'));
        if (!content.length) {
            content = pb.create_content_div(pbo);
            content.overlay(pbo.config)
        }
        api = content.overlay();
        if (content.find('img').length === 0) {
            if (pbo.src) {
                pb.spinner.show();
                img = new Image();
                img.src = pbo.src;
                el = $(img);
                content.append(el.addClass('pb-image'));
                el.load(function() {
                    pb.spinner.hide();
                    api.load()
                })
            }
        } else {
            api.load()
        }
        return false
    }
    ;
    pb.fi_focus = function(jqo) {
        if (!jqo.find("form div.error :input:first").focus().length) {
            jqo.find("form :input:visible:first").focus()
        }
    }
    ;
    pb.ajax_error_recover = function(responseText, selector) {
        var tcontent = $('<div/>').append(responseText.replace(/<script(.|\s)*?\/script>/gi, ""));
        return selector ? tcontent.find(selector) : tcontent
    }
    ;
    pb.add_ajax_load = function(form) {
        if (form.find('input[name=ajax_load]').length === 0) {
            form.prepend($('<input type="hidden" name="ajax_load" value="' + (new Date().getTime()) + '" />'))
        }
    }
    ;
    pb.prep_ajax_form = function(form) {
        var ajax_parent = form.closest('.pb-ajax')
          , data_parent = ajax_parent.closest('.overlay-ajax')
          , pbo = data_parent.data('pbo')
          , formtarget = pbo.formselector
          , closeselector = pbo.closeselector
          , beforepost = pbo.beforepost
          , afterpost = pbo.afterpost
          , noform = pbo.noform
          , api = data_parent.overlay()
          , selector = pbo.selector
          , options = {};
        options.beforeSerialize = function() {
            pb.spinner.show()
        }
        ;
        if (beforepost) {
            options.beforeSubmit = function(arr, form, options) {
                return beforepost(form, arr, options)
            }
        }
        options.success = function(responseText, statusText, xhr, form) {
            $(document).trigger('formOverlayStart', [this, responseText, statusText, xhr, form]);
            var el, myform, success, target, scripts = [], filteredResponseText;
            success = statusText === "success" || statusText === "notmodified";
            if (!success) {
                responseText = responseText.responseText
            }
            filteredResponseText = responseText.replace(/<script(.|\s)*?\/script>/gi, "");
            el = $('<div />').append(selector ? $('<div />').append(filteredResponseText).find(selector) : filteredResponseText);
            if (success && afterpost) {
                afterpost(el, data_parent)
            }
            myform = el.find(formtarget);
            if (success && myform.length) {
                ajax_parent.empty().append(el);
                try {
                    $.buildFragment([responseText], [document], scripts)
                } catch (e) {
                    $.buildFragment([responseText], document, scripts)
                }
                if (scripts.length) {
                    $.each(scripts, function() {
                        $.globalEval(this.text || this.textContent || this.innerHTML || "")
                    })
                }
                if ($.fn.ploneTabInit) {
                    el.ploneTabInit()
                }
                pb.fi_focus(ajax_parent);
                pb.add_ajax_load(myform);
                myform.ajaxForm(options);
                if (closeselector) {
                    el.find(closeselector).click(function(event) {
                        api.close();
                        return false
                    })
                }
                $(document).trigger('formOverlayLoadSuccess', [this, myform, api, pb, ajax_parent])
            } else {
                if (success) {
                    if (typeof noform === "function") {
                        noform = noform(el, pbo)
                    }
                } else {
                    noform = statusText
                }
                switch (noform) {
                case 'close':
                    api.close();
                    break;
                case 'reload':
                    api.close();
                    pb.spinner.show();
                    location.replace(location.href);
                    break;
                case 'redirect':
                    api.close();
                    pb.spinner.show();
                    target = pbo.redirect;
                    if (typeof target === "function") {
                        target = target(el, responseText, pbo)
                    }
                    location.replace(target);
                    break;
                default:
                    if (el.children()) {
                        ajax_parent.empty().append(el)
                    } else {
                        api.close()
                    }
                    break
                }
                $(document).trigger('formOverlayLoadFailure', [this, myform, api, pb, ajax_parent, noform])
            }
            pb.spinner.hide()
        }
        ;
        options.error = options.success;
        pb.add_ajax_load(form);
        form.ajaxForm(options)
    }
    ;
    pb.ajax_click = function(event) {
        var ethis = $(this), pbo, content, api, src, el, selector, formtarget, closeselector, sep, scripts = [], e;
        e = $.Event();
        e.type = "beforeAjaxClickHandled";
        $(document).trigger(e, [this, event]);
        if (e.isDefaultPrevented()) {
            return false
        }
        pbo = ethis.data('pbo');
        content = pb.create_content_div(pbo, ethis);
        content.overlay(pbo.config, ethis);
        api = content.overlay();
        src = pbo.src;
        selector = pbo.selector;
        formtarget = pbo.formselector;
        closeselector = pbo.closeselector;
        pb.spinner.show();
        $(this).find("input.submitting").removeClass('submitting');
        el = $('div.pb-ajax', content);
        if (el.length === 0) {
            el = $('<div class="pb-ajax" />');
            content.append(el)
        }
        if (api.getConf().fixed) {
            el.css('max-height', Math.floor($(window).height() * 0.75))
        }
        sep = (src.indexOf('?') >= 0) ? '&' : '?';
        src += sep + "ajax_load=" + (new Date().getTime());
        if (selector) {
            src += ' ' + selector
        }
        el[0].handle_load_inside_overlay = function(responseText, errorText) {
            var ele, target;
            ele = $(this);
            if (errorText === 'error') {
                ele.append(pb.ajax_error_recover(responseText, selector))
            } else if (!responseText.length) {
                ele.append(ajax_noresponse_message || 'No response from server.')
            }
            ele.wrapInner('<div />');
            if (formtarget) {
                target = ele.find(formtarget);
                if (target.length > 0) {
                    pb.prep_ajax_form(target)
                }
            }
            if (closeselector) {
                ele.find(closeselector).click(function(event) {
                    api.close();
                    return false
                })
            }
            try {
                $.buildFragment([responseText], [document], scripts)
            } catch (e) {
                $.buildFragment([responseText], document, scripts)
            }
            if (scripts.length) {
                $.each(scripts, function() {
                    $.globalEval(this.text || this.textContent || this.innerHTML || "")
                })
            }
            if ($.fn.ploneTabInit) {
                ele.ploneTabInit()
            }
            api.onClose = function() {
                content.remove()
            }
            ;
            $(document).trigger('loadInsideOverlay', [this, responseText, errorText, api])
        }
        ;
        var data = null;
        var form = $(pbo.source.context);
        var method = form.attr('method');
        if (method && method.toLowerCase() == 'post') {
            data = form.serializeArray()
        }
        el.load(src, data, function(responseText, errorText) {
            el[0].handle_load_inside_overlay.apply(this, [responseText, errorText]);
            pb.spinner.hide();
            api.load();
            return true
        });
        return false
    }
    ;
    pb.iframe = function() {
        var content, pbo;
        pb.spinner.show();
        content = this.getOverlay();
        pbo = this.getTrigger().data('pbo');
        if (content.find('iframe').length === 0 && pbo.src) {
            content.append('<iframe src="' + pbo.src + '" width="' + content.width() + '" height="' + content.height() + '" onload="pb.spinner.hide()"/>')
        } else {
            pb.spinner.hide()
        }
        return true
    }
});

/* - ++resource++plone.app.jquerytools.dateinput.js - */
!function($, undefined) {
    function dayAm(year, month) {
        return new Date(year,month + 1,0).getDate()
    }
    function zeropad(val, len) {
        for (val = "" + val,
        len = len || 2; val.length < len; )
            val = "0" + val;
        return val
    }
    function format(formatter, date, text, lang) {
        var d = date.getDate()
          , D = date.getDay()
          , m = date.getMonth()
          , y = date.getFullYear()
          , flags = {
            d: d,
            dd: zeropad(d),
            ddd: LABELS[lang].shortDays[D],
            dddd: LABELS[lang].days[D],
            m: m + 1,
            mm: zeropad(m + 1),
            mmm: LABELS[lang].shortMonths[m],
            mmmm: LABELS[lang].months[m],
            yy: String(y).slice(2),
            yyyy: y
        }
          , ret = formatters[formatter](text, date, flags, lang);
        return tmpTag.html(ret).html()
    }
    function integer(val) {
        return parseInt(val, 10)
    }
    function isSameDay(d1, d2) {
        return d1.getFullYear() === d2.getFullYear() && d1.getMonth() == d2.getMonth() && d1.getDate() == d2.getDate()
    }
    function parseDate(val) {
        if (val !== undefined) {
            if (val.constructor == Date)
                return val;
            if ("string" == typeof val) {
                var els = val.split("-");
                if (3 == els.length)
                    return new Date(integer(els[0]),integer(els[1]) - 1,integer(els[2]));
                if (!/^-?\d+$/.test(val))
                    return;
                val = integer(val)
            }
            var date = new Date;
            return date.setDate(date.getDate() + val),
            date
        }
    }
    function Dateinput(input, conf) {
        function select(date, conf, e) {
            return input.attr("readonly") ? void self.hide(e) : (value = date,
            currYear = date.getFullYear(),
            currMonth = date.getMonth(),
            currDay = date.getDate(),
            e || (e = $.Event("api")),
            "click" != e.type || /msie/.test(navigator.userAgent.toLowerCase()) || input.focus(),
            e.type = "beforeChange",
            fire.trigger(e, [date]),
            void (e.isDefaultPrevented() || (input.val(format(conf.formatter, date, conf.format, conf.lang)),
            e.type = "change",
            e.target = input[0],
            fire.trigger(e),
            input.data("date", date),
            self.hide(e))))
        }
        function onShow(ev) {
            ev.type = "onShow",
            fire.trigger(ev),
            $(document).on("keydown.d", function(e) {
                if (e.ctrlKey)
                    return !0;
                var key = e.keyCode;
                if (8 == key || 46 == key)
                    return input.val(""),
                    self.hide(e);
                if (27 == key || 9 == key)
                    return self.hide(e);
                if ($(KEYS).index(key) >= 0) {
                    if (!opened)
                        return self.show(e),
                        e.preventDefault();
                    var days = $("#" + css.weeks + " a")
                      , el = $("." + css.focus)
                      , index = days.index(el);
                    return el.removeClass(css.focus),
                    74 == key || 40 == key ? index += 7 : 75 == key || 38 == key ? index -= 7 : 76 == key || 39 == key ? index += 1 : 72 != key && 37 != key || (index -= 1),
                    index > 41 ? (self.addMonth(),
                    el = $("#" + css.weeks + " a:eq(" + (index - 42) + ")")) : index < 0 ? (self.addMonth(-1),
                    el = $("#" + css.weeks + " a:eq(" + (index + 42) + ")")) : el = days.eq(index),
                    el.addClass(css.focus),
                    e.preventDefault()
                }
                return 34 == key ? self.addMonth() : 33 == key ? self.addMonth(-1) : 36 == key ? self.today() : (13 == key && ($(e.target).is("select") || $("." + css.focus).click()),
                $([16, 17, 18, 9]).index(key) >= 0)
            }),
            $(document).on("click.d", function(e) {
                var el = e.target;
                el.id == css.root || $(el).parents("#" + css.root).length || el == input[0] || trigger && el == trigger[0] || self.hide(e)
            })
        }
        var trigger, pm, nm, currYear, currMonth, currDay, opened, original, self = this, now = new Date, yearNow = now.getFullYear(), css = conf.css, labels = LABELS[conf.lang], root = $("#" + css.root), title = root.find("#" + css.title), value = input.attr("data-value") || conf.value || input.val(), min = input.attr("min") || conf.min, max = input.attr("max") || conf.max;
        if (0 === min && (min = "0"),
        value = parseDate(value) || now,
        min = parseDate(min || new Date(yearNow + conf.yearRange[0],0,1)),
        max = parseDate(max || new Date(yearNow + conf.yearRange[1] + 1,0,0)),
        !labels)
            throw "Dateinput: invalid language: " + conf.lang;
        if ("date" == input.attr("type")) {
            var original = input.clone()
              , def = original.wrap("<div/>").parent().html()
              , clone = $(def.replace(/type/i, "type=text data-orig-type"));
            conf.value && clone.val(conf.value),
            input.replaceWith(clone),
            input = clone
        }
        input.addClass(css.input);
        var fire = input.add(self);
        if (!root.length) {
            if (root = $("<div><div><a/><div/><a/></div><div><div/><div/></div></div>").hide().css({
                position: "absolute"
            }).attr("id", css.root),
            root.children().eq(0).attr("id", css.head).end().eq(1).attr("id", css.body).children().eq(0).attr("id", css.days).end().eq(1).attr("id", css.weeks).end().end().end().find("a").eq(0).attr("id", css.prev).end().eq(1).attr("id", css.next),
            title = root.find("#" + css.head).find("div").attr("id", css.title),
            conf.selectors) {
                var monthSelector = $("<select/>").attr("id", css.month)
                  , yearSelector = $("<select/>").attr("id", css.year);
                title.html(monthSelector.add(yearSelector))
            }
            for (var days = root.find("#" + css.days), d = 0; d < 7; d++)
                days.append($("<span/>").text(labels.shortDays[(d + conf.firstDay) % 7]));
            $("body").append(root)
        }
        conf.trigger && (trigger = $("<a/>").attr("href", "#").addClass(css.trigger).click(function(e) {
            return conf.toggle ? self.toggle() : self.show(),
            e.preventDefault()
        }).insertAfter(input));
        var weeks = root.find("#" + css.weeks);
        yearSelector = root.find("#" + css.year),
        monthSelector = root.find("#" + css.month),
        $.extend(self, {
            show: function(e) {
                if (!input.attr("disabled") && !opened && (e = e || $.Event(),
                e.type = "onBeforeShow",
                fire.trigger(e),
                !e.isDefaultPrevented())) {
                    $.each(instances, function() {
                        this.hide()
                    }),
                    opened = !0,
                    monthSelector.off("change").change(function() {
                        self.setValue(integer(yearSelector.val()), integer($(this).val()))
                    }),
                    yearSelector.off("change").change(function() {
                        self.setValue(integer($(this).val()), integer(monthSelector.val()))
                    }),
                    pm = root.find("#" + css.prev).off("click").click(function(e) {
                        return pm.hasClass(css.disabled) || self.addMonth(-1),
                        !1
                    }),
                    nm = root.find("#" + css.next).off("click").click(function(e) {
                        return nm.hasClass(css.disabled) || self.addMonth(),
                        !1
                    }),
                    self.setValue(value);
                    var pos = input.offset();
                    return /iPad/i.test(navigator.userAgent) && (pos.top -= $(window).scrollTop()),
                    root.css({
                        top: pos.top + input.outerHeight(!0) + conf.offset[0],
                        left: pos.left + conf.offset[1]
                    }),
                    conf.speed ? root.show(conf.speed, function() {
                        onShow(e)
                    }) : (root.show(),
                    onShow(e)),
                    self
                }
            },
            setValue: function(year, month, day) {
                var date = integer(month) >= -1 ? new Date(integer(year),integer(month),integer(day == undefined || isNaN(day) ? 1 : day)) : year || value;
                if (date < min ? date = min : date > max && (date = max),
                "string" == typeof year && (date = parseDate(year)),
                year = date.getFullYear(),
                month = date.getMonth(),
                day = date.getDate(),
                month == -1 ? (month = 11,
                year--) : 12 == month && (month = 0,
                year++),
                !opened)
                    return select(date, conf),
                    self;
                currMonth = month,
                currYear = year,
                currDay = day;
                var week, tmp = new Date(year,month,1 - conf.firstDay), begin = tmp.getDay(), days = dayAm(year, month), prevDays = dayAm(year, month - 1);
                if (conf.selectors) {
                    monthSelector.empty(),
                    $.each(labels.months, function(i, m) {
                        min < new Date(year,i + 1,1) && max > new Date(year,i,0) && monthSelector.append($("<option/>").html(m).attr("value", i))
                    }),
                    yearSelector.empty();
                    for (var yearNow = now.getFullYear(), i = yearNow + conf.yearRange[0]; i < yearNow + conf.yearRange[1]; i++)
                        min < new Date(i + 1,0,1) && max > new Date(i,0,0) && yearSelector.append($("<option/>").text(i));
                    monthSelector.val(month),
                    yearSelector.val(year)
                } else
                    title.html(labels.months[month] + " " + year);
                weeks.empty(),
                pm.add(nm).removeClass(css.disabled);
                for (var a, num, j = begin ? 0 : -7; j < (begin ? 42 : 35); j++)
                    a = $("<a/>"),
                    j % 7 === 0 && (week = $("<div/>").addClass(css.week),
                    weeks.append(week)),
                    j < begin ? (a.addClass(css.off),
                    num = prevDays - begin + j + 1,
                    date = new Date(year,month - 1,num)) : j >= begin + days ? (a.addClass(css.off),
                    num = j - days - begin + 1,
                    date = new Date(year,month + 1,num)) : (num = j - begin + 1,
                    date = new Date(year,month,num),
                    isSameDay(value, date) ? a.attr("id", css.current).addClass(css.focus) : isSameDay(now, date) && a.attr("id", css.today)),
                    min && date < min && a.add(pm).addClass(css.disabled),
                    max && date > max && a.add(nm).addClass(css.disabled),
                    a.attr("href", "#" + num).text(num).data("date", date),
                    week.append(a);
                return weeks.find("a").click(function(e) {
                    var el = $(this);
                    return el.hasClass(css.disabled) || ($("#" + css.current).removeAttr("id"),
                    el.attr("id", css.current),
                    select(el.data("date"), conf, e)),
                    !1
                }),
                css.sunday && weeks.find("." + css.week).each(function() {
                    var beg = conf.firstDay ? 7 - conf.firstDay : 0;
                    $(this).children().slice(beg, beg + 1).addClass(css.sunday)
                }),
                self
            },
            setMin: function(val, fit) {
                return min = parseDate(val),
                fit && value < min && self.setValue(min),
                self
            },
            setMax: function(val, fit) {
                return max = parseDate(val),
                fit && value > max && self.setValue(max),
                self
            },
            today: function() {
                return self.setValue(now)
            },
            addDay: function(amount) {
                return this.setValue(currYear, currMonth, currDay + (amount || 1))
            },
            addMonth: function(amount) {
                var targetMonth = currMonth + (amount || 1)
                  , daysInTargetMonth = dayAm(currYear, targetMonth)
                  , targetDay = currDay <= daysInTargetMonth ? currDay : daysInTargetMonth;
                return this.setValue(currYear, targetMonth, targetDay)
            },
            addYear: function(amount) {
                return this.setValue(currYear + (amount || 1), currMonth, currDay)
            },
            destroy: function() {
                input.add(document).off("click.d keydown.d"),
                root.add(trigger).remove(),
                input.removeData("dateinput").removeClass(css.input),
                original && input.replaceWith(original)
            },
            hide: function(e) {
                if (opened) {
                    if (e = $.Event(),
                    e.type = "onHide",
                    fire.trigger(e),
                    e.isDefaultPrevented())
                        return;
                    $(document).off("click.d keydown.d"),
                    root.hide(),
                    opened = !1
                }
                return self
            },
            toggle: function() {
                return self.isOpen() ? self.hide() : self.show()
            },
            getConf: function() {
                return conf
            },
            getInput: function() {
                return input
            },
            getCalendar: function() {
                return root
            },
            getValue: function(dateFormat) {
                return dateFormat ? format(conf.formatter, value, dateFormat, conf.lang) : value
            },
            isOpen: function() {
                return opened
            }
        }),
        $.each(["onBeforeShow", "onShow", "change", "onHide"], function(i, name) {
            $.isFunction(conf[name]) && $(self).on(name, conf[name]),
            self[name] = function(fn) {
                return fn && $(self).on(name, fn),
                self
            }
        }),
        conf.editable || input.on("focus.d click.d", self.show).keydown(function(e) {
            var key = e.keyCode;
            return !opened && $(KEYS).index(key) >= 0 ? (self.show(e),
            e.preventDefault()) : (8 != key && 46 != key || input.val(""),
            !!(e.shiftKey || e.ctrlKey || e.altKey || 9 == key) || e.preventDefault())
        }),
        parseDate(input.val()) && select(value, conf)
    }
    $.tools = $.tools || {
        version: "@VERSION"
    };
    var tool, instances = [], formatters = {}, KEYS = [75, 76, 38, 39, 74, 72, 40, 37], LABELS = {};
    tool = $.tools.dateinput = {
        conf: {
            format: "mm/dd/yy",
            formatter: "default",
            selectors: !1,
            yearRange: [-5, 5],
            lang: "en",
            offset: [0, 0],
            speed: 0,
            firstDay: 0,
            min: undefined,
            max: undefined,
            trigger: 0,
            toggle: 0,
            editable: 0,
            css: {
                prefix: "cal",
                input: "date",
                root: 0,
                head: 0,
                title: 0,
                prev: 0,
                next: 0,
                month: 0,
                year: 0,
                days: 0,
                body: 0,
                weeks: 0,
                today: 0,
                current: 0,
                week: 0,
                off: 0,
                sunday: 0,
                focus: 0,
                disabled: 0,
                trigger: 0
            }
        },
        addFormatter: function(name, fn) {
            formatters[name] = fn
        },
        localize: function(language, labels) {
            $.each(labels, function(key, val) {
                labels[key] = val.split(",")
            }),
            LABELS[language] = labels
        }
    },
    tool.localize("en", {
        months: "January,February,March,April,May,June,July,August,September,October,November,December",
        shortMonths: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec",
        days: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday",
        shortDays: "Sun,Mon,Tue,Wed,Thu,Fri,Sat"
    });
    var tmpTag = $("<a/>");
    tool.addFormatter("default", function(text, date, flags, lang) {
        return text.replace(/d{1,4}|m{1,4}|yy(?:yy)?|"[^"]*"|'[^']*'/g, function($0) {
            return $0 in flags ? flags[$0] : $0
        })
    }),
    tool.addFormatter("prefixed", function(text, date, flags, lang) {
        return text.replace(/%(d{1,4}|m{1,4}|yy(?:yy)?|"[^"]*"|'[^']*')/g, function($0, $1) {
            return $1 in flags ? flags[$1] : $0
        })
    }),
    $.expr[":"].date = function(el) {
        var type = el.getAttribute("type");
        return type && "date" == type || !!$(el).data("dateinput")
    }
    ,
    $.fn.dateinput = function(conf) {
        if (this.data("dateinput"))
            return this;
        conf = $.extend(!0, {}, tool.conf, conf),
        $.each(conf.css, function(key, val) {
            val || "prefix" == key || (conf.css[key] = (conf.css.prefix || "") + (val || key))
        });
        var els;
        return this.each(function() {
            var el = new Dateinput($(this),conf);
            instances.push(el);
            var input = el.getInput().data("dateinput", el);
            els = els ? els.add(input) : input
        }),
        els ? els : this
    }
}(jQuery);

/* - ++resource++plone.app.jquerytools.tooltip.js - */
!function($) {
    function getPosition(trigger, tip, conf) {
        var top = conf.relative ? trigger.position().top : trigger.offset().top
          , left = conf.relative ? trigger.position().left : trigger.offset().left
          , pos = conf.position[0];
        top -= tip.outerHeight() - conf.offset[0],
        left += trigger.outerWidth() + conf.offset[1],
        /iPad/i.test(navigator.userAgent) && (top -= $(window).scrollTop());
        var height = tip.outerHeight() + trigger.outerHeight();
        "center" == pos && (top += height / 2),
        "bottom" == pos && (top += height),
        pos = conf.position[1];
        var width = tip.outerWidth() + trigger.outerWidth();
        return "center" == pos && (left -= width / 2),
        "left" == pos && (left -= width),
        {
            top: top,
            left: left
        }
    }
    function Tooltip(trigger, conf) {
        var tip, shown, self = this, fire = trigger.add(self), timer = 0, pretimer = 0, title = trigger.attr("title"), tipAttr = trigger.attr("data-tooltip"), effect = effects[conf.effect], isInput = trigger.is(":input"), isWidget = isInput && trigger.is(":checkbox, :radio, select, :button, :submit"), type = trigger.attr("type"), evt = conf.events[type] || conf.events[isInput ? isWidget ? "widget" : "input" : "def"];
        if (!effect)
            throw 'Nonexistent effect "' + conf.effect + '"';
        if (evt = evt.split(/,\s*/),
        2 != evt.length)
            throw "Tooltip: bad events configuration for " + type;
        trigger.on(evt[0], function(e) {
            clearTimeout(timer),
            conf.predelay ? pretimer = setTimeout(function() {
                self.show(e)
            }, conf.predelay) : self.show(e)
        }).on(evt[1], function(e) {
            clearTimeout(pretimer),
            conf.delay ? timer = setTimeout(function() {
                self.hide(e)
            }, conf.delay) : self.hide(e)
        }),
        title && conf.cancelDefault && (trigger.removeAttr("title"),
        trigger.data("title", title)),
        $.extend(self, {
            show: function(e) {
                if (!tip && (tipAttr ? tip = $(tipAttr) : conf.tip ? tip = $(conf.tip).eq(0) : title ? tip = $(conf.layout).addClass(conf.tipClass).appendTo(document.body).hide().append(title) : (tip = trigger.find("." + conf.tipClass),
                tip.length || (tip = trigger.next()),
                tip.length || (tip = trigger.parent().next())),
                !tip.length))
                    throw "Cannot find tooltip for " + trigger;
                if (self.isShown())
                    return self;
                tip.stop(!0, !0);
                var pos = getPosition(trigger, tip, conf);
                if (conf.tip && tip.html(trigger.data("title")),
                e = $.Event(),
                e.type = "onBeforeShow",
                fire.trigger(e, [pos]),
                e.isDefaultPrevented())
                    return self;
                pos = getPosition(trigger, tip, conf),
                tip.css({
                    position: "absolute",
                    top: pos.top,
                    left: pos.left
                }),
                shown = !0,
                effect[0].call(self, function() {
                    e.type = "onShow",
                    shown = "full",
                    fire.trigger(e)
                });
                var event = conf.events.tooltip.split(/,\s*/);
                return tip.data("__set") || (tip.off(event[0]).on(event[0], function() {
                    clearTimeout(timer),
                    clearTimeout(pretimer)
                }),
                event[1] && !trigger.is("input:not(:checkbox, :radio), textarea") && tip.off(event[1]).on(event[1], function(e) {
                    e.relatedTarget != trigger[0] && trigger.trigger(evt[1].split(" ")[0])
                }),
                conf.tip || tip.data("__set", !0)),
                self
            },
            hide: function(e) {
                return tip && self.isShown() ? (e = $.Event(),
                e.type = "onBeforeHide",
                fire.trigger(e),
                e.isDefaultPrevented() ? void 0 : (shown = !1,
                effects[conf.effect][1].call(self, function() {
                    e.type = "onHide",
                    fire.trigger(e)
                }),
                self)) : self
            },
            isShown: function(fully) {
                return fully ? "full" == shown : shown
            },
            getConf: function() {
                return conf
            },
            getTip: function() {
                return tip
            },
            getTrigger: function() {
                return trigger
            }
        }),
        $.each("onHide,onBeforeShow,onShow,onBeforeHide".split(","), function(i, name) {
            $.isFunction(conf[name]) && $(self).on(name, conf[name]),
            self[name] = function(fn) {
                return fn && $(self).on(name, fn),
                self
            }
        })
    }
    $.tools = $.tools || {
        version: "@VERSION"
    },
    $.tools.tooltip = {
        conf: {
            effect: "toggle",
            fadeOutSpeed: "fast",
            predelay: 0,
            delay: 30,
            opacity: 1,
            tip: 0,
            fadeIE: !1,
            position: ["top", "center"],
            offset: [0, 0],
            relative: !1,
            cancelDefault: !0,
            events: {
                def: "mouseenter,mouseleave",
                input: "focus,blur",
                widget: "focus mouseenter,blur mouseleave",
                tooltip: "mouseenter,mouseleave"
            },
            layout: "<div/>",
            tipClass: "tooltip"
        },
        addEffect: function(name, loadFn, hideFn) {
            effects[name] = [loadFn, hideFn]
        }
    };
    var effects = {
        toggle: [function(done) {
            var conf = this.getConf()
              , tip = this.getTip()
              , o = conf.opacity;
            o < 1 && tip.css({
                opacity: o
            }),
            tip.show(),
            done.call()
        }
        , function(done) {
            this.getTip().hide(),
            done.call()
        }
        ],
        fade: [function(done) {
            var conf = this.getConf();
            !/msie/.test(navigator.userAgent.toLowerCase()) || conf.fadeIE ? this.getTip().fadeTo(conf.fadeInSpeed, conf.opacity, done) : (this.getTip().show(),
            done())
        }
        , function(done) {
            var conf = this.getConf();
            !/msie/.test(navigator.userAgent.toLowerCase()) || conf.fadeIE ? this.getTip().fadeOut(conf.fadeOutSpeed, done) : (this.getTip().hide(),
            done())
        }
        ]
    };
    $.fn.tooltip = function(conf) {
        var api = this.data("tooltip");
        return api ? api : (conf = $.extend(!0, {}, $.tools.tooltip.conf, conf),
        "string" == typeof conf.position && (conf.position = conf.position.split(/,?\s/)),
        this.each(function() {
            api = new Tooltip($(this),conf),
            $(this).data("tooltip", api)
        }),
        conf.api ? api : this)
    }
}(jQuery);

/* - nodeutilities.js - */
// https://www.unibo.it/portal_javascripts/nodeutilities.js?original=1
function wrapNode(node, wrappertype, wrapperclass) {
    jQuery(node).wrap('<' + wrappertype + '>').parent().addClass(wrapperclass)
}
function nodeContained(innernode, outernode) {
    return jQuery(innernode).parents().filter(function() {
        return this === outernode
    }).length > 0
}
function findContainer(node, func) {
    var p = jQuery(node).parents().filter(func);
    return p.length ? p.get(0) : false
}
function hasClassName(node, class_name) {
    return jQuery(node).hasClass(class_name)
}
function addClassName(node, class_name) {
    jQuery(node).addClass(class_name)
}
function removeClassName(node, class_name) {
    jQuery(node).removeClass(class_name)
}
function replaceClassName(node, old_class, new_class, ignore_missing) {
    if (ignore_missing || jQuery(node).hasClass(old_class)) {
        jQuery(node).removeClass(old_class).addClass(new_class)
    }
}
function walkTextNodes(node, func, data) {
    jQuery(node).find('*').andSelf().contents().each(function() {
        if (this.nodeType === 3) {
            func(this, data)
        }
    })
}
function getInnerTextCompatible(node) {
    return jQuery(node).text()
}
function getInnerTextFast(node) {
    return jQuery(node).text()
}
function sortNodes(nodes, fetch_func, cmp_func) {
    var SortNodeWrapper, items;
    SortNodeWrapper = function(node) {
        this.value = fetch_func(node);
        this.cloned_node = node.cloneNode(true)
    }
    ;
    SortNodeWrapper.prototype.toString = function() {
        return this.value.toString ? this.value.toString() : this.value
    }
    ;
    items = jQuery(nodes).map(function() {
        return new SortNodeWrapper(this)
    });
    if (cmp_func) {
        items.sort(cmp_func)
    } else {
        items.sort()
    }
    jQuery.each(items, function(i) {
        jQuery(nodes[i]).replace(this.cloned_node)
    })
}
function copyChildNodes(srcNode, dstNode) {
    jQuery(srcNode).children().clone().appendTo(jQuery(dstNode))
}

/* - cookie_functions.js - */
// https://www.unibo.it/portal_javascripts/cookie_functions.js?original=1
function createCookie(name, value, days) {
    var date, expires;
    if (days) {
        date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString()
    } else {
        expires = ""
    }
    document.cookie = name + "=" + escape(value) + expires + "; path=/;"
}
function readCookie(name) {
    var nameEQ = name + "=", ca = document.cookie.split(';'), i, c;
    for (i = 0; i < ca.length; i = i + 1) {
        c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1, c.length)
        }
        if (c.indexOf(nameEQ) === 0) {
            return unescape(c.substring(nameEQ.length, c.length))
        }
    }
    return null
}

/* - modernizr.js - */
// https://www.unibo.it/portal_javascripts/modernizr.js?original=1
;window.Modernizr = function(a, b, c) {
    function H() {
        e.input = function(a) {
            for (var b = 0, c = a.length; b < c; b++)
                t[a[b]] = a[b]in l;
            return t
        }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),
        e.inputtypes = function(a) {
            for (var d = 0, e, f, h, i = a.length; d < i; d++)
                l.setAttribute("type", f = a[d]),
                e = l.type !== "text",
                e && (l.value = m,
                l.style.cssText = "position:absolute;visibility:hidden;",
                /^range$/.test(f) && l.style.WebkitAppearance !== c ? (g.appendChild(l),
                h = b.defaultView,
                e = h.getComputedStyle && h.getComputedStyle(l, null).WebkitAppearance !== "textfield" && l.offsetHeight !== 0,
                g.removeChild(l)) : /^(search|tel)$/.test(f) || (/^(url|email)$/.test(f) ? e = l.checkValidity && l.checkValidity() === !1 : /^color$/.test(f) ? (g.appendChild(l),
                g.offsetWidth,
                e = l.value != m,
                g.removeChild(l)) : e = l.value != m)),
                s[a[d]] = !!e;
            return s
        }("search tel url email datetime date month week time datetime-local number range color".split(" "))
    }
    function F(a, b) {
        var c = a.charAt(0).toUpperCase() + a.substr(1)
          , d = (a + " " + p.join(c + " ") + c).split(" ");
        return E(d, b)
    }
    function E(a, b) {
        for (var d in a)
            if (k[a[d]] !== c)
                return b == "pfx" ? a[d] : !0;
        return !1
    }
    function D(a, b) {
        return !!~("" + a).indexOf(b)
    }
    function C(a, b) {
        return typeof a === b
    }
    function B(a, b) {
        return A(o.join(a + ";") + (b || ""))
    }
    function A(a) {
        k.cssText = a
    }
    var d = "2.0.4", e = {}, f = !0, g = b.documentElement, h = b.head || b.getElementsByTagName("head")[0], i = "modernizr", j = b.createElement(i), k = j.style, l = b.createElement("input"), m = ":)", n = Object.prototype.toString, o = " -webkit- -moz- -o- -ms- -khtml- ".split(" "), p = "Webkit Moz O ms Khtml".split(" "), q = {
        svg: "http://www.w3.org/2000/svg"
    }, r = {}, s = {}, t = {}, u = [], v = function(a, c, d, e) {
        var f, h, j, k = b.createElement("div");
        if (parseInt(d, 10))
            while (d--)
                j = b.createElement("div"),
                j.id = e ? e[d] : i + (d + 1),
                k.appendChild(j);
        f = ["&shy;", "<style>", a, "</style>"].join(""),
        k.id = i,
        k.innerHTML += f,
        g.appendChild(k),
        h = c(k, a),
        k.parentNode.removeChild(k);
        return !!h
    }, w = function() {
        function d(d, e) {
            e = e || b.createElement(a[d] || "div"),
            d = "on" + d;
            var f = d in e;
            f || (e.setAttribute || (e = b.createElement("div")),
            e.setAttribute && e.removeAttribute && (e.setAttribute(d, ""),
            f = C(e[d], "function"),
            C(e[d], c) || (e[d] = c),
            e.removeAttribute(d))),
            e = null;
            return f
        }
        var a = {
            select: "input",
            change: "input",
            submit: "form",
            reset: "form",
            error: "img",
            load: "img",
            abort: "img"
        };
        return d
    }(), x, y = {}.hasOwnProperty, z;
    !C(y, c) && !C(y.call, c) ? z = function(a, b) {
        return y.call(a, b)
    }
    : z = function(a, b) {
        return b in a && C(a.constructor.prototype[b], c)
    }
    ;
    var G = function(c, d) {
        var f = c.join("")
          , g = d.length;
        v(f, function(c, d) {
            var f = b.styleSheets[b.styleSheets.length - 1]
              , h = f.cssRules && f.cssRules[0] ? f.cssRules[0].cssText : f.cssText || ""
              , i = c.childNodes
              , j = {};
            while (g--)
                j[i[g].id] = i[g];
            e.touch = "ontouchstart"in a || j.touch.offsetTop === 9,
            e.csstransforms3d = j.csstransforms3d.offsetLeft === 9,
            e.generatedcontent = j.generatedcontent.offsetHeight >= 1,
            e.fontface = /src/i.test(h) && h.indexOf(d.split(" ")[0]) === 0
        }, g, d)
    }(['@font-face {font-family:"font";src:url("https://")}', ["@media (", o.join("touch-enabled),("), i, ")", "{#touch{top:9px;position:absolute}}"].join(""), ["@media (", o.join("transform-3d),("), i, ")", "{#csstransforms3d{left:9px;position:absolute}}"].join(""), ['#generatedcontent:after{content:"', m, '"}'].join("")], ["fontface", "touch", "csstransforms3d", "generatedcontent"]);
    r.flexbox = function() {
        function c(a, b, c, d) {
            a.style.cssText = o.join(b + ":" + c + ";") + (d || "")
        }
        function a(a, b, c, d) {
            b += ":",
            a.style.cssText = (b + o.join(c + ";" + b)).slice(0, -b.length) + (d || "")
        }
        var d = b.createElement("div")
          , e = b.createElement("div");
        a(d, "display", "box", "width:42px;padding:0;"),
        c(e, "box-flex", "1", "width:10px;"),
        d.appendChild(e),
        g.appendChild(d);
        var f = e.offsetWidth === 42;
        d.removeChild(e),
        g.removeChild(d);
        return f
    }
    ,
    r.canvas = function() {
        var a = b.createElement("canvas");
        return !!a.getContext && !!a.getContext("2d")
    }
    ,
    r.canvastext = function() {
        return !!e.canvas && !!C(b.createElement("canvas").getContext("2d").fillText, "function")
    }
    ,
    r.webgl = function() {
        return !!a.WebGLRenderingContext
    }
    ,
    r.touch = function() {
        return e.touch
    }
    ,
    r.geolocation = function() {
        return !!navigator.geolocation
    }
    ,
    r.postmessage = function() {
        return !!a.postMessage
    }
    ,
    r.websqldatabase = function() {
        var b = !!a.openDatabase;
        return b
    }
    ,
    r.indexedDB = function() {
        for (var b = -1, c = p.length; ++b < c; )
            if (a[p[b].toLowerCase() + "IndexedDB"])
                return !0;
        return !!a.indexedDB
    }
    ,
    r.hashchange = function() {
        return w("hashchange", a) && (b.documentMode === c || b.documentMode > 7)
    }
    ,
    r.history = function() {
        return !!a.history && !!history.pushState
    }
    ,
    r.draganddrop = function() {
        return w("dragstart") && w("drop")
    }
    ,
    r.websockets = function() {
        for (var b = -1, c = p.length; ++b < c; )
            if (a[p[b] + "WebSocket"])
                return !0;
        return "WebSocket"in a
    }
    ,
    r.rgba = function() {
        A("background-color:rgba(150,255,150,.5)");
        return D(k.backgroundColor, "rgba")
    }
    ,
    r.hsla = function() {
        A("background-color:hsla(120,40%,100%,.5)");
        return D(k.backgroundColor, "rgba") || D(k.backgroundColor, "hsla")
    }
    ,
    r.multiplebgs = function() {
        A("background:url(https://),url(https://),red url(https://)");
        return /(url\s*\(.*?){3}/.test(k.background)
    }
    ,
    r.backgroundsize = function() {
        return F("backgroundSize")
    }
    ,
    r.borderimage = function() {
        return F("borderImage")
    }
    ,
    r.borderradius = function() {
        return F("borderRadius")
    }
    ,
    r.boxshadow = function() {
        return F("boxShadow")
    }
    ,
    r.textshadow = function() {
        return b.createElement("div").style.textShadow === ""
    }
    ,
    r.opacity = function() {
        B("opacity:.55");
        return /^0.55$/.test(k.opacity)
    }
    ,
    r.cssanimations = function() {
        return F("animationName")
    }
    ,
    r.csscolumns = function() {
        return F("columnCount")
    }
    ,
    r.cssgradients = function() {
        var a = "background-image:"
          , b = "gradient(linear,left top,right bottom,from(#9f9),to(white));"
          , c = "linear-gradient(left top,#9f9, white);";
        A((a + o.join(b + a) + o.join(c + a)).slice(0, -a.length));
        return D(k.backgroundImage, "gradient")
    }
    ,
    r.cssreflections = function() {
        return F("boxReflect")
    }
    ,
    r.csstransforms = function() {
        return !!E(["transformProperty", "WebkitTransform", "MozTransform", "OTransform", "msTransform"])
    }
    ,
    r.csstransforms3d = function() {
        var a = !!E(["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"]);
        a && "webkitPerspective"in g.style && (a = e.csstransforms3d);
        return a
    }
    ,
    r.csstransitions = function() {
        return F("transitionProperty")
    }
    ,
    r.fontface = function() {
        return e.fontface
    }
    ,
    r.generatedcontent = function() {
        return e.generatedcontent
    }
    ,
    r.video = function() {
        var a = b.createElement("video")
          , c = !1;
        try {
            if (c = !!a.canPlayType) {
                c = new Boolean(c),
                c.ogg = a.canPlayType('video/ogg; codecs="theora"');
                var d = 'video/mp4; codecs="avc1.42E01E';
                c.h264 = a.canPlayType(d + '"') || a.canPlayType(d + ', mp4a.40.2"'),
                c.webm = a.canPlayType('video/webm; codecs="vp8, vorbis"')
            }
        } catch (e) {}
        return c
    }
    ,
    r.audio = function() {
        var a = b.createElement("audio")
          , c = !1;
        try {
            if (c = !!a.canPlayType)
                c = new Boolean(c),
                c.ogg = a.canPlayType('audio/ogg; codecs="vorbis"'),
                c.mp3 = a.canPlayType("audio/mpeg;"),
                c.wav = a.canPlayType('audio/wav; codecs="1"'),
                c.m4a = a.canPlayType("audio/x-m4a;") || a.canPlayType("audio/aac;")
        } catch (d) {}
        return c
    }
    ,
    r.localstorage = function() {
        try {
            return !!localStorage.getItem
        } catch (a) {
            return !1
        }
    }
    ,
    r.sessionstorage = function() {
        try {
            return !!sessionStorage.getItem
        } catch (a) {
            return !1
        }
    }
    ,
    r.webworkers = function() {
        return !!a.Worker
    }
    ,
    r.applicationcache = function() {
        return !!a.applicationCache
    }
    ,
    r.svg = function() {
        return !!b.createElementNS && !!b.createElementNS(q.svg, "svg").createSVGRect
    }
    ,
    r.inlinesvg = function() {
        var a = b.createElement("div");
        a.innerHTML = "<svg/>";
        return (a.firstChild && a.firstChild.namespaceURI) == q.svg
    }
    ,
    r.smil = function() {
        return !!b.createElementNS && /SVG/.test(n.call(b.createElementNS(q.svg, "animate")))
    }
    ,
    r.svgclippaths = function() {
        return !!b.createElementNS && /SVG/.test(n.call(b.createElementNS(q.svg, "clipPath")))
    }
    ;
    for (var I in r)
        z(r, I) && (x = I.toLowerCase(),
        e[x] = r[I](),
        u.push((e[x] ? "" : "no-") + x));
    e.input || H(),
    e.addTest = function(a, b) {
        if (typeof a == "object")
            for (var d in a)
                z(a, d) && e.addTest(d, a[d]);
        else {
            a = a.toLowerCase();
            if (e[a] !== c)
                return;
            b = typeof b == "boolean" ? b : !!b(),
            g.className += " " + (b ? "" : "no-") + a,
            e[a] = b
        }
        return e
    }
    ,
    A(""),
    j = l = null,
    a.attachEvent && function() {
        var a = b.createElement("div");
        a.innerHTML = "<elem></elem>";
        return a.childNodes.length !== 1
    }() && function(a, b) {
        function s(a) {
            var b = -1;
            while (++b < g)
                a.createElement(f[b])
        }
        a.iepp = a.iepp || {};
        var d = a.iepp, e = d.html5elements || "abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", f = e.split("|"), g = f.length, h = new RegExp("(^|\\s)(" + e + ")","gi"), i = new RegExp("<(/*)(" + e + ")","gi"), j = /^\s*[\{\}]\s*$/, k = new RegExp("(^|[^\\n]*?\\s)(" + e + ")([^\\n]*)({[\\n\\w\\W]*?})","gi"), l = b.createDocumentFragment(), m = b.documentElement, n = m.firstChild, o = b.createElement("body"), p = b.createElement("style"), q = /print|all/, r;
        d.getCSS = function(a, b) {
            if (a + "" === c)
                return "";
            var e = -1, f = a.length, g, h = [];
            while (++e < f) {
                g = a[e];
                if (g.disabled)
                    continue;
                b = g.media || b,
                q.test(b) && h.push(d.getCSS(g.imports, b), g.cssText),
                b = "all"
            }
            return h.join("")
        }
        ,
        d.parseCSS = function(a) {
            var b = [], c;
            while ((c = k.exec(a)) != null)
                b.push(((j.exec(c[1]) ? "\n" : c[1]) + c[2] + c[3]).replace(h, "$1.iepp_$2") + c[4]);
            return b.join("\n")
        }
        ,
        d.writeHTML = function() {
            var a = -1;
            r = r || b.body;
            while (++a < g) {
                var c = b.getElementsByTagName(f[a])
                  , d = c.length
                  , e = -1;
                while (++e < d)
                    c[e].className.indexOf("iepp_") < 0 && (c[e].className += " iepp_" + f[a])
            }
            l.appendChild(r),
            m.appendChild(o),
            o.className = r.className,
            o.id = r.id,
            o.innerHTML = r.innerHTML.replace(i, "<$1font")
        }
        ,
        d._beforePrint = function() {
            p.styleSheet.cssText = d.parseCSS(d.getCSS(b.styleSheets, "all")),
            d.writeHTML()
        }
        ,
        d.restoreHTML = function() {
            o.innerHTML = "",
            m.removeChild(o),
            m.appendChild(r)
        }
        ,
        d._afterPrint = function() {
            d.restoreHTML(),
            p.styleSheet.cssText = ""
        }
        ,
        s(b),
        s(l);
        d.disablePP || (n.insertBefore(p, n.firstChild),
        p.media = "print",
        p.className = "iepp-printshim",
        a.attachEvent("onbeforeprint", d._beforePrint),
        a.attachEvent("onafterprint", d._afterPrint))
    }(a, b),
    e._version = d,
    e._prefixes = o,
    e._domPrefixes = p,
    e.hasEvent = w,
    e.testProp = function(a) {
        return E([a])
    }
    ,
    e.testAllProps = F,
    e.testStyles = v,
    g.className = g.className.replace(/\bno-js\b/, "") + (f ? " js " + u.join(" ") : "");
    return e
}(this, this.document),
function(a, b, c) {
    function k(a) {
        return !a || a == "loaded" || a == "complete"
    }
    function j() {
        var a = 1
          , b = -1;
        while (p.length - ++b)
            if (p[b].s && !(a = p[b].r))
                break;
        a && g()
    }
    function i(a) {
        var c = b.createElement("script"), d;
        c.src = a.s,
        c.onreadystatechange = c.onload = function() {
            !d && k(c.readyState) && (d = 1,
            j(),
            c.onload = c.onreadystatechange = null)
        }
        ,
        m(function() {
            d || (d = 1,
            j())
        }, H.errorTimeout),
        a.e ? c.onload() : n.parentNode.insertBefore(c, n)
    }
    function h(a) {
        var c = b.createElement("link"), d;
        c.href = a.s,
        c.rel = "stylesheet",
        c.type = "text/css",
        !a.e && (w || r) ? function a(b) {
            m(function() {
                if (!d)
                    try {
                        b.sheet.cssRules.length ? (d = 1,
                        j()) : a(b)
                    } catch (c) {
                        c.code == 1e3 || c.message == "security" || c.message == "denied" ? (d = 1,
                        m(function() {
                            j()
                        }, 0)) : a(b)
                    }
            }, 0)
        }(c) : (c.onload = function() {
            d || (d = 1,
            m(function() {
                j()
            }, 0))
        }
        ,
        a.e && c.onload()),
        m(function() {
            d || (d = 1,
            j())
        }, H.errorTimeout),
        !a.e && n.parentNode.insertBefore(c, n)
    }
    function g() {
        var a = p.shift();
        q = 1,
        a ? a.t ? m(function() {
            a.t == "c" ? h(a) : i(a)
        }, 0) : (a(),
        j()) : q = 0
    }
    function f(a, c, d, e, f, h) {
        function i() {
            !o && k(l.readyState) && (r.r = o = 1,
            !q && j(),
            l.onload = l.onreadystatechange = null,
            m(function() {
                u.removeChild(l)
            }, 0))
        }
        var l = b.createElement(a)
          , o = 0
          , r = {
            t: d,
            s: c,
            e: h
        };
        l.src = l.data = c,
        !s && (l.style.display = "none"),
        l.width = l.height = "0",
        a != "object" && (l.type = d),
        l.onload = l.onreadystatechange = i,
        a == "img" ? l.onerror = i : a == "script" && (l.onerror = function() {
            r.e = r.r = 1,
            g()
        }
        ),
        p.splice(e, 0, r),
        u.insertBefore(l, s ? null : n),
        m(function() {
            o || (u.removeChild(l),
            r.r = r.e = o = 1,
            j())
        }, H.errorTimeout)
    }
    function e(a, b, c) {
        var d = b == "c" ? z : y;
        q = 0,
        b = b || "j",
        C(a) ? f(d, a, b, this.i++, l, c) : (p.splice(this.i++, 0, a),
        p.length == 1 && g());
        return this
    }
    function d() {
        var a = H;
        a.loader = {
            load: e,
            i: 0
        };
        return a
    }
    var l = b.documentElement, m = a.setTimeout, n = b.getElementsByTagName("script")[0], o = {}.toString, p = [], q = 0, r = "MozAppearance"in l.style, s = r && !!b.createRange().compareNode, t = r && !s, u = s ? l : n.parentNode, v = a.opera && o.call(a.opera) == "[object Opera]", w = "webkitAppearance"in l.style, x = w && "async"in b.createElement("script"), y = r ? "object" : v || x ? "img" : "script", z = w ? "img" : y, A = Array.isArray || function(a) {
        return o.call(a) == "[object Array]"
    }
    , B = function(a) {
        return typeof a == "object"
    }, C = function(a) {
        return typeof a == "string"
    }, D = function(a) {
        return o.call(a) == "[object Function]"
    }, E = [], F = {}, G, H;
    H = function(a) {
        function f(a) {
            var b = a.split("!"), c = E.length, d = b.pop(), e = b.length, f = {
                url: d,
                origUrl: d,
                prefixes: b
            }, g, h;
            for (h = 0; h < e; h++)
                g = F[b[h]],
                g && (f = g(f));
            for (h = 0; h < c; h++)
                f = E[h](f);
            return f
        }
        function e(a, b, e, g, h) {
            var i = f(a)
              , j = i.autoCallback;
            if (!i.bypass) {
                b && (b = D(b) ? b : b[a] || b[g] || b[a.split("/").pop().split("?")[0]]);
                if (i.instead)
                    return i.instead(a, b, e, g, h);
                e.load(i.url, i.forceCSS || !i.forceJS && /css$/.test(i.url) ? "c" : c, i.noexec),
                (D(b) || D(j)) && e.load(function() {
                    d(),
                    b && b(i.origUrl, h, g),
                    j && j(i.origUrl, h, g)
                })
            }
        }
        function b(a, b) {
            function c(a) {
                if (C(a))
                    e(a, h, b, 0, d);
                else if (B(a))
                    for (i in a)
                        a.hasOwnProperty(i) && e(a[i], h, b, i, d)
            }
            var d = !!a.test, f = d ? a.yep : a.nope, g = a.load || a.both, h = a.callback, i;
            c(f),
            c(g),
            a.complete && b.load(a.complete)
        }
        var g, h, i = this.yepnope.loader;
        if (C(a))
            e(a, 0, i, 0);
        else if (A(a))
            for (g = 0; g < a.length; g++)
                h = a[g],
                C(h) ? e(h, 0, i, 0) : A(h) ? H(h) : B(h) && b(h, i);
        else
            B(a) && b(a, i)
    }
    ,
    H.addPrefix = function(a, b) {
        F[a] = b
    }
    ,
    H.addFilter = function(a) {
        E.push(a)
    }
    ,
    H.errorTimeout = 1e4,
    b.readyState == null && b.addEventListener && (b.readyState = "loading",
    b.addEventListener("DOMContentLoaded", G = function() {
        b.removeEventListener("DOMContentLoaded", G, 0),
        b.readyState = "complete"
    }
    , 0)),
    a.yepnope = d()
}(this, this.document),
Modernizr.load = function() {
    yepnope.apply(window, [].slice.call(arguments, 0))
}
;

/* - livesearch.js - */
// https://www.unibo.it/portal_javascripts/livesearch.js?original=1
var livesearch = (function() {
    var _2 = 400
      , _7 = 400
      , _0 = {}
      , _1 = "LSHighlight";
    function _5(f, i) {
        var l = null
          , r = null
          , c = {}
          , re = f.find('div.LSResult')
          , q = f.attr('action').replace(f.data('action') || '@@search', re.data('livesearch') || 'livesearch_reply')
          , s = f.find('div.LSShadow')
          , p = f.find('input[name="path"]');
        function _12() {
            re.hide();
            l = null
        }
        function _6() {
            window.setTimeout('livesearch.hide("' + f.attr('id') + '")', _7)
        }
        function _11(d) {
            re.show();
            s.html(d)
        }
        function _14() {
            var sort_on = function() {
                var parameters = location.search
                  , sorton_position = parameters.indexOf('sort_on');
                if (sorton_position === -1) {
                    var s = $('#search-results');
                    if (s.length > 0) {
                        return s.attr('data-default-sort')
                    }
                    return ''
                }
                var sort_on = parameters.substring(sorton_position);
                sort_on = sort_on.split('&')[0];
                sort_on = sort_on.split('=')[1];
                return sort_on
            }();
            if (l === i.value) {
                return
            }
            l = i.value;
            if (r && r.readyState < 4) {
                r.abort()
            }
            if (i.value.length < 2) {
                _12();
                return
            }
            var qu = {
                q: i.value
            };
            if (p.length && p[0].checked) {
                qu.path = p.val()
            }
            if (sort_on !== '') {
                qu.sortOn = sort_on
            }
            qu = jQuery.param(qu);
            if (c[qu]) {
                _11(c[qu]);
                return
            }
            r = jQuery.get(q, qu, function(d) {
                _11(d);
                c[qu] = d
            }, 'text')
        }
        function _4() {
            window.setTimeout('livesearch.search("' + f.attr('id') + '")', _2)
        }
        return {
            hide: _12,
            hide_delayed: _6,
            search: _14,
            search_delayed: _4
        }
    }
    function _3(f) {
        var t = null
          , re = f.find('div.LSResult')
          , s = f.find('div.LSShadow');
        function _16() {
            var c = s.find('li.LSHighlight').removeClass(_1)
              , p = c.prev('li');
            if (!p.length) {
                p = s.find('li:last')
            }
            p.addClass(_1);
            return false
        }
        function _9() {
            var c = s.find('li.LSHighlight').removeClass(_1)
              , n = c.next('li');
            if (!n.length) {
                n = s.find('li:first')
            }
            n.addClass(_1);
            return false
        }
        function _8() {
            s.find('li.LSHighlight').removeClass(_1);
            re.hide()
        }
        function _10(e) {
            window.clearTimeout(t);
            switch (e.keyCode) {
            case 38:
                return _16();
            case 40:
                return _9();
            case 27:
                return _8();
            case 37:
                break;
            case 39:
                break;
            default:
                t = window.setTimeout('livesearch.search("' + f.attr('id') + '")', _2)
            }
        }
        function _13() {
            var t = s.find('li.LSHighlight a').attr('href');
            if (!t) {
                return
            }
            window.location = t;
            return false
        }
        return {
            handler: _10,
            submit: _13
        }
    }
    function _15(i) {
        var i = 'livesearch' + i
          , f = jQuery(this).parents('form:first')
          , k = _3(f);
        _0[i] = _5(f, this);
        f.attr('id', i).submit(k.submit);
        jQuery(this).attr('autocomplete', 'off').keydown(k.handler).focus(_0[i].search_delayed).blur(_0[i].hide_delayed)
    }
    jQuery(function() {
        jQuery("#searchGadget,input.portlet-search-gadget").each(_15)
    });
    return {
        search: function(id) {
            _0[id].search()
        },
        hide: function(id) {
            _0[id].hide()
        }
    }
}());

/* - ++resource++search.js - */
// https://www.unibo.it/portal_javascripts/++resource++search.js?original=1
jQuery(function($) {
    var query, pushState, popped, initialURL, $default_res_container = $('#search-results'), $search_filter = $('#search-filter'), $search_field = $('#search-field'), $search_gadget = $('#searchGadget'), $form_search_page = $("form.searchPage"), navigation_root_url = $('link[rel="home"]').attr('href') || window.navigation_root_url || window.portal_url;
    $.fn.pullSearchResults = function(query) {
        return this.each(function() {
            var $container = $(this);
            $.get('@@updated_search', query, function(data) {
                $container.hide();
                var $ajax_search_res = $('<div id="ajax-search-res"></div>').html(data)
                  , $search_term = $('#search-term');
                var $data_res = $ajax_search_res.find('#search-results').children()
                  , data_search_term = $ajax_search_res.find('#updated-search-term').text()
                  , data_res_number = $ajax_search_res.find('#updated-search-results-number').text()
                  , data_sorting_opt = $ajax_search_res.find('#updated-sorting-options').html();
                $container.html($data_res);
                $container.fadeIn();
                if (!$search_term.length) {
                    $search_term = $('<strong id="search-term" />').appendTo('h1.documentFirstHeading')
                }
                $search_term.text(data_search_term);
                $('#search-results-number').text(data_res_number);
                $('#search-results-bar').find('#sorting-options').html(data_sorting_opt);
                $('#rss-subscription').find('a.link-feed').attr('href', function() {
                    return navigation_root_url + '/search_rss?' + query
                })
            })
        })
    }
    ;
    pushState = function(query) {
        if (Modernizr.history) {
            var url = navigation_root_url + '/@@search?' + query;
            history.pushState(null, null, url)
        }
    }
    ;
    popped = (window.history && 'state'in window.history);
    initialURL = location.href;
    $(window).bind('popstate', function(event) {
        var initialPop, str;
        initialPop = !popped && location.href === initialURL;
        popped = true;
        if (initialPop) {
            return
        }
        if (!location.search) {
            return
        }
        query = location.search.split('?')[1];
        var results = query.match(/SearchableText=[^&]*/);
        if (results) {
            str = results[0];
            str = decodeURIComponent(str.replace(/\+/g, ' '));
            // we remove '+' used between words
            $.merge($search_field.find('input[name="SearchableText"]'), $search_gadget).val(str.substr(15, str.length));
            $default_res_container.pullSearchResults(query)
        }
    });
    $search_filter.find('input.searchPage[type="submit"]').hide();
    $search_field.find('input.searchButton').click(function(e) {
        var st, queryString = location.search.substring(1), re = /([^&=]+)=([^&]*)/g, m, queryParameters = [], key;
        st = $search_field.find('input[name="SearchableText"]').val();
        queryParameters.push({
            "name": "SearchableText",
            "value": st
        });
        while (m = re.exec(queryString)) {
            key = decodeURIComponent(m[1]);
            if (key !== 'SearchableText') {
                queryParameters.push({
                    "name": key,
                    "value": decodeURIComponent(m[2].replace(/\+/g, ' '))
                })
            }
        }
        queryString = $.param(queryParameters);
        $default_res_container.pullSearchResults(queryString);
        pushState(queryString);
        e.preventDefault()
    });
    $form_search_page.submit(function(e) {
        query = $(this).serialize();
        $default_res_container.pullSearchResults(query);
        pushState(query);
        e.preventDefault()
    });
    $search_field.find('input[name="SearchableText"]').keyup(function() {
        $search_gadget.val($(this).val())
    });
    $('#search-results-bar').find('dl.actionMenu > dd.actionMenuContent').click(function(e) {
        e.stopImmediatePropagation()
    });
    $search_filter.delegate('input, select', 'change', function(e) {
        query = '';
        if ($search_filter.find('input:checked').length > 1) {
            query = $form_search_page.serialize()
        }
        $default_res_container.pullSearchResults(query);
        pushState(query)
    });
    $('#sorting-options').delegate('a', 'click', function(e) {
        if ($(this).attr('data-sort')) {
            $form_search_page.find("input[name='sort_on']").val($(this).attr('data-sort'))
        } else {
            $form_search_page.find("input[name='sort_on']").val('')
        }
        query = this.search.split('?')[1];
        $default_res_container.pullSearchResults(query);
        pushState(query);
        e.preventDefault()
    });
    $default_res_container.delegate('.listingBar a', 'click', function(e) {
        query = this.search.split('?')[1];
        $default_res_container.pullSearchResults(query);
        pushState(query);
        e.preventDefault()
    })
});

/* - select_all.js - */
// https://www.unibo.it/portal_javascripts/select_all.js?original=1
function toggleSelect(selectbutton, id, initialState, formName) {
    if (/MSIE [5-8]\./.test(navigator.userAgent) && event.type === "change" && /toggleSelect\(/.test(selectbutton.onchange.toString())) {
        return
    }
    var fid, state, base;
    fid = id || 'ids:list';
    state = selectbutton.isSelected;
    if (state === undefined) {
        state = Boolean(initialState)
    }
    selectbutton.isSelected = !state;
    jQuery(selectbutton).attr('src', portal_url + '/select_' + (state ? 'all' : 'none') + '_icon.png');
    base = formName ? jQuery(document.forms[formName]) : jQuery(document);
    base.find('input[name="' + fid + '"]:checkbox').prop('checked', !state)
}

/* - dragdropreorder.js - */
// https://www.unibo.it/portal_javascripts/dragdropreorder.js?original=1
var ploneDnDReorder = {};
ploneDnDReorder.dragging = null;
ploneDnDReorder.table = null;
ploneDnDReorder.rows = null;
ploneDnDReorder.locked = false;
(function($) {
    ploneDnDReorder.doDown = function(e) {
        var dragging = ploneDnDReorder.dragging, body;
        if (ploneDnDReorder.locked) {
            return
        }
        if (dragging) {
            if ($(this).attr('id') !== dragging.attr('id')) {
                ploneDnDReorder.locked = true;
                dragging.removeClass('dragging').addClass('error')
            }
            return
        }
        dragging = $(this).parents('.draggable:first');
        if (!dragging.length) {
            return
        }
        ploneDnDReorder.rows.mousemove(ploneDnDReorder.doDrag);
        body = $('body');
        body.mouseup(ploneDnDReorder.doUp);
        body.mouseleave(ploneDnDReorder.doCancel);
        ploneDnDReorder.dragging = dragging;
        dragging.data('ploneDnDReorder.startPosition', ploneDnDReorder.getPos(dragging));
        dragging.addClass("dragging");
        $(this).parents('tr').addClass('dragindicator');
        dragging.data('ploneDnDReorder.subset_ids', $.map(ploneDnDReorder.table.find('tr.draggable'), function(elem) {
            return $(elem).attr('id').substr('folder-contents-item-'.length)
        }));
        return false
    }
    ;
    ploneDnDReorder.getPos = function(node) {
        var pos = node.parent().children('.draggable').index(node[0]);
        return pos === -1 ? null : pos
    }
    ;
    ploneDnDReorder.doDrag = function(e) {
        var dragging = ploneDnDReorder.dragging
          , target = this;
        if (!dragging) {
            return
        }
        if (!target) {
            return
        }
        if ($(target).attr('id') !== dragging.attr('id')) {
            ploneDnDReorder.swapElements($(target), dragging)
        }
        return false
    }
    ;
    ploneDnDReorder.swapElements = function(child1, child2) {
        var parent = child1.parent(), items = parent.children('[id]'), t;
        if (Math.abs(ploneDnDReorder.getPos(child1) - ploneDnDReorder.getPos(child2)) !== 1) {
            return
        }
        items.removeClass('even').removeClass('odd');
        if (child1[0].swapNode) {
            child1[0].swapNode(child2[0])
        } else {
            t = parent[0].insertBefore(document.createTextNode(''), child1[0]);
            child1.insertBefore(child2);
            child2.insertBefore(t);
            $(t).remove()
        }
        parent.children('[id]:odd').addClass('even');
        parent.children('[id]:even').addClass('odd')
    }
    ;
    ploneDnDReorder.doUp = function(e) {
        var dragging = ploneDnDReorder.dragging
          , body = $('body');
        if (!dragging) {
            return
        }
        ploneDnDReorder.updatePositionOnServer();
        dragging.removeData('ploneDnDReorder.startPosition');
        dragging.removeData('ploneDnDReorder.subset_ids');
        ploneDnDReorder.rows.unbind('mousemove', ploneDnDReorder.doDrag);
        body.unbind('mouseup', ploneDnDReorder.doUp);
        body.unbind('mouseleave', ploneDnDReorder.doCancel);
        $(this).parents('tr').removeClass('dragindicator');
        return false
    }
    ;
    ploneDnDReorder.doCancel = function(e) {
        var dragging = ploneDnDReorder.dragging
          , body = $('body');
        if (!dragging) {
            return
        }
        dragging.removeClass("dragging");
        dragging.removeClass('dragindicator');
        if (ploneDnDReorder.getPos(dragging) - dragging.data('ploneDnDReorder.startPosition')) {
            ploneDnDReorder.locked = true;
            dragging.addClass("error")
        }
        ploneDnDReorder.rows.unbind('mousemove', ploneDnDReorder.doDrag);
        body.unbind('mouseup', ploneDnDReorder.doCancel);
        body.unbind('mouseleave', ploneDnDReorder.doCancel);
        ploneDnDReorder.dragging = null;
        return false
    }
    ;
    ploneDnDReorder.updatePositionOnServer = function() {
        var dragging = ploneDnDReorder.dragging, delta, args, encoded;
        if (!dragging) {
            return
        }
        delta = ploneDnDReorder.getPos(dragging) - dragging.data('ploneDnDReorder.startPosition');
        if (delta === 0) {
            ploneDnDReorder.doCancel.call();
            return
        }
        args = {
            item_id: dragging.attr('id').substr('folder-contents-item-'.length),
            subset_ids: dragging.data('ploneDnDReorder.subset_ids')
        };
        args['delta:int'] = delta;
        encoded = $.param(args).replace(/%5B%5D=/g, '%3Alist=');
        $.ajax({
            type: 'POST',
            url: 'folder_moveitem',
            data: encoded,
            complete: ploneDnDReorder.complete
        });
        ploneDnDReorder.locked = true
    }
    ;
    ploneDnDReorder.complete = function(xhr, textStatus) {
        var dragging = ploneDnDReorder.dragging;
        dragging.removeClass("dragging");
        dragging.removeClass('dragindicator');
        if (textStatus === "success" || textStatus === "notmodified") {
            ploneDnDReorder.locked = false
        } else {
            dragging.addClass("error")
        }
        ploneDnDReorder.dragging = null
    }
}(jQuery));
function initializeDnDReorder(table_selector) {
    var table = table_selector;
    ploneDnDReorder.table = jQuery(table);
    if (!ploneDnDReorder.table.length)
        return;
    ploneDnDReorder.rows = jQuery(table + " > tr," + table + " > tbody > tr");
    jQuery(table + " > tr > td.draggable," + table + " > tbody > tr > td.draggable").not('.notDraggable').mousedown(ploneDnDReorder.doDown).mouseup(ploneDnDReorder.doUp).addClass("draggingHook").css("cursor", "ns-resize").html('&#x28ff;')
}
$(document).ready(function() {
    initializeDnDReorder('#listing-table')
});

/* - mark_special_links.js - */
// https://www.unibo.it/portal_javascripts/mark_special_links.js?original=1
function scanforlinks() {
    var elonw, mslinks, url, protocols, contentarea, res;
    if (typeof external_links_open_new_window === 'string') {
        elonw = external_links_open_new_window.toLowerCase() === 'true'
    } else {
        elonw = false
    }
    if (typeof mark_special_links === 'string') {
        mslinks = mark_special_links.toLowerCase() === 'true'
    } else {
        mslinks = false
    }
    url = window.location.protocol + '//' + window.location.host;
    if (elonw) {
        jQuery('a[href^="http"]:not(.link-plain):not([href^="' + url + '"])').attr('target', '_blank').attr('rel', 'noopener')
    }
    if (mslinks) {
        protocols = /^(mailto|ftp|news|irc|h323|sip|callto|https|feed|webcal)/;
        contentarea = jQuery('#region-content,#content');
        contentarea.find('a[href^="http"]:not(.link-plain):not([href^="' + url + '"]):not(:has(img))').wrap('<span></span>').parent().addClass('link-external');
        contentarea.find('a[href]:not([href^="http"]):not(.link-plain):not([href^="' + url + '"]):not(:has(img))').each(function() {
            res = protocols.exec(this.href);
            if (res) {
                jQuery(this).wrap('<span></span>').parent().addClass('link-' + res[0])
            }
        })
    }
}
jQuery(scanforlinks);

/* - collapsiblesections.js - */
// https://www.unibo.it/portal_javascripts/collapsiblesections.js?original=1
function activateCollapsibles() {
    (function($) {
        $('dl.collapsible:not([class$=Collapsible])').find('dt.collapsibleHeader:first').click(function() {
            var c = $(this).parents('dl.collapsible:first'), t;
            if (!c) {
                return true
            }
            t = c.hasClass('inline') ? 'Inline' : 'Block';
            c.toggleClass('collapsed' + t + 'Collapsible').toggleClass('expanded' + t + 'Collapsible')
        }).end().each(function() {
            var s = $(this).hasClass('collapsedOnLoad') ? 'collapsed' : 'expanded'
              , t = $(this).hasClass('inline') ? 'Inline' : 'Block';
            $(this).removeClass('collapsedOnLoad').addClass(s + t + 'Collapsible')
        })
    }(jQuery))
}
jQuery(function($) {
    $(activateCollapsibles)
});

/* - popupforms.js - */
// https://www.unibo.it/portal_javascripts/popupforms.js?original=1
function msieversion() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    if (msie > 0) {
        return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)))
    } else {
        return 0
    }
}
var common_content_filter = '#content>*:not(div.configlet),dl.portalMessage.error,dl.portalMessage.warning,dl.portalMessage.info';
jQuery.extend(jQuery.tools.overlay.conf, {
    fixed: false,
    speed: 'fast',
    mask: {
        color: '#fff',
        opacity: 0.4,
        loadSpeed: 0,
        closeSpeed: 0
    }
});
(function($) {
    $.plonepopups = $.plonepopups || {};
    $.extend($.plonepopups, {
        noformerrorshow: function noformerrorshow(el, noform) {
            var o = $(el)
              , emsg = o.find('dl.portalMessage.error');
            if (emsg.length) {
                o.children().replaceWith(emsg);
                return false
            } else {
                return noform
            }
        },
        redirectbasehref: function redirectbasehref(el, responseText) {
            var mo = responseText.match(/<base href="(\S+?)"/i);
            if (mo.length === 2) {
                return mo[1]
            }
            return location
        }
    })
}
)(jQuery);
jQuery(function($) {
    if (msieversion() > 0 && msieversion() < 7) {
        return
    }
    $('#portal-personaltools a[href$="/login"], #portal-personaltools a[href$="/login_form"], .discussion a[href$="/login"], .discussion a[href$="/login_form"]').prepOverlay({
        subtype: 'ajax',
        filter: common_content_filter,
        formselector: 'form#login_form',
        cssclass: 'overlay-login',
        noform: function() {
            if (location.href.search(/pwreset_finish$/) >= 0) {
                return 'redirect'
            } else {
                return 'reload'
            }
        },
        redirect: function() {
            var href = location.href;
            if (href.search(/pwreset_finish$/) >= 0) {
                return href.slice(0, href.length - 14) + 'logged_in'
            } else {
                return href
            }
        }
    });
    $('#siteaction-contact a').prepOverlay({
        subtype: 'ajax',
        filter: common_content_filter,
        cssclass: 'overlay-contact',
        formselector: 'form[name="feedback_form"]',
        noform: function(el) {
            return $.plonepopups.noformerrorshow(el, 'close')
        }
    });
    $('#contextSetDefaultPage, #folderChangeDefaultPage').prepOverlay({
        subtype: 'ajax',
        filter: common_content_filter,
        cssclass: 'overlay-default_view',
        formselector: 'form[name="default_page_form"]',
        noform: function(el) {
            return $.plonepopups.noformerrorshow(el, 'reload')
        },
        closeselector: '[name="form.button.Cancel"]',
        width: '40%'
    });
    $('dl#plone-contentmenu-actions a#plone-contentmenu-actions-delete').prepOverlay({
        subtype: 'ajax',
        filter: common_content_filter,
        formselector: '#delete_confirmation',
        cssclass: 'overlay-delete',
        noform: function(el) {
            return $.plonepopups.noformerrorshow(el, 'redirect')
        },
        redirect: $.plonepopups.redirectbasehref,
        closeselector: '[name="form.button.Cancel"]',
        width: '50%'
    });
    $('dl#plone-contentmenu-actions a#plone-contentmenu-actions-rename').prepOverlay({
        subtype: 'ajax',
        filter: common_content_filter,
        cssclass: 'overlay-rename',
        closeselector: '[name="form.button.Cancel"]',
        width: '40%'
    });
    $('dl#plone-contentmenu-factories a#plone-contentmenu-add-to-default-page').prepOverlay({
        subtype: 'ajax',
        filter: common_content_filter,
        cssclass: 'overlay-folder-factories',
        closeselector: '[name="form.button.Cancel"]',
        width: '40%'
    });
    $('#portal-personaltools a[href$="/@@register"]').prepOverlay({
        subtype: 'ajax',
        filter: common_content_filter,
        cssclass: 'overlay-register',
        formselector: 'form.kssattr-formname-register'
    });
    $('form[name="users_add"], form[name="groups_add"]').prepOverlay({
        subtype: 'ajax',
        filter: common_content_filter,
        cssclass: 'overlay-users',
        formselector: 'form.kssattr-formname-new-user, form[name="groups"]',
        noform: function(el) {
            return $.plonepopups.noformerrorshow(el, 'redirect')
        },
        redirect: function() {
            return location.href
        }
    });
    $('form[name="users_add"], form[name="groups_add"]').width($('input.add').outerWidth());
    $('form[name="users_add"] input.add, form[name="groups_add"] input.add').css('cursor', 'pointer');
    $('#content-history a').prepOverlay({
        subtype: 'ajax',
        filter: 'h2, #content-history',
        cssclass: 'overlay-history',
        urlmatch: '@@historyview',
        urlreplace: '@@contenthistorypopup'
    })
});

/* - first_input_focus.js - */
// https://www.unibo.it/portal_javascripts/first_input_focus.js?original=1
jQuery(function($) {
    if ($("form div.error :input:first").focus().length) {
        return
    }
    $("form.enableAutoFocus :input:not(.formTabs):visible:first").focus()
});

/* - accessibility.js - */
// https://www.unibo.it/portal_javascripts/accessibility.js?original=1
function setBaseFontSize(f, r) {
    var b = jQuery('body');
    if (r) {
        b.removeClass('smallText').removeClass('largeText');
        createCookie("fontsize", f, 365)
    }
    b.addClass(f)
}
jQuery(function($) {
    var f = readCookie("fontsize");
    if (f) {
        setBaseFontSize(f, 0)
    }
});

/* - styleswitcher.js - */
// https://www.unibo.it/portal_javascripts/styleswitcher.js?original=1
function setActiveStyleSheet(title, reset) {
    jQuery('link[rel*=style][title]').attr('disabled', true).find('[title=' + title + ']').attr('disabled', false);
    if (reset) {
        createCookie("wstyle", title, 365)
    }
}
jQuery(function() {
    var style = readCookie("wstyle");
    if (style) {
        setActiveStyleSheet(style, 0)
    }
});

/* - toc.js - */
// https://www.unibo.it/portal_javascripts/toc.js?original=1
jQuery(function($) {
    var dest, content, location, stack, oltoc, numdigits, wlh, target, targetOffset;
    dest = $('dl.toc dd.portletItem');
    content = $('#region-content,#content');
    if (!content || !dest.length) {
        return
    }
    dest.empty();
    location = window.location.href;
    if (window.location.hash) {
        location = location.substring(0, location.lastIndexOf(window.location.hash))
    }
    stack = [];
    $(content).find('*').not('.comment > h3').filter(function() {
        return (/^h[1234]$/).test(this.tagName.toLowerCase())
    }).not('.documentFirstHeading').each(function(i) {
        var level, ol, li;
        level = this.nodeName.charAt(1);
        while (stack.length < level) {
            ol = $('<ol>');
            if (stack.length) {
                li = $(stack[stack.length - 1]).children('li:last');
                if (!li.length) {
                    li = $('<li>').appendTo($(stack[stack.length - 1]))
                }
                li.append(ol)
            }
            stack.push(ol)
        }
        while (stack.length > level) {
            stack.pop()
        }
        $(this).before($('<a name="section-' + i + '" />'));
        $('<li>').append($('<a />').attr('href', location + '#section-' + i).text($(this).text())).appendTo($(stack[stack.length - 1]))
    });
    if (stack.length) {
        var oltoc = $(stack[0]);
        var i = 1;
        while (oltoc.children('li').length == 1) {
            oltoc = $(stack[i]);
            i += 1
        }
        if (i <= stack.length) {
            $('dl.toc').show()
        }
        numdigits = oltoc.children().length.toString().length;
        oltoc.addClass("TOC" + numdigits + "Digit");
        dest.append(oltoc);
        wlh = window.location.hash;
        if (wlh) {
            target = $(wlh);
            target = target.length && target || $('[name="' + wlh.slice(1) + '"]');
            targetOffset = target.offset();
            if (targetOffset) {
                $('html,body').animate({
                    scrollTop: targetOffset.top
                }, 0)
            }
        }
    }
});

/* - collapsibleformfields.js - */
// https://www.unibo.it/portal_javascripts/collapsibleformfields.js?original=1
(function($) {
    $.fn.do_search_collapse = function() {
        function check_used(element) {
            var e = $(element);
            if (e.find('input[id$=_toggle]:checkbox').length > 0) {
                if (e.find('input[id$=_toggle]:checkbox:checked').length === 0) {
                    return true
                }
            }
            if (e.find(':text[value]').length > 0) {
                return true
            }
            if (e.find('select .default_option').length > 0) {
                if (e.find('select .default_option:selected').length === 0) {
                    return true
                }
            }
            return false
        }
        return this.each(function() {
            var indicator = $(this).find('.collapser:first')
              , collapse = $(this).find('.collapse:first');
            indicator.click(function() {
                var container = $(this).parent()
                  , target = container.find('.collapse:first');
                target.slideToggle('normal');
                $(this).toggleClass('expanded');
                $(this).toggleClass('collapsed')
            });
            if (check_used(this)) {
                indicator.addClass('expanded')
            } else {
                collapse.hide();
                indicator.addClass('collapsed')
            }
        })
    }
    ;
    jQuery(function($) {
        $('.field.collapsible').do_search_collapse()
    })
}(jQuery));

/* - ++resource++plone.app.discussion.javascripts/comments.js - */
// https://www.unibo.it/portal_javascripts/++resource++plone.app.discussion.javascripts/comments.js?original=1
(function($) {
    $.createReplyForm = function(comment_div) {
        var comment_id = comment_div.attr("id");
        var reply_button = comment_div.find(".reply-to-comment-button");
        var reply_div = $("#commenting").clone(true);
        reply_div.find("#formfield-form-widgets-captcha").find("script").remove();
        reply_div.appendTo(comment_div).css("display", "none");
        reply_div.removeAttr("id");
        $(reply_button).css("display", "none");
        var reply_form = reply_div.find("form");
        reply_form.find("input[name='form.widgets.in_reply_to']").val(comment_id);
        var cancel_reply_button = reply_div.find(".cancelreplytocomment");
        cancel_reply_button.attr("id", comment_id);
        reply_form.find("input[name='form.buttons.cancel']").css("display", "inline");
        reply_div.slideDown("slow");
        cancel_reply_button.css("display", "inline")
    }
    ;
    $.clearForm = function(form_div) {
        form_div.find(".error").removeClass("error");
        form_div.find(".fieldErrorBox").remove();
        form_div.find("input[type='text']").attr("value", "");
        form_div.find("textarea").attr("value", "")
    }
    ;
    $(window).load(function() {
        var post_comment_div = $("#commenting");
        var in_reply_to_field = post_comment_div.find("input[name='form.widgets.in_reply_to']");
        if (in_reply_to_field.val() !== "") {
            var current_reply_id = "#" + in_reply_to_field.val();
            var current_reply_to_div = $(".discussion").find(current_reply_id);
            $.createReplyForm(current_reply_to_div);
            $.clearForm(post_comment_div)
        }
        $(".reply-to-comment-button").bind("click", function(e) {
            var comment_div = $(this).parents().filter(".comment");
            $.createReplyForm(comment_div);
            $.clearForm(comment_div)
        });
        $("#commenting #form-buttons-cancel").bind("click", function(e) {
            e.preventDefault();
            var reply_to_comment_button = $(this).parents().filter(".comment").find(".reply-to-comment-button");
            $.reply_to_comment_form = $(this).parents().filter(".reply");
            $.reply_to_comment_form.slideUp("slow", function() {
                $(this).remove()
            });
            reply_to_comment_button.css("display", "inline")
        });
        $("input[name='form.button.PublishComment']").on('click', function() {
            var trigger = this;
            var form = $(this).parents("form");
            var data = $(form).serialize();
            var form_url = $(form).attr("action");
            $.ajax({
                type: "GET",
                url: form_url,
                data: data,
                context: trigger,
                success: function(msg) {
                    form.find("input[name='form.button.PublishComment']").remove();
                    form.parents(".state-pending").toggleClass('state-pending').toggleClass('state-published')
                },
                error: function(msg) {
                    return true
                }
            });
            return false
        });
        $("form[name='edit']").prepOverlay({
            cssclass: 'overlay-edit-comment',
            width: '60%',
            subtype: 'ajax',
            filter: '#content>*'
        })
        $("input[name='form.button.DeleteComment']").on('click', function() {
            var trigger = this;
            var form = $(this).parents("form");
            var data = $(form).serialize();
            var form_url = $(form).attr("action");
            $.ajax({
                type: 'POST',
                url: form_url,
                data: data,
                context: $(trigger).parents(".comment"),
                success: function(data) {
                    var comment = $(this);
                    var clss = comment.attr('class');
                    var treelevel = parseInt(clss[clss.indexOf('replyTreeLevel') + 'replyTreeLevel'.length], 10);
                    var selector = ".replyTreeLevel" + treelevel;
                    for (var i = 0; i < treelevel; i++) {
                        selector += ", .replyTreeLevel" + i
                    }
                    comment.nextUntil(selector).each(function() {
                        $(this).fadeOut('fast', function() {
                            $(this).remove()
                        })
                    });
                    $(this).fadeOut('fast', function() {
                        $(this).remove()
                    })
                },
                error: function(req, error) {
                    return true
                }
            });
            return false
        });
        $(".reply").find("input[name='form.buttons.reply']").css("display", "none");
        $(".reply").find("input[name='form.buttons.cancel']").css("display", "none");
        $(".reply-to-comment-button").css("display", "inline")
    })
}(jQuery));

/* - dropdown.js - */
// https://www.unibo.it/portal_javascripts/dropdown.js?original=1
function hideAllMenus() {
    jQuery('dl.actionMenu').removeClass('activated').addClass('deactivated')
}
function toggleMenuHandler(event) {
    jQuery(this).parents('.actionMenu:first').toggleClass('deactivated').toggleClass('activated');
    return false
}
function actionMenuDocumentMouseDown(event) {
    if (jQuery(event.target).parents('.actionMenu:first').length) {
        return true
    }
    hideAllMenus()
}
function actionMenuMouseOver(event) {
    var menu_id = jQuery(this).parents('.actionMenu:first').attr('id'), switch_menu;
    if (!menu_id) {
        return true
    }
    switch_menu = jQuery('dl.actionMenu.activated').length > 0;
    jQuery('dl.actionMenu').removeClass('activated').addClass('deactivated');
    if (switch_menu) {
        jQuery('#' + menu_id).removeClass('deactivated').addClass('activated')
    }
}
function initializeMenus() {
    jQuery(document).mousedown(actionMenuDocumentMouseDown);
    hideAllMenus();
    jQuery('dl.actionMenu dt.actionMenuHeader a').click(toggleMenuHandler).mouseover(actionMenuMouseOver);
    jQuery('dl.actionMenu > dd.actionMenuContent').click(hideAllMenus)
}
jQuery(initializeMenus);

/* - table_sorter.js - */
// https://www.unibo.it/portal_javascripts/table_sorter.js?original=1
(function($) {
    function sortabledataclass(cell) {
        var re, matches;
        re = new RegExp("sortabledata-([^ ]*)","g");
        matches = re.exec(cell.attr('class'));
        if (matches) {
            return matches[1]
        } else {
            return null
        }
    }
    function sortable(cell) {
        var text = sortabledataclass(cell);
        if (text === null) {
            text = cell.text()
        }
        if (text.charAt(4) !== '-' && text.charAt(7) !== '-' && !isNaN(parseFloat(text))) {
            return parseFloat(text)
        }
        return text.toLowerCase()
    }
    function sort() {
        var th, colnum, table, tbody, reverse, index, data, usenumbers, tsorted;
        th = $(this).closest('th');
        colnum = $('th', $(this).closest('thead')).index(th);
        table = $(this).parents('table:first');
        tbody = table.find('tbody:first');
        tsorted = parseInt(table.attr('sorted') || '-1', 10);
        reverse = tsorted === colnum;
        $(this).parent().find('th:not(.nosort) .sortdirection').html('&#x2003;');
        $(this).children('.sortdirection').html(reverse ? '&#x25b2;' : '&#x25bc;');
        index = $(this).parent().children('th').index(this),
        data = [],
        usenumbers = true;
        tbody.find('tr').each(function() {
            var cells, sortableitem;
            cells = $(this).children('td');
            sortableitem = sortable(cells.slice(index, index + 1));
            if (isNaN(sortableitem)) {
                usenumbers = false
            }
            data.push([sortableitem, sortable(cells.slice(1, 2)), sortable(cells.slice(0, 1)), this])
        });
        if (data.length) {
            if (usenumbers) {
                data.sort(function(a, b) {
                    return a[0] - b[0]
                })
            } else {
                data.sort()
            }
            if (reverse) {
                data.reverse()
            }
            table.attr('sorted', reverse ? '' : colnum);
            tbody.append($.map(data, function(a) {
                return a[3]
            }));
            tbody.each(setoddeven)
        }
    }
    function setoddeven() {
        var tbody = $(this);
        tbody.find('tr').removeClass('odd').removeClass('even').filter(':odd').addClass('even').end().filter(':even').addClass('odd')
    }
    $(function() {
        var blankarrow = $('<span>&#x2003;</span>').addClass('sortdirection');
        $('table.listing:not(.nosort) thead th:not(.nosort)').append(blankarrow.clone()).css('cursor', 'pointer').click(sort);
        $('table.listing:not(.nosort) tbody').each(setoddeven)
    })
}
)(jQuery);

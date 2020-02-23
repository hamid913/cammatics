if (!window.TrustedSite) {
    window.TrustedSite = {
        config: [],
        init: function () {
            this.log("init");
            if (navigator.userAgent.match(/; MSIE [6-9]/i)) {
                return
            }
            if (window.jQueryTs) {
                TrustedSite.load_config()
            } else {
                if (window.jQuery === undefined) {
                    var a = document.createElement("script");
                    a.setAttribute("type", "text/javascript");
                    a.setAttribute("src", "https://cdn.ywxi.net/static/jquery/1.12.4/jquery-1.12.4.min.js?2");
                    if (a.readyState) {
                        a.onreadystatechange = function () {
                            if (this.readyState == "complete" || this.readyState == "loaded") {
                                TrustedSite.jquery_ready()
                            }
                        }
                    } else {
                        a.onload = TrustedSite.jquery_ready
                    } (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(a)
                } else {
                    jQueryTs = window.jQuery;
                    TrustedSite.load_config()
                }
            }
        },
        jquery_ready: function () {
            jQueryTs = window.jQuery.noConflict(true);
            TrustedSite.load_config()
        },
        load_config: function () {
            TrustedSite.log("load_config");
            var a = new String(window.location.host).replace(/^www\./, "");
            var b = "https://s3-us-west-2.amazonaws.com/mfesecure-public/host/" + a + "/client.json?source=jsmain";
            jQueryTs.getJSON(b, function (c) {
                TrustedSite.config = c;
                TrustedSite.log("load_trustedsite");
                TrustedSite.log(TrustedSite.config);
                if (TrustedSite.config.error) {
                    return
                }
                TrustedSite.load_trustmark();
                if (TrustedSite.config.load_conversion) {
                    TrustedSite.load_conversion()
                }
            })
        },
        is_mobile: function () {
            return jQueryTs(window).height() <= 500 || jQueryTs(window).width() <= 500
        },
        load_trustmark: function () {
            if (TrustedSite.is_mobile() && TrustedSite.config.trustmark.disable_on_mobile) {
                return
            }
            if (document.getElementById("trustedsite-tm-float-disable")) {
                return
            }
            if (document.getElementsByClassName("trustedsite-tm-float-disable").length > 0) {
                return
            }
            var d = TrustedSite.yyyymmdd();
            var n = TrustedSite.config.host;
            var k = TrustedSite.config.trustmark.position_x;
            var a = TrustedSite.config.trustmark.position_y;
            var g = TrustedSite.config.trustmark.offset_x;
            if (1) {
                var l = TrustedSite.cookie_get("trustedsite_visit");
                if (!l) {
                    TrustedSite.cookie_set("trustedsite_visit", 1, 24 * 60);
                    TrustedSite.load_js("https://www.trustedsite.com/rpc/ajax?do=tmjs-visit&host=" + n + "&rand=" + new Date().getTime())
                }
            }
            if (!TrustedSite.config.trustmark.enabled) {
                return
            }
            var b = "png";
            var i = 105;
            if (TrustedSite.config.brand == "ts") {
                i = 205;
                b = "svg"
            }
            var h = "https://cdn.ywxi.net/meter/" + n + "/" + i + "." + b + "?ts=" + TrustedSite.config.timestamp;
            var f = a == "bottom" ? "top" : "bottom";
            var m = k == "right" ? "left" : "right";
            var c = document.getElementById("mfesecure-ts-style");
            if (!c) {
                jQueryTs('<style id="mfesecure-ts-style" type="text/css">.trustedsite-body-noscroll{ overflow:hidden !important; width:100% !important;}</style>').appendTo("head")
            }
            var j = document.createElement("div");
            j.id = "mfesecure-ts-image";
            j.title = TrustedSite.config.brand == "ts" ? "TrustedSite Certified" : "McAfee SECURE";
            j.style.cssText = TrustedSite.cleanStyleCss() + "position:fixed;height:38px !important;width:92px !important;overflow:hidden !important;" + a + ":0px !important;" + k + ":" + g + "px !important;z-index:1000003 !important;cursor:pointer !important;";
            j.oncontextmenu = function () {
                return false
            };
            j.onclick = function () {
                TrustedSite.toggleverify()
            };
            j.style.boxShadow = "0 0 5px 0 rgba(0,0,0,0.20)";
            j.style.backgroundColor = "#fff";
            j.style.backgroundImage = "url(" + h + ")";
            j.style.backgroundSize = "92px 38px";
            j.style.backgroundRepeat = "no-repeat";
            j.style.backgroundPosition = "center center";
            jQueryTs(j).css("border-" + f + "-" + m + "-radius", "2px");
            if (g > 0) {
                jQueryTs(j).css("border-" + f + "-" + k + "-radius", "2px")
            }
            if (TrustedSite.config.brand == "ts") {
                TrustedSite.animatetm(j)
            }
            document.body.appendChild(j)
        },
        animatetm: function (a) {
            if (TrustedSite.cookie_get("trustedsite_tm_float_seen")) {
                jQueryTs(a).css("bottom", "-13px")
            } else {
                TrustedSite.cookie_set("trustedsite_tm_float_seen", 1, 5);
                jQueryTs(a).css("bottom", "-92px");
                window.setTimeout(function () {
                    jQueryTs(a).css("bottom", "0px")
                }, 10);
                TrustedSite.animatetm_hide(a, 5000)
            }
            a.style.transition = "1s bottom linear";
            jQueryTs(a).mouseout(function () {
                TrustedSite.animatetm_hide(a, 1000)
            });
            jQueryTs(a).mouseover(function () {
                a.style.transition = "0.2s bottom ease";
                jQueryTs(this).css("bottom", "0px");
                window.clearTimeout(TrustedSite.animatetm_hide_to)
            })
        },
        animatetm_hide_to: 0,
        animatetm_hide: function (b, a) {
            TrustedSite.animatetm_hide_to = window.setTimeout(function () {
                b.style.transition = "0.2s all";
                jQueryTs(b).css("bottom", "-13px")
            }, a)
        },
        toggleverify: function (c) {
            if (!c) {
                c = TrustedSite.config.brand
            }
            var d = c == "ts" ? "https://www.trustedsite.com" : "https://www.mcafeesecure.com";
            if (jQueryTs(window).height() < 490 || jQueryTs(window).width() < 320 || TrustedSite.config.trustmark.disable_modal) {
                var j = d + "/verify?host=" + TrustedSite.config.host + "&popup=1";
                var i = window.open(j);
                if (!i) {
                    document.location = j
                }
                return
            }
            var j = d + "/verify-modal?host=" + TrustedSite.config.host;
            var l = document.getElementById("mfesecure-ts-verify");
            if (!l) {
                l = document.createElement("div");
                l.id = "mfesecure-ts-verify";
                TrustedSite.cleanStyle(l);
                l.style.position = "fixed";
                l.innerHTML = '<iframe style="' + TrustedSite.cleanStyleCss() + 'width:100%;height:100%;left:0;right:0;top:0;bottom:0;overflow-y:auto;overflow-x:hidden;" frameborder="0" scrolling="yes" src="' + j + '"></iframe>';
                l.style.background = "#e6e7e8";
                l.style.margin = "0";
                l.style.padding = "0";
                l.style.zIndex = "1000004";
                l.style.display = "none";
                document.body.appendChild(l)
            }
            var a = document.getElementById("mfesecure-ts-overlay");
            if (!a) {
                a = document.createElement("div");
                a.id = "mfesecure-ts-overlay";
                TrustedSite.cleanStyle(a);
                a.style.position = "fixed";
                a.style.top = "0px";
                a.style.right = "0px";
                a.style.left = "0px";
                a.style.bottom = "0px";
                a.style.width = "100%";
                a.style.height = "100%";
                a.style.background = "rgba(20, 20, 20, .95)";
                a.style.zIndex = "1000003";
                a.style.display = "none";
                a.onclick = function () {
                    TrustedSite.hideverify()
                };
                a.style.cursor = "zoom-out";
                document.body.appendChild(a)
            }
            var b = document.getElementById("mfesecure-ts-close");
            if (!b) {
                b = document.createElement("div");
                TrustedSite.cleanStyle(b);
                b.id = "mfesecure-ts-close";
                b.style.backgroundImage = "url(https://cdn.ywxi.net/static/img/modal-close.png)";
                b.style.backgroundSize = "11px 11px";
                b.style.backgroundRepeat = "no-repeat";
                b.style.backgroundPosition = "center center";
                b.style.zIndex = "1000005";
                b.style.position = "absolute";
                b.style.width = "11px";
                b.style.height = "11px";
                b.style.right = "10px";
                b.style.top = "-20px";
                b.style.cursor = "zoom-out";
                b.onclick = function () {
                    TrustedSite.hideverify()
                };
                l.appendChild(b)
            }
            if (jQueryTs("#mfesecure-ts-verify").is(":visible")) {
                TrustedSite.hideverify()
            } else {
                var k = window.innerWidth || jQueryTs(window).width();
                var g = window.innerHeight || jQueryTs(window).height();
                var i = k;
                if (i > 500) {
                    i = 500
                }
                var f = g - 60;
                if (f > 480) {
                    f = 480
                }
                l.style.width = i + "px";
                l.style.height = f + "px";
                l.style.top = ((g / 2) - (f / 2)) + "px";
                l.style.left = ((k / 2) - (i / 2)) + "px";
                jQueryTs("#mfesecure-ts-overlay").fadeIn(100);
                jQueryTs("#mfesecure-ts-verify").fadeIn(100);
                jQueryTs("body").addClass("trustedsite-body-noscroll")
            }
        },
        hideverify: function () {
            jQueryTs("#mfesecure-ts-overlay").remove();
            jQueryTs("#mfesecure-ts-verify").remove();
            jQueryTs("body").removeClass("trustedsite-body-noscroll")
        },
        load_conversion: function () {
            var a;
            if (TrustedSite.config.platform == "shopify") {
                if (location.pathname.endsWith("/thank_you")) {
                    a = Shopify.checkout.order_id
                }
            }
            if (TrustedSite.config.platform == "bigcommerce") { }
            if (!a) {
                return
            }
            var b = document.createElement("script");
            b.setAttribute("type", "text/javascript");
            b.setAttribute("class", "trustedsite-track-conversion");
            b.setAttribute("data-orderid", a);
            b.setAttribute("src", "https://cdn.ywxi.net/js/conversion.js");
            document.getElementsByTagName("head")[0].appendChild(b)
        },
        cleanStyle: function (a) {
            try {
                a.style.maxWidth = "none"
            } catch (b) { }
            try {
                a.style.minWidth = "none"
            } catch (b) { }
            try {
                a.style.maxHeight = "none"
            } catch (b) { }
            try {
                a.style.minHeight = "none"
            } catch (b) { }
        },
        cleanStyleCss: function () {
            return "margin:0;padding:0;border:0;background:none;max-width:none;max-height:none;"
        },
        cookie_set: function (b, f, g) {
            if (g) {
                var c = new Date();
                c.setTime(c.getTime() + (g * 60 * 1000));
                var a = "expires=" + c.toGMTString();
                document.cookie = b + "=" + f + "; path=/;" + a
            } else {
                document.cookie = b + "=" + f + "; path=/;"
            }
        },
        cookie_get: function (d) {
            var b = d + "=";
            var a = document.cookie.split(";");
            for (var f = 0; f < a.length; f++) {
                var g = a[f].trim();
                if (g.indexOf(b) == 0) {
                    return g.substring(b.length, g.length)
                }
            }
            return ""
        },
        load_js: function (b) {
            var a = document.createElement("script");
            a.setAttribute("type", "text/javascript");
            a.setAttribute("src", b);
            document.getElementsByTagName("head")[0].appendChild(a)
        },
        yyyymmdd: function () {
            var c = new Date();
            var b = c.getMonth() + 1;
            var a = c.getDate();
            return [c.getFullYear(), (b > 9 ? "" : "0") + b, (a > 9 ? "" : "0") + a].join("")
        },
        log: function (b, a) {
            if (!a && (!window.location.hash || window.location.hash.indexOf("TRUSTEDSITEDEBUG") == -1)) {
                return
            }
            console.log("trustedsite-main ", b);
            return 0
        },
    }
}
if (!window.TrustedSite_done) {
    window.TrustedSite_done = 1;
    TrustedSite.init()
}
try {
    window.addEventListener("message", function (a) {
        if (a.data && new String(a.data).indexOf("mfesecure_verifyhover_hide") == 0) {
            TrustedSite.hideverify()
        }
        if (a.data && new String(a.data).indexOf("trustedsite_verifyhover_hide") == 0) {
            TrustedSite.hideverify()
        }
    })
} catch (e) { }
if (!window.TrustedSiteInline) {
    window.TrustedSiteInline = {
        config: [],
        init: function () {
            this.log("init");
            if (navigator.userAgent.match(/; MSIE [6-9]/i)) {
                return
            }
            if (window.jQueryTs) {
                TrustedSiteInline.load_config()
            } else {
                if (window.jQuery === undefined) {
                    var a = document.createElement("script");
                    a.setAttribute("type", "text/javascript");
                    a.setAttribute("src", "https://cdn.ywxi.net/static/jquery/1.12.4/jquery-1.12.4.min.js?2");
                    if (a.readyState) {
                        a.onreadystatechange = function () {
                            if (this.readyState == "complete" || this.readyState == "loaded") {
                                TrustedSiteInline.jquery_ready()
                            }
                        }
                    } else {
                        a.onload = TrustedSiteInline.jquery_ready
                    } (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(a)
                } else {
                    jQueryTs = window.jQuery;
                    TrustedSiteInline.load_config()
                }
            }
        },
        jquery_ready: function () {
            jQueryTs = window.jQuery.noConflict(true);
            TrustedSiteInline.load_config()
        },
        load_config: function () {
            TrustedSiteInline.log("load_config");
            var a = new String(window.location.host).replace(/^www\./, "");
            var b = "//s3-us-west-2.amazonaws.com/mfesecure-public/host/" + a + "/client.json?source=jsmain";
            jQueryTs.getJSON(b, function (c) {
                TrustedSiteInline.config = c;
                TrustedSiteInline.log("load_trustedsite");
                TrustedSiteInline.log(TrustedSiteInline.config);
                if (TrustedSiteInline.config.error) {
                    return
                }
                if (TrustedSiteInline.config.secure && TrustedSiteInline.config.pro) {
                    TrustedSiteInline.load_inline()
                }
            })
        },
        load_inline: function () {
            var a = new String(window.location.host).replace(/^www\./, "");
            jQueryTs("div.mfes-trustmark:not(.loaded),div.trustedsite-trustmark:not(.loaded)").each(function () {
                if (jQueryTs(this).hasClass("loaded")) {
                    return
                }
                jQueryTs(this).addClass("loaded");
                TrustedSiteInline.load_inline_sub(this)
            })
        },
        load_inline_sub: function (g) {
            var f = new String(window.location.host).replace(/^www\./, "");
            var d = parseInt(jQueryTs(g).attr("data-type"));
            if (!d) {
                return
            }
            TrustedSiteInline.log("loading " + d);
            var a = [parseInt(jQueryTs(g).attr("data-width")), parseInt(jQueryTs(g).attr("data-height"))];
            var c = jQueryTs(g).attr("data-ext");
            if (c != "png" && c != "svg") {
                c = "svg"
            }
            var h = location.protocol === "https:" ? 1 : 0;
            var i = "mfe";
            if (d == 101) {
                a = TrustedSiteInline.calc_wh(a, 125, 55);
                c = "png"
            } else {
                if (d == 102) {
                    a = TrustedSiteInline.calc_wh(a, 90, 37)
                } else {
                    if (d == 103) {
                        a = TrustedSiteInline.calc_wh(a, 320, 40)
                    } else {
                        if (d == 202) {
                            if (TrustedSiteInline.config.brand != "ts") {
                                return
                            }
                            a = TrustedSiteInline.calc_wh(a, 120, 50);
                            i = "ts"
                        } else {
                            if (d == 204) {
                                if (TrustedSiteInline.config.brand != "ts") {
                                    return
                                }
                                a = TrustedSiteInline.calc_wh(a, 320, 70);
                                i = "ts"
                            } else {
                                if (d == 203) {
                                    if (TrustedSiteInline.config.brand != "ts") {
                                        return
                                    }
                                    a = TrustedSiteInline.calc_wh(a, 320, 40);
                                    i = "ts"
                                } else {
                                    if (d == 211 || d == 212 || d == 213) {
                                        if (TrustedSiteInline.config.brand != "ts") {
                                            return
                                        }
                                        if (!h) {
                                            return
                                        }
                                        a = TrustedSiteInline.calc_wh(a, 120, 50);
                                        i = "ts"
                                    } else {
                                        return
                                    }
                                }
                            }
                        }
                    }
                }
            }
            var b = "https://cdn.ywxi.net/meter/" + f + "/" + d + "." + c + "?ts=" + TrustedSiteInline.config.timestamp;
            if (c == "png") {
                b += "&w=" + (2 * a[0]) + "&h=" + (2 * a[1])
            }
            g.style.width = a[0] + "px";
            g.style.height = a[1] + "px";
            g.style.display = "inline-block";
            g.style.backgroundImage = "url(" + b + ")";
            g.style.backgroundSize = "contain";
            g.style.backgroundPosition = "top center";
            g.style.backgroundRepeat = "no-repeat";
            g.style.cursor = "pointer";
            g.onclick = function () {
                if (window.TrustedSite) {
                    window.TrustedSite.toggleverify(i)
                } else {
                    var j = i == "ts" ? "https://www.trustedsite.com" : "https://www.mcafeesecure.com";
                    j += "/verify?host=" + f;
                    window.open(j)
                }
            };
            g.oncontextmenu = function () {
                return false
            }
        },
        calc_wh: function (b, a, d) {
            var c = b && b.length == 2 ? b[0] : 0;
            var f = b && b.length == 2 ? b[1] : 0;
            if (c && c > 0) {
                return [c, parseInt(c / a * d)]
            }
            if (f && f > 0) {
                return [parseInt(f / d * a), f]
            }
            return [a, d]
        },
        log: function (b, a) {
            if (!a && (!window.location.hash || window.location.hash.indexOf("TRUSTEDSITEDEBUG") == -1)) {
                return
            }
            console.log("trustedsite-inline ", b);
            return 0
        },
    }
}
TrustedSiteInline.init();
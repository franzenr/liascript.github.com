ace.define("ace/ext/static.css",["require","exports","module"],(function(e,t,n){n.exports=".ace_static_highlight {\n    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', 'Droid Sans Mono', monospace;\n    font-size: 12px;\n    white-space: pre-wrap\n}\n\n.ace_static_highlight .ace_gutter {\n    width: 2em;\n    text-align: right;\n    padding: 0 3px 0 0;\n    margin-right: 3px;\n    contain: none;\n}\n\n.ace_static_highlight.ace_show_gutter .ace_line {\n    padding-left: 2.6em;\n}\n\n.ace_static_highlight .ace_line { position: relative; }\n\n.ace_static_highlight .ace_gutter-cell {\n    -moz-user-select: -moz-none;\n    -khtml-user-select: none;\n    -webkit-user-select: none;\n    user-select: none;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    position: absolute;\n}\n\n\n.ace_static_highlight .ace_gutter-cell:before {\n    content: counter(ace_line, decimal);\n    counter-increment: ace_line;\n}\n.ace_static_highlight {\n    counter-reset: ace_line;\n}\n"})),ace.define("ace/ext/static_highlight",["require","exports","module","ace/edit_session","ace/layer/text","ace/ext/static.css","ace/config","ace/lib/dom","ace/lib/lang"],(function(e,t,n){"use strict";function i(e){this.type=e,this.style={},this.textContent=""}var s=e("../edit_session").EditSession,o=e("../layer/text").Text,r=e("./static.css"),a=e("../config"),c=e("../lib/dom"),l=e("../lib/lang").escapeHTML;i.prototype.cloneNode=function(){return this},i.prototype.appendChild=function(e){this.textContent+=e.toString()},i.prototype.toString=function(){var e=[];if("fragment"!=this.type){e.push("<",this.type),this.className&&e.push(" class='",this.className,"'");var t=[];for(var n in this.style)t.push(n,":",this.style[n]);t.length&&e.push(" style='",t.join(""),"'"),e.push(">")}return this.textContent&&e.push(this.textContent),"fragment"!=this.type&&e.push("</",this.type,">"),e.join("")};var h={createTextNode:function(e,t){return l(e)},createElement:function(e){return new i(e)},createFragment:function(){return new i("fragment")}},u=function(){this.config={},this.dom=h};u.prototype=o.prototype;var p=function(e,t,n){var i=e.className.match(/lang-(\w+)/),s=t.mode||i&&"ace/mode/"+i[1];if(!s)return!1;var o=t.theme||"ace/theme/textmate",r="",a=[];if(e.firstElementChild)for(var l=0,h=0;h<e.childNodes.length;h++){var u=e.childNodes[h];3==u.nodeType?(l+=u.data.length,r+=u.data):a.push(l,u)}else r=e.textContent,t.trim&&(r=r.trim());p.render(r,s,o,t.firstLineNumber,!t.showGutter,(function(t){c.importCssString(t.css,"ace_highlight"),e.innerHTML=t.html;for(var i=e.firstChild.firstChild,s=0;s<a.length;s+=2){var o=t.session.doc.indexToPosition(a[s]),r=a[s+1],l=i.children[o.row];l&&l.appendChild(r)}n&&n()}))};p.render=function(e,t,n,i,o,r){function c(){var s=p.renderSync(e,t,n,i,o);return r?r(s):s}var l,h=1,u=s.prototype.$modes;return"string"==typeof n&&(h++,a.loadModule(["theme",n],(function(e){n=e,--h||c()}))),t&&"object"==typeof t&&!t.getTokenizer&&(t=(l=t).path),"string"==typeof t&&(h++,a.loadModule(["mode",t],(function(e){u[t]&&!l||(u[t]=new e.Mode(l)),t=u[t],--h||c()}))),--h||c()},p.renderSync=function(e,t,n,i,o){i=parseInt(i||1,10);var a=new s("");a.setUseWorker(!1),a.setMode(t);var c=new u;c.setSession(a),Object.keys(c.$tabStrings).forEach((function(e){if("string"==typeof c.$tabStrings[e]){var t=h.createFragment();t.textContent=c.$tabStrings[e],c.$tabStrings[e]=t}})),a.setValue(e);var l=a.getLength(),p=h.createElement("div");p.className=n.cssClass;var g=h.createElement("div");g.className="ace_static_highlight"+(o?"":" ace_show_gutter"),g.style["counter-reset"]="ace_line "+(i-1);for(var d=0;d<l;d++){var f=h.createElement("div");if(f.className="ace_line",!o){var m=h.createElement("span");m.className="ace_gutter ace_gutter-cell",m.textContent="",f.appendChild(m)}c.$renderLine(f,d,!1),f.textContent+="\n",g.appendChild(f)}return p.appendChild(g),{css:r+n.cssText,html:p.toString(),session:a}},n.exports=p,n.exports.highlight=p})),ace.require(["ace/ext/static_highlight"],(function(e){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=e)}));
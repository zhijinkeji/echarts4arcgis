//>>built
define("dojox/form/manager/_NodeMixin","dojo/_base/lang dojo/_base/array dojo/on dojo/dom dojo/dom-attr dojo/query ./_Mixin dijit/form/_FormWidget dijit/_base/manager dojo/_base/declare".split(" "),function(g,e,u,m,k,h,l,v,w,x){l=g.getObject("dojox.form.manager",!0);var p=l.actionAdapter,y=l._keys,z=l.changeEvent=function(a){var b="click";switch(a.tagName.toLowerCase()){case "textarea":b="keyup";break;case "select":b="change";break;case "input":switch(a.type.toLowerCase()){case "text":case "password":b=
"keyup"}}return b},q=function(a,b){var d=k.get(a,"name");b=b||this.domNode;if(!d||d in this.formWidgets)d=null;else{for(var c=a;c&&c!==b;c=c.parentNode)if(k.get(c,"widgetId")&&w.byNode(c).isInstanceOf(v))return null;"input"==a.tagName.toLowerCase()&&"radio"==a.type.toLowerCase()?(b=(b=this.formNodes[d])&&b.node)&&g.isArray(b)?b.push(a):this.formNodes[d]={node:[a],connections:[]}:this.formNodes[d]={node:a,connections:[]}}return d},r=function(a){var b={};p(function(a,c){(a=k.get(c,"data-dojo-observer")||
k.get(c,"observer"))&&"string"==typeof a&&e.forEach(a.split(","),function(a){(a=g.trim(a))&&g.isFunction(this[a])&&(b[a]=1)},this)}).call(this,null,this.formNodes[a].node);return y(b)},t=function(a,b){var d=this.formNodes[a],c=d.connections;c.length&&(e.forEach(c,function(a){a.remove()}),c=d.connections=[]);p(function(d,n){var f=z(n);e.forEach(b,function(b){c.push(u(n,f,g.hitch(this,function(c){if(this.watching)this[b](this.formNodeValue(a),a,n,c)})))},this)}).call(this,null,d.node)};return x("dojox.form.manager._NodeMixin",
null,{destroy:function(){for(var a in this.formNodes)e.forEach(this.formNodes[a].connections,function(a){a.remove()});this.formNodes={};this.inherited(arguments)},registerNode:function(a){"string"==typeof a&&(a=m.byId(a));(a=q.call(this,a))&&t.call(this,a,r.call(this,a));return this},unregisterNode:function(a){a in this.formNodes&&(e.forEach(this.formNodes[a].connections,function(a){a.remove()}),delete this.formNodes[a]);return this},registerNodeDescendants:function(a){"string"==typeof a&&(a=m.byId(a));
h("input, select, textarea, button",a).map(function(b){return q.call(this,b,a)},this).forEach(function(a){a&&t.call(this,a,r.call(this,a))},this);return this},unregisterNodeDescendants:function(a){"string"==typeof a&&(a=m.byId(a));h("input, select, textarea, button",a).map(function(b){return k.get(a,"name")||null}).forEach(function(a){a&&this.unregisterNode(a)},this);return this},formNodeValue:function(a,b){var d=2==arguments.length&&void 0!==b,c;"string"==typeof a&&(a=this.formNodes[a])&&(a=a.node);
if(!a)return null;if(g.isArray(a)){if(d)return e.forEach(a,function(a){a.checked=""}),e.forEach(a,function(a){a.checked=a.value===b?"checked":""}),this;e.some(a,function(a){return a.checked?(c=a,!0):!1});return c?c.value:""}switch(a.tagName.toLowerCase()){case "select":if(a.multiple){if(d){if(g.isArray(b)){var f={};e.forEach(b,function(a){f[a]=1});h("\x3e option",a).forEach(function(a){a.selected=a.value in f});return this}h("\x3e option",a).forEach(function(a){a.selected=a.value===b});return this}c=
h("\x3e option",a).filter(function(a){return a.selected}).map(function(a){return a.value});return 1==c.length?c[0]:c}return d?(h("\x3e option",a).forEach(function(a){a.selected=a.value===b}),this):a.value||"";case "button":return d?(a.innerHTML=""+b,this):a.innerHTML;case "input":if("checkbox"==a.type.toLowerCase())return d?(a.checked=b?"checked":"",this):!!a.checked}return d?(a.value=""+b,this):a.value},inspectFormNodes:function(a,b,d){var c,f={};if(b)if(g.isArray(b))e.forEach(b,function(b){b in
this.formNodes&&(f[b]=a.call(this,b,this.formNodes[b].node,d))},this);else for(c in b)c in this.formNodes&&(f[c]=a.call(this,c,this.formNodes[c].node,b[c]));else for(c in this.formNodes)f[c]=a.call(this,c,this.formNodes[c].node,d);return f}})});
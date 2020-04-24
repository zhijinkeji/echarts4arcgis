// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.32/esri/copyright.txt for details.
//>>built
define("esri/dijit/metadata/base/etc/matchTopNodeUtil","dojo/_base/lang dojo/_base/array dojo/has ../xml/xmlUtil ../xml/XmlFlattener ../../../../kernel".split(" "),function(k,g,l,f,m,n){f={evaluateDomMatch:function(a,c,b){if(!this.hasMatchConditions(a))return c;var e=new m,d=[],h=a.matchTopNode.length;g.forEach(c,function(c){var f=0;g.forEach(a.matchTopNode,function(d){var h=e.flattenNode(c,b);this._evaluateDomNode(a,c,h,d)&&f++},this);f===h&&d.push(c)},this);return d},evaluateXNodeMatch:function(a,
c){if(!this.hasMatchConditions(a))return!0;var b=0,e=a.matchTopNode.length;g.forEach(a.matchTopNode,function(a){var d=this._findXNode(c,a.qPath,null);d&&this._evaluateXNode(d,a)&&b++},this);return b===e},hasMatchConditions:function(a){return a.matchTopNode&&a.matchTopNode.push&&0<a.matchTopNode.length?!0:!1},_evaluateDomNode:function(a,c,b,e){var d=c=null;a=a.target+"/"+e.qPath;if(a in b)(d=b[a])&&0<d.length&&(c=d[0]);else if("mustNot"!==e.qMode)return!1;b=null===e.qValue||c===e.qValue;return"mustNot"===
e.qMode?!b:b},_evaluateXNode:function(a,c){a=a.getXmlValue();a=null===c.qValue||a===c.qValue;return"mustNot"===c.qMode?!a:a},_findXNode:function(a,c,b){var e=null,d=!0;if(a._isGxeElement)if(null===b)b="";else{0<b.length&&(b+="/");b+=a.target;if(c===b)return a;d=!1;0===c.indexOf(b)&&(d=!0)}else if(a._isGxeAttribute&&(d=!1,null!==b&&(0<b.length&&(b+="/"),b+="@"+a.target,c===b)))return a;d&&g.some(a.getChildren(),function(a){if(e=this._findXNode(a,c,b))return!0},this);return e}};l("extend-esri")&&k.setObject("dijit.metadata.base.etc.matchTopNodeUtil",
f,n);return f});
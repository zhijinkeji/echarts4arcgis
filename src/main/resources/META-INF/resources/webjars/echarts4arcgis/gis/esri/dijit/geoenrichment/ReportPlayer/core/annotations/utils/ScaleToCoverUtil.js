// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.32/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/annotations/utils/ScaleToCoverUtil",["dojo/dom-construct","dojo/dom-style","dojo/sniff","esri/dijit/geoenrichment/utils/DomUtil"],function(d,h,k,f){return{setScaleToCover:function(b,a,e,c){function g(){a&&a.__scaleToCoverNode&&(d.destroy(a.__scaleToCoverNode),delete a.__scaleToCoverNode)}c=c||0;if(b){a.__scaleToCoverNode&&a.__scaleToCoverNode.__imageData===e||(g(),a.__scaleToCoverNode=d.create("div",{"class":"esriGEAbsoluteStretched"}),h.set(a.__scaleToCoverNode,
{backgroundImage:"url("+e+")",backgroundRepeat:"no-repeat",backgroundPosition:"center",backgroundSize:"cover"}));b=a.__scaleToCoverNode;if(b.__angle!==c){var l=k("webkit")?"webkitTransform":"transform";b.style[l]="rotate("+c+"deg)"}b.__imageData=e;b.__angle=c;d.place(b,a,"after");f.hide(a)}else g(),f.show(a);return a&&a.__scaleToCoverNode}}});
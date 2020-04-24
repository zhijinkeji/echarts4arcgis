// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.32/esri/copyright.txt for details.
//>>built
define("esri/dijit/analysis/components/AddSummaryFields","../../../kernel ../utils dijit/registry dijit/form/Select dijit/_WidgetBase dijit/_TemplatedMixin dojo/query dojo/window dojo/_base/array dojo/_base/json dojo/_base/declare dojo/_base/lang dojo/dom-style dojo/dom-construct dojo/has dojo/on dojo/Evented dojo/i18n!../../../nls/jsapi".split(" "),function(r,k,f,p,h,t,q,u,l,v,w,g,n,d,x,y,z,A){h=w([h,t,z],{declaredClass:"esri.dijit.analysis.components.AddSummaryFields",layer:null,summaryFields:[],
showGeoAnalyticsParams:null,emptyValue:"",removeAttrStats:A.common.removeAttrStats,rows:[],removeAllBool:!1,allowDateType:!1,isGPStringObjType:!1,isActive:!0,required:!1,constructor:function(a){this.templateString=!0===a.addAsRow?"\x3ctr data-dojo-attach-point\x3d'_emptySummaryRow'\x3e\x3ctd colspan\x3d'3' class\x3d'clear'\x3e\x3c/td\x3e\x3c/tr\x3e":"\x3ctable class\x3d'fullSpread'\x3e\x3ctr data-dojo-attach-point\x3d'_emptySummaryRow'\x3e\x3ctd colspan\x3d'3' class\x3d'clear'\x3e\x3c/tr\x3e\x3c/table\x3e"},
postMixInProperties:function(){this.inherited(arguments)},postCreate:function(){this.inherited(arguments)},destroy:function(){this._removeAll();this.inherited(arguments)},_createStatsRow:function(){var a,b,c,f,e;a=d.create("tr",null,this._emptySummaryRow,"before");c=d.create("td",{style:{width:"50%",maxWidth:"100px"}},a);b=d.create("td",{style:{width:"45%",maxWidth:"104px"}},a);f=d.create("td",{"class":"shortTextInput removeTd",style:{visibility:"hidden",maxWidth:"12px"}},a);c=new p({maxHeight:200,
"class":"esriLeadingMargin1 mediumInput attrSelect",style:{tableLayout:"fixed",overflowX:"hidden"}},d.create("select",null,c));if(!1===k.addAttributeOptions({selectWidget:c,layer:this.layer,allowStringType:this.showGeoAnalyticsParams,allowDateType:!0===this.allowDateType?!this.showGeoAnalyticsParams:!1}))return d.destroy(a),!1;e=c.on("change",this._handleAttrSelectChange);this.own(e);b=new p({"class":"mediumInput statsSelect",style:{tableLayout:"fixed",overflowX:"hidden"}},d.create("select",null,
b));k.addStatisticsOptions({selectWidget:b,showGeoAnalyticsParams:this.showGeoAnalyticsParams});e=b.on("change",this._handleStatsSelectChange);this.own(e);e=d.create("a",{title:this.removeAttrStats,"class":"closeIcon statsRemove",innerHTML:"\x3cimg src\x3d'"+require.toUrl("../images/close.gif")+"' border\x3d'0''/\x3e"},f);e=y(e,"click",g.hitch(this,this._remove,a));this.own(e);c.set("statisticSelect",b);c.set("showGeoAnalyticsParams",this.showGeoAnalyticsParams);c.set("statsRow",a);b.set("attributeSelect",
c);b.set("removeTd",f);b.set("isnewRowAdded",!1);b.set("referenceWidget",this);this.rows.push(a);this._currentStatsSelect=b;this._currentAttrSelect=c;this.required&&1===this.rows.length&&(this._toggleRowRequired(this.rows[0],!0),this._currentAttrSelect.set("isFirstRow",!0));2===this.rows.length&&this.emit("disable-tool-checkbox",{disable:!1});return!0},_handleAttrSelectChange:function(a){var b,c;b=this.get("statisticSelect");c=b.get("referenceWidget");a!==c.emptyValue?(b.set("required",!0),(a=this.getOptions(a))&&
a.type!==b.optionsType&&k.addStatisticsOptions({selectWidget:b,type:a.type,showGeoAnalyticsParams:c.showGeoAnalyticsParams}),b.get("value")===c.emptyValue||b.get("isnewRowAdded")||(a=b.get("removeTd"),n.set(a,"visibility","visible"),g.hitch(c,c._createStatsRow)(),b.set("isnewRowAdded",!0))):b.set("required",!1)},_handleStatsSelectChange:function(a){var b,c;b=this.get("attributeSelect");c=this.get("referenceWidget");a!==c.emptyValue?(b.set("required",!0),b.get("value")===c.emptyValue||this.get("isnewRowAdded")||
(a=this.get("removeTd"),n.set(a,"visibility","visible"),g.hitch(c,c._createStatsRow)(),this.set("isnewRowAdded",!0))):b.set("required",!1)},_remove:function(a){if(!this.removeAllBool){var b=this.rows.indexOf(a);this.rows.splice(b,1)}this._destroyRow(a);1===this.rows.length&&this.emit("disable-tool-checkbox",{disable:!0})},_destroyRow:function(a){l.forEach(f.findWidgets(a),function(a){a.destroyRecursive()});d.destroy(a)},_removeAll:function(){this.removeAllBool=!0;l.forEach(this.rows,this._remove,
this);this.rows=[];this.removeAllBool=!1},_getSummaryFieldsAttr:function(){var a=[],b=[],c=[],d,e,g;if(this.isActive)if(this.rows.forEach(function(b){d=f.findWidgets(b);g=d[0];e=d[1];g.get("value")!==this.emptyValue&&e.get("value")!==this.emptyValue&&a.push(g.get("value")+" "+e.get("value"))},this),b=k.removeDuplicates(a,!1),this.showGeoAnalyticsParams||this.isGPStringObjType){for(var h=0;h<b.length;h++){var m={},l=b[h].split(" ");m.onStatisticField=l[0];m.statisticType=l[1];this.showGeoAnalyticsParams?
c.push(m):c.push(v.toJson(m))}this.summaryFields=c}else this.summaryFields=b;else this.summaryFields=[];return this.summaryFields},_setSummaryFieldsAttr:function(a){this.summaryFields=a;this._loadOptions();a&&0<a.length&&this.emit("summary-fields-loaded",{})},_setLayerAttr:function(a){(this.layer=a)?this._resetOptions():this._removeAll()},_loadOptions:function(){this._removeAll();l.forEach(this.summaryFields,function(a){var b,c;this._createStatsRow();c="string"===typeof a&&-1!==a.indexOf("{");b;b=
c?k.tryParseJSON(a):"object"===typeof a?a:a.split(" ");this._currentAttrSelect.set("value",b&&b.length?b[0]:b.onStatisticField,!1);this._currentAttrSelect.set("required",!0);(a=this._currentAttrSelect.getOptions(b&&b.length?b[0]:b.onStatisticField))&&a.type!==this._currentAttrSelect.optionsType&&k.addStatisticsOptions({selectWidget:this._currentStatsSelect,type:a.type,showGeoAnalyticsParams:this.showGeoAnalyticsParams});this._currentStatsSelect.set("value",b&&b.length?b[1]:b.statisticType,!1);this._currentStatsSelect.set("required",
!0);b=this._currentStatsSelect.get("removeTd");n.set(b,"visibility","visible");this._currentStatsSelect.set("isnewRowAdded",!0)},this);this._createStatsRow()},_resetOptions:function(){this._removeAll();this._createStatsRow()},validate:function(){for(var a=[],b=0;b<this.rows.length;b++)for(var a=f.findWidgets(this.rows[b]),c=0;c<a.length;c++)if(a[c]._hasBeenBlurred=!0,a[c].validate&&!a[c].validate())return u.scrollIntoView(a[c].containerNode||a[c].domNode),a[c].focus(),!1;return!0},_getRequiredAttr:function(){return this.required},
_setRequiredAttr:function(a){this.required=a},show:function(){(new q.NodeList([this.domNode].concat(this.rows))).style("display","table-row");this.isActive=!0;this._triggerRowsOptionChange()},hide:function(){(new q.NodeList([this.domNode].concat(this.rows))).style("display","none");this.isActive=!1;this._toggleRowsRequired(!1)},disable:function(){this._resetOptions();this._currentStatsSelect.set("disabled",!0);this._currentAttrSelect.set("disabled",!0);this.isActive=!1},enable:function(){this._currentStatsSelect.set("disabled",
!1);this._currentAttrSelect.set("disabled",!1);this.isActive=!0},updateRequiredAttributes:function(){if(0===this.rows.length||!this.required)return!1;for(var a,b=0;b<this.rows.length;b++)if(a=f.findWidgets(this.rows[b]),a[0].get("value")!==this.emptyValue&&a[1].get("value")===this.emptyValue||a[0].get("value")===this.emptyValue&&a[1].get("value")!==this.emptyValue)return!0;0<this.get("summaryFields").length?this._toggleRowRequired(this.rows[0],!1):(a=f.findWidgets(this.rows[0]),a[0].set("required",
!0),a[1].set("required",!0));return!0},_triggerRowOptionChange:function(a){a=f.findWidgets(a);g.hitch(a[0],this._handleAttrSelectChange,a[0].get("value"))();g.hitch(a[1],this._handleStatsSelectChange,a[1].get("value"))()},_triggerRowsOptionChange:function(){for(var a=0;a<this.rows.length;a++)this.required&&0===a?this._toggleRowRequired(this.rows[a],!0):this._triggerRowOptionChange(this.rows[a])},_toggleRowRequired:function(a,b){a=f.findWidgets(a);a[0].set("required",b);a[1].set("required",b)},_toggleRowsRequired:function(a){for(var b=
0;b<this.rows.length;b++)this._toggleRowRequired(this.rows[b],a)}});x("extend-esri")&&g.setObject("dijit.analysis.components.AddSummaryFields",h,r);return h});
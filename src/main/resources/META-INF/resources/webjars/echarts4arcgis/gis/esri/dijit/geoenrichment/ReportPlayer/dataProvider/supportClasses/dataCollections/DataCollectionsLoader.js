// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.32/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/dataProvider/supportClasses/dataCollections/DataCollectionsLoader",["esri/dijit/geoenrichment/promise/all","../GEUtil","../ReportTemplateData","esri/dijit/geoenrichment/utils/JsonXmlConverter","esri/dijit/geoenrichment/utils/UrlUtil"],function(n,k,p,h,l){return{_cache:{},canLoad:function(){return k.canMakeRequests()},loadVariables:function(b){var f="*"===b.outFields,e=f?["*"]:b.outFields,c=b.countryID+";"+b.hierarchy+";"+e.join(";")+";"+!!b.forceLowerCase;
this._cache[c]||(f||(e=e.slice(),-1===e.indexOf("id")&&e.push("id")),this._cache[c]=k.getDataCollections(b.countryID,b.hierarchy,{f:"json",outFields:f?"*":JSON.stringify(e),suppressNullValues:!0,AddDerivativeVariables:"all"}).then(function(c){var d={dataCollections:c,idToVariableCache:{},fullNameToVariableCache:{}};c.forEach(function(c){c.data.forEach(function(g){function a(a){return b.forceLowerCase?a.toLowerCase():a}function h(a){if(f)return Object.keys(a).length;var c=0;e.forEach(function(d){void 0!==
a[d]&&c++});return c}var m=d.idToVariableCache[a(g.id)];if(!m||h(g)>h(m))d.idToVariableCache[a(g.id)]=g;d.fullNameToVariableCache[a(c.dataCollectionID+"."+g.id)]=g})});return d}));return this._cache[c]},loadCustomDataVariables:function(b,f){f=f||{};var e={idToVariableCache:{},fullNameToVariableCache:{}};return n(b.map(function(c){var b=l.combineMulti([c.url||f.portalUrl,"sharing/rest/content/items",c.itemid,"resources/metadata.xml"]);return p.loadResource(b,c.token||l.getToken(f.portalUrl)).then(function(d){var b=
h.parseXml(d.data);d=[];var g=h.queryJson(b,"Fields")[0];g&&(d=d.concat(h.queryJson(g,"Field")));(b=h.queryJson(b,"CalculatedFields")[0])&&(d=d.concat(h.queryJson(b,"Script")));d.forEach(function(a){function b(a){return f.forceLowerCase?a.toLowerCase():a}a=a.attributes;a={id:a.Name,fullName:c.itemid+"."+a.Name,alias:a.Alias,description:a.Alias,type:"esriFieldType"+a.Type,precision:a.Precision?Number(a.Precision):void 0,vintage:a.Vintage};e.idToVariableCache[b(a.id)]=a;e.fullNameToVariableCache[b(a.fullName)]=
a})})})).then(function(){return e})}}});
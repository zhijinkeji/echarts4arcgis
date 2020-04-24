// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.32/esri/copyright.txt for details.
//>>built
require({cache:{"esri/layers/StreamTrackManager":function(){define("dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/has ../kernel ../graphic ../geometry/Point ../geometry/Polyline ./TrackManager".split(" "),function(n,y,k,v,r,z,A,B,C){n=n([C],{declaredClass:"esri.layers._StreamTrackManager",constructor:function(h){this.inherited(arguments);var g=h.getMap().spatialReference;this.isWebMercator=g.isWebMercator();this.canWrap=g._isWrappable();this.wrapThreshold=this.isWebMercator?2.0037508342788905E7:
180},initialize:function(h){this.inherited(arguments)},addFeatures:function(h,g){function f(f,e){var g,a,b;t[f]||(t[f]=[]);f=t[f];0<q&&(e.length>q&&e.splice(0,e.length-q),a=e.length+f.length,a>q&&(g=f.splice(0,a-q)));a=e.length;for(b=0;b<a;b+=1)f.push(e[b]);return{deletes:g,adds:e}}var t,e,w,q,m={},p={},u;if(g)return this.inherited(arguments),m;t=this.trackMap;e=this.layer;w=e._trackIdField;q=e.maximumTrackPoints||0;k.forEach(h,function(f){var e=f.attributes[w];f.visible&&(p[e]||(p[e]=[]),p[e].push(f))});
for(u in p)p.hasOwnProperty(u)&&(e=f(u,p[u]),m[u]=e);return m},removeFeatures:function(h){var g=[],f=this.layer.objectIdField,t=this.layer._trackIdField;h&&(k.forEach(h,function(e){var h,q,m,p;q=e.attributes[t];h=e.attributes[f];if(m=this.trackMap[q])for(e=0;e<m.length;e+=1)if(p=m[e],p.attributes[f]===h){this.trackMap[q].splice(e,1);-1===k.indexOf(q)&&g.push(q);break}},this),0<h.length&&this.refreshTracks(g))},drawTracks:function(h){function g(g){var h=e[g],m=h&&1<h.length,k=f.trackLineMap[g];k&&
!m&&(t.remove(k),delete f.trackLineMap[g],k=null);if(!m)return!1;for(var n,m=[],a=[],b,c=h.length,d=0;d<c;d++)if(b=h[d].geometry){b=b.normalize();var l=b.x,x=0,G=!1;n&&f.canWrap&&(x=l-n.x,Math.abs(x)>f.wrapThreshold&&(G=!0));G?(a.push([f.getWrappedX(l),b.y]),m.push(a.slice(0)),a=[[l,b.y]]):a.push([l,b.y]);n=new A(l,b.y,w)}1<a.length&&m.push(a);h={};h[q]=g;if(m.length)if(k){for(var p=k.geometry;p.paths.length;)p.removePath(p.paths.length-1);m.forEach(function(a){p.addPath(a)});k.setGeometry(p)}else k=
new z(new B({paths:m,spatialReference:w}),null,h),t.add(k),f.trackLineMap[g]=k}var f=this,t=this.container,e,w,q,m;if(t)if(e=this.trackMap,w=this.map.spatialReference,q=this.layer._trackIdField,h)k.forEach(h,function(f){g(f)});else for(m in e)e.hasOwnProperty(m)&&g(m)},refreshTracks:function(h){function g(e){var h,g;e=f[e]||[];h=e.length;for(g=0;g<h;g++)n._repaint(e[g],null,!0)}var f=this.trackMap,n=this.layer,e;this.drawTracks(h);if(h)k.forEach(h,function(e){g(e)});else for(e in f)f.hasOwnProperty(e)&&
g(e)},getLatestObservations:function(){var h,g,f=this.trackMap,k=[];for(h in f)f.hasOwnProperty(h)&&(g=f[h],k.push(g[g.length-1]));return k},destroy:function(){this.inherited(arguments);this.trackLineMap=null},getWrappedX:function(h){var g=this.isWebMercator,f=g?2.0037508342788905E7:180,g=g?-2.0037508342788905E7:-180;return(0<h?g:f)-((0<h?f:g)-h)}});v("extend-esri")&&y.setObject("layers._StreamTrackManager",n,r);return n})},"esri/layers/PurgeOptions":function(){define(["dojo/_base/declare","dojo/_base/lang",
"dojo/Stateful","dojo/has","../kernel"],function(n,y,k,v,r){n=n([k],{declaredClass:"esri.layers.PurgeOptions",constructor:function(k,n){this.parent=k;for(var r in n)this[r]=n[r]},_displayCountSetter:function(k){this.displayCount=k;this.parent.refresh()}});v("extend-esri")&&y.setObject("layers.PurgeOptions",n,r);return n})},"*noref":1}});
define("esri/layers/StreamLayer","dojo/_base/declare dojo/_base/connect dojo/_base/array dojo/_base/Color dojo/_base/lang dojo/Deferred dojo/has dojo/io-query dojo/on dojo/aspect ../kernel ../request ../graphic ./FeatureLayer ./StreamMode ./StreamTrackManager ../geometry/jsonUtils ../symbols/SimpleFillSymbol ../symbols/SimpleLineSymbol ../symbols/SimpleMarkerSymbol ../renderers/SimpleRenderer ./PurgeOptions".split(" "),function(n,y,k,v,r,z,A,B,C,h,g,f,t,e,w,q,m,p,u,E,H,F){n=n([e],{declaredClass:"esri.layers.StreamLayer",
_preventInit:!0,constructor:function(a,b){b=b||{};b.mode&&b.mode!==e.MODE_STREAM||(this._isStream=!0,this.currentMode=this.mode=e.MODE_STREAM,this._mode=new w(this));this.purgeOptions=new F(this,b.purgeOptions||{});this.purgeInterval=b.purgeInterval||0;this._reconnectAttempts=0;this.maxReconnectAttempts=10;this.socket=this._reconnectTimeoutId=null;this._keepLatestQueried=!1;this._keepLatestUrl=null;this._relatedQueried=!1;this._joinField=this._relatedUrl=null;this._refreshing=!1;this._attemptReconnect=
r.hitch(this,this._attemptReconnect);this._purge=r.hitch(this,this._purge);this._processServiceJson=r.hitch(this,this._processServiceJson);if(r.isObject(a)&&a.layerDefinition)this._initFeatureLayer(a,b);else{var c=this;f({url:a,content:r.mixin({f:"json"}),callbackParamName:"callback"}).then(function(a){c._processServiceJson(a,b)},function(a){c._errorHandler(a)})}},_processServiceJson:function(a,b){var c=this;a.relatedFeatures&&a.relatedFeatures.featuresUrl&&a.relatedFeatures.joinField?(this._relatedUrl=
a.relatedFeatures.featuresUrl,this.objectIdField=this._joinField=a.relatedFeatures.joinField,f({url:this._relatedUrl,content:{f:"json"},callbackParamName:"callback"}).then(function(d){d=d.fields||[];var l=k.map(a.fields,function(a){return a.name.toLowerCase()});k.forEach(d,function(b){-1===k.indexOf(l,b.name.toLowerCase())&&a.fields.push(b)});b.resourceInfo=a;c._initFeatureLayer(c._url,b)},function(a){c.onError({error:a})})):(b.resourceInfo=a,this._initFeatureLayer(this._url,b))},_initLayer:function(a,
b){this.inherited(arguments);if(a){var c;if(a.layerDefinition)this.purgeOptions=new F(this,this._params.purgeOptions||{}),this.socketUrl=this._params.socketUrl||a.layerDefinition.socketUrl||void 0;else{if(this._params.socketUrl)this.socketUrl=this._params.socketUrl;else{var d=this._getWebsocketConnectionInfo(a),l=d.urls;l&&l.length?(this._socketUrls=l,this.socketUrl=l[0],this.socketDirection="broadcast"===this._params.socketDirection?"broadcast":"subscribe",this.socketUrl+="/"+this.socketDirection,
this._websocketToken=d.token,l.length>this.maxReconnectAttempts&&(this.maxReconnectAttempts=l.length)):(this.socketUrl=void 0,d="No web socket urls were retrieved from the Stream Service. Layer will not attempt to connect.","https:"===location.protocol&&(d+=" An insecure web socket connection cannot be made from a secure web page."),this.onError(Error(d)))}if(this._params.filter)try{this._filter=c=this._makeFilter(this._params.filter)}catch(x){this.onError(Error("Error trying to create filter object: "+
x+". Layer will not have filter applied")),this._filter=null}if(this._params.geometryDefinition||this._outFields||this._defnExpr){c=c||{};c.geometry=this._params.geometryDefinition;c.outFields=this._outFields;c.where=this._defnExpr;try{this._filter=c=this._makeFilter(c)}catch(x){this.onError(Error("Error trying to create filter object: "+x+". Layer will not have filter applied")),this._filter=null}}}this.maximumTrackPoints=this._params.maximumTrackPoints||0===this._params.maximumTrackPoints?this._params.maximumTrackPoints:
1;(this._params.refreshRate||0===this._params.refreshRate)&&this._mode&&this._mode._setRefreshRate&&this._mode._setRefreshRate(this._params.refreshRate);this._keepLatestUrl=a.keepLatestArchive?a.keepLatestArchive.featuresUrl:null;a.relatedFeatures&&a.relatedFeatures.featuresUrl&&a.relatedFeatures.joinField&&(this._relatedUrl=a.relatedFeatures.featuresUrl,this.objectIdField=this._joinField=a.relatedFeatures.joinField);this.objectIdField||this._makeObjectIdField();this._map&&this.socketUrl&&!this._connected&&
this.connect()}},_isWebGLCompatible:function(){return!1},_setMap:function(a){var b=this.inherited(arguments),c=this._getRenderer();this.timeInfo&&(this._trackIdField||c&&(c.latestObservationRenderer||c.trackRenderer))&&(this._trackManager=new q(this),this._trackManager.initialize(a));this.socketUrl&&!this._connected&&this._map&&this.connect();return b},_unsetMap:function(a,b){k.forEach(this._connects,y.disconnect);(this._connected||this._reconnecting||this.socket)&&this.disconnect();this._togglePurgeT();
this.inherited(arguments);this._map=null},_suspend:function(){this._togglePurgeT();this.inherited(arguments)},_resume:function(){this.inherited(arguments);this._togglePurgeT(!0)},clear:function(){try{this._mode&&this._mode._clearDrawBuffer&&this._mode._clearDrawBuffer(),this._mode&&this._mode._clearTimeBin&&this._mode._clearTimeBin(),this._mode&&this._mode._clearFeatureMap&&this._mode._clearFeatureMap(),this._trackManager&&this._trackManager.clearTracks()}catch(a){}this.inherited(arguments);this._trackManager&&
this._trackManager.createTracklineContainer()},redraw:function(){this._mode&&this._mode._flushDrawBuffer&&this._mode._flushDrawBuffer();this.inherited(arguments)},setDefinitionExpression:function(a){this.setFilter({where:a})},getDefinitionExpression:function(){var a;this._filter&&(a=this._filter.where);return a},destroy:function(){this.disconnect();this.inherited(arguments)},onResume:function(a){this.inherited(arguments)},setGeometryDefinition:function(a){this.setFilter({geometry:a})},getGeometryDefinition:function(){var a;
this._filter&&(a=this._filter.geometry);return a},connect:function(a){var b=new z,c={},d=this._filter,l,e,f=this.socketUrl,g;try{this._connected||this._connecting?b.reject(Error("Cannot start new connection process. Layer is connecting.")):(this._connecting=!0,this._getRelatedFeatures().then(function(){return this._getKeepLatestFeatures()}.bind(this)).then(function(){this._websocketToken&&(c.token=this._websocketToken);this._map&&this._map.spatialReference&&this.spatialReference&&this._map.spatialReference.wkid!==
this.spatialReference.wkid&&(c.outSR=this._map.spatialReference.wkid);if(d)for(e in d)null!==d[e]&&(l="geometry"===e?JSON.stringify(d[e]):d[e],c[e]=l);f+="?"+B.objectToQuery(c);g=this._createConnection(f,a);b.resolve(g)}.bind(this)).otherwise(function(a){b.reject(a)}))}catch(D){a&&(a(D,!1),b.reject(D)),this.onConnectionError({error:D})}return b.promise},disconnect:function(a){var b=this._refreshing?"Disconnecting as part of layer refresh cycle":"Connection closed from client",c=this._refreshing?!0:
!1;this._reconnectTimeoutId&&clearTimeout(this._reconnectTimeoutId);this._refreshing=this._reconnecting=this._connecting=this._connected=!1;this.socket&&this.socket.close();this.onDisconnect({willReconnect:c,message:b});a&&a(null,!0)},setFilter:function(a){var b,c;if(this._collection)return this.onError("Filter can only be set when the source of the layer is a Stream Service"),!1;try{if(void 0!==a.outFields)return c=Error("Outfields property cannot be changed after layer is created"),this.onFilterChange({filter:this.getFilter(),
error:c}),!1;b=this._makeFilter(a)}catch(d){return c=Error(d),this.onFilterChange({filter:this.getFilter(),error:c}),!1}if(this.socket)a={filter:b},this.socket.send(JSON.stringify(a));else C.once(this,"connect",function(a){this.setFilter(b)});return!0},getFilter:function(){var a=this._filter,b={},c=["geometry","outFields","where"];a&&k.forEach(c,function(c){var l=a[c];l&&("geometry"===c?l=m.fromJson(l):"outFields"===c&&(l=l.split(",")),b[c]=l)});return b},setMaximumTrackPoints:function(a){if(!a&&
0!==a)return!1;this.maximumTrackPoints=a;this._mode.propertyChangeHandler(3)},getUniqueValues:function(a){var b,c={},d=[];b=this._getField(a,!0);if(!b)return d;a=b.name;k.forEach(this.graphics||[],function(b){b=(b.attributes||{})[a];void 0===b||c[b]||(c[b]=1,d.push(b))});d.sort(function(a,b){return a<b?-1:a>b?1:0});return d},getLatestObservations:function(){var a=[];return a=this._trackManager?this._trackManager.getLatestObservations():this.graphics},setPurgeInterval:function(a){var b=this.purgeInterval;
this.purgeInterval=a;this._togglePurgeT();a&&this._togglePurgeT(!0);if(b!==a)this.onPurgeIntervalChange();return this},_togglePurgeT:function(a){if(a&&this.purgeInterval){var b=this;clearTimeout(this._purgeT);this._mode&&this._mode._flushDrawBuffer&&(this._purgeT=setTimeout(function(){b.updating||b.suspended||(b._mode._flushDrawBuffer(),b._togglePurgeT(!0))},6E4*this.purgeInterval))}else this._purgeT&&(clearTimeout(this._purgeT),this._purgeT=null)},onMessage:function(){},onConnect:function(){},onDisconnect:function(){},
onFilterChange:function(){},onAttemptReconnect:function(){},onConnectionError:function(){},onPurgeIntervalChange:function(){},_createConnection:function(a,b){var c=this,d=new WebSocket(a);d.onopen=function(){c.socket=d;c._connected=!0;c._connecting=!1;c._reconnecting=!1;c._reconnectAttempts=0;c._bind();c.onConnect();b&&b(null,!0)};d.onclose=function(a){var b,d=!0,e=c._connected,l=null;if(c._connected||c._reconnecting){if(a.code)if(b="Connection failed: ",1001===a.code)b+=a.reason||"Service is going away.",
d=!1;else if(4400===a.code)b+=a.reason||"Invalid url parameters. Check filter properties.",d=!1;else if(4404===a.code)b+="Service not found",d=!1;else if(4401===a.code||4403===a.code)b+="Not authorized",d=!1;d&&(c._reconnectAttempts+=1,c._reconnectAttempts>c.maxReconnectAttempts&&(b="Maximum reconnect attempts exceeded",d=!1,e=!0));c._connected=!1;e&&(b&&(l=Error(b)),c.onDisconnect({error:l,willReconnect:d}));d?c._attemptReconnect():c.socket=null}else c.socket||(l=Error("Could not make connection to service"),
c.onConnectionError({error:l})),c.socket=null,c._connected=!1};d.onerror=function(a){console.log("Socket error")};return d},_getKeepLatestFeatures:function(){var a=new z;this._map&&this._keepLatestUrl&&!this._keepLatestQueried&&this._mode._fetchArchive?this._mode._fetchArchive(this._keepLatestUrl).then(function(){a.resolve()}.bind(this)).otherwise(function(b){a.reject(b)}).always(function(){this._keepLatestQueried=!0}.bind(this)):a.resolve();return a.promise},_getRelatedFeatures:function(){var a=
new z;this._map&&this._relatedUrl&&!this._relatedQueried&&this._mode._fetchArchive?this._mode._fetchArchive(this._relatedUrl).then(function(){a.resolve()}.bind(this)).otherwise(function(b){a.reject(b)}).always(function(){this._relatedQueried=!0}.bind(this)):a.resolve();return a.promise},_purge:function(){var a,b=[],c;if(this.purgeOptions.displayCount&&this.graphics.length>this.purgeOptions.displayCount)for(a=0;a<this.graphics.length-this.purgeOptions.displayCount;a++)c=this.graphics[a],b.push(c);
0<b.length&&(this._mode._removeFeatures(b),this._trackManager&&this._trackManager.removeFeatures(b))},_bind:function(){var a=this;this.socket.onmessage=function(b){a._onMessage(JSON.parse(b.data))}},_onMessage:function(a){var b=this;this.onMessage(a);var c={create:function(a){b._create(a)},update:function(a){b._update(a)},"delete":function(a){b._delete(a)}};if(a.type)c[a.type](a.feature);else a.hasOwnProperty("filter")?b._handleFilterMessage(a):this._create(a)},_create:function(a){function b(a){if(!c._featureHasOID(a,
d)){if(!a.geometry)return!1;a.attributes=a.attributes||{};a.attributes[d]=c._nextId++}a=a.declaredClass?a:new t(a);c._mode.drawFeature(a)}var c=this,d=c.objectIdField;a.length?a.forEach(function(a){a&&b(a)}):a&&b(a)},_delete:function(a){var b=this,c=a[b.objectIdField]||a.attributes[b.objectIdField],d=!1;this.graphics.forEach(function(a){a.attributes[b.objectIdField]==c&&(d=a)});d&&this.remove(d)},_update:function(a){var b=this,c=!1;this.graphics.forEach(function(d){d.attributes[b.objectIdField]==
a.attributes[b.objectIdField]&&(c=d)});c&&(a.attributes&&c.setAttributes(a.attributes),a.geometry&&c.setGeometry(m.fromJson(a.geometry)))},_makeFilter:function(a){var b,c=null;a=a||{};if(void 0!==a.geometry)if(c=c||{},null===a.geometry)c.geometry=null;else{b="string"===typeof a.geometry?m.fromJson(JSON.parse(a.geometry)):a.geometry.declaredClass?a.geometry:m.fromJson(a.geometry);if(!b||"point"===b.type)throw"Query object contains invalid geometry";"extent"!==b.type&&(b=b.getExtent());if(!b||0===b.getHeight()&&
0===b.getWidth())throw"Invalid filter geometry: Extent cannot have a height and width of 0";c.spatialRel="esriSpatialRelIntersects";c.geometryType="esriGeometryEnvelope";c.geometry=b.toJson()}void 0!==a.where&&(c=c||{},c.where=a.where);if(void 0!==a.outFields&&(c=c||{},a="string"===typeof a.outFields?"*"===a.outFields?null:a.outFields.replace(/,\s+/g,",").split(","):null===a.outFields?null:a.outFields,a=this._makeOutFields(a))){if(a.errors&&0<a.errors.length)throw"Invalid filter outFields. "+a.errors.join(",");
c.outFields=a.fields?a.fields.join(","):null}return c},_makeOutFields:function(a){var b=this,c=[],d=[],e={fields:null};if(!a||0===a.length)return e;k.forEach(a,function(a){if("*"===a)return e;var f=b._getField(a,!0);f?c.push(f.name):d.push("Field named "+a+" not found in schema.")});a=b._getOutFields();k.forEach(a,function(a){b._getField(a)&&-1===k.indexOf(c,a)&&c.push(a)});e.fields=c;e.errors=d;return e},_handleFilterMessage:function(a){a.error?(a=Error(a.error.join(",")),this.onFilterChange({filter:this.getFilter(),
error:a})):(a=a.filter,a.geometry&&"string"===typeof a.geometry&&(a.geometry=JSON.parse(a.geometry)),this._filter=a,this.onFilterChange({filter:this.getFilter()}))},_getWebsocketConnectionInfo:function(a){var b={urls:[]},c,d=[],e=[],f,g,h;a.streamUrls&&k.forEach(a.streamUrls,function(a){"ws"===a.transport&&(c=a.urls,b.token=a.token)});if(!c)return b;k.forEach(c,function(a){0===a.lastIndexOf("wss",0)?e.push(a):d.push(a)});a="https:"===location.protocol||0===this.url.lastIndexOf("https:",0)?e:0===d.length?
e:d;if(1<a.length)for(f=0;f<a.length-1;f++)g=f+Math.floor(Math.random()*(a.length-f)),h=a[g],a[g]=a[f],a[f]=h;b.urls=a;return b},_attemptReconnect:function(){var a=this,b;this._reconnectTimeoutId=null;a._connected=!1;if(!a._socketUrls)return!1;if(!a._collection&&!a._reconnecting&&a.socket&&a.credential)return a._reconnecting=!0,a._getServiceConnectionMetadata(a._attemptReconnect),!1;a._reconnecting=!0;a.socket=null;if(a._reconnectAttempts>a.maxReconnectAttempts)return a._reconnecting=!1;a.socketUrl=
a._socketUrls[a._reconnectAttempts>a._socketUrls.length-1?a._reconnectAttempts%a._socketUrls.length:a._reconnectAttempts];a.socketUrl+="/"+a.socketDirection;b=a._randomIntFromInterval(0,1E3);this._reconnectTimeoutId=setTimeout(function(){a.onAttemptReconnect({count:a._reconnectAttempts,url:a.socketUrl});a.connect()},1E3*a._reconnectAttempts+b)},_getServiceConnectionMetadata:function(a){var b=this,c=b._url.path;a="function"===typeof a?a:null;f({url:c,content:r.mixin({f:"json"},this._url.query),callbackParamName:"callback"}).then(function(c){c=
b._getWebsocketConnectionInfo(c);b._websocketToken=c.token;a&&a()},function(a){b.onError(Error(a))})},_setDefaultRenderer:function(){var a=this.geometryType,b=new v([5,112,176,.8]),c=new v([255,255,255]),c=new u(u.STYLE_SOLID,c,1),d;if("esriGeometryPoint"===a||"esriGeometryMultipoint"===a)d=new E(E.STYLE_CIRCLE,10,c,b);else if("esriGeometryPolyline"===a)d=new u(u.STYLE_SOLID,b,2);else if("esriGeometryPolygon"===a||"esriGeometryEnvelope"===a)b=new v([5,112,176,.2]),c=new v([5,112,176,.8]),c=new u(u.STYLE_SOLID,
c,1),d=new p(p.STYLE_SOLID,c,b);d&&this.setRenderer(new H(d))},_makeObjectIdField:function(){var a=1,b,c,d=[];if(!this.objectIdField){b=this.fields.length;for(c=0;c<b;c++)d.push(this.fields[c].name.toLowerCase());for(;-1!==k.indexOf(d,"objectid_"+a);)a+=1;this.objectIdField="objectid_"+a;this.fields.push({name:"objectid_"+a,type:"esriFieldTypeOID",alias:"objectid_"+a,nullable:!1})}},_featureHasOID:function(a,b){return a.attributes&&(a.attributes[b]||0===a.attributes[b])},_randomIntFromInterval:function(a,
b){return Math.floor(Math.random()*(b-a+1)+a)}});A("extend-esri")&&r.setObject("layers.StreamLayer",n,g);return n});
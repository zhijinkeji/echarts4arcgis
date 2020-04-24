// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.32/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/core/workers/RemoteClient","require exports dojo/Deferred ../Error ../promiseUtils ./utils".split(" "),function(A,B,r,t,u,g){function l(b,a){b["delete"](a)}var v=g.MessageType.CLOSE,k=g.MessageType.CANCEL,w=g.MessageType.INVOKE,m=g.MessageType.RESPONSE,x=g.MessageType.OPEN_PORT,y=function(){function b(a){this._timer=null;this._cancelledJobIds=new Set;this._invokeMessages=[];this._invoke=a;this._timer=null;this._process=this._process.bind(this)}b.prototype.push=function(a){a.type===
g.MessageType.CANCEL?this._cancelledJobIds.add(a.jobId):(this._invokeMessages.push(a),null===this._timer&&(this._timer=setTimeout(this._process,0)))};b.prototype.clear=function(){this._invokeMessages.length=0;this._cancelledJobIds.clear();this._timer=null};b.prototype._process=function(){this._timer=null;for(var a=0,c=this._invokeMessages;a<c.length;a++){var d=c[a];this._cancelledJobIds.has(d.jobId)||this._invoke(d)}this._cancelledJobIds.clear();this._invokeMessages.length=0};return b}();return function(){function b(a,
c,d){this._outJobs=new Map;this._inJobs=new Map;this._queue=new y(this._onInvoke.bind(this));this._onMessage=this._onMessage.bind(this);this._client=c;this._port=a;this._port.addEventListener("message",this._onMessage);this._port.start();this._channel=d}b.connect=function(a){var c=new MessageChannel;a="function"===typeof a?new a:"default"in a&&"function"===typeof a.default?new a.default:a;a.remoteClient=new b(c.port1,a,c);return c.port2};b.prototype.close=function(){this._post({type:v});this._close()};
b.prototype.isBusy=function(){return 0<this._outJobs.size};b.prototype.invoke=function(a,c,d){var b=this;if(!this._port)return u.reject(new t("remote-client:port-closed","Can't invoke(), port is closed"));var f=g.newJobId(),h=new r(function(){l(b._outJobs,f);b._post({type:k,jobId:f})});this._outJobs.set(f,h);this._post({type:w,jobId:f,methodName:a},c,d);return h.promise};b.prototype.openPort=function(){var a=this,c=g.newJobId(),b=new r(function(){l(a._outJobs,c);a._post({type:k,jobId:c})});this._outJobs.set(c,
b);this._post({type:x,jobId:c});return b.promise};b.prototype._close=function(){this._channel&&(this._channel=null);this._port.removeEventListener("message",this._onMessage);this._port.close();this._outJobs.forEach(function(a){a.cancel()});this._inJobs.clear();this._outJobs.clear();this._queue.clear();this._port=this._client=null};b.prototype._onMessage=function(a){if(a=g.receiveMessage(a))switch(a.type){case m:this._onResponse(a);break;case w:this._queue.push(a);break;case k:this._onCancel(a);break;
case v:this._close();break;case x:this._onOpenPort(a)}};b.prototype._onCancel=function(a){var c=this._inJobs,b=a.jobId,e=c.get(b);this._queue.push(a);e&&(l(c,b),e.cancel())};b.prototype._onInvoke=function(a){var b=this,d=a.methodName,e=a.jobId;a=a.data;var f=this._inJobs,h=this._client,p=h[d],n;try{if(!p&&d&&-1!==d.indexOf("."))for(var k=d.split("."),q=0;q<k.length-1;q++)h=h[k[q]],p=h[k[q+1]];if("function"!==typeof p)throw new TypeError(d+" is not a function");n=p.call(h,a,this)}catch(z){this._post({type:m,
jobId:e,error:g.toInvokeError(z)});return}u.isThenable(n)?(f.set(e,n),n.then(function(a){f.has(e)&&(l(f,e),b._post({type:m,jobId:e},a))}).catch(function(a){f.has(e)&&(l(f,e),a&&"cancel"===a.dojoType||b._post({type:m,jobId:e,error:g.toInvokeError(a||{message:"Error encountered at method "+d})}))})):this._post({type:m,jobId:e},n)};b.prototype._onOpenPort=function(a){var c=new MessageChannel;new b(c.port1,this._client);this._post({type:m,jobId:a.jobId},c.port2,[c.port2])};b.prototype._onResponse=function(a){var b=
a.jobId,d=a.error;a=a.data;var e=this._outJobs;if(e.has(b)){var f=e.get(b);l(e,b);d?f.reject(t.fromJSON(JSON.parse(d))):f.resolve(a)}};b.prototype._post=function(a,b,d){return g.postMessage(this._port,a,b,d)};return b}()});
//>>built
define("dojox/xmpp/TransportSession",["dojo","dijit","dojox","dojo/require!dojox/xmpp/bosh,dojox/xmpp/util,dojox/data/dom"],function(e,g,d){e.provide("dojox.xmpp.TransportSession");e.require("dojox.xmpp.bosh");e.require("dojox.xmpp.util");e.require("dojox.data.dom");d.xmpp.TransportSession=function(a){this.sendTimeout=1E3*(this.wait+20);a&&e.isObject(a)&&(e.mixin(this,a),this.useScriptSrcTransport&&(this.transportIframes=[]))};e.extend(d.xmpp.TransportSession,{rid:0,hold:1,polling:1E3,secure:!1,wait:60,
lang:"en",submitContentType:"text/xml; charset\x3dutf\x3d8",serviceUrl:"/httpbind",defaultResource:"dojoIm",domain:"imserver.com",sendTimeout:0,useScriptSrcTransport:!1,keepAliveTimer:null,state:"NotReady",transmitState:"Idle",protocolPacketQueue:[],outboundQueue:[],outboundRequests:{},inboundQueue:[],deferredRequests:{},matchTypeIdAttribute:{},open:function(){this.status="notReady";this.rid=Math.round(1E9*Math.random());this.protocolPacketQueue=[];this.outboundQueue=[];this.outboundRequests={};this.inboundQueue=
[];this.deferredRequests={};this.matchTypeIdAttribute={};this.keepAliveTimer=setTimeout(e.hitch(this,"_keepAlive"),1E4);this.useScriptSrcTransport?d.xmpp.bosh.initialize({iframes:this.hold+1,load:e.hitch(this,function(){this._sendLogin()})}):this._sendLogin()},_sendLogin:function(){var a=this.rid++,b=d.xmpp.util.createElement("body",{content:this.submitContentType,hold:this.hold,rid:a,to:this.domain,secure:this.secure,wait:this.wait,"xml:lang":this.lang,"xmpp:version":"1.0",xmlns:d.xmpp.xmpp.BODY_NS,
"xmlns:xmpp":"urn:xmpp:xbosh"},!0);this.addToOutboundQueue(b,a)},_sendRestart:function(){var a=this.rid++,b=d.xmpp.util.createElement("body",{rid:a,sid:this.sid,to:this.domain,"xmpp:restart":"true","xml:lang":this.lang,xmlns:d.xmpp.xmpp.BODY_NS,"xmlns:xmpp":"urn:xmpp:xbosh"},!0);this.addToOutboundQueue(b,a)},processScriptSrc:function(a,b){(a=d.xml.parser.parse(a,"text/xml"))&&this.processDocument(a,b)},_keepAlive:function(){"wait"==this.state||this.isTerminated()||(this._dispatchPacket(),this.keepAliveTimer=
setTimeout(e.hitch(this,"_keepAlive"),1E4))},close:function(a){var b=this.rid++,c={sid:this.sid,rid:b,type:"terminate"},f=null;a?(f=new d.string.Builder(d.xmpp.util.createElement("body",c,!1)),f.append(a),f.append("\x3c/body\x3e")):f=new d.string.Builder(d.xmpp.util.createElement("body",c,!1));this.addToOutboundQueue(f.toString(),b);"Terminate"==this.state},dispatchPacket:function(a,b,c,f){a&&this.protocolPacketQueue.push(a);a=new e.Deferred;b&&c&&(a.protocolMatchType=b,a.matchId=c,a.matchProperty=
f||"id","id"!=a.matchProperty&&(this.matchTypeIdAttribute[b]=a.matchProperty));this.deferredRequests[a.protocolMatchType+"-"+a.matchId]=a;this.dispatchTimer||(this.dispatchTimer=setTimeout(e.hitch(this,"_dispatchPacket"),600));return a},_dispatchPacket:function(){clearTimeout(this.dispatchTimer);delete this.dispatchTimer;if(!this.sid)console.debug("TransportSession::dispatchPacket() No SID, packet dropped.");else if(!this.authId)console.debug("TransportSession::dispatchPacket() No authId, packet dropped [FIXME]");
else if(!("error"!=this.transmitState&&0==this.protocolPacketQueue.length&&0<this.outboundQueue.length||"wait"==this.state||this.isTerminated())){var a={sid:this.sid,xmlns:d.xmpp.xmpp.BODY_NS},b;if(0<this.protocolPacketQueue.length)a.rid=this.rid++,b=new d.string.Builder(d.xmpp.util.createElement("body",a,!1)),b.append(this.processProtocolPacketQueue()),b.append("\x3c/body\x3e"),delete this.lastPollTime;else{if(this.lastPollTime&&(b=(new Date).getTime(),b-this.lastPollTime<this.polling)){this.dispatchTimer=
setTimeout(e.hitch(this,"_dispatchPacket"),this.polling-(b-this.lastPollTime)+10);return}a.rid=this.rid++;this.lastPollTime=(new Date).getTime();b=new d.string.Builder(d.xmpp.util.createElement("body",a,!0))}this.addToOutboundQueue(b.toString(),a.rid)}},redispatchPacket:function(a){this.sendXml(this.outboundRequests[a],a)},addToOutboundQueue:function(a,b){this.outboundQueue.push({msg:a,rid:b});this.outboundRequests[b]=a;this.sendXml(a,b)},removeFromOutboundQueue:function(a){for(var b=0;b<this.outboundQueue.length;b++)if(a==
this.outboundQueue[b].rid){this.outboundQueue.splice(b,1);break}delete this.outboundRequests[a]},processProtocolPacketQueue:function(){for(var a=new d.string.Builder,b=0;b<this.protocolPacketQueue.length;b++)a.append(this.protocolPacketQueue[b]);this.protocolPacketQueue=[];return a.toString()},sendXml:function(a,b){if(this.isTerminated())return!1;this.transmitState="transmitting";var c=null,c=this.useScriptSrcTransport?d.xmpp.bosh.get({rid:b,url:this.serviceUrl+"?"+encodeURIComponent(a),error:e.hitch(this,
function(a,b){this.setState("Terminate","error");return!1}),timeout:this.sendTimeout}):e.rawXhrPost({contentType:"text/xml",url:this.serviceUrl,postData:a,handleAs:"xml",error:e.hitch(this,function(a,c){return this.processError(c.xhr.responseXML,c.xhr.status,b)}),timeout:this.sendTimeout});c.addCallback(this,function(a){return this.processDocument(a,b)});return c},processDocument:function(a,b){if(this.isTerminated()||!a.firstChild)return!1;this.transmitState="idle";var c=a.firstChild;if(1>this.outboundQueue.length)return!1;
var e=this.outboundQueue[0].rid;b==e?(this.removeFromOutboundQueue(b),this.processResponse(c,b),this.processInboundQueue()):b-e<this.hold+2&&this.addToInboundQueue(a,b);return a},processInboundQueue:function(){for(;0<this.inboundQueue.length;){var a=this.inboundQueue.shift();this.processDocument(a.doc,a.rid)}},addToInboundQueue:function(a,b){for(var c=0;c<this.inboundQueue.length;c++)b<this.inboundQueue[c].rid||this.inboundQueue.splice(c,0,{doc:a,rid:b})},processResponse:function(a,b){if("terminate"==
a.getAttribute("type")){var c="";"conflict"==a.firstChild.firstChild.nodeName&&(c="conflict");this.setState("Terminate",c)}else{if("Ready"!=this.state&&"Terminate"!=this.state){if(c=a.getAttribute("sid"))this.sid=c;else throw Error("No sid returned during xmpp session startup");this.authId=a.getAttribute("authid");""==this.authId&&1>this.authRetries--&&(console.error("Unable to obtain Authorization ID"),this.terminateSession());this.wait=a.getAttribute("wait");a.getAttribute("polling")&&(this.polling=
1E3*parseInt(a.getAttribute("polling")));this.inactivity=a.getAttribute("inactivity");this.setState("Ready")}e.forEach(a.childNodes,function(a){this.processProtocolResponse(a,b)},this);"idle"==this.transmitState&&this.dispatchPacket()}},processProtocolResponse:function(a,b){this.onProcessProtocolResponse(a);b=a.nodeName+"-"+a.getAttribute("id");var c=this.deferredRequests[b];c&&(c.callback(a),delete this.deferredRequests[b])},setState:function(a,b){if(this.state!=a){if(this["on"+a])this["on"+a](a,
this.state,b);this.state=a}},isTerminated:function(){return"Terminate"==this.state},processError:function(a,b,c){if(this.isTerminated())return!1;if(200!=b){if(400<=b&&500>b)this.setState("Terminate",d);else return this.removeFromOutboundQueue(c),setTimeout(e.hitch(this,function(){this.dispatchPacket()}),200),!0;return!1}this.removeFromOutboundQueue(c);if(a&&a.firstChild&&"terminate"==a.firstChild.getAttribute("type")){a=a.firstChild.firstChild;var d="";a&&"conflict"==a.nodeName&&(d="conflict");this.setState("Terminate",
d);return!1}this.transmitState="error";setTimeout(e.hitch(this,function(){this.dispatchPacket()}),200);return!0},onTerminate:function(a,b,c){},onProcessProtocolResponse:function(a){},onReady:function(a,b){}})});
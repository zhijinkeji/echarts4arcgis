// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.32/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/views/2d/engine/webgl/TileData","require exports ./MemoryRequirements ./TileBufferData ./TileDisplayData ./Utils ./WGLDisplayList ./WGLDisplayObject ./WGLDisplayRecord ./mesh/VertexBuffer ./mesh/factories/WGLMeshFactory ./util/Reader ./util/serializationUtils ./util/Writer".split(" "),function(G,H,p,t,u,x,y,z,A,B,C,v,D,E){var r=new p.default,n=new p.default;return function(){function h(){this.tileBufferData=this.tileDisplayData=null}h.prototype.reshuffle=function(){r.reset();
var b=this._collectDisplayRecords(),a;for(a in b)for(var c=b[a],e=0,f=c;e<f.length;e++){var d=f[e];r.needMore(d.geometryType,d.meshData?d.meshData.vertexCount:d.vertexCount,d.meshData?d.meshData.indexData.length:d.indexCount)}e=b.length;f=new t;for(a=0;a<e;++a){f.geometries[a].indexBuffer=new Uint32Array(Math.round(1.15*r.indicesFor(a)));var d=[],g;for(g in this.tileBufferData.geometries[a].vertexBuffer)d.push(this.tileBufferData.geometries[a].vertexBuffer[g].stride);var d=h._computeVertexAlignment(d),
c=Math.round(1.15*r.verticesFor(a)),d=h._align(c,d),k;for(k in this.tileBufferData.geometries[a].vertexBuffer)c=this.tileBufferData.geometries[a].vertexBuffer[k].stride,f.geometries[a].vertexBuffer[k]={stride:c,data:new Uint32Array(Math.round(d*c/4))}}n.reset();this.tileDisplayData.displayList=new y;for(a=0;a<e;++a){c=b[a];g=0;for(k=c;g<k.length;g++){d=k[g];if(d.meshData)d.writeMeshDataToBuffers(n.verticesFor(a),f.geometries[a].vertexBuffer,n.indicesFor(a),f.geometries[a].indexBuffer),d.meshData=
null;else{var m=this.tileBufferData.geometries[a].vertexBuffer,l=this.tileBufferData.geometries[a].indexBuffer,F=f.geometries[a].vertexBuffer,q=f.geometries[a].indexBuffer,w=n.verticesFor(a),p=n.indicesFor(a);x.copyMeshData(w,p,F,q,d,m,l);d.vertexFrom=w;d.indexFrom=p}n.needMore(a,d.vertexCount,d.indexCount)}this.tileDisplayData.displayList.addToList(c)}this.tileBufferData=f};h.prototype.getStrides=function(){for(var b=[],a=0;a<this.tileBufferData.geometries.length;++a){var c=this.tileBufferData.geometries[a];
b[a]={};for(var e in c.vertexBuffer)b[a][e]=c.vertexBuffer[e].stride}return b};h.prototype._guessSize=function(){for(var b=this.tileDisplayData.displayObjects,a=Math.min(b.length,4),c=0,e=0;e<a;e++)c=Math.max(c,b[e].displayRecords.length);return 2*(12*b.length+b.length*c*40)};h.prototype.serialize=function(){var b=this.tileBufferData.serialize(),a=this.tileBufferData.getBuffers(),c=this.tileDisplayData.serialize(new E.default(Int32Array,this._guessSize())).buffer();a.push(c);return{result:{displayData:c,
bufferData:b},transferList:a}};h.decode=function(b){var a=C.MaterialStore.deserialize(new v.default(b.materialStore)),c=D.deserializeList(new v.default(b.displayObjects),z,{store:a}),a={},e;for(e in b.vertexBuffersMap)a[e]=B.VertexBuffers.decode(b.vertexBuffersMap[e]);b=new h;e=new u;var f=new t;e.displayObjects=c;for(var d in a)c=a[d],f.geometries[d].indexBuffer=c.indexBuffer,f.geometries[d].vertexBuffer=c.namedBuffers;b.tileDisplayData=e;b.tileBufferData=f;return b};h.bind=function(b,a){var c=new h;
c.tileDisplayData=b;c.tileBufferData=a;return c};h.create=function(b,a){var c=new h;c.tileDisplayData=new u;c.tileDisplayData.displayObjects=b;for(var e=[0,0,0,0,0],f=[0,0,0,0,0],d=[[],[],[],[],[]],g=0;g<b.length;g++)for(var k=0,m=b[g].displayRecords;k<m.length;k++){var l=m[k];d[l.geometryType].push(l);e[l.geometryType]+=l.meshData.vertexCount;f[l.geometryType]+=l.meshData.indexData.length}b=new t;a=[a.fill||{},a.line||{},a.icon||{},a.text||{},a.label||{}];for(g=0;5>g;g++){var k=new Uint32Array(f[g]),
m=a[g],l=e[g],n={},q=void 0;for(q in m){var p={data:new Uint32Array(l*m[q]/4),stride:m[q]};n[q]=p}m=n;A.writeAllMeshDataToBuffers(d[g],m,k);b.geometries[g]={indexBuffer:k,vertexBuffer:m}}c.tileBufferData=b;return c};h._align=function(b,a){var c=b%a;return 0===c?b:b+(a-c)};h._computeVertexAlignment=function(b){for(var a=!1,c=!1,e=0;e<b.length;e++){var f=b[e];2===f%4?a=!0:0!==f%4&&(c=!0)}return c?4:a?2:1};h.prototype._collectDisplayRecords=function(){for(var b=[[],[],[],[],[]],a=0,c=this.tileDisplayData.displayObjects;a<
c.length;a++)for(var e=0,f=c[a].displayRecords;e<f.length;e++){var d=f[e];b[d.geometryType].push(d)}return b};return h}()});
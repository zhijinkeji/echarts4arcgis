// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.32/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/symbols/Font","require exports ../core/tsSupport/declareExtendsHelper ../core/tsSupport/decorateHelper ../core/JSONSupport ../core/screenUtils ../core/accessorSupport/decorators ../core/accessorSupport/write".split(" "),function(l,m,g,b,h,k,c,d){return function(f){function a(a){a=f.call(this)||this;a.decoration="none";a.family="sans-serif";a.size=9;a.style="normal";a.weight="normal";return a}g(a,f);e=a;a.prototype.castSize=function(a){return k.toPt(a)};a.prototype.clone=
function(){return new e({decoration:this.decoration,family:this.family,size:this.size,style:this.style,weight:this.weight})};var e;b([c.property({type:String,json:{write:{overridePolicy:d.disableWriteDefaultPolicy("none")}}})],a.prototype,"decoration",void 0);b([c.property({type:String,json:{write:!0}})],a.prototype,"family",void 0);b([c.property({type:Number,json:{write:{overridePolicy:function(a,c,b){return{enabled:!b||!b.textSymbol3D}}}}})],a.prototype,"size",void 0);b([c.cast("size")],a.prototype,
"castSize",null);b([c.property({type:String,json:{write:{overridePolicy:d.disableWriteDefaultPolicy("normal")}}})],a.prototype,"style",void 0);b([c.property({type:String,json:{write:{overridePolicy:d.disableWriteDefaultPolicy("normal")}}})],a.prototype,"weight",void 0);return a=e=b([c.subclass("esri.symbols.Font")],a)}(c.declared(h))});
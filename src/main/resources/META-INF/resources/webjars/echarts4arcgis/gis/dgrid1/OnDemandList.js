//>>built
define("dgrid1/OnDemandList","./List ./_StoreMixin dojo/_base/declare dojo/_base/lang dojo/dom-construct dojo/on dojo/when dojo/query ./util/misc".split(" "),function(G,H,I,J,m,K,L,N,w){function E(a){return a&&(0<=a.className.indexOf("dgrid-row")||0<=a.className.indexOf("dgrid-loading"))}function x(a){return a&&0<=a.className.indexOf("dgrid-preload")}var F=0;return I([G,H],{minRowsPerPage:25,maxRowsPerPage:250,maxEmptySpace:Infinity,bufferRows:10,farOffRemoval:2E3,queryRowsOverlap:0,pagingMethod:"debounce",
pagingDelay:w.defaultDelay,keepScrollPosition:!1,rowHeight:0,_deleteQueue:[],postCreate:function(){this.inherited(arguments);var a=this;K(this.bodyNode,"scroll",w[this.pagingMethod](function(b){a._processScroll(b)},null,this.pagingDelay))},renderQuery:function(a,b){var e=this,g=b&&b.container||this.contentNode,c,h,d,p,r=0,u=b&&b.start||0;"level"in a&&(r=p=a.level);c={query:a,count:0,level:r,top:!1};var n={node:m.create("div",{className:"dgrid-preload",style:{height:"0"}},g),count:0,query:a,next:c,
level:r,top:!0};h=n.node;h.rowIndex=0;c.previous=n;d=c.node=m.create("div",{className:"dgrid-preload",style:{height:"0"}},g);n.id=F++;h.setAttribute("data-preloadid",n.id);c.id=F++;d.setAttribute("data-preloadid",c.id);d.rowIndex=this.minRowsPerPage;e._insertPreload(n);var v=m.create("div",{className:"dgrid-loading"},d,"before");m.create("div",{className:"dgrid-below"},v).innerHTML=this.loadingMessage;b=J.mixin({start:0,count:this.minRowsPerPage},b);null!=p&&(b.queryLevel=p);return this._trackError(function(){var g=
a(b);return e.renderQueryResults(g,d,b).then(function(a){return g.totalLength.then(function(g){var f=a.length,k=d.parentNode;!e._rows||"queryLevel"in b||(e._rows.min=0,e._rows.max=f===g?Infinity:f-1);m.destroy(v);"queryLevel"in b||(e._total=g);0===g&&k&&(e.noDataNode&&m.destroy(e.noDataNode),e._insertNoDataNode(k));n.count=u;c.count=g-f-u;d.rowIndex=u+f;g?e._updatePreloadRowHeights(n):(d.style.display="none",h.style.display="none");e._previousScrollPosition&&k.offsetHeight&&(e.scrollTo(e._previousScrollPosition),
delete e._previousScrollPosition);return L(e._processScroll()).then(function(){return a})})}).otherwise(function(a){m.destroy(v);throw a;})})},_insertPreload:function(a){var b=this.preload;if(b){for(;b.node.compareDocumentPosition(a.node)&Node.DOCUMENT_POSITION_PRECEDING;)if(b=b.previous,null==b)return;for(;b.node.compareDocumentPosition(a.node)&Node.DOCUMENT_POSITION_FOLLOWING&&b.next;)b=b.next;b.previous.next=a;a.previous=b.previous;a=a.next;a.next=b;b.previous=a}else this.preload=a},refresh:function(a){var b=
this,e=a&&a.keepScrollPosition;"undefined"===typeof e&&(e=this.keepScrollPosition);e&&(this._previousScrollPosition=this.getScrollPosition());this.inherited(arguments);if(this._renderedCollection)return this.renderQuery(function(a){return b._renderedCollection.fetchRange({start:a.start,end:a.start+a.count})}).then(function(){b._emitRefreshComplete()})},resize:function(){this.inherited(arguments);this._processScroll()},cleanup:function(){this.inherited(arguments);this.preload=null},renderQueryResults:function(a){var b=
this.inherited(arguments),e=this._getRenderedCollection(this.preload);e&&e.releaseRange&&b.then(function(b){b[0]&&!b[0].parentNode.tagName&&a.totalLength.then(function(){e.releaseRange(b[0].rowIndex,b[b.length-1].rowIndex+1)})});return b},_getFirstRowSibling:function(a){return a.lastChild},_calcRowHeight:function(a){var b=a.nextSibling;return b&&!/\bdgrid-preload\b/.test(b.className)?b.offsetTop-a.offsetTop:a.offsetHeight},_calcAverageRowHeight:function(a){for(var b=a.length,e=0,g=0;g<b;g++)e+=this._calcRowHeight(a[g]);
return b&&e?e/b:0},_updatePreloadRowHeights:function(){var a=this.preload;if(a){for(;a.previous;)a=a.previous;for(;a;)a.rowHeight||(a.rowHeight=this.rowHeight||this._calcAverageRowHeight(a.node.parentNode.querySelectorAll(".dgrid-row")),this._adjustPreloadHeight(a)),a=a.next}},lastScrollTop:0,_processScroll:function(a){function b(a,b){b=b?"next":"previous";for(var c;c=a[b];)a=c;return a}function e(a,c){function e(){var b;a:{b=!c;for(var d=a;d=d[c?"previous":"next"];)if(b===d.top){b=d;break a}b=void 0}if(b&&
h!==b&&!x(b.top?b.node.nextSibling:b.node.previousSibling))return f(),a=b,m=a.node,k=c?a.node.offsetTop-u:r-(a.node.offsetTop+a.node.offsetHeight),p=(b=g(m))&&b.rowIndex,z=void 0,b}function g(a){var b=x(a);(a=a[M])&&!E(a)&&(a=b&&x(a)?null:(b=e())?b:g(a));return a}function f(){a.count+=n;c&&(m.rowIndex-=n);d._adjustPreloadHeight(a);n=0;d._releaseRange(a,c,p,z)}var h=a;a=b(a,c);var k=c?a.node.offsetTop-u:r-(a.node.offsetTop+a.node.offsetHeight),l=d.farOffRemoval,m=a.node,M=c?"previousSibling":"nextSibling",
n=0,q=0,p,z;if(k>2*l){var t;p=(t=g(m))&&t.rowIndex;for(z=void 0;t&&h!==a;){var v=d._calcRowHeight(t);q+v+l>k||!E(t)?t=e():(q+=v,n+=t.count||1,d._pruneRow(t,c),"rowIndex"in t&&(z=t.rowIndex),t=g(t))}f();d._deleteNodeQueue()}}function g(a,b){do a=b?a.next:a.previous;while(a&&!a.node.offsetWidth);return a}var c=this.preload,h;this._updatePreloadRowHeights();if(h=c&&c.rowHeight){var d=this,p=d.bodyNode,r=a&&a.scrollTop||this.getScrollPosition().y,u=p.offsetHeight+r,n;a=d.lastScrollTop;var p=d.bufferRows*
h,v=p-h,w,B=!0;for(d.lastScrollTop=r;c&&!c.node.offsetWidth;)c=c.previous;for(;c&&c!==n;){n=d.preload;d.preload=c;h=c.node;var f=h.offsetTop;if(u+1+v<f)c=g(c,B=!1);else if(r-1-v>f+h.offsetHeight)c=g(c,B=!0);else{var f=((h.top?r-p:u)-f)/c.rowHeight,l=(u-r+2*p)/c.rowHeight,l=l+Math.min(Math.abs(Math.max(Math.min((r-a)*c.rowHeight,d.maxRowsPerPage/2),d.maxRowsPerPage/-2)),10);h.top&&(f-=l);f=Math.max(f,0);10>f&&0<f&&l+f<d.maxRowsPerPage&&(l+=Math.max(0,f),f=0);l=Math.min(Math.max(l,d.minRowsPerPage),
d.maxRowsPerPage,c.count);if(0===l)c=g(c,B);else{var l=Math.ceil(l),f=Math.min(Math.floor(f),c.count-l),k={};c.count-=l;var q=h,A,y=d.queryRowsOverlap,C=!c.top&&c;C?(c.previous&&(e(c),0<f&&x(h.previousSibling)?(f=Math.min(c.count,f),c.previous.count+=f,d._adjustPreloadHeight(c.previous,!0),h.rowIndex+=f,y=0):l+=f,c.count-=f),k.start=h.rowIndex-y,k.count=Math.min(l+y,d.maxRowsPerPage),h.rowIndex=k.start+k.count):(c.next&&(q=h.nextSibling,e(c,!0),x(h.nextSibling)?(c.next.count+=c.count-f,c.next.node.rowIndex=
f+l,d._adjustPreloadHeight(c.next),c.count=f,y=0,q=c.next.node):A=!0),k.start=c.count,k.count=Math.min(l+y,d.maxRowsPerPage),k.scrollingUp=!0);A&&q&&q.offsetWidth&&(A=q.offsetTop);d._adjustPreloadHeight(c);"level"in c.query&&(k.queryLevel=c.query.level);if("queryLevel"in k||!(k.start>d._total||0>k.count)){var D=m.create("div",{className:"dgrid-loading",style:{height:l*c.rowHeight+"px"}},q,"before");m.create("div",{className:"dgrid-"+(C?"below":"above"),innerHTML:d.loadingMessage},D);D.count=l;d._trackError(function(){(function(a,
b,e){var g=c.query(k);w=d.renderQueryResults(g,a,k).then(function(c){var f=d._rows;!f||"queryLevel"in k||!c.length||(b?(f.max<=f.min&&(f.min=c[0].rowIndex),f.max=c[c.length-1].rowIndex):(f.max<=f.min&&(f.max=c[c.length-1].rowIndex),f.min=c[0].rowIndex));q=a.nextSibling;m.destroy(a);e&&q&&q.offsetWidth&&d.scrollTo({y:d.bodyNode.scrollTop+q.offsetTop-e});g.totalLength.then(function(a){"queryLevel"in k||(d._total=a,d._rows&&d._rows.max>=d._total-1&&(d._rows.max=Infinity));b&&(b.count=a-b.node.rowIndex,
d._adjustPreloadHeight(b))});d._processScroll();return c},function(b){m.destroy(a);throw b;})})(D,C,A)});c=c.previous}}}}return w}},_adjustPreloadHeight:function(a,b){a.node.style.height=this._calculatePreloadHeight(a,b)+"px"},_calculatePreloadHeight:function(a,b){return Math.min(a.count*a.rowHeight,b?Infinity:this.maxEmptySpace)},_pruneRow:function(a,b,e){this.removeRow(a,!0,e);this._queueNodeForDeletion(a)},_queueNodeForDeletion:function(a){this._deleteQueue.push(a)},_deleteNodeQueue:function(){for(var a=
document.createElement("div"),b=this._deleteQueue,e=b.length;e--;)a.appendChild(b[e]);this._deleteQueue=[];setTimeout(function(){m.destroy(a)},1)},_removePreloads:function(a){if(a&&a.length){var b=this,e=this._getHeadPreload();a.forEach(function(a){if(a=b._findPreload(a,e))a.previous&&(a.previous.next=a.next),a.next&&(a.next.previous=a.previous)})}},_getHeadPreload:function(){var a=this.preload;if(a)for(;a.previous;)a=a.previous;return a},_findPreload:function(a,b){for(b||(b=this._getHeadPreload());b;){if(b.node===
a)return b;b=b.next}},_getRenderedCollection:function(){return this._renderedCollection},_releaseRange:function(a,b,e,g){if(a){var c=a.level;a=this._getRenderedCollection(a);null!=g&&a.releaseRange&&"number"===typeof e&&"number"===typeof g&&(b?a.releaseRange(g,e+1):a.releaseRange(e,g+1),this._rows&&!c&&(this._rows[b?"max":"min"]=g,this._rows.max>=this._total-1&&(this._rows.max=Infinity)))}}})});
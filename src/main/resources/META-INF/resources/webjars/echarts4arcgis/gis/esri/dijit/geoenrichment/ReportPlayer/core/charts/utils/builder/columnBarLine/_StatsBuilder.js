// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.32/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/charts/utils/builder/columnBarLine/_StatsBuilder",["dojo/_base/declare","../../../../supportClasses/conditionalStyling/ConditionalStyleUtil","../../../../sections/dynamicSettings/supportClasses/FilterUtil","../../ChartTypes","../utils/ChartDataUtil"],function(v,w,x,q,k){return v(null,{_visualProperties:null,_seriesItems:null,_viewModel:null,_currentFeatureIndex:null,_isMultiFeatureChart:null,_excludedSeriesHash:null,_comparisonFeatureAttributes:null,
_chartType:null,_isSecondaryPlot:!1,_oppositeDirections:!1,_totalStats:null,_seriesValues:null,_seriesStats:null,constructor:function(a){this._visualProperties=a.visualProperties;this._seriesItems=a.seriesItems;this._viewModel=a.viewModel;this._currentFeatureIndex=a.currentFeatureIndex;this._isMultiFeatureChart=a.isMultiFeatureChart;this._excludedSeriesHash=a.excludedSeriesHash||{};this._comparisonFeatureAttributes=a.comparisonFeatureAttributes;this._chartType=a.chartType;this._isSecondaryPlot=a.isSecondaryPlot;
this._oppositeDirections=a.oppositeDirections;this._calcValuesForAllSeries();this._calcInSeriesStats();this._visualProperties.isStacked&&this._calcInStackStats();this._calcTotalStats()},gettatisticsForSeriesAt:function(a){return this._seriesStats[a]},getTotalStats:function(){return this._totalStats},_calcValuesForAllSeries:function(){var a=this._visualProperties,c=this._seriesItems,d=this._viewModel,f=this._currentFeatureIndex,e=this._isMultiFeatureChart,b=this._comparisonFeatureAttributes,g=this._chartType,
h=1<c.length&&a.renderColumnBarsInOppositeDirections;this._seriesValues=this._seriesItems.map(function(r,n){var l=2===c.length&&(h||this._oppositeDirections&&this._isSecondaryPlot)?k.CHART_DATA_SMOOTH:null,t=a.filter&&a.filter.ranges&&x.getRangeStatistics(a.filter.ranges),u=a.conditionalStyling&&w.getStatistics(a.conditionalStyling);if(t||u)l=k.getChartData({filterRangesStats:t,conditionalStats:u,numPoints:c[0].points.length,chartData:l,visualProperties:a});return r.points.map(function(c,h){if(c.hidden)return{value:void 0};
var p=k.getPointValue({point:c,index:h,seriesIndex:n,maxValue:!1,chartType:g,visualProperties:a,viewModel:d,currentFeatureIndex:e?q.isLineLike(g)?n:h:f,chartData:l,isComparisonSeries:r.isComparisonSeries,comparisonFeatureAttribute:b&&b[0]}),m=d.getBenchmarkController&&d.getBenchmarkController();return q.isBenchmarkSupported(g,e)&&m&&0<=m.getAreaIndex()&&m.getAreaIndex()!==f?(c=k.getPointValue({point:c,index:h,seriesIndex:n,maxValue:!1,chartType:g,visualProperties:a,viewModel:d,currentFeatureIndex:m.getAreaIndex(),
chartData:l,isComparisonSeries:!1}),{value:p-c,isBenchmarked:!0,ownValue:p}):{value:p}})},this)},_calcInSeriesStats:function(){this._seriesStats=this._seriesItems.map(function(a,c){var d=0,f=0,e=1E6,b=-1E6,g=0;this._excludedSeriesHash[a.label]||a.points.forEach(function(a,k){a.hidden||(g++,a=this._getValueAt(c,k),d+=a,f+=Math.abs(a),e=Math.min(e,a),b=Math.max(b,a))},this);return{values:this._seriesValues[c],sumInSeries:d,absSumInSeries:f,minInSeries:e,maxInSeries:b,avgInSeries:d/g}},this)},_calcInStackStats:function(){this._seriesItems[0].points.forEach(function(a,
c){var d=0,f=[],e=[];this._seriesItems.forEach(function(b,e){this._excludedSeriesHash[b.label]||a.hidden||(b=this._getValueAt(e,c),f[e]=b,d+=Math.abs(b))},this);this._seriesItems.forEach(function(b,g){if(!this._excludedSeriesHash[b.label]&&!a.hidden){b=this._seriesStats[g];b.stackValues=b.stackValues||[];b.stackValues[c]=f;b.weightsInStack=b.weightsInStack||[];var h=this._getValueAt(g,c),h=b.weightsInStack[c]=h/d;b.stackValuesAsWeighedPercents=b.stackValuesAsWeighedPercents||[];b.stackValuesAsWeighedPercents[c]=
e;e[g]=100*h}},this)},this)},_calcTotalStats:function(){var a=this._totalStats={minYValue:Infinity,maxYValue:-Infinity,stackedValues:this._visualProperties.isStacked?[]:null,crossSeriesStats:null};this._seriesItems.forEach(function(c,d){if(!this._excludedSeriesHash[c.label]){var f=this._seriesStats[d];c.points.forEach(function(c,b){c.hidden||(c=this._getValueAt(d,b),c=this._visualProperties.showValuesAsWeightInStack?100*f.weightsInStack[b]:this._visualProperties.yAxis.showValuesAsWeightsInSeries?
c/f.absSumInSeries*100:c,a.stackedValues?(a.stackedValues[b]=a.stackedValues[b]||0,b=a.stackedValues[b]+=c,a.minYValue=Math.min(b,a.minYValue),a.maxYValue=this._visualProperties.showValuesAsWeightInStack?100:Math.max(b,a.maxYValue)):(a.minYValue=Math.min(c,a.minYValue),a.maxYValue=Math.max(c,a.maxYValue)))},this)}},this);a.crossSeriesStats=this._isMultiFeatureChart&&this._collectCrossSeriesStats()},_collectCrossSeriesStats:function(){return this._seriesStats[0].values.map(function(a,c){var d=0,f=
0,e=1E6,b=-1E6;this._seriesStats.forEach(function(a){a=a.values[c].value||0;d+=a;f+=Math.abs(a);e=Math.min(e,a);b=Math.max(b,a)});return{sum:d,absSum:f,min:e,max:b,avg:d/this._seriesStats.length}},this)},_getValueAt:function(a,c){return(c=(a=this._seriesValues[a])&&a[c])&&c.value||0}})});
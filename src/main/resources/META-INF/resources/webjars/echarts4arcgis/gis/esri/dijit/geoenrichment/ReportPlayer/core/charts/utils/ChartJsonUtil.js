// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.32/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/charts/utils/ChartJsonUtil","dojo/_base/lang ./ThemeCalculator ./cleanUp/_ChartJsonCleaner ./ChartTypes ./ChartDataLabelsTypes ../legends/ChartLegendPlacements ../legends/ChartLegendTypes ./plots/supportClasses/GaugeLabelPlacements ./plots/supportClasses/WaffleLabelPlacements ./plots/supportClasses/WaffleDirections ../../../dataProvider/supportClasses/data/AreaDataUtil esri/dijit/geoenrichment/utils/ObjectUtil dojo/i18n!esri/nls/jsapi".split(" "),
function(e,f,k,l,p,m,q,r,t,u,n,d,g){g=g.geoenrichment.dijit.ReportPlayer.ChartContainer;var h={getDefaultChartSettings:function(a){a=a||{};var b=e.mixin({},a.font),c=e.mixin({},a.font);delete c.fontSize;return{isChart:!0,type:a.chartType||l.COLUMN,isMultiFeatureChart:!!a.isMultiFeatureChart,seriesItems:a.seriesItems||[],visualProperties:{barBorders:!1,view3D:!1,origin:0,width:a.width||400,height:a.height||300,marginTop:void 0,marginRight:void 0,marginBottom:void 0,marginLeft:void 0,backgroundColor:void 0,
backgroundColorOpacity:1,plotAreaOutlineColor:void 0,plotAreaOutlineOpacity:1,plotAreaOutlineThickness:0,plotAreaOutlineStyle:void 0,backgroundImageData:void 0,panelBackgroundColor:void 0,title:{text:"",align:"center",style:e.mixin({},b),verticalShift:0},xAxis:{show:!0,hideLine:!1,showTicks:!0,ticksInside:!1,hideLabels:!1,title:"",titleStyle:e.mixin({},b),style:e.mixin({},b),labelsAngle:0,lineColor:void 0,gridLines:!1,gridLinesCentered:!1,gridLinesColor:void 0,gridLinesOpacity:1,gridLinesThickness:.5,
gridLinesStyle:void 0,gridStripes:!1,gridStripesColor:void 0,gridStripesColorAlt:void 0,placement:void 0},yAxis:{show:!0,hideLine:!1,showTicks:!0,ticksInside:!1,hideLabels:!1,title:"",titleStyle:e.mixin({},b),style:e.mixin({},b),labelsAngle:0,lineColor:void 0,gridLines:!1,gridLinesCentered:!1,gridLinesColor:void 0,gridLinesOpacity:1,gridLinesThickness:.5,gridLinesStyle:void 0,gridStripes:!1,gridStripesColor:void 0,gridStripesColorAlt:void 0,hideBaseLine:!1,baseLineColor:void 0,baseLineOpacity:1,baseLineThickness:.5,
baseLineStyle:void 0,baseLineValue:0,showPercentSymbol:!1,showCurrencySymbol:!1,showSymbolForAllLabels:!1,showValuesAsWeightsInSeries:!1,placement:void 0,nonZeroInclusive:!1},legend:{type:q.SERIES,series:{placement:m.NONE,placementOffset:10,hasBorder:!0,labelParts:"Label",style:e.mixin({},b),symbol:void 0,hideOthers:!1,showComparison:!1},minMax:{placement:m.NONE,placementOffset:3,titleStyle:e.mixin({},c),minVariableLabelStyle:e.mixin({},c),maxVariableLabelStyle:e.mixin({},c)}},isStacked:!1,showValuesAsWeightInStack:!1,
columnThickness:f.DEFAULT_COLUMN_THICKNESS,columnBarGap:void 0,columnBarOpacity:1,renderColumnBarsInOppositeDirections:!1,showColumnBarBackground:!1,columnBarBackgroundColor:void 0,columnBarBackgroundOpacity:1,fillOpacity:1,outlineColor:void 0,outlineOpacity:1,outlineThickness:0,outlineStyle:void 0,lineThickness:f.DEFAULT_LINE_THICKNESS,lineOpacity:1,fillLineMarkers:!1,lineMarkersFillOpacity:1,fillLineArea:!1,lineAreaOpacity:1,donutHolePercent:f.DEFAULT_DONUT_HOLE_PERCENT,donutGap:f.DEFAULT_DONUT_GAP,
donutArcPercent:f.DEFAULT_DONUT_ARC_PERCENT,gaugeHolePercent:f.DEFAULT_GAUGE_HOLE_PERCENT,gaugeRangeMin:void 0,gaugeRangeMax:void 0,gaugeGap:f.DEFAULT_GAUGE_GAP,gaugeStartAngle:f.DEFAULT_GAUGE_ANGLE,gaugeArcPercent:f.DEFAULT_GAUGE_ARC_PERCENT,gaugeLabelPlacement:r.INSIDE,gaugeLabelStyle:e.mixin({},c),gaugeShowArrow:!1,gaugeArrowLineColor:void 0,gaugeArrowFillColor:void 0,gaugeConditionalStylingOthers:!1,gaugeConditionalStylingLabel:!1,gaugeShowFromToLabels:!1,gaugeFromLabelStyle:e.mixin({},c),gaugeToLabelStyle:e.mixin({},
c),waffleDirection:u.DOWN_RIGHT,waffleFlowStyle:void 0,waffleShowWholePictures:!1,waffleStretchIconsToFill:!1,waffleRangeMin:void 0,waffleRangeMax:void 0,waffleLabelPlacement:t.BOTTOM,waffleLabelOffset:10,waffleHideValue:!1,waffleHideLabel:!1,waffleShowLabelAbove:!1,waffleValueStyle:e.mixin({},c),waffleLabelStyle:e.mixin({},c),waffleColumnSpace:5,waffleRowSpace:5,waffleConditionalStylingOthers:!1,waffleConditionalStylingValue:!1,waffleConditionalStylingLabel:!1,waffleNumIcons:void 0,waffleNumRows:void 0,
waffleNumColumns:void 0,ringBackgroundColor:void 0,ringBackgroundOpacity:1,columnBarShowWholePictures:!1,dataLabels:p.NONE,dataLabelsShowLabelUnder:!1,dataLabelsDecimals:0,dataLabelsStyle:e.mixin({},b),dataLabelsLabelStyle:null,dataLabelsAltColor:null,dataLabelsEnableAltColor:!1,dataLabelsInside:!1,dataLabelsStackedInColumns:!1,dataLabelsHorizontalAlign:"center",dataLabelsVerticalAlign:"middle",dataLabelsShowValuePercentSymbol:!1,dataLabelsShowValueCurrencySymbol:!1,dataLabelsAngle:0,dataLabelsMaxWidth:void 0,
chartIcons:void 0,floatingIcons:void 0,showAxisIcons:!1,showChartIcons:!1,floatingTexts:void 0,sorting:void 0,filter:void 0,conditionalStyling:void 0},comparisonInfo:void 0}},provideDefaultValueForMissing:function(a,b){b=h.getDefaultChartSettings(b);d.populateObject(a,b);return a},cleanUpJson:function(a,b,c){return k.cleanUpJson(a,b,c)},supportsVisualProperty:function(a,b,c){return k.supportsVisualProperty(b,a,c)},enrichVisualPropertiesWithThemeSettings:function(a,b){a=e.clone(a);a.backgroundColor=
a.backgroundColor||b.backgroundColor;a.outlineColor=a.outlineColor||b.outlineColor;a.outlineStyle=a.outlineStyle||b.outlineStyle;d.populateObject(a.title.style,b.titleStyle);a.xAxis&&(d.populateObject(a.xAxis.style,b.xAxis.axisStyle),d.populateObject(a.xAxis.titleStyle,b.xAxis.titleStyle),a.xAxis.lineColor=a.xAxis.lineColor||b.xAxis.lineColor,a.xAxis.gridLinesColor=a.xAxis.gridLinesColor||b.xAxis.gridLinesColor,a.xAxis.gridLinesStyle=a.xAxis.gridLinesStyle||b.xAxis.gridLinesStyle,a.xAxis.gridStripesColor=
a.xAxis.gridStripesColor||b.xAxis.gridStripesColor,a.xAxis.gridStripesColorAlt=a.xAxis.gridStripesColorAlt||b.xAxis.gridStripesColorAlt,d.populateObject(a.yAxis.style,b.yAxis.axisStyle),d.populateObject(a.yAxis.titleStyle,b.yAxis.titleStyle),a.yAxis.lineColor=a.yAxis.lineColor||b.yAxis.lineColor,a.yAxis.gridLinesColor=a.yAxis.gridLinesColor||b.yAxis.gridLinesColor,a.yAxis.gridLinesStyle=a.yAxis.gridLinesStyle||b.yAxis.gridLinesStyle,a.yAxis.gridStripesColor=a.yAxis.gridStripesColor||b.yAxis.gridStripesColor,
a.yAxis.gridStripesColorAlt=a.yAxis.gridStripesColorAlt||b.yAxis.gridStripesColorAlt,a.yAxis.baseLineColor=a.yAxis.baseLineColor||b.yAxis.baseLineColor,a.yAxis.baseLineStyle=a.yAxis.baseLineStyle||b.yAxis.baseLineStyle);a.legend&&(d.populateObject(a.legend.series.style,b.legendStyle),a.legend.minMax&&(d.populateObject(a.legend.minMax.titleStyle,b.minMaxLegend.titleStyle),d.populateObject(a.legend.minMax.minVariableLabelStyle,b.minMaxLegend.minVariableLabelStyle),d.populateObject(a.legend.minMax.maxVariableLabelStyle,
b.minMaxLegend.maxVariableLabelStyle)));d.populateObject(a.dataLabelsStyle,b.dataLabelsStyle);d.populateObject(a.dataLabelsLabelStyle,a.dataLabelsStyle);a.dataLabelsAltColor=a.dataLabelsAltColor||b.dataLabelsAltColor;d.populateObject(a.gaugeLabelStyle,b.gauge&&b.gauge.dataLabelStyle);a.gaugeArrowLineColor=a.gaugeArrowLineColor||b.gauge&&b.gauge.arrowIndicator.lineColor;a.gaugeArrowFillColor=a.gaugeArrowFillColor||b.gauge&&b.gauge.arrowIndicator.backgroundColor;d.populateObject(a.waffleValueStyle,
b.waffle&&b.waffle.dataValueStyle);d.populateObject(a.waffleLabelStyle,b.waffle&&b.waffle.dataLabelStyle);a.ringBackgroundColor=a.ringBackgroundColor||b.ring&&b.ring.ringBackground&&b.ring.ringBackground.backgroundColor;a.columnBarBackgroundColor=a.columnBarBackgroundColor||b.columnBarBackground&&b.columnBarBackground.backgroundColor;return a},createChartPoint:function(a,b,c,e,d){a={color:c||"",label:void 0!==b?b||"":a&&a.alias,fieldInfo:a,iconFieldInfo:e,captionFieldInfo:d};c&&f.setPointColor(a,
c);return a},getGaugeOthersPoint:function(a){return{label:a&&a.label||g.gaugeOthers,color:a&&a.color}},getWaffleOthersPoint:function(a){return{label:a&&a.label||g.waffleOthers,color:a&&a.color,iconFieldInfo:a&&a.iconFieldInfo}}},v=[{headers:{data:{AREA_DESC:g.oneMile}}},{headers:{data:{AREA_DESC:g.threeMiles}}},{headers:{data:{AREA_DESC:g.fiveMiles}}}];h.getSeriesItemsForMultiFeatureChart=function(a,b,c){if(!b)return b;c=c||v;var d=b[0];return l.isLineLike(a)?c.map(function(a,b){var c=e.clone(d);
c.points.forEach(function(a){delete a.color});if(b=d.multiFeatureLineStyles&&d.multiFeatureLineStyles[b])c.color=b.color,c.lineThickness=b.lineThickness,c.lineStyle=b.lineStyle,c.lineMarker=b.lineMarker,c.lineMarkerColor=b.lineMarkerColor,c.lineMarkerSize=b.lineMarkerSize,c.lineMarkerFillColor=b.lineMarkerFillColor,c.fillColor=b.fillColor;c.label=n.getAreaDataValue({areaDataObject:a,fieldName:"AREA_DESC"})||"";return c}):d.points.map(function(a){return{label:a.label,points:c.map(function(b){return h.createChartPoint(a.fieldInfo,
n.getAreaDataValue({areaDataObject:b,fieldName:"AREA_DESC"})||"",a.color||d.color)})}})};h.getOriginalPointByMultiFeatureIndexes=function(a,b,c){return a[0].points[b]};h.transposeSeriesItems=function(a){return a.length?a[0].points.map(function(b,c){return{label:b.label,points:a.map(function(a){var b=e.clone(a.points[c]);b.label=a.label;return b})}}):[]};return h});
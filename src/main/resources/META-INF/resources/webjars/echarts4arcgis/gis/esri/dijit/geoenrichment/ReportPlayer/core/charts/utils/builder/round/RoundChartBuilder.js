// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.32/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/ReportPlayer/core/charts/utils/builder/round/RoundChartBuilder","dojo/_base/declare dojo/_base/lang ../../ChartTypes ../../ChartDataLabelsTypes ../../plots/Pie ../../plots/Donut ../../plots/Gauge ../../plots/Ring ../../plots/_TouchPlotEvents ../ChartPlots ./_RoundChartSeriesCalculator ./_GaugeChartSeriesCalculator ../utils/ChartDataLabelBuilder".split(" "),function(l,m,c,e,n,p,q,r,t,f,g,h,u){return{configureChart:function(a){a.chart.addPlot(f.PRIMARY,this._createPlot(a.visualProperties,
a.themeSettings,a.viewModel,a.chartType))},_createPlot:function(a,d,f,k){d=e.hasLabel(a.dataLabels);var g=e.hasValue(a.dataLabels),h=e.hasPercent(a.dataLabels);d=(d||g||h)&&k!==c.GAUGE?{labelStyle:a.dataLabelsStackedInColumns?"columns":a.dataLabelsInside?"inside":"outside",omitLabels:!a.dataLabelsStackedInColumns,labelFunc:function(b){return u.formatDataLabel(b,a)}}:{labels:!1};var b;switch(k){case c.PIE:b=n;break;case c.DONUT:b=p;break;case c.GAUGE:b=q;break;case c.RING:b=r}if(!b)return null;b=l([b,
t]);return m.mixin({type:b,animate:f.isAnimationAllowed()},d)},calcSeries:function(a){switch(a.chartType){case c.GAUGE:return h.calcSeries(a);default:return g.calcSeries(a)}}}});
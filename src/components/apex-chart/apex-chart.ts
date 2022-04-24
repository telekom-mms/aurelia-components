import {bindable} from "aurelia-templating";
import {bindingMode} from "aurelia-binding";
import ApexCharts, {ApexOptions} from 'apexcharts';

export interface ISelection {
    series?:number;
    dataPointIndex?:number;
}

export type ApexSeries = ApexAxisChartSeries | ApexNonAxisChartSeries

export class ApexChart {
    private _container: HTMLDivElement;

    @bindable({ defaultBindingMode: bindingMode.fromView })
    chart: ApexCharts|null;

    @bindable({ defaultBindingMode: bindingMode.toView })
    options: ApexOptions;

    @bindable({ defaultBindingMode: bindingMode.toView })
    series: ApexSeries;

    @bindable({ defaultBindingMode: bindingMode.toView })
    selection: ISelection;

    @bindable({ defaultBindingMode: bindingMode.toView })
    class:string;

    attached() {
        if (this.options) {
            this._createChart();
        }

    }

    detached() {
        if (this.chart) {
            this.chart.destroy();
            this.chart = null;
        }
    }

    optionsChanged(newOptions:ApexOptions) {
        if (this.chart) {
            this.chart.updateOptions(newOptions);
        } else {
            this._createChart();
        }
    }

    seriesChanged(newSeries:ApexSeries) {
        if (this.chart) {
            this.chart.updateSeries(newSeries);
        } else {
            this._createChart();
        }
    }

    selectionChanged(newValue:ISelection, oldValue:ISelection) {
        if (this.chart) {
            if (newValue) {
                this.chart.toggleDataPointSelection(newValue.series, newValue.dataPointIndex);
            }
            else if (oldValue) {
                this.chart.toggleDataPointSelection(oldValue.series, oldValue.dataPointIndex);
            }
        }
    }

    private _createChart() {
        if (!this._container) {
            return;
        }

        if (!this.options.series) {
            if (this.series) {
                this.options.series = this.series;
            } else {
                this.options.series = [];
            }
        }

        this.chart = new ApexCharts(this._container, this.options);
        this.chart.render();
    }
}

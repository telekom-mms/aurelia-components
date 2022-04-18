import {bindable} from "aurelia-templating";
import ApexCharts, {ApexOptions} from 'apexcharts';

export interface ISelection {
    series?:number;
    dataPointIndex?:number;
}

export type ApexSeries = ApexAxisChartSeries | ApexNonAxisChartSeries

export class ApexChart {
    private _apex: HTMLDivElement;
    private _myApexChart: ApexCharts;

    @bindable options: ApexOptions;
    @bindable series: ApexSeries;
    @bindable selection: ISelection;
    @bindable class:string;

    private _attached:boolean = false;

    attached() {
        this._attached = true;
        if (this.options) {
            this._createChart();
        }

    }

    detached() {
        this._attached = false;
        if (this._myApexChart) {
            this._myApexChart.destroy();
            this._myApexChart = null;
        }
    }

    optionsChanged(newOptions:ApexOptions) {
        if (this._myApexChart) {
            this._myApexChart.updateOptions(newOptions);
        } else {
            this._createChart();
        }
    }

    seriesChanged(newSeries:ApexSeries) {
        if (this._myApexChart) {
            this._myApexChart.updateSeries(newSeries);
        } else {
            this._createChart();
        }
    }

    selectionChanged(newValue:ISelection, oldValue:ISelection) {
        if (this._myApexChart) {
            if (newValue) {
                this._myApexChart.toggleDataPointSelection(newValue.series, newValue.dataPointIndex);
            }
            else if (oldValue) {
                this._myApexChart.toggleDataPointSelection(oldValue.series, oldValue.dataPointIndex);
            }
        }
    }

    private _createChart() {
        if (!this._apex) {
            return;
        }

        if (!this.options.series) {
            if (this.series) {
                this.options.series = this.series;
            } else {
                this.options.series = [];
            }
        }

        this._myApexChart = new ApexCharts(this._apex, this.options);
        this._myApexChart.render();
    }
}

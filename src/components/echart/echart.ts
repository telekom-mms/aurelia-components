import {bindable, BindingMode, customElement} from "aurelia";
import * as echarts from "echarts";
import {ECBasicOption} from "echarts/types/dist/shared";
import template from "./echart.html"

/**
 * Component for Apache ECharts
 * @author Mike Reiche <mike@reiche.world>
 */
// @customElement({
//     name: 'echart',
//     template
// })
export class Echart {
    private _container: HTMLDivElement;

    @bindable({ mode: BindingMode.fromView })
    chart: echarts.ECharts|null;

    @bindable({ mode: BindingMode.toView })
    options: ECBasicOption;

    @bindable({ mode: BindingMode.toView })
    class:string;

    private readonly onResize= () => {
        this.chart.resize()
    }

    bound() {
        this._createChart()
    }

    unbinding() {
        this.chart.dispose()
        this.chart = null
    }

    attached() {
        if (this.options) {
            this.chart.setOption(this.options)
            this.chart.resize()
        }
        window.addEventListener("resize", this.onResize)
    }

    dispose() {
        window.removeEventListener("resize", this.onResize)
    }

    optionsChanged(newOptions:ECBasicOption) {
        if (!this.chart) {
            this._createChart()
        }
        this.chart.setOption(newOptions, true)
        this.chart.resize()
    }

    private _createChart() {
        if (!this._container) {
            return;
        }
        this.chart = echarts.init(this._container)
    }
}

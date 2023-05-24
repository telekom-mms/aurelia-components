import {bindable} from "aurelia-templating";
import {bindingMode} from "aurelia-binding";
import * as echarts from "echarts/core";
import {ECBasicOption} from "echarts/types/dist/shared";

/**
 * Component for Apache ECharts
 * @author Mike Reiche <mike@reiche.world>
 */
export class Echart {
    private _container: HTMLDivElement;

    @bindable({ defaultBindingMode: bindingMode.fromView })
    chart: echarts.ECharts|null;

    @bindable({ defaultBindingMode: bindingMode.toView })
    options: ECBasicOption;

    @bindable({ defaultBindingMode: bindingMode.toView })
    class:string;

    private readonly onResize= () => {
        this.chart.resize()
    }

    bind() {
        this._createChart()
    }

    attached() {
        if (this.options) {
            this.chart.setOption(this.options)
            this.chart.resize()
        }
        window.addEventListener("resize", this.onResize)
    }

    detached() {
        window.removeEventListener("resize", this.onResize)
    }

    unbind() {
        this.chart.dispose()
        this.chart = null
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

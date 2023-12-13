import {bindable} from "aurelia-templating";
import {bindingMode} from "aurelia-binding";
import * as echarts from "echarts";
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

    bind() {
        this._createChart()
    }

    attached() {
        if (this.options) {
            this.chart.setOption(this.options)
            this._resizeChart()
        }
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
    }

    private _createChart() {
        if (!this._container) {
            return;
        }
        this.chart = echarts.init(this._container)
    }

    private _resizeChart(){
        this.chart.resize()
    }
}

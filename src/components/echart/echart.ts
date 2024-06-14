import { bindable, BindingMode, customElement } from 'aurelia';

@customElement("echart")
export class Echart {
    private _container: HTMLDivElement;

    @bindable({ mode: BindingMode.fromView })
    chart: HTMLElement;

    @bindable({ mode: BindingMode.toView })
    class: string;

    bound() {
        console.log('bound() called');
        this._createChart();
    }

    unbinding() {
        this.chart = null;
    }

    private _createChart() {
        if (!this._container) {
            return;
        }
        this.chart = this._container;
        console.log(this.chart);
    }
}

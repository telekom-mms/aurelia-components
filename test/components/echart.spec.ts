import { createFixture } from '@aurelia/testing';
import { bootstrapTestEnvironment } from '../bootstrap-tests';
import {Echart} from "../../src/components/echart/echart";
import * as echarts from "echarts";

describe('EChart component', () => {
    beforeAll(() => {
        bootstrapTestEnvironment();
    });

    it('Renders the element', async () => {
        class ViewModel {
            _chart: echarts.ECharts
            _options = {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [150, 230, 224, 218, 135, 147, 260],
                        type: 'line'
                    }
                ]
            }
        }
        const { appHost, component, startPromise, tearDown } = createFixture(
            '<echart chart.bind="_chart"></echart>',
            ViewModel,
            [Echart]
        );

        await startPromise;

        expect(component._options).not.toBe(undefined)
        expect(component._chart).not.toBe(undefined)

        await tearDown();
    });
});

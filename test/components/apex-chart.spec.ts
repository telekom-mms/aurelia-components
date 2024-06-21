import { createFixture } from '@aurelia/testing';
import { bootstrapTestEnvironment } from '../bootstrap-tests';
import {ApexChart} from "../../src/components/apex-chart/apex-chart";

describe('ApexChart component', () => {
    beforeAll(() => {
        bootstrapTestEnvironment();

        /**
         * Required for ApexCharts
         * @see https://stackoverflow.com/questions/64558062/how-to-mock-resizeobserver-to-work-in-unit-tests-using-react-testing-library
         */
        global.ResizeObserver = jest.fn().mockImplementation(() => ({
            observe: jest.fn(),
            unobserve: jest.fn(),
            disconnect: jest.fn(),
        }))
    });

    it('Renders the element', async () => {
        class ViewModel {
            myChart: any
            myOptions = {
                chart: {
                    type: 'line'
                },
                series: [{
                    name: 'sales',
                    data: [30,40,35,50,49,60,70,91,125]
                }],
                xaxis: {
                    categories: [1991,1992,1993,1994,1995,1996,1997, 1998,1999]
                }
            }
        }
        const { appHost, component, startPromise, tearDown } = createFixture(
            '<apex-chart chart.bind="myChart" options.bind="myOptions"></apex-chart>',
            ViewModel,
            [ApexChart]
        );

        await startPromise;
        expect(component.myOptions).toBeInstanceOf(Object)
        expect(component.myChart).not.toBe(undefined)

        await tearDown();
    });
});

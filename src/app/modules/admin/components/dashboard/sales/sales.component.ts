import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
    selector: 'app-sales',
    templateUrl: './sales.component.html',
    styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit, OnChanges {

    @Input() public SalesByDates: any

    public Chart;

    public Today = new Date(Date.now()).toISOString().substring(0, 10)
    public StartDate: string = 'All time'

    @Output()
    public TrendGraphDateSelect: EventEmitter<any> = new EventEmitter<any>();

    constructor() { }

    ngOnInit() {
        this.initGraph()
    }

    ngOnChanges(changes: SimpleChange | any) {
        this.initGraph();
    }

    initGraph() {

        this.Chart = new Chart("canvas", {
            type: 'line',
            data: {
                labels: this.SalesByDates.map(date => date._id),
                datasets: [
                    {
                        data: this.SalesByDates.map(date => date.numOfOrders),
                        label: "Sales",
                        borderColor: "#9E61C8",
                        fill: true
                    }
                ],
            },
            options: {
                title: {
                    display: true,
                    text: `Sales from ${this.StartDate} to ${this.Today}`,
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            fontStyle: 'bold',
                            fontColor: "#9E61C8"
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Number of sales',
                            fontStyle: 'bold',
                            fontColor: "#9E61C8"
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            fontStyle: 'bold',
                            fontColor: "#27AE60"

                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Dates',
                            fontStyle: 'bold',
                            fontColor: "#27AE60"
                        }
                    }],
                }
            }
        });
    }

    showFromDate(selectedDate) {
        this.StartDate = selectedDate;
        this.TrendGraphDateSelect.emit(selectedDate)
    }

}
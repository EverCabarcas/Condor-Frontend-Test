import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-chart-machine',
    templateUrl: './chart-machine.component.html',
    styleUrls: ['./chart-machine.component.css']
})
export class ChartMachineComponent implements OnInit {
    bol = false;
    NumberData: number [] = [];
    LabelData: string [] = [];
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels: string[];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;

    public barChartData: any[];

    receive(data: any) {
        while (this.NumberData.length > 0) {
            this.NumberData.pop();
        }
        while (this.LabelData.length > 0) {
            this.LabelData.pop();
        }

        for (let d of data) {
            this.NumberData.push(d.number);
            this.LabelData.push(d.machine);
        }

        this.barChartData = [
            {data: this.NumberData, label: 'Requests​ ​per​ ​Machine'}
        ];
        this.barChartLabels = this.LabelData;
        this.bol = true;
    }

    // events
    public chartClicked(e: any): void {
    }

    public chartHovered(e: any): void {
    }

    constructor() {
    }

    ngOnInit() {
    }

}

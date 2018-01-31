import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-chart-compliance-status',
    templateUrl: './compliance.status.component.html',
    styleUrls: ['./compliance.status.component.css']
})
export class ChartComplianceStatusComponent implements OnInit {

    public bol = false;
    public NumberData: number [] = [];
    public LabelData: string [] = [];
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels: string[];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;
    public barChartData: any[];

    constructor() {
    }

    ngOnInit() {
    }

    receive(data: any) {
        while (this.NumberData.length > 0) {
            this.NumberData.pop();
        }
        while (this.LabelData.length > 0) {
            this.LabelData.pop();
        }

        for (let d of data) {
            this.NumberData.push(d.number);
            this.LabelData.push(d.compliance);
        }

        this.barChartData = [
            {data: this.NumberData, label: 'Compliance​ ​Status​ '}
        ];
        this.barChartLabels = this.LabelData;
        this.bol = true;
    }

}

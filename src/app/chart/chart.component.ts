import {Component, Input, OnInit, ViewChild} from '@angular/core';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
    bol2 = false;
    number: number[] = [];
    name: string [] = [];
    data: number [] = [];
    labels: string [] = [];
    // lineChart
    public lineChartData: Array<any>;
    public lineChartLabels: Array<any>;

    public lineChartOptions: any = {
        responsive: true
    };
    public lineChartColors: Array<any> = [
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];
    public lineChartLegend: boolean = true;
    public lineChartType: string = 'line';


    // events
    public chartClicked(e: any): void {
    }

    public receive(message: any) {
        while (this.data.length > 0) {
            this.data.pop();
        }
        while (this.labels.length > 0) {
            this.labels.pop();
        }
        console.log(message);
        let bol: boolean = false;
        let dates: Date [] = [];
        let count: number = 0;
        let same: number = 0;


        for (let i of message.number) {
            for (let j of dates) {
                if (i.date.getDate() == j.getDate()) {
                    bol = true;
                }
            }
            if (bol == false) {
                dates.push(i.date);
            } else {
                bol = false;
            }
        }
        console.log(dates);
        for (let m of dates) {
            for (let k of message.number) {
                if (m.getDate() == k.date.getDate()) {
                    count += k.averagetime;
                    same++;
                }
            }
            console.log(count);
            this.data.push(Math.abs((count / message.number.length)));
            count = 0;
            same = 0;
        }

        for (let i = dates.length - 1; i >= 0; i--) {
            this.labels.push(dates[i].getDate().toString());
        }

        console.log(this.data);

        this.lineChartData = [
            {data: this.data, label: 'Requests per Day'},
        ];
        this.lineChartLabels = this.labels;
        this.bol2 = true;

        let suma = 0;
        for (let a of this.data) {
            suma += a;
        }
        console.log('la suma:');
        console.log(suma);

    }


    public chartHovered(e: any): void {
    }

    constructor() {
    }

    ngOnInit() {
    }

}

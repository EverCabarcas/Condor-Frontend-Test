import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PagerService} from '../pager.service';
import {IMyDateRangeModel} from 'mydaterangepicker';
import {ChartComponent} from '../chart/chart.component';
import {ChartMachineComponent} from '../chart-machine/chart-machine.component';
import {ChartComplianceStatusComponent} from '../chart-compliance-status/chart-compliance-status.component';
import {OptionsComponent} from '../options/options.component';


@Component({
    selector: 'app-logs',
    templateUrl: './logs.component.html',
    styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

    logresponse: any [] = [];
    numbermachine: any [] = [];
    numbercompliance: any [] = [];
    bol = false;
    loading = false;
    term: any;
    date: Date = new Date();
    daterange: any = {
        beginDate: {year: this.date.getFullYear(), month: (this.date.getMonth() + 1), day: this.date.getDate()},
        endDate: {year: this.date.getFullYear(), month: (this.date.getMonth() + 1), day: this.date.getDate()}
    };
    statecode: string = 'FL';
    fieldselected: string;
    url: string = 'https://api.cebroker.com/v1/cerenewaltransactions/GetLogsRecordData?';
    resultime: number = 0;
    // array of all items to be paged
    private alldata: any[];
    // pager object
    pager: any = {};
    // paged items
    pagedata: any[];

    @ViewChild(ChartComponent) child;
    @ViewChild(ChartMachineComponent) childMachine;
    @ViewChild(ChartComplianceStatusComponent) childCompliance;
    @ViewChild(OptionsComponent) op;


    constructor(private http: HttpClient, private pagerService: PagerService) {
    }

    ngOnInit() {
        this.loading = true;
        this.op.fieldselected = 'Start​ ​Log​ ​Date';
        let url = this.url + 'startdate=' + (this.date.getMonth() + 1).toString() +
            '/' + this.date.getDate().toString() +
            '/' + this.date.getFullYear().toString() +
            '&enddate=' + (this.date.getMonth() + 1).toString() +
            '/' + this.date.getDate().toString() +
            '/' + this.date.getFullYear().toString() + '&state=FL';
        this.http.get(url)
            .subscribe(
                (data: any) => {
                    this.loading = false;
                    this.alldata = data;
                    if (this.alldata.length == 0) {
                        alert('No have any data for this filter');
                        return;
                    }
                    this.ResponseTimeForLog(this.alldata);

                    this.alldata.sort(function (date1, date2) {
                        // This is a comparison function that will result in dates being sorted in
                        // ASCENDING order. As you can see, JavaScript's native comparison operators
                        // can be used to compare dates. This was news to me.
                        if (date1.dt_Start_Log > date2.dt_Start_Log) return 1;
                        if (date1.dt_Start_Log < date2.dt_Start_Log) return -1;
                        return 0;
                    });

                    this.setPage(1);
                    this.RequesByMachine(this.alldata);
                    this.RequesByCompliance(this.alldata);
                    this.child.receive({
                        number: this.logresponse,
                        label: 'Req'
                    });
                    this.childMachine.receive(this.numbermachine);
                    this.childCompliance.receive(this.numbercompliance);
                },
                (err) => {
                    console.error('error');
                    this.loading = false;
                }
            );

    }

    getDateRange(event: IMyDateRangeModel): void {
        this.loading = true;
        this.daterange = event;
        this.op.fieldselected = 'Start​ ​Log​ ​Date';
        let url = this.url + 'startdate=' + (event.beginDate.month.toString()) +
            '/' + event.beginDate.day.toString() +
            '/' + event.beginDate.year.toString() +
            '&enddate=' + event.endDate.month.toString() +
            '/' + event.endDate.day.toString() +
            '/' + event.endDate.year.toString() + '&state=' + this.statecode.toString();

        // console.log(event.beginDate, event.endDate);
        this.http.get(url)
            .subscribe(
                (data: any) => {

                    this.loading = false;
                    this.alldata = data;
                    if (this.alldata.length == 0) {
                        alert('No have any data for this filter');
                        return;
                    }
                    this.ResponseTimeForLog(this.alldata);
                    this.alldata.sort(function (date1, date2) {
                        // This is a comparison function that will result in dates being sorted in
                        // ASCENDING order. As you can see, JavaScript's native comparison operators
                        // can be used to compare dates. This was news to me.
                        if (date1.dt_Start_Log > date2.dt_Start_Log) return 1;
                        if (date1.dt_Start_Log < date2.dt_Start_Log) return -1;
                        return 0;
                    });

                    this.setPage(1);

                    this.RequesByMachine(this.alldata);
                    this.RequesByCompliance(this.alldata);
                    this.child.receive({
                        number: this.logresponse,
                        label: 'Req'
                    });
                    this.childMachine.receive(this.numbermachine);
                    this.childCompliance.receive(this.numbercompliance);
                },
                (err) => {
                    console.error('error');
                    this.loading = false;
                }
            );
    }

    getStateCode(event: string) {
        this.loading = true;
        this.statecode = event;

        let url = this.url + 'startdate=' + (this.daterange.beginDate.month.toString()) +
            '/' + this.daterange.beginDate.day.toString() +
            '/' + this.daterange.beginDate.year.toString() +
            '&enddate=' + this.daterange.endDate.month.toString() +
            '/' + this.daterange.endDate.day.toString() +
            '/' + this.daterange.endDate.year.toString() + '&state=' + this.statecode.toString();

        this.http.get(url)
            .subscribe(
                (data: any) => {
                    this.loading = false;
                    this.alldata = data;
                    if (this.alldata.length == 0) {
                        alert('No have any data for this filter');
                        return;
                    }
                    this.ResponseTimeForLog(this.alldata);

                    console.log(this.alldata.length);
                    this.alldata.sort(function (date1, date2) {
                        // This is a comparison function that will result in dates being sorted in
                        // ASCENDING order. As you can see, JavaScript's native comparison operators
                        // can be used to compare dates. This was news to me.
                        if (date1.dt_Start_Log > date2.dt_Start_Log) return 1;
                        if (date1.dt_Start_Log < date2.dt_Start_Log) return -1;
                        return 0;
                    });

                    this.setPage(1);
                    this.RequesByMachine(this.alldata);
                    this.RequesByCompliance(this.alldata);
                    this.child.receive({
                        number: this.logresponse,
                        label: 'Req'
                    });
                    this.childMachine.receive(this.numbermachine);
                    this.childCompliance.receive(this.numbercompliance);
                },
                (err) => {
                    console.error('error');
                    this.loading = false;
                }
            );
    }

    getField(event: string) {
        this.fieldselected = event;
        switch (this.fieldselected) {
            case 'State​ ​Code':
                this.OrderBySateCode(this.alldata);
                this.setPage(1);
                break;
            case 'Pro​ ​Code':
                this.OrderByProCode(this.alldata);
                this.setPage(1);
                break;
            case 'Profession':
                this.OrderByProfession(this.alldata);
                this.setPage(1);
                break;
            case 'License​ ​ID':
                this.OrderByLicenseId(this.alldata);
                this.setPage(1);
                break;
            case 'Cycle​ ​End​ ​Date':
                this.OrderByCycle(this.alldata);
                this.setPage(1);
                break;
            case 'Compliance​ ​Status':
                this.OrderByCompliance(this.alldata);
                this.setPage(1);
                break;
            case 'Client​ ​ID':
                this.OrderByClientId(this.alldata);
                this.setPage(1);
                break;
            case 'Start​ ​Log​ ​Date':
                this.OrderByStartLog(this.alldata);
                this.setPage(1);
                break;
            case 'End​ ​Log​ ​Date':
                this.OrderByEndLog(this.alldata);
                this.setPage(1);
                break;
            case 'Environment':
                this.OrderByEnvironment(this.alldata);
                this.setPage(1);
                break;
            case 'Machine':
                this.OrderByMachine(this.alldata);
                this.setPage(1);
                break;
        }
    }

    getterm(event: string) {
        this.term = event;
    }

    setPage(page: number) {
        this.pager = {};
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        // get pager object from service
        this.pager = this.pagerService.getPager(this.alldata.length, page);
        console.log(this.pager);
        console.log(this.alldata.length);

        // get current page of items
        this.pagedata = this.alldata.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }


    OrderByProCode(array: any[]) {
        array.sort(function (a, b) {
            return (a.pro_cde - b.pro_cde);
        });
    }

    OrderByClientId(array: any[]) {
        array.sort(function (a, b) {
            return (a.id_client_nbr - b.id_client_nbr);
        });
    }

    OrderBySateCode(array: any[]) {
        array.sort(function (a, b) {
            return (a.cd_cebroker_state > b.cd_cebroker_state) ? 1 : ((b.cd_cebroker_state > a.cd_cebroker_state) ? -1 : 0);
        });
    }

    OrderByProfession(array: any[]) {
        array.sort(function (a, b) {
            return (a.cd_profession > b.cd_profession) ? 1 : ((b.cd_profession > a.cd_profession) ? -1 : 0);
        });
    }

    OrderByLicenseId(array: any[]) {
        /*
        array.sort(function (a, b) {
            return (a.id_license - b.id_license);
        });
        */
        array.sort(function (a, b) {
            return (a.id_license > b.id_license) ? 1 : ((b.id_license > a.id_license) ? -1 : 0);
        });

    }

    OrderByCompliance(array: any[]) {
        array.sort(function (a, b) {
            return (a.ds_compl_status_returned > b.ds_compl_status_returned) ? 1 : ((b.ds_compl_status_returned > a.ds_compl_status_returned) ? -1 : 0);
        });
    }

    OrderByEnvironment(array: any[]) {
        array.sort(function (a, b) {
            return (a.cd_environment > b.cd_environment) ? 1 : ((b.cd_environment > a.cd_environment) ? -1 : 0);
        });
    }

    OrderByMachine(array: any[]) {
        array.sort(function (a, b) {
            return (a.cd_machine > b.cd_machine) ? 1 : ((b.cd_machine > a.cd_machine) ? -1 : 0);
        });
    }

    OrderByCycle(array: any[]) {
        array.sort(function (date1, date2) {
            if (date1.dt_end > date2.dt_end) return 1;
            if (date1.dt_end < date2.dt_end) return -1;
            return 0;
        });

    }

    OrderByStartLog(array: any[]) {
        array.sort(function (date1, date2) {
            if (date1.dt_Start_Log > date2.dt_Start_Log) return 1;
            if (date1.dt_Start_Log < date2.dt_Start_Log) return -1;
            return 0;
        });

    }

    OrderByEndLog(array: any[]) {
        array.sort(function (date1, date2) {
            if (date1.dt_end_log > date2.dt_end_log) return 1;
            if (date1.dt_end_log < date2.dt_end_log) return -1;
            return 0;
        });

    }

    RequesByMachine(array: any[]) {
        this.numbermachine = [];
        let machine: string [] = [];
        let count = 0;
        for (let m of array) {
            for (let m2 of machine) {
                if (m.cd_machine == m2) {
                    this.bol = true;
                }
            }

            if (this.bol == false) {
                machine.push(m.cd_machine);
            } else {
                this.bol = false;
            }
        }

        for (let c of machine) {
            for (let c2 of array) {
                if (c == c2.cd_machine) {
                    count++;
                }
            }
            this.numbermachine.push({
                number: count,
                machine: c
            });
            count = 0;
        }

    }

    RequesByCompliance(array: any[]) {
        this.numbercompliance = [];
        let machine: string [] = [];
        let bol: boolean = false;
        let count = 0;
        for (let m of array) {
            for (let m2 of machine) {
                if (m.ds_compl_status_returned == m2) {
                    bol = true;
                }
            }

            if (bol == false) {
                machine.push(m.ds_compl_status_returned);
            } else {
                bol = false;
            }
        }

        for (let c of machine) {
            for (let c2 of array) {
                if (c == c2.ds_compl_status_returned) {
                    count++;
                }
            }
            this.numbercompliance.push({
                number: count,
                compliance: c
            });
            count = 0;
        }

    }

    ResponseTimeForLog(array: any[]) {
        while (this.logresponse.length > 0) {
            this.logresponse.pop();
        }

        let date1: Date;
        let date2: Date;
        for (let r of array) {
            date1 = new Date(r.dt_Start_Log);
            date2 = new Date(r.dt_end_log);
            this.logresponse.push({
                averagetime: (date2.getMilliseconds() - date1.getMilliseconds()),
                date: date1
            });
        }
        let count = 0;

        for (let c of this.logresponse) {
            count += c.averagetime;
        }
        console.log(count);
        this.resultime = Math.abs(count / this.alldata.length);
        count = 0;
    }

}






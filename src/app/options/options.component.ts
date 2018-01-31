import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {IMyDpOptions} from 'mydatepicker';
import {IMyDrpOptions, IMyDateRangeModel} from 'mydaterangepicker';


@Component({
    selector: 'app-options',
    templateUrl: './options.component.html',
    styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
    datenow: Date = new Date();
    statecodeselected: string = 'FL';
    fieldselected: string = 'Start​ ​Log​ ​Date';
    marcterm: string;
    term;
    beginDate = {};
    m;

    stateCode = [
        {value: 'FL', viewValue: 'FL'},
        {value: 'OH', viewValue: 'OH'},
        {value: 'GA', viewValue: 'GA'},
        {value: 'LA', viewValue: 'LA'}
    ];

    listField = [
        {value: 'State​ ​Code', viewValue: 'State​ ​Code'},
        {value: 'Pro​ ​Code', viewValue: 'Pro​ ​Code'},
        {value: 'Profession', viewValue: 'Profession'},
        {value: 'License​ ​ID', viewValue: 'License​ ​ID'},
        {value: 'Cycle​ ​End​ ​Date', viewValue: 'Cycle​ ​End​ ​Date'},
        {value: 'Compliance​ ​Status', viewValue: 'Compliance​ ​Status'},
        {value: 'Client​ ​ID', viewValue: 'Client​ ​ID'},
        {value: 'Start​ ​Log​ ​Date', viewValue: 'Start​ ​Log​ ​Date'},
        {value: 'End​ ​Log​ ​Date', viewValue: 'End​ ​Log​ ​Date'},
        {value: 'Environment', viewValue: 'Environment'},
        {value: 'Machine', viewValue: 'Machine'},
    ];
    @Output() DateRange = new EventEmitter<IMyDateRangeModel>();
    @Output() StateCode = new EventEmitter<string>();
    @Output() Field = new EventEmitter<string>();
    @Output() Term = new EventEmitter<string>();

    public myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd/mm/yyyy',
    };
    myDateRangePickerOptions: IMyDrpOptions = {
        // other options...
        dateFormat: 'mm/dd/yyyy'
    };

    // Initialized to specific date.
    // public model: any = { date: { year: this.datenow.getFullYear(), month: (this.datenow.getMonth()+1), day: this.datenow.getDate() } };
    private model2: any = {
        beginDate: {year: this.datenow.getFullYear(), month: (this.datenow.getMonth() + 1), day: this.datenow.getDate()},
        endDate: {year: this.datenow.getFullYear(), month: (this.datenow.getMonth() + 1), day: this.datenow.getDate()}
    };

    constructor() {

    }

    ngOnInit() {
    }

    onSelect(event: string) {
        this.StateCode.emit(this.statecodeselected);
    }

    onField(event: string) {
        this.Field.emit(this.fieldselected);
    }

    onterm(event: string) {
        this.Term.emit(this.term);
    }

    onDateRangeChanged(event: IMyDateRangeModel) {
        this.DateRange.emit(event);
    }

}

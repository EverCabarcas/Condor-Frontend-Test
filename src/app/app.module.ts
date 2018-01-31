import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {HttpClientModule} from '@angular/common/http';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MyDatePickerModule} from 'mydatepicker';
import {MyDateRangePickerModule} from 'mydaterangepicker';

import {AppComponent} from './app.component';
import {ChartComponent} from './chart/chart.component';
import {PagerService} from './pager.service';
import {LogsComponent} from './logs/logs.component';
import {OptionsComponent} from './options/options.component';
import {FormsModule} from '@angular/forms';
import {LoadingModule} from 'ngx-loading';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {ChartsModule} from 'ng2-charts';
import {ChartMachineComponent} from './chart-machine/chart-machine.component';
import {ChartComplianceStatusComponent} from './chart-compliance-status/chart-compliance-status.component';
import {TooltipModule} from 'ng2-tooltip';
import {MatDividerModule} from '@angular/material/divider';


@NgModule({
    declarations: [
        AppComponent,
        ChartComponent,
        LogsComponent,
        OptionsComponent,
        ChartMachineComponent,
        ChartComplianceStatusComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatListModule,
        MatCardModule,
        MatPaginatorModule,
        HttpClientModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatFormFieldModule,
        FormsModule,
        MyDatePickerModule,
        MyDateRangePickerModule,
        LoadingModule,
        Ng2SearchPipeModule,
        ChartsModule,
        TooltipModule,
        MatDividerModule

    ],
    providers: [PagerService],
    bootstrap: [AppComponent]
})
export class AppModule {
}

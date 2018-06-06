import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { accordionState } from '../../../../../models/custome_types';

@Component({
    selector: 'app-dashboard-aside',
    templateUrl: './dashboard-aside.component.html',
    styleUrls: ['./dashboard-aside.component.css']
})
export class DashboardAsideComponent implements OnInit {

    @Output()
    public ActionSelect: EventEmitter<any> = new EventEmitter<any>();

    public Accordion: accordionState = {
        OpenedTabs: {
            Sales: true,
            ManageStock: false,
        },
        SelectedAction: 'trendGraph'
    }

    constructor() { }

    ngOnInit() {}

    toggleTab(tab: string) {
        this.Accordion.OpenedTabs[tab] = !this.Accordion.OpenedTabs[tab]
    }

    selectAction(action:'trendGraph' | 'allProducts' | 'topSellers' | 'lowOnStock' | 'addProduct') {
        this.Accordion.SelectedAction = action
        this.ActionSelect.emit(this.Accordion.SelectedAction)
    }

}

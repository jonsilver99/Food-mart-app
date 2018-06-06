import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Order } from '../../../../../models/interfaces';
import * as html2canvas from 'html2canvas';
import { environment } from '../../../../../../environments/environment';

@Component({
    selector: 'app-order-record',
    templateUrl: './order-record.component.html',
    styleUrls: ['./order-record.component.css']
})
export class OrderRecordComponent implements OnInit {

    @Input() public Order: Order;
    // donwload elements
    @ViewChild('OrderRecordTemplate') public OrderRecordTemplate: ElementRef;
    @ViewChild('DownloadableCanvas') public DownloadableCanvas: ElementRef;
    @ViewChild('DonwloadCanvasLink') public DonwloadCanvasLink: ElementRef;
    // action status
    public IsPending: boolean = false;

    constructor() { }

    ngOnInit() { }

    downloadReciept() {
        this.IsPending = true;
        const orderHTML = this.OrderRecordTemplate.nativeElement;
        const canvas = this.DownloadableCanvas.nativeElement;
        const link = this.DonwloadCanvasLink.nativeElement;
        const filename = `order - ${this.Order._id}`;

        const renderOptions = {
            canvas: canvas,
            allowTaint: true,
            foreignObjectRendering: false,
        }

        html2canvas(orderHTML, renderOptions)
            .then(function (canvas) {
                link.href = canvas.toDataURL();
                link.download = filename;
                link.click();
                this.IsPending = false;
            }.bind(this))
            .catch(function (err) {
                console.log(err)
                this.IsPending = false;
            }.bind(this));
    }
}
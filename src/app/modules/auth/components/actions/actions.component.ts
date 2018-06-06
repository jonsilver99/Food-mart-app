import { Component, OnInit, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';

@Component({
    selector: 'app-actions',
    templateUrl: './actions.component.html',
    styleUrls: ['./actions.component.css'],
    // host:
})
export class ActionsComponent implements OnInit, AfterViewInit {

    public Wallpapers: string[] = [
        "/assets/wallpapers/spices2.jpg",
        "/assets/wallpapers/meats.jpg", 
        "/assets/wallpapers/marketaisle.jpg", 
        "/assets/wallpapers/fruits.jpg", 
        "/assets/wallpapers/sweets.jpg", 
        "/assets/wallpapers/spices.jpg"
    ]
    constructor(private ElRef: ElementRef, private Renderer: Renderer2) { }

    ngOnInit() { }

    ngAfterViewInit() {
        this.alternateWallpapers();
    }

    alternateWallpapers(imageIndex: number = 1) {
        setTimeout(() => {
            this.Renderer.setStyle(
                this.ElRef.nativeElement,
                'background-image',
                `
                linear-gradient(to bottom, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)),
                url(${this.Wallpapers[imageIndex]})                
                `
            )
            imageIndex = (imageIndex == this.Wallpapers.length - 1) ? 0 : imageIndex + 1;
            this.alternateWallpapers(imageIndex)
        }, 15000);
    }
}
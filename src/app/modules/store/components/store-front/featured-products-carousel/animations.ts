import { trigger, state, style, transition, animate, query, stagger, keyframes } from '@angular/animations';

// Used in Category carousel component 
export const CategoryCarouselAnimations = [
    trigger('offersAnimation', [
        transition('void => *', [
            query('.offer-cube', style({
                transform: 'translateX(100%)',
                opacity: 0,
            }), { optional: true }),
            query('.offer-cube', stagger('100ms', [
                animate('120ms ease-out', style({
                    transform: 'translateX(0)',
                    opacity: .8,
                }))
            ]), { optional: true })
        ]),
        transition('* => void', [
            query('.offer-cube', stagger('-100ms', [
                animate('120ms', style({
                    transform: 'translateX(100%)',
                    opacity: 0,
                }))
            ]), { optional: true })
        ])
    ]),
    trigger('infoAnimation', [
        transition('void => *', [
            style({
                transform: 'translateX(-100%)',
                opacity: 0
            }),
            animate('250ms ease-out')
        ]),
        transition('* => void', [
            animate(450, keyframes([
                style({
                    transform: 'translateX(0%)',
                    opacity: 1,
                    offset: 0
                }),
                style({
                    transform: 'translateX(-80%)',
                    opacity: 0.2,
                    offset: 0.5
                }),
                style({
                    transform: 'translateX(-100%)',
                    opacity: 0,
                    offset: 1
                })
            ]))
        ])
    ]),
]
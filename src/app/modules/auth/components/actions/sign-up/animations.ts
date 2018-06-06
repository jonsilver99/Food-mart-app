import { trigger, state, style, transition, animate } from "@angular/core";

// Used in signup component 
export const SignUpAnimations = [
    trigger('stepsAnimation', [
        state('next, back', style({
            transform: 'translateX(0)',
            opacity: 1,
        })),
        transition('void => next', [
            style({
                transform: 'translateX(80%)',
                opacity: 0
            }),
            animate(200)
        ]),
        transition('next => void', [
            animate(200, style({
                transform: 'translateX(-80%)',
                opacity: 0
            }))
        ]),
        transition('void => back', [
            style({
                transform: 'translateX(-80%)',
                opacity: 0
            }),
            animate(200)
        ]),
        transition('back => void', [
            animate(200, style({
                transform: 'translateX(80%)',
                opacity: 0
            }))
        ])
    ])
]
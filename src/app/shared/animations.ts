import { trigger, transition, style, animate, query, stagger, state } from '@angular/animations';

export const fadeUp = trigger('fadeUp', [
    transition(':enter', [
        style({ opacity: 0, transform: 'translateY(40px)' }),
        animate('800ms cubic-bezier(0.2, 0.8, 0.2, 1)',
            style({ opacity: 1, transform: 'translateY(0)' }))
    ])
]);

export const listStagger = trigger('listStagger', [
    transition('* => *', [
        query(':enter', [
            style({ opacity: 0, transform: 'translateY(30px)' }),
            stagger(120, [
                animate('600ms cubic-bezier(0.4,0,0.2,1)',
                    style({ opacity: 1, transform: 'translateY(0)' }))
            ])
        ], { optional: true })
    ])
]);

export const cardHover = trigger('cardHover', [
    state('idle', style({ transform: 'translateY(0) scale(1)', boxShadow: '0 4px 24px rgba(0,0,0,0.4)' })),
    state('hovered', style({ transform: 'translateY(-8px) scale(1.02)', boxShadow: '0 20px 60px rgba(79,142,255,0.18)' })),
    transition('idle <=> hovered', animate('400ms cubic-bezier(0.34, 1.56, 0.64, 1)'))
]);

export const sectionFade = trigger('sectionFade', [
    transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('700ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
    ])
]);

export const fadeLeft = trigger('fadeLeft', [
    transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-50px)' }),
        animate('800ms 100ms cubic-bezier(0.2, 0.8, 0.2, 1)',
            style({ opacity: 1, transform: 'translateX(0)' }))
    ])
]);

export const fadeRight = trigger('fadeRight', [
    transition(':enter', [
        style({ opacity: 0, transform: 'translateX(50px)' }),
        animate('800ms 100ms cubic-bezier(0.2, 0.8, 0.2, 1)',
            style({ opacity: 1, transform: 'translateX(0)' }))
    ])
]);

export const formSuccess = trigger('formSuccess', [
    transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.92)' }),
        animate('500ms cubic-bezier(0.4,0,0.2,1)',
            style({ opacity: 1, transform: 'scale(1)' }))
    ])
]);

export const navSlide = trigger('navSlide', [
    transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-100%)' }),
        animate('600ms cubic-bezier(0.2, 0.8, 0.2, 1)',
            style({ opacity: 1, transform: 'translateY(0)' }))
    ])
]);

export const mobileMenuTrigger = trigger('mobileMenu', [
    transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100%)' }),
        animate('500ms cubic-bezier(0.2, 0.8, 0.2, 1)',
            style({ opacity: 1, transform: 'translateX(0)' }))
    ]),
    transition(':leave', [
        animate('400ms cubic-bezier(0.4,0,0.2,1)',
            style({ opacity: 0, transform: 'translateX(100%)' }))
    ])
]);

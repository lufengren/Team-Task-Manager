import { trigger, state, style, transition, animate } from '@angular/animations';

export const routerAni = trigger('routerAni', [
  state('void', style({ position: 'fixed', width: '100%', height: '80%' })),
  state('*', style({ position: 'fixed', width: '100%', height: '80%' })),
  transition('void => *', [
    style({ transform: 'translateX(-100%)' }),
    animate('2s ease-in-out', style({ transform: 'translateX(0)' })),
  ]),
  transition('* => void', [
    style({ transform: 'translateX(0)' }),
    animate('2s ease-in-out', style({ transform: 'translateX(100%)' })),
  ]),
]);



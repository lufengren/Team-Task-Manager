import { trigger, state, style, transition, animate } from '@angular/animations';

export const projectCardAni = trigger('card', [
  state('original', style({ transform: 'scale(1)', 'box-shadow': 'none' })),
  state('hover', style({ transform: 'scale(1.1)', 'box-shadow': '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' })),
  transition('original => hover', animate('100ms ease-in')),
  transition('hover => original', animate('100ms ease-out')),
]);

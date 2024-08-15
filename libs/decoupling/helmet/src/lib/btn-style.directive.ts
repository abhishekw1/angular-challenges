/* eslint-disable @angular-eslint/directive-selector */
import { BUTTON_STATE_TOKEN } from '@angular-challenges/decoupling/core';
import {
  Directive,
  ElementRef,
  Renderer2,
  effect,
  inject,
  signal,
} from '@angular/core';

@Directive({
  selector: 'button[hlm]',
  standalone: true,
  host: {
    class:
      'border border-black p-4 rounded-md bg-white data-[state=disabled]:bg-gray-400 data-[state=disabled]:text-white',
  },
})
export class BtnHelmetDirective {
  btnState = inject(BUTTON_STATE_TOKEN, { self: true });
  public state = this.btnState?.state ?? signal('disabled').asReadonly();
  private renderer = inject(Renderer2);
  private element = inject(ElementRef);

  private rendererEffect = effect(() => {
    console.log(this.btnState);
    this.renderer.setAttribute(
      this.element.nativeElement,
      'data-state',
      this.state(),
    );
  });
}

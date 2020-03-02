import { Directive, ElementRef, Input } from "@angular/core";

@Directive({
  selector: '[groupViewer]'
})
export class GroupViewerDirective {

  constructor(private element: ElementRef) {}

  @Input()
  set groupViewer(viewed: boolean) {
    setTimeout(() => {
      const nativeElement: HTMLElement = this.element.nativeElement;
      viewed ? nativeElement.style.fontWeight = 'normal' : nativeElement.style.fontWeight = 'bold';
    }, 500);
  }
}

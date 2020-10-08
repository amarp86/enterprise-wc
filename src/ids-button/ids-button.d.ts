// Ids is a JavaScript project, but we define TypeScript declarations so we can
// confirm our code is type safe, and to support TypeScript users.

interface nativeElement extends HTMLElement {
  /* The size of the icon to display */
  type: 'normal' | 'small' | 'medium' | 'medium' | 'large';
  /* The name of the icon to display */
  icon: string;
}

export class IdsButton extends HTMLElement {
  nativeElement: nativeElement;
}

export class IdsToggleButton extends IdsButton {
  nativeElement: nativeElement;
}

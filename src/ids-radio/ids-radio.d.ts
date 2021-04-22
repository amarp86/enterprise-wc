// Ids is a JavaScript project, but we define TypeScript declarations so we can
// confirm our code is type safe, and to support TypeScript users.

export default class IdsRadio extends HTMLElement {
  /** Sets the checked state of the radio */
  checked: boolean;

  /** Sets the color state of the radio */
  color: string;

  /** Sets the disabled state of the radio */
  disabled: boolean;

  /** Sets the disabled state of for the whole radio group */
  groupDisabled: boolean;

  /** Shows the radio in horizontal mode */
  horizontal: boolean;

  /** The component label */
  label: string;

  /** The component label's font-size */
  labelFontSize: 10 | 12 | 14 | 16 | 20 | 24 | 28 | 32 | 40 | 48 | 60 | 72 |
    'xs' | 'sm ' | 'lg' | 'xl' | string | number;

  /** Set the theme mode */
  mode: 'light' | 'dark' | 'contrast' | string;

  /** Set the theme version */
  version: 'new' | 'classic' | string;

  /** Sets the validation error state */
  validationHasError: boolean;

  /** Sets the radio value */
  value: string;
}

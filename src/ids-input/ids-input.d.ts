// Ids is a JavaScript project, but we define TypeScript declarations so we can
// confirm our code is type safe, and to support TypeScript users.
import { IdsElement } from '../ids-base/ids-element';

type IdsValidationErrorMessageTypes = {
  /** The unique id in the check messages */
  id: string;

  /** The Type of message and icon */
  type: 'error' | 'info' | 'alert' | 'warn';

  /** The localized message text */
  message: string;

  /** The Type of message icon */
  icon: string;
}

type IdsValidationTypes = {
  /** Add a message to the input */
  addMessage(settings: IdsValidationErrorMessageTypes);

  /** Remove a message(s) from the input */
  removeMessage(settings: IdsValidationErrorMessageTypes);
}

export default class IdsInput extends IdsElement {
  /** When set the input will select all text on focus */
  autoselect: boolean;

  /** When set the input will render as transparent background */
  bgTransparent: boolean;

  /** When set the input will add a clearable x button */
  clearable: boolean;

  /** When set the input will add a clearable x button to forced for readonly */
  clearableForced: boolean;

  /** Sets the dirty tracking feature on to indicate a changed field */
  dirtyTracker: boolean;

  /** Sets checkbox to disabled * */
  disabled: boolean;

  /** Sets the input label text * */
  label: string;

  /** Sets the input placeholder text * */
  placeholder: string

  /** Sets the size (width) of input * */
  size: 'xs' | 'sm ' | 'mm' | 'md' | 'lg' | 'full' | string;

  /** Sets the input to readonly state * */
  readonly: boolean;

  /** Sets the text alignment * */
  textAlign: 'left' | 'center ' | 'right' | string;

  /** Sets the input type * */
  type: 'text' | 'password' | 'email' | 'number' | string;

  /** Sets the validation check to use * */
  validate: 'required' | 'email' | string;

  /** Sets the validation events to use * */
  validationEvents: 'blur' | string;

  /** Sets the `value` attribute * */
  value: string | number;

  /** Set the theme mode */
  mode: 'light' | 'dark' | 'contrast' | string;

  /** Set the theme version */
  version: 'new' | 'classic' | string;

  IdsValidationTypes;
}

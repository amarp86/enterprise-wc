// Ids is a JavaScript project, but we define TypeScript declarations so we can
// confirm our code is type safe, and to support TypeScript users.

import { IdsElement } from '../ids-base/ids-element';

interface IdsProgressEventDetail extends Event {
  detail: {
    elem: IdsProgress
  }
}

export default class IdsProgress extends IdsElement {
  /** Sets to disabled * */
  disabled: boolean;

  /** Sets the input label text * */
  label: string;

  /** Sets the input label text as audible * */
  labelAudible: boolean;

  /** Sets the max attribute * */
  max: string | number

  /** Sets the `value` attribute * */
  value: string | number;

  /** Fires after updated the progress value */
  on(event: 'updated', listener: (detail: IdsProgressEventDetail) => void): this;
}

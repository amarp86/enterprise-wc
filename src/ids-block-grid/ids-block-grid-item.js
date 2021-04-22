import {
  IdsElement,
  customElement,
  scss
} from '../ids-base/ids-element';
// @ts-ignore
import styles from './ids-block-grid-item.scss';

/**
 * IDS Block Grid Item Component
 * @type {IdsBlockgridItem}
 * @inherits IdsElement
 */
@customElement('ids-block-grid-item')
@scss(styles)
class IdsBlockgridItem extends IdsElement {
  constructor() {
    super();
  }

  template() {
    return `<slot></slot>`;
  }
}

export default IdsBlockgridItem;

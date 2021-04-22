import {
  IdsElement,
  customElement,
  scss,
  props,
  mix
} from '../ids-base/ids-element';

// Import Mixins
import { IdsThemeMixin } from '../ids-base/ids-theme-mixin';
import { IdsEventsMixin } from '../ids-base/ids-events-mixin';
import { IdsStringUtils as stringUtils } from '../ids-base/ids-string-utils';

// @ts-ignore
import styles from './ids-hyperlink.scss';

/**
 * IDS Hyperlink Component
 * @type {IdsHyperlink}
 * @inherits IdsElement
 * @mixes IdsThemeMixin
 * @mixes IdsEventsMixin
 * @part link - the link element
 */
@customElement('ids-hyperlink')
@scss(styles)
class IdsHyperlink extends mix(IdsElement).with(IdsEventsMixin, IdsThemeMixin) {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
  }

  /**
   * Return the properties we handle as getters/setters
   * @returns {Array} The properties in an array
   */
  static get properties() {
    return [
      props.HREF,
      props.TARGET,
      props.DISABLED,
      props.MODE,
      props.VERSION
    ];
  }

  /**
   * Inner template contents
   * @returns {string} The template
   */
  template() {
    return `<a class="ids-hyperlink" part="link"><slot></slot></a>`;
  }

  /**
   * Set the link href
   * @param {string} value Set the link's href to some link
   */
  set href(value) {
    if (value) {
      this.setAttribute(props.HREF, value);
      this.container.setAttribute(props.HREF, value);
      return;
    }
    this.removeAttribute(props.HREF);
    this.container.removeAttribute(props.HREF);
  }

  get href() { return this.getAttribute(props.HREF); }

  /**
   * Set the link target attribute
   * @param {string} value Set the link's href to some link
   */
  set target(value) {
    if (value) {
      this.setAttribute(props.TARGET, value);
      this.container.setAttribute(props.TARGET, value);
      return;
    }
    this.removeAttribute(props.TARGET);
    this.container.removeAttribute(props.TARGET);
  }

  get target() { return this.getAttribute(props.TARGET); }

  /**
   * Set the text to disabled color.
   * @param {boolean} value True if disabled
   */
  set disabled(value) {
    const val = stringUtils.stringToBool(value);
    if (val) {
      this.setAttribute(props.DISABLED, value);
      this.container.setAttribute(props.DISABLED, value);
      this.container.setAttribute('tabindex', '-1');
      return;
    }
    this.removeAttribute(props.DISABLED);
    this.container.removeAttribute(props.DISABLED);
    this.container.removeAttribute('tabindex');
  }

  get disabled() { return this.getAttribute(props.DISABLED); }
}

export default IdsHyperlink;

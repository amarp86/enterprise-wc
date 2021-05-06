import {
  IdsElement,
  customElement,
  props,
  scss,
  mix
} from '../ids-base/ids-element';
import { IdsKeyboardMixin, IdsEventsMixin } from '../ids-base';
import IdsTab from './ids-tab';
import styles from './ids-tabs.scss';

/**
 * combines classes and considers truthy/falsy +
 * doesn't pollute the attribs/DOM without
 * any fuss
 *
 * @param  {...any} classes classes/expressions
 * @returns {string} ` class="c1 c2..."` || ""
 */
const buildClassAttrib = (...classes) => {
  const classAttrib = classes.reduce((attribStr = '', c) => {
    if (attribStr && c) { return `${attribStr} ${c}`; }
    if (!attribStr && c) { return c; }
    return attribStr;
  }, '');

  return !classAttrib ? '' : ` class=${classAttrib}`;
};

/**
 * IDS Tabs Component
 * @type {IdsTabs}
 * @inherits IdsElement
 */
@customElement('ids-tabs')
@scss(styles)
class IdsTabs extends mix(IdsElement).with(IdsEventsMixin, IdsKeyboardMixin) {
  /**
   * lets us quickly reference the active element
   * for current index selected with arrow left/right
   * mapping
   */
  tabElIndexMap = new Map();

  /**
   * needed to keep track of event listeners
   * added
   */
  tabValueSet = new Set();

  constructor() {
    super();
  }

  /**
   * Return the properties we handle as getters/setters
   * @returns {Array} The properties in an array
   */
  static get properties() {
    return [props.ORIENTATION, props.VALUE, props.ID];
  }

  /**
   * Create the Template for the contents
   * @returns {string} the template to render
   */
  template() {
    return (
      `<ul
        ${buildClassAttrib('ids-tabs', this.orientation)}
      >
        <slot></slot>
      </ul>`
    );
  }

  getFocusedTabIndex() {
    console.log('getFocusedTabIndex ->', document.activeElement);
    if (!(document.activeElement instanceof IdsTab)) {
      return -1;
    }

    if (this.tabElIndexMap.has(document.activeElement)) {
      console.log('it existed?');
      return this.tabElIndexMap.get(document.activeElement);
    }

    return -1;
  }

  // TODO: run child-attrib setters in another re-usable fn
  connectedCallback() {
    this.setAttribute('role', 'tabs');

    this.tabElIndexMap.clear();
    for (let i = 0; i < this.children.length; i++) {
      this.tabElIndexMap.set(this.children[i], i);
    }

    // TODO: (1) only ArrowLeft/Right on horizontal orientation
    // TODO: (2) ArrowUp/Down for vertical orientation

    this.listen('ArrowLeft', this.container, () => {
      const focusedTabIndex = this.getFocusedTabIndex();

      if (focusedTabIndex > 0) {
        this.children[focusedTabIndex - 1].focus();
      }
    });

    this.listen('ArrowRight', this.container, () => {
      const focusedTabIndex = this.getFocusedTabIndex();

      if (focusedTabIndex + 1 < this.children.length) {
        this.children[focusedTabIndex + 1].focus();
      }
    });

    this.listen('Tab', this, (e) => {
      e.preventDefault?.();
      if (e.shiftKey) {
        const focusedTabIndex = this.getFocusedTabIndex();

        if (focusedTabIndex > 0) {
          this.children[focusedTabIndex - 1].focus();
        }
        return;
      }

      const focusedTabIndex = this.getFocusedTabIndex();

      if (focusedTabIndex + 1 < this.children.length) {
        this.children[focusedTabIndex + 1].focus();
      }
    });

    this.listen('Home', this.container, () => {
      this.children[0].focus();
    });

    this.listen('End', this.container, () => {
      this.children[this.children.length - 1].focus();
    });

    this.listen('Enter', this.container, () => {
      const focusedTabIndex = this.getFocusedTabIndex();

      if (focusedTabIndex >= 0 && focusedTabIndex < this.children.length) {
        this.setAttribute(props.VALUE, this.getTabIndexValue(focusedTabIndex));
      }
    });
  }

  /**
   * Binds associated callbacks and cleans
   * old handlers when template refreshes
   */
  rendered() {
    /* istanbul ignore next */
    if (!this.shouldUpdateCallbacks) {
      return;
    }

    // stop observing changes before updating DOM
    this.stepObserver.disconnect();
    this.resizeObserver.disconnect();

    // set up observer for resize which prevents overlapping labels
    this.resizeObserver.observe(this.container);

    // set up observer for monitoring if a child element changed
    this.stepObserver.observe(this, {
      childList: true,
      attributes: true,
      subtree: true
    });

    this.shouldUpdateCallbacks = false;
  }

  /**
   * Set the orientation of how tabs will be laid out
   * @param {'horizontal' | 'vertical'} value orientation
   */
  set orientation(value) {
    switch (value) {
    case 'vertical': {
      this.setAttribute(props.ORIENTATION, 'vertical');
      break;
    }
    case 'horizontal':
    default: {
      this.setAttribute(props.ORIENTATION, 'horizontal');
      break;
    }
    }
  }

  get orientation() {
    return this.getAttribute(props.ORIENTATION);
  }

  /**
   * the value representing a currently selected tab
   * @type {string}
   */
  set value(value) {
    this.setAttribute(props.VALUE, value);

    // determine which child tab value was set,
    // then highlight the item

    for (let i = 0; i < this.children.length; i++) {
      const tabValue = this.children[i].getAttribute(props.VALUE);
      this.children[i].selected = tabValue === value;
    }
  }

  get value() {
    return this.getAttribute(props.VALUE);
  }

  /**
   * Returns the value provided for a tab at a specified
   * index; if it does not exist, then return zero-based index
   *
   * @param {number} index 0-based tab index
   * @returns {string | number} value or index
   */
  getTabIndexValue(index) {
    return this.children?.[index]?.getAttribute(props.VALUE) || index;
  }

  rendered = () => {
    // clear each existing click handler

    for (const tabValue of this.tabValueSet) {
      this.offEvent(`click.${tabValue}`);
      this.tabValueSet.delete(tabValue);
    }

    // scan through children and add click handlers
    for (let i = 0; i < this.children.length; i++) {
      const tabValue = this.getTabIndexValue(i);
      const eventNs = `click.${tabValue}`;
      this.tabValueSet.add(eventNs);
      this.onEvent(
        eventNs,
        this.children[i],
        () => { this.value = tabValue; }
      );
    }
  };
}

export default IdsTabs;

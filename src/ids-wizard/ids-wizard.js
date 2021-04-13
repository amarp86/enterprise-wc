import clsx from 'clsx';
import {
  IdsElement,
  customElement,
  scss,
  mix
} from '../ids-base/ids-element';
import { IdsEventsMixin } from '../ids-base/ids-events-mixin';
import IdsWizardStep from './ids-wizard-step';
// @ts-ignore
import styles from './ids-wizard.scss';

/**
 * IDS Wizard Component
 * @type {IdsWizard}
 * @inherits IdsElement
 */
@customElement('ids-wizard')
@scss(styles)
class IdsWizard extends mix(IdsElement).with(IdsEventsMixin) {
  constructor() {
    super();
  }

  shouldUpdateCallbacks = true;

  stepObserver = new MutationObserver((mutations, observer) => {
    for (const { type } of mutations) {
      // @ts-ignore
      if (type === 'childList') {
        this.shouldUpdateCallbacks = true;
        this.render();
      }
    }
  });

  /**
   * Return the properties we handle as getters/setters
   * @returns {Array} The properties in an array
   */
  static get properties() {
    return ['step-number'];
  }

  /**
   * Create the Template for the contents
   * @returns {string} The Template
   */
  template() {
    let stepsBarInnerHtml = '';
    let stepLabelsInnerHtml = '';

    // iterate through ids-wizard-step
    // lightDOM to create shadowDOM markup

    // @ts-ignore
    const stepIndex = this.stepNumber - 1;

    for (const [i, stepEl] of [...this.children].entries()) {
      const isCurrentStep = stepIndex === i;
      const isVisitedStep = i <= stepIndex;
      const isClickable = stepEl.getAttribute('clickable');
      const aHrefAttrib = isClickable ? ' href="#"' : '';

      // --------------------- //
      // construct bar steps   //
      // ===================== //

      const markerClassName = clsx(
        'bar-step',
        isCurrentStep && 'current',
        isVisitedStep && 'visited',
        isClickable && 'clickable'
      );

      const pathSegmentHtml = (i >= this.children.length - 1) ? '' : (
        `<div class="path-segment${stepIndex <= i ? '' : ' visited'}"></div>`
      );

      stepsBarInnerHtml += (
        `<a class="${markerClassName}"${aHrefAttrib} step-number=${i + 1}>
          <div class="step-node">
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="12" />
            </svg>
            ${ !isCurrentStep ? '' : (
              `<svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="12" />
              </svg>`) }
          </div>
        </a>
        ${pathSegmentHtml}`
      );

      // --------------------- //
      // construct labels      //
      // ===================== //

      // @ts-ignore
      const label = stepEl.innerText;
      stepLabelsInnerHtml += (
        `<a class="step-label${isVisitedStep ? ' visited' : ''}" step-number=${i + 1}>
          <ids-text
            overflow="ellipsis"
            size=18
            font-weight="${isCurrentStep ? 'bold' : 'normal'}"
          >${label}
          </ids-text>
        </a>`
      );
    }

    return (
      `<div class="ids-wizard">
        <div class="marker-bar">
          ${stepsBarInnerHtml}
        </div>
        <div class="step-labels">
          ${stepLabelsInnerHtml}
        </div>
      </div>`
    );
  }

  /**
   * Get the step number
   * @returns {number|string} step number (1-based)
   */
  get stepNumber() {
    // @ts-ignore
    const stepNumber = parseInt(this.getAttribute('step-number'));
    if (Number.isNaN(stepNumber)) {
      return -1;
    }
    return parseInt(this.getAttribute('step-number')) || 1;
  }

  /**
   * Set the step number
   * @param {number|string} value step number (1-based)
   */
  set stepNumber(value) {
    if (Number.isNaN(Number(value))) {
      throw new Error('ids-wizard: Invalid step number provided');
    }

    // @ts-ignore
    const v = parseInt(value);
    if (v < 0) {
      throw new Error('ids-wizard: step number should be > 0');
    } else if (v > this.children.length) {
      throw new Error('ids-wizard: step number should be below step-count');
    }

    this.setAttribute('step-number', v);
    this.render();
  }

  // @ts-ignore

  /**
   * Handle Setting changes of the value has changed by calling the getter
   * in the extending class.
   * @param  {string} name The property name
   * @param  {string} oldValue The property old value
   * @param  {string} newValue The property new value
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (name) {
      case 'step-number': {
        this.shouldUpdateCallbacks = true;
        break;
      }
      default: break;
      }
    }

    super.attributeChangedCallback(name, oldValue, newValue);
  }

  rendered = () => {
    if (!this.shouldUpdateCallbacks) {
      return;
    }

    this.stepObserver.disconnect();

    console.log('updating with new callbacks');

    // query through all steps and add click callbacks
    for (let stepNumber = 1; stepNumber <= this.children.length; stepNumber++) {
      const stepMarker = this.shadowRoot.querySelector(
        `.bar-step[step-number="${stepNumber}"]`
      );
      const stepLabel = this.shadowRoot.querySelector(
        `.step-label[step-number="${stepNumber}"]`
      );

      const onClickStep = () => {
        this.stepNumber = `${stepNumber}`;
      };

      this.onEvent(`click.step-marker.${stepNumber}`, stepMarker, onClickStep);
      this.onEvent(`click.step-label.${stepNumber}`, stepLabel, onClickStep);
    }

    // set up observer for monitoring if a child element changed
    // @ts-ignore
    this.stepObserver.observe(this, {
      childList: true,
      attributes: true,
      subtree: true
    });

    this.shouldUpdateCallbacks = false;
  };
}

export { IdsWizardStep };
export default IdsWizard;

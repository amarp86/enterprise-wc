/**
 * @jest-environment jsdom
 */
import IdsContainer from '../../src/ids-container/ids-container';
import IdsThemeSwitcher from '../../src/ids-theme-switcher/ids-theme-switcher';

describe('IdsThemeSwitcher Component', () => {
  let container;
  let switcher;

  beforeEach(async () => {
    container = new IdsContainer();
    switcher = new IdsThemeSwitcher();
    container.appendChild(switcher);
    document.body.appendChild(container);
  });

  afterEach(async () => {
    document.body.innerHTML = '';
  });

  it('renders with no errors', () => {
    const errors = jest.spyOn(global.console, 'error');
    const container2 = new IdsContainer();
    const switcher2 = new IdsThemeSwitcher();
    container2.appendChild(switcher2);
    document.body.appendChild(container2);
    container2.remove();
    switcher2.remove();
    expect(document.querySelectorAll('ids-container').length).toEqual(1);
    expect(errors).not.toHaveBeenCalled();
  });

  it('renders correctly', () => {
    expect(switcher.shadowRoot.innerHTML).toMatchSnapshot();
  });

  it('handles selected from the ids-popup-menu', () => {
    const event = new CustomEvent('selected', { detail: { elem: { value: 'classic' } } });
    switcher.shadowRoot.querySelector('ids-popup-menu').dispatchEvent(event);

    expect(switcher.version).toEqual('classic');

    event.detail.elem.value = 'contrast';
    switcher.shadowRoot.querySelector('ids-popup-menu').dispatchEvent(event);

    expect(switcher.version).toEqual('classic');
    expect(switcher.mode).toEqual('contrast');
  });

  it('can set mode and then clear it to default', () => {
    switcher.mode = 'dark';
    switcher.mode = '';
    expect(switcher.mode).toEqual('light');
    expect(switcher.getAttribute('mode')).toBeFalsy();
  });

  it('can set mode and then clear it to default', () => {
    switcher.version = 'classic';
    switcher.version = '';
    expect(switcher.version).toEqual('new');
    expect(switcher.getAttribute('version')).toBeFalsy();
  });
});

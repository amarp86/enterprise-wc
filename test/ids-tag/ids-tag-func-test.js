/**
 * @jest-environment jsdom
 */
import IdsTag from '../../src/ids-tag/ids-tag';

describe('IdsTag Component', () => {
  let tag;

  beforeEach(async () => {
    const elem = new IdsTag();
    document.body.appendChild(elem);
    tag = document.querySelector('ids-tag');
  });

  afterEach(async () => {
    document.body.innerHTML = '';
  });

  it('renders with no errors', () => {
    const errors = jest.spyOn(global.console, 'error');
    const elem = new IdsTag();
    document.body.appendChild(elem);
    elem.remove();
    expect(document.querySelectorAll('ids-tag').length).toEqual(1);
    expect(errors).not.toHaveBeenCalled();
  });

  it('renders correctly', () => {
    expect(tag.outerHTML).toMatchSnapshot();
    tag.dismissible = true;
    expect(tag.outerHTML).toMatchSnapshot();

    tag.dismissible = false;
    tag.color = 'error';
    expect(tag.outerHTML).toMatchSnapshot();
  });

  it('renders success color from an attribute', () => {
    tag.setAttribute('color', 'success');
    expect(tag.getAttribute('color')).toEqual('success');
    expect(tag.color).toEqual('success');
  });

  it('renders success color from the api', () => {
    tag.color = 'success';
    expect(tag.getAttribute('color')).toEqual('success');
    expect(tag.color).toEqual('success');
  });

  it('renders error from the api', () => {
    tag.color = 'error';
    expect(tag.getAttribute('color')).toEqual('error');
    expect(tag.color).toEqual('error');
  });

  it('renders danger from the api', () => {
    tag.color = 'danger';
    expect(tag.getAttribute('color')).toEqual('danger');
    expect(tag.color).toEqual('danger');
  });

  it('renders specific hex color', () => {
    tag.color = '#800000';
    expect(tag.getAttribute('color')).toEqual('#800000');
    expect(tag.color).toEqual('#800000');
  });

  it('renders an extra border on secondary tags', () => {
    tag.color = 'secondary';
    expect(tag.getAttribute('color')).toEqual('secondary');
    expect(tag.color).toEqual('secondary');
  });

  it('removes the color attribute when reset', () => {
    tag.color = 'secondary';
    expect(tag.getAttribute('color')).toEqual('secondary');
    expect(tag.color).toEqual('secondary');

    tag.removeAttribute('color');
    expect(tag.getAttribute('color')).toEqual(null);
    expect(tag.color).toEqual(null);
  });

  it('removes the dismissible attribute when reset', () => {
    tag.dismissible = true;
    expect(tag.getAttribute('dismissible')).toEqual('true');
    expect(tag.dismissible).toEqual('true');

    tag.dismissible = false;
    expect(tag.getAttribute('dismissible')).toEqual(null);
    expect(tag.dismissible).toEqual(null);
  });

  it('dismisses on click', () => {
    tag.dismissible = true;
    tag.querySelector('ids-icon[icon="close"]').click();
    expect(document.querySelectorAll('ids-tag').length).toEqual(0);
  });

  it('dismisses on backspace/delete', () => {
    tag.dismissible = true;

    const event = new KeyboardEvent('keydown', { key: 'Backspace' });
    tag.dispatchEvent(event);

    expect(document.querySelectorAll('ids-tag').length).toEqual(0);
  });

  it('fires click on enter', () => {
    tag.clickable = true;
    const mockCallback = jest.fn((x) => {
      expect(x).toBeTruthy();
    });
    tag.addEventListener('click', mockCallback);

    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    tag.dispatchEvent(event);

    expect(mockCallback.mock.calls.length).toBe(1);
  });

  it('fires beforetagremoved on dismiss', () => {
    tag.dismissible = true;
    tag.addEventListener('beforetagremoved', (e) => {
      e.detail.response(false);
    });
    tag.dismiss();

    expect(document.body.contains(tag)).toEqual(true);
  });

  it('fires tagremoved on dismiss', () => {
    const mockCallback = jest.fn((x) => {
      expect(x.detail.elem).toBeTruthy();
    });

    tag.dismissible = true;
    tag.addEventListener('tagremoved', mockCallback);
    tag.dismiss();

    expect(mockCallback.mock.calls.length).toBe(1);
    expect(document.body.contains(tag)).toEqual(false);
  });

  it('fires aftertagremoved on dismiss', () => {
    const mockCallback = jest.fn((x) => {
      expect(x.detail.elem).toBeTruthy();
    });

    tag.dismissible = true;
    tag.addEventListener('aftertagremoved', mockCallback);
    tag.dismiss();

    expect(mockCallback.mock.calls.length).toBe(1);
    expect(document.body.contains(tag)).toEqual(false);
  });

  it('should cancel dismiss when not dismissible', () => {
    tag.dismiss();
    expect(document.body.contains(tag)).toEqual(true);
  });

  it('should handle slot change when dismissible', () => {
    const mockCallback = jest.fn((x) => {
      expect(x.detail.elem).toBeTruthy();
    });

    tag.dismissible = true;
    const icon = tag.querySelector('ids-icon[icon="close"]');
    const span = document.createElement('span');
    span.innerHTML = 'test';
    tag.insertBefore(span, icon);
    tag.insertBefore(icon, span);

    tag.addEventListener('slotchange', mockCallback);
  });

  it('can be clickable', () => {
    tag.clickable = true;
    const mockHandler = jest.fn();
    tag.listen('Enter', tag, mockHandler);

    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    tag.dispatchEvent(event);

    expect(tag.container.classList.contains('ids-focusable')).toEqual(true);
    expect(mockHandler.mock.calls.length).toBe(1);
  });

  it('removes the clickable attribute when reset', () => {
    tag.clickable = true;
    expect(tag.getAttribute('clickable')).toEqual('true');
    expect(tag.clickable).toEqual('true');

    tag.clickable = false;
    expect(tag.getAttribute('clickable')).toEqual(null);
    expect(tag.clickable).toEqual(null);
    expect(tag.container.classList.contains('ids-focusable')).toEqual(false);
  });

  it('supports setting mode', () => {
    tag.mode = 'dark';
    expect(tag.container.getAttribute('mode')).toEqual('dark');
  });

  it('supports setting version', () => {
    tag.version = 'classic';
    expect(tag.container.getAttribute('version')).toEqual('classic');
  });
});

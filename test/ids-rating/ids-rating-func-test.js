/**
 * @jest-environment jsdom
 */

 import IdsRating from '../../src/ids-rating/ids-rating';

 describe('IdsRating Component', () => {
    beforeEach(async () => {
        const ratingComponent = new IdsRating();
        window.document.body.appendChild(ratingComponent)
    });

    afterEach(async () => {
        window.document.body.innerHTML = '';
    });

    it('renders with no errors', () => {
        const errors = jest.spyOn(global.console, 'error');
        const elem = new IdsRating()
        window.document.body.appendChild(elem)
        elem.remove();
        expect(document.querySelectorAll('ids-rating').length).toEqual(1);
        expect(errors).not.toHaveBeenCalled();
    });

    it('renders correctly', () => {
        const elem = new IdsRating();
        window.document.body.appendChild(elem);
        elem.template();
        expect(elem.outerHTML).toMatchSnapshot();
    });

    it('renders rating item correctly', () => {
        const elem = new IdsRating();
        window.document.body.appendChild(elem);
        elem.template();
        const ratingItem = window.document.querySelectorAll('.rating-item');
        console.log(elem)
        //expect(ratingItem).toEqual(5)
    });
 })
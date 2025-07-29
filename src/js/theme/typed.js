import { getData } from '../utils';

/* -------------------------------------------------------------------------- */
/*                                 Typed Text                                 */
/* -------------------------------------------------------------------------- */

const typedTextInit = () => {
  const typedTexts = document.querySelectorAll('.typed-text');
  if (typedTexts.length && window.Typed) {
    typedTexts.forEach(typedText => {
      return new window.Typed(typedText, {
        strings: getData(typedText, 'typedText'),
        typeSpeed: 70,
        backSpeed: 70,
        loop: true,
        backDelay: 1000
      });
    });
  }
};

export default typedTextInit;

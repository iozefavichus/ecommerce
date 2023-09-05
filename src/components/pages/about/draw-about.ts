import { createCustomElement } from '../../shared/utilities/helper-functions';

const createAboutPage = (): HTMLElement => {
  const wrapper = createCustomElement('div', ['responsive-container-block', 'outer-container']);
  const inner = createCustomElement('div', ['responsive-container-block', 'inner-container']);
  const heading = createCustomElement('p', ['text', 'heading-text'], 'Our Team');
  const subheading = createCustomElement('p', ['text', 'sub-heading-text'], 'We are going to do our best');
  const cardContainer = createCustomElement('div', ['responsive-container-block', 'cards-container']);
  const cellBlock1 = createCustomElement('div', [
    'responsive-cell-block',
    'desk-4',
    'ipadp-4',
    'mobile-12',
    'tab-12',
    'card-container',
  ]);
  const name1 = createCustomElement('p', ['text', 'name'], 'Dmitry Tkachenko');
  const position1 = createCustomElement('p', ['text', 'position'], 'Developer');
  const img1 = createCustomElement('img', ['team-member-image']) as HTMLImageElement;
  img1.src = './assets/images/about/dima.jpg';
  const a1 = createCustomElement('a', ['']) as HTMLLinkElement;
  a1.href = 'https://github.com/dima92';
  a1.setAttribute('target', '_blank');
  const imgGithub1 = createCustomElement('img', ['social-media-icon']) as HTMLImageElement;
  imgGithub1.src = './assets/images/about/github.png';
  a1.append(imgGithub1);
  cellBlock1.append(name1, position1, img1, a1);
  cardContainer.append(cellBlock1);
  inner.append(heading, subheading, cardContainer);
  wrapper.append(inner);
  return wrapper;
};

export const drawAbout = async () => {
  const mainWrapper = document.querySelector('.main__wrapper') as HTMLElement;
  mainWrapper.innerHTML = '';
  const aboutPage = createAboutPage();
  mainWrapper.append(aboutPage);
};
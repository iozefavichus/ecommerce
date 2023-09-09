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
  const githubLink = createCustomElement('a', ['rss_link']) as HTMLLinkElement;
  githubLink.href = 'https://rs.school/';
  githubLink.setAttribute('target', '_blank');
  const githubLogo = createCustomElement('div', ['rss_logo']);

  const cellBlock2 = createCustomElement('div', [
    'responsive-cell-block',
    'desk-4',
    'ipadp-4',
    'mobile-12',
    'tab-12',
    'card-container',
  ]);
  const name2 = createCustomElement('p', ['text', 'name'], 'Konstantin Matveev');
  const position2 = createCustomElement('p', ['text', 'position'], 'Developer');
  const img2 = createCustomElement('img', ['team-member-image']) as HTMLImageElement;
  img2.src = './assets/images/about/kostya.jpg';
  const a2 = createCustomElement('a', ['']) as HTMLLinkElement;
  a2.href = 'https://github.com/mat-kon';
  a2.setAttribute('target', '_blank');
  const imgGithub2 = createCustomElement('img', ['social-media-icon']) as HTMLImageElement;
  imgGithub2.src = './assets/images/about/github.png';

  const cellBlock3 = createCustomElement('div', [
    'responsive-cell-block',
    'desk-4',
    'ipadp-4',
    'mobile-12',
    'tab-12',
    'card-container',
  ]);
  const name3 = createCustomElement('p', ['text', 'name'], 'Eugenia Iozefavichus');
  const position3 = createCustomElement('p', ['text', 'position'], 'Team-Lead');
  const img3 = createCustomElement('img', ['team-member-image']) as HTMLImageElement;
  img3.src = './assets/images/about/evgeniya.jpg';
  const a3 = createCustomElement('a', ['']) as HTMLLinkElement;
  a3.href = 'https://github.com/iozefavichus';
  a3.setAttribute('target', '_blank');
  const imgGithub3 = createCustomElement('img', ['social-media-icon']) as HTMLImageElement;
  imgGithub3.src = './assets/images/about/github.png';
  githubLink.append(githubLogo);
  a1.append(imgGithub1);
  a2.append(imgGithub2);
  a3.append(imgGithub3);
  cellBlock1.append(name1, position1, img1, a1);
  cellBlock2.append(name2, position2, img2, a2);
  cellBlock3.append(name3, position3, img3, a3);
  cardContainer.append(cellBlock1, cellBlock2, cellBlock3);
  inner.append(githubLink, heading, subheading, cardContainer);
  wrapper.append(inner);
  return wrapper;
};

export const drawAbout = async () => {
  const mainWrapper = document.querySelector('.main__wrapper') as HTMLElement;
  mainWrapper.innerHTML = '';
  const aboutPage = createAboutPage();
  mainWrapper.append(aboutPage);
};

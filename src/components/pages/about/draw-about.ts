import { createCustomElement } from '../../shared/utilities/helper-functions';
import { createPageTitle } from '../../shared/utilities/title';

const createAboutPage = (): HTMLElement => {
  const wrapper = createCustomElement('div', ['responsive-container-block', 'outer-container']);
  const inner = createCustomElement('div', ['responsive-container-block', 'inner-container']);
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
  const text1 = createCustomElement(
    'p',
    ['text', 'text__custom'],
    `I started learning JavaScript in JS / Front-end and ReactJS (with TypeScript) courses
      at The Rolling Scopes School, while at university I studied more .NET and Angular.
       Now I am developing my own projects, and I am ready to further develop my knowledge and
      skills in web development.
      <br/><b>Developed main page, catalog page, about page, not-found page, also sorting, filtering, searching, apiClient.<b>`,
  );

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
  const text2 = createCustomElement(
    'p',
    ['text', 'text__custom'],
    `Hello! I am 30 years old. Graduated from college in 2012, university in 2014.
      My specialty is an engineer electrician. In 2022, I started learn of Software Engineer.
       I chose this profession because I like to see the result of my work. This job gives me a
      chance work from anywhere and always learn something new.
      <br/><b>Developed header, footer, page login, detail page, build client, apiClient, routing.
      Also participated in the development of the catalog page and about page.<b>`,
  );

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
  const text3 = createCustomElement(
    'p',
    ['text', 'text__custom'],
    `I like to study all new and I like to communicate with other people.
      For a long time I work as photographer. So I have a lot of time to know something new.
      <br/><b>Developed page registration, cart page, profile page, work in the data, apiClient.<b>`,
  );

  githubLink.append(githubLogo);
  a1.append(imgGithub1);
  a2.append(imgGithub2);
  a3.append(imgGithub3);
  cellBlock1.append(name1, position1, img1, a1, text1);
  cellBlock2.append(name2, position2, img2, a2, text2);
  cellBlock3.append(name3, position3, img3, a3, text3);
  cardContainer.append(cellBlock3, cellBlock1, cellBlock2);
  inner.append(githubLink, cardContainer);
  wrapper.append(inner);
  return wrapper;
};

export const drawAbout = async () => {
  const mainWrapper = document.querySelector('.main__wrapper') as HTMLElement;
  mainWrapper.innerHTML = '';
  const title = createPageTitle('About us');
  const aboutPage = createAboutPage();
  mainWrapper.append(title, aboutPage);
};

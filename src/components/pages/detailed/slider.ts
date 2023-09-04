export const curIndex = {
  index: 0,
};

export const updateImagePosition = (currentIndex: number): void => {
  const imgWrapper = document.querySelector('.detail__img-wrapper') as HTMLElement;
  const images = document.querySelectorAll('.img');

  const imgWidth = images[0]?.clientWidth;

  const offset = -currentIndex * imgWidth;
  imgWrapper.style.transform = `translateX(${offset}px)`;
};

export const prevImage = (): number => {
  const images = document.querySelectorAll('.img');
  const imagesCount = images.length;
  curIndex.index = (curIndex.index - 1 + imagesCount) % imagesCount;
  return curIndex.index;
};

export const nextImage = (): number => {
  const images = document.querySelectorAll('.img');
  const imagesCount = images.length;
  curIndex.index = (curIndex.index + 1) % imagesCount;
  return curIndex.index;
};

const getClaimElements = () => document.getElementsByClassName('story-body__h1');

const extractTextFromElement = (element) => element.textContent;

setInterval(() => {
  const elements = getClaimElements();
  analyseClaims(elements, extractTextFromElement);
}, 500);

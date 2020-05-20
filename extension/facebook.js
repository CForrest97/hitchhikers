const getClaimElements = () => document.querySelectorAll('[data-testid="post_message"]');

const extractTextFromElement = (element) => element.textContent;

setInterval(() => {
  const elements = getClaimElements();
  analyseClaims(elements, extractTextFromElement);
}, 500);

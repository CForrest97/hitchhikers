const getClaims = () => document.getElementsByClassName('story-body__h1');

setInterval(() => {
  const claims = getClaims();
  analyseClaims(claims);
}, 500);

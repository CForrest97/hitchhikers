const getClaims = () => document.querySelectorAll('[data-testid="post_message"]');

setInterval(() => {
  const claims = getClaims();
  analyseClaims(claims);
}, 1000);

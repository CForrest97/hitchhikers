const analyseText = (claim, callback) => {
  const http = new XMLHttpRequest();
  const url = 'http://localhost:4242/analyse';

  http.open('POST', url, { body: true });
  http.setRequestHeader('Content-Type', 'application/json');
  http.send(JSON.stringify({ claim, origin: document.URL }));
  http.onreadystatechange = () => {
    const { response } = http;
    callback(JSON.parse(response));
  };
};

const hasBeenAnalysed = (element) => element.parentNode.getAttribute('analysed') === 'true';

const setAnalysed = (element) => element.parentNode.setAttribute('analysed', true);

const createModalContentSection = (classification) => {
  const container = document.createElement('DIV');
  container.className = `modal-content-${classification}`;

  const title = document.createElement('H3');
  title.textContent = `Sources that ${classification}`;

  // TODO make this dynamic and use a parameter
  const link = document.createElement('A');
  link.href = '';
  link.target = '_blank';
  link.textContent = 'Critics said the flu kills more than coronavirus. Why that\'s not a fair comparison-- and now, it\'s not even true';

  const author = document.createElement('P');
  author.textContent = 'CNN';

  // TODO make this do something
  const showMore = document.createElement('P');
  showMore.className = 'modal-show-more';
  showMore.textContent = 'Show more';

  container.appendChild(title);
  container.appendChild(link);
  container.appendChild(author);
  container.appendChild(showMore);
  return container;
};

const createModal = (score, classification) => {
  const container = document.createElement('DIV');
  container.className = 'modal-container';

  const modal = document.createElement('DIV');
  modal.className = 'modal';
  container.appendChild(modal);

  const header = document.createElement('DIV');
  header.className = 'modal-header';
  modal.appendChild(header);

  const title = document.createElement('H2');
  const claim = 'Coronavirus is less deadly than the flu'; // TODO remove this and use real claim
  title.textContent = `Claim: ${claim}`;
  header.appendChild(title);

  const subtitle = document.createElement('P');
  subtitle.textContent = `${score}% of sources ${classification}`;
  header.appendChild(subtitle);

  const content = document.createElement('DIV');
  content.className = 'modal-content';
  modal.appendChild(content);

  // TODO improve to pass through real source and show more link
  const disagreeSourcesSection = createModalContentSection('disagree');
  const agreeSourcesSection = createModalContentSection('agree');
  content.appendChild(disagreeSourcesSection);
  content.appendChild(agreeSourcesSection);

  const footer = document.createElement('DIV');
  footer.className = 'modal-footer';
  modal.appendChild(footer);

  // TODO improve by adding a href element and link to Google search
  const searchClaimOnGoogle = document.createElement('BUTTON');
  searchClaimOnGoogle.textContent = 'Search this claim on Google';
  footer.appendChild(searchClaimOnGoogle);

  // Close button
  const closeButton = document.createElement('SPAN');
  closeButton.className = 'modal-close-button';
  closeButton.textContent = 'X';
  closeButton.addEventListener('click', () => {
    container.style.display = 'none';
  }, false);
  modal.appendChild(closeButton);

  return container;
};

const addAnalysisToElement = (element, score) => {
  if ((!hasBeenAnalysed(element))) {
    const classification = score > 80 ? 'agree' : 'disagree';

    const modal = createModal(score, classification);

    // Only add the text if the element that should have text has a height (is not just a video)
    if (element.offsetHeight > 0) {
      const clickHere = document.createElement('SPAN');
      clickHere.className = 'click-here';
      clickHere.textContent = 'Here';
      clickHere.addEventListener('click', (e) => {
        e.stopPropagation();
        modal.style.display = 'block';
      }, false);

      const text = document.createElement('P');
      text.className = `${classification}-text`;
      text.appendChild(document.createTextNode(`Most sources ${classification}, Click `));
      text.appendChild(clickHere);
      text.appendChild(document.createTextNode(' to find out more'));

      element.insertAdjacentElement('afterend', text);
      element.classList.add(`${classification}-block`);

      const [body] = document.getElementsByTagName('BODY');
      body.appendChild(modal);
    }

    // Finally, show that the element has been analysed
    setAnalysed(element);
  }
};

const analyseClaims = (claims) => {
  for (let index = 0; index < claims.length; index += 1) {
    const claim = claims[index];
    if (!hasBeenAnalysed(claim)) {
      const { textContent } = claim;
      analyseText(textContent, ({ score }) => {
        addAnalysisToElement(claim, score);
      });
    }
  }
};

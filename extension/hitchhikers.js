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

  const link = document.createElement('A');
  link.className = 'modal-content-title';
  link.target = '_blank';

  const author = document.createElement('P');
  author.className = 'modal-content-author';

  // TODO make a link or button and do something to show more
  const showMore = document.createElement('P');
  showMore.className = 'modal-show-more';
  showMore.textContent = 'Show more';

  container.appendChild(title);
  container.appendChild(link);
  container.appendChild(author);
  container.appendChild(showMore);
  return container;
};

const createModal = () => {
  const container = document.createElement('DIV');
  container.className = 'modal-container';

  const modal = document.createElement('DIV');
  modal.id = 'hitchhiker-modal';
  modal.className = 'modal';
  container.appendChild(modal);

  const header = document.createElement('DIV');
  header.className = 'modal-header';
  modal.appendChild(header);

  const title = document.createElement('H2');
  header.appendChild(title);

  const subtitle = document.createElement('P');
  header.appendChild(subtitle);

  const content = document.createElement('DIV');
  content.className = 'modal-content';
  modal.appendChild(content);

  const disagreeSourcesSection = createModalContentSection('disagree');
  const agreeSourcesSection = createModalContentSection('agree');
  content.appendChild(disagreeSourcesSection);
  content.appendChild(agreeSourcesSection);

  const footer = document.createElement('DIV');
  footer.className = 'modal-footer';
  modal.appendChild(footer);

  // view info button
  const hitchhikerInfo = document.createElement('A');
  hitchhikerInfo.href = '';
  hitchhikerInfo.target = '_blank';
  hitchhikerInfo.textContent = 'insert info text here';
  const hitchhikerInfoContainer = document.createElement('DIV');
  hitchhikerInfoContainer.appendChild(hitchhikerInfo);
  footer.appendChild(hitchhikerInfoContainer);

  // TODO improve by adding a href element and link to Google search
  const searchClaimOnGoogle = document.createElement('BUTTON');
  searchClaimOnGoogle.textContent = 'Search this claim on Google';
  const searchClaimOnGoogleContainer = document.createElement('DIV');
  searchClaimOnGoogleContainer.appendChild(searchClaimOnGoogle);
  footer.appendChild(searchClaimOnGoogleContainer);

  // Close button
  const closeButton = document.createElement('SPAN');
  closeButton.className = 'modal-close-button';
  closeButton.textContent = 'X';
  closeButton.addEventListener('click', () => {
    container.style.display = 'none';
  }, false);
  modal.appendChild(closeButton);

  // Add to body
  const [body] = document.getElementsByTagName('BODY');
  body.appendChild(container);

  return container;
};

const updateModalAndShow = (score, classification, claim) => {
  const modal = document.getElementById('hitchhiker-modal');

  // Update header
  const [header] = modal.getElementsByClassName('modal-header');
  const [headerTitle] = header.getElementsByTagName('H2');
  headerTitle.textContent = `Claim: ${claim}`;
  const [headerSubTitle] = header.getElementsByTagName('P');
  headerSubTitle.textContent = `${score}% of sources ${classification}`;

  // Update sources that disagree
  const [disagreeContent] = modal.getElementsByClassName('modal-content-disagree');
  const [disagreeTitle] = disagreeContent.getElementsByClassName('modal-content-title');
  disagreeTitle.textContent = 'Critics said the flu kills more than coronavirus. Why that\'s not a fair comparison-- and now, it\'s not even true';
  disagreeTitle.href = '';
  const [disagreeAuthor] = disagreeContent.getElementsByClassName('modal-content-author');
  disagreeAuthor.textContent = 'CNN';

  // Update sources that agree
  const [agreeContent] = modal.getElementsByClassName('modal-content-agree');
  const [agreeTitle] = agreeContent.getElementsByClassName('modal-content-title');
  agreeTitle.textContent = 'Get a grippe, America. The flu is a much bigger threat than coronavirus, for now.';
  agreeTitle.href = '';
  const [agreeAuthor] = agreeContent.getElementsByClassName('modal-content-author');
  agreeAuthor.textContent = 'Washington Post';

  // TODO update footer button with google link

  const container = modal.parentNode;
  container.style.display = 'block';
};

const addAnalysisToElement = (element, score) => {
  if ((!hasBeenAnalysed(element))) {
    const classification = score > 80 ? 'agree' : 'disagree';

    // Only add the text if the element that should have text has a height (is not just a video)
    if (element.offsetHeight > 0) {
      const clickHere = document.createElement('SPAN');
      clickHere.className = 'click-here';
      clickHere.textContent = 'Here';
      clickHere.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevents sites like Twitter from opening the tweet
        updateModalAndShow(score, classification, 'Coronavirus is less deadly than the flu');
      }, false);

      const text = document.createElement('P');
      text.className = `${classification}-text`;
      text.appendChild(document.createTextNode(`Most sources ${classification}, Click `));
      text.appendChild(clickHere);
      text.appendChild(document.createTextNode(' to find out more'));

      element.insertAdjacentElement('afterend', text);
      element.classList.add(`${classification}-block`);

      const modalExists = document.getElementById('hitchhiker-modal');
      if (!modalExists) {
        createModal();
      }
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

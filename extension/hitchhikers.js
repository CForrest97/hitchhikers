const serverURL = 'http://localhost:4242';
const analyseURL = `${serverURL}/analyse`;
const moreInfoBaseURL = `${serverURL}/find-out-more`;
const hitchhikerInfoURL = `${serverURL}/`; // host using built files 'http://localhost:4288/';
const bingSearchBaseURL = 'https://www.bing.com/search?q=';

const analyseText = (claim, callback) => {
  const xhr = new XMLHttpRequest();

  xhr.open('POST', analyseURL, { body: true });
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({ claim, origin: document.URL }));
  xhr.onreadystatechange = () => {
    // console.log('xhr.readyState', xhr.readyState);
    if (xhr.readyState !== XMLHttpRequest.DONE) {
      return;
    }
    const { status, response } = xhr;
    // console.log('response');
    // console.log(response);
    if (!(status === 0 || (status >= 200 && status < 400))) {
      console.log('Error: bad status:', status, response);
      return;
    }
    callback(JSON.parse(response));
  };
};

const hasBeenAnalysed = (element) => element.parentNode.getAttribute('analysed') === 'true';

const setAnalysed = (element) => element.parentNode.setAttribute('analysed', true);

const hasAnalysisStarted = (element) => element.parentNode.getAttribute('analysisStarted') === 'true';

const setAnalysisStarted = (element) => element.parentNode.setAttribute('analysisStarted', true);

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
  const showMore = document.createElement('A');
  showMore.className = 'modal-show-more';
  showMore.textContent = 'Show more';
  showMore.target = '_blank';

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
  hitchhikerInfo.href = hitchhikerInfoURL;
  hitchhikerInfo.target = '_blank';
  hitchhikerInfo.textContent = 'How does this work?';
  const hitchhikerInfoContainer = document.createElement('DIV');
  hitchhikerInfoContainer.appendChild(hitchhikerInfo);
  footer.appendChild(hitchhikerInfoContainer);

  // TODO improve by adding a href element and link to Bing search
  const searchClaimOnGoogle = document.createElement('BUTTON');
  searchClaimOnGoogle.textContent = 'Search this claim on Bing';
  const searchClaimOnGoogleContainer = document.createElement('A');
  searchClaimOnGoogleContainer.className = 'search-button';
  searchClaimOnGoogleContainer.target = '_blank';
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

const updateModalAndShow = (
  pctAgree, classification, claim,
  searchResults, searchQuery, claimID,
) => {
  const modal = document.getElementById('hitchhiker-modal');

  // Update header
  const [header] = modal.getElementsByClassName('modal-header');
  const [headerTitle] = header.getElementsByTagName('H2');
  headerTitle.textContent = `Claim: ${claim}`;
  const [headerSubTitle] = header.getElementsByTagName('P');
  const score = pctAgree > 50 ? pctAgree : 100 - pctAgree;
  headerSubTitle.textContent = `${score}% of sources ${classification}`;

  // update search button
  const [searchButton] = modal.getElementsByClassName('search-button');
  searchButton.href = `${bingSearchBaseURL}${searchQuery}`;

  // Update sources that disagree
  const [disagreeContent] = modal.getElementsByClassName('modal-content-disagree');
  const [moreInfoDisagreeLink] = disagreeContent.getElementsByClassName('modal-show-more');
  const [disagreeTitle] = disagreeContent.getElementsByClassName('modal-content-title');
  console.log('searchResults', searchResults);
  const {
    for: [firstSourceFor],
    against: [firstSourceAgainst],
  } = searchResults;

  if (firstSourceAgainst) {
    const {
      url,
      name,
      provider,
    } = firstSourceAgainst;
    disagreeTitle.textContent = name;
    disagreeTitle.href = url;
    const [disagreeAuthor] = disagreeContent.getElementsByClassName('modal-content-author');
    disagreeAuthor.textContent = provider;
    moreInfoDisagreeLink.href = `${moreInfoBaseURL}/${claimID}`;
  } else {
    disagreeTitle.textContent = 'No sources disagree';
    disagreeTitle.href = '';
    const [disagreeAuthor] = disagreeContent.getElementsByClassName('modal-content-author');
    disagreeAuthor.textContent = '';
    moreInfoDisagreeLink.href = '';
  }

  // Update sources that agree
  if (firstSourceFor) {
    const {
      url,
      name,
      provider,
    } = firstSourceFor;
    const [agreeContent] = modal.getElementsByClassName('modal-content-agree');
    const [agreeTitle] = agreeContent.getElementsByClassName('modal-content-title');
    agreeTitle.textContent = name;
    agreeTitle.href = url;
    const [agreeAuthor] = agreeContent.getElementsByClassName('modal-content-author');
    agreeAuthor.textContent = provider;
    const [moreInfoAgreeLink] = agreeContent.getElementsByClassName('modal-show-more');
    moreInfoAgreeLink.href = `${moreInfoBaseURL}/${claimID}`;
  } else {
    const [agreeContent] = modal.getElementsByClassName('modal-content-agree');
    const [agreeTitle] = agreeContent.getElementsByClassName('modal-content-title');
    agreeTitle.textContent = 'No sources agree';
    agreeTitle.href = '';
    const [agreeAuthor] = agreeContent.getElementsByClassName('modal-content-author');
    agreeAuthor.textContent = '';
    const [moreInfoAgreeLink] = agreeContent.getElementsByClassName('modal-show-more');
    moreInfoAgreeLink.href = '';
  }

  const container = modal.parentNode;
  container.style.display = 'block';
};

const addAnalysisToElement = (element, analysis) => {
  console.log("analysis", analysis);
  if (hasBeenAnalysed(element)) {
    return;
  }
  setAnalysed(element);
  const {
    pctAgree,
    searchResults,
    searchQuery,
    claim,
    claimID,
  } = analysis;
  const classification = pctAgree > 50 ? 'agree' : 'disagree';
  // console.log('analysis');
  // console.log(analysis);
  const claimPreview = `${claim.split(' ').slice(0, 3).join(' ')}...`;
  if (!searchResults || !(searchResults.for.length || searchResults.against.length)) {
    console.log('[1] claim', claimPreview, 'no sources for or against');
    return;
  }
  console.log('[1] claim', claimPreview);

  if (!element.offsetHeight) {
    // element has no text (e.g. is a video)
    return;
  }
  const clickHere = document.createElement('SPAN');
  clickHere.className = 'click-here';
  clickHere.textContent = 'Learn more';
  clickHere.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevents sites like Twitter from opening the tweet
    updateModalAndShow(pctAgree, classification, claimPreview, searchResults, searchQuery, claimID);
  }, false);

  const text = document.createElement('P');
  text.className = `${classification}-text`;
  text.appendChild(document.createTextNode(`Most sources ${classification}. `));
  text.appendChild(clickHere);
  // text.appendChild(document.createTextNode(' to find out more'));

  element.insertAdjacentElement('afterend', text);
  element.classList.add(`${classification}-block`);

  console.log('[2] claim', claimPreview);

  const modalExists = document.getElementById('hitchhiker-modal');
  if (!modalExists) {
    createModal();
  }
};

const analyseClaims = (claimElements, extractTextFromElement) => {
  for (let index = 0; index < claimElements.length; index += 1) {
    const element = claimElements[index];
    if (!hasAnalysisStarted(element)) {
      setAnalysisStarted(element);
      const text = extractTextFromElement(element);
      analyseText(text, (analysis) => {
        addAnalysisToElement(element, analysis);
      });
    }
  }
};

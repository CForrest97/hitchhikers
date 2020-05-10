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

const addAnalysisToElement = (element, score) => {
  if ((!hasBeenAnalysed(element))) {
    const classification = score > 80 ? 'agree' : 'disagree';

    // Only add the text if the element that should have text has a height (is not just a video)
    if (element.offsetHeight > 0) {
      const text = document.createElement('P');
      text.className = `${classification}-text`;
      text.innerHTML = `Most sources ${classification}, Click <span class="click-here">Here</span> to find out more`;
      element.insertAdjacentElement('afterend', text);
      element.classList += ` ${classification}-block`;
    }

    // Finally, show that the element has been analysed
    setAnalysed(element);
  }
};

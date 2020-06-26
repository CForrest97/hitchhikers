
const { v1: uuid } = require('uuid');

class AnalysedClaims {
  constructor() {
    this.analysedClaims = {};
  }

  get(id) {
    return this.analysedClaims[id];
  }

  findIDFromTitle(title) {
    const claimID = Object.keys(this.analysedClaims).find((key) => {
      const { claim } = this.analysedClaims[key];
      return claim === title;
    });
    return claimID;
  }

  add(result) {
    const id = uuid();
    this.analysedClaims[id] = result;
    return id;
  }
}

module.exports = AnalysedClaims;

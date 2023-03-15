class countries {
  constructor(countr) {
    this.countryList = countr;
  }

  //Function return index of array if exists, if not exists then -1 and false if function parameter doesn't meet with the given conditions./
  //-1, false (string)/
  checkCountry(country) {
    if (typeof country === "string" && country.length !== 0) {
      return this.countryList.indexOf(country);
    } else {
      return false;
    }
  }

  //The function return index value if the contry was added, true if the country already present and false when country doesn't meet the string criteria.
  //true, false, index (string)
  addCountry(country) {
    let returnVal = this.checkCountry(country);
    if (returnVal === -1) {
      return this.countryList.push(country);
    } else if (returnVal >= 0) {
      return true;
    } else {
      return returnVal;
    }
  }
    
    //The function return the index of the country if exists and deleted, -1 if not exists and false if the parameter is wrong.
    // >=0, -1, false
    removeCountry(country) {
      let returnVal = this.checkCountry(country);
      if (returnVal >= 0) {
        this.countryList.splice(returnVal, 1);
      }
      return returnVal;      
    }

  getNumCountries() {
    return this.countryList.length;
  }

  writeToLog() {
    console.log(this.countryList.length);
    this.countryList.forEach((item) => console.log(item));
  }
}
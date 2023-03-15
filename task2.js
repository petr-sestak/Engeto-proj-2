class Population{
  constructor(countries, worldPop) {
    this.countries = countries;
    this.worldPop = worldPop;
  }

  //Function return false if inccorect input or true if it is string type and non zero lenght.
  //true, false (input)
  checkInput(country) {
    return (typeof country === 'string' && country.length !== 0);
  }

  //Controling duplicit datasets.
  // array ()
  checkDuplicity() {
    let duplicityArray = [];
    for (let index = 0; index < this.countries.length; index++){
      let toCompare = this.countries[index].country;
      for (let index2 = 0; index2 < this.countries.length; index2++){
        if (index !== index2 && toCompare === this.countries[index2].country) {
          duplicityArray.push(this.countries[index2]);
        }
      }
    }
    return duplicityArray;
  }

  //Function return index if country exists, false if wrong input or duplicit variable, -1 if doesn't present in the array.
  //index, -1, false (input)
  checkExistence(country) {
    if (this.checkDuplicity().length > 0 || !this.checkInput(country)) return false;
    
    for (let index = 0; index < this.countries.length; index++) {
      if (this.countries[index].country === country) return index;
    }
    return -1;
  }
    
  //Takes two arguments and determine percentage.
  //Tato funkce je to trochu zbytecna.
  getPercentage(country, worldPop) {
    let index = this.checkExistence(country);
    if (index >= 0 && typeof worldPop === 'number' && worldPop > 0) {
      return this.countries[index].population / (worldPop / 100);
    } else {
      return false;
    }
  }

  //Sort all data according to population size.
  //Udelal jsem to rucne at si to jednou zkusim napsat sam.
  sort() {
    if (this.checkDuplicity().length >= 1) return false;
    let sortArray = [];
    let length = this.countries.length;
    let toSort;

    startLoop: for (let i = 0; i < length; i++) {
      toSort = this.countries.shift();
      if (sortArray.length === 0) {
        sortArray.push(toSort);
        continue;
      }
      let sortLength = sortArray.length;
      for (let j = 0; j < sortLength; j++) {
        let sortArrayLength = sortArray.length;
        if (toSort.population < sortArray[j].population) {
          for (let k = sortArrayLength; k > j; k--) {
            sortArray[k] = sortArray[k - 1];
          }
          sortArray[j] = toSort;
          continue startLoop;
        }
      }
    }
    this.countries = sortArray;
    sortArray = [];
  }

  //Id create.
  createId() {
    for (let index = 0; index < this.countries.length; index++) {
      let arr = this.countries[index];
      arr["id"] = arr.country.substring(0, 3) + index;
    }
  }

  //Adding percentage to all countries dataset.
  determinePercent() {
    for (let index = 0; index < this.countries.length; index++){
      let arr = this.countries[index];
      //Muzu napsat proceduru ktera zachova dve desetinne mista i pro procenta < 10. Nicmene se mi zda zaokrouhleni na 4 platne cislice lepsi.
      //Nevim proc ale nemuzu najit jak udelat printf.
      arr["percentage"] = (arr.population / (this.worldPop / 100)).toPrecision(4);
    }
  }

  //Filter function.
  // args (Array)
  filter(minName, maxName, minPop, maxPop) {
    let filterArr = [];
    for (let index = 0; index < this.countries.length; index++){
      let arr = this.countries[index];
      if (arr.country.length > minName && arr.country.length < maxName + 1 && arr.percentage > minPop && arr.percentage < maxPop) filterArr.push(arr);
    }
    return filterArr;
  }
    
  //Function for printing output to console.log.
  // void (arr)
  writeToLog(arr = this.countries) {
    for (let index = 0; index < arr.length; index++) {
      console.log("Country: " + arr[index].country + " Population: " + arr[index].population);
    }
  }
}
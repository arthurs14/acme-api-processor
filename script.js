const loadData = async () => {
  const urls = [
    'https://acme-users-api-rev.herokuapp.com/api/companies',
    'https://acme-users-api-rev.herokuapp.com/api/products',
    'https://acme-users-api-rev.herokuapp.com/api/offerings'
  ];

  const responses = await Promise.all(urls.map(url => axios.get(url)));
  const [ companies, products, offerings ] = responses.map(response => response.data);

  // return products within a price range
  const productsInPriceRange = findProductsInPriceRange(products, { min: 1, max: 15 });
  //console.log(productsInPriceRange);

  // returns object where key is first letter of company name
  // value for each key is the array of those companies
  const groupedCompaniesByLetter = groupCompaniesByLetter(companies);
  //console.log(groupedCompaniesByLetter);

  // Returns object where key is a state
  // value for each key is the array of those companies in that state
  const groupedCompaniesByState = groupCompaniesByState(companies);
  // console.log(groupedCompaniesByState);

  // Return an array of the offerings with each offering having a
  // company and a product
  const processedOfferings = processOfferings({companies, products, offerings});
  //console.log(processedOfferings);

  // Returns the companies that have n or more offerings
  const threeOrMoreOfferings = companiesByNumberOfOfferings(companies, offerings, 3);
  console.log(threeOrMoreOfferings);

};

const findProductsInPriceRange = (products, range) => {
  return productsInPriceRange = products.filter(product => {
    if(product.suggestedPrice > range.min && product.suggestedPrice < range.max) {
      return product;
    }
  });
};

const groupCompaniesByLetter = (companies) => {
  return groupedCompaniesByLetter = companies.reduce((obj, current) => {
    const key = current.name.charAt(0);
    const companies = [];
    if(key in obj) {
      const temp = obj[key];
      temp.push(current.name);
    } else {
      companies.push(current.name);
      obj[key] = companies;
    }
    return obj;
  }, {})
};

const groupCompaniesByState = (companies) => {
  return groupedCompaniesByState = companies.reduce((obj, current) => {
    const key = current.state;
    const states = [];
    if(key in obj) {
      const temp = obj[key];
      temp.push(current.name);
    } else {
      states.push(current.name);
      obj[key] = states;
    }
    return obj;
  }, {});
};

const processOfferings = (obj) => {
  return processedOfferings = obj.offerings.map(offering => {
    const companies = obj.companies.find(company => {
      return company.id === offering.companyId;
    })
    const products = obj.products.find(product => {
      return product.id === offering.productId;
    })
    return {...offering, company: companies, product: products};
  });
};

const companiesByNumberOfOfferings = (companies, offerings, number) => {
  const company = companies.map(_company => {
    const offers = offerings.filter(offer => {
      return offer.companyId === _company.id;
    })
    return {..._company, offers: offers};
  })
  const threeOrMoreOfferings = company.filter(_company => {
    return _company.offers.length >= 3;
  })
  return threeOrMoreOfferings;
}

loadData();

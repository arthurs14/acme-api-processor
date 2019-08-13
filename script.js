const loadData = async () => {
  const urls = [
    'https://acme-users-api-rev.herokuapp.com/api/companies',
    'https://acme-users-api-rev.herokuapp.com/api/products',
    'https://acme-users-api-rev.herokuapp.com/api/offerings'
  ];

  const responses = await Promise.all(urls.map(url => axios.get(url)));
  const [ companies, products, offerings ] = responses.map(response => response.data);

  // return products within a price range
  // const productsInPriceRange = findProductsInPriceRange(products, { min: 1, max: 15 });
  // console.log(productsInPriceRange);

  // returns object where key is first letter of company name
  // value for each key is the array of those companies
  const groupedCompaniesByState = groupCompaniesByState(companies);
  console.log(groupedCompaniesByState);
};

const findProductsInPriceRange = (products, range) => {
  return productsInPriceRange = products.filter(product => {
    if(product.suggestedPrice > range.min && product.suggestedPrice < range.max) {
      return product;
    }
  });
};

const groupCompaniesByState = (companies) => {
  return test = companies.reduce((obj, current) => {
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


loadData();

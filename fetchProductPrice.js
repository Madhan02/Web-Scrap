const axios = require('axios');
const cheerio = require('cheerio');

async function fetchFlipkartPrice(keyword) {
  const url = `https://www.flipkart.com/search?q=${encodeURIComponent(keyword)}`;

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const product = $('._1AtVbE');

    const title = product.find('a ._4rR01T').first().text().trim();
    const price = product.find('a ._30jeq3._1_WHN1').first().text().trim();
    const rating = product.find('._3LWZlK').first().text().trim();
    const details = product.find('.fMghEO').first().text().trim();

    return { title, price, rating, details };
  } catch (error) {
    console.error('Error fetching Flipkart price:', error);
    return null;
  }
}

async function fetchAmazonPrice(keyword) {
  const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const product = $('div[data-component-type="s-search-result"]').first();

    const title = product.find('h2 a span').first().text().trim();
    const price = product.find('.a-price span:not(.a-price-symbol)').first().text().trim();
    const rating = product.find('.a-icon-star-small span').first().text().trim();
    const details = product.find('.a-size-base').first().text().trim();

    return { title, price, rating, details };
  } catch (error) {
    console.error('Error fetching Amazon price:', error.status);
    return null;
  }
}

async function fetchProductDetails(keyword) {
  const flipkartPrice = await fetchFlipkartPrice(keyword);
  const amazonPrice = await fetchAmazonPrice(keyword);

  console.log('Product Details:');

  if (flipkartPrice) {
    console.log('Flipkart:');
    console.log('- Title:', flipkartPrice.title);
    console.log('- Price:', flipkartPrice.price);
    console.log('- Rating:', flipkartPrice.rating);
    console.log('- Details:', flipkartPrice.details);
  } else {
    console.log('Flipkart details not available.');
  }

  if (amazonPrice) {
    console.log('Amazon:');
    console.log('- Title:', amazonPrice.title);
    console.log('- Price:', amazonPrice.price);
    console.log('- Rating:', amazonPrice.rating);
    console.log('- Details:', amazonPrice.details);
  } else {
    console.log('Amazon details not available.');
  }
}

const productKeyword = 'Iphone 11 pro';
fetchProductDetails(productKeyword);

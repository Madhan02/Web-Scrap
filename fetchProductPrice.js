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
  
  async function fetchProductDetails(keyword) {
    const flipkartPrice = await fetchFlipkartPrice(keyword);
    
    if (flipkartPrice) {
      console.log('Product Details:');
      console.log('- Title:', flipkartPrice.title);
      console.log('- Price:', flipkartPrice.price);
      console.log('- Rating:', flipkartPrice.rating);
      console.log('- Details:', flipkartPrice.details);
    } else {
      console.log('Product details not available.');
    }
  }
  
  const productKeyword = 'Iphone 11 pro';
  fetchProductDetails(productKeyword);
  
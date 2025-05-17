const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}

if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}

// Cart functionality
document.addEventListener('DOMContentLoaded', function() {
  // Handle cart icon clicks
  const cartIcons = document.querySelectorAll('.cart');
  cartIcons.forEach(icon => {
    icon.addEventListener('click', function(e) {
      e.preventDefault();
      const product = this.closest('.pro');
      const productData = {
        name: product.querySelector('h5').textContent,
        price: product.querySelector('h4').textContent,
        image: product.querySelector('img').src,
        rating: product.querySelector('.star').innerHTML
      };
      localStorage.setItem('selectedProduct', JSON.stringify(productData));
      window.location.href = 'cart.html';
    });
  });

  // Handle product page "Add to Cart" button
  const addToCartBtn = document.querySelector('.single-pro-details .normal');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function() {
      const productData = {
        name: document.getElementById('product-name').textContent,
        price: document.getElementById('product-price').textContent,
        image: document.getElementById('MainImg').src,
        rating: '<i class="fas fa-star"></i>'.repeat(5) // Default 5-star rating
      };
      localStorage.setItem('selectedProduct', JSON.stringify(productData));
      window.location.href = 'cart.html';
    });
  }

  // Handle product image clicks
  const productImages = document.querySelectorAll('.pro img');
  productImages.forEach(img => {
    img.addEventListener('click', function() {
      const productData = {
        name: this.closest('.pro').querySelector('h5').textContent,
        price: this.closest('.pro').querySelector('h4').textContent,
        image: this.src,
        rating: this.closest('.pro').querySelector('.star').innerHTML
      };
      localStorage.setItem('selectedProduct', JSON.stringify(productData));
      window.location.href = 'product.html';
    });
  });

  // Contact form handling
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(this);
      const formInfo = document.createElement('div');
      formInfo.className = 'form-submission';
      formInfo.innerHTML = `
        <h3>Thank you for your message!</h3>
        <p>Name: ${formData.get('name')}</p>
        <p>Email: ${formData.get('email')}</p>
        <p>Message: ${formData.get('message')}</p>
      `;
      this.parentNode.insertBefore(formInfo, this.nextSibling);
      this.reset();
    });
  }

  // Newsletter subscription
  const newsletterForm = document.querySelector('#newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      const message = document.createElement('p');
      message.textContent = `Thank you for subscribing with ${email}!`;
      message.style.color = 'green';
      this.parentNode.insertBefore(message, this.nextSibling);
      this.reset();
    });
  }
});

// Product page image gallery
if (document.querySelector('.pro-details')) {
  const mainImg = document.querySelector('#MainImg');
  const smallImgs = document.querySelectorAll('.small-img');
  
  smallImgs.forEach(img => {
    img.addEventListener('click', function() {
      mainImg.src = this.src;
    });
  });
}

// Cart page functionality
if (document.querySelector('#cart-form')) {
  const cartForm = document.querySelector('#cart-form');
  const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
  const urlParams = new URLSearchParams(window.location.search);
  
  // Get product info from URL parameters if available
  const productFromUrl = {
    image: urlParams.get('product') ? `Image/product/${urlParams.get('product')}` : null,
    name: urlParams.get('name') || null
  };
  
  // Use URL parameters if available, otherwise use localStorage data
  const productInfo = productFromUrl.image ? productFromUrl : selectedProduct;
  
  if (productInfo) {
    const productInfoDiv = document.createElement('div');
    productInfoDiv.className = 'selected-product';
    productInfoDiv.innerHTML = `
      <h3>Selected Product</h3>
      <div class="product-image">
        <img src="${productInfo.image}" alt="${productInfo.name}" style="max-width: 100%; height: auto;">
      </div>
      <p>Name: ${productInfo.name}</p>
      <p>Price: ${productInfo.price || '$78'}</p>
      <div class="rating">${productInfo.rating || '<i class="fas fa-star"></i>'.repeat(5)}</div>
    `;
    cartForm.parentNode.insertBefore(productInfoDiv, cartForm);
    
    // Set the product name in the form
    const productInput = document.getElementById('product');
    if (productInput) {
      productInput.value = productInfo.name;
    }
  }

  cartForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const orderInfo = document.createElement('div');
    orderInfo.className = 'order-info';
    orderInfo.innerHTML = `
      <h3>Order Information</h3>
      <p>Name: ${formData.get('name')}</p>
      <p>Phone: ${formData.get('phone')}</p>
      <p>Address: ${formData.get('address')}</p>
      <p>Product: ${formData.get('product')}</p>
      <p>Size: ${formData.get('size')}</p>
    `;
    this.parentNode.insertBefore(orderInfo, this.nextSibling);
    this.reset();
  });
}

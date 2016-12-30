// Get the shopping cart, product listings and toggle button elements and
// save to variables
var shoppingCartDiv = document.querySelector(".shopping_cart");
var productListingDiv = document.querySelector(".product_listings");
var toggleCartButton = document.getElementById("toggle_cart");
// Initialize discountAmount and discountMessage to zero and a string value
// respectively
var discountAmount = 0;
var discountMessage = " No discount applied.";
// Hide the shopping cart div on load
shoppingCartDiv.style.display = "none";
// Add a a click event listener to the toggle button element
toggleCartButton.addEventListener("click", function(event) {
  // If the shopping cart dive is display 'none'...
  if (shoppingCartDiv.style.display === "none") {
    // ...reset its display property to 'initial' to show the shopping cart
    shoppingCartDiv.style.display = "initial";
    // ...else if the display property is 'initial'...
  } else if (shoppingCartDiv.style.display === "initial") {
    // ... reset the display property back to 'none'
    shoppingCartDiv.style.display = "none";
  }
});
// Add a click event listener to the product listing div element
productListingDiv.addEventListener("click", function(event) {
  // If the element was clicked was a button element...
  if (event.target.tagName === "BUTTON") {
    // Obtain the event.target's parent node element
    var parentNode = event.target.parentNode;
    // Save the product title text to the productTitle variable
    var productTitle = parentNode.childNodes[1].innerHTML;
    // Save the product price text minus the leading '$' character
    // to the productPrice variable
    var productPrice = parentNode.childNodes[2].innerHTML.substr(1,
      (parentNode.childNodes[2].innerHTML.length));
    // Save the product image URL to the productImageURL variable
    var productImageURL = parentNode.childNodes[0].src;
    // Initialize the productFound flag to false and the productAlreadyInCart
    var productFound = false;
    var productAlreadyInCart;
    // For each DOM node in the cart minus the last cart total area
    for (var i = 0; i < shoppingCartDiv.childNodes.length - 2; i++) {
      // If the current node has a class of cart_item...
      if (shoppingCartDiv.childNodes[i].className === "cart_item") {
        // Loop through each of its child nodes
        for (var j = 0; j < shoppingCartDiv.childNodes[i].childNodes.length;
          j++) {
          // If the child node of cart_item has a class of item_title...
          if (shoppingCartDiv.childNodes[i].childNodes[j].className ===
            "item_title"){
            // and if the productTitle of the product that was clicked on
            // is found to be the same as one of these child nodes...
            if (shoppingCartDiv.childNodes[i].childNodes[j].innerHTML === productTitle) {
              // ...then the clicked on product is already found in the cart
              // so set the productFound flag to true
              productFound = true;
              // And set the found product div element to productAlreadyInCart
              productAlreadyInCart = shoppingCartDiv.childNodes[i];
              // Update the quantity of this div element product by one after
              // obtaining the quantity string value and converting it to
              // an integer
              productAlreadyInCart.childNodes[3].childNodes[0].value =
                parseInt(productAlreadyInCart.childNodes[3].childNodes[0].value) + 1;
            }
          }
        }
      }
    }
      // If the product was already found in cart...
      if (productFound) {
        // ...pass in the product div in cart that was found to update its
        // subtotal
        updateQuantity(productAlreadyInCart);
        // ...else if it was not found...
      } else if (!productFound) {
      // Create the various DOM elements and their respective child elements
      // their respective classes and attributes...
      var newProductToAddDiv = document.createElement("DIV");
      newProductToAddDiv.className = "cart_item";
      var newProductImgDiv = document.createElement("DIV");
      newProductImgDiv.className = "item_image";
      var newProductImg = document.createElement("IMG");
      newProductImg.src = productImageURL.replace(/\d\d\dx\d\d\d/, "100x60");
      newProductImgDiv.appendChild(newProductImg);
      var newBreak = document.createElement("BR");
      newProductImgDiv.appendChild(newBreak);
      var newRemoveButton = document.createElement("BUTTON");
      newRemoveButton.className = "remove_button";
      newRemoveButton.innerHTML = "Remove";
      newProductImgDiv.appendChild(newRemoveButton);
      newProductToAddDiv.appendChild(newProductImgDiv);
      var newProductTitleDiv = document.createElement("DIV");
      newProductTitleDiv.className = "item_title";
      newProductTitleDiv.innerHTML = productTitle;
      newProductToAddDiv.appendChild(newProductTitleDiv);
      var newProductPriceDiv = document.createElement("DIV");
      newProductPriceDiv.className = "item_price";
      newProductPriceDiv.innerHTML = "$" + productPrice;
      newProductToAddDiv.appendChild(newProductPriceDiv);
      var newProductQuantityDiv = document.createElement("DIV");
      newProductQuantityDiv.className = "item_quantity";
      var newProductInput = document.createElement("INPUT");
      var type = document.createAttribute("type");
      type.value = "text";
      var maxLength = document.createAttribute("maxlength");
      maxLength.value = "3";
      var value = document.createAttribute("value");
      value.value = "1";
      newProductInput.setAttributeNode(type);
      newProductInput.setAttributeNode(maxLength);
      newProductInput.setAttributeNode(value);
      newProductQuantityDiv.appendChild(newProductInput);
      var newProductQuantBreak = document.createElement("BR");
      newProductQuantityDiv.appendChild(newProductQuantBreak);
      var newProductQuantSpan = document.createElement("SPAN");
      var newProductQuantUpdateLink = document.createElement("A");
      var href = document.createAttribute("href");
      href.value = "#";
      newProductQuantUpdateLink.setAttributeNode(href);
      newProductQuantUpdateLink.id = "#";
      newProductQuantUpdateLink.innerHTML = "Update";
      newProductQuantSpan.appendChild(newProductQuantUpdateLink);
      newProductQuantityDiv.appendChild(newProductQuantSpan);
      newProductToAddDiv.appendChild(newProductQuantityDiv);
      var newProductSubTotDiv = document.createElement("DIV");
      newProductSubTotDiv.className = "item_subtotal";
      newProductSubTotDiv.innerHTML = "$" + productPrice;
      newProductToAddDiv.appendChild(newProductSubTotDiv);
      // ...when finished, add the newly created DOM element at the end of the
      // shoppping cart in front of the last two DOM nodes
      shoppingCartDiv.insertBefore(newProductToAddDiv,
        shoppingCartDiv.childNodes[shoppingCartDiv.childNodes.length - 2]);
      }
      // Then, update the shopping cart price totals
      updatePrice();
  }
  // If the shopping cart has a display of 'none'...
  if (shoppingCartDiv.style.display === "none") {
    // ...change it to 'initial' so the user can see what was added to the cart
    shoppingCartDiv.style.display = "initial";
  }
});
// Add a click event listener to the shopping cart
shoppingCartDiv.addEventListener("click", function(event) {
  // Initialize the productInCart and promoCodeInputElement variables
  var productInCart;
  var promoCodeInputElement;
  // If the event.target had a class name of remove_button...
  if (event.target.className === "remove_button") {
    // Save the parent of the parent element of the event.target to
    // productInCart
    productInCart = event.target.parentNode.parentNode;
    // Remove the productInCart element as this represets the entire product
    // entry of the product in the cart whoes remove button was clicked
    productInCart.parentNode.removeChild(productInCart);
    // Update the price calculations in the cart via the updatePrice function
    updatePrice();
    // ...else if the event.target is an A tag
  } else if (event.target.tagName === "A") {
    // ...set the productInCart to the parent node of the parent of the parent
    // of the event.target as this represents the entire product entry in the
    // cart
    productInCart = event.target.parentNode.parentNode.parentNode;
    // Call the updateQuantity function and pass in this product entry in the
    // cart to recalculate the subtotal prices.
    updateQuantity(productInCart);
    // ...else if the event.target had a class of cart_promo_button...
  } else if (event.target.className ==="cart_promo_button") {
    // ...the promo code button was click so obtain the promocode and save it
    // to promoCodeInputElement
    promoCodeInputElement = document.querySelector(".promo_code");
    // Call the updatePrice function and pass in the promo code value to
    // recalculate the shopping cart totals with this promo coded added
    updatePrice(promoCodeInputElement.value);
  }
});
// The updateQuantity function
function updateQuantity(cartItem) {
  // Obtain the cart item price minus the leading "$" character and save to
  // cartItemPrice variable
  var cartItemPrice = parseFloat(cartItem.childNodes[2].innerHTML.substr(1,
    (cartItem.childNodes[2].innerHTML.length)));
  // Obtain the product quantity count
  var cartItemQuantity = parseFloat(cartItem.childNodes[3].childNodes[0].value);
  // Multiply the quantity amount by the item price and save to
  // newCartItemSubTotal variable
  var newCartItemSubTotal = cartItemPrice * cartItemQuantity;
  // If the new subtotal of the product is equal to zero...
  if (newCartItemSubTotal === 0) {
    // ...remove the entire entry of the product from the cart
    cartItem.parentNode.removeChild(cartItem);
  }
  // Add the new subtotal to the product to the dom along with the leading "$"
  // character
  cartItem.childNodes[4].innerHTML = "$" + newCartItemSubTotal.toFixed(2);
  // Call the updatePrice function to recalculate the price totals
  updatePrice();
}
// The updatePrice function updates the shopping cart totals and applies the
// promo codes
function updatePrice(promoCode) {
  // If the promoCode argument is undefined...
  if (promoCode === undefined) {
    // ... grab whatever value that is in the promo code box and save it to the
    // promoCode variable
    promoCode = document.querySelector(".promo_code").value;
  }
  // Initialize the cartStatus object that will hold the cart items and prices
  var cartStatus = {};
  // Create the array of good feelings and save it to goodFeelings variable
  var goodFeelings = ["Hope Divine", "Love Pure", "Ecstasy Enchanting",
    "Interest Piquing", "Courage Unwaving", "Amazement Sheer",
    "Anticipation Gush"];
  // Initialize some other variables to use later
  var subtotal = 0;
  var total = 0;
  var promoAmountOff = 0;
  var arrOfPrices;
  // For each node in the shopping cart minus the last to nodes which are
  // the total area
  for (var i = 0; i < shoppingCartDiv.childNodes.length - 2; i++) {
    // If current node's class name is cart_item...
    if (shoppingCartDiv.childNodes[i].className === "cart_item") {
      // Make a key in the cartStatus object equal to the product title and then
      // set its value to the subtotal price of that product minus the initial
      // "$" character
      cartStatus[shoppingCartDiv.childNodes[i].childNodes[1].innerHTML] =
        parseFloat(shoppingCartDiv.childNodes[i].childNodes[4].innerHTML.substr(1,
          shoppingCartDiv.childNodes[i].childNodes[4].innerHTML.length));
    }
  }
  // Set the arrOfPrices to the array of all the values of the cartStatus object
  arrOfPrices = Object.values(cartStatus);
  // For each item in arrOfPrices
  for (i = 0; i < arrOfPrices.length; i++) {
    // Add its value to subtotal
    subtotal += arrOfPrices[i];
  }
  // Set the cart subtotal to the new value of subtotal, append a leading "$"
  // character and ensure that it shows 2 decimal laces
  document.querySelector(".cart_subtotal").innerHTML = "$" + subtotal.toFixed(2);
  // If the promoCode equals HAPPY...
  if (promoCode === "HAPPY") {
    // For each property in cartStatus object
    for (var prop in cartStatus) {
      // If the property is found in the goodFeelings array...
      if (goodFeelings.indexOf(prop) > -1) {
        // ... add that property's value to promoAmountOff
        promoAmountOff += cartStatus[prop];
      }
    }
    // Multiply 15% by the total sum of all the good feeling / happy experiences
    // in the cart and set it to promoAmountOff
    promoAmountOff *= .15;
      // Set the discountAmount variable to promoAmountOff
      discountAmount = promoAmountOff;
      // Set the discountMessage to the following message
      discountMessage = " (15% Off for all positive experiences.)";
    // ...else if the promoCode equals RAGE
  } else if (promoCode === "RAGE") {
    // For each property in cartStatus object
    for (var prop in cartStatus) {
      // If the property key equals "Anger Raging"...
      if ( prop === "Anger Raging") {
        // ...make that property's value equal to promoAmountOff
        promoAmountOff += cartStatus[prop];
      }
    }
    // Multiply 10% by the amount of "Anger Raging" experience product and set
    // to the promoAmountOff
    promoAmountOff *= .1;
      // Set the discountAmount variable to promoAmountOff
      discountAmount = promoAmountOff;
      // Set the discountMessage to the following message
      discountMessage = " (10% Off for the Anger Raging experience.)";
    /// ...else if the promoCode is equal to "5OFF"...
  } else if (promoCode === "5OFF") {
    // Set the promoAmountOff equal to the subtotal
    promoAmountOff = subtotal;
    // Multiply promoAmountOff by 5% and set it back to itself
    promoAmountOff *= .05;
      // Set the discountAmount variable to promoAmountOff
      discountAmount = promoAmountOff;
      // Set the discountMessage to the following message
      discountMessage = " (5% Off for all experiences in your cart.)";
  }
  // Set the discount value span to the discountAmount ensuring 2 decimal places
  // are shown and add a leading "-$" in front of it
  document.querySelector(".cart_discount_value").innerHTML = "-$" + discountAmount.toFixed(2);
  // Add the discount message describing the discount the promo code is
  document.querySelector(".cart_discount_value").innerHTML += discountMessage;
  // Set the total variable to the subtotal minus the discountAmount ensuring
  // 2 decimal places are shown
  total = (subtotal - discountAmount).toFixed(2);
  // Display the calculated total in the total field of the shopping cart
  // and add a leading "$" character
  document.querySelector(".cart_total_value").innerHTML = "$" + total;
}

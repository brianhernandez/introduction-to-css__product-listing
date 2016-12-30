console.log("Loaded productlisting.js");

var shoppingCartDiv = document.querySelector(".shopping_cart");
var productListingDiv = document.querySelector(".product_listings");
var toggleCartButton = document.getElementById("toggle_cart");

// cartStatus.happyPromo = false;
// cartStatus.ragePromo = false;
// cartStatus.bigFive = false;


// console.log(shoppingCartDiv);
// console.log(productListingDiv);
// console.log(toggleCartButton);
console.log(shoppingCartDiv.childNodes);
shoppingCartDiv.style.display = "none";
// console.log(shoppingCartDiv.childNodes.length - 2);

toggleCartButton.addEventListener("click", function(event) {
  if (shoppingCartDiv.style.display === "none") {
    shoppingCartDiv.style.display = "initial";
    // shoppingCartDiv.outerText = "Hide Cart";
  } else if (shoppingCartDiv.style.display === "initial") {
    shoppingCartDiv.style.display = "none";
    // shoppingCartDiv.outerText = "Show Cart";
  }
});

productListingDiv.addEventListener("click", function(event) {
  // console.log(event.target.className);
  if (event.target.tagName === "BUTTON") {

    var parentNode = event.target.parentNode;
    var productTitle = parentNode.childNodes[1].innerHTML;
    var productPrice = parentNode.childNodes[2].innerHTML.substr(1,
      (parentNode.childNodes[2].innerHTML.length));
    var productImageURL = parentNode.childNodes[0].src;
    var productFound = false;
    var productAlreadyInCart;

    for (var i = 0; i < shoppingCartDiv.childNodes.length - 2; i++) {
      // console.log(shoppingCartDiv.childNodes[i]);
      if (shoppingCartDiv.childNodes[i].className === "cart_item") {
        for (var j = 0; j < shoppingCartDiv.childNodes[i].childNodes.length; j++) {
          if (shoppingCartDiv.childNodes[i].childNodes[j].className === "item_title"){
            if (shoppingCartDiv.childNodes[i].childNodes[j].innerHTML === productTitle) {
              productFound = true;
              productAlreadyInCart = shoppingCartDiv.childNodes[i];
              productAlreadyInCart.childNodes[3].childNodes[0].value =
                parseInt(productAlreadyInCart.childNodes[3].childNodes[0].value) + 1;
            }
          }
        }
      }
    }

      if (productFound) {
        // console.log("product was already found!");
        updateQuantity(productAlreadyInCart);
      } else if (!productFound) {
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
      value.value = "1"; // #### STUFF TO BE AUTO CALCULATED DEPENDANT ON HOW MANY ITEMS IN CART

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
      newProductSubTotDiv.innerHTML = "$" + productPrice; // #### STUFF TO BE AUTO CALCULATED
      newProductToAddDiv.appendChild(newProductSubTotDiv);


      shoppingCartDiv.insertBefore(newProductToAddDiv,
        shoppingCartDiv.childNodes[shoppingCartDiv.childNodes.length - 2]);
      }

      // console.log(newProductToAddDiv);
      // console.log(shoppingCartDiv.childNodes[shoppingCartDiv.childNodes.length - 2]);
      // console.log(parentNode.childNodes);
      updatePrice();
  }

  if (shoppingCartDiv.style.display === "none") {
    shoppingCartDiv.style.display = "initial";
  }
});

shoppingCartDiv.addEventListener("click", function(event) {
  // console.log("registering a click on remove button.");
  // console.log(event.target.tagName === "BUTTON");
  // event.preventDefault();
  // console.log(event.target);
  var productInCart;
  var promoCodeInputElement;
  if (event.target.className === "remove_button") {
    productInCart = event.target.parentNode.parentNode;
    // console.log(productInCart);
    // updateQuantity(productInCart);
    productInCart.parentNode.removeChild(productInCart);
    updatePrice();
  } else if (event.target.tagName === "A") {
    productInCart = event.target.parentNode.parentNode.parentNode;
    // event.preventDefault();
    // console.log("update link clicked");
    console.log(event.target.parentNode.parentNode.parentNode);
    updateQuantity(productInCart);
  } else if (event.target.className ==="cart_promo_button") {
    promoCodeInputElement = document.querySelector(".promo_code");
    updatePrice(promoCodeInputElement.value);
    console.log(promoCodeInputElement);
  }
});

function updateQuantity(cartItem) {
  // console.log(cartItem);
  var cartItemPrice = parseFloat(cartItem.childNodes[2].innerHTML.substr(1,
    (cartItem.childNodes[2].innerHTML.length)));
  var cartItemQuantity = parseFloat(cartItem.childNodes[3].childNodes[0].value);
  var newCartItemSubTotal = cartItemPrice * cartItemQuantity;

  if (newCartItemSubTotal === 0) {
    cartItem.parentNode.removeChild(cartItem);
    // updatePrice();
  }
  cartItem.childNodes[4].innerHTML = "$" + newCartItemSubTotal.toFixed(2);
  updatePrice();
}

function updatePrice(promoCode) {
  var cartStatus = {};
  var subtotal = 0;
  var arrOfPrices;
  for (var i = 0; i < shoppingCartDiv.childNodes.length - 2; i++) {
    if (shoppingCartDiv.childNodes[i].className === "cart_item") {
      console.log(shoppingCartDiv.childNodes[i].childNodes[1].innerHTML);
      console.log(shoppingCartDiv.childNodes[i].childNodes[4]);
      cartStatus[shoppingCartDiv.childNodes[i].childNodes[1].innerHTML] =
        parseFloat(shoppingCartDiv.childNodes[i].childNodes[4].innerHTML.substr(1,
        shoppingCartDiv.childNodes[i].childNodes[4].innerHTML.length));
    }
  }

  arrOfPrices = Object.values(cartStatus);
  for (var i = 0; i < arrOfPrices.length; i++) {
    subtotal += arrOfPrices[i];
  }
  document.querySelector(".cart_subtotal").innerHTML = "$" + subtotal.toFixed(2);

  if (promoCode === "HAPPY") {

  }

  console.log(arrOfPrices);
  console.log(subtotal);

  // console.log(cartStatus);
}


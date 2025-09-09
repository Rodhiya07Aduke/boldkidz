if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
            // access each remove button in the document and add an event listner to it 
        var removeCartItemButton = document.getElementsByClassName('btn-danger')
        console.log(removeCartItemButton)
        for(var i = 0; i < removeCartItemButton.length; i++) {
                var button = removeCartItemButton[i]
                button.addEventListener('click' , removeButtonClicked )
                // console.log('clicked!')     
        }
        

        // adding event listner to o each .cart-quantity-input to update total when remove button is clicked
        var quantityInputs = document.getElementsByClassName('cart-quantity-input')
        for (var i = 0; i < quantityInputs.length; i++) {
            var input = quantityInputs[i]
            // whnever input is changed implement quantityChanged()
            input.addEventListener('change', quantityChanged)
        }

        //when we click the add to cart button
        var addToCartButtons = document.getElementsByClassName('shop-item-button')
        for (var i = 0; i<addToCartButtons.length; i++){
            var button = addToCartButtons[i]
            button.addEventListener('click', addToCartClicked)
        }

         document.getElementsByClassName('btn-success')[0].addEventListener('click' , purchaseDone)

// ready function stop  
}

function removeButtonClicked(event) {
    var clickedButton = event.target
    clickedButton.parentElement.parentElement.remove()
// in order to always update the total anytime an item is removed, this function has to be present
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
// if input is not a number or is less than or equal to 0 execute this
}

//when add to cart is clicked.....
function addToCartClicked(event){
    var button = event.target
    // to get the parent of the button of the parent
    var shopItemContainer = button.parentElement.parentElement
    var title = shopItemContainer.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItemContainer.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItemContainer.getElementsByClassName('shop-item-image')[0].src
    console.log(title, price, imageSrc)
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    // creating a new div that would be added to the cart anytime its clicked
    var newCartRow = document.createElement('div')
    // to style the div just like others
    newCartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i< cartItemNames.length; i++){
        // when an item has already been PublicKeyCredential, th error messge pops up
        if (cartItemNames[i].innerText == title){
            alert('You have alradey picked this item')
            return
        }
    }
    var cartRowContents = `
    <div class="cart-item cart-column">
                <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
                <span class="cart-item-title">${title}</span>
            </div>
            <span class="cart-price cart-column">${price}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="1">
                <button class="btn btn-danger" type="button">REMOVE</button>
            </div>`
    newCartRow.innerHTML = cartRowContents
    cartItems.appendChild(newCartRow)
    newCartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeButtonClicked)
    newCartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function purchaseDone(){
    alert('Thanks for your patronage.')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}


function updateCartTotal() {
// we want to acess all the rows, get their price and quantity and update the total
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    // to now get the rows int the cart items
    var cartRowContainer = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
     for(var i = 0; i < cartRowContainer.length; i++){
        var cartRow = cartRowContainer[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$' , ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
        // console.log(price , quantity)
        console.log(total)
     }
        total = Math.round(total * 100) / 100
        document.getElementsByClassName('cart-total-price')[0].innerText = '$'+total
}

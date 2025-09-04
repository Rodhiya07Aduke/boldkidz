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
}

// adding event listner to o each .cart-quantity-input to update total when remove button is clicked
var quantityInputs = document.getElementsByClassName('cart-quantity-input')
for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i]
    // whnever input is changed implement quantityChanged()
    input.addEventListener('change', quantityChanged)

var addToCartButtons = document.getElementsByClassName('shop-item-button')
for (var i = 0; i<addToCartButtons; i++){
    var button = addToCartButtons[i]
    button.addEventListener('click', addToCartClicked)
}
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

function addToCartClicked(event){
    var button = event.target
    // to get he parent of the button of the parent
    var shopItemContainer = button.parentElement.parentElement
    var title = shopItemContainer.getElementsByClassName('shop-item-title')
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

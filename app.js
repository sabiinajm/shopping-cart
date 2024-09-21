const cards = document.getElementById("cards")
function displayCards(filteredData) {
    cards.innerHTML = ''
    const dataToDisplay = filteredData || data
    dataToDisplay.forEach(card => {
        cards.innerHTML += `
            <article class="flex flex-col bg-white">
                <a rel="noopener noreferrer" href="#">
                    <img class="object-scale-down w-full h-52" src="${card.image}" alt="${card.title}">
                </a>
                <div class="flex flex-col flex-1 p-6">
                    <a class="text-xs tracking-wider uppercase hover:underline text-green-600" href="#">${card.category}</a>
                    <h3 class="flex-auto py-2 text-lg font-semibold">${card.title}</h3>
                    <p class="flex-auto py-2 text-xs text-gray-600">${card.description.slice(0, 70).concat('...')}</p>
                    <div class="flex flex-wrap justify-between items-end pt-3 space-x-2 text-xs text-gray-600">
                        <span>Rating: ${card.rating.rate}</span>
                        <button onclick="addToCart('${card.title}', '${card.image}', ${card.price} )" class="px-4 py-2 font-semibold rounded bg-green-600 text-gray-50">
                            ${card.price}€
                        </button>
                    </div>
                </div>
            </article>
        `
    })
}
displayCards()

function search() {
    const searchInp = document.getElementById("searchInp").value.trim().toLowerCase()
    const filteredData = data.filter(card => card.title.toLowerCase().includes(searchInp))
    displayCards(filteredData)
}

const cartList = document.getElementById("cartList")
function handleCart() {
    cartList.classList.toggle('hidden')
    cartList.classList.toggle('flex')
}

const addedList = document.getElementById("addedList")
let cartItems = []

function updateCartDisplay() {
    const totalPrice = document.getElementById('totalPrice')
    addedList.innerHTML = ''
    if (cartItems.length === 0) {
        addedList.innerHTML = '<p>Your cart is empty.</p>'
    }
    const total = cartItems.reduce((sum, item) => sum + item.price, 0)
    totalPrice.innerHTML = `${total}€`
    cartItems.forEach(item => {
        addedList.innerHTML += `
            <li class="flex py-6 sm:flex-row sm:justify-between">
                <div class="flex w-full space-x-2 sm:space-x-4">
                    <img class="flex-shrink-0 object-scale-down w-20 h-20 rounded outline-none sm:w-28 sm:h-28 bg-gray-50" src="${item.image}" alt="${item.title}">
                    <div class="flex flex-col justify-between w-full pb-4">
                        <div class="flex justify-between w-full pb-2 space-x-2">
                                <h3 class="text-lg font-semibold leading-snug sm:pr-8">${item.title}</h3>
                            <p class="text-right text-lg font-semibold">${item.price}€</p>
                        </div>
                        <div class="flex text-sm divide-x">
                            <button type="button" class="flex items-center px-2 py-1 pl-0 space-x-1" onclick="removeFromCart('${item.title}')">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-4 h-4 fill-current">
                                    <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                                    <rect width="32" height="200" x="168" y="216"></rect>
                                    <rect width="32" height="200" x="240" y="216"></rect>
                                    <rect width="32" height="200" x="312" y="216"></rect>
                                    <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
                                </svg>
                                <span>Remove</span>
                            </button>
                        </div>
                    </div>
                </div>
            </li>
        `
    })
}

function addToCart(title, image, price, category) {
    const existingItem = cartItems.find(item => item.title === title)
    if (!existingItem) {
        const item = { title, image, price, category }
        cartItems.push(item)
    }
    updateCartDisplay()
}


function removeFromCart(title) {
    cartItems = cartItems.filter(item => item.title !== title)
    updateCartDisplay()
}

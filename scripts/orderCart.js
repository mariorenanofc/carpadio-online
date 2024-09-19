const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("closed-model-btn");
const cartCounter = document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");

let cart = [];

// Open card model
cartBtn.addEventListener("click", function () {
    updateCartModal();
    cartModal.style.display = "flex";
});

// Closed card model ao clicar fora
cartModal.addEventListener("click", function (event) {
    if (event.target === cartModal) {
        cartModal.style.display = "none";
    }
});

// Fechar modal ao clicar no botão fechar
closeModalBtn.addEventListener("click", function () {
    cartModal.style.display = "none";
});

menu.addEventListener("click", function (event) {
    // Verifica se o clique foi no botão ou no ícone dentro do botão
    let parentButton = event.target.closest(".add-to-cart-btn");

    if (parentButton) {
        const name = parentButton.getAttribute("data-name");
        const price = parseFloat(parentButton.getAttribute("data-price"));

        // Adicionar no carrinho
        addToCart(name, price);
    }
});

// Função para adicionar no carrinho
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        // Se já existe o item, aumenta a quantidade
        existingItem.quantity += 1;
    } else {
        cart.push({
            name,
            price,
            quantity: 1,
        });
    }

    updateCartModal();
    updateCartFooterVisibility(); // Atualiza a visibilidade do footer
}

// Função para remover item do carrinho
function removeItemFromCart(name) {
    const itemIndex = cart.findIndex(item => item.name === name);
    if (itemIndex > -1) {
        cart.splice(itemIndex, 1);
        updateCartModal();
        updateCartFooterVisibility(); // Atualiza a visibilidade do footer
    }
}

// Atualiza o carrinho no modal
function updateCartModal() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col");

        cartItemElement.innerHTML = `
            <div class="flex items-center justify-between bg-orange-300 p-2 rounded-2xl">
                <div>
                    <p class="font-bold">${item.name}</p>
                    <p>Qtd: ${item.quantity}</p>
                    <p class="font-medium mt-2">R$: ${item.price.toFixed(2)}</p>
                </div>
                
                <button onclick="removeItemFromCart('${item.name}')" class="bg-red-400 px-2 rounded-md">Remover</button>
            </div>
        `;

        total += item.price * item.quantity;
        cartItemsContainer.appendChild(cartItemElement);
    });

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    // Atualiza o contador do carrinho e retorna a quantidade
    const itemCount = cart.length;
    cartCounter.innerHTML = itemCount;

    return itemCount; // Retorna a quantidade de itens
}

// Função para atualizar a visibilidade do footer com base no número de itens no carrinho
function updateCartFooterVisibility() {
    const cartFooter = document.getElementById('cart-footer');

    // Chama updateCartModal para obter o número de itens
    const itemCount = updateCartModal();

    // Mostra ou oculta o footer com base na quantidade de itens
    if (itemCount > 0) {
        cartFooter.classList.remove('footer-hidden');
        cartFooter.classList.add('footer-visible');
    } else {
        cartFooter.classList.remove('footer-visible');
        cartFooter.classList.add('footer-hidden');
    }
}


// Atualiza o footer ao carregar a página
document.addEventListener('DOMContentLoaded', updateCartFooterVisibility);



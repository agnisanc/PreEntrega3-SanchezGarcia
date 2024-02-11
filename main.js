const product = [
    {id: 1 , code: "CDP1", name: "Collar de plata Jericó", material: "Plata pura", price: 75000 , },
    {id: 2 , code: "CDP2", name: "Collar de plata Lisboa", material: "Plata 925", price: 45000 , },
    {id: 3 , code: "CDP3", name: "Collar de plata Luxor", material: "Plata 950", price: 55000 },
    {id: 4 , code: "DDP", name: "Dije de plata Cairo", material: "Plata pura", price: 60000},
    {id: 5 , code: "DDO", name: "Dije de oro Argos" , material: "Oro 24k", price: 70000},
    {id: 6 , code: "CDO1", name: "Collar de oro Atenas" , material: "Oro 24k", price: 90000 },
    {id: 7 , code: "CDO2", name: "Collar de oro Cartago" , material: "Oro 18k", price: 80000 },
    {id: 8 , code: "CDO3", name: "Collar de oro Tánger" , material: "Oro 14k", price: 70000 },
    {id: 9 , code: "ADP1", name: "Anillo de plata Zanzíbar" , material: "Plata pura", price: 40000 },
    {id: 10 , code: "ADP2", name: "Anillo de plata Bakú" , material: "Plata 925", price: 30000 },
    {id: 11 , code: "ADP3", name: "Anillo de plata Praga" , material: "Plata 950", price: 35000 },
    {id: 12 , code: "ADO1", name: "Anillo de oro Tenochtitlan" , material: "Oro 24k", price: 60000 },
    {id: 13 , code: "ADO2", name: "Anillo de oro Nishapur" , material: "Oro 18k", price: 55000 },
    {id: 14 , code: "ADO3", name: "Anillo de oro Tebas" , material: "Oro 14k", price: 50000 },
];

localStorage.setItem("product", JSON.stringify(product))

const products = JSON.parse(localStorage.getItem("product"));


searchName.addEventListener("input", () => {
	console.log(searchName.value)
	});

    const container = document.getElementById("container");
    const searchNameInput = document.getElementById("searchName");
    
    
    function searchProducts(productsSearched) {
        container.innerHTML = "";
    
        productsSearched.forEach((item) => {
            let div = document.createElement("div");
            div.innerHTML = `
            <h2> ${item.name}</h2>
            <p>Código de compra: ${item.code}</p>
            <p>Material: ${item.material}</p>
            <b>$${item.price}</b>
            <button onclick="addProduct('${item.name}', ${item.price})">Agregar</button>
            `;
            container.append(div);
        });
    }

    function filterProducts() {
        const searchName = searchNameInput.value.toLowerCase();
        const productsFiltered = product.filter((item) => item.name.toLowerCase().includes(searchName));
        searchProducts(productsFiltered);
    }
    
    // Mostrar todos los productos al cargar la página
    searchProducts(product);

const totalAmountElement = document.getElementById("totalAmount");

function addProduct(productName, productPrice) {
    const listItem = document.createElement("li");
    listItem.textContent = productName;
    productList.appendChild(listItem);

    let totalAmount = parseFloat(totalAmountElement.textContent);
    totalAmount += productPrice;

    totalAmountElement.textContent = totalAmount;
    localStorage.setItem("totalAmount", totalAmount);
}

// Esta seccion se encarga de realizar el calculo del precio de cada cuota que el usuario abona por el producto seleccionado.
//Se ha optimizado la seleccion de cuotas a traves de un select para definir las cuotas disponibles, librando al usuario de tener que ingresar el numero cuotas a traves de un input.


function feesCalc() {
    const numberOfFees = parseInt(document.getElementById('numberOfFees').value, 10);
    const totalAmount = parseFloat(localStorage.getItem('totalAmount')) || 0;
    const priceByFee = totalAmount / numberOfFees;
    const finalAmount = priceByFee * numberOfFees;
    const date = new Date();

    document.getElementById('result').innerText = `El precio por cuota de su compra es de $${priceByFee.toFixed(2)}.
    El precio final de su compra es de $${finalAmount}.
    Fecha de compra: ${date}
    Muchas gracias por su compra!
    `;

    localStorage.setItem('result', JSON.stringify({
        priceByFee: priceByFee,
        finalAmount: finalAmount,
        numberOfFees: numberOfFees
    }));
}

//Finalmente, se guarda el resultado final de la compra en el localStorage en caso de que sea necesario en el futuro.
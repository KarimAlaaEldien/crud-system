var productName = document.getElementById("productName");
var ProductPrice = document.getElementById("ProductPrice");
var ProductCategory = document.getElementById("ProductCategory");
var ProductDesc = document.getElementById("ProductDescription");
var ProductImage = document.getElementById("ProductImage");
var btnAdd = document.getElementById("btnAdd");
var updateBtn = document.getElementById("updateBtn")
var productList = [];
var currentIndex = 0;
var regex = {
    productName: /^[A-Z][a-z0-9]{1,8}$/,
    ProductPrice: /^(10[0-9]|1[1-9]\d|[2-9]\d\d|1000)$/,
    ProductDescription: /^.{3,}$/m,
    ProductCategory: /(TV|Mobile|Laptop|Screens|Other)/i,
};

btnAdd.addEventListener("click", function () {
    addProduct();
});

updateBtn.addEventListener("click", function () {
    updateProducts();
});

if (localStorage.getItem("allProduct") != null) {
    productList = JSON.parse(localStorage.getItem("allProduct"));
    displayProduct(productList);
}

function addProduct() {
    if (checkValidation()) {
        var product = {
            name: productName.value,
            price: ProductPrice.value,
            category: ProductCategory.value,
            desc: ProductDesc.value,
            image: `images/${ProductImage.files[0]?.name}`,
            id: productList.length,
        }
        productList.push(product);
        setDataInlocalStorage();
        displayProduct(productList);
        updateInputValue();
    }
}

function displayProduct(list) {
    var allproduct = ``;
    for (var i = 0; i < list.length; i++) {
        allproduct += `<div class="col-md-4">
            <div class="item text-white border  rounded-3 overflow-hidden">
            <img src="${list[i].image}" class="w-100 mb-3"
            alt="stitch carton picture">
            <div class="p-3">
            <h2 class="h4">Name: ${list[i].name}</h2>
            <p> desc: ${list[i].desc}</p>
            <h3 class="h5">Price: ${list[i].price}</h3>
            <h3 class="h5"> Category: ${list[i].category}</h3>
            <button onclick="deleteProduct(${list[i].id})" class="btn btn-outline-danger w-100 mb-3 mt-2">Delete</button>
            <button onclick="getDataToUpdate(${list[i].id})" class="btn btn-outline-warning w-100">Update</button>
            </div>
            </div>
            </div>`
    }
    document.getElementById("allData").innerHTML = allproduct;
}

function updateInputValue(configeration) {
    productName.value = configeration ? configeration.name : null;
    ProductPrice.value = configeration ? configeration.price : null;
    ProductCategory.value = configeration ? configeration.category : null;
    ProductDesc.value = configeration ? configeration.desc : null;
}
function deleteProduct(index) {
    productList.splice(index, 1)
    displayProduct(productList);
    setDataInlocalStorage();
}
function setDataInlocalStorage() {
    localStorage.setItem("allProduct", JSON.stringify(productList));
}
function getDataToUpdate(index) {
    currentIndex = index;
    updateInputValue(productList[index])
    btnAdd.classList.add("d-none");
    updateBtn.classList.remove("d-none");
}
function updateProducts() {
    if(checkValidation()){
    productList[currentIndex].name = productName.value;
    productList[currentIndex].price = ProductPrice.value;
    productList[currentIndex].category = ProductCategory.value;
    productList[currentIndex].desc = ProductDesc.value;
    displayProduct(productList);
    setDataInlocalStorage();
    btnAdd.classList.remove("d-none");
    updateBtn.classList.add("d-none");
    updateInputValue();
    }
}
function searchValueFromProduct(searchValue) {
    var searchItem = [];
    if (searchValue == "") {
        displayProduct(productList);
        return;
    }
    for (var i = 0; i < productList.length; i++) {
        if (productList[i].name.toLowerCase().includes(searchValue.toLowerCase())) {
            searchItem.push(productList[i]);
        }
    }
    displayProduct(searchItem);
}

function validateInput(element) {
    if (regex[element.id].test(element.value)) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        element.nextElementSibling.classList.add("d-none");
        return true;
    }
    else {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        element.nextElementSibling.classList.remove("d-none");
        return false;

    }
}
function checkValidation(){
    if(validateInput(productName) &&
        validateInput(ProductPrice) &&
        validateInput(ProductCategory) &&
        validateInput(ProductDesc)){
        return true;
        }
        else{
            return false;
        }
}
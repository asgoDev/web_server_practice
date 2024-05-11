const form = document.getElementById("form");
const submit = document.getElementById("submit");
const table = document.getElementById("product-list__tbody");

class Product {
  constructor({ name, price, year }) {
    this.name = name;
    this.price = price;
    this.year = year;
  }
  toHtmlElement() {
    let productRow = document.createElement("tr");
    productRow.id = this.id;
    productRow.innerHTML = `
    <td class="cell cell--product">${this.name}</td>
    <td class="cell cell--price">${this.price} VES</td>
    <td class="cell cell--year">${this.year}</td>
    <td class="cell cell--options"><button class="product__option-btn product__option-btn--edit-btn">Editar</button><button class="product__option-btn product__option-btn--delete-btn">Eliminar</button></td>`;

    return productRow;
  }
}

class UI {
  constructor(form, submit, table, list = []) {
    this.form = form;
    this.table = table;
    this.submit = submit;
    this.list = list;
  }
  setProductList(productList) {
    this.list = productList;
  }
  getFormValues() {
    const name = this.form[0].value;
    const price = this.form[1].value;
    const year = this.form[2].value;

    return { name, price, year };
  }
  setFormValues({ name, price, year }) {
    this.form[0].value = name;
    this.form[1].value = price;
    this.form[2].value = year;
  }
  createProduct(data) {
    return new Product(data);
  }
  addProductToList() {
    let product = this.createProduct(this.getFormValues());
    this.list.push(product);
    this.renderList();
    this.form.reset();
  }
  renderList() {
    table.innerHTML = "";
    this.list.forEach((listItem, id) => {
      let htmlElement = listItem.toHtmlElement();
      htmlElement
        .querySelector(".product__option-btn--delete-btn")
        .addEventListener("click", () => {
          this.deleteElement(id);
        });
      htmlElement
        .querySelector(".product__option-btn--edit-btn")
        .addEventListener("click", () => {
          this.editElement(id);
        });

      table.appendChild(htmlElement);
    });

    this.updateStoragedList();
  }
  deleteElement(id) {
    let [deletedObject] = this.list.splice(id, 1);
    this.renderList();
    return deletedObject;
  }
  editElement(id) {
    let deletedElement = this.deleteElement(id)
    this.setFormValues(deletedElement)
  }
  updateStoragedList() {
    let productsString = JSON.stringify(this.list);
    localStorage.setItem("product-list", productsString);
  }
  loadFormLocalStorage() {
    if (localStorage.getItem("product-list")) {
      let productsString = localStorage.getItem("product-list");
      let productData = JSON.parse(productsString);
      let productList = productData.map((data) => this.createProduct(data));
      this.setProductList(productList);
      this.renderList();
    }
  }
}

const ui = new UI(form, submit, table);
ui.loadFormLocalStorage();

// Asignación de funcion a boton
ui.submit.addEventListener("click", (e) => {
  e.preventDefault();
  ui.addProductToList();
});

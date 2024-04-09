const itemBtns = document.querySelectorAll('.item');
const cartList = document.getElementById('cart-list');
const bottomBtns = document.getElementById('bottom-btns');
const numberBtns = document.querySelectorAll('.number');
const checkoutBtn = document.getElementById('checkout-btn');
const clearBtn = document.getElementById('clear-btn');
const total = document.getElementById('total');
const subtotal = document.getElementById('subtotal');
const taxes = document.getElementById('taxes');
const removeFromCartBtn = document.getElementById('clear-from-cart-btn');
const clearFromCartBtn = document.getElementById('remove-from-cart-btn');
const cartItem = document.querySelectorAll('.cart-item');
const registerInput = document.getElementById('cash-register-input');
const registerOutput = document.getElementById('cash-register-output');
const decimalBtn = document.getElementById('decimal');
const addBtn = document.getElementById('add-btn');
const changeBtn = document.getElementById('change-btn');
const changeBtn2 = document.getElementById('change-btn2');
const regex = /[\sa-z:$]/gi;
const drawerMenu = document.getElementById('drawer-menu');
const removeBtn = document.getElementById('remove-change-btn');
const cartBtnContainer = document.getElementById('cart-btn-container');
const closeDrawerBtn = document.getElementById('close-drawer-btn');
const promptMenu = document.getElementById('prompt-menu');
const arrowUp = document.getElementById('move-up-cart-btn');
const arrowDown = document.getElementById('move-down-cart-btn');
let isDrawerOpen = false;
let debugMode = false;
let cidStored = [];
let totalInDrawer = 0;
let changeDue = 0;
let cashReceived = 0;
let totalAmount = 0;

const coinOrBill = (num) => {
  if (num >= 1) {
    return 'bill'
  } else {
    return 'coin'
  }
}





// break down value into coins and bills add those to the change values.



//cash in drawer 
let cid = [
  { type: "PENNY", change: 1.01, value: 0.01 },
  { type: "NICKEL", change: 2.05, value: 0.05 },
  { type: "DIME", change: 3.1, value: 0.10 },
  { type: "QUARTER", change: 4.25, value: 0.25 },
  { type: "ONE", change: 90, value: 1.00 },
  { type: "FIVE", change: 55, value: 5.00 },
  { type: "TEN", change: 20, value: 10.00 },
  { type: "TWENTY", change: 60, value: 20.00 },
  { type: "ONE HUNDRED", change: 100, value: 100.00 }
];


//initialize Cash in Drawer
const updateCid = (cid) => {
  changeBtn.textContent = '';
  totalInDrawer = 0;
  for (let i = 0; i < cid.length; i++) {
    totalInDrawer += cid[i].change;
    totalInDrawer = parseFloat(totalInDrawer.toFixed(2));
    cidStored.push(cid[i]);
  }
  console.log(cid);
  changeBtn.textContent = parseFloat((totalInDrawer.toFixed(2)));
  return console.log(typeof totalInDrawer);
}
updateCid(cid);

//addition sorting function eventuall can add ternary operators to make it more readable
const addCashReceived = (cid, cash) => {
  let initialCash = cash;
  for (let i = cid.length - 1; i >= 0; i--) {
    while (coinOrBill(cid[i].value) === 'bill' && cash >= cid[i].value) {
      cid[i].change += cid[i].value;
      cid[i].change = parseFloat(cid[i].change.toFixed(2));
      cash -= cid[i].value;
      cash = parseFloat(cash.toFixed(2));
      console.log(`${cid[i].type} was added to the drawer, ${cash} remaining to add`);
    }
    while (coinOrBill(cid[i].value) === 'coin' && cash >= cid[i].value) {
      cid[i].change += cid[i].value;
      cid[i].change = parseFloat(cid[i].change.toFixed(2));
      cash -= cid[i].value;
      cash = parseFloat(cash.toFixed(2));
      console.log(`A ${cid[i].type} was added to the drawer, ${cash} remaining to add`);
    }
  }
  updateCid(cid);
  console.log('change added to drawer, new value displayed');
  console.log(typeof cash);
};




//subtraction sorting function
const subtractChangeDue = (cid, change) => {
  let initialChange = change;
  for (let i = cid.length - 1; i >= 0; i--) {
    while (coinOrBill(cid[i].value) === 'bill' && change >= cid[i].value) {
      cid[i].change -= cid[i].value;
      cid[i].change = parseFloat(cid[i].change.toFixed(2));
      change -= cid[i].value;
      change = parseFloat(change.toFixed(2));
      console.log(`${cid[i].value} was taken from ${initialChange} ${change} remaining`);
    }
    while (coinOrBill(cid[i].value) === 'coin' && change >= cid[i].value) {
      cid[i].change -= cid[i].value;
      cid[i].change = parseFloat(cid[i].change.toFixed(2));
      change -= cid[i].value;
      change = parseFloat(change.toFixed(2));
      console.log(`${cid[i].value} was taken from ${initialChange} ${change} remaining`);
    }
  }
  updateCid(cid);
  changeBtn2.textContent = change;
  changeDue = change;
  console.log('change sorted');
  console.log(typeof change);
};

console.log(cid);


// product data 
const products = [
  {
    id: 0,
    name: 'Coffee',
    price: 1.50,
    quantity: 0,
    selected: false,
  },
  {
    id: 1,
    name: 'Bread',
    price: 1.50,
    quantity: 0,
    selected: false,
  },
  {
    id: 2,
    name: 'Milk',
    price: 1.50,
    quantity: 0,
    selected: false,
  },
  {
    id: 3,
    name: 'Eggs',
    price: 1.50,
    quantity: 0,
    selected: false,
  },
  {
    id: 4,
    name: 'Butter',
    price: 1.50,
    quantity: 0,
    selected: false,
  },
  {
    id: 5,
    name: 'Juice',
    price: 1.50,
    quantity: 0,
    selected: false,
  },
  {
    id: 6,
    name: 'Tea',
    price: 1.50,
    quantity: 0,
    selected: false,
  },
  {
    id: 7,
    name: 'Sugar',
    price: 1.50,
    quantity: 0,
    selected: false,
  },
  {
    id: 8,
    name: 'Apple',
    price: 1.50,
    quantity: 0,
    selected: false,
  },
  {
    id: 9,
    name: 'Orange',
    price: 1.50,
    quantity: 0,
    selected: false,
  },
  {
    id: 10,
    name: 'Banana',
    price: 1.50,
    quantity: 0,
    selected: false,
  },
  {
    id: 11,
    name: 'Pear',
    price: 1.50,
    quantity: 0,
    selected: false,
  },
  {
    id: 12,
    name: 'Peach',
    price: 1.50,
    quantity: 0,
    selected: false,
  },
  {
    id: 13,
    name: 'Cherry',
    price: 1.50,
    quantity: 0,
    selected: false,
  },
  {
    id: 14,
    name: 'Strawberry',
    price: 1.50,
    quantity: 0,
    selected: false,
  },
  {
    id: 15,
    name: 'Blueberry',
    price: 1.50,
    quantity: 0,
    selected: false,
  },
  {
    id: 16,
    name: 'Raspberry',
    price: 1.50,
    quantity: 0,
    selected: false,
  },
  {
    id: 17,
    name: 'Blackberry',
    price: 1.50,
    quantity: 0,
    selected: false,
  },
  {
    id: 18,
    name: 'Pineapple',
    price: 1.50,
    quantity: 0,
    selected: false,
  },
  {
    id: 19,
    name: 'Poptart',
    price: 1.50,
    quantity: 0,
    selected: false,
  },
  {
    id: 20,
    name: 'Lemon',
    price: 1.50,
    quantity: 0,
    selected: false,
  },
  {
    id: 21,
    name: 'Lime',
    price: 1.50,
    quantity: 0,
    selected: false,
  },
  {
    id: 22,
    name: 'Grape',
    price: 1.50,
    quantity: 0,
    selected: false,
  },
  {
    id: 23,
    name: 'Kiwi',
    price: 1.50,
    quantity: 0,
    selected: false,
  },
  {
    id: 24,
    name: 'Papaya',
    price: 1.50,
    quantity: 0,
    selected: false,
  },
  {
    id: 25,
    name: 'Mango',
    price: 1.50,
    quantity: 0,
    selected: false,
  },
  {
    id: 26,
    name: 'Peach',
    price: 1.50,
    quantity: 0,
    selected: false,
  },
  {
    id: 27,
    name: 'Dung Pie',
    price: 1.50,
    quantity: 0,
    selected: false,
  },
  {
    id: 28,
    name: 'Candy',
    price: 1.50,
    quantity: 0,
    selected: false,
  },

];
let shoppingCart = [];

// update Shopping Cart
const updateCart = (name, price) => {
  let found = false;
  cartBtnContainer.style.display = 'flex';
  shoppingCart.forEach(item => {
    if (item.name === name) {
      item.quantity++;
      found = true;
      let listItem = document.getElementById(`cart-item-${item.id}`);
      listItem.innerHTML = `${name} (${item.quantity}) : $${price * item.quantity}`;
    }
  });

  // Add new item to the cart if it wasn't found
  if (!found) {
    let product = products.find(p => p.name === name);
    if (product) {
      product.quantity = 1;
      shoppingCart.push(product);
      cartList.innerHTML += `
        <li id='cart-item-${product.id}' class="cart-item">${name} (${product.quantity}) : $${price}</li>
      `;
    }
  }
  // update subtotal/taxes/total
  let subtotalCalc = shoppingCart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  let totalCalc = (subtotalCalc * 1.13).toFixed(2);
  let taxesCalc = (subtotalCalc * 0.13).toFixed(2);
  subtotal.textContent = `Subtotal : ${subtotalCalc}`;
  total.textContent = `Total : ${totalCalc}`;
  taxes.textContent = `Taxes : ${taxesCalc}`;
};


//checkout logic 
let currentInput = [];
let storedInputs = [];
const sumOfInputs = (arr) => arr.reduce((acc, curr) => acc + curr, 0).toFixed(2);


//numpad buttons
numberBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    let num = parseFloat(btn.textContent);
    currentInput.push(num);
    registerInput.textContent = parseFloat(currentInput.join(''));
    console.log(currentInput);
    console.log(typeof num);
    console.log(num);
  });
});

addBtn.addEventListener('click', () => {
  let num = parseFloat(registerInput.textContent);
  clearInput();
  storedInputs.push(num);
  console.log(currentInput);
  console.log(storedInputs);
  sumOfInputs(storedInputs);
  registerOutput.textContent = sumOfInputs(storedInputs);
  console.log(sumOfInputs(storedInputs));
})



decimalBtn.addEventListener('click', () => {
  if (!currentInput.includes('.')) {
    currentInput.push('.');
    registerInput.textContent = currentInput.join('')
  }
})

//item buttons
itemBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    let product = products.find(p => p.name === btn.textContent);
    if (product) {
      updateCart(product.name, product.price);
    }
  })
});

//might regret this change so go back!!!!!!!!!!!!!!
//arrow buttons
let counts = 0;
arrowUp.addEventListener('click', () => {
  counts--;
  if (counts < 0) {
    counts = shoppingCart.length - 1;
  }
  const highlight = (el) => {
    let listItem = document.getElementById(`cart-item-${el.id}`);
    if (el.selected === true) {
      listItem.style.background = 'yellow';
    } else if (el.selected === false) {
      listItem.style.background = 'none';
    }
  }
  for (let j = 0; j < shoppingCart.length; j++) {
    shoppingCart[j].selected = false;
    highlight(shoppingCart[j])
  }
  shoppingCart[counts].selected = true;
  highlight(shoppingCart[counts]);
});

arrowDown.addEventListener('click', () => {
  counts++;
  if (counts > shoppingCart.length - 1) {
    counts = 0;
  }
  const highlight = (el) => {
    let listItem = document.getElementById(`cart-item-${el.id}`);
    if (el.selected === true) {
      listItem.style.background = 'yellow';
    } else if (el.selected === false) {
      listItem.style.background = 'none';
    }
  }
  for (let j = 0; j < shoppingCart.length; j++) {
    shoppingCart[j].selected = false;
    highlight(shoppingCart[j])
  }
  shoppingCart[counts].selected = true;
  highlight(shoppingCart[counts]);
});


clearFromCartBtn.addEventListener('click', () => {
  const removeListItem = (el) => {
    let listItem = document.getElementById(`cart-item-${el.id}`);
    if (el.selected === true) {
      shoppingCart.splice(shoppingCart.indexOf(el), 1);
      listItem.remove();
    }

    //update totals logic (needs to be refactored so that remove can be used inside updateCart function)
    let subtotalCalc = shoppingCart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    let totalCalc = (subtotalCalc * 1.13).toFixed(2);
    let taxesCalc = (subtotalCalc * 0.13).toFixed(2);
    subtotal.textContent = `Subtotal : ${subtotalCalc}`;
    total.textContent = `Total : ${totalCalc}`;
    taxes.textContent = `Taxes : ${taxesCalc}`;
  }
  removeListItem(shoppingCart[counts]);
  if (shoppingCart.length === 0) {
    cartBtnContainer.style.display = 'none';
  }
  console.log(shoppingCart);
})

removeFromCartBtn.addEventListener('click', () => {
  clearCart();
});

clearBtn.addEventListener('click', () => {
  clearInput();
  storedInputs = [];
  registerOutput.textContent = '';
})


const clearInput = () => {
  currentInput = [];
  registerInput.textContent = '';
}

const clearCart = () => {
  shoppingCart = [];
  cartList.innerHTML = '';
  console.log(shoppingCart);
  cartBtnContainer.style.display = 'none';
  subtotal.textContent = 'Subtotal : $0.00';
  total.textContent = 'Total : $0.00';
  taxes.textContent = 'Taxes : $0.00';
}





checkoutBtn.addEventListener('click', () => {
  totalAmount = parseFloat(total.textContent.replace(regex, ''));
  cashReceived = parseFloat(sumOfInputs(storedInputs));
  changeDue = parseFloat((cashReceived - totalAmount).toFixed(2));
  if (totalInDrawer < changeDue) {
    createPromptMenu('INSUFFICIENT_FUNDS', true);
    changeDue = 0;
    cashReceived = 0;
    return;
  } else if (totalAmount === 0) {
    createPromptMenu('NO_ITEMS_IN_CART', true);
    cashReceived = 0;
    return;
  };
  clearInput();
  storedInputs = [];

  registerOutput.textContent = '';
  if (cashReceived > totalAmount) {
    createPromptMenu('purchase complete!')
    isDrawerOpen = true;
    changeBtn2.textContent = changeDue;
  } else if (cashReceived === totalAmount) {
    createPromptMenu('No change due - customer paid with exact cash')
    return;
  } else {
    createPromptMenu('Customer does not have enough money to purchase the item', true);
    return console.log('cannot checkout');
  }
  addCashReceived(cid, cashReceived);
  //totalInDrawer = cashReceived + totalInDrawer;
  createDrawerMenu();
});




//prompt functions
const createPromptMenu = (str, alertStr) => {
  if (!alertStr) {
    promptMenu.style.display = 'block';
    promptMenu.innerHTML = `<h1>${str}</h1>`;
    setTimeout(() => {
      promptMenu.style.display = 'none';
      promptMenu.innerHTML = ``;
      console.log('timeoutended')
    }, 700);
  } else {
    promptMenu.style.display = 'block';
    promptMenu.innerHTML = `<h1>${str}</h1`;
    closeDrawerBtn.style.display = 'block';
  }

}

//render drawer menu
const createDrawerMenu = () => {
  drawerMenu.innerHTML = '';
  closeDrawerBtn.style.display = 'block';
  removeBtn.style.display = 'block';
  removeBtn.textContent = 'change';
  drawerMenu.innerHTML += `
    <h2>Status: Drawer Open</h2>
    <h2>Total In Drawer: $${totalInDrawer}</h2>
    <h2 style="color: lightcoral;">Change Due: $${changeDue}</h2>
    `;
  for (let i = 0; i < cid.length; i++) {
    let type = cid[i].type;
    let amount = cid[i].change;
    drawerMenu.innerHTML += `
   <h3 class='change-in-drawer'>${type} : ${amount}</h3>
    `;
    console.log(type, amount);

    if (isDrawerOpen) {
      drawerMenu.style.display = 'block';
    }


  }
}



//dispense change btn

document.addEventListener('click', function(event) {
  if (event.target && event.target.id === 'remove-change-btn') {
    removeBtn.style.display = 'none';
    closeDrawerBtn.style.display = 'none';
    drawerMenu.style.display = 'none';
    subtractChangeDue(cid, changeDue);
    clearCart();
  };
});

document.addEventListener('click', function(event) {
  if (event.target && event.target.id === 'close-drawer-btn') {
    console.log('button clicked')
    removeBtn.style.display = 'none';
    closeDrawerBtn.style.display = 'none';
    promptMenu.style.display = 'none';
    drawerMenu.style.display = 'none';
  };
});


document.addEventListener('click', function(event) {
  if (event.target && event.target.id === 'change-btn') {
    isDrawerOpen = true;
    createDrawerMenu();
    removeBtn.style.display = 'none';
  };
});

/* 
thinking about selection logic 

arrowButtons should return isSelected when clicked if there items in the cart. 


have a selector array that pops and pushs selected items to new array. the selected item is always the first element in an array IF using the down array

reverse that if using the up array.


shuffle array would look like this

emptyArray = [];


items are selected 

filledArray = [1,2,3,4,5]; <---shopping cart

first duplicate shoppingCart array 

sortingArray = [1,2,3,4,5]; <--- selection array

this happens when arrowDown is clicked 
for (let i = 0, i < shoppingCart.length, i++) {
sortingArray.push(shoppingCart[i]);
}
sortingArray.push(sortingArray[0]).shift(sortingArray[0]);
sortingArray[0].selected = true;
const highlight = (name) => {
 let listItem = document.getElementById(`cart-item-${name.id}`);
 listItem.style.backgroundColor = 'yellow';
}










*/


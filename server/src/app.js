const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let cafes = {
  americano: { stock: 10, price: 850 },
  capuchino: { stock: 8, price: 950 },
  latte: { stock: 10, price: 1150 },
  mocachino: { stock: 15, price: 1300 },
};

let coins = {
  500: 20,
  100: 30,
  50: 50,
  25: 25,
};

let bills = 0;

app.get('/cafes', (req, res) => {
  res.json(cafes);
});

app.post('/purchase', (req, res) => {
  const { type, quantity } = req.body;
  if (cafes[type] && cafes[type].stock >= quantity) {
    const totalPrice = cafes[type].price * quantity;
    res.json({ success: true, totalPrice });
    cafes[type].stock -= quantity;
  } else {
    res.json({ success: false, message: 'Error: Insufficient stock.' });
  }
});

app.post('/insert-money', (req, res) => {
  const { coinsInserted, billsInserted } = req.body;
  updateCoins(coinsInserted);
  updateBills(billsInserted);
  res.json({ success: true });
});

app.post('/confirm-purchase', (req, res) => {
  const { totalPrice } = req.body;
  const change = calculateChange(totalPrice);
  if (change) {
    res.json({ success: true, change });
  } else {
    res.json({ success: false, message: 'Error: Insufficient change.' });
  }
});

function updateCoins(coinsInserted) {
  coinsInserted.forEach((coin) => {
    coins[coin]++;
  });
}

function updateBills(billsInserted) {
  bills += billsInserted;
}

function calculateChange(totalPrice) {
  let remainingChange = totalPrice;
  const change = {};

  [500, 100, 50, 25].forEach((coin) => {
    const count = Math.floor(remainingChange / coin);
    if (coins[coin] >= count) {
      change[coin] = count;
      remainingChange -= count * coin;
      coins[coin] -= count;
    }
  });

  if (remainingChange === 0) {
    return change;
  } else {
    return null;
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


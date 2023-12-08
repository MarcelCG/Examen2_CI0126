const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let cafes = [
  { type: 'americano', stock: 10, price: 850 },
  { type: 'capuchino', stock: 8, price: 950 },
  { type: 'latte', stock: 10, price: 1150 },
  { type: 'mocachino', stock: 15, price: 1300 },
];

let coins = {
  500: 20,
  100: 30,
  50: 50,
  25: 25,
};

let bills = 0;

app.get('/cafes', (req, res) => {
  const cafeData = cafes.reduce((acc, cafe) => {
    acc[cafe.type] = { stock: cafe.stock, price: cafe.price };
    return acc;
  }, {});
  res.json(cafeData);
});

app.post('/purchase', (req, res) => {
  const { type, quantity } = req.body;
  const cafeIndex = cafes.findIndex(cafe => cafe.type === type);

  if (cafeIndex !== -1 && cafes[cafeIndex].stock >= quantity) {
    const totalPrice = cafes[cafeIndex].price * quantity;
    res.json({ success: true, totalPrice });
    cafes[cafeIndex].stock -= quantity;
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

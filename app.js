import express from 'express';

const products = {
  id: 1,
  name: "MacBook Air",
  category: "Laptops",
  description: "Apple Laptop"
}

const app = express();

app.get('/products', (req, res) => {
  res.json(products);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

export default app;

import express from 'express';

const products = [
  {
    id: "1",
    name: "MacBook Air",
    category: "Laptops",
    description: "Apple Laptop",
    price: 1000
  },
  {
    id: "2",
    name: "iPhone 16 pro",
    category: "Phone",
    description: "Apple Phone",
    price: 1500
  }
]

const app = express();

app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  const getProduct = req.params.id;
  const findProduct = products.find(product => product.id === getProduct);
  if (findProduct) {
    res.json(findProduct);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

export default app;

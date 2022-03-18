const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 8080

const productsRouter = require("./routes/productos");

app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/static", express.static(path.join(__dirname, 'public')))
app.use(morgan('tiny'));


app.use((req, res, next) => {
  console.log("logging...")
  next()
})

app.use('/api/productos', productsRouter)

// Start server
app.listen(
    PORT, 
    () => { console.log('listening on port 8080'); }
);
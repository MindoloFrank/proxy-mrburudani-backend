const express = require("express");
const app = express();
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

app.use(express.urlencoded({
  extended: true
}));

app.use(cors());
app.use(express.json())
const PORT = 4900;

let target = 'http://82.112.240.121:4000'
// target = 'http://localhost:4000'
// Middleware for download audio requests
app.use('/audsvr', createProxyMiddleware({
  target , // Target for the first app
  changeOrigin: true,
  pathRewrite: {
      '^/audsvr': '', // Remove the /api/backend-social-poster prefix
  },    
}));


app.get('/',(req,res)=>{
res.send('Proxy Middleware Server is online!').end()
})


app.listen(PORT, () => {
 console.log(`Listening on port ${PORT}`);
});

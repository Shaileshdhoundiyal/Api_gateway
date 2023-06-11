const express = require('express');
const {rateLimit} = require('express-rate-limit')
const { createProxyMiddleware } = require('http-proxy-middleware');
const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');
const {ValidateUserMiddleware} = require('./middlewares')
const {error_resonse} = require('./utils')

const app = express();

const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 15 minutes
	max: 15, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.json());


var restream = function(proxyReq, req, res, options) {
    if (req.body) {
        let bodyData = JSON.stringify(req.body);
        // incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
        proxyReq.setHeader('Content-Type','application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        // stream the content
        proxyReq.write(bodyData);
    }
}
async function checkLogin(req,res,next){
    if(req.url == '/api/v1/flight/' && req.method == 'POST'){
        await ValidateUserMiddleware.validateUserLogin(req,res,next);
    }
    next();   
}
 async function checkAdmin(req,res,next){
    if(req.url == '/api/v1/flight/' && req.method == 'POST'){
        await ValidateUserMiddleware.validateIsAdminOrCompany(req,res,next);
    }
    
    next();
}
app.use('/flightsService',[checkLogin,checkAdmin],createProxyMiddleware({
    target : ServerConfig.FLIGHT_SERVICE,
    changeOrigin: true, 
    onProxyReq: restream
}))



app.use('/bookingService',createProxyMiddleware({
    target : ServerConfig.BOOKING_SERVICE,
    changeOrigin : true,
}))

// app.use('/notification',createProxyMiddleware)({
//     target : ServerConfig.Notification
// })

app.use('/api',apiRoutes);
app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});

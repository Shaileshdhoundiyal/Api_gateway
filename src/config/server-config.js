const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    SET_ROUNDS : process.env.SET_ROUNDS,
    JWT_PRIVATE_KEY : process.env.JWT_PRIVATE_KEY,
    JWT_EXPIRY : process.env.JWT_EXPIRY,
    FLIGHT_SERVICE : process.env.FLIGHT_SERVICE,
    BOOKING_SERVICE : process.env.BOOKING_SERVICE

}
require('dotenv').config();

module.exports = {
    API_PORT: process.env.API_PORT || 3000,
    SOCET_PORT: process.env.SOCET_PORT || 3001,
    UI_PORT: process.env.UI_PORT || 8080,
};

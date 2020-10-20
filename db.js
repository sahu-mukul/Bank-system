const Pool = require("pg").Pool;

const pool = new Pool({
    user:"postgres",
    password:"mukul12",
    host:"localhost",
    port:5432,
    database:"hobby-dev"

});

module.exports = pool
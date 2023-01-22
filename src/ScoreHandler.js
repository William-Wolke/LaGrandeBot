const axios = require("axios")
const paths = require('./data/paths.json');
require('dotenv').config();

const addMoney = async (user, amount) => {
    try {
        let formData = new URLSearchParams();

        formData.append("name", user);
        formData.append("amount", amount);

        let result = await axios.post((new URL(paths.addMoneyLink, process.env.db_url).href), formData)
        
        console.log(result.data.message);
        return true;
        
    } catch {
        console.log(result.data.message);
        return false;
    }
}

const subtractMoney = async (user, amount) => {
    try {
        let formData = new URLSearchParams();

        formData.append("name", user);
        formData.append("amount", amount);

        let result = await axios.post((new URL(paths.subtractMoneyLink, process.env.db_url).href), formData)
        
        console.log(result.data.message);
        return true;
        
    } catch {
        console.log(result.data.message);
        return false;
    }
}

const foodTransaction = async (user, amount) => {
    try {
        let formData = new URLSearchParams();

        formData.append("name", user);
        formData.append("amount", amount);

        let result = await axios.post(new URL(paths.foodTransactionLink, process.env.db_url).href , formData);
        console.log(result.data);
        return true;
    }
    catch (e) {
        console.log(e.message);
        return false;
    }
}

module.exports = { addMoney, subtractMoney, foodTransaction };

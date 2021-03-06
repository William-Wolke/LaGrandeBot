import axios from "axios"
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const config = require('./data/config.json');
require('dotenv').config();

export const AddMoney = async (user, amount) => {
    try {
        let formData = new URLSearchParams();

        formData.append("name", user);
        formData.append("amount", amount);

        let result = await axios.post((new URL(config.addMoneyLink, process.env.db_url).href), formData)
        
        console.log(result.data.message);
        return true;
        
    } catch {
        console.log(result.data.message);
        return false;
    }
}

export const SubtractMoney = async (user, amount) => {
    try {
        let formData = new URLSearchParams();

        formData.append("name", user);
        formData.append("amount", amount);

        let result = await axios.post((new URL(config.subtractMoneyLink, process.env.db_url).href), formData)
        
        console.log(result.data.message);
        return true;
        
    } catch {
        console.log(result.data.message);
        return false;
    }
}

export const FoodTransaction = async (user, amount) => {
    try {
        let formData = new URLSearchParams();

        formData.append("name", user);
        formData.append("amount", amount);

        let result = await axios.post(new URL(config.foodTransactionLink, process.env.db_url).href , formData);
        console.log(result.data);
        return true;
    }
    catch (e) {
        console.log(e.message);
        return false;
    }
}
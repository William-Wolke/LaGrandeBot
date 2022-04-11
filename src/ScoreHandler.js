import axios from "axios"
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const config = require('./data/config.json');
require('dotenv').config();

export const UpdateMoney = async (user, money) => {
    let success = false;
    let formData = new URLSearchParams();

    formData.append("name", user);
    formData.append("money", money);

    await axios.post((config.updateMoneyLink), formData)
    .then((result) => {
        console.log(result.data.message);
        success = true;
    })
    .catch((error) => {
        console.log(result.data.message);
        success = false;
    });

    return success
}

export const FoodTransaction = async (user, money) => {
    let success = false;
    let formData = new URLSearchParams();

    formData.append("name", user);
    formData.append("money", money);

    await axios.post(process.env.db_url + config.foodTransactionLink, formData)
    .then((result) => {
        console.log(result.data);
        success = true;
    })
    .catch((error) => {
        console.error(error);
        success = false;
    });

    return success;
}
import axios from "axios"
const require = createRequire(import.meta.url);

const config = require('./data/config.json');

export const AddMoney = (user, value) => {
    let formData = new URLSearchParams();

    formData.append('user', user);
    formData.append('value', value);
    
    axios.post(config.addMoneyLink);
}

export const AddMeal = (user, value) => {
    let formData = new URLSearchParams();

    formData.append('user', user);
    formData.append('value', value);

    axios.post(config.foodTransaktion, formData)
    .then((response) => {

    })
    .catch((error) => {
        msg
    });
    
}
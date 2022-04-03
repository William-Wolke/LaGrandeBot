import axios from "axios"

export const AddMoney = (user, value) => {
    let formData = new URLSearchParams();

    formData.append('user', user);
    formData.append('value', value);
    
    axios.post();
}

export const AddMeal = (user, attribute, value) => {
    let formData = new URLSearchParams();

    formData.append('user', user);
    formData.append('value', value);

    if (attribute === "money") {
        
    }
    else if(attribute === "amountBought") {

    }
    else if(attribute === "priceBought") {

    }
    
}
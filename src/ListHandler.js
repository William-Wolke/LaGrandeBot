export const CreateCommandList = (prefix, values) => {
    let list = '';
    values.map((item) => {
        list += prefix + item + '\n';
    })
    return list;
}

export const CreateMenuList = (values) => {
    let list = '';
    values.map((item) => {
        list += `${item.name}: ${item.price}${item.currency}${item.emoji}\n`;
    })
    return list;
}

export const CreateLeaderBoard = (values) => {
    let list = '';
    values.map((item, index) => {
        list += `#${index+1} ${item.name}. Pengar: ${item.money} Saker köpta: ${item.bought} Spenderade pengar: ${item.priceBought}\n`;
    })
    return list;
}

export const SimpleList = (values, attribute) => {
    let list = '';
    values.map((item) => {
        list += `${item[attribute]}\n`;
    })
    return list;
}

export const GetRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}
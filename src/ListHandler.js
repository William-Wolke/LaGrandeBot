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

export const GetRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}
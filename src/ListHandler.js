const CreateCommandList = (prefix, values) => {
    let list = '';
    values.map((item) => {
        list += prefix + item + '\n';
    })
    return list;
}

const CreateMenuList = (values) => {
    let list = '';
    values.map((item) => {
        list += `${item.name}: ${item.price}${item.currency}${item.emoji}\n`;
    })
    return list;
}

const CreateLeaderBoard = (values) => {
    let list = '';
    values.map((item, index) => {
        list += `#${index+1} ${item.name}. Pengar: ${item.money} Saker köpta: ${item.bought} Spenderade pengar: ${item.spent} NFTs ägda: ${item.ownedNFT.length}\n`;
    })
    return list;
}

const SimpleList = (values, attribute) => {
    let list = '';
    values.map((item) => {
        list += `${item[attribute]}\n`;
    })
    return list;
}

const GetRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}

module.exports = { CreateCommandList, CreateMenuList, CreateLeaderBoard, SimpleList, GetRandomInt }
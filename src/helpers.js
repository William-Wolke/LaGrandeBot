const axios =require("axios");

const GetCitations = async (array) => {
    let information = {
        beginingIndex: 0,
        endingIndex: 0
    };

    let name = "";

    await array.map((item, index) => {
        if (item.startsWith('"') && item.endsWith('"')) {
            name = item.replaceAll('"', '');
            information.endingIndex = index;
        }
        else if (item.startsWith('"')) {
            information.beginingIndex = index;
        }
        else if (item.endsWith('"')) {
            information.endingIndex = index;
        }
    });

    if (name) {
        return { name: name, ending: information.endingIndex };
    }
    else {
        let newArray = array.filter((item, index) => index >= information.beginingIndex && index <= information.endingIndex)
        name = newArray.join(" ");
        name = name.replaceAll('"', '');
        return { name: name, ending: information.endingIndex };
    }
}

const AxiosGet = async (url, endpoint) => {
    try {
        let response = await axios.get(new URL(endpoint, url).href);
        if (response.statusText === 'OK') return response.data;
    } catch (e) {
        console.log(e.message);
        return;
    }
    
}

const AxiosPost = async (url, endpoint, x) => {
    try {
        let response = await axios.post(new URL(endpoint, url).href);
        if (response.statusText === 'OK') return response.data;
    } catch (e) {
        console.log(e.message)
        return;
    }
}

module.exports = {
    GetCitations,
    AxiosGet
}

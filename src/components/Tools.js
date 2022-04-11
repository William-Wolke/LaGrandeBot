export const GetCitations = async (array) => {
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

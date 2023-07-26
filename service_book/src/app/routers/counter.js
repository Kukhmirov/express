const incrPost = idBook => {
    fetch(`http://counter:4000/counter/${idBook}/incr`, {method: 'post'});
};

const incrGet = idBook => {
    const url = `http://counter:4000/counter/${idBook}`;

    return fetch(url, {method: 'get'})
        .then(response => response.json())
        .then(response => {
            return response.cnt;
        })
        .catch(reject => {
            console.error("Ошибка " + reject);
        })
};

module.exports = {
    incrPost,
    incrGet
};
require('dotenv').config();
const counterUrl = process.env.MICROSERVICE_COUNTER_URL;

const incrPost = idBook => {
    fetch(`${counterUrl}/counter/${idBook}/incr`, {method: 'post'});
    
};

const incrGet = idBook => {
    const url = `${counterUrl}/counter/${idBook}`;

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
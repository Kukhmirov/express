const request = require('request');

const incrPost = async(idBook) => {
    const options = {
        url: `http://localhost:4000/counter/:${idBook}/incr`,
        method: 'POST',
    };
    
    await request(options, (error, response, body) => {
        if (error) console.error(error);
    });
};

// const incrPost = idBook => {
//     fetch(`http://localhost:4000/counter/${idBook}/incr`, {method: 'post'});
// };

const incrGet = idBook => {
    const url = `http://counter:4000/counter/${idBook}`;

    // fetch(url, {method: 'get'});
    // try {
    //     const response = await axios.get(url);
    //     const data = response.data;
    //     console.log(data);
    //     return data;
    // } catch (error) {
    //     console.log(error);
    // }
};

module.exports = {
    incrPost,
    incrGet
};
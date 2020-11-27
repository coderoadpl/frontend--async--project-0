const fetchData = (url, options = {}) => {
    const {
        startCallback = () => console.log(`[${url}] Start fetching`),
        catchCallback = (error) => console.error('Failed to fetch data', error),
        endCallback = () => console.log(`[${url}] Stop fetching`)
    } = options

    startCallback()
    return fetch(url)
        .then((response) => response.json())
        .catch(catchCallback)
        .finally(endCallback)
}

fetchData('/data.json')
    .then((data) => console.log(data))

fetchData('/data2.json', { startCallback: () => console.log('Start fetching data2.json') })
    .then((data) => console.log(data))
const fetchData = (url) => {
    console.log('Start fetching')
    return fetch(url)
        .then((response) => response.json())
        .catch(() => console.error('Failed to fetch data'))
        .finally(() => console.log('Stop fetching'))
}

fetchData('/data.json')
    .then((data) => console.log(data))

fetchData('/data2.json')
    .then((data) => console.log(data))
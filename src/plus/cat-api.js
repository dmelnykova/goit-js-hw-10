const BASE_URL = "https://api.thecatapi.com/v1";
const ENDPOINT = "images/search";
const SEARCH_ENDPOINT = "breeds";
const options = {
    headers: {
        "x-api-key": "live_y0sjEivX9lvVsTk8uxTvxy1iwibarhoa6K8Sx0Tz6RhCbASFpkx7NhXvzohTjekB"
    }
}

export function fetchBreeds(){
return fetch(`${BASE_URL}/${SEARCH_ENDPOINT}`)
.then(response => {
    if(!response.ok){
        throw new Error (response.statusText)
    }
    return response.json()
})
}


export function fetchCatByBreed(breedId){
return fetch(`${BASE_URL}/${ENDPOINT}?breed_ids=${breedId}`, options)
.then(response => {
    if(!response.ok){
        throw new Error (response.statusText)
    }
    return response.json()
})
}
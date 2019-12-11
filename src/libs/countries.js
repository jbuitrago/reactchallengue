
/*
function fetchCountries() {
    return dispatch => {
        //dispatch(fetchCountriesPending());
        fetch('https://restcountries.eu/rest/v2/all')
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(fetchCountriesSuccess(res));
            return res;
        })
        .catch(error => {
           // dispatch(fetchCountriesError(error));
        })
    }
}

export default fetchCountries;*/

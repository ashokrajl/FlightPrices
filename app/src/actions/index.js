export const getAPIKey = () => ({
    type: 'GET_KEY',
});

export const changeRoute = (route) => ({
    type: 'CHANGE_ROUTE',
    payload: route
})
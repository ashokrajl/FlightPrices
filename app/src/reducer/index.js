const reducer = (state = {}, action) => {
    switch (action.type) {
       case 'PRICES_RECEIVED':
            return { ...state, prices: action.data, loading: false }
       case 'KEY_RECIEVE_FAILED':
          console.log('failed',action)
            return {}
       default:
          return state;
     }
  };
  export default reducer;

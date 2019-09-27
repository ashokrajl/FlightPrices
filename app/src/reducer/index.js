const reducer = (state = {}, action) => {
   switch (action.type) {
      case 'PRICES_RECEIVED':
         return { ...state, prices: action.data, loading: false }
      case 'LOAD_AGAIN':
            return { ...state, loading: true, error: false };
      case 'KEY_RECIEVE_FAILED':
         console.log('failed', action)
         return {error: true}
      case 'PRICES_FAILED':
         console.log('failed', action)
         return {error: true}
      default:
         return state;
   }
};
export default reducer;

const initialState = {
    menu: [],
    loading: true,
    error: false,
    items: [],
    totalPrice: null
        
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MENU_LOADED':
            return {
                ...state,
                menu: action.payload,
                loading: false,
                error: false
            };
        case 'MENU_REQUESTED':
            return {
                ...state,
                menu: state.menu,
                loading: true,
                error: false
            };
        case 'MENU_ERROR':
            return {
                ...state,
                menu: state.menu,
                loading: false,
                error: true
            };
        case 'ITEM_ADD_TO_CART':
            const id = action.payload
            const itemInd = state.items.findIndex(item => item.id === id);
            if (itemInd >= 0){
                const itemInState = state.items.find(item => item.id === id);
                const newItem = {
                    ...itemInState,
                    qtty: ++itemInState.qtty
                }
                return {
                    ...state, 
                    items: [
                        ...state.items.slice(0, itemInd),
                        newItem,
                        ...state.items.slice(itemInd + 1)
                    ],
                    totalPrice: state.totalPrice + newItem.price
                }
            }
           
            const item = state.menu.find(item => item.id === id);
            const newItem = {
                title: item.title,
                price: item.price,
                url: item.url,
                id: item.id,
                qtty: 1
            };
            return {
                ...state,
                items: [
                    ...state.items,
                    newItem
                ],
                totalPrice: state.totalPrice + newItem.price
            };
        case 'ITEM_REMOVE_FROM_CART':
            const idx = action.payload;
            const itemIndex = state.items.findIndex(item => item.id === idx)
            const price = state.items[itemIndex]['price'] * state.items[itemIndex]['qtty'];
            return {
                ...state, 
                items: [
                    ...state.items.slice(0, itemIndex),
                    ...state.items.slice(itemIndex + 1)
                ], 
                totalPrice: state.totalPrice - price
            };
        case 'PLUS_IN_CART':
            const ind = action.payload
            const itemInState = state.items.find(item => item.id === ind);
            const newsItems = {
                ...itemInState,
                qtty: ++itemInState.qtty
            }
            return {
                ...state, 
                items: [
                    ...state.items,
                ], 
                totalPrice: state.totalPrice + newsItems.price
            };
        case 'MINUS_IN_CART':
            const indx = action.payload
            const itemInStates = state.items.find(item => item.id === indx);
            if (itemInStates.qtty === 0){
                return state
            } else {
                const newsItemss = {
                    ...itemInStates,
                    qtty: --itemInStates.qtty
                }
                return {
                    ...state, 
                    items: [
                        ...state.items,
                    ], 
                    totalPrice: state.totalPrice - newsItemss.price
                };
            }
                
        default:
            return state;
    }
}
export default reducer;

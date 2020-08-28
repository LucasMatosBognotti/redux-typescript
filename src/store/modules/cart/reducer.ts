import { Reducer } from 'redux';
import { produce } from 'immer';

import { ICartState, ActionTypes } from './types';

/*
  ESTADO ANTERIOR => state
  ESTADO ATUAL => items
  NOVO VALOR => action
*/

const INITIAL_STATE: ICartState = {
  items: [],
  failedStockCheck: []
}

const cart: Reducer<ICartState> = (state = INITIAL_STATE, action) => {

  return produce(state, draft => {
    switch(action.type) {
      case ActionTypes.addProductToCartSuccess: {
        const { product } = action.payload;  
        
        const productInCartIndex = draft.items.findIndex(item => 
          item.product.id === product.id,
        );
        
        if (productInCartIndex >= 0) {
          draft.items[productInCartIndex].quantity++;
        } else {
          draft.items.push({
            product,
            quantity: 1,
          });
        }
        
        break;
      }
      case ActionTypes.addProductToCartFailure: {
        draft.failedStockCheck.push(action.payload.productId);
        
        break;
      }
      default: {
        return draft;
      }
    }
  });
}

export default cart;

/*
  switch(action.type) {
    case 'ADD_PRODUCT_TO_CART': {
      const { product } = action.payload;  
      
      return {
        ...state,
        items: [
          ...state.items, { product, quantity: 1 },
        ]
      };
    }
    default: {
      return state;
    }
  }
*/
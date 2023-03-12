import { createSlice } from '@reduxjs/toolkit'

const initialState ={
    isCartOpen: false,
    cart:[],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      addToCart(state,action) {
        const item = state.cart.find(item => item.id === action.payload.id)

        if(item){
            item.count += action.payload.count
        }else{
            state.cart.push(action.payload)
        }
      },
      decrement(state,action) {
        state.cart = state.cart.map(item =>{
            if(item.id === action.payload.id && item.count > 1){
                item.count --
            }
            return item
        })
      },
      increment(state, action) {
        state.cart = state.cart.map(item =>{
            if(item.id === action.payload.id){
                item.count ++
            }
            return item
        })
      },
      clearCart:(state,action)=>{
        state.cart = []
      },
      setIsCartOpen:(state)=>{
        state.isCartOpen = !state.isCartOpen
      },
      removeFromCart:(state,action)=>{
        state.cart = state.cart.filter(item => item.id !== action.payload.id)
    },
    },
  })

  export const {addToCart, decrement, clearCart, setIsCartOpen,increment,removeFromCart} = cartSlice.actions
  export default cartSlice.reducer
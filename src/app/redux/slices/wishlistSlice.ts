
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '@/app/types/product'

interface WishlistState {
  items: Product[]
}

const initialState: WishlistState = {
  items: [],
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
  const item = action.payload;
  const exists = state.items.find(p => p.id === item.id);
  if (!exists) {
    state.items.push(item); 
  }
},

    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
  },
})

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer
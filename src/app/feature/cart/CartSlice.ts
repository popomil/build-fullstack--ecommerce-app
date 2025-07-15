
import { createStandaloneToast } from "@chakra-ui/react";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../../interfaces";
const {toast} = createStandaloneToast()
interface ICart {
    cartProducts: IProduct[];
    count: number; 
}

const initialState: ICart = {
    cartProducts: [],
    count: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<IProduct>) => {
            const newProduct = action.payload;

            const existingProduct = state.cartProducts.find(
                (productInCart) => productInCart.id === newProduct.id
            );

            if (existingProduct) {
                existingProduct.quantity += 1;
                state.count += 1;
                toast({
                    title:"Added to your Cart",
                    description:"This item already exists,the quantity will be increased",
                    status:"success",
                    isClosable:true
      })
            } else {
                state.cartProducts.push({ ...newProduct, quantity: 1 });
                state.count += 1;
                toast({
                    title:"Added to your Cart.",
                    status:"success",
                    isClosable:true
      })
            }
        },
        decreaseQuantity: (state, action: PayloadAction<number>) => {
            const productIdToDecrease = action.payload;

            const existingProductIndex = state.cartProducts.findIndex(
                (product) => product.id === productIdToDecrease
            );

            if (existingProductIndex !== -1) {
                const existingProduct = state.cartProducts[existingProductIndex];

                if (existingProduct.quantity > 1) {
                    existingProduct.quantity -= 1;
                    state.count -= 1;
                } else {
                    state.cartProducts.splice(existingProductIndex, 1);
                    state.count -= 1;
                }
            }
        },
        increaseQuantity: (state, action: PayloadAction<number>) => { 
            const productIdToIncrease = action.payload;
            const existingProduct = state.cartProducts.find(
                (product) => product.id === productIdToIncrease
            );

            if (existingProduct) {
                existingProduct.quantity += 1;
                state.count += 1; 
            }
        },
         removeFromCart: (state, action: PayloadAction<number>) => { 
            const productIdToRemove = action.payload;
            const productToRemove = state.cartProducts.find(
                (product) => product.id === productIdToRemove
            );

            if (productToRemove) {
                state.count -= productToRemove.quantity;
                state.cartProducts = state.cartProducts.filter(
                    (product) => product.id !== productIdToRemove
                );
            }
        }
    }
});

export const { addToCart, decreaseQuantity, increaseQuantity,removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
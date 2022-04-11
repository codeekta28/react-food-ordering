// This file is created for the purpose of auto suggestion
import React from "react";

const cartContext=React.createContext({
    items:[],
    totalAmount:0,
    addItem:(item)=>{},
    removeItem:(id)=>{},
    resetItem:()=>{},
})

export default cartContext
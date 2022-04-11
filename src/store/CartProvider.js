import React from "react";
import cartContext from "./Cart-Context";
import { useReducer } from "react";
const defaultState = {
  items: [],
  totalAmount: 0,
};
function reducerFn(prevState, action) {
  if (action.type === "ADD") {
    const updatedAmount =
      prevState.totalAmount + action.item.itemPrice * action.item.itemQty;
    // we are checking that in prevstate is there any item whose id is same as current item id if so than it is a duplicate item
    const existingItemIndex = prevState.items.findIndex(
      (item) => item.id === action.item.id
    );

    // we will take the item with the help of index
    const duplicateItem = prevState.items[existingItemIndex];

    // if duplicate items exist we need to increase its qty
    let updatedItems;
    if (duplicateItem) {
      const updateItem = {
        ...duplicateItem,
        itemQty: duplicateItem.itemQty + action.item.itemQty,
      };
      // it contain the list of all non duplicate items
      updatedItems = [...prevState.items];

      // we are updating updatedItems with the new itemQty
      updatedItems[existingItemIndex] = updateItem;
    } else {
      // we are using concat bcoz concat creat new array and not insert in current array to update array in this way our state will remain immutable
      updatedItems = prevState.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalAmount: updatedAmount,
    };

  }
  if(action.type==="REMOVE"){
    // if there is duplicate item then we have to reduce the qty and if there is no duplicate item than we have to remove the item
    const existingIndex=prevState.items.findIndex(item=>item.id===action.id);
    const duplicateItem=prevState.items[existingIndex];
    console.log("duplicateItem",duplicateItem);
    const updatedAmount= prevState.totalAmount-duplicateItem.itemPrice
    let updatedItems
    if(duplicateItem.itemQty>1){
       const updateItem={
         ...duplicateItem,itemQty:duplicateItem.itemQty-1
       }
       updatedItems=[...prevState.items]
       updatedItems[existingIndex]=updateItem
    }else{
      updatedItems=prevState.items.filter(item=>item.id!==action.id)
    }
    return{
      items:updatedItems,
      totalAmount:updatedAmount
    }
  }
  if(action.type==="RESET"){
    return defaultState;
  }

  return defaultState;
}

function CartProvider(props) {
  const [stateSnapshot, dispatchFn] = useReducer(reducerFn, defaultState);
  function addItemToCartHandler(item) {
    dispatchFn({ type: "ADD", item: item });
    // console.log("addItem in cartProvider",item);
  }
  function removeItemFromCartHandler(id) {
    dispatchFn({ type: "REMOVE", id: id });
  }
  function resetItemHandler(){
    dispatchFn({type:"RESET"})
  }
  // console.log("statesnapshot in cartProvider",stateSnapshot);
  const cartContextValue = {
    items: stateSnapshot.items,
    totalAmount: stateSnapshot.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    resetItem:resetItemHandler,
  };
  return (
    // <div>CartProvider</div>
    <cartContext.Provider value={cartContextValue}>
      {props.children}
    </cartContext.Provider>
  );
}

export default CartProvider;

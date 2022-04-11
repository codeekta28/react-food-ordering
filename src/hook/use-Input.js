import { useState } from "react"

function useInput(validate){
    const[inputValue,setInputValue]=useState("");
    const[isTouched,setIsTouched]=useState(false);

    const isInputValid=validate(inputValue);
    const hasError=isTouched && !isInputValid
    function handleChange(e){
        setInputValue(e.target.value);
    }
    function handleBlur(){
        setIsTouched(true)
    }
    function reset(){
        setIsTouched(false);
        setInputValue("")
    }
    const inputClass=hasError?"invalid":"";

    return{
        handleChange,
        handleBlur,
        reset,
        inputValue,
        isInputValid,
        inputClass,
        hasError,
    }

}
export default useInput
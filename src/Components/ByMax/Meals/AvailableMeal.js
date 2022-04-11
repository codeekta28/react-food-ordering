import React, { useCallback, useEffect, useState } from "react";
import MealItem from "./MealItem";
import styles from "./AvailableMeal.module.css";
import { v4 as uuidv4 } from "uuid";
import Card from "../UI/Card/Card";
import axios from "axios";

function AvailableMeal(props) {
  const [mealData, setMealData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const getData = useCallback(async () => {
    console.log("getData");
    setLoading(true);
    setError(null);
    try {
      const url =
        "https://foodordering-e0b71-default-rtdb.firebaseio.com/meals.json";
      const response = await axios.get(url);
      console.log("response", response.data);
      const loadedData = [];
      const finalData = response.data;
      for (const key in finalData) {
        loadedData.push({
          foodName: finalData[key].foodName,
          foodDiscription: finalData[key].foodDiscription,
          foodPrice: finalData[key].foodPrice,
          id: key,
        });
      }
      setMealData(loadedData);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (error) {
      setTimeout(() => {
        setLoading(false);
        setError(error.message);
      }, 2000);
    }
  }, []);

  useEffect(() => {
    console.log("useEffect");
    getData();
  }, [getData]);
  if(loading ){
    return <h1 style={{ textAlign: "center" }}>Loading...</h1>
  }
  if(error){
    return  <h1>{error}</h1>
  }

  // mealItem price name detail
  const mealItem = mealData.map((item) => (
    <MealItem
      name={item.foodName}
      price={item.foodPrice}
      detail={item.foodDiscription}
      key={item.id}
      id={item.id}
    />
  ));
  return (
    <Card className={styles.meals}>
      {/* {loading && !error && <h1 style={{ textAlign: "center" }}>Loading...</h1>} */}
      {!error && !loading && mealData.length > 0 && <ul>{mealItem}</ul>}
      {/* {error && <h1>{error}</h1>} */}
    </Card>
  );
}
// AvailableMeal.defaultProps = {
//   food: [
//     {
//       foodName: "Biryani",
//       foodDiscription: "finest and fresh veggies ",
//       foodPrice: 150,
//       id: uuidv4(),
//     },
//     {
//       foodName: "Aloo Paratha",
//       foodDiscription: "Come with chutney and salad",
//       foodPrice: 50,
//       id: uuidv4(),
//     },
//     {
//       foodName: "Momos(10 piece)",
//       foodDiscription: "Come with Mayo and spicy chutney",
//       foodPrice: 80,
//       id: uuidv4(),
//     },
//     {
//       foodName: "burger",
//       foodDiscription: "Come With lettuce,alootikki,pickle",
//       foodPrice: 150,
//       id: uuidv4(),
//     },
//   ],
// };

export default AvailableMeal;

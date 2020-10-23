import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Button, StyleSheet, View, FlatList } from "react-native";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setisAddMode] = useState(false);

  console.log('Re_Rendering Component');
  console.log(courseGoals);

  const addGoalHandler = (goalTitle) => {
    // console.log(enteredGoal);
    if(goalTitle.length ===0){
      return;
    }
    setCourseGoals((currentGoal) => [
      ...currentGoal,
      { id: Math.random().toString(), value: goalTitle },
    ]);
    setisAddMode(false);
  };

  const removeGoalHandler = (goalId) => {
    console.log('TO BE DELETED '+goalId);
    console.log(courseGoals);
    setCourseGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.id != goalId);
    });
  };

  const addModeHandler = () => {
    setisAddMode(true);
  };

  const cancelGoalAdditionHandller = () => {
    setisAddMode(false);
  };

  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={addModeHandler} />
      <GoalInput
        visible={isAddMode}
        onAddGoal={addGoalHandler}
        onCancel={cancelGoalAdditionHandller}
      />
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={courseGoals}
        renderItem={(itemData) => (
          <GoalItem
            id={itemData.item.id}
            onDelete={removeGoalHandler}
            title={itemData.item.value}
          />
        )}
      />
      {/*FlatList:- Best for  rendering elements in the list 
      KeyExtractor: used to identify the  element uniquely
      data: is an array
      renderitem: used to render the element data to the view*/}
      {/* <ScrollView >  // Scrollview loads all the elements in the list even if its not visible to the screen, hence leads to performance degradation
        {courseGoals.map((goal) => (
          <View key={goal} style={styles.listitem}>
          <Text>{goal}</Text>
        </View>
        ))}
      </FlatList>
    </ScrollView>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
});

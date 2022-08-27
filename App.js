import { Button, FlatList, StyleSheet, View } from "react-native";
import { useState } from "react";
import GoalInput from "./components/GoalInput";
import GoalItem from "./components/GoalItem";
import { StatusBar } from "react-native";

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [goalArray, setGoalArray] = useState([]);

  function addGoalHandler(enteredGoalText) {
    setGoalArray((prevArray) => [
      ...prevArray,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    endAddGoalHandler();
  }

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  const itemDeleteHandler = (id) => {
    setGoalArray((prevState) => {
      return prevState.filter((item) => item.id !== id);
    });
  };
  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.appContainer}>
        <Button
          title="Add New Goal"
          color="#5e0acc"
          onPress={startAddGoalHandler}
        />
        <GoalInput
          onAddGoal={addGoalHandler}
          visible={modalIsVisible}
          onEndGoal={endAddGoalHandler}
        />
        <View style={styles.goalContainer}>
          <FlatList
            data={goalArray}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  onItemDelete={itemDeleteHandler}
                  id={itemData.item.id}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 50,
    paddingHorizontal: 16,
    flex: 1,
  },
  goalContainer: {
    flex: 5,
  },
});

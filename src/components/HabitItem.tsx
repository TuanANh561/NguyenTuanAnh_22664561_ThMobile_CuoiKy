import { View, Text } from "react-native";
import React from "react";
import { Habit } from "@/types/habit";
import { Button, Card } from "react-native-paper";
import { useRouter } from "expo-router";

type Props = {
  item: Habit;
};

const HabitItem = ({ item }: Props) => {
  const router = useRouter();
  return (
    <View className="my-2 mx-2">
      <Card className="bg-white">
        <Card.Title title={item.title} titleStyle={{ fontWeight: "bold" }} />
        <Card.Content>
          <Text className="text-gray-600">Description: {item.description}</Text>
          <Text className={item.done_today ? "text-green-600" : "text-gray-500"}>
            Done today: {item.done_today ? "Yes" : "No"}
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button
            mode="contained"
            onPress={() => router.push({ pathname: "/form", params: { id: item.id } })}
            className="bg-blue-600"
          >
            Edit
          </Button>
          <Button mode="contained" className="bg-red-600">
            Delete
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default HabitItem;
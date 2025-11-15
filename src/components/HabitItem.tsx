import { View, Text } from "react-native";
import React from "react";
import { Habit } from "@/types/habit";
import { Alert } from "react-native";
import { Button, Card, IconButton } from "react-native-paper";
import { useRouter } from "expo-router";

type Props = {
  item: Habit;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

const HabitItem = ({ item, onToggle, onDelete }: Props) => {
  const router = useRouter();

  const handleDelete = () => {
    Alert.alert(
      "Xác nhận xóa",
      `Bạn có chắc muốn xóa thói quen "${item.title}"?`,
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: () => onDelete(item.id),
        },
      ]
    );
  };

  return (
    <View className="my-2 mx-2">
      <Card
        className={`bg-white ${item.done_today ? "bg-green-50 border border-green-300" : ""}`}
      >
        <Card.Title title={item.title} titleStyle={{ fontWeight: "bold" }} />

        <Card.Content>
          <Text className="text-gray-600">
            Description: {item.description || "Không có"}
          </Text>
          <Text
            className={item.done_today ? "text-green-600" : "text-gray-500"}
          >
            Done today: {item.done_today ? "Yes" : "No"}
          </Text>
        </Card.Content>

        <Card.Actions className="flex-row justify-between items-center">
          <IconButton
            icon={item.done_today ? "check-circle" : "circle-outline"}
            size={28}
            iconColor={item.done_today ? "#10b981" : "#6b7280"}
            onPress={() => onToggle(item.id)}
            className="m-0"
          />

          <Button
            mode="contained"
            onPress={() =>
              router.push({ pathname: "/form", params: { id: item.id } })
            }
            className="bg-blue-600"
          >
            Edit
          </Button>

          <Button mode="contained" onPress={handleDelete} className="bg-red-600">
            Delete
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default HabitItem;
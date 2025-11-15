import { View, Text, FlatList } from "react-native";
import React, { useCallback, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { Habit } from "@/types/habit";
import { getAll } from "@/db";
import { useFocusEffect } from "expo-router";
import HabitItem from "@/components/HabitItem";

const HomeScreen = () => {
  const db = useSQLiteContext();
  const [habits, setHabits] = useState<Habit[]>([]);

  const loadHabits = async () => {
    const data = await getAll(db, 1);
    setHabits(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadHabits();
    }, [])
  );

  return (
    <View className="flex-1 bg-gray-50">
      <FlatList
        data={habits}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <HabitItem item={item} />}
        ListEmptyComponent={
          <View className="p-6 items-center">
            <Text className="text-lg text-gray-500 text-center">
              Chưa có thói quen nào, hãy thêm một thói quen mới!
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default HomeScreen;
import { View, Text, FlatList } from "react-native";
import React, { useCallback, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { Habit } from "@/types/habit";
import { getAll } from "@/db";
import { useFocusEffect, useRouter } from "expo-router";
import { Button } from "react-native-paper";
import HabitItem from "@/components/HabitItem";

const HomeScreen = () => {
  const db = useSQLiteContext();
  const router = useRouter();
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
      <View className="p-4 bg-white border-b border-gray-200">
        <Button
          mode="contained"
          icon="plus"
          onPress={() => router.push("/form")}
          className="bg-blue-600"
          contentStyle={{ height: 56 }}
          labelStyle={{ fontSize: 16, fontWeight: "bold" }}
        >
          Thêm thói quen mới
        </Button>
      </View>

      <FlatList
        data={habits}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <HabitItem item={item} />}
        ListEmptyComponent={
          <View className="p-6 items-center mt-8">
            <Text className="text-lg text-gray-500 text-center">
              Chưa có thói quen nào, hãy thêm một thói quen mới!
            </Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default HomeScreen;
import { View, Text, FlatList, TextInput } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { Habit } from "@/types/habit";
import { getAll, toggleDone, deleteHabit } from "@/db";
import { useFocusEffect, useRouter } from "expo-router";
import { Button } from "react-native-paper";
import HabitItem from "@/components/HabitItem";

const HomeScreen = () => {
  const db = useSQLiteContext();
  const router = useRouter();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const loadHabits = async () => {
    const data = await getAll(db, 1);
    setHabits(data);
  };

  const handleToggle = async (id: number) => {
    await toggleDone(db, id);
    loadHabits();
  };

  const handleDelete = async (id: number) => {
    await deleteHabit(db, id);
    loadHabits();
  };

  useFocusEffect(
    useCallback(() => {
      loadHabits();
    }, [])
  );

  const filteredHabits = useMemo(() => {
    if (!searchQuery.trim()) return habits;
    const query = searchQuery.toLowerCase();
    return habits.filter((habit) =>
      habit.title.toLowerCase().includes(query)
    );
  }, [habits, searchQuery]);

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

        <TextInput
          placeholder="Tìm kiếm theo tiêu đề..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          className="mt-3 bg-gray-100 rounded-md px-3 py-2 text-base"
          clearButtonMode="while-editing"
        />
      </View>

      <FlatList
        data={filteredHabits}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <HabitItem
            item={item}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        )}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center p-6 mt-10">
            <Text className="text-lg text-gray-500 text-center">
              {searchQuery
                ? "Không tìm thấy thói quen nào."
                : "Chưa có thói quen nào, hãy thêm một thói quen mới!"}
            </Text>
          </View>
        }
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 20,
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreen;
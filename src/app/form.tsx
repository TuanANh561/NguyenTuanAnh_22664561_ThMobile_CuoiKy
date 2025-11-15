// app/form.tsx
import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { useSQLiteContext } from "expo-sqlite";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getById, saveHabit, updateHabit } from "@/db";
import { Habit } from "@/types/habit";

const FormScreen = () => {
  const db = useSQLiteContext();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (id) {
      getById(db, Number(id)).then((habit) => {
        if (habit) {
          setTitle(habit.title);
          setDescription(habit.description || "");
        }
      });
    }
  }, [id]);

  const handleSave = async () => {
    if (!title.trim()) {
      alert("Tiêu đề không được để trống!");
      return;
    }

    if (id) {
      await updateHabit(db, {
        id: Number(id),
        title,
        description,
        done_today: true,
        active: false,
      });
    } else {
      await saveHabit(db, { title, description });
    }
    router.back();
  };

  return (
    <View className="flex-1 items-center justify-center p-4 bg-gray-50">
      <View className="w-full max-w-md">
        <Text className="text-2xl font-bold text-center mb-6 text-blue-600">
          {id ? "Sửa thói quen" : "Thêm thói quen mới"}
        </Text>

        <TextInput
          label="Tiêu đề *"
          value={title}
          onChangeText={setTitle}
          mode="outlined"
          className="mb-4"
          error={!title.trim() && title !== ""}
        />

        <TextInput
          label="Mô tả (tùy chọn)"
          value={description}
          onChangeText={setDescription}
          mode="outlined"
          className="mb-6"
        />

        <Button mode="contained" onPress={handleSave} className="bg-blue-600">
          Lưu
        </Button>
      </View>
    </View>
  );
};

export default FormScreen;
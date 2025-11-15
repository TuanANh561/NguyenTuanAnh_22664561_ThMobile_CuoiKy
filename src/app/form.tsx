import { View, Text } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { useSQLiteContext } from "expo-sqlite";
import { useRouter } from "expo-router";
import { saveHabit } from "@/db";

const FormScreen = () => {
  const db = useSQLiteContext();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = async () => {
    if (!title.trim()) {
      alert("Tiêu đề không được để trống!");
      return;
    }

    await saveHabit(db, { title, description });
    router.back(); 
  };

  return (
    <View className="flex-1 items-center justify-center p-4 bg-gray-50">
      <View className="w-full max-w-md">
        <Text className="text-2xl font-bold text-center mb-6 text-blue-600">
          Thêm thói quen mới
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
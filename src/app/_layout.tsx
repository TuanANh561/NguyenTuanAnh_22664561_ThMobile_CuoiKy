import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { initTable } from "@/db";

export default function Layout() {
  return (
    <SQLiteProvider databaseName="habits.db" onInit={(db) => initTable(db)}>
      <SafeAreaProvider>
        <SafeAreaView className="flex-1 bg-white">
          <Stack>
            <Stack.Screen name="index" options={{ headerTitle: "Habit Tracker" }} />
            <Stack.Screen name="form" options={{ headerTitle: "Form" }} />
            <Stack.Screen name="trash" options={{ headerTitle: "Trash" }} />
          </Stack>
        </SafeAreaView>
      </SafeAreaProvider>
    </SQLiteProvider>
  );
}
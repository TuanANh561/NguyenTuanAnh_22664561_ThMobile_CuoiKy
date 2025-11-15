import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { initTable } from "@/db";

export default function Layout() {
  return (
    <SQLiteProvider databaseName="habits.db" onInit={initTable}>
      <SafeAreaProvider>
        <SafeAreaView className="flex-1 bg-gray-50">
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: "#1d4ed8" },
              headerTintColor: "#fff",
              headerTitleStyle: { fontWeight: "bold" },
            }}
          >
            <Stack.Screen name="index" options={{ headerTitle: "Habit Tracker" }} />
            <Stack.Screen name="form" options={{ headerTitle: "Thêm thói quen" }} />
          </Stack>
        </SafeAreaView>
      </SafeAreaProvider>
    </SQLiteProvider>
  );
}
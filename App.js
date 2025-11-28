import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { EventsProvider } from "./src/context/EventsContext";
import { UserProvider } from "./src/context/UserContext";

export default function App() {
  return (
    <EventsProvider>
      <UserProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </UserProvider>
    </EventsProvider>
  );
}

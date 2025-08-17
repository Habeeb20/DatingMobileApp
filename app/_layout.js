import { Stack } from 'expo-router';


export default function Layout() {
  return (

      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding2" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding3" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="signIn" options={{ headerShown: false }} />
        <Stack.Screen name="emailinput" options={{ headerShown: false }} />
        <Stack.Screen name="codeverification" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen name="interest" options={{ headerShown: false }} />
      </Stack>
 
  );
}
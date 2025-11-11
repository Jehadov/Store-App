import { AuthProvider, useAuth } from "@/lib/auth-contex";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

function RouteGuard({ children }: {children: React.ReactNode}) {

  const router = useRouter();
  const { user, isLoading } = useAuth();
  const segment = useSegments();

  useEffect(() => {
    const inAuthGroup = segment[0] === "auth";
    // Wait until router is ready before navigating
      if (!user && !inAuthGroup && !isLoading) {
        router.replace("/auth");
      }else if (user && inAuthGroup && !isLoading) {
        router.replace("/");
      }

  });

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RouteGuard>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </RouteGuard>
    </AuthProvider>
  );
}

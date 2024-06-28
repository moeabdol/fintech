import Colors from '@/constants/Colors';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Link, Stack, useRouter, useSegments } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

const tokenCache = {
	async getToken(key: string) {
		try {
			const item = await SecureStore.getItemAsync(key);
			if (item) {
				console.log(`${key} was used 🔐 \n`);
			} else {
				console.log('No values stored under key: ' + key);
			}
			return item;
		} catch (error) {
			console.error('SecureStore get item error: ', error);
			await SecureStore.deleteItemAsync(key);
			return null;
		}
	},
	async saveToken(key: string, value: string) {
		try {
			return SecureStore.setItemAsync(key, value);
		} catch (err) {
			return;
		}
	},
};

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function InitialLayout() {
	const [loaded, error] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
		...FontAwesome.font,
	});
	const router = useRouter();
	const { isLoaded, isSignedIn } = useAuth();
	const segments = useSegments();

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	useEffect(() => {
		if (!isLoaded) return;

		const inAuthGroup = segments[0] === '(authenticated)';
		if (isSignedIn && !inAuthGroup) {
			router.replace('/(authenticated)/(tabs)/home');
		} else if (!isSignedIn) {
			router.replace('/');
		}
	}, [isSignedIn]);

	if (!loaded || !isLoaded) {
		return <Text>Loading...</Text>;
	}

	return (
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false }} />
			<Stack.Screen
				name="signup/index"
				options={{
					title: '',
					headerBackTitle: '',
					headerShadowVisible: false,
					headerStyle: { backgroundColor: Colors.background },
					headerLeft: () => (
						<TouchableOpacity onPress={router.back}>
							<Ionicons name="arrow-back" size={24} color={Colors.primary} />
						</TouchableOpacity>
					),
				}}
			/>
			<Stack.Screen
				name="login/index"
				options={{
					title: '',
					headerBackTitle: '',
					headerShadowVisible: false,
					headerStyle: { backgroundColor: Colors.background },
					headerLeft: () => (
						<TouchableOpacity onPress={router.back}>
							<Ionicons name="arrow-back" size={24} color={Colors.primary} />
						</TouchableOpacity>
					),
					headerRight: () => (
						<Link href="/help" asChild>
							<TouchableOpacity>
								<Ionicons
									name="help-circle-outline"
									size={24}
									color={Colors.primary}
								/>
							</TouchableOpacity>
						</Link>
					),
				}}
			/>
			<Stack.Screen
				name="verify/[mobile]"
				options={{
					title: '',
					headerBackTitle: '',
					headerShadowVisible: false,
					headerStyle: { backgroundColor: Colors.background },
					headerLeft: () => (
						<TouchableOpacity onPress={router.back}>
							<Ionicons name="arrow-back" size={24} color={Colors.primary} />
						</TouchableOpacity>
					),
				}}
			/>
			<Stack.Screen
				name="help/index"
				options={{ title: 'Help', presentation: 'modal' }}
			/>
			<Stack.Screen
				name="(authenticated)/(tabs)"
				options={{ headerShown: false }}
			/>
		</Stack>
	);
}

function RootLayoutNav() {
	return (
		<ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
			<GestureHandlerRootView>
				<StatusBar style="light" />
				<InitialLayout />
			</GestureHandlerRootView>
		</ClerkProvider>
	);
}

export default RootLayoutNav;

import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Link, Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

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

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
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
				name="help/index"
				options={{ title: 'Help', presentation: 'modal' }}
			/>
		</Stack>
	);
}

function RootLayoutNav() {
	return (
		<GestureHandlerRootView>
			<StatusBar style="light" />
			<InitialLayout />
		</GestureHandlerRootView>
	);
}

export default RootLayoutNav;

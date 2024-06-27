import defaultStyles from '@/constants/Styles';
import { useAssets } from 'expo-asset';
import { ResizeMode, Video } from 'expo-av';
import { Link } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

function Page() {
	const [assets] = useAssets([require('@/assets/videos/intro.mp4')]);

	return (
		<View style={styles.container}>
			{assets && (
				<Video
					style={styles.video}
					shouldPlay
					isMuted
					isLooping
					source={{ uri: assets[0].uri }}
					resizeMode={ResizeMode.COVER}
				/>
			)}

			<View style={styles.mainTextContainer}>
				<Text style={styles.mainText}>Ready to change the way you money?</Text>
			</View>

			<View style={styles.buttonsContainer}>
				<Link
					href="/login"
					asChild
					style={[defaultStyles.pillButton, styles.loginLink]}
				>
					<TouchableOpacity>
						<Text style={styles.loginText}>Log In</Text>
					</TouchableOpacity>
				</Link>

				<Link
					href="/signup"
					asChild
					style={[defaultStyles.pillButton, styles.signupLink]}
				>
					<TouchableOpacity>
						<Text style={styles.signupText}>Sign Up</Text>
					</TouchableOpacity>
				</Link>
			</View>
		</View>
	);
}

export default Page;

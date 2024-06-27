import Colors from '@/constants/Colors';
import defaultStyles from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import styles from './styles';

enum LoginType {
	Phone,
	Email,
	Google,
	Apple,
}

const keyaboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0;

function Page() {
	const [countryCode, setCountryCode] = useState('+49');
	const [mobileNumber, setMobileNumber] = useState<string>();

	const login = async (type: LoginType) => {};

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior="padding"
			keyboardVerticalOffset={keyaboardVerticalOffset}
		>
			<View style={defaultStyles.container}>
				<Text style={defaultStyles.header}>Let's get started!</Text>
				<Text style={defaultStyles.descriptionText}>
					Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
					nonum.
				</Text>
				<View style={styles.inputContainer}>
					<TextInput
						style={[styles.input, { width: 80, marginRight: 10 }]}
						placeholder="Country code"
						placeholderTextColor={Colors.gray}
						value={countryCode}
						onChangeText={text => setCountryCode(text)}
					/>
					<TextInput
						style={[styles.input, { flex: 1 }]}
						placeholder="Mobile number"
						placeholderTextColor={Colors.gray}
						keyboardType="numeric"
						value={mobileNumber}
						onChangeText={text => setMobileNumber(text)}
					/>
				</View>

				<TouchableOpacity
					style={[
						defaultStyles.pillButton,
						mobileNumber && mobileNumber !== ''
							? styles.enabled
							: styles.disabled,
						{ marginBottom: 20 },
					]}
					onPress={() => login(LoginType.Phone)}
				>
					<Text style={defaultStyles.buttonText}>Continue</Text>
				</TouchableOpacity>

				<View style={styles.breaker}>
					<View style={styles.breakerLine} />
					<Text style={styles.orText}>or</Text>
					<View style={styles.breakerLine} />
				</View>

				<TouchableOpacity
					style={[
						defaultStyles.pillButton,
						{
							flexDirection: 'row',
							gap: 16,
							marginTop: 20,
							backgroundColor: 'white',
						},
					]}
					onPress={() => login(LoginType.Email)}
				>
					<Ionicons name="mail" size={24} color="#000" />
					<Text style={[defaultStyles.buttonText, { color: '#000' }]}>
						Continue with email
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[
						defaultStyles.pillButton,
						{
							flexDirection: 'row',
							gap: 16,
							marginTop: 20,
							backgroundColor: 'white',
						},
					]}
					onPress={() => login(LoginType.Google)}
				>
					<Ionicons name="logo-google" size={24} color="#000" />
					<Text style={[defaultStyles.buttonText, { color: '#000' }]}>
						Continue with email
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[
						defaultStyles.pillButton,
						{
							flexDirection: 'row',
							gap: 16,
							marginTop: 20,
							backgroundColor: 'white',
						},
					]}
					onPress={() => login(LoginType.Apple)}
				>
					<Ionicons name="logo-apple" size={24} color="#000" />
					<Text style={[defaultStyles.buttonText, { color: '#000' }]}>
						Continue with email
					</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
}

export default Page;

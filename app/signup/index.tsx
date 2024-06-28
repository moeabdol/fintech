import Colors from '@/constants/Colors';
import defaultStyles from '@/constants/Styles';
import { isClerkAPIResponseError, useSignUp } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
	Alert,
	KeyboardAvoidingView,
	Platform,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import styles from './styles';

const keyaboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0;

function Page() {
	const [countryCode, setCountryCode] = useState('+49');
	const [mobileNumber, setMobileNumber] = useState<string>();
	const router = useRouter();
	const { signUp } = useSignUp();

	const onSignup = async () => {
		const phoneNumber = `${countryCode}${mobileNumber}`;

		try {
			await signUp!.create({
				phoneNumber,
			});
			await signUp!.preparePhoneNumberVerification();
			router.push({
				pathname: 'verify/[mobile]',
				params: { mobile: phoneNumber },
			});
		} catch (error) {
			if (isClerkAPIResponseError(error)) {
				Alert.alert(error.errors[0].message);
			}
		}
	};

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

				<Link href="/login" asChild replace>
					<TouchableOpacity>
						<Text style={defaultStyles.textLink}>
							Already have an account? Log in
						</Text>
					</TouchableOpacity>
				</Link>

				<View style={{ flex: 1 }} />

				<TouchableOpacity
					style={[
						defaultStyles.pillButton,
						mobileNumber && mobileNumber !== ''
							? styles.enabled
							: styles.disabled,
						{ marginBottom: 20 },
					]}
					onPress={onSignup}
				>
					<Text style={defaultStyles.buttonText}>Sign Up</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
}

export default Page;

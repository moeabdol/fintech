import defaultStyles from '@/constants/Styles';
import {
	isClerkAPIResponseError,
	useSignIn,
	useSignUp,
} from '@clerk/clerk-expo';
import { Link, useLocalSearchParams } from 'expo-router';
import React, { Fragment, useEffect, useState } from 'react';
import { Alert, Platform, Text, TouchableOpacity, View } from 'react-native';
import {
	CodeField,
	Cursor,
	useBlurOnFulfill,
	useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import styles from './styles';

const CELL_COUNT = 6;

function Page() {
	const { mobile, signin } = useLocalSearchParams();
	const [code, setCode] = useState<string>();
	const { signIn } = useSignIn();
	const { signUp, setActive } = useSignUp();
	const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value: code,
		setValue: setCode,
	});

	useEffect(() => {
		if (code && code.length === 6) {
			if (signin === 'true') {
				verifyLogin();
			} else {
				verifyCode();
			}
		}
	}, [code]);

	const verifyCode = async () => {
		try {
			await signUp!.attemptPhoneNumberVerification({ code: code! });
			await setActive!({ session: signUp!.createdSessionId });
		} catch (error) {
			if (isClerkAPIResponseError(error)) {
				Alert.alert(error.errors[0].message);
			}
		}
	};

	const verifyLogin = async () => {
		try {
			await signIn!.attemptFirstFactor({ strategy: 'phone_code', code: code! });
			await setActive!({ session: signIn!.createdSessionId });
		} catch (error) {
			if (isClerkAPIResponseError(error)) {
				Alert.alert(error.errors[0].message);
			}
		}
	};

	return (
		<View style={defaultStyles.container}>
			<Text style={defaultStyles.header}>6-digit code</Text>
			<Text style={defaultStyles.descriptionText}>
				Code sent to {mobile} unless you already have an account
			</Text>

			<CodeField
				ref={ref}
				{...props}
				value={code}
				onChangeText={setCode}
				cellCount={CELL_COUNT}
				rootStyle={styles.codeFieldRoot}
				keyboardType="number-pad"
				textContentType="oneTimeCode"
				autoComplete={Platform.select({
					android: 'sms-otp',
					default: 'one-time-code',
				})}
				testID="my-code-input"
				renderCell={({ index, symbol, isFocused }) => (
					<Fragment key={index}>
						<View
							onLayout={getCellOnLayoutHandler(index)}
							style={[styles.cellRoot, isFocused && styles.focusCell]}
						>
							<Text style={styles.cellText}>
								{symbol || (isFocused ? <Cursor /> : null)}
							</Text>
						</View>
						{index === 2 ? (
							<View key={`separator-${index}`} style={styles.separator} />
						) : null}
					</Fragment>
				)}
			/>

			<Link href="/login" replace asChild>
				<TouchableOpacity>
					<Text style={[defaultStyles.textLink]}>
						Already have an account? Log In
					</Text>
				</TouchableOpacity>
			</Link>
		</View>
	);
}

export default Page;

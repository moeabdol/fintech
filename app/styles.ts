import Colors from '@/constants/Colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
	},
	video: {
		width: '100%',
		height: '100%',
		position: 'absolute',
	},
	mainTextContainer: {
		padding: 20,
		marginTop: 80,
	},
	mainText: {
		fontSize: 36,
		fontWeight: '900',
		color: 'white',
		textTransform: 'uppercase',
	},
	buttonsContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		gap: 20,
		marginBottom: 60,
		paddingHorizontal: 20,
	},
	loginLink: {
		flex: 1,
		backgroundColor: Colors.dark,
	},
	loginText: {
		color: 'white',
		fontSize: 22,
		fontWeight: '500',
	},
	signupLink: {
		flex: 1,
		backgroundColor: 'white',
	},
	signupText: {
		fontSize: 22,
		fontWeight: '500',
	},
});

export default styles;

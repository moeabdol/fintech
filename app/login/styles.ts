import Colors from '@/constants/Colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	inputContainer: {
		marginVertical: 40,
		flexDirection: 'row',
	},
	input: {
		backgroundColor: Colors.lightGray,
		padding: 20,
		borderRadius: 16,
		fontSize: 20,
	},
	enabled: {
		backgroundColor: Colors.primary,
	},
	disabled: {
		backgroundColor: Colors.primaryMuted,
	},
	breaker: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: 16,
	},
	breakerLine: {
		flex: 1,
		height: StyleSheet.hairlineWidth,
		backgroundColor: Colors.gray,
	},
	orText: {
		color: Colors.gray,
		fontSize: 20,
	},
});

export default styles;

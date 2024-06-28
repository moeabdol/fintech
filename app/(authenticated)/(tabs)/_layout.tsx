import Colors from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

function Layout() {
	return (
		<Tabs screenOptions={{ tabBarActiveTintColor: Colors.primary }}>
			<Tabs.Screen
				name="home/index"
				options={{
					title: 'Home',
					tabBarIcon: ({ size, color }) => (
						<FontAwesome name="registered" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="invest/index"
				options={{
					title: 'Invest',
					tabBarIcon: ({ size, color }) => (
						<FontAwesome name="line-chart" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="transfers/index"
				options={{
					title: 'Transfers',
					tabBarIcon: ({ size, color }) => (
						<FontAwesome name="exchange" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="lifestyle/index"
				options={{
					title: 'Lifestyle',
					tabBarIcon: ({ size, color }) => (
						<FontAwesome name="th" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="crypto/index"
				options={{
					title: 'Crypto',
					tabBarIcon: ({ size, color }) => (
						<FontAwesome name="bitcoin" size={size} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}

export default Layout;

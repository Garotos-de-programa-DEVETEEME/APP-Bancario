import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import {router} from "expo-router";
import { signOut } from '@/src/services/authService'

const Header: React.FC = () => {

    const logout = async () => {
        await signOut();
    }

    return (
        <View style={styles.headerContainer}>
            <View style={styles.leftContent}>
                <View style={styles.profileCircle}>
                    <Text style={styles.profileText}>C</Text>
                </View>
                <View>
                    <Text style={styles.clientName}>Cliente</Text>
                    <Pressable onPress={() => router.push('/(panel)/profile/page')}>
                        <Text style={styles.profileLink}>Ver seu perfil</Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.rightContent}>
                {/*TODO: AJUSTAR A ROTA*/}
                <Pressable onPress={() => router.push('/(panel)/profile/page')}>
                    <Ionicons name="notifications-outline" size={24} color="white" style={styles.icon} />
                </Pressable>
                <Pressable onPress={logout}>
                    <AntDesign name="logout" size={24} color="white" />
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#007aff',
        paddingHorizontal: 20,
        paddingVertical: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    leftContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    profileText: {
        color: '#007aff',
        fontWeight: 'bold',
    },
    clientName: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    profileLink: {
        color: 'white',
        fontSize: 12,
    },
    rightContent: {
        flexDirection: 'row',
    },
    icon: {
        marginRight: 15,
    },
});

export default Header;

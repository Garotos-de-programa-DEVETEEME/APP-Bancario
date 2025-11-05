import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ComingSoon from '@/components/coming-soon/ComingSoon';
import { BaseScreen } from '@/components/BaseScreen/BaseScreen';
import { ScreenStates } from '@/components/BaseScreen/ScreenStates';

export default function EmBrevePage() {
    return BaseScreen({
        state: ScreenStates.content(),
        children: (
            <View style={styles.container}>
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.content}>
                        <ComingSoon />
                    </View>
                </SafeAreaView>
            </View>
        )
    });
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f2f5'
    },
    safeArea: {
        flex: 1
    },
    content: {
        padding: 16
    }
});



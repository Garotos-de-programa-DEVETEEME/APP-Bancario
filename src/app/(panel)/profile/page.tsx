import { BaseScreen } from '@/components/BaseScreen/BaseScreen';
import { ScreenStates } from '@/components/BaseScreen/ScreenStates';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from "react-native";

export default function Profile() {
    const [screenState, setScreenState] = useState(ScreenStates.loading())
    
    useEffect(() => {
        setScreenState(ScreenStates.content())
    }, []);
    return ( 
        BaseScreen({
            state: screenState,
            children: (        
            <View style={styles.container}>
                <Text>Pagina Perfil</Text>
            </View>)
        })
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

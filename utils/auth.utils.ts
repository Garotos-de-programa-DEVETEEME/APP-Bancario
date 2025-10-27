import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getAuthHeader(): Promise<{ headers?: { Authorization: string } } | boolean> {
    try {
        const token = await AsyncStorage.getItem('userToken');

        if (token) {
            return {
                headers: {
                    Authorization: token,
                }
            };
        } else {
            return false;
        }
    } catch (e) {
        console.error('Falha ao obter o token:', e);
        return false;
    }
}

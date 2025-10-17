
import React from 'react';
import { BaseToast, ErrorToast } from 'react-native-toast-message';
import colors from '@/constants/colors';

const toastConfig = {
    success: (props: any) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: colors.green }} // Cor da barra lateral
            contentContainerStyle={{ backgroundColor: colors.white }} // Cor de fundo do conteúdo
            text1Style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: colors.black,
            }}
            text2Style={{
                fontSize: 13,
                color: colors.zinc,
            }}
        />
    ),

    // Personalização do tipo 'error'
    error: (props: any) => (
        <ErrorToast
            {...props}
            style={{ borderLeftColor: '#ff2d55' }} // Vermelho para a barra lateral
            contentContainerStyle={{ backgroundColor: colors.white }}
            text1Style={{
                fontSize: 15,
                fontWeight: 'bold',
            }}
            text2Style={{
                fontSize: 13,
                color: colors.zinc,
            }}
        />
    ),

    // Aqui você pode adicionar outros tipos customizados
    // por exemplo: type: 'info', type: 'warning', etc.
    // Pode até criar um toast totalmente novo, com um layout diferente!
};

export default toastConfig;

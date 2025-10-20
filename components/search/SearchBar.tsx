import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

interface SearchBarProps {
    onSearch: (text: string) => void;
}

const SearchBar2: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchText, setSearchText] = useState('');

    const handleSearch = () => {
        onSearch(searchText);
    };

    return (
        <View style={styles.container}>
            <Ionicons
                name="search"
                size={20}
                color="#888"
                style={styles.icon}
                onPress={handleSearch} // Adiciona um evento de clique no ícone
            />
            <TextInput
                style={styles.input}
                placeholder="Buscar fundos por nome ou categoria"
                placeholderTextColor="#888"
                value={searchText}
                onChangeText={setSearchText} // Atualiza o estado com o texto digitado
                returnKeyType="search" // Altera o botão do teclado para "Buscar"
                onSubmitEditing={handleSearch} // Aciona a busca ao pressionar o botão de busca no teclado
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        gap: 10,
        borderRadius: 15,
        paddingHorizontal: 15,
        marginHorizontal: 15,
        marginTop: 20,
        height: 40,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 3,
    },
    icon: {
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
});

export default SearchBar2;

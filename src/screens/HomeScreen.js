// src/screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Pressable, StyleSheet } from 'react-native';
import apiClient from '../api/apiClient';

export default function HomeScreen({ navigation }) {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await apiClient.get('/character');
                setCharacters(response.data.results);
            } catch (error) {
                console.error('Error fetching characters:', error);
            }
        };

        fetchCharacters();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={characters}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Pressable style={styles.itemContainer} onPress={() => navigation.navigate('Detail', { id: item.id })}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <Text style={styles.text}>{item.name}</Text>
                    </Pressable>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f8f8f8',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 15,
    },
    text: {
        fontSize: 18,
        fontWeight: '500',
        color: '#333',
    },
});

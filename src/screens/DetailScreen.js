// src/screens/DetailScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import apiClient from '../api/apiClient';

export default function DetailScreen({ route }) {
    const { id } = route.params;
    const [character, setCharacter] = useState(null);

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const response = await apiClient.get(`/character/${id}`);
                setCharacter(response.data);
            } catch (error) {
                console.error('Error fetching character details:', error);
            }
        };

        fetchCharacter();
    }, [id]);

    if (!character) return null;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={{ uri: character.image }} style={styles.image} />
            <Text style={styles.name}>{character.name}</Text>
            <Text style={styles.info}>Status: {character.status}</Text>
            <Text style={styles.info}>Species: {character.species}</Text>
            <Text style={styles.info}>Gender: {character.gender}</Text>
            <Text style={styles.info}>Origin: {character.origin.name}</Text>
            <Text style={styles.info}>Location: {character.location.name}</Text>
            <Text style={styles.info}>Episodes: {character.episode.length}</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 20,
    },
    name: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    info: {
        fontSize: 18,
        marginBottom: 8,
        color: '#333',
        textAlign: 'center',
    },
});

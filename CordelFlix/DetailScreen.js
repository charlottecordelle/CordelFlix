import React from 'react';
import { StyleSheet, Text, Image, ScrollView, Button } from 'react-native';

export default function DetailScreen({ route }) {
    const { movie, favorites, setFavorites, toggleFavorite } = route.params; 
    const isFavorite = favorites.some(fav => fav.id === movie.id);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{movie.title}</Text>
            <Image 
                source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} 
                style={styles.poster} 
            />
            <Text style={styles.overview}>{movie.overview}</Text>
            <Button 
                title={isFavorite ? "✗♥" : "♥"} 
                onPress={() => toggleFavorite(movie)} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#7A90A4',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    poster: {
        width: '100%',
        height: 500,
        borderRadius: 10,
        marginTop: 15,
        marginBottom: 15,
    },
    overview: {
        fontSize: 17,
        color: '#333',
    },
});

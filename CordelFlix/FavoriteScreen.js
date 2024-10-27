import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';

export default function FavoritesScreen({ navigation, route }) {
    const { favorites } = route.params;

    const handleMoviePress = (movie) => {
        navigation.navigate('Detail', { movie, favorites });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Mes Films Favoris</Text>
            {favorites.length === 0 ? (
                <Text>Aucun film en favoris.</Text>
            ) : (
                <FlatList
                    data={favorites}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleMoviePress(item)}>
                            <View style={styles.movieItem}>
                                <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.poster} />
                                <Text>{item.title}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#CACACA',
    },
    headerText: {
        fontSize: 28,
        color: "#fff",
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: '500'
    },
    movieItem: {
        backgroundColor: '#F0F0F0',
        borderRadius: 8,
        marginVertical: 10,
        padding: 8,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    poster: {
        width: 100,
        height: 150,
        borderRadius: 8,
        padding: 10,
        margin: 9,
    },
});

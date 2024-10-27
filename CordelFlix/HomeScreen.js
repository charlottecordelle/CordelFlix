import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TextInput, TouchableOpacity, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({navigation}) {
    
    const API_KEY = '5fb30292e7cd009ed646af5712a4557d';
    const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=fr-FR`;
    const [movies, setMovies] = useState();
    const [searchQuery, setSearchQuery] = useState('');
    const [favorites, setFavorites] = useState([]);

    useEffect( () => {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
          if (Array.isArray(data.results)) {
            setMovies(data.results);
        }
      })
        .catch(error => console.error(error));
    }, []);

    const filteredMovies = searchQuery
        ? movies.filter(movie => 
            movie.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : movies;

    const handleMoviePress = (movie) => {
          navigation.navigate('Detail', { movie, favorites, toggleFavorite, setFavorites });
      };

    const loadFavorites = async () => {
        try {
            const storedFavorites = await AsyncStorage.getItem('favorites');
            if (storedFavorites) {
                setFavorites(JSON.parse(storedFavorites));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const saveFavorites = async (favorites) => {
      try {
          await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      } catch (error) {
          console.error(error);
      }
    };
  
    const toggleFavorite = (movie) => {
      if (favorites.some(fav => fav.id === movie.id)) {
          const newFavorites = favorites.filter(fav => fav.id !== movie.id);
          setFavorites(newFavorites);
          saveFavorites(newFavorites);
      } else {
          const newFavorites = [...favorites, movie];
          setFavorites(newFavorites);
          saveFavorites(newFavorites);
      }
    };

    return (
    <View style={styles.container}>
    <Text style={styles.headerText}>CordelFlix</Text>
    <TextInput
                style={styles.searchInput}
                placeholder="Rechercher un film..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
        <Button title="Mes Favoris" onPress={() => navigation.navigate('Favorites', { favorites })} />
        <FlatList
            data={filteredMovies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleMoviePress(item)}>
            <View style={styles.movieItem}>
                <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.poster} />
                <Text>{item.title}</Text>
            </View>
            </TouchableOpacity>
            )}
            ListEmptyComponent={<Text>Aucun film trouvé.</Text>}
            />
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
 backgroundColor: '#D5CABC',
 alignItems: 'center',
 justifyContent: 'center',
  },
  headerText: {
    fontSize : 28,
    color: "#fff",
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    fontWeight: '500'
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '80%',
  },
    movieItem: {
      backgroundColor: '#f5efe6',
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
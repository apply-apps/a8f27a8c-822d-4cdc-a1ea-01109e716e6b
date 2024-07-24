// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, Button, View, ActivityIndicator } from 'react-native';
import axios from 'axios';

const API_URL = "http://apihub.p.appply.xyz:3300/chatgpt";

export default function App() {
  const [hero, setHero] = useState('');
  const [villain, setVillain] = useState('');
  const [plot, setPlot] = useState('');
  const [loading, setLoading] = useState(false);
  const [story, setStory] = useState(null);

  const generateStory = async () => {
    setLoading(true);
    setStory(null);

    try {
      const response = await axios.post(API_URL, {
        messages: [
          { role: "system", content: "You are a helpful assistant. Please generate a fairy tale based on the given heroes, villains, and plot." },
          { role: "user", content: `Please create a fairy tale with the hero ${hero}, the villain ${villain}, and the plot ${plot}.` }
        ],
        model: "gpt-4o"
      });

      const { data } = response;
      setStory(data.response);
    } catch (error) {
      console.error("Error generating story:", error);
      setStory("An error occurred while generating the story. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.innerContainer}>

        <Text style={styles.title}>Fairy Tale Generator</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter the hero"
          value={hero}
          onChangeText={setHero}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter the villain"
          value={villain}
          onChangeText={setVillain}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter the plot"
          value={plot}
          onChangeText={setPlot}
        />

        <Button
          title="Generate Fairy Tale"
          onPress={generateStory}
        />

        {loading && <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />}

        {story && (
          <View style={styles.storyBox}>
            <Text style={styles.storyText}>{story}</Text>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  innerContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    padding: 10,
    borderRadius: 10,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    marginBottom: 15,
    width: '100%',
  },
  button: {
    backgroundColor: '#007BFF',
    color: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  loader: {
    marginTop: 20,
  },
  storyBox: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
    borderColor: '#CCCCCC',
    borderWidth: 1,
  },
  storyText: {
    fontSize: 16,
  },
});
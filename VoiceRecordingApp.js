import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  FlatList,
  StyleSheet,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

const VoiceRecordingApp = () => {
  const [recordingsList, setRecordingsList] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingName, setRecordingName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [playbackId, setPlaybackId] = useState(null); // Simulates playback

  useEffect(() => {
    loadRecordings();
  }, []);

  const loadRecordings = async () => {
    try {
      const storedRecordings = await AsyncStorage.getItem("recordings");
      if (storedRecordings) {
        const parsedRecordings = JSON.parse(storedRecordings).map((rec) => ({
          ...rec,
          date: new Date(rec.date),
        }));
        setRecordingsList(parsedRecordings);
      }
    } catch (error) {
      console.error("Failed to load recordings", error);
    }
  };

  const saveRecording = async () => {
    const newRecording = {
      id: Date.now().toString(),
      name: recordingName || `Recording - ${new Date().toLocaleString()}`,
      date: new Date().toISOString(),
    };
    const updatedRecordings = [...recordingsList, newRecording];
    setRecordingsList(updatedRecordings);
    setRecordingName("");

    try {
      await AsyncStorage.setItem(
        "recordings",
        JSON.stringify(updatedRecordings)
      );
    } catch (error) {
      console.error("Failed to save recording", error);
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    Alert.alert("Recording Started", "Simulating audio recording...");
  };

  const stopRecording = () => {
    setIsRecording(false);
    saveRecording();
    Alert.alert("Recording Stopped", "Recording saved successfully.");
  };

  const playRecording = (id) => {
    if (playbackId === id) {
      setPlaybackId(null); // Stop playback
    } else {
      setPlaybackId(id); // Start playback
      Alert.alert("Playback Started", "Simulating playback...");
    }
  };

  const deleteRecording = async (id) => {
    const updatedRecordings = recordingsList.filter((item) => item.id !== id);
    setRecordingsList(updatedRecordings);

    try {
      await AsyncStorage.setItem(
        "recordings",
        JSON.stringify(updatedRecordings)
      );
    } catch (error) {
      console.error("Failed to delete recording", error);
    }
  };

  const shareRecording = (id) => {
    const recording = recordingsList.find((item) => item.id === id);
    if (recording) {
      Alert.alert("Share Recording", `Simulating sharing for ${recording.name}`);
    }
  };

  const filteredRecordings = recordingsList.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Voice Recorder</Text>
      <Text>Status: {isRecording ? "Recording..." : "Idle"}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter recording name"
        value={recordingName}
        onChangeText={setRecordingName}
      />
      {isRecording ? (
        <Button title="Stop Recording" onPress={stopRecording} />
      ) : (
        <Button title="Start Recording" onPress={startRecording} />
      )}
      <TextInput
        style={styles.input}
        placeholder="Search recordings..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {filteredRecordings.length === 0 ? (
        <Text>No recordings available. Start by creating one!</Text>
      ) : (
        <FlatList
          data={filteredRecordings}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.recordingItem}>
              <Text>{item.name}</Text>
              <Button
                title={playbackId === item.id ? "Stop" : "Play"}
                onPress={() => playRecording(item.id)}
              />
              <Button title="Delete" onPress={() => deleteRecording(item.id)} />
              <Button title="Share" onPress={() => shareRecording(item.id)} />
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "black",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "#8e44ad",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    backgroundColor: "black",
    color: "white",
    fontSize: 16,
    paddingHorizontal: 15,
  },
  recordingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
});

export default VoiceRecordingApp;

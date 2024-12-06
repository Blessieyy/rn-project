import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";

import mixer from "./image/saso-tusar-QtgGYlug6Cw-unsplash.jpg";

const Intro = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={mixer} resizeMode="cover" style={styles.image}>
        <Text style={styles.container}>Intro</Text>
      </ImageBackground>
    </View>
  );
};

export default Intro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

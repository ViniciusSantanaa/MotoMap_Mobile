import React from "react";
import { ActivityIndicator } from "react-native-paper";

export default function Loader() {
  return <ActivityIndicator animating size="large" style={{ margin: 20 }} />;
}

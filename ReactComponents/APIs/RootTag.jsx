import React, {useContext} from 'react'; // 👈 FIX: Added React and useContext import
import {
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native'; // 👈 Added standard React Native components
import {RootTagContext} from 'react-native';
// NOTE: NativeAnalytics and NativeNavigation are mock/placeholder imports
// They assume these objects are globally available or imported from local files
const NativeAnalytics = {
  logEvent: (rootTag, eventName) => console.log(`Analytics for tag ${rootTag}: ${eventName}`),
};
const NativeNavigation = {
  setTitle: (rootTag, title) => console.log(`Navigation for tag ${rootTag}: Title set to "${title}"`),
};


function ScreenA() {
  // FIX: useContext must be imported from 'react'
  const rootTag = useContext(RootTagContext); 

  const updateTitle = title => {
    NativeNavigation.setTitle(rootTag, title);
  };

  const handleOneEvent = () => {
    NativeAnalytics.logEvent(rootTag, 'one_event');
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Screen A (Functional)</Text>
      <Text>Root Tag: {rootTag}</Text>
      <Button title="Set Title" onPress={() => updateTitle("Screen A Title")} />
      <Button title="Log Event" onPress={handleOneEvent} />
    </View>
  );
}


class ScreenB extends React.Component {
  // FIX: Removed TypeScript/Flow type annotation (: typeof RootTagContext)
  static contextType = RootTagContext;

  updateTitle(title) {
    NativeNavigation.setTitle(this.context, title);
  }

  handleOneEvent() {
    NativeAnalytics.logEvent(this.context, 'one_event');
  }

  render() {
    return (
      <View style={styles.screen}>
        <Text style={styles.text}>Screen B (Class)</Text>
        <Text>Root Tag: {this.context}</Text>
        <Button title="Set Title" onPress={() => this.updateTitle("Screen B Title")} />
        <Button title="Log Event" onPress={() => this.handleOneEvent()} />
      </View>
    );
  }
}

// 👈 FIX: Added an App component to render the screens
export default function App() {
    return (
        <View style={styles.container}>
            <ScreenA />
            <View style={styles.separator} />
            <ScreenB />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    marginTop: 30, // For safer rendering on mobile devices
  },
  screen: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  separator: {
      height: 20,
  }
});
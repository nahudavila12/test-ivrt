/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import DevicesScreen from './src/screens/DevicesScreen';


type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

const NAV_ITEMS = [
  { key: 'config', label: 'Config.', icon: '⚙️' },
  { key: 'evaluaciones', label: 'Evaluaciones', icon: '📈' },
  { key: 'home', label: 'Home', icon: '🏠' },
  { key: 'atletas', label: 'Atletas', icon: '🏃' },
  { key: 'dispositivos', label: 'Dispositivos', icon: '🔗' },
];

const Placeholder: React.FC<{ label: string }> = ({ label }) => (
  <View style={styles.placeholderContainer}>
    <Text style={styles.placeholderText}>{label}</Text>
  </View>
);

const App: React.FC = () => {
  const [tab, setTab] = useState('dispositivos');

  const renderScreen = () => {
    switch (tab) {
      case 'dispositivos':
        return <DevicesScreen />;
      case 'config':
        return <Placeholder label="Configuración" />;
      case 'evaluaciones':
        return <Placeholder label="Evaluaciones" />;
      case 'home':
        return <Placeholder label="Home" />;
      case 'atletas':
        return <Placeholder label="Atletas" />;
      default:
        return <DevicesScreen />;
    }
  };

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  /*
   * To keep the template simple and small we're adding padding to prevent view
   * from rendering under the System UI.
   * For bigger apps the recommendation is to use `react-native-safe-area-context`:
   * https://github.com/AppAndFlow/react-native-safe-area-context
   *
   * You can read more about it here:
   * https://github.com/react-native-community/discussions-and-proposals/discussions/827
   */
  const safePadding = '5%';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>{renderScreen()}</View>
        <View style={styles.navbar}>
          {NAV_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.key}
              style={[styles.navItem, tab === item.key && styles.navItemActive]}
              onPress={() => setTab(item.key)}
            >
              <Text style={[styles.navIcon, tab === item.key && styles.navIconActive]}>{item.icon}</Text>
              <Text style={[styles.navLabel, tab === item.key && styles.navLabelActive]}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#181A20',
  },
  container: {
    flex: 1,
    backgroundColor: '#181A20',
  },
  content: {
    flex: 1,
  },
  navbar: {
    flexDirection: 'row',
    backgroundColor: '#23242a',
    borderTopWidth: 1,
    borderTopColor: '#222',
    height: 64,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  navItemActive: {
    backgroundColor: '#181A20',
  },
  navIcon: {
    fontSize: 22,
    color: '#b0b0b0',
  },
  navIconActive: {
    color: '#2563eb',
  },
  navLabel: {
    fontSize: 12,
    color: '#b0b0b0',
    marginTop: 2,
  },
  navLabelActive: {
    color: '#2563eb',
    fontWeight: 'bold',
  },
  placeholderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#181A20',
  },
  placeholderText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

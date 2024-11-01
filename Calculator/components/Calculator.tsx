import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Switch } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create, all } from 'mathjs';

const math = create(all);

const Calculator: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [input, setInput] = useState<string>(''); 
  const [result, setResult] = useState<string | null>(null); 
  const [history, setHistory] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true); // Dark mode state

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const storedHistory = await AsyncStorage.getItem('calculationHistory');
        if (storedHistory) {
          setHistory(JSON.parse(storedHistory));
        }
      } catch (error) {
        console.error('Failed to load history:', error);
      }
    };

    loadHistory();
  }, []);

  const handlePress = (value: string) => {
    setInput((prevInput) => prevInput + value);
  };

  const handleClear = () => {
    setInput('');
    setResult(null);
  };

  const handleCalculate = async () => {
    try {
      const calculatedResult = math.evaluate(input); 
      setResult(calculatedResult.toString());

      const newHistory = [...history, `${input} = ${calculatedResult}`];
      setHistory(newHistory);
      await AsyncStorage.setItem('calculationHistory', JSON.stringify(newHistory));

    } catch (error) {
      setResult('Error');
    }
  };

  const handleBackspace = () => {
    setInput((prevInput) => prevInput.slice(0, -1));
  };

  const handleViewHistory = () => {
    navigation.navigate('History', { history });
  };

  const handleClearHistory = () => {
    Alert.alert(
      "Clear History",
      "Are you sure you want to clear the history?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: clearHistory }
      ]
    );
  };

  const clearHistory = async () => {
    setHistory([]);
    await AsyncStorage.removeItem('calculationHistory');
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#1E1E1E' : '#D4D4D2' }]}>
      {/* Dark Mode Toggle Switch */}
      <View style={styles.switchContainer}>
        <Text style={[styles.switchLabel, { color: isDarkMode ? 'white' : 'black' }]}>
          {isDarkMode ? 'Dark Mode' : 'Light Mode'}
        </Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          trackColor={{ false: '#767577', true: '#FF9500' }} // Yellow track color
          thumbColor={isDarkMode ? '#f4f3f4' : '#f4f3f4'} // Thumb color
        />
      </View>

      <Text style={[styles.inputText, { color: isDarkMode ? 'white' : 'black' }]}>{input || '0'}</Text>
      {result && <Text style={[styles.resultText, { color: isDarkMode ? '#FF9500' : 'black' }]}>{result}</Text>}

      <View style={styles.row}>
        <Button label="C" onPress={handleClear} style={styles.lightGrayButton} />
        <TouchableOpacity style={[styles.button, styles.lightGrayButton]} onPress={handleBackspace}>
          <MaterialCommunityIcons name="backspace-outline" size={24} color={isDarkMode ? 'white' : 'black'} />
        </TouchableOpacity>
        <Button label="%" onPress={() => handlePress('%')} style={styles.lightGrayButton} />
        <Button label="/" onPress={() => handlePress('/')} style={styles.yellowButton} />
      </View>
      <View style={styles.row}>
        <Button label="7" onPress={() => handlePress('7')} />
        <Button label="8" onPress={() => handlePress('8')} />
        <Button label="9" onPress={() => handlePress('9')} />
        <Button label="*" onPress={() => handlePress('*')} style={styles.yellowButton} />
      </View>
      <View style={styles.row}>
        <Button label="4" onPress={() => handlePress('4')} />
        <Button label="5" onPress={() => handlePress('5')} />
        <Button label="6" onPress={() => handlePress('6')} />
        <Button label="-" onPress={() => handlePress('-')} style={styles.yellowButton} />
      </View>
      <View style={styles.row}>
        <Button label="1" onPress={() => handlePress('1')} />
        <Button label="2" onPress={() => handlePress('2')} />
        <Button label="3" onPress={() => handlePress('3')} />
        <Button label="+" onPress={() => handlePress('+')} style={styles.yellowButton} />
      </View>
      <View style={styles.row}>
        <Button label="0" onPress={() => handlePress('0')} style={styles.wideButton} />
        <Button label="." onPress={() => handlePress('.')} />
        <TouchableOpacity style={styles.historyButton} onPress={handleViewHistory}>
          <MaterialCommunityIcons name="timer-sand" size={24} color={isDarkMode ? 'white' : 'black'} />
        </TouchableOpacity>
        <Button label="=" onPress={handleCalculate} style={styles.yellowButton} />
      </View>
      {/* Uncomment below to enable clear history feature */}
      {/* <TouchableOpacity style={styles.clearHistoryButton} onPress={handleClearHistory}>
        <Text style={styles.clearHistoryText}>Clear History</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const Button: React.FC<{ label: string; onPress: () => void; style?: object }> = ({ label, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Align items to the top
    padding: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20, // Adjust margin to position higher
    marginTop: 40, // Add top margin to position further down
  },
  switchLabel: {
    fontSize: 18,
    marginRight: 10,
  },
  inputText: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 10,
  },
  resultText: {
    fontSize: 36,
    textAlign: 'right',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#2E2F38',
    padding: 20,
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
  },
  wideButton: {
    width: 70,
  },
  yellowButton: {
    backgroundColor: '#FF9500',
  },
  lightGrayButton: {
    backgroundColor: '#4E505F',
  },
  historyButton: {
    backgroundColor: '#4E505F',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    width: 70,
    height: 70,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
  },
});

export default Calculator;

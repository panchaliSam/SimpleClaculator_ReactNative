import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Switch } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create, all } from 'mathjs';


const math = create(all);

interface CalculatorProps {
  navigation: any;
}

const Calculator: React.FC<CalculatorProps> = ({ navigation }) => {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Load history from AsyncStorage on component mount
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const storedHistory = await AsyncStorage.getItem('calculationHistory');
        if (storedHistory) {
          setHistory(JSON.parse(storedHistory));
        }
      } catch (error) {
        //console.error('Failed to load history:', error);
      }
    };

    loadHistory();
  }, []);

  const handlePress = (value: string) => {
    // Prevent multiple consecutive operators
    if (/[\+\-\*\/]{2,}$/.test(input + value)) {
      return; // Do not update the input
    }
    setInput((prevInput) => prevInput + value);
  };


  const handleClear = () => {
    setInput('');
    setResult(null);
  };

  const handleCalculate = async () => {
    try {
      // Validation: Prevent multiple consecutive operators
      if (/[\+\-\*\/]{2,}/.test(input)) {
        setResult('Syntax Error');
        return;
      }

      // Validation: Prevent division by zero
      if (/\/0(?!\d)/.test(input)) {
        setResult('Error: Division by Zero');
        return;
      }

      // Validate input syntax using math.js
      const calculatedResult = math.evaluate(input);
      setResult(calculatedResult.toString());

      const newHistory = [...history, `${input} = ${calculatedResult}`];
      setHistory(newHistory);
      await AsyncStorage.setItem('calculationHistory', JSON.stringify(newHistory));
    } catch (error) {
      setResult('Syntax Error');
    }
  };

  const handleBackspace = () => {
    setInput((prevInput) => prevInput.slice(0, -1));
  };

  const handleViewHistory = () => {
    navigation.navigate('History', {
      history,
      clearHistory: async () => {
        setHistory([]);
        await AsyncStorage.removeItem('calculationHistory');
      },
    });
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
          trackColor={{ false: '#767577', true: '#FF9500' }}
          thumbColor={isDarkMode ? '#f4f3f4' : '#f4f3f4'}
        />
      </View>

      <Text style={[styles.inputText, { color: isDarkMode ? 'white' : 'black' }]}>{input || '0'}</Text>
      {result && <Text style={[styles.resultText, { color: isDarkMode ? '#FF9500' : 'black' }]}>{result}</Text>}

      <View style={styles.row}>
        <Button label="C" onPress={handleClear} style={styles.lightGrayButton} />
        <TouchableOpacity style={[styles.button, styles.lightGrayButton]} onPress={handleBackspace}>
          <MaterialCommunityIcons name="backspace-outline" size={24} color={isDarkMode ? 'white' : 'white'} />
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
          <MaterialCommunityIcons name="timer-sand" size={24} color={isDarkMode ? 'white' : 'white'} />
        </TouchableOpacity>
        <Button label="=" onPress={handleCalculate} style={styles.yellowButton} />
      </View>
    </View>
  );
};

interface ButtonProps {
  label: string;
  onPress: () => void;
  style?: object;
}

const Button: React.FC<ButtonProps> = ({ label, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 40,
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
    marginRight: 20,
  },
  resultText: {
    fontSize: 36,
    textAlign: 'right',
    marginBottom: 20,
    marginRight: 20,
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
    marginRight: 20,
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

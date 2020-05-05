import React, {useState} from 'react';
import {
  Button,
  Modal,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputSubmitEditingEventData,
  TouchableOpacity,
  View
} from 'react-native';
import {styles} from "./app.styles";

/* TODOs
styling
bingocheck
storage
corner cases

firstRun experience
 */

export default function App() {
  const myCapsInit = [1, 7];

  const [addCapModalVisible, setAddCapModalVisible] = useState(false);
  const [capsToAdd, setCapsToAdd] = useState<undefined | string>(undefined);
  const [myCaps, setMyCaps] = useState(myCapsInit);

  const sheets = [
    {
      id: 0,
      isActive: true,
      numbers:
          [
              91, 70, 39, 63,  7,
              25, 46, 82, 18, 54,
              79, 68, 13, 22, 86,
               2, 57, 35, 94, 40,
              43,  1, 72, 26, 80
          ]
    },
    {
      id: 1,
      isActive: false,
      numbers:
        [
            10, 81, 54, 29, 47,
            64,  4, 76, 13, 92,
            70, 95, 50, 44, 16,
            28, 26, 33, 77, 40,
            11, 53, 89, 56,  2
        ]
    }
  ];



  const isChecked = (value: number) => {
      return Boolean(myCaps.find(cap => cap === value));
  };

  const handleButton = () => {
    setAddCapModalVisible(!addCapModalVisible);
  };

  const handleSubmitNewCaps = (newCapsEvent: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    const newCaps = newCapsEvent.nativeEvent.text.match(/\d+/g);
    if (newCaps) {
      const newCapsAsInts = newCaps.map(c => parseInt(c));
      setMyCaps([...myCaps, ...newCapsAsInts]);
    }

    setCapsToAdd(undefined);
    setAddCapModalVisible(!addCapModalVisible);
  };

  const renderSheets = () => sheets.map(sheet => {
    return (
        <View style={styles.sheetWrapper}>
          <View style={styles.sheet} key={'sheet' + sheet.id}>
              {sheet.numbers.map(num =>
                  <Text key={'number' + sheet.id + num} style={isChecked(num) ? [styles.sheetNumber, styles.sheetNumberChecked] : styles.sheetNumber}>{num}</Text>)}
          </View>
        </View>);
  });



  return (
    <View style={styles.container}>
      <Modal
          animationType="fade"
          transparent={false}
          visible={addCapModalVisible}
      >
        <TextInput
            keyboardType={'numeric'}
            autoFocus={true}
            placeholder={'Gebe eine oder mehrere Zahlen mit , getrennt ein'}
            value={capsToAdd}
            onChangeText={text => setCapsToAdd(text)}
            onSubmitEditing={handleSubmitNewCaps}
        />
      </Modal>

      <View>
        <Text style={styles.headline}>SterniBingoooo</Text>
        {renderSheets()}
      </View>
      <TouchableOpacity
          style={styles.addCapsButton}
          onPress={handleButton}
      >
        <Text style={styles.buttonText}>Saufen!</Text>
      </TouchableOpacity>
    </View>
  );
}
import React, {useState} from 'react';
import {
    Button, FlatList,
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
  const [addCapModalVisible, setAddCapModalVisible] = useState(false);
  const [capsToAdd, setCapsToAdd] = useState<undefined | string>(undefined);
  const [myCaps, setMyCaps] = useState<Array<number>>([]);

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

  const renderSheet = (FlatListItem: any) => {
      const sheet = FlatListItem.item;
      return (
        <View style={styles.sheetWrapper} key={'sheet' + sheet.id + 'wrapper'}>
          <View style={styles.sheet} key={'sheet' + sheet.id}>
              {sheet.numbers.map(num =>
                  <View style={isChecked(num) ? [styles.sheetNumber, styles.sheetNumberChecked] : styles.sheetNumber} key={'numberView' + sheet.id + num}>
                    <Text key={'number' + sheet.id + num} >{num}</Text>
                  </View>
              )}
          </View>
        </View>);
  };



  return (
    <View style={styles.container}>
      <Modal
          animationType="fade"
          visible={addCapModalVisible}
      >
          <View style={styles.modal}>
              <TextInput
                  multiline
                  keyboardType={'numeric'}
                  autoFocus={true}
                  placeholder="Gebe eine oder mehrere Zahlen ein, getrennt durch ein Komma, Punkt oder Leerzeichen"
                  value={capsToAdd}
                  onChangeText={text => setCapsToAdd(text)}
                  onSubmitEditing={handleSubmitNewCaps}
                  style={styles.modalInput}
              />
          </View>
      </Modal>

      <View style={styles.main}>
        <Text style={styles.headline}>SterniBingoooo</Text>
          <FlatList data={sheets} renderItem={renderSheet} style={styles.sheetListView}/>
          <TouchableOpacity
              style={styles.addCapsButton}
              onPress={handleButton}
          >
              <Text style={styles.buttonText}>Saufen!</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}
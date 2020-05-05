import React, {useState} from 'react';
import {
    FlatList,
    Modal,
    NativeSyntheticEvent,
    Text,
    TextInput,
    TextInputSubmitEditingEventData,
    TouchableOpacity,
    View
} from 'react-native';
import {styles} from "./app.styles";
import {sheets} from './sheets';

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

  const renderSheet = (item: any) => {
      const sheet = item.item;
      return (
        <View style={styles.sheetWrapper} key={'sheet' + sheet.id + 'wrapper'}>
          <View style={styles.sheet} key={'sheet' + sheet.id}>
              {sheet.numbers.map((num: number) =>
                  <View style={sheet.isActive && isChecked(num) ? [styles.sheetNumber, styles.sheetNumberChecked] : styles.sheetNumber} key={'numberView' + sheet.id + num}>
                    <Text key={'number' + sheet.id + num} >{num}</Text>
                  </View>
              )}

          </View>
        {sheet.isActive ? null : <View style={styles.inactiveCard}><Text style={styles.inactiveCardText}>Inactive</Text></View>}
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
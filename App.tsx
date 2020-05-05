import React, {useEffect, useState} from 'react';
import {
    AsyncStorage,
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

    const getCapsFromStore = async () => {
        try {
            const capsPromise = AsyncStorage.getItem('@myCaps');
            capsPromise.then(caps => {
                if (caps) {
                    setMyCaps(JSON.parse(caps));
                }
            });
        } catch(e) {
            // error reading value
        }
    };

    const saveCapsToStore = async () => {
        try {
            const capsString = JSON.stringify(myCaps);
            await AsyncStorage.setItem('@myCaps', capsString);
        } catch (e) {
            // saving error
        }
    };

  const [myCaps, setMyCaps] = useState<Array<number>>([]);

  useEffect(() => {
     if (myCaps.length === 0) {
        getCapsFromStore();
     }
  }, []);

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
    const savedCaps = saveCapsToStore();
    savedCaps.then(e => console.log('saved them'));
  };

  const renderSheet = (item: any) => {
      const sheet = item.item;
      return (
        <View style={styles.sheetWrapper} key={'sheet' + sheet.id + 'wrapper'}>
          <View style={styles.sheet} key={'sheet' + sheet.id}>
              {sheet.numbers.map((num: number, index: number) =>
                  <View style={sheet.isActive && isChecked(num) ? [styles.sheetNumber, styles.sheetNumberChecked] : styles.sheetNumber} key={'numberView' + sheet.id + num + index}>
                    <Text key={'number' + sheet.id + num + index} >{num.toString()}</Text>
                  </View>
              )}

          </View>
        {sheet.isActive ? null : <View key={'inactiveSheet' + sheet.id} style={styles.inactiveCard}><Text style={styles.inactiveCardText}>Inactive</Text></View>}
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
          <FlatList data={sheets} renderItem={renderSheet} style={styles.sheetListView} keyExtractor={(item) => 'list-item-' + item.id}/>
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
import React, {useEffect, useRef, useState} from 'react';
import {
	AsyncStorage, Button,
	FlatList,
	Modal,
	NativeSyntheticEvent,
	Text,
	TextInput,
	TextInputSubmitEditingEventData,
	TouchableOpacity,
	View
} from 'react-native';
import {colors, styles} from "./app.styles";
import {sheets} from './sheets';
import {getDataFromStore, saveDataToStore} from "./AsyncStore";

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
    const [mySheets, setMySheets] = useState<Array<number>>([0, 1]);
    const flatListRef = useRef(null);
  	const [myCaps, setMyCaps] = useState<Array<number>>([]);

  	useEffect(() => {
		 if (myCaps.length === 0) {
			getDataFromStore('myCaps').then(data => {
				if (data) {
					setMyCaps(data);
				}
			});
		 }
		 getDataFromStore('mySheets').then(data => {
		 	if (data) {
		 		setMySheets(data);
			}
		 });
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
      	const allCaps = [...myCaps, ...newCapsAsInts];
      	setMyCaps(allCaps);
		saveDataToStore('myCaps', allCaps);
    }

    setCapsToAdd(undefined);
    setAddCapModalVisible(!addCapModalVisible);
  };

  const handleUnlockSheet = (id: number) => () => {
  		const newSheets = [...mySheets, id];
  		setMySheets(newSheets);
  		saveDataToStore('mySheets', newSheets);
	  	// @ts-ignore
	  	flatListRef.current.scrollToIndex({index: newSheets.length - 1, viewPosition: 0.5});
	};

  const isActive = (id: number) => mySheets.includes(id);

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
        {mySheets.includes(sheet.id) ? null : <View key={'inactiveSheet' + sheet.id} style={styles.inactiveCard}><Button color={colors.button} title="Karte entsperren" onPress={handleUnlockSheet(sheet.id)}/></View>}
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
          <FlatList ref={flatListRef} style={styles.flatList} contentContainerStyle={styles.sheetListView} data={sheets.sort((a, b) => (isActive(a.id) === isActive(b.id)) ? 0 : isActive(a.id) ? -1 : 1)} renderItem={renderSheet} keyExtractor={(item) => 'list-item-' + item.id}/>
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
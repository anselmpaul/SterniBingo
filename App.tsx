import React, {useEffect, useRef, useState} from 'react';
import {
	Button,
	FlatList,
	Modal,
	NativeSyntheticEvent,
	Text,
	TextInput,
	TextInputSubmitEditingEventData,
	TouchableOpacity,
	View,
	Image
} from 'react-native';
import {capsCollection, colors, styles} from "./app.styles";
import {bingoCheck, createTheBingoThing, sheets, updateBingoThing} from './sheets';
import {getDataFromStore, saveDataToStore} from "./AsyncStore";

/* TODOs
styling
feedback animations
bingocheck feedback
corner cases: double bingo one cap

firstRun experience

reset theThing when getting or removing card,
then quietly check for bingos again (when adding new card)
 */

type Bingo = {
	id: number,
	combo: Array<number>,
	uuid: string
}

export default function App() {
    const [addCapModalVisible, setAddCapModalVisible] = useState(false);
    const [capsToAdd, setCapsToAdd] = useState<undefined | string>(undefined);
    const [mySheets, setMySheets] = useState<Array<number>>([]);
    const flatListRef = useRef(null);
  	const [myCaps, setMyCaps] = useState<Array<number>>([]);
  	const [theBingoThing, setTheBingoThing] = useState({});
  	const [myBingos, setMyBingos] = useState<Array<Bingo>>([]);

  	useEffect(() => {
		const capsPromise = getDataFromStore('myCaps');
		const sheetsPromise = getDataFromStore('mySheets');
		const bingosPromise = getDataFromStore('myBingos');
		Promise.all([capsPromise, sheetsPromise, bingosPromise]).then(storeData => {
			const caps = storeData[0];
			const storedSheets = storeData[1];
			const bingos = storeData[2];
			if (caps) {
				setMyCaps(caps);
			}

			if (storedSheets) {
				setMySheets(storedSheets);
				const initialThing = createTheBingoThing(sheets.filter(sheet => storedSheets.includes(sheet.id)));
				const updatedThing = updateBingoThing(caps, initialThing);
				setTheBingoThing(updatedThing);
			}

			if (bingos) {
				setMyBingos(bingos);
			}
		}, error => console.log(error));

		 // reset saved data during dev:
	  	 // saveDataToStore('myCaps', []);
		 // saveDataToStore('mySheets', []);
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
		newCapsAsInts.map(cap => {
			const result = bingoCheck(cap, theBingoThing, myCaps);
			setTheBingoThing(result.updatedBingoThing);
			console.log('result', result);
			if (result.isBingo && result.sheet !== undefined && result.bingoCombo) {
				const bingos = [...myBingos, {
					id: result.sheet,
					combo: result.bingoCombo
				}];
				setMyBingos(bingos);
				saveDataToStore('myBingos', bingos);
			}
		});
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

  const handleResolveBingo = (bingo: Bingo) => () => {
  	// remove sheet from mySheets
	  const index = mySheets.findIndex(e => e === bingo.id);
	  const newSheets = ([...mySheets.slice(0, index), ...mySheets.slice(index + 1, mySheets.length)]);
	  setMySheets(newSheets);
	  saveDataToStore('mySheets', newSheets);

	  // remove caps from myCaps
	  let newCaps = Array.from(myCaps);
	  bingo.combo.map(num => {
	  	const index = newCaps.findIndex(e => e === num);
	  	newCaps = ([...newCaps.slice(0, index), ...newCaps.slice(index + 1, newCaps.length)]);
	  });
	  console.log(newCaps);
	  setMyCaps(newCaps);
	  saveDataToStore('myCaps', newCaps);

	  // remove bingo from bingostore
	  const newBingos = myBingos.filter(b => b.uuid = bingo.uuid);
	  setMyBingos(newBingos);
	  saveDataToStore('myBingos', newBingos);


	 // update thething
	  setTheBingoThing(updateBingoThing(myCaps, theBingoThing));
  };

  const isActive = (id: number) => mySheets.includes(id);

  const renderSheet = (item: any) => {
      const sheet = item.item;
      const bingosForThisSheet = myBingos.filter(b => b.id === sheet.id);
      return (
        <View style={[styles.sheetWrapper]} key={'sheet' + sheet.id + 'wrapper'}>
          <View style={styles.sheet} key={'sheet' + sheet.id}>
              {sheet.numbers.map((num: number, index: number) =>
                  <View style={isActive(sheet.id) && isChecked(num) ? [styles.sheetNumber, styles.sheetNumberChecked] : styles.sheetNumber} key={'numberView' + sheet.id + num + index}>
                    <Text key={'number' + sheet.id + num + index} >{num.toString()}</Text>
                  </View>
              )}
          </View>
        	{isActive(sheet.id) ? null : <View key={'inactiveSheet' + sheet.id} style={styles.inactiveCard}><Button color={colors.button} title="Karte entsperren" onPress={handleUnlockSheet(sheet.id)}/></View>}
			{bingosForThisSheet.length > 0 ? <View key={'bingoSheet' + sheet.id} style={styles.inactiveCard}>{bingosForThisSheet.map(b => <Button color={colors.button} title="Bingo einlösen!" onPress={handleResolveBingo(b)}/>)}</View> : null}
        </View>);
  };

  const renderMyCaps = () => {
  	const capsCollected: { [cap: number]: Array<number> } = {};
  	myCaps.sort((a, b) => a - b).map(cap => capsCollected[cap] ? capsCollected[cap].push(cap) : capsCollected[cap] = [cap]);
  	return Object.keys(capsCollected).map(cap => {
  		return (
		<View key={'capStack' + cap} style={capsCollection.capsStack}>
			{capsCollected[cap].map((cap: number, index: number) => <Image key={'capStackImage' + cap + index} source={require("./assets/capIcon.png")} style={capsCollection.capIcon}/>)}
			<Text style={capsCollection.text}>{cap}</Text>
		</View>)
	})
  };


  return (
    <View style={styles.container}>
      <Modal
          animationType="fade"
          visible={addCapModalVisible}
		  transparent
		  onRequestClose={() => setAddCapModalVisible(!addCapModalVisible)}
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
		  <View style={styles.contentContainer}>
			  <View style={styles.flatListContainerTest}>
		  		<FlatList
					ref={flatListRef}
					horizontal
					style={styles.flatList}
					contentContainerStyle={styles.flatListContentContainer}
					data={sheets.sort((a, b) => (isActive(a.id) === isActive(b.id)) ? 0 : isActive(a.id) ? -1 : 1)}
					renderItem={renderSheet}
					keyExtractor={(item) => 'list-item-' + item.id}/>
			  </View>
		  	<View style={capsCollection.capsCollection}>
				<Text style={capsCollection.text}>Meine Kronkorken</Text>
				<View style={capsCollection.capsStacks}>
					{renderMyCaps()}
				</View>
			</View>
		  </View>
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
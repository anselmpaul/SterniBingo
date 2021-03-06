import React, {useEffect, useRef, useState} from 'react';
import Collapsible from 'react-native-collapsible';
import {
    Button,
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import {capsCollection, colors, modal, styles} from "./app.styles";
// @ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome';
import {bingoCheck, createTheBingoThing, Result, sheets, updateBingoThing} from './sheets';
import {getDataFromStore, saveDataToStore} from "./AsyncStore";

type Bingo = {
    id: number,
    combo: Array<number>,
    uuid: string
}

export default function App() {
    const [addCapModalVisible, setAddCapModalVisible] = useState(false);
    const [capsToAdd, setCapsToAdd] = useState<Array<number>>([]);
    const [latestCapToAdd, setLatestCapToAdd] = useState('');
    const [mySheets, setMySheets] = useState<Array<number>>([]);
    const flatListRef = useRef(null);
    const capsInputRef = useRef(null);
    const [myCaps, setMyCaps] = useState<Array<number>>([]);
    const [theBingoThing, setTheBingoThing] = useState({});
    const [myBingos, setMyBingos] = useState<Array<Bingo>>([]);
    const [isMyCapsVisible, setMyCapsVisible] = useState(true);
    const iOS = Platform.OS === "ios";

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

    const handleEnterCapsButton = () => {
        setAddCapModalVisible(!addCapModalVisible);
        if (capsInputRef && capsInputRef.current) {
            // @ts-ignore it cannot be null
            capsInputRef.current.focus();
        }
    };

    const resetData = () => {
        setMyCaps([]);
        saveDataToStore('myCaps', []);
        setMySheets([]);
        saveDataToStore('mySheets', []);
        setMyBingos([]);
        saveDataToStore('myBingos', []);
        setTheBingoThing(createTheBingoThing([]));
        ToastAndroid.show('RESET', ToastAndroid.SHORT);
    };

    // this emulates the native splice(), but returns a new array
    const removeFromArray = (element: any, array: Array<any>) => {
        const index = array.findIndex(e => e === element);
        return [...array.slice(0, index), ...array.slice(index + 1, array.length)];
    };

    const getFeedbackMessage = (result: Result) => {
        if (result.isBingo) return 'BINGO!';
        if (result.isPoint) return 'nice!';
        if (result.isDouble) return 'meh...';
        if (result.isBlank) return 'sinnlooos';
        return 'meh';
    };

    const handleSubmitNewCap = () => {
        // const newCap = newCapEvent.nativeEvent.text.match(/\d+/g);
        setCapsToAdd([...capsToAdd, parseInt(latestCapToAdd)]);
        setLatestCapToAdd('');
        if (capsInputRef.current) {
            // @ts-ignore
            capsInputRef.current.focus();
        }
    };

    const handleSubmitNewCaps = () => {
        const matchCapToAdd = latestCapToAdd.match(/\d+/g);
        if (capsToAdd.length > 0 || matchCapToAdd && matchCapToAdd.length > 0) {
            // @ts-ignore matchCappToAdd is not null
            const allCaps = [...myCaps, ...capsToAdd, ...matchCapToAdd.map(e => parseInt(e))];
            setMyCaps(allCaps);
            saveDataToStore('myCaps', allCaps);
            capsToAdd.map(cap => {
                const result = bingoCheck(cap, theBingoThing, myCaps);
                setTheBingoThing(result.updatedBingoThing);
                console.log('result', result);
                handleResult(result);

                ToastAndroid.show(getFeedbackMessage(result), ToastAndroid.SHORT);
            });
        }

        setLatestCapToAdd('');
        setCapsToAdd([]);
        setAddCapModalVisible(!addCapModalVisible);
    };

    const handleResult = (result: Result) => {
        if (result.isBingo && result.sheet !== undefined && result.bingoCombo) {
            const bingos = [...myBingos, {
                id: result.sheet,
                combo: result.bingoCombo,
                uuid: JSON.stringify(result.bingoCombo)
            }];
            setMyBingos(bingos);

            const newSheets = (removeFromArray(result.sheet, mySheets));
            setMySheets(newSheets);

            saveDataToStore('mySheets', newSheets);
            saveDataToStore('myBingos', bingos);
        }

    };

    const handleUnlockSheet = (id: number) => () => {
        const newSheets = [...mySheets, id];
        setMySheets(newSheets);
        saveDataToStore('mySheets', newSheets);
        // reset the bingo thing and check with existing caps
        let newThing = createTheBingoThing(sheets.filter(sheet => newSheets.includes(sheet.id)));
        myCaps.map(cap => {
            const result = bingoCheck(cap, newThing, myCaps);
            newThing = result.updatedBingoThing;

            console.log('result', result);
            handleResult(result);

            if (result.isBingo) {
                ToastAndroid.show(getFeedbackMessage(result), ToastAndroid.SHORT);
            }
        });
        setTheBingoThing(newThing);
        // @ts-ignore
        flatListRef.current.scrollTo({x: newSheets.length - 1, y: 0.5});
    };

    const handleResolveBingo = (bingo: Bingo) => () => {
        // remove caps from myCaps
        let newCaps = Array.from(myCaps);
        bingo.combo.map(num => {
            const index = newCaps.findIndex(e => e === num);
            newCaps = ([...newCaps.slice(0, index), ...newCaps.slice(index + 1, newCaps.length)]);
        });
        setMyCaps(newCaps);
        saveDataToStore('myCaps', newCaps);

        // remove bingo from bingostore
        const newBingos = myBingos.filter(b => b.uuid !== bingo.uuid);
        console.log('new', newBingos);
        setMyBingos(newBingos);
        saveDataToStore('myBingos', newBingos);


        // update thething
        setTheBingoThing(updateBingoThing(myCaps, theBingoThing));
    };

    const isActive = (id: number) => mySheets.includes(id);

    const renderSheet = (item: any) => {
        const sheet = item;
        const bingosForThisSheet = myBingos.filter(b => b.id === sheet.id);
        return (
            <View style={[styles.sheetWrapper]} key={'sheet' + sheet.id + 'wrapper'}>
                <View style={styles.sheet} key={'sheet' + sheet.id}>
                    {sheet.numbers.map((num: number, index: number) =>
                        <View
                            style={isActive(sheet.id) && isChecked(num) ? [styles.sheetNumber, styles.sheetNumberChecked] : styles.sheetNumber}
                            key={'numberView' + sheet.id + num + index}>
                            <Text key={'number' + sheet.id + num + index}
                                  style={isActive(sheet.id) && isChecked(num) ? [styles.sheetNumberText, styles.sheetNumberTextActive] : styles.sheetNumberText}>{num.toString()}</Text>
                        </View>
                    )}
                </View>
                {!isActive(sheet.id) || bingosForThisSheet.length > 0 ?
                    <View key={'inactiveSheet' + sheet.id} style={styles.inactiveCard}>
                        {bingosForThisSheet.length === 0 ?
                            <Button color={iOS ? colors.white : colors.button}
                                    title="Karte entsperren"
                                    onPress={handleUnlockSheet(sheet.id)}/> :
                            bingosForThisSheet.map(b => <Button
                                color={colors.button} title="Bingo einlösen!" onPress={handleResolveBingo(b)}/>)
                        }
                    </View> : null}
            </View>);
    };

    const renderMyCaps = () => {
        const capsCollected: { [cap: number]: Array<number> } = {};
        myCaps.sort((a, b) => a - b).map(cap => capsCollected[cap] ? capsCollected[cap].push(cap) : capsCollected[cap] = [cap]);
        // @ts-ignore no idae
        return Object.keys(capsCollected).map((cap: number) => {
            return (
                <View key={'capStack' + cap} style={capsCollection.capsStack}>
                    <View style={capsCollection.iconStack} key={'capStackIcons' + cap}>
                        {capsCollected[cap].map((cap: number, index: number) =>
                            <Image key={'capStackImage' + cap + index}
                                   source={require("./assets/capIcon.png")}
                                   style={capsCollection.capIcon}/>)}
                    </View>
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
                <View style={modal.modal}>
                    <KeyboardAvoidingView behavior={iOS ? "padding" : "height"}>
                        <View style={modal.capsToAdd}>
                            {capsToAdd.map(cap =>
                                <ImageBackground source={require('./assets/capInside.png')} style={modal.backgroundImageSmall}>
                                    <Text style={modal.capsToAddText}>{cap}</Text>
                                </ImageBackground>)}
                        </View>
                        <View style={modal.latestCapArea}>
                            <View style={modal.latestCapContentContainer}>
                                <ImageBackground source={require('./assets/capInside.png')} style={modal.backgroundImage}>
                                    <TextInput
                                        multiline
                                        keyboardType={'numeric'}
                                        autoFocus={true}
                                        ref={capsInputRef}
                                        placeholder="0"
                                        value={latestCapToAdd}
                                        onChangeText={text => setLatestCapToAdd(text)}
                                        onSubmitEditing={handleSubmitNewCaps}
                                        style={modal.input}
                                        maxLength={2}
                                    />
                                </ImageBackground>
                            </View>
                        </View>
                        <View style={modal.buttons}>
                            <TouchableOpacity onPress={handleSubmitNewCap} style={modal.addAnother} disabled={latestCapToAdd.length === 0}>
                                <Text style={latestCapToAdd.length === 0 ? [styles.buttonText, styles.buttonTextDisabled] : styles.buttonText}>noch einer!</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[modal.addAnother, modal.submit]}>
                                <Text style={styles.buttonText} onPress={handleSubmitNewCaps}>fertig.</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </Modal>

            <View style={styles.main}>
                <TouchableWithoutFeedback onLongPress={resetData}>
                    <View style={styles.headlineWrapper}>
                        <Image style={styles.headlineIcon} source={require('./assets/icon.png')}/>
                        <Text style={styles.headline}>SterniBingo</Text>
                        <Image style={styles.headlineIcon} source={require('./assets/icon.png')}/>
                    </View>
                </TouchableWithoutFeedback>
                <ScrollView style={styles.contentScrollContainer}>
                    <View style={styles.contentContainer}>
                        <View style={styles.flatListContainerTest}>
                            <ScrollView
                                ref={flatListRef}
                                horizontal
                                nestedScrollEnabled
                                style={styles.flatList}
                                contentContainerStyle={styles.flatListContentContainer}
                                //data={sheets.sort((a, b) => (isActive(a.id) === isActive(b.id)) ? 0 : isActive(a.id) ? -1 : 1)}
                                //renderItem={renderSheet}
                                //keyExtractor={(item) => 'list-item-' + item.id}
                            >
                                {sheets.sort((a, b) => (isActive(a.id) === isActive(b.id)) ? 0 : isActive(a.id) ? -1 : 1).map(sheet => renderSheet(sheet))}
                            </ScrollView>
                        </View>
                        <View style={capsCollection.capsCollection}>
                            <TouchableOpacity onPress={() => setMyCapsVisible(!isMyCapsVisible)} style={capsCollection.headerWrapper}>
                                <Icon name={isMyCapsVisible ? "chevron-up" : "chevron-down"} color="white" />
                                <Text style={[capsCollection.text, capsCollection.headline]}>Kronkorkensammlung</Text>
                            </TouchableOpacity>
                            <Collapsible collapsed={!isMyCapsVisible}>
                                <View style={capsCollection.capsStacks}>
                                    {renderMyCaps()}
                                </View>
                            </Collapsible>
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity
                    style={styles.addCapsButton}
                    onPress={handleEnterCapsButton}
                >
                    <Text style={styles.buttonText}>PROST!</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
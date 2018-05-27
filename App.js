import React from 'react';
import { Text, View, TextInput, TouchableHighlight, TouchableOpacity, ScrollView} from 'react-native';
import BingoSheet from './components/BingoSheet';
import Modal from "react-native-modal";
import styles, {colors} from './app.style';
import { Pages } from 'react-native-pages';


// TODO: save app state persistent
// TODO: apply general sternbung CI styling
// TODO: implement Feedback "Nice!" "Meh" "Bingo!"
// TODO: overlay for deactivated cards with note in middle - blur? button?


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collection: [1, 1, 2, 2, 2, 1, 5, 15, 32, 91, 87],
            text: 'placeholder',
            input: null,
            activeSheets: [true, false, false, false, false],
            isModalVisible: false,
            isModalFeedback: false,
            sheets: [
                [
                    [[15, false], [28, false], [67, false], [43, false], [10, false]],
                    [[9, false], [32, false], [55, false], [83, false], [99, false]],
                    [[76, false], [42, false], [91, false], [17, false], [72, false]],
                    [[63, false], [36, false], [48, false], [3, false], [22, false]],
                    [[50, false], [88, false], [60, false], [23, false], [87, false]],
                ],
                [
                    [[68, false], [41, false], [4, false], [15, false], [90, false]],
                    [[33, false], [25, false], [57, false], [74, false], [48, false]],
                    [[16, false], [65, false], [42, false], [96, false], [81, false]],
                    [[59, false], [87, false], [30, false], [21, false], [85, false]],
                    [[83, false], [11, false], [69, false], [44, false], [39, false]],
                ],
                [
                    [[15, false], [28, false], [67, false], [43, false], [10, false]],
                    [[9, false], [32, false], [55, false], [83, false], [99, false]],
                    [[76, false], [42, false], [91, false], [17, false], [72, false]],
                    [[63, false], [36, false], [48, false], [3, false], [22, false]],
                    [[50, false], [88, false], [60, false], [23, false], [87, false]],
                ],
                [
                    [[15, false], [28, false], [67, false], [43, false], [10, false]],
                    [[9, false], [32, false], [55, false], [83, false], [99, false]],
                    [[76, false], [42, false], [91, false], [17, false], [72, false]],
                    [[63, false], [36, false], [48, false], [3, false], [22, false]],
                    [[50, false], [88, false], [60, false], [23, false], [87, false]],
                ],
                [
                    [[15, false], [28, false], [67, false], [43, false], [10, false]],
                    [[9, false], [32, false], [55, false], [83, false], [99, false]],
                    [[76, false], [42, false], [91, false], [17, false], [72, false]],
                    [[63, false], [36, false], [48, false], [3, false], [22, false]],
                    [[50, false], [88, false], [60, false], [23, false], [87, false]],
                ]
            ]
        };
    }

    componentDidMount() {
        // mark all already collected caps in active sheets
        this.state.activeSheets.map(sheet => {
            if (sheet === true) {
                this.checkCapInSheet(this.state.collection);
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.appContent}>
                    <Text style={styles.headline}>Sternburg Bingo</Text>
                    <View style={styles.pagesContainer}>
                        <Pages indicatorColor={colors.background}>
                            {this.renderSheets(this.state.sheets)}
                        </Pages>
                    </View>
                    <Text style={styles.smallHeadline}>gesammelte Kronkorken:</Text>

                    <View style={styles.collection}>
                        {this.renderCollection(this.state.collection)}
                    </View>
                </ScrollView>
                <Modal
                    isVisible={this.state.isModalVisible}
                    onBackdropPress={this.toggleModal}
                    onBackButtonPress={this.toggleModal}
                    onShow={this.state.isModalFeedback ? null : () => { this.textInput.focus(); }}
                >
                    <View style={this.state.isModalFeedback ? styles.feedbackModal : styles.modal}>
                        {this.state.isModalFeedback ?
                                <Text style={styles.bingoText}>BINGO!</Text>
                            :
                            <View>
                                <Text style={styles.modalHeadline}>Einen oder mehrere Kronkorken hinzufügen</Text>
                                <TextInput
                                    keyboardType="numeric"
                                    value={this.state.input}
                                    onChangeText={input => this.setState({input})}
                                    onSubmitEditing={this.addCap}
                                    style={styles.input}
                                    ref={(ref) => this.textInput = ref }
                                />
                            </View>}
                    </View>
                </Modal>
                <TouchableOpacity style={styles.button} onPress={() => {this.setState({isModalFeedback: false}, this.toggleModal)}}>
                    <Text style={styles.buttonText}>
                        NEUER KRONKORKEN
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };


    addCap = () => {
        // close modal, split string of caps,
        // add to collection, empty input field
        const input = this.state.input;
        this.toggleModal();

        const newCaps = input.split(',');
        const collection = this.state.collection;
        newCaps.map(cap => {
            cap = parseInt(cap);
            collection.push(cap);
        });
        this.setState({collection, input: ''});

        // set values in sheets, check for bingo
        this.checkCapInSheet(newCaps);

    };

    checkCapInSheet = caps => {
        // check if caps are in active sheets, set flags
        const sheets = this.state.sheets;
        const newSheets= sheets;
        caps.map(cap => {
            sheets.map((sheet, sheetIndex) => {
                if (this.state.activeSheets[sheetIndex] === true) {
                    sheet.map((row, rowIndex) => {
                        row.map((cell, cellIndex) => {
                            cap = parseInt(cap);
                            if (cell[0] === cap) {
                                newSheets[sheetIndex][rowIndex][cellIndex][1] = true;
                                this.setState({sheets: newSheets});
                                this.bingoChecker(sheetIndex);
                            }
                        });
                    });
                }
            });
        });
    };

    bingoChecker = sheetIndex => {

        const sheet = this.state.sheets[sheetIndex];

        // check horizontally
        outerLoop:
            for (let x = 0; x < 5; x++) {
                for (let y = 0; y < 5; y++) {
                    if (sheet[x][y][1] === false) {
                        break;
                    } else if (y === 4) {
                        this.bingo('horizontal', x, sheetIndex);
                        break outerLoop;
                    }
                }
            }

        // check vertically
        outerLoop:
            for (let y = 0; y < 5; y++) {
                for (let x = 0; x < 5; x++) {
                    if (sheet[x][y][1] === false) {
                        break;
                    } else if (x === 4) {
                        this.bingo('vertical', y, sheetIndex);
                        break outerLoop;
                    }
                }
            }

        // check diagonally down (top-left to bottom-right)
        for (let x = 0; x < 5; x++) {
            if (sheet[x][x][1] === false) {
                break;
            } else if (x === 4) {
                this.bingo('diagDown', x, sheetIndex);
                break;
            }
        }

        // check diagonally up (top-right to bottom-left)
        for (let x = 0; x < 5; x++) {
            if (sheet[4 - x][x][1] === false) {
                break;
            } else if (x === 4) {
                this.bingo('diagUp', x, sheetIndex);
                break;
            }
        }
    };

    bingo = (dir, location, sheet) => {
        console.log('bingo!', dir, location);
        // show bingo Feedback
        const self = this;
        this.setState({isModalFeedback: true}, function() {
            self.toggleModal();
        });
        setTimeout(function () {
                self.toggleModal();
            }, 3000
        );

        // remove caps from bingo from collection and sheet
        let collection = this.state.collection;
        if (dir === 'horizontal') {
            for (let y = 0; y < 5; y++) {
                collection = this.removeCap(location, y, sheet, collection);
            }
        } else if (dir === 'vertical') {
            for (let x = 0; x < 5; x++) {
                collection = this.removeCap(x, location, sheet, collection);
            }
        } else if (dir === 'diagDown') {
            for (let i = 0; i < 5; i++) {
                collection = this.removeCap(i, i, sheet, collection);
            }
        } else if (dir === 'diagUp') {
            for (let i = 0; i < 5; i++) {
                collection = this.removeCap(i, 4 - i, sheet, collection);
            }
        }

        // disable the bingo sheet
        const activeSheets = this.state.activeSheets;
        activeSheets[sheet] = false;
        this.setState({collection, activeSheets});
        // TODO: give feedback
    };

    // get number from sheet, remove it from collection,
    // check if still in collection, set flag in sheet
    removeCap = (x, y, sheet, collection) => {
        const sheets = this.state.sheets;
        collection.splice(collection.lastIndexOf(sheets[sheet][x][y][0]), 1);
        if (collection.lastIndexOf(sheets[sheet][x][y][0]) === -1) {
            sheets[sheet][x][y][1] = false;
            this.setState({sheets});
        }
        return collection;
    };

    renderCollection = collection => {
        // create an array of capValue and capCount (eg 5 (3x))
        const countedCollection = [];
        collection.map(cap => {
            countedCollection[cap] = countedCollection[cap] ? countedCollection[cap] + 1 : 1;
        });

        return countedCollection.map((capCount, index) => {
            if (capCount !== undefined) {
                return <Text style={styles.cap} key={'cap-' + index}>{index}{capCount > 1 ? ' (' + capCount + 'x)' : null}</Text>;
            }
        });
    };

    toggleSheet = sheetIndex => {
        // set active sheet flag, check if weve got caps already or remove flags
        const activeSheets = this.state.activeSheets;
        const collection = this.state.collection;
        const sheets = this.state.sheets;

        activeSheets[sheetIndex] = !activeSheets[sheetIndex];

        if (activeSheets[sheetIndex]) {
            this.checkCapInSheet(collection);
        } else {
            sheets[sheetIndex].map((row, rowIndex) => {
                row.map((cell, cellIndex) => {
                    sheets[sheetIndex][rowIndex][cellIndex][1] = false;
                });
            });
        }
        this.setState({activeSheets, sheets});
    };

    renderSheets = sheets => {
        return sheets.map((sheet, index) => {
            const activeSheets = this.state.activeSheets;
            return <TouchableHighlight style={styles.touchable} key={'touchable-sheet-' + index} onLongPress={() => this.toggleSheet(index)}>
                        <BingoSheet key={'sheet-' + index} numbers={sheet} active={activeSheets[index]}/>
            </TouchableHighlight>;
        });
    };

}

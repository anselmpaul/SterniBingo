import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, ScrollView, Button } from 'react-native';
import BingoSheet from './components/BingoSheet';
import PopupDialog, { DialogTitle } from 'react-native-popup-dialog';

// TODO: save app state persistent
// TODO: apply styling
// TODO: highlight collected caps in sheets
// TODO: fix toggle sheet
// TODO: build addCap UI


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collection: [1, 1, 2, 2, 2, 1, 5],
            text: 'placeholder',
            input: '0',
            activeSheets: [true, true, false, false, false],
            sheets: [
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

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Text>Sternburg Bingo</Text>
                    <Text>Bier?</Text>
                    <ScrollView horizontal={true}>
                        {this.renderSheets(this.state.sheets)}
                    </ScrollView>
                    <Text>Deine Kronkorken:</Text>
                    {this.renderCollection(this.state.collection)}
                </ScrollView>
                <PopupDialog
                    dialogTitle={<DialogTitle title="Dialog Title" />}
                    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                >
                    <View>
                        <Text>Hello</Text>
                    </View>
                </PopupDialog>
                /*<Button title="Neuer Kronkorken" onPress={() => {
                    this.popupDialog.show();}} />*/
            </View>
        );
    }

    addCap = input => {
        // TODO: add to collection
        const collection = this.state.collection;
        collection.push(input);
        this.setState({collection});

        // TODO what is this?
        /*checkSheets.map((sheet, index) => {
            if (this.state.activeSheets[sheet] === true) {
                sheet.map(row => {
                    row.map(cell => {
                        if (cell[0] === input) {
                            cell[1] = true;
                            this.bingoChecker(index);
                        }
                    });
                });
            }
        });*/
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
            if (sheet[x][4 - x]) {
                break;
            } else if (x === 4) {
                this.bingo('diagUp', x, sheetIndex);
                break;
            }
        }
    };

    bingo = (dir, location, sheet) => {
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

        const activeSheets = this.state.activeSheets;
        activeSheets[sheet] = false;
        this.setState({collection, activeSheets});
        // TODO: yeah boi!
    };

    // get number from sheet, remove it from collection, check if still in collection, set flag in sheet
    removeCap = (x, y, sheet, collection) => {
        const sheets = this.state.sheets;
        collection.splice(collection.findIndex(sheets[sheet][x][y][0]), 1);
        if (collection.findIndex(sheets[sheet][x][y][0]) === -1) {
            sheets[sheet][x][y][1] = false;
            this.setState({sheets});
        }
        return collection;
    };

    renderCollection = collection => {
        const countedCollection = [];
        collection.map(cap => {
            countedCollection[cap] = countedCollection[cap] ? countedCollection[cap] + 1 : 1;
        });

        return countedCollection.map((capCount, index) => {
            if (capCount !== undefined) {
                return <Text key={'cap-' + index}>{index} {capCount > 1 ? '(' + capCount + 'x)' : null}</Text>;
            }
        });
    };

    toggleSheet = sheetIndex => {
        const activeSheets = this.state.activeSheets;
        const collection = this.state.collection;
        const sheets = this.state.sheets;
        console.log('tap tap tap');

        //console.log('activeSheets:', activeSheets, 'collection:', collection, 'sheets:', sheets);

        /*
        activeSheets[sheetIndex] = !activeSheets[sheetIndex];
        if (activeSheets[sheetIndex]) {
            sheets[sheetIndex].map(row => {

                row.map(cell => {
                    console.log('cell:', cell);
                    /*if (collection.find(cell[0]) === undefined) {
                        sheets[sheetIndex][row][cell][1] = true;
                    }
                })
            });
            this.bingoChecker(sheetIndex);
        }
        this.setState({activeSheets, sheets});*/
    };

    renderSheets = sheets => {
        return sheets.map((sheet, index) => {
            const activeSheets = this.state.activeSheets;
            return <TouchableHighlight style={styles.touchable} key={'touchable-sheet-' + index} onLongPress={this.toggleSheet(index)}><BingoSheet key={'sheet-' + index}
                                                                                    numbers={sheet}
                                                                                    active={activeSheets[index]}/></TouchableHighlight>
        });
    };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    touchable: {
      backgroundColor: 'red'
    }
});

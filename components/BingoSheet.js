import React from 'react';
import {Text, View} from 'react-native';
import PropTypes from 'prop-types';
import styles from './../app.style';
import { Table, TableWrapper, Cell } from 'react-native-table-component';

class BingoSheet extends React.Component {

    static propTypes = {
        numbers: PropTypes.array,
        active: PropTypes.bool
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={this.props.active ? styles.sheetContainerActive : styles.sheetContainerInactive}>
                <Table borderStyle={ styles.tableBorder } style={ styles.table }>
                    {
                        this.props.numbers.map((rowData, index) => (

                            <TableWrapper key={index} style={styles.row}>
                                {
                                    rowData.map((cellData, cellIndex) => (
                                        <Cell key={cellIndex} data={cellData[0]} style={cellData[1] ? styles.checkedCell : styles.cell} textStyle={styles.tableText}/>
                                    ))
                                }
                            </TableWrapper>
                        ))
                    }
                </Table>
                {this.props.active?
                    /* <Text style={styles.inactiveNote}>zum Deaktivieren Karte gedrückt halten</Text> */ null:
                    <Text style={styles.inactiveNote}>zum Aktivieren Karte gedrückt halten</Text>
                }
            </View>
        );
    }
}

export default BingoSheet;
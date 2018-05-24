import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import styles from './../app.style';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

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
                <Table borderStyle={ styles.tableBorder }>
                    <Rows data={this.props.numbers}  textStyle={styles.textDark}/>
                </Table>
                {this.props.active?
                    <Text style={styles.inactiveNote}>zum Deaktivieren Karte gedrückt halten</Text>:
                    <Text style={styles.inactiveNote}>zum Aktivieren Karte gedrückt halten</Text>
                }
            </View>
        );
    }
}

export default BingoSheet;
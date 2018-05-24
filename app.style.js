import { StyleSheet, Dimensions } from 'react-native';

export const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export const colors = {
    black: '#1a1917',
    gray: '#bbb',
    white: '#fff',
    background: '#DE0000',
    button: '#800000',
    lightGreyBackground: '#ddd',
    lightBackground: '#ff4d4d'
};

export const sizes = {
    sheetWidth: viewportWidth - (15 * 2),
    sheetHeight: viewportWidth -(15 * 2),
    small: 5,
    medium: 10,
    large: 20,
    buttonHeight: 50
};

export default StyleSheet.create({
    container: {
        paddingTop: 30,
        flex: 1,
        backgroundColor: colors.background,
        // fontFamily: 'Verdana',
        justifyContent: 'center',
    },
    appContent: {
        padding: 10,
    },
    touchable: {
    },
    headline : {
        color: colors.white,
        fontSize: 30,
        textAlign: 'center',
        paddingBottom: sizes.medium
    },
    text: {
        color: colors.white
    },
    tableText: {
        color: colors.black,
        textAlign: 'center',
        fontSize: 30,
        fontWeight: '100',
        padding: sizes.small
    },
    modal: {
        flex: 0,
        backgroundColor: colors.lightGreyBackground,
        padding: sizes.medium
    },
    sheetContainerActive: {
        flex: 0,
        padding: sizes.small,
        margin: sizes.small,
        backgroundColor: colors.white,
        width: sizes.sheetWidth,
        height: sizes.sheetHeight
    },
    sheetContainerInactive: {
        flex: 0,
        padding: sizes.small,
        margin: sizes.small,
        backgroundColor: colors.gray,
        width: sizes.sheetWidth,
        height: sizes.sheetHeight
    },
    inactiveNote: {
        fontStyle: 'italic',
        margin: 'auto',
        textAlign: 'center',
        padding: sizes.small
    },
    tableBorder: {
        borderWidth: 1,
        borderColor: colors.black
    },
    table: {
        flex: 1
    },
    button: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.button,
        height: sizes.buttonHeight
    },
    buttonText: {
        color: colors.white,
        fontWeight: '500'
    },
    row: {
        flexDirection: 'row',
        flex: 1
    },
    checkedCell: {
        backgroundColor: colors.lightBackground,
        flex: 1
    },
    cell: {
        flex: 1,
        flexShrink: 0
    }
});
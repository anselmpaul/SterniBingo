import { StyleSheet, Dimensions } from 'react-native';

export const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export const colors = {
    black: '#1a1917',
    gray: '#bbb',
    white: '#fff',
    background: '#DE0000',
    button: '#800000',
    lightGreyBackground: '#ddd',
    lightBackground: '#ff4d4d',
    darkTransparent: 'rgba(0, 0, 0, 0.8)'
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
    //
    // GENERAL
    //
    container: {
        paddingTop: 30,
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'center',
    },
    appContent: {
        padding: 10,
    },
    modal: {
        flex: 0,
        backgroundColor: colors.lightGreyBackground,
        padding: sizes.medium
    },
    feedbackModal: {
        backgroundColor: 'rgba(0, 0, 0, 0)'
    },
    collection: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    //
    // TEXT
    //
    text: {
        color: colors.white
    },
    textCentered: {
        color: colors.white,
        textAlign: 'center'
    },
    tableText: {
        color: colors.black,
        textAlign: 'center',
        fontSize: 30,
        fontWeight: '100',
        padding: sizes.small
    },
    headline: {
        color: colors.white,
        fontSize: 30,
        textAlign: 'center',
        paddingBottom: sizes.medium
    },
    smallHeadline: {
        color: colors.white,
        fontSize: 20,
        textAlign: 'center',
        padding: sizes.small
    },
    bingoText: {
        color: colors.white,
        fontSize: 36,
        textAlign: 'center',
        fontStyle: 'italic',
        fontWeight: 'bold'
    },
    cap: {
        color: colors.white,
        borderRadius: sizes.large * 2,
        borderWidth: 1,
        minWidth: sizes.large * 2,
        minHeight: sizes.large * 2,
        borderColor: colors.black,
        backgroundColor: colors.black,
        flex: 0,
        padding: sizes.medium,
        margin: sizes.small,
        textAlign: 'center'
    },
    input: {
        textAlign: 'center'
    },
    modalHeadline: {
        textAlign: 'center',
        fontSize: 16,
        fontStyle: 'italic'
    },
    //
    // SHEETS
    //
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
    inactiveOverlay: {
        margin: 'auto',
        padding: sizes.small,
        backgroundColor: colors.darkTransparent,
        position: 'absolute',
        height: sizes.sheetHeight,
        width: sizes.sheetWidth,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    //
    // SHEET TABLE
    //
    tableBorder: {
        borderWidth: 1,
        borderColor: colors.black
    },
    table: {
        flex: 1
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
    },
    //
    // BUTTON
    //
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
        fontWeight: '500',
        fontSize: 16
    }
});
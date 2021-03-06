import {Dimensions, StyleSheet} from "react-native";

export const colors = {
    red: '#c01209',
    white: '#fff',
    button: '#800000',
    black: '#000'
};

const sizes = {
    buttonHeight: 70
};

const fontSizes = {
    headline: 40,
    button: 16,
    sheetNumber: 20,
    text: 16,
    input: 30,
};

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.red,
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        width: '100%'
    },
    main: {
        flex: 1,
        justifyContent: 'space-between',
        height: '100%',
        paddingTop: 50,
        width: '100%',
        alignItems: 'center'
    },
    contentContainer: {
        flexDirection: 'column',
        width: '100%'
    },
    contentScrollContainer: {
        marginTop: 40,
        marginBottom: 10,
        height: '80%',
        width: '100%',
    },
    flatList: {
        backgroundColor: colors.button,
        width: '100%'
    },
    flatListContentContainer: {
        flex: 0,
        alignItems: 'center',
        paddingLeft: Dimensions.get('screen').width * 0.025,
        paddingRight: Dimensions.get('screen').width * 0.05
    },
    flatListContainerTest: {
        height: Dimensions.get('screen').width,
        width: '100%'
    },
    sheet: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderColor: colors.black,
        backgroundColor: colors.white,
        aspectRatio: 1
    },
    sheetWrapper: {
        height: 'auto',
        backgroundColor: colors.white,
        borderRadius: 8,
        padding: 10,
        marginLeft: Dimensions.get('screen').width * 0.025,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
        width: Dimensions.get('screen').width * 0.9,
        aspectRatio: 1
    },
    sheetNumber: {
        width: '20%',
        height: '20%',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderColor: colors.black,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sheetNumberChecked: {
        backgroundColor: colors.red,
    },
    sheetNumberText: {
        fontSize: fontSizes.sheetNumber,
        fontWeight: '400'
    },
    sheetNumberTextActive: {
        color: colors.white
    },
    addCapsButton: {
        display: 'flex',
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.button,
        height: sizes.buttonHeight,
    },
    buttonText: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: fontSizes.button
    },
    buttonTextDisabled: {
        color: 'grey'
    },
    headlineWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headlineIcon: {
        width: 70,
        height: 70
    },
    headline: {
        textAlign: 'center',
        color: colors.white,
        fontSize: fontSizes.headline,
        fontWeight: '400'

    },
    inactiveCard: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        position: 'absolute',
        top: 10,
        left: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inactiveCardText: {
        color: colors.white
    }
});

export const capsCollection = StyleSheet.create({
    capIcon: {
        width: 30,
        height: 10,
        marginLeft: 1,
        marginRight: 1
    },
    capsCollection: {
        padding: 10,
        alignItems: 'center'
    },
    text: {
        color: colors.white,
        fontSize: fontSizes.text
    },
    headerWrapper: {
        borderBottomWidth: 1,
        borderColor: colors.button,
        width: '90%',
        alignItems: 'center',
        paddingBottom: 3,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    headline: {
        fontWeight: 'bold',
        marginLeft: 5
    },
    iconStack: {
        maxHeight: 30,
        flexWrap: 'wrap',
        flexDirection: 'column-reverse'
    },
    capsStacks: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
        paddingTop: 3
    },
    capsStack: {
        padding: 3,
        alignItems: 'center'
    }
});

export const modal = StyleSheet.create({
   backgroundImage: {
       flex: 1,
       resizeMode: "cover",
       justifyContent: "center",
       alignItems: 'center',
       width: 200,
       height: 200,
   },
    backgroundImageSmall: {
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: 'center',
    },
    input: {
        fontSize: fontSizes.input,
        height: 100,
        textAlign: 'center',
        color: colors.white,
        width: 100
    },
    modal: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    latestCapContentContainer: {
       height: 200,
        alignItems: 'center'
    },
    capsToAdd: {
       marginTop: 10,
       flexDirection: 'row',
        minHeight: 50,
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    capsToAddText: {
       color: colors.white
    },
    latestCapArea: {
       flexGrow: 1,
        justifyContent: 'center'
    },
    addAnother: {
       // backgroundColor: colors.red,
        display: 'flex',
        width: '50%',
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: sizes.buttonHeight,
    },
    buttons: {
       flexDirection: 'row'
    },
    submit: {
       // backgroundColor: 'green'
    }
});
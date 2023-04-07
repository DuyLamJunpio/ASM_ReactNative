import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgray',
    },
    deleteBox: {
        marginTop: 20,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 200,
    },
    updateBox: {
        marginTop: 20,
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 200,
    },
    baiViet: {
        paddingHorizontal: 10,
        marginTop: 2,
        backgroundColor: '#FFF',
        width: SCREEN_WIDTH,
        height: 'auto'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 17,
        marginLeft:5
    },
    content: {
        fontSize: 18,
        marginTop: 5
    },
    image: {
        marginTop: 5,
        width: '100%',
        height: 250,
        marginBottom: 10
    },
    avt: {
        marginTop:5,
        width: 50,
        height: 50,
        borderRadius: 100
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 17,
        marginLeft: 5
    },
});

export default styles;
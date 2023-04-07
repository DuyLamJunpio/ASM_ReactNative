import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import React, { Component, useState, useRef, useEffect } from 'react'
import { BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';


import {
    StyleSheet, Text, View, Image,
    TouchableWithoutFeedback, StatusBar,
    TextInput, SafeAreaView, Keyboard,
    TouchableOpacity, KeyboardAvoidingView, Dimensions, ScrollView, Button
} from 'react-native'

const text = [
    'Publish Your \nPassion in Own Way \nIt\'s Free',
    'Life is a story.\nMake yours the best \nSeller.',
    'Life is short.\nSmile while you still \nHave teeth!'
]

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function Login(props) {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.dispatch(DrawerActions.jumpTo('Home'));
        navigation.openDrawer(); // mở drawer navigation
    };

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        return () => backHandler.remove();
    }, []);

    const handleBackButton = () => {

        handleGoBack();

        return true;
    };


    const [imgActive, setImgActive] = useState(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const txtPassword = useRef();

    onchange = (nativeEvent) => {
        if (nativeEvent) {
            const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
            if (slide != imgActive) {
                setImgActive(slide);
            }
        }
    }

    const getData = async () => {
        let url_api = 'http://44.168.0.102:3000/users';
        try {
            let check = false;
            let user;
            const response = await fetch(url_api);  // lấy dữ liệu về
            const jsonSP = await response.json(); // chuyển dữ liệu thành đối tượng json
            if (email == '' || password == '') {
                alert('Chưa nhập tài khoản hoặc mật khẩu!')
            } else {
                for (var i = 0; i < jsonSP.length; i++) {
                    if (jsonSP[i].email == email && jsonSP[i].password == password) {
                        check = true;
                        user = jsonSP[i]
                    }
                }
                if (check == true) {
                    props.userComp(user);
                    props.checkLogin(true)
                    handleGoBack();
                    check = false
                } else {
                    alert('Sai tài khoản hoặc mật khẩu!')
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={'light-content'} />
            <View style={styles.container}>
                <KeyboardAvoidingView behavior='padding' style={styles.container}>
                    <View style={styles.startContainer}>
                        <Text style={styles.getStarted}>Account Information</Text>
                        <View style={styles.warp}>
                            <ScrollView
                                onScroll={({ nativeEvent }) => onchange(nativeEvent)}
                                showsHorizontalScrollIndicator={false}
                                pagingEnabled
                                horizontal
                                style={styles.warp}
                            >
                                {
                                    text.map((e, index) => <View style={styles.warpScroll}>
                                        <Text key={e} style={styles.textSlide}>{text[index]}</Text>
                                    </View>)
                                }
                            </ScrollView>
                            <View style={styles.warpDot}>
                                {
                                    text.map((e, index) => <Text
                                        key={e}
                                        style={imgActive == index ? styles.dotActive : styles.dot}>
                                        ●
                                    </Text>)
                                }
                                <View style={styles.infoContainer}>

                                    <TextInput style={styles.input}
                                        placeholder="Enter email"
                                        placeholderTextColor='rgba(255,255,255,0.8)'
                                        keyboardType='email-address'
                                        returnKeyType='next'
                                        autoCorrect={false}
                                        onChangeText={((text) => setEmail(text))}
                                        onSubmitEditing={() => txtPassword.current.focus()}
                                    />
                                    <TextInput style={styles.input}
                                        placeholder="Enter password"
                                        placeholderTextColor='rgba(255,255,255,0.8)'
                                        returnKeyType='go'
                                        secureTextEntry
                                        autoCorrect={false}
                                        onChangeText={((text) => setPassword(text))}
                                        ref={txtPassword}
                                    />
                                    <TouchableOpacity style={styles.buttonContainer} onPress={getData}>
                                        <Text style={styles.buttonText}>SIGN IN</Text>
                                    </TouchableOpacity>
                                    <View style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop:60,
                                        flexDirection:'row'
                                    }}>
                                        <Text style={{color:"#eee"}}>Don't have an account?! </Text>
                                        <TouchableOpacity onPress={()=>props.navigation.navigate('Register')}>
                                            <Text style={{color:"#f7c744"}}>Sign Up</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(32,53,70)',
        flexDirection: 'column'
    },
    startContainer: {
        marginHorizontal: 25,
        alignItems: 'flex-start',
        justifyContent: 'center',
        flex: 1
    },
    getStarted: {
        color: '#f7c744',
        fontSize: 12,
        textAlign: 'left',
        opacity: 0.7
    },
    warp: {
        width: '100%',
        height: HEIGHT * 0.25,

    },
    textSlide: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 35
    },
    warpScroll: {
        width: WIDTH - 50,
    },
    warpDot: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignSelf: 'flex-start',
    },
    dotActive: {
        margin: 3,
        color: '#FFF'
    },
    dot: {
        margin: 3,
        color: 'gray'
    },
    txt: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    infoContainer: {
        top: 80,
        position: 'absolute',
        height: 'auto',
        width: WIDTH - 50,
    },
    input: {
        height: 40,
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.2)',
        color: 'gray',
        marginBottom: 10,
        paddingHorizontal: 10
    },
    buttonContainer: {
        backgroundColor: '#f7c744',
        paddingVertical: 15
    },
    buttonText: {
        textAlign: 'center',
        color: 'rgb(32,53,70)',
        fontWeight: 'bold',
        fontSize: 18
    }
});
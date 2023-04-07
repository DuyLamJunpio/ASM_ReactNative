import React, { Component, useState, useRef } from 'react'
import {
    StyleSheet, Text, View, Image,
    TouchableWithoutFeedback, StatusBar,
    TextInput, SafeAreaView, Keyboard,
    TouchableOpacity, KeyboardAvoidingView, Dimensions, ScrollView, Switch, Alert, Button
} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function Register(props) {

    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.dispatch(DrawerActions.jumpTo('Login'));
    };

    const txtPassword = useRef();
    const txtPassword2 = useRef();
    const [showModalDialog, setshowModalDialog] = useState(false);
    const txtName = useRef();
    const [email, setEmail] = useState(null);
    const [name, setName] = useState(null);
    const [password, setPassword] = useState(null);
    const [repassword, setRepassword] = useState(null);
    const [avatar, setAvatar] = useState("https://i.pinimg.com/736x/fa/60/51/fa6051d72b821cb48a8cc71d3481dfef--social-networks-avatar.jpg");


    const checkData = () => {
        var checkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email == '' || name == '' || password == '' || repassword == '') {
            alert('Không được để trống!')
        } else if (!checkEmail.test(email)) {
            alert('Sai địa chỉ email!')
        } else if (password.length < 6) {
            alert('Mật khẩu phải từ 6 ký tự trở lên!')
        } else if (password != repassword) {
            alert('Mật khẩu không trùng khớp!')
        } else {
            SaveData()
        }
    }


    const SaveData = () => {
        let like = [];
        let following = [];
        let follower = [];
        // 1. tạo obj 
        let objSP = {
            email, name,
            password, avatar, like, following, follower
        };

        //2. Dùng fetch:
        let api_url = 'http://44.168.0.102:3000/users'

        fetch(api_url, {
            method: 'POST', // POST: Thêm mới, PUT: Sửa, DELETE: xóa, GET: lấy thông tin
            headers: { // Định dạng dữ liệu gửi đi
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objSP) // chuyển đối tượng SP thành chuỗi JSON
        })
            .then((response) => {
                //console.log(response.status);
                // nếu log là 201 thì là tạo thành công
                if (response.status == 201)
                    alert("Đăng ký thành công");
                handleGoBack()

            })
            .catch((err) => {  // catch để bắt lỗi ngoại lệ
                console.log(err);
            });


    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={'light-content'} />
            <View style={styles.container}>
                <KeyboardAvoidingView behavior='padding' style={styles.container}>
                    <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
                        <View style={styles.startContainer}>
                            <Text style={styles.getStarted}>Register now</Text>
                            <Text style={styles.textTitle}>Sign Up For Free</Text>

                            <View style={styles.warp}>
                                <View style={styles.infoContainer}>
                                    <TextInput style={styles.input}
                                        placeholder="Enter email"
                                        placeholderTextColor='rgba(255,255,255,0.8)'
                                        keyboardType='email-address'
                                        returnKeyType='next'
                                        autoCorrect={false}
                                        onChangeText={((text) => setEmail(text))}
                                        onSubmitEditing={() => txtName.current.focus()}
                                    />
                                    <TextInput style={styles.input}
                                        placeholder="Enter fullname"
                                        placeholderTextColor='rgba(255,255,255,0.8)'
                                        returnKeyType='go'
                                        autoCorrect={false}
                                        ref={txtName}
                                        onChangeText={((text) => setName(text))}
                                        onSubmitEditing={() => txtPassword.current.focus()}
                                    />
                                    <TextInput style={styles.input}
                                        placeholder="Enter password"
                                        placeholderTextColor='rgba(255,255,255,0.8)'
                                        returnKeyType='next'
                                        secureTextEntry
                                        autoCorrect={false}
                                        ref={txtPassword}
                                        onChangeText={((text) => setPassword(text))}
                                        onSubmitEditing={() => txtPassword2.current.focus()}
                                    />
                                    <TextInput style={styles.input}
                                        placeholder="Comfirm password"
                                        placeholderTextColor='rgba(255,255,255,0.8)'
                                        returnKeyType='go'
                                        secureTextEntry
                                        autoCorrect={false}
                                        onChangeText={((text) => setRepassword(text))}
                                        ref={txtPassword2}
                                    />
                                    <TouchableOpacity style={styles.buttonContainer} onPress={checkData}>
                                        <Text style={styles.buttonText}>SIGN UP</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
                <View style={{
                    flex: 0.1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>
                    <Text style={{ color: "#eee" }}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
                        <Text style={{ color: "#f7c744" }}>Sign In</Text>
                    </TouchableOpacity>
                </View>
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
        fontSize: 15,
        textAlign: 'left',
        opacity: 0.7
    },
    textSignIn: {
        color: '#FFF',
        fontSize: 12,
        textAlign: 'left',
        opacity: 0.7
    },

    signIn: {
        color: 'lightblue',
        fontSize: 15,
    },

    warp: {
        width: '100%',
        height: 'auto',
        marginTop: 40
    },
    textTitle: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 35
    },
    txt: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    infoContainer: {
        top: 10,
        position: 'absolute',
        height: 'auto',
        width: WIDTH - 50,
    },
    input: {
        height: 40,
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.2)',
        color: 'gray',
        marginBottom: 20,
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
    },
    button: {
        left: 160,
        bottom: 22
    }
});
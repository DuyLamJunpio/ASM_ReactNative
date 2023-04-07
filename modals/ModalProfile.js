import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, RefreshControl, FlatList, Modal, Dimensions, Button } from "react-native";
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SCREEN_WIDTH = Dimensions.get('window').width;

const ModalProfile = (props) => {

    const [data, setData] = useState([]); // chứa sản phẩm
    const [showModalDialog, setshowModalDialog] = useState(false);
    // xử lý hiển thị dữ liệu
    const getData = async () => {
        let url_api = 'http://44.168.0.102:3000/blogs?_expand=user';
        let arr = [];
        try {
            const response = await fetch(url_api);  // lấy dữ liệu về
            const jsonSP = await response.json(); // chuyển dữ liệu thành đối tượng json
            if (props.user.id != undefined) {
                for (var i = 0; i < jsonSP.length; i++) {
                    if (jsonSP[i].userId == props.user.id) {
                        arr.push(jsonSP[i])
                    }
                }
            }
            setData(arr)
        } catch (error) {
            console.error(error);
        } finally {
            // kết thúc quá trình thực hiện trong try, dù xảy ra lỗi hay không cũng gọi vào đây
            // đổi trạng thái isLoading là false
            setisReloading(false);
        }
    }

    const renderData = ({ item }) => {

        return (
            <View>
                <View style={styles.baiViet}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={{ uri: item.user.avatar }} style={styles.avt2} />
                        <Text style={styles.name}>{item.user.name}</Text>
                    </View>
                    <Text style={styles.content}>{item.content}</Text>
                    <Image style={styles.image} source={{ uri: item.image }} />
                </View>
            </View>
        );

    }

    const [isReloading, setisReloading] = useState(false)
    const reloadData = React.useCallback(
        () => {
            // đánh dấu trạng thái đang reload để hiển thị quay quay
            setisReloading(true);
            // các công việc xử lý load lại dữ liệu viết ở dưới đây
            getData()
        }

    );

    const UpdateUser = async () => {
        let strKey = 'idUser';
        try {
            const value = await AsyncStorage.getItem(strKey);
            if (value !== null) {
                let url_ = 'http://44.168.0.102:3000/users/' + Number(value);
                try {
                    const response = await fetch(url_);  // lấy dữ liệu về
                    const jsonSP = await response.json(); // chuyển dữ liệu thành đối tượng json
                    let url_api = 'http://44.168.0.102:3000/users/' + Number(value);

                    let email = jsonSP.email;
                    let password = jsonSP.password;
                    let name = jsonSP.name;
                    let admin = jsonSP.admin;
                    let liked = jsonSP.liked;
                    let avatar = jsonSP.avatar;
                    let follow = [];
                    follow.push(props.user.id);

                    let objSP = {
                        email, password, name, admin, liked, avatar, follow
                    };

                    fetch(url_api, {
                        method: 'PUT', // POST: Thêm mới, PUT: Sửa, DELETE: xóa, GET: lấy thông tin
                        headers: { // Định dạng dữ liệu gửi đi
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(objSP) // chuyển đối tượng SP thành chuỗi JSON
                    })
                        .then((response) => {
                        })
                        .catch((err) => {  // catch để bắt lỗi ngoại lệ
                            console.log(err);
                        });

                } catch (error) {
                    //console.error(error);
                }
            }
        } catch (e) {
            // error reading value
            console.log(e);
        }
    }

    return (
        <View>
            <Modal visible={showModalDialog}
                transparent={true}
                animationType="fade"
                onRequestClose={
                    () => {
                        // xảy ra khi bấm nút back trên điện thoại
                        setshowModalDialog(false);
                    }
                }>

                <View style={styles.container}>
                    <View style={{ backgroundColor: 'lightgray', height: 170, flexDirection: 'row' }}>
                        <View style={{ flexDirection: "row" }}>
                            <View style={styles.avt}>
                                <Image source={{ uri: props.user.avatar }} style={styles.avt} />
                            </View>
                        </View>
                        <Text style={styles.title}>{props.user.name}</Text>
                        <View style={{
                            width: 100, alignSelf: "flex-end", right: 70,
                            marginBottom: 75,
                        }}>
                            <Button title="Follow" onPress={UpdateUser} />
                        </View>
                    </View>
                    <FlatList
                        refreshControl={
                            <RefreshControl refreshing={isReloading}
                                onRefresh={reloadData} />
                        }
                        data={data}
                        keyExtractor={(item) => { return item.id }}
                        renderItem={renderData}
                    />
                </View>
            </Modal>
            <Text style={styles.name} onPress={() => { setshowModalDialog(true) }}>{props.user.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        top: 0,
        flex: 1,
        backgroundColor: 'lightgray',
    },
    avt: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 30,
        width: 150,
        height: 150
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
        height: 'auto',
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
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 130,
        marginLeft: 20,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 17,
        marginLeft: 5
    },
    avt2: {
        marginTop: 5,
        width: 50,
        height: 50,
        borderRadius: 100
    }
});

export default ModalProfile
import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, ActivityIndicator, FlatList, Alert, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import styles from "../styles/MyStyles";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Profile(props) {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.dispatch(DrawerActions.jumpTo('Home'));
        navigation.openDrawer(); // đóng drawer navigation
    };
    const handleLogOut = () => {
        props.LogOut(false);
        navigation.dispatch(DrawerActions.jumpTo('Home'));
        navigation.openDrawer(); // đóng drawer navigation
    };

    const [isLoading, setisLoading] = useState(true);
    const [data, setData] = useState([]); // chứa sản phẩm
    // xử lý hiển thị dữ liệu
    const getData = async () => {
        let url_api = 'http://44.168.0.102:3000/blogs/?userId=' + props.dataUser.id +'&_sort=id&_order=desc';

        try {
            const response = await fetch(url_api);  // lấy dữ liệu về
            const jsonSP = await response.json(); // chuyển dữ liệu thành đối tượng json
            setData(jsonSP);
        } catch (error) {
            console.error(error);
        } finally {
            // kết thúc quá trình thực hiện trong try, dù xảy ra lỗi hay không cũng gọi vào đây
            // đổi trạng thái isLoading là false
            setisLoading(false);
        }
    }

    const renderData = ({ item }) => {

        const showAlert = () => {
            Alert.alert(
                'Thông báo',
                'Bạn có muốn xóa hay không ?',
                [
                    // mảng nút bấm
                    {
                        text: 'Yes',
                        onPress: () => { deleteData() }
                    },
                    {
                        text: 'No'
                    }
                ],
                {
                    cancelable: true,
                    onDismiss: () => { }
                }
            )
        }

        const deleteData = () => {
            console.log('id', item.id);
            let url_api = 'http://44.168.0.102:3000/blogs/' + 100000000;

            fetch(url_api, {
                method: 'DELETE', // POST: Thêm mới, PUT: Sửa, DELETE: xóa, GET: lấy thông tin
            })
            .then((res) => res.json())
            .then((json) => console.log(json))
                .catch((err) => {  // catch để bắt lỗi ngoại lệ
                    console.log(err);
                });
        }

        const chuyenTrang = () => {
            props.blogComp(item)
            navigation.navigate('EditContent');
        }

        let img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAgVBMVEXw8PABFicAAAD39/cACyD6+fpJUVgAABiLjpHS0tP8/PzOzs8AABXs7e0ADyIAAAacnqAtOUMAABEcKjamp6pYX2UdJTCtsLN8gIQAABvk5eYAAA3Bw8UpND4gLTkyPUZqbnOWmZyGiYx6foMXHywYHyxrcHW4u73a3N1ASFEAECD3KgboAAACYElEQVR4nO3c63KaQBiAYWAxKBVijEbRYAxJc+j9X2DBnhbcTpFhT/Z9fjIfie+M4mGBIAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwxcTuiy6ZsB138hjpM7Md10jLONSlWE9s59XS+1xbYXzjTGFyO77CpcL5KsjGFkwLhwqXq/EPemKaUGgIhUNRaA6FQ1FozjUWirTlUBdu0lHIPRYLxba8kzzVn5Dzw90YyqP0VLBXKKoob2m+BOTj2B//FNkrnNzo+z6YP6SuFMbz8dV/Nr93pTBeL8Z3LBwqTKapGFu6WjpVqOH9j0JjKByKQnMoHIpCcy4rFGnvST8LxXNZ9R31slBsojh67jnrZ+FLUX9K7/coPS3cUijNUmgMhTIKW7MUGkOhjMLWLIXGUCijsDXrcWH678HAk8LztYgfhd3NyoftQ6GoXh86XptVwe7Gr2/KvT0ofI/OFnVD5QJxtFDs7kGhWOx7LvUmWz8Lgyy53Xc0C+J5d+M++lDs7UNhkG261nGYf753t+58fR2eH0z/cixV7+tFYdf/8o5P4c9ZCo2hUEZha5ZCYyiUUdiapdAYCmUUtmY7hRM/CqtlWBwvKfz4faX67MXWNaQXnTG0+xYpf7JQaArDXLpS3dp1wBee19b7rgGnwg4vCntTFc6Vv6zqprUwb99SodyN/m960Hr25aG9xmHnthimzi+1h8KhKDSHwqHcKiwqDfcyWc0dKgwLDXdMSkKXCjVxpHBdaCuMSxcKg5mGZ+gvj7bjTkQ200W5OAwAAAAAAAAAAAAAAAAAAAAAAAAAAADganwH5zd6LobMFeIAAAAASUVORK5CYII="
        return (
            <View>
                <View style={styles.baiViet}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={{ uri: props.dataUser.avatar }} style={style.avt2} />
                        <View style={{width:295}}>
                            <Text style={style.name}>{props.dataUser.name}</Text>
                        </View>
                        <View style={{ marginTop: 10, flexDirection: "row" }}>
                            <TouchableOpacity onPress={() => chuyenTrang()}>
                                <Icon name="edit" size={20} color="orange" />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ left: 10 }} onPress={() => showAlert()}>
                                <Icon name="times" size={20} color="red" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={styles.content}>{item.content}</Text>
                    {
                        (item.image == img) ? (
                            <Image />
                        ) : (
                            <Image style={styles.image} source={{ uri: item.image }} />
                        )
                    }
                </View>
            </View>
        );

    }

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            // khi màn hình được hiển thị sẽ gọi vào hàm này
            // gọi hàm load dữ liệu
            getData();
        });

        return unsubscribe;
    }, [props.navigation]);



    return (
        <SafeAreaView style={style.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ backgroundColor: "#FFF" }}>
                    <View style={style.titleBar}>
                        <Ionicons name="ios-arrow-back" size={24} color="#52575D" onPress={handleGoBack}></Ionicons>
                        <MaterialIcons name="logout" size={24} color="#52575D" style={{ marginRight: 10 }} onPress={handleLogOut} />
                    </View>

                    <View style={{ alignSelf: "center" }}>
                        <View style={style.profileImage}>
                            <Image source={{ uri: props.dataUser.avatar }} style={style.image} resizeMode="center"></Image>
                        </View>
                    </View>

                    <View style={style.infoContainer}>
                        <Text style={[style.text, { fontWeight: "200", fontSize: 36, color: "black" }]}>{props.dataUser.name}</Text>
                        <Text style={[style.text, { color: "#AEB5BC", fontSize: 14 }]}>{props.dataUser.email}</Text>
                    </View>

                    <View style={style.statsContainer}>
                        <View style={style.statsBox}>
                            <Text style={[style.text, { fontSize: 24 }]}>{data.length}</Text>
                            <Text style={[style.text, styles.subText]}>Posts</Text>
                        </View>
                        <View style={[style.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                            <Text style={[style.text, { fontSize: 24 }]}>{props.dataUser.follower.length}</Text>
                            <Text style={[style.text, style.subText]}>Followers</Text>
                        </View>
                        <View style={style.statsBox}>
                            <Text style={[style.text, { fontSize: 24 }]}>{props.dataUser.following.length}</Text>
                            <Text style={[style.text, style.subText]}>Following</Text>
                        </View>
                    </View>
                </View>
                <View>

                    {
                        (isLoading) ? (
                            <ActivityIndicator />
                        ) : (
                            <FlatList
                                data={data}
                                keyExtractor={(item) => { return item.id }}
                                renderItem={renderData}
                            />
                        )

                    }


                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: "lightgray"
    },
    text: {
        fontFamily: "HelveticaNeue",
        color: "#52575D"
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
    subText: {
        fontSize: 12,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden",
        borderWidth: 4,
        borderColor: "#eee"
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    statsContainer: {
        backgroundColor: "#FFF",
        paddingVertical: 10,
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32
    },
    statsBox: {
        alignItems: "center",
        flex: 1
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
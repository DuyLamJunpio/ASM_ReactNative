import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, SafeAreaView ,TouchableOpacity, Dimensions, Image } from 'react-native';
import {
    MaterialIcons
  } from "@expo/vector-icons";
import * as React from 'react';
import { useState , useEffect} from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';

const HEIGHT = Dimensions.get('window').height;

const AddContent = (props) => {


    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.dispatch(DrawerActions.jumpTo('Home'));
        navigation.closeDrawer(); // đóng drawer navigation
      };

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        return () => backHandler.remove();
      }, []);
    
      const handleBackButton = () => {
        
        handleGoBack();
    
        return true;
      };

    const [content, setContent] = useState('');
    const [image, setiimg_base64] = useState("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAgVBMVEXw8PABFicAAAD39/cACyD6+fpJUVgAABiLjpHS0tP8/PzOzs8AABXs7e0ADyIAAAacnqAtOUMAABEcKjamp6pYX2UdJTCtsLN8gIQAABvk5eYAAA3Bw8UpND4gLTkyPUZqbnOWmZyGiYx6foMXHywYHyxrcHW4u73a3N1ASFEAECD3KgboAAACYElEQVR4nO3c63KaQBiAYWAxKBVijEbRYAxJc+j9X2DBnhbcTpFhT/Z9fjIfie+M4mGBIAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwxcTuiy6ZsB138hjpM7Md10jLONSlWE9s59XS+1xbYXzjTGFyO77CpcL5KsjGFkwLhwqXq/EPemKaUGgIhUNRaA6FQ1FozjUWirTlUBdu0lHIPRYLxba8kzzVn5Dzw90YyqP0VLBXKKoob2m+BOTj2B//FNkrnNzo+z6YP6SuFMbz8dV/Nr93pTBeL8Z3LBwqTKapGFu6WjpVqOH9j0JjKByKQnMoHIpCcy4rFGnvST8LxXNZ9R31slBsojh67jnrZ+FLUX9K7/coPS3cUijNUmgMhTIKW7MUGkOhjMLWLIXGUCijsDXrcWH678HAk8LztYgfhd3NyoftQ6GoXh86XptVwe7Gr2/KvT0ofI/OFnVD5QJxtFDs7kGhWOx7LvUmWz8Lgyy53Xc0C+J5d+M++lDs7UNhkG261nGYf753t+58fR2eH0z/cixV7+tFYdf/8o5P4c9ZCo2hUEZha5ZCYyiUUdiapdAYCmUUtmY7hRM/CqtlWBwvKfz4faX67MXWNaQXnTG0+xYpf7JQaArDXLpS3dp1wBee19b7rgGnwg4vCntTFc6Vv6zqprUwb99SodyN/m960Hr25aG9xmHnthimzi+1h8KhKDSHwqHcKiwqDfcyWc0dKgwLDXdMSkKXCjVxpHBdaCuMSxcKg5mGZ+gvj7bjTkQ200W5OAwAAAAAAAAAAAAAAAAAAAAAAAAAAADganwH5zd6LobMFeIAAAAASUVORK5CYII=");


    const checkDataContent = () => {
        if(content != '' || image != "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAgVBMVEXw8PABFicAAAD39/cACyD6+fpJUVgAABiLjpHS0tP8/PzOzs8AABXs7e0ADyIAAAacnqAtOUMAABEcKjamp6pYX2UdJTCtsLN8gIQAABvk5eYAAA3Bw8UpND4gLTkyPUZqbnOWmZyGiYx6foMXHywYHyxrcHW4u73a3N1ASFEAECD3KgboAAACYElEQVR4nO3c63KaQBiAYWAxKBVijEbRYAxJc+j9X2DBnhbcTpFhT/Z9fjIfie+M4mGBIAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwxcTuiy6ZsB138hjpM7Md10jLONSlWE9s59XS+1xbYXzjTGFyO77CpcL5KsjGFkwLhwqXq/EPemKaUGgIhUNRaA6FQ1FozjUWirTlUBdu0lHIPRYLxba8kzzVn5Dzw90YyqP0VLBXKKoob2m+BOTj2B//FNkrnNzo+z6YP6SuFMbz8dV/Nr93pTBeL8Z3LBwqTKapGFu6WjpVqOH9j0JjKByKQnMoHIpCcy4rFGnvST8LxXNZ9R31slBsojh67jnrZ+FLUX9K7/coPS3cUijNUmgMhTIKW7MUGkOhjMLWLIXGUCijsDXrcWH678HAk8LztYgfhd3NyoftQ6GoXh86XptVwe7Gr2/KvT0ofI/OFnVD5QJxtFDs7kGhWOx7LvUmWz8Lgyy53Xc0C+J5d+M++lDs7UNhkG261nGYf753t+58fR2eH0z/cixV7+tFYdf/8o5P4c9ZCo2hUEZha5ZCYyiUUdiapdAYCmUUtmY7hRM/CqtlWBwvKfz4faX67MXWNaQXnTG0+xYpf7JQaArDXLpS3dp1wBee19b7rgGnwg4vCntTFc6Vv6zqprUwb99SodyN/m960Hr25aG9xmHnthimzi+1h8KhKDSHwqHcKiwqDfcyWc0dKgwLDXdMSkKXCjVxpHBdaCuMSxcKg5mGZ+gvj7bjTkQ200W5OAwAAAAAAAAAAAAAAAAAAAAAAAAAAADganwH5zd6LobMFeIAAAAASUVORK5CYII="){
            SaveData();
        }
    }

    const SaveData = () => {
        let like = [];
        let commentId = [];
        let userId = props.dataUser.id
        // 1. tạo obj 
        let objSP = {
            userId,like,commentId,content,image
        };

        //2. Dùng fetch:
        let api_url = 'http://44.168.0.102:3000/blogs'

        fetch(api_url, {
            method: 'POST', // POST: Thêm mới, PUT: Sửa, DELETE: xóa, GET: lấy thông tin
            headers: { // Định dạng dữ liệu gửi đi
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objSP) // chuyển đối tượng SP thành chuỗi JSON
        })
            .then((response) => {
                console.log(response.status);
                // nếu log là 201 thì là tạo thành công
                if (response.status == 201)
                    handleGoBack()


            })
            .catch((err) => {  // catch để bắt lỗi ngoại lệ
                console.log(err);
            });


    }

    const pickImage = async () => {

        // Đọc ảnh từ thư viện thì không cần khai báo quyền
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [6, 4], // khung view cắt ảnh 
            quality: 1,
        });


        if (!result.canceled) {
            // chuyển ảnh thành base64 để upload lên json
            let _uri = result.assets[0].uri;  // địa chỉ file ảnh đã chọn
            let file_ext = _uri.substring(_uri.lastIndexOf('.') + 1); // lấy đuôi file


            FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: 'base64' })
                .then((res) => {
                    // phải nối chuỗi với tiền tố data image
                    setiimg_base64("data:image/" + file_ext + ";base64," + res);
                    // upload ảnh lên api thì dùng PUT có thể viết ở đây
                });

        }

    }

    
    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
          setContent('');
          setiimg_base64("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAgVBMVEXw8PABFicAAAD39/cACyD6+fpJUVgAABiLjpHS0tP8/PzOzs8AABXs7e0ADyIAAAacnqAtOUMAABEcKjamp6pYX2UdJTCtsLN8gIQAABvk5eYAAA3Bw8UpND4gLTkyPUZqbnOWmZyGiYx6foMXHywYHyxrcHW4u73a3N1ASFEAECD3KgboAAACYElEQVR4nO3c63KaQBiAYWAxKBVijEbRYAxJc+j9X2DBnhbcTpFhT/Z9fjIfie+M4mGBIAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwxcTuiy6ZsB138hjpM7Md10jLONSlWE9s59XS+1xbYXzjTGFyO77CpcL5KsjGFkwLhwqXq/EPemKaUGgIhUNRaA6FQ1FozjUWirTlUBdu0lHIPRYLxba8kzzVn5Dzw90YyqP0VLBXKKoob2m+BOTj2B//FNkrnNzo+z6YP6SuFMbz8dV/Nr93pTBeL8Z3LBwqTKapGFu6WjpVqOH9j0JjKByKQnMoHIpCcy4rFGnvST8LxXNZ9R31slBsojh67jnrZ+FLUX9K7/coPS3cUijNUmgMhTIKW7MUGkOhjMLWLIXGUCijsDXrcWH678HAk8LztYgfhd3NyoftQ6GoXh86XptVwe7Gr2/KvT0ofI/OFnVD5QJxtFDs7kGhWOx7LvUmWz8Lgyy53Xc0C+J5d+M++lDs7UNhkG261nGYf753t+58fR2eH0z/cixV7+tFYdf/8o5P4c9ZCo2hUEZha5ZCYyiUUdiapdAYCmUUtmY7hRM/CqtlWBwvKfz4faX67MXWNaQXnTG0+xYpf7JQaArDXLpS3dp1wBee19b7rgGnwg4vCntTFc6Vv6zqprUwb99SodyN/m960Hr25aG9xmHnthimzi+1h8KhKDSHwqHcKiwqDfcyWc0dKgwLDXdMSkKXCjVxpHBdaCuMSxcKg5mGZ+gvj7bjTkQ200W5OAwAAAAAAAAAAAAAAAAAAAAAAAAAAADganwH5zd6LobMFeIAAAAASUVORK5CYII=")
        });
    
        return unsubscribe;
      }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <View style={{ backgroundColor: 'lightgray' }}>
                    <TouchableOpacity onPress={pickImage}>
                        <View style={styles.avt}>
                            {image && <Image source={{ uri: image }} style={styles.image} />}
                        </View>
                    </TouchableOpacity>
                </View>
                <TextInput style={styles.input}
                    placeholder="Bạn đang nghĩ gì ?"
                    multiline={true}
                    value={content}
                    onChangeText={((text) => setContent(text))} />
                <TouchableOpacity style={styles.buttonContainer} onPress={checkDataContent}>
                    <Text style={styles.buttonText}>Thêm</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        top: 0,
        flex: 1,
        backgroundColor: '#fff',
    },
    input: {
        fontSize: 18,
        width: '100%',
        height: 100,
        paddingHorizontal: 10
    },
    buttonContainer: {
        top: HEIGHT - 430,
        backgroundColor: '#f7c744',
        paddingVertical: 15,
        marginHorizontal: 10
    },
    buttonText: {
        textAlign: 'center',
        color: 'rgb(32,53,70)',
        fontWeight: 'bold',
        fontSize: 18
    },
    image: {
        marginTop: 5,
        width: '100%',
        height: 250,
        marginBottom: 10
    }
});
export default AddContent;
import React from "react";
import { View, Text, Button, ActivityIndicator, Image, Animated, TouchableOpacity } from "react-native";
import { useState } from "react"
import { FlatList } from "react-native-gesture-handler";
import styles from "../styles/MyStyles";
import ModalProfile from "../modals/ModalProfile";

const Home = (props) => {

    const [isLoading, setisLoading] = useState(true);
    const [data, setData] = useState([]); // chứa sản phẩm
    // xử lý hiển thị dữ liệu
    const getData = async () => {
        let url_api = 'http://44.168.0.102:3000/blogs?_expand=user&_sort=id&_order=desc';

        try {
            const response = await fetch(url_api);  // lấy dữ liệu về
            const jsonSP = await response.json(); // chuyển dữ liệu thành đối tượng json
            setData(jsonSP);
            //console.log(jsonSP);
        } catch (error) {
            console.error(error);
        } finally {
            // kết thúc quá trình thực hiện trong try, dù xảy ra lỗi hay không cũng gọi vào đây
            // đổi trạng thái isLoading là false
            setisLoading(false);
        }
    }

    const renderData = ({ item }) => {

        let img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAgVBMVEXw8PABFicAAAD39/cACyD6+fpJUVgAABiLjpHS0tP8/PzOzs8AABXs7e0ADyIAAAacnqAtOUMAABEcKjamp6pYX2UdJTCtsLN8gIQAABvk5eYAAA3Bw8UpND4gLTkyPUZqbnOWmZyGiYx6foMXHywYHyxrcHW4u73a3N1ASFEAECD3KgboAAACYElEQVR4nO3c63KaQBiAYWAxKBVijEbRYAxJc+j9X2DBnhbcTpFhT/Z9fjIfie+M4mGBIAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwxcTuiy6ZsB138hjpM7Md10jLONSlWE9s59XS+1xbYXzjTGFyO77CpcL5KsjGFkwLhwqXq/EPemKaUGgIhUNRaA6FQ1FozjUWirTlUBdu0lHIPRYLxba8kzzVn5Dzw90YyqP0VLBXKKoob2m+BOTj2B//FNkrnNzo+z6YP6SuFMbz8dV/Nr93pTBeL8Z3LBwqTKapGFu6WjpVqOH9j0JjKByKQnMoHIpCcy4rFGnvST8LxXNZ9R31slBsojh67jnrZ+FLUX9K7/coPS3cUijNUmgMhTIKW7MUGkOhjMLWLIXGUCijsDXrcWH678HAk8LztYgfhd3NyoftQ6GoXh86XptVwe7Gr2/KvT0ofI/OFnVD5QJxtFDs7kGhWOx7LvUmWz8Lgyy53Xc0C+J5d+M++lDs7UNhkG261nGYf753t+58fR2eH0z/cixV7+tFYdf/8o5P4c9ZCo2hUEZha5ZCYyiUUdiapdAYCmUUtmY7hRM/CqtlWBwvKfz4faX67MXWNaQXnTG0+xYpf7JQaArDXLpS3dp1wBee19b7rgGnwg4vCntTFc6Vv6zqprUwb99SodyN/m960Hr25aG9xmHnthimzi+1h8KhKDSHwqHcKiwqDfcyWc0dKgwLDXdMSkKXCjVxpHBdaCuMSxcKg5mGZ+gvj7bjTkQ200W5OAwAAAAAAAAAAAAAAAAAAAAAAAAAAADganwH5zd6LobMFeIAAAAASUVORK5CYII="
        return (
            <View>
                <View style={styles.baiViet}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={{ uri: item.user.avatar }} style={styles.avt} />
                        <ModalProfile user = {item.user}/>
                    </View>
                    <Text style={styles.content}>{item.content}</Text>
                    {
                        (item.image == img) ? (
                            <Image/>
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
        <View style={styles.container}>

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
    );

}

export default Home;

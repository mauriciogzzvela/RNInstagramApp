import React from "react";
import {
    StyleSheet,
    View,
    ActivityIndicator,
    FlatList,
    Text,
    TouchableOpacity
} from "react-native";
export default class Home extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Source Listing",
            headerStyle: {backgroundColor: "#fff"},
            headerTitleStyle: {textAlign: "center",flex: 1}
        };
    };
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            dataSource:[]
        };
    }
    componentDidMount(){
        const data = {
            "direction_id":150026,
            "type":1,
            "subtype":0,
            "purpose":1,
            "send_polygons":0,
            "page":1
        };
        fetch("http://team-mobile.propiedades.com/api/v2/search/findproperties", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then((responseJson)=> {
                this.setState({
                    loading: false,
                    dataSource: [responseJson]
                })
            })
            .catch(error=>console.log(error))
        console.log(this.state.dataSource);
    }
    FlatListItemSeparator = () => {
        return (
            <View style={{
                height: .5,
                width:"100%",
                backgroundColor:"rgba(0,0,0,0.5)",
            }}
            />
        );
    }
    renderItem=(data)=>(
        <TouchableOpacity style={styles.list}>

            {data.item.properties.map(data =>
                <>
                <Text style={styles.lightText}>ID: {data.id}</Text>
                <Text style={styles.lightText}>IMAGEN: {data.picture}</Text>
                <Text style={styles.lightText}>DIRECCION: {data.short_address}</Text>
                <Text style={styles.lightText}>URL: {data.url_property}</Text>
                <Text style={styles.lightText}>DIAS: {data.days_ago}</Text>
                <Text style={styles.lightText}>PRECIO: {data.price}</Text>
                </>

            )}
        </TouchableOpacity>
    )
    render(){
        if(this.state.loading){
            return(
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#0c9"/>
                </View>
            )}
        return(
            <View style={styles.container}>

                <FlatList
                    data= {this.state.dataSource}
                    ItemSeparatorComponent = {this.FlatListItemSeparator}
                    renderItem= {item=> this.renderItem(item)}
                    keyExtractor= {item=>item.campaign.toString()}
                />
            </View>
        )}
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    loader:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    list:{
        paddingVertical: 4,
        margin: 5,
        backgroundColor: "#fff"
    },
    propsText: {
        fontSize: 40,
        color: "#666",
        textAlign: "center",
        fontWeight: "bold"
    }
});

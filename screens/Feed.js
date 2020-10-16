import React, { Component } from 'react';
import { Image, View, TouchableOpacity, ActivityIndicator, Text } from 'react-native';
import { Avatar, withStyles, List } from 'react-native-ui-kitten';
import { withFirebaseHOC } from '../components/utils';

class _Feed extends Component {
    state = {DATA: null, isRefreshing: false}

    // ...


    componentDidMount() {
        this.fetchPosts()
    }

    fetchPosts = async () => {
        try {
            const posts = await this.props.firebase.getPosts();
            console.log(posts);
            this.setState({DATA: posts, isRefreshing: false});
        } catch (e) {
            console.error(e)
        }
    }

    onRefresh = () => {
        this.setState({isRefreshing: true})
        this.fetchPosts()
    }


    render() {
        const renderItem = ({item}) => (
            <View style={this.props.themedStyle.card}>
                <Image
                    source={{uri: item.postPhoto}}
                    style={this.props.themedStyle.cardImage}
                />
                <View style={this.props.themedStyle.cardHeader}>
                    <Text category='s1' style={this.props.themedStyle.cardTitle}>
                        {item.postTitle}
                    </Text>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Profile')}>
                        <Avatar
                            source={{
                                uri:
                                    'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTuiyHe62G4sTDAyUH056Og9_SZjC8rrQi3V49tnrcWWohHXHyY&usqp=CAU'
                            }}
                            size='small'
                            style={this.props.themedStyle.cardAvatar}
                        />
                    </TouchableOpacity>
                </View>
                <View style={this.props.themedStyle.cardContent}>
                    <Text category='p2'>{item.postDescription}</Text>
                </View>
            </View>
        )

        if (this.state.DATA != null) {
            return (
                <List
                    style={this.props.themedStyle.container}
                    data={this.state.DATA}
                    renderItem={renderItem}
                    keyExtractor={this.state.DATA.id}
                    refreshing={this.state.isRefreshing}
                    onRefresh={() => this.onRefresh()}
                />
            )
        } else
            return (
                <View
                    style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator size='large'/>
                </View>
            )
    }
}

export default Feed = withFirebaseHOC(
    withStyles(_Feed, theme => ({
        container: {
            flex: 1
        },
        card: {
            backgroundColor: theme['color-basic-100'],
            marginBottom: 25
        },
        cardImage: {
            width: '100%',
            height: 300
        },
        cardHeader: {
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        cardTitle: {
            color: theme['color-basic-1000']
        },
        cardAvatar: {
            marginRight: 16
        },
        cardContent: {
            padding: 10,
            borderWidth: 0.25,
            borderColor: theme['color-basic-600']
        }
    }))
)

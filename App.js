import React, { Fragment }  from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/api/Home';
import SliderTest from './components/slider/SliderTest';

import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from 'react-native-ui-kitten';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import Firebase, {FirebaseProvider} from './components/utils';
import TabNavigator from './navigation/TabNavigator';

function HomeScreen({ navigation }) {
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        <Button
            title="Go to Details"
            onPress={() => navigation.navigate('Details')}
        />
        <Button
            title="Ir a API"
            onPress={() => navigation.navigate('ApiHome')}
        />
        <Button
            title="Ir a Slider"
            onPress={() => navigation.navigate('SliderTest')}
        />
      </View>
  );
}

function DetailsScreen({ navigation }) {
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button
            title="Ir a API"
            onPress={() => navigation.navigate('ApiHome')}
        />
      </View>
  );
}

function ApiHome({ navigation }) {
  return (
<>
      <Home />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      </>
  );

}

function SliderTestScreen({ navigation }){
  return (
          <>
            <SliderTest/>
            <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
            <Button title="Go back" onPress={() => navigation.goBack()} />
          </>

  );

}

const Stack = createStackNavigator();

function App() {
  return (
      <>
      {/*<NavigationContainer>*/}
        {/*<Stack.Navigator initialRouteName="Home">*/}
          {/*<Stack.Screen name="Home" component={HomeScreen} />*/}
          {/*<Stack.Screen name="Details" component={DetailsScreen} />*/}
          {/*<Stack.Screen name="ApiHome" component={ApiHome} />*/}
          {/*<Stack.Screen name="SliderTest" component={SliderTestScreen} />*/}
        {/*</Stack.Navigator>*/}
      {/*</NavigationContainer>*/}

          <Fragment>
              <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider mapping={mapping} theme={lightTheme}>
            <FirebaseProvider value={Firebase}>
            <TabNavigator />
            </FirebaseProvider>
        </ApplicationProvider>
          </Fragment>
       </>


  );
}

export default App;

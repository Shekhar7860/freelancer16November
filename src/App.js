/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, BackHandler, Alert} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import SideMenu from './components/SideMenu';
import Welcome from './components/Welcome';
import SelectAccount from './components/SelectAccount';
import ForgotPassword from './components/ForgotPassword';
import MobileSignin from './components/MobileSignIn';
import Otp from './components/Otp';
import Profile from './components/Profile';
import Messages from './components/Messages';
import Payment from './components/Payment';
import Projects from './components/Projects';
import Account from './components/Account';
import Settings from './components/Settings';
import About from './components/About';
import Feedback from './components/Feedback';
import Notifications from './components/Notifications';
import FindFreelancer from './components/FindFreelancer';
import MobileSignin2 from './components/MobileSignIn2';
import Details from './components/Details';
import FreelancerDetails from './components/FreelancerDetails';
import Tabs from './components/Tabs';
import FEED from './components/Feed';
import Jobs from './components/Jobs';
import UpdateProfile from './components/UpdateProfile';
import Service from './services/Service';
export const Menu = DrawerNavigator({
  Home: { screen: Home},
  Messages: { screen: Messages},
  Payment: { screen: Payment},
  Projects: { screen: Projects},
  Account: { screen: Account},
  Settings: { screen: Settings},
  About: { screen: About},
  Feedback: { screen: Feedback},
  Notifications: { screen: Notifications},
  FindFreelancer: { screen: FindFreelancer},
  FreelancerDetails : {screen : FreelancerDetails},
  UpdateProfile : {screen : UpdateProfile},
  Jobs : {screen : Jobs}
}, {
  contentComponent: SideMenu,
  drawerWidth: 300
});

// routing 
const AppNavigator = StackNavigator(
  {
    Welcome: { screen: Welcome},
    Select: { screen: SelectAccount },
    Login: { screen: MobileSignin },
    Login2: { screen: MobileSignin2 },
    SignUp: { screen: SignUp},
    Forgot: { screen: ForgotPassword },
    Home: { screen: Menu },
    Otp : { screen: Otp},
    Profile : { screen: Profile},
    Details : {screen : Details}
   
  },
  { headerMode: 'none' }
);

export default class App extends Component {
  constructor(props) {
    super(props);
    service = new Service();
    this.state = {
      navState: "",
      userResponse: {},
      firstScreen : Welcome
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    SplashScreen.hide()
    service.getUserData('user').then((keyValue) => {
      console.log("local", keyValue);
      var parsedData = JSON.parse(keyValue);
      console.log("sidemenujson", parsedData);
      if(parsedData.usertype !== null)
      {
        if(parsedData.usertype == 1 )
       {
       this.props.navigation.navigate('FindFreelancer')
       }
       else
       {
        this.props.navigation.navigate('Home') 
       }
      }
      this.setState({ userResponse: parsedData});
   }, (error) => {
      console.log(error) //Display error
    });
  }

  componentWillUnmount = () =>{
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }  

  onNavigationChange = (navState, currentState ,action) => {
    if (navState.hasOwnProperty('index')) {
      this.setState({navState: navState.routes[navState.index]})
  } else {
      this.setState({navState: setCurrentRouteName(navState.routeName)})
  }
  }
  
  handleBackButton = () => {
    
     if(this.state.navState.routeName == "Home" || this.state.navState.routeName == "FindFreelancer")
    {
      Alert.alert(
        'Exit App',
        'Do you want to Exit the application?', [{
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
        }, {
            text: 'OK',
            onPress: () => BackHandler.exitApp()
        }, ], {
            cancelable: false
        }
     )
      return true;
    }
     
   } 
  render() {
    return (
      <AppNavigator
      onNavigationStateChange={this.onNavigationChange}
    />
    );
  }
}



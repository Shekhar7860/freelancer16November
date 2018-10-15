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
import { createStackNavigator, DrawerNavigator } from 'react-navigation';
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
import Balance from './components/Balance';
import PostProject from './components/PostProject';
import JobDetails from './components/JobDetails';
import CATEGORY from './components/Category';
import SubCategory from './components/SubCategory';
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
  Jobs : {screen : Jobs},
  Balance : {screen : Balance},
  PostProject :{screen :PostProject},
  JobDetails :{screen : JobDetails},
  Sub: { screen: SubCategory},
  Cat: { screen: CATEGORY}
}, {
  contentComponent: SideMenu,
  drawerWidth: 300
});

// routing 
const AppNavigator = createStackNavigator(
  {
    Welcome: { screen: Welcome},
    Select: { screen: SelectAccount },
    Login: { screen: MobileSignin },
    Login2: { screen: MobileSignin2 },
    SignUp: { screen: SignUp},
    Forgot: { screen: ForgotPassword },
    Home2: { screen: Menu },
    Otp : { screen: Otp},
    Profile : { screen: Profile},
    Details : {screen : Details},
    UpdateProfile : {screen : UpdateProfile}
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
    console.reportErrorsAsExceptions = false;
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    SplashScreen.hide()
    
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
    console.log(this.state.navState.routeName);
     if(this.state.navState.routeName == "Home" || this.state.navState.routeName == "Jobs" || this.state.navState.routeName == "Profile" || this.state.navState.routeName == "Home2" || this.state.navState.routeName == "About")
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



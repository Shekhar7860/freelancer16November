import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, SafeAreaView,Image, ImageBackground, ActivityIndicator, TouchableOpacity, TouchableNativeFeedback} from 'react-native';
import styles from '../styles/styles';
import Constants from '../constants/Constants';

export default class SelectAccount extends Component {
  constructor(props){
    super(props);
    constants = new Constants();
  }

 componentDidMount() {
  if(this.props.navigation.state.params)
  {
   console.log(this.props.navigation.state.params.mobile)
  }      
  }

  // going to next screen
  goToLogin = () =>{
   this.props.navigation.navigate('Login')
  }

  goToSignUp = (userType) =>
  {
    console.log(this.props.navigation.state.params)
    if(this.props.navigation.state.params)
    console.log(this.props.navigation.state.params.mobile)
   {
     var userData = {
      type: userType,
      mobile: this.props.navigation.state.params.mobile.mobile
     }
     console.log(userData)
    this.props.navigation.navigate('Otp', { type: userData})
   }    
  }

 goToWelcome = () => 
 {
	this.props.navigation.navigate('Welcome')
 }
  
  render() {
    return (
  <SafeAreaView>
	    <View style={styles.toolbar}>
			<Text style={styles.backButton} onPress={() => this.goToWelcome()}>
			<Image source={constants.backicon} style={styles.icon}/>
			</Text>
      <Text style={styles.toolbarTitle}>Select Account</Text>
      </View>
	     <View style={styles.accountHeadline}>
	       <Text style={styles.accountHeadlineText}>Select Account Type</Text>
		   <TouchableOpacity style={styles.hireButtonBackground} onPress={() => this.goToSignUp(1)}>
		     <Text style={styles.accountButtonText}>I want to hire freelancers</Text>
		   </TouchableOpacity>
		    <TouchableOpacity style={styles.lookingButtonBackground} onPress={() => this.goToSignUp(2)}>
		     <Text style={styles.accountButtonText}>I am looking to work </Text>
		   </TouchableOpacity>
		    <Text style={styles.selectAccountText}>Already have an account? <Text onPress={() => this.goToLogin()}>Login</Text></Text>
	     </View>
   </SafeAreaView>
	   
    );
  }
}


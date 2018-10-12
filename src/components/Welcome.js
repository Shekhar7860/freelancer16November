import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, ImageBackground, ActivityIndicator, TouchableOpacity} from 'react-native';
import styles from '../styles/styles';
import Service from '../services/Service';
export default class Welcome extends Component {
  
  constructor(props){
    super(props);
   // console.log('propvalue', props);
    service = new Service();
    this.state = {
       userResponse: {},
    }
     
}

componentDidMount ()   {
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


  // going to next screen
  goToLogin = () =>{
   this.props.navigation.navigate('Login')
  }
  
  goToSelect = () =>{
       this.props.navigation.navigate('Login')
      }
  
  render() {
    return (
       <View style={styles.welcomeContainer}>
	     <View style={styles.welcomeHeadline}>
	       <Text style={styles.headlineText}>Freelancer</Text>
		   <TouchableOpacity style={styles.buttonBackground} onPress={() => this.goToSelect()}>
		     <Text style={styles.buttonText}>Create An Account</Text>
		   </TouchableOpacity>

       <View style={styles.rowAlignSideMenu}>
		    <Text style={styles.accountText}>Already have an account? </Text>
        <TouchableOpacity>
        <Text onPress={() => this.goToLogin()} style={styles.welcomeLoginText}>Login</Text>
        </TouchableOpacity>
        </View>
	     </View>
	   </View>
	   
    );
  }
}


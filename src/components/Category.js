import React, {Component} from 'react';
import {Platform, StyleSheet, SafeAreaView, Text, View, Image, ImageBackground, Button, TouchableOpacity} from 'react-native';
import Constants from '../constants/Constants';
import Service from '../services/Service';

export default class CATEGORY extends Component {
 constructor(props){
     super(props);
     service = new Service();
     constants = new Constants();
     this.state = {
        userData: { picture_large:{ data:{}}},
      };
   
 }
 componentDidMount() {

 }
 openDrawer = () => {
   this.props.navigation.openDrawer()}

  searchPage = () =>{
    alert("searching Page")   
        }

  render() {
   
    return (
        
     <SafeAreaView
      source={constants.loginbg}
      style={styles.container}>
    
   <Text>CATEGORY </Text>
 </SafeAreaView>
      
     
    );
  }
}

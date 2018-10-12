import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, SafeAreaView,Image, ImageBackground, ActivityIndicator, TouchableOpacity, TouchableNativeFeedback} from 'react-native';
import styles from '../styles/styles';
import Constants from '../constants/Constants';
import Loader from './Loader';
export default class FreelancerDetails extends Component {
  constructor(props){
    super(props);
    constants = new Constants();
    this.state = { 
        freelancerDetails : "",
        loading:false
      }
  }

 componentDidMount() {
    this.setState ({ loading: true});
    setTimeout(() => {
      this.setState ({ loading: false});
      if(this.props.navigation.state.params)
  {
   console.log(this.props.navigation.state.params.freelancerdetails)
   this.setState({ freelancerDetails: this.props.navigation.state.params.freelancerdetails})
  }    
      }, 1000)
   
  }

 
  goBack = () =>{
    this.props.navigation.navigate('FindFreelancer') 
   }
  
  render() {
    return (
  <SafeAreaView>
	    <View style={styles.toolbar}>
			<Text style={styles.backButton} onPress={() => this.goBack()}>
			<Image source={constants.backicon} style={styles.icon}/>
			</Text>
            <Text style={styles.toolbarTitle}>Freelancer Details</Text>
      </View>
    <View style={styles.contentMargin}>
         <Text>{this.state.freelancerDetails.email}</Text>
         <Text>{this.state.freelancerDetails.username}</Text>
         <Text>{this.state.freelancerDetails.skills}</Text>
   </View>
   <Loader
              loading={this.state.loading} />   
   </SafeAreaView>
	   
    );
  }
}


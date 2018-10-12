import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, SafeAreaView,Image, TextInput, ImageBackground, ActivityIndicator, TouchableOpacity, TouchableNativeFeedback} from 'react-native';
import styles from '../styles/styles';
import Constants from '../constants/Constants';
import Service from '../services/Service';
import CustomToast from './CustomToast';
import Loader from './Loader';
export default class UpdateProfile extends Component {
  
  constructor(props){
    super(props);
    service = new Service();
    constants = new Constants();
    this.state = { 
       userResponse: {},
        email:'',
        name:'',
        about:'',
        loading: false,
        userType : ""
      }
  }
 
  componentDidMount ()   {
    service.getUserData('user').then((keyValue) => {
      console.log("local", keyValue);
      var parsedData = JSON.parse(keyValue);
      console.log("json", parsedData);
      if(parsedData.usertype == 1)
      {
      this.setState({ userType: "Client"});
      }
      else
      {
      this.setState({ userType: "Freelancer"}); 
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
  goToSignUp = (userType) =>{
  this.props.navigation.navigate('SignUp', { type: userType })
      }
 
 updateProfile = () => {
          this.setState ({ loading: true});
          setTimeout(() => 
          {
          this.setState({loading: false})
          service.profile_update(this.state.userResponse.api_token,this.state.name,this.state.email,this.state.about).then((res) => {
            console.log(res)
            if(res)
            {
              if(res.status == "success")
              {
                this.refs.defaultToastBottom.ShowToastFunction('Profile Updated Successfully');
                this.goToHome();
              }
             
            }
            else
            {
              this.refs.defaultToastBottom.ShowToastFunction('Network error');
            }
          })
          }, 3000)
 }

 goToHome = () => {
  setTimeout(() => {
    this.props.navigation.navigate('HomePage')
    }, 1000)
 }

 goBack = () =>{
  this.props.navigation.navigate('Profile')
 }

  render() {
    const  NewImage =   <Image source={constants.defaultImage} style={styles.profilePic}/>
    // const fbImage = <Image source={{uri: this.state.userFbData.picture_large.data.url}} style={styles.profilePic} />;
    return (
  <SafeAreaView style={styles.container}>
	    <View style={styles.toolbar}>
			<Text style={styles.backButton} onPress={() => this.goBack()}>
			<Image source={constants.backicon} style={styles.icon}/>
			</Text>
         <Text style={styles.toolbarTitle}>Update Profile</Text>
         <TouchableOpacity onPress={() => this.updateProfile()}>
         <Text style={styles.updateText}>DONE</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
      {NewImage}
         <View style={styles.containerBorder}>
          <View style={styles.textItemsContainer}>
            <View style={styles.nameContainer}>
            <Text>UserName</Text>
            </View>
            <View style={styles.boxContainer}>
            <TextInput  placeholder = "Name" onChangeText={(text)=>this.setState({ name:text})} value={this.state.userResponse.username}></TextInput>
            </View>
         </View>
         </View>
         <View style={styles.containerBorder}>
          <View style={styles.textItemsContainer}>
            <View style={styles.nameContainer}>
            <Text>Email</Text>
            </View>
            <View style={styles.boxContainer}>
            <TextInput  placeholder = "Email" onChangeText={(text)=>this.setState({ email:text})} value={this.state.userResponse.email}></TextInput>
            </View>
         </View>
         </View>
         <View style={styles.containerBorder}>
          <View style={styles.textItemsContainer}>
            <View style={styles.nameContainer}>
            <Text>About Me</Text>
            </View>
            <View style={styles.boxContainer}>
            <TextInput  placeholder = "About me" onChangeText={(text)=>this.setState({ about:text})}  value={this.state.userResponse.short_bio}></TextInput>
            </View>
         </View>
         </View>
         <View style={styles.containerBorder}>
          <View style={styles.textItemsContainer}>
            <View style={styles.nameContainer}>
            <Text>User Type</Text>
            </View>
            <View style={styles.boxContainer}>
            <TextInput  placeholder = " User Type" value={this.state.userType}></TextInput>
            </View>
         </View>
         </View>
      </View>
	    <CustomToast ref = "defaultToastBottom"/> 
      <Loader
          loading={this.state.loading} />
       </SafeAreaView>
	   
    );
  }
}


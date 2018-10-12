import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, SafeAreaView,Image, TextInput, ImageBackground, ActivityIndicator, TouchableOpacity, TouchableNativeFeedback,Alert} from 'react-native';
import styles from '../styles/styles';
import Constants from '../constants/Constants';
import Service from '../services/Service';
import ImagePicker from "react-native-image-picker";

export default class Profile extends Component {

  constructor(props){
    super(props);
    service = new Service();
    constants = new Constants();
    this.state = {
      userResponse: {},
      userType : "",
      pickedImage: null,
      docImage: null,
      resumeImage: null



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

     goBack = () =>{
        this.props.navigation.pop()
       }

 goToUpdateProfile = () =>
 {
  this.props.navigation.navigate('UpdateProfile')
 }

 UpdateProfileImage = () =>
 {
//Alert.alert("Clicked.");

ImagePicker.showImagePicker({title: "Pick an Image", maxWidth: 800, maxHeight: 600}, res => {
     if (res.didCancel) {
       console.log("User cancelled!");
     } else if (res.error) {
       console.log("Error", res.error);
     } else {
       this.setState({
         pickedImage: { uri: res.uri }
       });

     }
   });
 }

 UploadDocumentImage = () =>
 {
//Alert.alert("Clicked.");

ImagePicker.showImagePicker({title: "Pick an Image", maxWidth: 800, maxHeight: 600}, res => {
     if (res.didCancel) {
       console.log("User cancelled!");
     } else if (res.error) {
       console.log("Error", res.error);
     } else {
       this.setState({
         docImage: { uri: res.uri }
       });

     }
   });
 }

 UploadResumeImage = () =>
 {
//Alert.alert("Clicked.");

ImagePicker.showImagePicker({title: "Pick an Image", maxWidth: 800, maxHeight: 600}, res => {
     if (res.didCancel) {
       console.log("User cancelled!");
     } else if (res.error) {
       console.log("Error", res.error);
     } else {
       this.setState({
         resumeImage: { uri: res.uri }
       });

     }
   });
 }

  render() {
    const  NewImage =   <TouchableOpacity onPress={() => this.UpdateProfileImage()}><Image source={this.state.pickedImage === null ? constants.defaultImage : this.state.pickedImage} style={styles.profilePic}/></TouchableOpacity>
    // const fbImage = <Image source={{uri: this.state.userFbData.picture_large.data.url}} style={styles.profilePic} />;
    return (
  <SafeAreaView>
	    <View style={styles.toolbar}>
			<Text style={styles.backButton} onPress={() => this.goBack()}>
			<Image source={constants.backicon} style={styles.icon}/>
			</Text>
         <Text style={styles.toolbarTitle}>Profile</Text>
         <TouchableOpacity onPress={() => this.goToUpdateProfile()}>
        <Image source={constants.editIcon} style={styles.searchIcon} />
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
            <Text>{this.state.userResponse.username}</Text>
            </View>
         </View>
         </View>
         <View style={styles.containerBorder}>
          <View style={styles.textItemsContainer}>
            <View style={styles.nameContainer}>
            <Text>Email</Text>
            </View>
            <View style={styles.boxContainer}>
            <Text>{this.state.userResponse.email}</Text>
            </View>
         </View>
         </View>
         <View style={styles.containerBorder}>
          <View style={styles.textItemsContainer}>
            <View style={styles.nameContainer}>
            <Text>About Me</Text>
            </View>
            <View style={styles.boxContainer}>
            <Text>{this.state.userResponse.short_bio}</Text>
            </View>
         </View>
         </View>
         <View style={styles.containerBorder}>
          <View style={styles.textItemsContainer}>
            <View style={styles.nameContainer}>
            <Text>User Type</Text>
            </View>
            <View style={styles.boxContainer}>
            <Text>{this.state.userType}</Text>
            </View>
         </View>
         </View>
      </View>
 <View style={{backgroundColor:'clear',marginLeft: 0,marginTop: 20,marginRight: 20,height: 90, flexDirection: 'row', alignItems: 'center',justifyContent: 'center'}}>
<TouchableOpacity onPress={() => this.UploadDocumentImage()}><Image source={this.state.docImage === null ? constants.docsIcon : this.state.docImage} style={{width:50,height:72,marginTop: 10, marginLeft: 20}}/></TouchableOpacity>

<TouchableOpacity onPress={() => this.UploadResumeImage()}><Image source={this.state.resumeImage === null ? constants.resumeIcon : this.state.resumeImage} style={{width:50,height:72,marginTop: 10, marginLeft: 50}}/></TouchableOpacity>
 </View>
<View style={{backgroundColor:'clear',marginLeft: 0,marginTop: 10,marginRight: 20,height: 30, flexDirection: 'row', alignItems: 'center',justifyContent: 'center'}}>
<Text style={{marginLeft: 20}}>ID Proof</Text>
<Text style={{marginLeft: 50}}>Resume</Text>

</View>
       </SafeAreaView>

    );
  }
}

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, Button,  View, ScrollView,  SafeAreaView,Image, TextInput, ImageBackground, ActivityIndicator, TouchableOpacity, TouchableNativeFeedback} from 'react-native';
import styles from '../styles/styles';
import Constants from '../constants/Constants';
import Service from '../services/Service';
import CustomToast from './CustomToast';
import Loader from './Loader';
import ImagePicker from "react-native-image-picker";
import MyView from './MyView';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
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
        userType : "",
        category :'Category',
        pickedImage: null,
        docImage: null,
        resumeImage: null,
        imagePath : '',
        imageExists : false
      }
  }
 
  UpdateProfileImage = () =>
  {
 ImagePicker.showImagePicker({title: "Pick an Image", maxWidth: 800, maxHeight: 600}, res => {
      if (res.didCancel) {
        console.log("User cancelled!");
      } else if (res.error) {
        console.log("Error", res.error);
      } else {
        console.log(res);
        this.setState({
          pickedImage: { uri: res.uri }
        });
        this.setState({ imagePath: res});
        this.setState({
          imageExists: true
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
  componentDidMount ()   {
    if(this.props.navigation.state.params)
    {
      console.log(this.props.navigation.state.params.category)
      this.setState ({ category: this.props.navigation.state.params.category.selectedCategory});
      this.setState ({ name: this.props.navigation.state.params.category.inputData.name});
      this.setState ({ email: this.props.navigation.state.params.category.inputData.email});
      this.setState ({ about: this.props.navigation.state.params.category.inputData.about});
      
    }
    else
    {
      console.log("first time")
    service.getUserData('user').then((keyValue) => {
      console.log("local", keyValue);
      var parsedData = JSON.parse(keyValue);
      console.log("json", parsedData);
      this.setState({ userResponse: parsedData});
      this.setState ({ name: this.state.userResponse.username});
      this.setState ({ email: this.state.userResponse.email});
      this.setState ({ about: this.state.userResponse.short_bio});
   }, (error) => {
      console.log(error) //Display error
    });
   }

   service.getUserData('user').then((keyValue) => {
    console.log("local", keyValue);
    var parsedData = JSON.parse(keyValue);
    console.log("json", parsedData);
    this.setState({ userResponse: parsedData});
 }, (error) => {
    console.log(error) //Display error
  });
   if(this.state.userResponse.usertype == 1)
   {
   this.setState({ userType: "Client"});
   }
   else
   {
   this.setState({ userType: "Freelancer"}); 
   }
   }

  // going to next screen
  goToLogin = () =>{
   this.props.navigation.navigate('Login')
  }
  goToSignUp = (userType) =>{
  this.props.navigation.navigate('SignUp', { type: userType })
      }
 
 updateProfile = () => {
      if(this.state.pickedImage !== null || this.state.userResponse.image_path !== null)
      {
              this.setState ({ loading: true});
              setTimeout(() => 
              {
              this.setState({loading: false})
               console.log(this.state.userResponse.api_token);
            if(this.state.pickedImage !== null)
            {
                service.profile_update(this.state.userResponse.api_token,this.state.name, this.state.email,this.state.about, this.state.pickedImage, this.state.category).then((res) => {
                  console.log(res)
                  if(res)
                  {
                    if(res.status == "success")
                    {
                      this.refs.defaultToastBottom.ShowToastFunction('Profile Updated Successfully');
                      service.saveUserData('user', res.user);
                      this.goToHome(res);
                    }
                  }
                  else
                  {
                    this.refs.defaultToastBottom.ShowToastFunction('Network error');
                  }
              })
            }
            else
            {
              service.profile_update(this.state.userResponse.api_token,this.state.name, this.state.email,this.state.about, this.state.userResponse.image_path, this.state.category).then((res) => {
                console.log(res)
                if(res)
                {
                  if(res.status == "success")
                  {
                    this.refs.defaultToastBottom.ShowToastFunction('Profile Updated Successfully');
                    service.saveUserData('user', res.user);
                    this.goToHome(res);
                  }
                }
                else
                {
                  this.refs.defaultToastBottom.ShowToastFunction('Network error');
                }
            })
          }
              }, 3000)
      }
      else
      {
        this.refs.defaultToastBottom.ShowToastFunction('Please select an image');
      }
 }

 goToHome = (user) => {
   console.log(user);
  setTimeout(() => {
    if(user.user.usertype == 1 )
    {
    this.props.navigation.navigate('Jobs')
    }
    else
    {
      this.props.navigation.navigate('Home') 
    }
    }, 1000)
 }

 openCategory = () => {
  var projectData = {
    "name" :  this.state.name,
    "email" : this.state.email,
    "about" : this.state.about,
    "pageName" : 'settings', 
    "image" : this.state.pickedImage
  }
  this.props.navigation.navigate("Cat",  { page: projectData });
}

 goBack = () =>{
  this.props.navigation.navigate('Profile')
 }

 selectdoc = () => {
  DocumentPicker.show({
    filetype: [DocumentPickerUtil.images()],
  },(error,res) => {
    
    // Android
    console.log(
      "response",
       res.uri,
       res.type, // mime type
       res.fileName,
       res.fileSize
    );
  });
 }

  render() {
    // console.log(this.state.userResponse);
  //   console.log(this.state.pickedImage);

   
  
      defaultImg = 'https://satishrao.in/wp-content/uploads/2016/06/dummy-profile-pic-male.jpg';
    
    
  
     const  ImagePicked =   <TouchableOpacity onPress={() => this.UpdateProfileImage()}><Image source={this.state.pickedImage} style={styles.profilePic}/></TouchableOpacity>
     const  NewImage =   <TouchableOpacity onPress={() => this.UpdateProfileImage()}><Image source={{uri: this.state.userResponse.image_path || defaultImg  }} style={styles.profilePic}/></TouchableOpacity>
     

    
    return (
  <SafeAreaView style={styles.MainContainerProfile}>
	    <View style={styles.toolbar}>
			<Text style={styles.backButton} onPress={() => this.goBack()}>
			<Image source={constants.backicon} style={styles.icon}/>
			</Text>
         <Text style={styles.toolbarTitle}>Update Profile</Text>
         <TouchableOpacity onPress={() => this.updateProfile()}>
         <Text style={styles.updateText}>DONE</Text>
        </TouchableOpacity>
      </View>
     <ScrollView>
      <MyView style={styles.profileContainer} hide={this.state.imageExists}>
      { NewImage}
      </MyView>
      <MyView style={styles.profileContainer} hide={!this.state.imageExists}>
      { ImagePicked}
      </MyView>
      <View style={{padding:10}}>
      <Text >
           Name
      </Text>
      <TextInput
            style={styles.postprojectinputprofile}
            underlineColorAndroid="transparent"
            placeholder="Name"
            onChangeText={(text)=>this.setState({ name:text})}
            placeholderTextColor="#AEA9A8"
            autoCapitalize="none"
            returnKeyType='done'
            value={this.state.name}
          />
          </View>
          <View style={{padding:10}}>
      <Text >
           Email
      </Text>
      <TextInput
            style={styles.postprojectinputprofile}
            underlineColorAndroid="transparent"
            placeholder="Email"
            onChangeText={(text)=>this.setState({ email:text})}
            placeholderTextColor="#AEA9A8"
            autoCapitalize="none"
            returnKeyType='done'
            value={this.state.email}
          />
          </View>
          <View style={{padding:10}}>
      <Text >
          About Me
      </Text>
      <TextInput
            style={styles.postprojectinputprofile}
            underlineColorAndroid="transparent"
            placeholder="About Me"
            onChangeText={(text)=>this.setState({ about:text})}
            placeholderTextColor="#AEA9A8"
            autoCapitalize="none"
            returnKeyType='done'
            value={this.state.about}
          />
          </View>
          <View style={{padding:10}}>
      <Text >
           User Type
      </Text>
      <TextInput
            style={styles.postprojectinputprofile}
            underlineColorAndroid="transparent"
            placeholder="User Type"
            placeholderTextColor="#AEA9A8"
            autoCapitalize="none"
            returnKeyType='done'
            value={this.state.userType} editable={false}
          />
          </View>
          <View style={{padding:10}}>
              <Text >
                  Category
              </Text>
              <View  style={styles.categoryTextProfile}>
                  <Text style={styles.dateTextColorProfile} onPress={() => this.openCategory()}>
                  {this.state.category}
                  </Text>
              </View>
      </View>

      <View>

      </View>
      </ScrollView>
      
      <View style={styles.toastCenter}>
	    <CustomToast ref = "defaultToastBottom"/>
      </View>
      <Loader
          loading={this.state.loading} />
       </SafeAreaView>
	   
    );
  }
}


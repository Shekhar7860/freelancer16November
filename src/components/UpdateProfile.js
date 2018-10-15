import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, SafeAreaView,Image, TextInput, ImageBackground, ActivityIndicator, TouchableOpacity, TouchableNativeFeedback} from 'react-native';
import styles from '../styles/styles';
import Constants from '../constants/Constants';
import Service from '../services/Service';
import CustomToast from './CustomToast';
import Loader from './Loader';
import ImagePicker from "react-native-image-picker";
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
        imagePath : ''
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
      this.setState ({ category: this.props.navigation.state.params.category});
    }
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
          service.profile_update(this.state.userResponse.api_token,this.state.name, " ",this.state.about, this.state.pickedImage).then((res) => {
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
          }, 3000)
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
  this.props.navigation.navigate("Cat",  { page: 'settings' });
}

 goBack = () =>{
  this.props.navigation.navigate('Profile')
 }

  render() {
    console.log(this.state.userResponse);
    console.log(this.state.pickedImage);

   
    if (this.state.userResponse.image_path !== " ")
    {
      defaultImg = 'https://satishrao.in/wp-content/uploads/2016/06/dummy-profile-pic-male.jpg';
    }
    else 
    {
      defaultImg = 'https://satishrao.in/wp-content/uploads/2016/06/dummy-profile-pic-male.jpg';
    }
    
  
   //  const  NewImage =   <TouchableOpacity onPress={() => this.UpdateProfileImage()}><Image source={this.state.pickedImage === null ? constants.defaultImage : this.state.pickedImage} style={styles.profilePic}/></TouchableOpacity>
    const  NewImage =   <TouchableOpacity onPress={() => this.UpdateProfileImage()}><Image source={{uri : this.state.pickedImage === null ?  defaultImg : this.state.pickedImage}} style={styles.profilePic}/></TouchableOpacity>
     

    
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
      <View style={styles.profileContainer}>
      { NewImage}
      </View>
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
            value={this.state.userResponse.username}
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
            editable={false}
            value={this.state.userResponse.email}
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
            value={this.state.userResponse.short_bio}
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

      <View style={styles.toastCenter}>
	    <CustomToast ref = "defaultToastBottom"/>
      </View>
      <Loader
          loading={this.state.loading} />
       </SafeAreaView>
	   
    );
  }
}


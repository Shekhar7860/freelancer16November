import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, SafeAreaView,Image, TextInput, ImageBackground, ActivityIndicator, TouchableOpacity, TouchableNativeFeedback} from 'react-native';
import styles from '../styles/styles';
import Constants from '../constants/Constants';
import Service from '../services/Service';

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


  render() {
    const defaultImg =
    'https://satishrao.in/wp-content/uploads/2016/06/dummy-profile-pic-male.jpg'
  
   
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
      <Image source={{uri: this.state.userResponse.image_path || defaultImg  }} style={styles.profilePic} />
      </View>
      <View style={{padding:10}}>
      <Text>
           Name
      </Text>
      <View  style={styles.categoryTextProfile}>
          <Text style={styles.dateTextColorProfile}>
         {this.state.userResponse.username}
          </Text>
       </View>
          </View>
          <View style={{padding:10}}>
          <Text >
              Email
          </Text>
          <View style={styles.categoryTextProfile}>
                  <Text style={styles.dateTextColorProfile} >
                  {this.state.userResponse.email}
                  </Text>
              </View>
            </View>
          <View style={{padding:10}}>
            <Text >
                About Me
            </Text>
            <View  style={styles.categoryTextProfile}>
                  <Text style={styles.dateTextColorProfile} >
                  {this.state.userResponse.short_bio}
                  </Text>
              </View>
          </View>
          <View style={{padding:10}}>
            <Text >
             User Type
            </Text>
             <View  style={styles.categoryTextProfile}>
                  <Text style={styles.dateTextColorProfile} >
                  Client
                  </Text>
              </View>
          </View>
          <View style={{padding:10}}>
              <Text >
                  Category
              </Text>
              <View  style={styles.categoryTextProfile}>
                  <Text style={styles.dateTextColorProfile} >
                  Developer
                  </Text>
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


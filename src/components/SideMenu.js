import React, {Component} from 'react';
import {ScrollView, SafeAreaView, Text, View, TouchableHighlight, ImageBackground, Switch, Image, TouchableOpacity ,Alert} from 'react-native';
import Service from '../services/Service';
import Constants from '../constants/Constants';
import MyView from './MyView';

class SideMenu extends Component {
  constructor(props){
    super(props);
   // console.log('propvalue', props);
    service = new Service();
    constants = new Constants();
    this.state = {
       userFbData: { picture_large:{ data:{}}},
       userGoogleData:{},
       name:"",
       logOut: true,
       items : false,
       icon : constants.downIcon,
       userResponse: {},
       names: [
        {
           id: 0,
           name: 'Home',
           icon:constants.homeIcon
        },
        {
          id: 1,
          name: 'Messages',
          icon:constants.messagesIcon
       },
        {
           id: 2,
           name: 'My Payment',
           icon:constants.paymentIcon
        },
        {
           id: 3,
           name: 'Find Freelancer',
           icon:constants.searchFreelancerIcon
        },
        {
           id: 4,
           name: 'My Projects',
           icon:constants.projectsIcon,
        },
        {
          id: 5,
          name: 'Account',
          icon:constants.accountIcon,
       }
     ]
     }; 
}

takePicture = () => {
  const options = {};
  this.camera.capture({ metadata: options })
  .then((data) => console.log(data))
  .catch(err => console.error(err));
}
logOut = () =>{
  Alert.alert(
    'Log Out',
    'Are you sure you want to logout?', [{
        text: 'Cancel',
        style: 'cancel'
    },
    {
        text: 'OK',
        onPress: () => 
        this.exit()
    }, ], {
        cancelable: false
    }
 )
  
}

componentDidMount ()   {
  service.getUserData('user').then((keyValue) => {
    console.log("local", keyValue);
    var parsedData = JSON.parse(keyValue);
    console.log("sidemenujson", parsedData);
    if(parsedData.usertype == 1)
    {
      this.setState ({
         names: [
          {
            id: 0,
            name: 'FindFreelancer',
            icon:constants.homeIcon
         },
          {
             id: 1,
             name: 'Messages',
             icon:constants.messagesIcon
          },
          {
             id: 2,
             name: 'My balance',
             icon:constants.balanceIcon
          },
          {
             id: 3,
             name: 'Find Works',
             icon:constants.searchFreelancerIcon
          },
          {
             id: 4,
             name: 'My Jobs',
             icon:constants.projectsIcon,
          },
          {
            id: 5,
            name: 'Account',
            icon:constants.accountIcon,
         }
       ]  
      });
    }
    this.setState({ userResponse: parsedData});
 }, (error) => {
    console.log(error) //Display error
  });
 }

exit = () => {
  service.clearLocalStorage();
  this.props.navigation.navigate('Welcome')
}
 
goToProfile = () => {
  this.props.navigation.navigate('Profile')
}


alertItemName = (item) => {
  switch(item.name) {
    case 'My Payment':
     this.props.navigation.navigate("Payment");
     break;
     case 'My Projects':
     this.props.navigation.navigate("Projects");
     break;
     case 'My Jobs':
     this.props.navigation.navigate("Jobs");
     break;
    default:
    this.props.navigation.navigate(item.name);
  }
  this.props.navigation.closeDrawer();
}

goToSettingsPage = () => {
  this.props.navigation.closeDrawer();
  this.props.navigation.navigate("Settings");
}

goToAboutPage = () => {
  this.props.navigation.closeDrawer();
  this.props.navigation.navigate("About");
}

goToFeedbackPage = () => {
  this.props.navigation.closeDrawer();
  this.props.navigation.navigate("Feedback");
}


 toggleItems = () =>
 {
  if(this.state.logOut)
  {
  this.setState ({ logOut: false});
  this.setState ({ items: true});
  this.setState ({ icon: constants.upIcon});
  }
  else
  {
    this.setState ({ icon: constants.downIcon});
    this.setState ({ logOut: true});
    this.setState ({ items: false}); 
  }
 }
 

  render () {
   // console.log("Fbdata",  this.state.userFbData, "GoogleData", this.state.userGoogleData)
  
   const  NewImage =   <Image source={constants.defaultImage} style={styles.profilePic}/>
   const fbImage = <Image source={{uri: this.state.userFbData.picture_large.data.url}} style={styles.profilePic} />;
   const GoogleImage = <Image source={{uri: this.state.userGoogleData.photo }} style={styles.profilePic} />;
   const fbName = <Text style={styles.userName}>{this.state.userFbData.name}</Text>
   const GoogleName = <Text style={styles.userName}>{this.state.userGoogleData.name}</Text>
   const DefaultName = <Text style={styles.defaultUserName}>{this.state.userResponse.username}</Text>
   const ProfileName = <Text style={styles.defaultUserName}>Client</Text>
   const ProfileName2 = <Text style={styles.defaultUserName}>Freelancer</Text>

      
     var profile;
     console.log(this.state.userResponse.usertype)
     if (this.state.userResponse.usertype == 1) 
      {
         profile = ProfileName
      } 
      else 
      {
        profile = ProfileName2
      }
        if (this.state.name == "fb") {
              if(fbImage.props.source.uri !== null){
                userImage =  fbImage
              }
              else
              {
                userImage = NewImage
              }
              userName = fbName
        } 
        else if(this.state.name == "google")
         {
         
                if(GoogleImage.props.source.uri !== null){
                  userImage = GoogleImage
                }
                else
                {
                  userImage = NewImage
                }
                userName = GoogleName
        }
        else
        {
          userImage = NewImage
        }
      
      
    return (
     
      <SafeAreaView
      source={constants.loginbg}
      style={styles.container}>
          <View style={styles.upperContainerSideMenu}>
            <View style={styles.sideMenuAlign}>
            <TouchableOpacity style={styles.arrowView} onPress = {() => this.goToProfile()}>
          {NewImage}
          </TouchableOpacity>
            <View style={styles.rowAlignSideMenu}>
                  <View style={styles.name}>
                  {DefaultName}
                  </View>
                  <View style={styles.blank}>
                  </View>
                  <TouchableOpacity style={styles.arrowView} onPress = {() => this.toggleItems()}>
                  <Image source={this.state.icon} style={styles.shareIcon}/>
                  </TouchableOpacity>
             </View>
             <Text style={styles.centerText}>{profile}</Text>
             </View>
          </View>
          <View style={styles.lowerContainerSideMenu}>
          <MyView style={styles.topMargin} hide={this.state.items}> 
            {
               this.state.names.map((item, index) => (
                  <TouchableOpacity
                     key = {item.id}
                     onPress = {() => this.alertItemName(item)}>
                     
                     <View style={styles.list}>
                       <TouchableOpacity style={styles.listIconsWidth}>
                          <Image source={item.icon} style={styles.listIcon}/>
                        </TouchableOpacity>
                        <View style={styles.listItemsBlank}></View>
                        <View style={styles.listTextWidth}>
                           <Text style={styles.listTextFontSize}>{item.name}</Text>
                        </View>
                     </View>
                  </TouchableOpacity>
               ))
            }
        <View
        style={styles.line}
        />
        <TouchableOpacity  style={styles.rowAlignSideMenu2} onPress = {() => this.goToSettingsPage()}>
            <View style={styles.listIconsWidth} >
               <Image source={constants.settingsIcon} style={styles.listIcon}/>
            </View>
            <View style={styles.listItemsBlank}></View>
              <View style={styles.listTextWidth}>
              <Text style={styles.listTextFontSize}>Settings</Text>
              </View>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.rowAlignSideMenu2} onPress = {() => this.goToAboutPage()}>
            <View style={styles.listIconsWidth} >
               <Image source={constants.aboutIcon} style={styles.listIcon}/>
            </View>
            <View style={styles.listItemsBlank}></View>
              <View style={styles.listTextWidth}>
              <Text style={styles.listTextFontSize}>About</Text>
              </View>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.rowAlignSideMenu2} onPress = {() => this.goToFeedbackPage()}>
            <View style={styles.listIconsWidth} >
               <Image source={constants.feedbackIcon} style={styles.listIcon}/>
            </View>
            <View style={styles.listItemsBlank}></View>
              <View style={styles.listTextWidth}>
              <Text style={styles.listTextFontSize}>Feedback</Text>
              </View>
          </TouchableOpacity>
         </MyView>
          
         <TouchableOpacity onPress={() => this.logOut()}>
         <MyView hide={this.state.logOut} style={styles.rowAlignSideMenu2} >
         <TouchableOpacity style={styles.listIconsWidth} >
               <Image source={constants.logoutIcon} style={styles.listIcon}/>
          </TouchableOpacity>
           <View style={styles.listItemsBlank}></View>
          <View style={styles.listTextWidth}>
              <Text style={styles.listTextFontSize}>Log Out</Text>
          </View>
          </MyView>
          </TouchableOpacity>
          </View>
        <View style={styles.sideMenu}>
        </View>
   </SafeAreaView>
     
     
    );
  }
}



export default SideMenu;
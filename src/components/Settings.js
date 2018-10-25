import React, {Component} from 'react';
import {Platform, StyleSheet, TextInput, Alert, SafeAreaView, Text, View, Image, ImageBackground, Button, TouchableOpacity,Switch} from 'react-native';
import Constants from '../constants/Constants';
import Service from '../services/Service';
import MyView from './MyView';
import {colors, fonts, padding, dimensions, align} from '../styles/base.js';

export default class Settings extends Component {
 constructor(props){
     super(props);
     service = new Service();
     constants = new Constants();
     this.state = {
      userData: { picture_large:{ data:{}}},
      search : true,
      switch1Value1: false,
      switch1Value2: false,
      switch1Value3: false,
      englishImage:constants.fillrdrIcon,
      arabicImage:constants.unfilledrIcon,

    };
   
 }
 componentDidMount() {

 }
 openDrawer = () => {
   this.props.navigation.openDrawer()}

   searchPage = () =>{
    this.setState({ search: false});
        }

///////////keshav add

toggleSwitch1 = (value) => {
  this.setState({switch1Value1: value})
  console.log('Switch 1 is: ' + value)
}
toggleSwitch2 = (value) => {
  this.setState({switch1Value2: value})
  console.log('Switch 1 is: ' + value)
}

toggleSwitch3 = (value) => {
  this.setState({switch1Value3: value})
  console.log('Switch 1 is: ' + value)
}

englishTap = () => {
  this.setState({englishImage:constants.fillrdrIcon})
  this.setState({arabicImage:constants.unfilledrIcon})
}
ArabicTap = () => {

this.setState({englishImage:constants.unfilledrIcon})
this.setState({arabicImage:constants.fillrdrIcon})

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

  exit = () => {
    //service.clearLocalStorage();
    service.saveUserData('user', "");
    this.props.navigation.navigate('Welcome')
  }



  render() {
   
    return (
        
     <SafeAreaView
      source={constants.loginbg}
      style={styles.container}>
    
    <View style={styles.topView}>
       <MyView  hide={this.state.search} style={styles.searchContainer}>
          <View style={styles.topSearchbar}>
              <Image source={constants.searchicon} style={styles.newsearchIcon} />
              <View style={styles.empty}>
              </View>
            <TextInput  style={styles.searchContainer} placeholder="Search job"  placeholderTextColor="white" style={styles.topInput}/>
          </View>
      </MyView>
    <MyView style={styles.tabsToolbar} hide={!this.state.search}>
        <TouchableOpacity onPress={() => this.openDrawer()}>
        <Image source={constants.menuicon} style={styles.hamburgerIcon} />
        </TouchableOpacity>
         <Text style={styles.toolbarTitle}>Settings</Text>
         <TouchableOpacity onPress={() => this.searchPage()}>
        <Image source={constants.searchicon} style={styles.searchIcon} />
        </TouchableOpacity>
     </MyView>
     </View>
     <View style={{backgroundColor: "#f0f0f0",alignItems: 'center',width: dimensions.fullWidth - 20,marginLeft: 10,marginTop: 30,height: 50,justifyContent: 'flex-start',flexDirection: 'row'}}>
            <Image source={constants.notifyIcon} style={{marginLeft: 12,width: 25,height: 30}}/>
            <Text style={{marginLeft: 12}}>Notifications</Text>
            <View style={{marginLeft:dimensions.fullWidth/2 - 30 ,backgroundColor: "clear"}}>
              <Switch
                onValueChange = {this.toggleSwitch1}
                value = {this.state.switch1Value1}/>
            </View></View>
            {/* <View style={{backgroundColor: "#f0f0f0",alignItems: 'flex-start',width: dimensions.fullWidth - 20,marginLeft: 10,marginTop: 30,height: 50,justifyContent: 'flex-start',flexDirection: 'row',alignItems: 'center'}}>
              <Image source={constants.volumeIcon} style={{marginLeft: 12,width: 25,height: 25}}/>
              <Text style={{marginLeft: 12}}>Volume        </Text>
              <View style={{marginLeft:dimensions.fullWidth/2 - 30 ,backgroundColor: "clear"}}>
                <Switch
                  onValueChange = {this.toggleSwitch2}
                  value = {this.state.switch1Value2}/>
              </View>
            </View> */}
            <View style={{backgroundColor: "#f0f0f0",alignItems: 'flex-start',width: dimensions.fullWidth - 20,marginLeft: 10,marginTop: 30,height: 50,justifyContent: 'flex-start',flexDirection: 'row',alignItems: 'center'}}>
              <Image source={constants.langIcon} style={{marginLeft: 12,width: 25,height: 25}}/>
              <Text style={{marginLeft: 12}}>Language     </Text>
              <View style={{left:dimensions.fullWidth/2 - 150,backgroundColor: 'clear',width: dimensions.fullWidth/2,height: 50,flexDirection: 'row'}}>
  <TouchableOpacity onPress={() => this.englishTap()}><View style={{marginLeft: 0,height: 50,backgroundColor: 'clear',width: dimensions.fullWidth/4,flexDirection: 'row',alignItems: 'center'}}>
<Image source={this.state.englishImage} style={{marginLeft: 0,width: 25,height: 25}}/>
  <Text style={{marginLeft: 8}}>English</Text>
</View></TouchableOpacity>
    <TouchableOpacity onPress={() => this.ArabicTap()}><View style={{marginLeft: 0,height: 50,backgroundColor: 'clear',width: dimensions.fullWidth/4,flexDirection: 'row',alignItems: 'center'}}>
    <Image source={this.state.arabicImage} style={{marginLeft: 0,width: 25,height: 25}}/>
      <Text style={{marginLeft: 8}}>Arabic</Text>
  </View></TouchableOpacity>



 

              </View>
            </View>

{/* <View style = { styles.MainContainer } >

            <TouchableOpacity style={styles.bottomView} onPress={() => this.logOut()}>
         <Text style={styles.textStyle}>Log Out</Text>
      </TouchableOpacity>
      </View> */}
 </SafeAreaView>
      
     
    );
  }
}

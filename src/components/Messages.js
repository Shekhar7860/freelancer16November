import React, {Component} from 'react';
import {Platform, StyleSheet, SafeAreaView, Text, TextInput, View, Image, ImageBackground, Button, TouchableOpacity} from 'react-native';
import Constants from '../constants/Constants';
import Service from '../services/Service';
import MyView from './MyView';
import Loader from './Loader';
import CustomToast from './CustomToast';
export default class Messages extends Component {
 constructor(props){
     super(props);
     service = new Service();
     constants = new Constants();
     this.state = {
        userData: { picture_large:{ data:{}}},
        search : true,
        loading:false,
        dummyText : ""
      };
   
 }
 componentDidMount() {
  this.setState ({ loading: true});
  setTimeout(() => {
    this.setState ({ loading: false});
    this.setState ({ dummyText: "No Messages Found"});
    }, 2000)
 }
 openDrawer = () => {
   this.props.navigation.openDrawer()}

   searchPage = () =>{
    this.setState({ search: false});
        }

  render() {
   
    return (
        
     <SafeAreaView
     >
    
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
         <Text style={styles.toolbarTitle}>Messages</Text>
         <TouchableOpacity onPress={() => this.searchPage()}>
        <Image source={constants.searchicon} style={styles.searchIcon} />
        </TouchableOpacity>
     </MyView>
     </View>
        <View style={styles.noTextContainer}>
        <Text style = {styles.defaultTextSize}>{this.state.dummyText}</Text>
        </View>
    
     <Loader
              loading={this.state.loading} />
 </SafeAreaView>
      
     
    );
  }
}

import React, {Component} from 'react';
import {Platform, StyleSheet, TextInput, FlatList, ScrollView, SafeAreaView, Text, View, Image, ImageBackground, Button, TouchableOpacity} from 'react-native';
import Constants from '../constants/Constants';
import Service from '../services/Service';
import Loader from './Loader';
import MyView from './MyView';
export default class FindFreelancer extends Component {
 constructor(props){
     super(props);
     service = new Service();
     constants = new Constants();
     this.state = {
        userData: { picture_large:{ data:{}}},
        userResponse: {}, 
        freelancers : {},
        loading:false,
        search : true
      };
   
 }

 componentWillUnmount () {
  this.setState ({ loading: false});
 }
 _onError = () => {
  this.setState({ failed: true });
}
 componentDidMount ()   {
  if(this.props.navigation.state.params)
  {
   console.log(this.props.navigation.state.params)
   }  
  this.setState ({ loading: true});
  setTimeout(() => {
    this.setState ({ loading: false});
    service.getUserData('user').then((keyValue) => {
      console.log("local", keyValue);
      var parsedData = JSON.parse(keyValue);
      console.log("json", parsedData);
      this.setState({ userResponse: parsedData});
       this.getFreelancersResponse();
   }, (error) => {
      console.log(error) //Display error
    });

    }, 2000)
   
   }

 openDrawer = () => {
   this.props.navigation.openDrawer()}

   getFreelancersResponse = () => {
    service.findFreelancer(this.state.userResponse.api_token).then((res) => {
      console.log("checkres", res);
      newres = JSON.stringify(res);
      json = JSON.parse(newres);
      this.setState({ freelancers: json});
    })
   }

   openFreelancerDetails = (val) => {
   if(this.props.navigation.state.params)
   {
    var clientDetails = 
    {
      clt_Details : this.props.navigation.state.params,
      freelancerDetails : val
    }
  }
  else 
  {
      var clientDetails = 
    {
      freelancerDetails : val
    }
  }
   this.props.navigation.navigate('FreelancerDetails', { freelancerdetails: clientDetails }) 
 }

 searchPage = () =>{
  this.setState({ search: false});
      }

  
  render() {
    const defaultImg =
    'https://satishrao.in/wp-content/uploads/2016/06/dummy-profile-pic-male.jpg'

    console.log(this.state.freelancers.freelancer)
    
    return (
        
     <SafeAreaView
      source={constants.loginbg}
      style={styles.container}>
       <View style={styles.topView}>
        <MyView style={styles.tabsToolbar}>
        <TouchableOpacity onPress={() => this.openDrawer()}>
        <Image source={constants.menuicon} style={styles.hamburgerIcon} />
        </TouchableOpacity>
         <Text style={styles.toolbarTitle}>FIND FREELANCER</Text>
         <TouchableOpacity>
        </TouchableOpacity>
         <TouchableOpacity >
         <Image source={constants.HJJHIcon} style={styles.searchIcon} />
        </TouchableOpacity>
        </MyView>
       </View>
       <View style={styles.searchPadding}>
       <MyView  style={styles.searchContainer}>
          <View style={styles.topSearchbar}>
              <Image source={constants.searchicon} style={styles.newsearchIcon} />
              <View style={styles.empty}>
              </View>
            <TextInput placeholder="Search"  placeholderTextColor="#a2a2a2" style={styles.topInput}/>
            
          </View>
      </MyView>
      </View>
     
     <ScrollView>
     <View style={styles.listCenter}>
     <FlatList
        data={this.state.freelancers.freelancer}
        style={styles.freelancerlistCardWidth}
        renderItem={({ item }) => (
           <View  style={styles.spaceFromTop}>
              <TouchableOpacity style={styles.listCardFreelancer} onPress={() => this.openFreelancerDetails(item)}>
              <View style={styles.textInRowlist}> 
                 <View style = {styles.imageFreelancerContainer}>
                 <Image source={{ uri: item.image_path || defaultImg  }}    style={styles.freelancerprofilePic} />
                  </View>
                  <View style={styles.textFreelancerContainer}>
                  <Text style={styles.email}>{item.email} <Text style={styles.freelancerProfileText}>{item.username}</Text> </Text>
                  </View>
                  <View style={styles.emptyFreelancerContainer}>
                  </View>
                  <View style={styles.iconFreelancerContainer}>
                  <TouchableOpacity >
                  <Image source={constants.nextIcon} style={styles.nextIcon} />
                   </TouchableOpacity>
                  </View>
              </View>
              </TouchableOpacity>
          </View>
         )}
         />
     </View>
     </ScrollView>
     <Loader
              loading={this.state.loading} />

 </SafeAreaView>
      
     
    );
  }
}

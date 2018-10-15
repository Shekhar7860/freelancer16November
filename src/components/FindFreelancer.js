import React, {Component} from 'react';
import {Platform, StyleSheet, TextInput, FlatList, SafeAreaView, Text, View, Image, ImageBackground, Button, TouchableOpacity} from 'react-native';
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
   var clientDetails = 
   {
     clt_Details : this.props.navigation.state.params.client_Details,
     freelancerDetails : val

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
         <Text style={styles.toolbarTitle}>Find Freelancer</Text>
         <TouchableOpacity onPress={() => this.searchPage()}>
        <Image source={constants.searchicon} style={styles.searchIcon} />
        </TouchableOpacity>
     </MyView>
     </View>
     <View style={styles.listCenter}>
     <FlatList
        data={this.state.freelancers.freelancer}
        style={styles.freelancerlistCardWidth}
        renderItem={({ item }) => (
           <View  style={styles.spaceFromTop}>
              <TouchableOpacity style={styles.listCardFreelancer} onPress={() => this.openFreelancerDetails(item)}>
              <View style={styles.textInRow}> 
                 <View >
                 <Image source={{ uri: item.image_path || defaultImg  }}    style={styles.freelancerprofilePic} />
                  </View>
                  <View style={styles.contPadding}>
                     <Text >-</Text>
                  </View>
                  <View >
                     <Text style={styles.email}>{item.email} </Text>
                  </View>
              </View>
              </TouchableOpacity>
          </View>
         )}
         />
     </View>
     <Loader
              loading={this.state.loading} />
 </SafeAreaView>
      
     
    );
  }
}

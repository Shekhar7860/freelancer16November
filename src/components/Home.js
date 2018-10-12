import React, {Component} from 'react';
import {Platform, StyleSheet, SafeAreaView,TextInput, FlatList,  Text, View, Image, ImageBackground, Button, TouchableOpacity} from 'react-native';
import Constants from '../constants/Constants';
import Service from '../services/Service';
import Tabs from './Tabs';
import Details from './Details';
import Loader from './Loader';
import FEED from './Feed';
import MyView from './MyView';
import CustomToast from './CustomToast';
export default class Home extends Component {
 constructor(props){
     super(props);
     service = new Service();
     constants = new Constants();
     this.state = {
      userResponse: {},
      feeds : {user:{ Job: [] }},
      favourites : { Job: [] },
      heartIcon : constants.heartIcon,
      showSoundImg: true,
      isFeed : true,
      loading:false,
      isFav  : false,
      isCat : false,
      search : true,
      itemFav : false
    };
 }

 pressIcon = (val, index) => {
   console.log(val);
   if(val.is_favourite === 0 ){
    this.setState({ itemFav : true});
   }
  service.addFav(this.state.userResponse.api_token, val.jobid, this.state.itemFav).then((res) => {
    console.log("checkres", res);
    newres = JSON.stringify(res);
    json = JSON.parse(newres);
    if(json.status_code == 200)
    {
      this.refs.defaultToastBottom.ShowToastFunction('Job Added to Favourites Successfully');
      this.getActiveJobs();
    }
    //this.setState({ feeds: json});
  })
}

openDetails = (val) => {
  console.log(this.props);
 this.props.navigation.navigate('Detail',  { details: val }) 
}

componentDidMount ()   {
 this.setState ({ loading: true});
 setTimeout(() => {
   this.setState ({ loading: false});
   service.getUserData('user').then((keyValue) => {
     console.log("local", keyValue);
     var parsedData = JSON.parse(keyValue);
     console.log("json", parsedData);
     this.setState({ userResponse: parsedData});
      this.getFeedRes();
      this.getActiveJobs();
  }, (error) => {
     console.log(error) //Display error
   });
   }, 2000)

}

addToFavourites = () => {
console.log("heartfilled" + constants.paymentIcon)
 if(this.state.icon === constants.heartIcon)
 {
 this.setState ({  heartIcon: constants.heartIconfilled});
 }
 else 
 {
   this.setState ({  heartIcon: constants.heartIcon});
 }
}

getFeedRes = () => {
 service.getFeedList(this.state.userResponse.api_token).then((res) => {
   console.log("checkres", res);
   newres = JSON.stringify(res);
   json = JSON.parse(newres);
   this.setState({ feeds: json});
 })
}

getActiveJobs = () => {
  service.getFavJobList(this.state.userResponse.api_token).then((res) => {
    console.log("listcheckres", res);
    newres = JSON.stringify(res);
    json = JSON.parse(newres);
    this.setState({ favourites: json});
  })
 }

hideTab = () => {
  
  if(this.state.isFeed)
  {
    this.setState({ isFeed: false});
    this.setState({ isFav: true});
  }
  else 
  {
    this.setState({ isFeed: true});
    this.setState({ isFav: false});
  }
  
}
  openDrawer = () => {
   this.props.navigation.openDrawer()}

   goToNotification = () => {
    this.props.navigation.navigate('Notifications')}

  searchPage = () =>{
    this.setState({ search: false});
        }

    openDetails = (val) => {
      console.log(this.props);
      this.props.navigation.navigate('Details',  { details: val }) 
    }

  render() {
   console.log(this.state.favourites)
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
         <Text style={styles.toolbarTitle}>Freelancer</Text>
         <TouchableOpacity onPress={() => this.goToNotification()}>
         <Image source={constants.notificationIcon} style={styles.searchIcon} />
        </TouchableOpacity>
         <TouchableOpacity onPress={() => this.searchPage()}>
         <Image source={constants.searchicon} style={styles.searchIcon} />
        </TouchableOpacity>
        </MyView>
       
       </View>
       <View style={styles.tabs}>
          <View style={styles.empty}>
          </View>
          <TouchableOpacity style={styles.Tab1} onPress={() => this.hideTab()}>
            <Text style={styles.textFeed}>FEED</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Tab3} onPress={() => this.hideTab()}>
            <Text style={styles.textWhite}>FAVOURITE</Text>
            </TouchableOpacity>
            <View style={styles.empty}>
            </View>
       </View>
       <MyView hide={!this.state.isFeed}>
            <FlatList
              data={this.state.feeds.user.Job}
              keyExtractor={(item, index) => index}
              style={{marginTop :0}}
              extraData={this.state.feeds.user.Job}
              renderItem={({ item, index }) => (
                <View  style={styles.spaceFromTop}>
                    <TouchableOpacity style={styles.listCard} onPress={() => this.openDetails(item)}>
                        <View style={styles.textInRow}> 
                        <Text style={styles.textWrap}> {item.title} 
                        </Text>
                        </View>
                        <View style={styles.textInRow}> 
                          <View >
                              <Text style={styles.priceText}>Fixed Price</Text>
                            </View>
                            <View style={styles.contPadding}>
                              <Text >-</Text>
                            </View>
                            <View >
                              <Text style={styles.date}>{item.start_date} </Text>
                            </View>
                        </View>
                        <View style={styles.paddingAbove}>
                            <View style={styles.textInRow2}> 
                              <View style={styles.skillWidth}>
                                  <Text style={styles.skillText}>Skill Level</Text>
                                </View>
                                <View style={styles.budgetWidth}>
                                  <Text style={styles.skillText}>{item.budget}</Text>
                                </View>
                                <View style={styles.leftSpace}>
                                  <Text style={styles.date}></Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.paddingAbove}>
                            <View style={styles.textInRow2}> 
                              <View style={styles.skillWidth}>
                                  <Text style={styles.skillText}>Expert</Text>
                                </View>
                                <View style={styles.budgetWidth}>
                                  <Text style={styles.skillText}>1000</Text>
                                </View>
                                <View style={styles.leftSpace}>
                                  <TouchableOpacity   onPress={() => this.pressIcon(item, index)}>
                                    <MyView style={styles.topMargin} hide={!this.state.isFav }> 
                                          <Image source={ constants.heartIconfilled } style={styles.icon}/>
                                  </MyView>
                                      <MyView style={styles.topMargin} hide={this.state.isFav }> 
                                          <Image source={ constants.heartIcon } style={styles.icon}/>
                                    </MyView>
                                  </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        </TouchableOpacity>
                </View>
              )}
            />
            </MyView>
            <MyView hide={!this.state.isFav}>
            <FlatList
              data={this.state.favourites.Job}
              keyExtractor={(item, index) => index}
              extraData={this.state.favourites.Job}
              renderItem={({ item, index }) => (
                <View  style={styles.spaceFromTop}>
                    <TouchableOpacity style={styles.listCard} onPress={() => this.openDetails(item)}>
                        <View style={styles.textInRow}> 
                        <Text style={styles.textWrap}> {item.title} 
                        </Text>
                        </View>
                        <View style={styles.textInRow}> 
                          <View >
                              <Text style={styles.priceText}>Fixed Price</Text>
                            </View>
                            <View style={styles.contPadding}>
                              <Text >-</Text>
                            </View>
                            <View >
                              <Text style={styles.date}>{item.start_date} </Text>
                            </View>
                        </View>
                        <View style={styles.paddingAbove}>
                            <View style={styles.textInRow2}> 
                              <View style={styles.skillWidth}>
                                  <Text style={styles.skillText}>Skill Level</Text>
                                </View>
                                <View style={styles.budgetWidth}>
                                  <Text style={styles.skillText}>{item.budget}</Text>
                                </View>
                                <View style={styles.leftSpace}>
                                  <Text style={styles.date}></Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.paddingAbove}>
                            <View style={styles.textInRow2}> 
                              <View style={styles.skillWidth}>
                                  <Text style={styles.skillText}>Expert</Text>
                                </View>
                                <View style={styles.budgetWidth}>
                                  <Text style={styles.skillText}>1000</Text>
                                </View>
                                <View style={styles.leftSpace}>
                                </View>
                            </View>
                        </View>
                        </TouchableOpacity>
                </View>
              )}
            />
            </MyView>
            <CustomToast ref = "defaultToastBottom"/> 
     <Loader
              loading={this.state.loading} />
 </SafeAreaView>
      
     
    );
  }
}

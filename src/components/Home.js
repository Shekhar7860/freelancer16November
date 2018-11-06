import React, {Component} from 'react';
import {Platform, StyleSheet, SafeAreaView, ScrollView,Alert, TouchableHighlight, TextInput, Modal, FlatList, Text, View, Image, ImageBackground, Button, TouchableOpacity} from 'react-native';
import Constants from '../constants/Constants';
import Service from '../services/Service';
import Tabs from './Tabs';
import Details from './Details';
import Loader from './Loader';
import FEED from './Feed';
import MyView from './MyView';
import CustomToast from './CustomToast';
import strings from '../services/stringsoflanguages';
import{ colors, fonts, padding, dimensions, align} from '../styles/base';
export default class Home extends Component {

state = {
userResponse: {},
feeds : {request_list: [] },
favourites : { request_list: [] },
heartIcon : constants.heartIcon,
showSoundImg: true,
isFeed : true,
loading:false,
isFav : false,
isCat : false,
search : true,
itemFav : false,
modalVisible: false,
noText : true,
dummyText : "",
favStatus : false
};

constructor(props){
super(props);
service = new Service();
constants = new Constants();
// this.componentWillUnmount();
}


updateValue(props) {
this.setState ({ loading: true});
setTimeout(() => {
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
// service.saveUserData('count', '1');
}, 3000)
} 

pressIcon = (val, index) => {
console.log(val);
if(val.is_favourite === 0 ){
this.setState({ itemFav : true});
}

this.setState({favStatus:!this.state.favStatus})

service.addFav(this.state.userResponse.api_token, val.jobid, true).then((res) => {
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

setModalVisible(visible) {
this.setState({modalVisible: visible});
}

openDetails = (val) => {
// console.log(this.props);
this.props.navigation.navigate('Detail', { details: val }) 
}


checkLanguage=()=>{


service.getUserData("language").then(
keyValue => {
if(keyValue == "true")
{
strings.setLanguage("en");
}else{
strings.setLanguage("ar");
}

},
error => {
console.log(error); //Display error
}
);

}

componentDidMount () {
this.setState ({ loading: true});
setTimeout(() => {
service.getUserData('user').then((keyValue) => {
console.log("local", keyValue);
var parsedData = JSON.parse(keyValue);
console.log("json", parsedData);
this.setState({ userResponse: parsedData});
this.getFeedRes();
this.getActiveJobs();
this.checkLanguage();
}, (error) => {
console.log(error) //Display error
});
// service.saveUserData('count', '1');
}, 3000)
}

addToFavourites = () => {
console.log("heartfilled" + constants.paymentIcon)
if(this.state.icon === constants.heartIcon)
{
this.setState ({ heartIcon: constants.heartIconfilled});
}
else 
{
this.setState ({ heartIcon: constants.heartIcon});
}
}

getFeedRes = () => {
service.getFeedList(this.state.userResponse.api_token).then((res) => {
console.log("checkres", res);
if(res != undefined)
{
this.setState ({ loading: false});
if(res.request_list == "")
{
this.setState ({ dummyText:strings.NoRequestFound});
this.setState ({ noText: false});
}
newres = JSON.stringify(res);
json = JSON.parse(newres);
this.setState({ feeds: json});
}
})
}

getActiveJobs = () => {
service.getFavJobList(this.state.userResponse.api_token).then((res) => {
console.log("listcheckres", res);
if(res != undefined)
{
newres = JSON.stringify(res);
json = JSON.parse(newres);
this.setState({ favourites: json});
}
})
}

hideSearch = () =>{
this.setState({ search: true});
}

hideTab = () => {
this.setState({ isFeed: true});
this.setState({ isFav: false});
}


hideTab2=()=>{
this.setState({ isFeed: false});
this.setState({ isFav: true});
}

openDrawer = () => {
this.props.navigation.openDrawer()}

goToNotification = () => {
this.props.navigation.navigate('Notifications')}

searchPage = () =>{
this.setState({ search: false});
}

openDetails = (val) => {
console.log(val);
service.saveUserData('userdetails', val);
this.props.navigation.navigate('Details', { details: val }) 
}

render() {
// console.log(this.state.favourites)
return (

<SafeAreaView
source={constants.loginbg}
style={styles.container}>
<View style={styles.topView}>
<MyView hide={this.state.search} style={styles.searchContainer}>
<View style={styles.topSearchbar}>
<Image source={constants.searchicon} style={styles.newsearchIcon} />
<View style={styles.empty}>
</View>
<TextInput style={styles.searchContainer} placeholder="Search job" placeholderTextColor="white" style={styles.topInput}/>
<Text style={styles.closeButtton} onPress={() => this.hideSearch()}>X</Text>
</View>
</MyView>
<MyView style={styles.tabsToolbar} hide={!this.state.search}>
<TouchableOpacity onPress={() => this.openDrawer()}>
<Image source={constants.menuicon} style={styles.hamburgerIcon} />
</TouchableOpacity>
<Text style={styles.toolbarTitle}>{strings.Freelancerstring}</Text>
<TouchableOpacity onPress={() => this.goToNotification()}>
<Image source={constants.notificationIcongrey} style={styles.searchIcon} />
</TouchableOpacity>
<TouchableOpacity >
<Image source={constants.searchicon} style={styles.searchIcon} />
</TouchableOpacity>
</MyView>

</View>
<View style={styles.tabs}>
<View style={styles.empty}>
</View>
<TouchableOpacity style={styles.Tab1} onPress={() => this.hideTab()}>
<Text style={{color :this.state.isFeed == false ? "white" : colors.theme_orange,textAlign :'center',paddingTop:15,left: -10,width:dimensions.fullWidth/2}}>{strings.FEEDstring}</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.Tab3} onPress={() => this.hideTab2()}>
<Text style={{color :this.state.isFeed == true ? "white" : colors.theme_orange ,textAlign :'center',paddingTop:15,width:dimensions.fullWidth/2}}>{strings.FAVOURITEstring}</Text>
</TouchableOpacity>
<View style={styles.empty}>
</View>
</View>
<ScrollView>
<MyView hide={!this.state.isFeed}>
<MyView style={styles.noTextContainer} hide={this.state.noText}>
<Text style = {styles.defaultTextSize}>{this.state.dummyText}</Text>
</MyView>
<FlatList
data={this.state.feeds.request_list}
keyExtractor={(item, index) => index}
style={{marginTop :0}}
extraData={this.state.feeds.request_list}
renderItem={({ item, index }) => (
<View style={styles.spaceFromTop}>
<TouchableOpacity style={styles.listCard} onPress={() => this.openDetails(item)}>
<View style={styles.textInRow} > 
<Text style={styles.textWrap}> {item.title} 
</Text>
</View>
<View style={styles.textInRow} > 
<View >
<Text style={styles.priceText}>Fixed Price</Text>
</View>
<View style={styles.contPadding}>
<Text >-</Text>
</View>
<View >
<Text style={styles.date}>{item.budget} </Text>
</View>
</View>
<View style={styles.paddingAbove}>
</View>
<View style={styles.paddingAbove}>
<View style={styles.textInRow2}> 
<View style={styles.skillWidth} >
<Text style={styles.skillText}></Text>
</View>
<View style={styles.budgetWidth}>
</View>
<View style={styles.leftSpace} >
<TouchableOpacity onPress={() => this.pressIcon(item, index)}>
<Image source={ item.isFavourite == 0 ? constants.heartIcon : constants.heartIconfilled} style={styles.iconHeart}/>
</TouchableOpacity>
</View>
</View>
</View>
</TouchableOpacity>
</View>
)}
/>
</MyView>
</ScrollView>
<ScrollView>
<MyView hide={!this.state.isFav}>
<FlatList
data={this.state.favourites.request_list}
keyExtractor={(item, index) => index}
extraData={this.state.favourites.request_list}
renderItem={({ item, index }) => (
<View style={styles.spaceFromTop}>
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
</ScrollView>
<CustomToast ref = "defaultToastBottom"/> 
<Loader
loading={this.state.loading} />

<Modal
transparent={true}
animationType={'none'}
visible={this.state.modalVisible}
onRequestClose={() => {console.log('close modal')}}>
<View style={styles.homemodalBackground}>
<View style={styles.homeModalStyle}>
<View style={styles.modalToolbar}>
<TouchableOpacity style={styles.commontoolbarButton} >
</TouchableOpacity>
<Text style={styles.modalTitle}>Modal</Text>
<TouchableOpacity style={styles.commontoolbarButton} onPress={() => {
this.setModalVisible(!this.state.modalVisible);
}}>
<Image source={constants.closeIcon} style={styles.commonBackIcon}/>
</TouchableOpacity>
</View>
<Text>About Us</Text>
<Text>Know About the Application</Text>
</View>
</View>
</Modal> 
</SafeAreaView>
);
}
}
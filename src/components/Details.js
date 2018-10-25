import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, ScrollView, SafeAreaView,Image, ImageBackground, ActivityIndicator, TouchableOpacity, TouchableNativeFeedback} from 'react-native';
import styles from '../styles/styles';
import Constants from '../constants/Constants';
import Loader from './Loader';
import HTMLView from 'react-native-htmlview';
import CustomToast from './CustomToast';
import Service from '../services/Service';
import MyView from './MyView';
export default class Details extends Component {
  constructor(props){
    super(props);
    constants = new Constants();
    service = new Service();
    this.state = { 
      userResponse: {},
        details : {},
        loading:false,
        accepted : false
      }
  }

 componentDidMount() {
    this.setState ({ loading: true});
    setTimeout(() => {
      this.setState ({ loading: false});
      service.getUserData('user').then((keyValue) => {
        console.log("local", keyValue);
        var parsedData = JSON.parse(keyValue);
        console.log("json", parsedData);
        this.setState({ userResponse: parsedData});
     }, (error) => {
        console.log(error) //Display error
      });
      if(this.props.navigation.state.params)
    {
    this.setState({ details: this.props.navigation.state.params.details})
      if(this.props.navigation.state.params.details.request_status != "Pending")
      {
        this.setState({ accepted : true})
      }
     }    
      }, 1000)
    
  }

  requestAcceptReject = (val) => 
  {
  this.setState ({ loading: true});
  setTimeout(() => {
    this.setState ({ loading: false});
    if(val == "a")
    {
      service.requestResponse(this.state.userResponse.api_token, "Accepted", this.state.details.jobid).then(res => {
        console.log("reslocal", res);
        if(res)
        {
          this.refs.defaultToastBottom.ShowToastFunction('Request Accepted Successfully');
          this.goToHome();
        }
        else
        {
          this.refs.defaultToastBottom.ShowToastFunction('An Error Occured');
        }
      });
     
    }
    else
    {
      service.requestResponse(this.state.userResponse.api_token, "Decline", this.state.details.jobid).then(res => {
        console.log("reslocal", res);
        if(res)
        {
          this.refs.defaultToastBottom.ShowToastFunction('Request Rejected');
          this.goToHome();
        }
        else
        {
          this.refs.defaultToastBottom.ShowToastFunction('An Error Occured');
        }
      });
    }
    }, 2000)
  }

  goBack = () =>{
    this.props.navigation.navigate('Home')
   }

goToHome()
{
setTimeout(() => {
this.props.navigation.navigate('Home')
}, 1000)
}

createMilestone()
{
setTimeout(() => {
this.props.navigation.navigate('Create')
}, 1000)
}
  
  render() {
      console.log(this.state.details)
    return (
  <SafeAreaView style = { styles.MainContainerRequest }>
        <View style={styles.commontoolbar}>
          <TouchableOpacity style={styles.commontoolbarButton} onPress={() => this.goBack()}>
          <Image source={constants.backicon} style={styles.commonBackIcon}/>
          </TouchableOpacity>
          <Text style={styles.toolbarTitle}>Job Details</Text>
          <Text style={styles.commontoolbarButton}></Text>
        </View>
        <ScrollView style={styles.detailsContainer}>
       <View style={styles.rowAlignSideMenuRequest}>
                  <View> 
                  <Text style={styles.textWrapDetails}> Title
                  </Text>
                  </View>
                  <View style={styles.colon}><Text> :</Text>
                  </View>
                  <View > 
                  <Text style={styles.textWrap2Details}> {this.state.details.title}
                  </Text>
                  </View>
         </View>
         <View style={styles.rowAlignSideMenuRequest}>
                  <View> 
                  <Text style={styles.textWrapDetails}> Country
                  </Text>
                  </View>
                  <View style={styles.colon}><Text> :</Text>
                  </View>
                  <View > 
                  <Text style={styles.textWrap2Details}> {this.state.details.country}
                  </Text>
                  </View>
         </View>
         {/* <View style={styles.rowAlignSideMenuRequest}>
                  <View> 
                  <Text style={styles.textWrapDetails}> Job Type
                  </Text>
                  </View>
                  <View style={styles.colon}><Text> :</Text>
                  </View>
                  <View > 
                  <Text style={styles.textWrap2Details}> {this.state.details.job_type}
                  </Text>
                  </View>
         </View> */}
         <View style={styles.rowAlignSideMenuRequest}>
                  <View> 
                  <Text style={styles.textWrapDetails}> Budget
                  </Text>
                  </View>
                  <View style={styles.colon}><Text> :</Text>
                  </View>
                  <View > 
                  <Text style={styles.textWrap2Details}> {this.state.details.budget}
                  </Text>
                  </View>
         </View>
         <View style={styles.rowAlignSideMenuRequest}>
                  <View> 
                  <Text style={styles.textWrapDetails}>  Date
                  </Text>
                  </View>
                  <View style={styles.colon}><Text> :</Text>
                  </View>
                  <View > 
                  <Text style={styles.textWrap2Details}> {this.state.details.end_date}
                  </Text>
                  </View>
         </View>
         {/* <View style={styles.rowAlignSideMenuRequest}>
                  <View> 
                  <Text style={styles.textWrapDetails}> Skills
                  </Text>
                  </View>
                  <View style={styles.colon}><Text> :</Text>
                  </View>
                  <View > 
                  <Text style={styles.textWrap2Details}> {this.state.details.skills}
                  </Text>
                  </View>
         </View> */}
         <View style={styles.rowAlignSideMenuRequest}>
                  <View> 
                  <Text style={styles.textWrapDetails}> Status
                  </Text>
                  </View>
                  <View style={styles.colon}><Text> :</Text>
                  </View>
                  <View > 
                  <Text style={styles.textWrap2Details}> {this.state.details.request_status}
                  </Text>
                  </View>
         </View>
         <View style={styles.rowAlignSideMenuRequest}>
                  <View> 
                  <Text style={styles.textWrapDetails}> Description
                  </Text>
                  </View>
                  <View style={styles.colon}><Text> :</Text>
                  </View>
                  <View > 
                  <Text style={styles.textWrap2Details}> {this.state.details.description}
                  </Text>
                  </View>
         </View>
         <Loader
              loading={this.state.loading} /> 
     </ScrollView>
     <Loader
              loading={this.state.loading} />
    <MyView style={styles.footer} hide={this.state.accepted}>
              <View  style={styles.rowAlignSideMenu}>
              <View style={styles.emptySpaceRequest}>
              </View>
              <View style={styles.buttonWidthRequest}>
                <Button  style={styles.buttonColor} title="Accept" onPress={() => this.requestAcceptReject('a')}></Button>
              </View>
              <View style={styles.emptySpaceRequest}>
              </View>
              <View style={styles.buttonWidthRequest}>
                <Button  style={styles.buttonColor} title="Reject" onPress={() => this.requestAcceptReject('r')}></Button>
              </View>
                <View style={styles.emptySpaceRequest}>
              </View>
              </View> 
      </MyView> 
      <CustomToast ref = "defaultToastBottom"/>  
   </SafeAreaView>
	   
    );
  }
}


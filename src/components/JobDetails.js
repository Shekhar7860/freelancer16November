import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,ScrollView, SafeAreaView,Image, ImageBackground, ActivityIndicator, TouchableOpacity, TouchableNativeFeedback} from 'react-native';
import styles from '../styles/styles';
import Constants from '../constants/Constants';
import Loader from './Loader';
import HTMLView from 'react-native-htmlview';
import CustomToast from './CustomToast';
import Service from '../services/Service';
import MyView from './MyView';
export default class JobDetails extends Component {
  constructor(props){
    super(props);
    constants = new Constants();
    service = new Service();
    this.state = { 
      userResponse: {},
        details : {},
        loading:false,
        hireText : "Find Freelancer",
        hired : false
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
      if(this.props.navigation.state.params.details.details.request_status == "Accepted")
      {
        this.setState({ hireText: "Hire Freelancer"})
      }
      else if(this.props.navigation.state.params.details.details.request_status == "Hired")
      {
        this.setState({ hired: true})
      }
    this.setState({ details: this.props.navigation.state.params.details.details})
     }    
      }, 1000)
    
  }

  goToFreelancerPage = (status) => {
    var clientDetails = {
      apiToken : this.props.navigation.state.params.details.token,
      jobId : this.state.details.jobid
    }
    if (status == "Find Freelancer")
    {
    this.props.navigation.navigate('FindFreelancer', { client_Details: clientDetails })
    }
    else
    {
      this.setState ({ loading: true});
      setTimeout(() => {
        this.setState ({ loading: false});
        service.requestResponse(this.state.userResponse.api_token, "Hired", this.props.navigation.state.params.details.details.jobid).then((res) => {
          console.log("checkres", res);
          if(res.status == "success")
          {
            this.refs.defaultToastBottom.ShowToastFunction('Hired Successfully');
             this.goToHome();
          }
          else 
          {
            this.refs.defaultToastBottom.ShowToastFunction("An Error Occured"); 
          }
        })
        
      }, 1000)
    }
   }

  goBack = () => {
    this.props.navigation.navigate('Jobs');
   }

   goToHome()
   {
   setTimeout(() => {
   this.props.navigation.navigate('Jobs')
   }, 1000)
   }
   
  
  render() {
      console.log(this.props.navigation.state.params.details)
    return (
  <SafeAreaView style = { styles.MainContainer }>
  <ScrollView>
        <View style={styles.commontoolbar}>
          <TouchableOpacity style={styles.commontoolbarButton} onPress={() => this.goBack()}>
          <Image source={constants.backicon} style={styles.commonBackIcon}/>
          </TouchableOpacity>
          <Text style={styles.toolbarTitle}>Job Details</Text>
          <Text style={styles.commontoolbarButton}></Text>
        </View>
	     <View style={styles.detailsContainer}>
	       <Text style={styles.jobTitle}>{this.state.details.title}</Text>
           <View style={styles.textInRowJob}>
               <Text>Required Connects</Text>
               <Text>-</Text>
               <Text>2 (60 available)</Text>
           </View>
           <View style={styles.space}>
                <View style={styles.textInRow2}> 
                        <View style={styles.skillWidth}>
                        <Image source={constants.clockIcon} style={styles.icon}/>
                            </View>
                            <View style={styles.budgetWidth}>
                            </View>
                            <View style={styles.leftSpace}>
                            <Image source={constants.clockIcon} style={styles.icon}/>
                            </View>
                    </View>
                    <View style={styles.textInRow2}> 
                        <View style={styles.skillWidth}>
                        <Text style={styles.jobTitle}>Hourly</Text>
                            </View>
                            <View style={styles.budgetWidth}>
                            </View>
                            <View style={styles.leftSpace}>
                            <Text style={styles.jobTitle}>Expert</Text>
                            </View>
                    </View>
                    <View style={styles.textInRow2}> 
                        <View style={styles.skillWidth}>
                        <Text style={styles.jobTitle}>More than 6 months</Text>
                         </View>
                            <View style={styles.budgetWidth}>
                            </View>
                            <View style={styles.leftSpace}>
                            <Text style={styles.jobTitle}>Skill Level</Text>
                            </View>
                    </View>
                    <View style={styles.space}>
                    <Text style={styles.jobTitle}>Details</Text>
                    <HTMLView value={this.state.details.description} style={styles.jobDescription}/>
                    </View>
            </View>
	     </View>
         <Loader
              loading={this.state.loading} /> 
     </ScrollView>
     <MyView style = { styles.MainContainer } hide={this.state.hired}>
     <TouchableOpacity style={ styles.bottomView} onPress={() => this.goToFreelancerPage(this.state.hireText)}>
         <Text style={styles.textStyle}>{this.state.hireText}</Text>
      </TouchableOpacity>
      </MyView>
      <CustomToast ref = "defaultToastBottom"/>   
   </SafeAreaView>
	   
    );
  }
}


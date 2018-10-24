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
        this.setState({ hireText: "Go To Projects"})
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
    else if ( status == "Go To Projects")
    {
    this.props.navigation.navigate('OpenProjects', { client_Details:  this.state.details.jobid })
    }
    else
    {
      this.setState ({ loading: true});
      setTimeout(() => {
        this.setState ({ loading: false});
        service.requestResponse(this.state.userResponse.api_token, "Hired", this.props.navigation.state.params.details.details.jobid).then((res) => {
          console.log("checkres", res);
          console.log("projectID", this.props.navigation.state.params.details.details.jobid);
          if(res.status == "success")
          {
             this.refs.defaultToastBottom.ShowToastFunction('Hired Successfully');
             var projectDetails = {
               freelancerId : res.freelancer_id,
               jobId : this.props.navigation.state.params.details.details.jobid
             }
             this.goTocreateProject(projectDetails);
          }
          else 
          {
            this.refs.defaultToastBottom.ShowToastFunction("An Error Occured"); 
          }
        })
        
      }, 1000)
    }
   }

   goToJobs = () => {
    this.props.navigation.navigate('Jobs');
   }

   goTocreateProject(projectId)
   {
   setTimeout(() => {
   this.props.navigation.navigate('createProject', { projectDetails: projectId })
   }, 1000)
   }
   
  
  render() {
    console.log(this.props.navigation.state.params.details)
    return (
  <SafeAreaView style = { styles.MainContainerDetails }>
        <View style={styles.commontoolbar}>
        <TouchableOpacity onPress={() => this.goToJobs()}>
        <Image source={constants.backicon} style={styles.backIcon} />
        </TouchableOpacity>
          <Text style={styles.toolbarTitle}>JOB DETAIL</Text>
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
         <View style={styles.rowAlignSideMenuRequest}>
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
         </View>
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
                  <Text style={styles.textWrapDetails}> Start & End Date
                  </Text>
                  </View>
                  <View style={styles.colon}><Text> :</Text>
                  </View>
                  <View > 
                  <Text style={styles.textWrap2Details}> {this.state.details.start_Date} to {this.state.details.end_Date}
                  </Text>
                  </View>
         </View>
         <View style={styles.rowAlignSideMenuRequest}>
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
         </View>
         <View style={styles.rowAlignSideMenuRequest}>
                  <View> 
                  <Text style={styles.textWrapDetails}> Status
                  </Text>
                  </View>
                  <View style={styles.colon}><Text> :</Text>
                  </View>
                  <View > 
                  <Text style={styles.textWrap2Details}> {this.state.details.status}
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
     <TouchableOpacity style={styles.toastMiddle}>
       <CustomToast ref = "defaultToastBottom"/>
       </TouchableOpacity>
     <MyView style = { styles.MainContainer } hide={this.state.hired}>
      <TouchableOpacity style={styles.bottomView} onPress={() => this.goToFreelancerPage(this.state.hireText)}>
         <Text style={styles.textStyle}>{this.state.hireText}</Text>
      </TouchableOpacity>
      </MyView>
      
   </SafeAreaView>
	   
    );
  }
}


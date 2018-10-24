import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity,
  TouchableNativeFeedback
} from "react-native";

import styles from "../styles/styles";
import Constants from "../constants/Constants";

import Service from '../services/Service';
import CustomToast from './CustomToast';
import Loader from './Loader';
import DateTimePicker from 'react-native-modal-datetime-picker'
import Moment from 'moment';

export default class CreateProject extends Component {
  constructor(props) {
    super(props);
    constants = new Constants();

    this.state = { 
      userResponse: {},
      projectId: " ",
      isDateTimePickerVisible: false,
      amount:"",
      startDateText : 'Due Date',
      discripation: '',
      loading: false,
      jobId : " "
     }

  }
  componentDidMount() {
    if (this.props.navigation.state.params) {
      console.log(this.props.navigation.state.params.projectDetails);
      this.setState({ freelancerId: this.props.navigation.state.params.projectDetails.freelancerId });
      this.setState({ jobId: this.props.navigation.state.params.projectDetails.jobId });
    }
    service.getUserData("user").then(
      keyValue => {
        console.log("local", keyValue);
        var parsedData = JSON.parse(keyValue);
        console.log("json", parsedData);
        this.setState({ userResponse: parsedData });
      },
      error => {
        console.log(error); //Display error
      }
    );
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log("date1", date);
    var newDate = Moment(date).format('YYYY-MM-DD');
    this.setState({ startDateText:newDate})
    this._hideDateTimePicker();
  };



  submit = () => 
  {
      if(this.state.amount.trim() === "")
      {
        this.refs.defaultToastBottom.ShowToastFunction('Please Enter Amount');
      }
      else if (this.state.discripation.trim() === "") {
        this.refs.defaultToastBottom.ShowToastFunction('Please enter Discripation');
      } 
      else
    {
          this.setState ({ loading: true});
          setTimeout(() => 
          {
            this.setState({loading: false})
            console.log("project ID", this.state.projectId)
          service.createProject(this.state.userResponse.api_token, this.state.jobId,  this.state.freelancerId,  this.state.amount,this.state.discripation).then((res) => {
         if (res != undefined) 
         {
          console.log(res)
              if (res.status_code == 200)
              {
              if (res.status  == "success" )
              {
                this.refs.defaultToastBottom.ShowToastFunction("Project Created Successfully");
                this.goToMilestone(res);
              }
              else 
              {
                this.refs.defaultToastBottom.ShowToastFunction("An Error Occured"); 
              }
            
            }
        }
      else
      {
        this.refs.defaultToastBottom.ShowToastFunction("Network Error"); 
      }
    })

      }, 3000)
    
    }
  
}

goToMilestone(value)
{
  setTimeout(() => {
  this.props.navigation.navigate('MilestoneList', { details: value })
  }, 1000)
}



  render() {
    return (
      <SafeAreaView style = { styles.MainContainerProject }>
         <View style={styles.tabsToolbar}>
        <TouchableOpacity onPress={() => this.openDrawer()}>
        <Image source={constants.backicon} style={styles.backIcon} />
        </TouchableOpacity>
         <Text style={styles.toolbarTitle}> CREATE PROJECT </Text>
         <TouchableOpacity onPress={() => this.goToNotification()}>
        </TouchableOpacity>
         <TouchableOpacity>
         <Image style={styles.searchIcon} />
        </TouchableOpacity>
        </View>

        <ScrollView>
       
          <TextInput
            style={styles.Createmilestoneinput}
            underlineColorAndroid="transparent"
            placeholder="Amount"
            onChangeText={(text)=>this.setState({ amount:text})}
            placeholderTextColor="#AEA9A8"
            autoCapitalize="none"
            returnKeyType='done'
            keyboardType="numeric"
            value={this.state.amount}
          />
          <TextInput
            style={styles.createmilestoneinputdiscrpation}
            underlineColorAndroid="transparent"
            placeholder="Descripation"
            text
            onChangeText={(text)=>this.setState({ discripation:text})}
            placeholderTextColor="#AEA9A8"
            autoCapitalize="none"
            returnKeyType='done'
            multiline={true}
            numberOfLines={4}
           value={this.state.discripation}
          />
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
       </ScrollView>
       <TouchableOpacity style={styles.toastMiddle}>
       <CustomToast ref = "defaultToastBottom"/>
       </TouchableOpacity>
      <TouchableOpacity style={ styles.bottomViewRequest} onPress={() => this.submit()}>
         <Text style={styles.textStyle}>SUBMIT</Text>
      </TouchableOpacity>
      
       <Loader
          loading={this.state.loading} /> 
       
   </SafeAreaView>
    );
  }
}

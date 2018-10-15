import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView
} from "react-native";

import Constants from '../constants/Constants';
import Service from '../services/Service';
import CustomToast from './CustomToast';
import Loader from './Loader';
import DateTimePicker from 'react-native-modal-datetime-picker'
import Moment from 'moment';

export default class PostProject extends Component {
  constructor(props) {
    super(props);
    service = new Service();
    constants = new Constants();
    this.state = { 
       userResponse: {},
       title:'',
       description:'',
       loading: false,
       country:'',
       jobType:'',
       budget:'',
       skills:'', 
       startDate :'',
       endDate :'',
       category : '',
       isDateTimePickerVisible: false,
       isDateTimePickerVisible2: false,
       startDateText : 'Start Date',
       endDateText : 'End Date',
       category :'Category'
      }
  }
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log("date1", date);
    var newDate = Moment(date).format('YYYY-MM-DD');
    this.setState({ startDateText:newDate})
    this._hideDateTimePicker();
  };

  _showDateTimePicker2 = () => this.setState({ isDateTimePickerVisible2: true });

  _hideDateTimePicker2 = () => this.setState({ isDateTimePickerVisible2: false });

  _handleDatePicked2 = (date) => {
    var newDate = Moment(date).format('YYYY-MM-DD');
    this.setState({ endDateText:newDate})
    this._hideDateTimePicker2();
  };

  componentDidMount() {
    if(this.props.navigation.state.params)
    {
      console.log(this.props.navigation.state.params.category)
      this.setState ({ category: this.props.navigation.state.params.category});
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
    
    openCategory = () => {
      this.props.navigation.navigate("Cat",  { page: 'post' });
    }

  goToproject = () => {
    this.props.navigation.navigate("Projects");
  };

  goBack = () =>{
    this.props.navigation.navigate('Jobs');
   }


  post_project = () => {
    this.setState ({ loading: true});
    setTimeout(() => 
    {
    this.setState({loading: false})
    service.post_project(this.state.userResponse.api_token,this.state.title,this.state.description, this.state.country, this.state.category, this.state.jobType, this.state.budget,this.state.startDateText, this.state.endDateText, this.state.skills).then((res) => {
      console.log(res)
      if(res)
      {
        if(res.status == "success")
        {
          this.refs.defaultToastBottom.ShowToastFunction('Project Posted Successfully');
          this.openProject();
        }
        else
        {
          this.refs.defaultToastBottom.ShowToastFunction('An Error Occured');
        }
       
      }
      else
      {
        this.refs.defaultToastBottom.ShowToastFunction('Network error');
      }
    })
    }, 3000)
}

openProject()
{
setTimeout(() => {
this.props.navigation.navigate('Jobs')
}, 1000)
}

  render() {
    return (
    
      <SafeAreaView style = { styles.MainContainer }>
         <View style={styles.toolbar}>
            <Text style={styles.backButton} onPress={() => this.goBack()}>
              <Image source={constants.backicon} style={styles.icon} />
            </Text>
            <Text style={styles.toolbarTitle}>Post a project</Text>
          </View>
          
          <TextInput
            style={styles.postprojectinput}
            underlineColorAndroid="transparent"
            placeholder="Tittle"
            onChangeText={(text)=>this.setState({ title:text})}
            placeholderTextColor="#AEA9A8"
            autoCapitalize="none"
            returnKeyType='done'
          />
          <TextInput
            style={styles.postprojectinput}
            underlineColorAndroid="transparent"
            placeholder="Description"
            onChangeText={(text)=>this.setState({ description:text})}
            placeholderTextColor="#AEA9A8"
            autoCapitalize="none"
            returnKeyType='done'
          />
          <TextInput
            style={styles.postprojectinput}
            underlineColorAndroid="transparent"
            placeholder="Country"
            onChangeText={(text)=>this.setState({ country:text})}
            placeholderTextColor="#AEA9A8"
            autoCapitalize="none"
            returnKeyType='done'
          />
          <View  style={styles.categoryText}>
           <Text style={styles.dateTextColor} onPress={() => this.openCategory()}>
           {this.state.category}
          </Text>
          </View>
          <TextInput
            style={styles.postprojectinput}
            underlineColorAndroid="transparent"
            placeholder="Job Type"
            onChangeText={(text)=>this.setState({ jobType:text})}
            placeholderTextColor="#AEA9A8"
            autoCapitalize="none"
            returnKeyType='done'
          />
          <TextInput
            style={styles.postprojectinput}
            underlineColorAndroid="transparent"
            placeholder="Budget"
            onChangeText={(text)=>this.setState({ budget:text})}
            placeholderTextColor="#AEA9A8"
            autoCapitalize="none"
            returnKeyType='done'
            keyboardType='numeric'
          />
          <View style={{ flexDirection: "row", marginRight:'3%' }}>
            <View style={{ width: "49%" }}>
                  <TouchableOpacity onPress={this._showDateTimePicker} style={styles.postprojectinput}>
                  <Text style={styles.dateTextColor}>{this.state.startDateText}</Text>
                </TouchableOpacity>
            </View>
            <View style={{ width: "49%" }}>
                <TouchableOpacity onPress={this._showDateTimePicker2} style={styles.postprojectinput}>
                  <Text style={styles.dateTextColor}>{this.state.endDateText}</Text>
                </TouchableOpacity>
            </View>
          </View>
          <TextInput
            style={styles.postprojectinput}
            underlineColorAndroid="transparent"
            placeholder="Add Skills"
            onChangeText={(text)=>this.setState({ skills:text})}
            placeholderTextColor="#AEA9A8"
            autoCapitalize="none"
            returnKeyType='done'
          />
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
         <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible2}
          onConfirm={this._handleDatePicked2}
          onCancel={this._hideDateTimePicker2}
        />
      <TouchableOpacity style={ styles.bottomView} onPress={() => this.post_project()}>
         <Text style={styles.textStyle}>Submit Job</Text>
      </TouchableOpacity>
      <Loader
          loading={this.state.loading} />
       <CustomToast ref = "defaultToastBottom"/>    
   </SafeAreaView>
    );
  }
}

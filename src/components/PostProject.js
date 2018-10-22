import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Select,
  Picker
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
       category :'Category',
       user: ''
      }

      var options = [
        {
          label: 'News'
        },
        {
          label: 'Design'
        },
        {
          label: 'Sales'
        },
        {
          label: 'Marketing'
        },
        {
          label: 'Customer Success'
        }
      ];
  }

   updateUser = (user) => {
      this.setState({ user: user })
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
     // console.log(this.props.navigation.state.params.category)
      this.setState ({ category: this.props.navigation.state.params.category.selectedCategory});
      this.setState ({ title: this.props.navigation.state.params.category.inputData.title});
      this.setState ({ description: this.props.navigation.state.params.category.inputData.description});
      this.setState ({ country: this.props.navigation.state.params.category.inputData.country});
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
      var projectData = {
        "title" :this.state.title,
        "description" : this.state.description,
        "country" : this.state.country,
        "pageName" : 'post'
      }
      this.props.navigation.navigate("Cat",  { page: projectData });
    }

  goToproject = () => {
    this.props.navigation.navigate("Projects");
  };

  goBack = () =>{
    this.props.navigation.navigate('Jobs');
   }


  post_project = () => {
    if(this.state.endDateText >= this.state.startDateText)
    {
      this.setState({loading: true})
      setTimeout(() => 
      {
      this.setState({loading: false})
      service.post_project(this.state.userResponse.api_token,this.state.title,this.state.description, this.state.country, this.state.category, this.state.jobType, this.state.budget,this.state.startDateText, this.state.endDateText, this.state.skills).then((res) => {
      console.log(this.state.startDateText);
      console.log(this.state.endDateText);
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
  else
  {
    this.refs.defaultToastBottom.ShowToastFunction('End Date should not be lesser than start date');
  }
}

openProject()
{
setTimeout(() => {
this.props.navigation.navigate('Jobs')
}, 1000)
}


  render() {
   
    return (
    
      <SafeAreaView style = { styles.MainContainerProject }>
         <View style={styles.tabsToolbar}>
        <TouchableOpacity onPress={() => this.openDrawer()}>
        <Image source={constants.backicon} style={styles.backIcon} />
        </TouchableOpacity>
         <Text style={styles.toolbarTitle}>  ADD PROJECT </Text>
         <TouchableOpacity onPress={() => this.goToNotification()}>
        </TouchableOpacity>
         <TouchableOpacity>
         <Image style={styles.searchIcon} />
        </TouchableOpacity>
        </View>

        <ScrollView>
         <Text style={styles.projectInput}>
            Title
        </Text>
          <TextInput
            style={styles.postprojectinput}
            underlineColorAndroid="transparent"
            placeholder="Tittle"
            onChangeText={(text)=>this.setState({ title:text})}
            placeholderTextColor="#AEA9A8"
            autoCapitalize="none"
            returnKeyType='done'
            value={this.state.title}
          />

          <Text style={styles.projectInput}>
            Country
        </Text>
        <Select
            width={250}
            ref="SELECT1"
            optionListRef={this._getOptionList.bind(this)}
            defaultValue="Select a Province in Canada ..."
            onSelect={this._canada.bind(this)}>
            <Option>Alberta</Option>
            <Option>British Columbia</Option>
            <Option>Manitoba</Option>
            <Option>New Brunswick</Option>
            <Option>Newfoundland and Labrador</Option>
            <Option>Northwest Territories</Option>
            <Option>Nova Scotia</Option>
            <Option>Nunavut</Option>
            <Option>Ontario</Option>
            <Option>Prince Edward Island</Option>
            <Option>Quebec</Option>
            <Option>Saskatchewan</Option>
            <Option>Yukon</Option>
          </Select>
            

          <Text style={styles.projectInput}>
            Job Type
        </Text>
          <TextInput
            style={styles.postprojectinput}
            underlineColorAndroid="transparent"
            placeholder="ABC"
            onChangeText={(text)=>this.setState({ title:text})}
            placeholderTextColor="#AEA9A8"
            autoCapitalize="none"
            returnKeyType='done'
            value={this.state.title}
          />

           <Text style={styles.projectInput}>
            Budget
          </Text>
          <TextInput
            style={styles.postprojectinput}
            underlineColorAndroid="transparent"
            placeholder="$120"
            onChangeText={(text)=>this.setState({ title:text})}
            placeholderTextColor="#AEA9A8"
            autoCapitalize="none"
            returnKeyType='done'
            value={this.state.title}
          />

          <Text style={styles.projectInput}>
            Start Date & End Date
          </Text>
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

          <Text style={styles.projectInput}>
            Skills
          </Text>
          <TextInput
            style={styles.postprojectinput}
            underlineColorAndroid="transparent"
            placeholder="XYZ,ABC etc"
            onChangeText={(text)=>this.setState({ title:text})}
            placeholderTextColor="#AEA9A8"
            autoCapitalize="none"
            returnKeyType='done'
            value={this.state.title}
          />
          
          <Text style={styles.projectInput}>
            Description
          </Text>
          <TextInput
            style={styles.postprojectinput}
            underlineColorAndroid="transparent"
            placeholder="XYZ,ABC etc"
            onChangeText={(text)=>this.setState({ title:text})}
            placeholderTextColor="#AEA9A8"
            autoCapitalize="none"
            returnKeyType='done'
            value={this.state.title}
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
      <TouchableOpacity style={ styles.bottomViewRequest} onPress={() => this.post_project()}>
         <Text style={styles.textStyle}>SUBMIT JOB</Text>
      </TouchableOpacity>
      </ScrollView>
      <Loader
          loading={this.state.loading} />
       <CustomToast ref = "defaultToastBottom"/>    
   </SafeAreaView>
    );
  }
}

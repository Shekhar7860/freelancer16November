import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Text,
  View,
  Image,
  ImageBackground,
  Button,
  TextInput, 
  TouchableOpacity,
  Modal,
  ScrollView
} from "react-native";
import Constants from "../constants/Constants";
import Service from "../services/Service";
import styles from "../styles/styles";
import MyView from './MyView';
import Loader from './Loader';
import SideMenu from './SideMenu';
export default class ProjectsList extends Component {
  constructor(props) {
    super(props);
    service = new Service();
    sidemenu = new SideMenu();
    constants = new Constants();
    this.state = {
      userResponse: {},
      jobs: {amount : " ", description : " ", freelancer_name : " "}, 
      jobs: {description : " "}, 
      failed: false,
      search : true,
      loading:false,
      dummyText : "",
      projectId : "", 
      jobId: " ",
      loading : "false",
      userResponse: {},
      freeLancerName : "", 
      amount : " ", 
      description : " "
      
    };
   
    
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  findFreelancer = () => {

  }

  componentDidMount() {
    if (this.props.navigation.state.params) {
        console.log(this.props.navigation.state.params.client_Details);
        this.setState({ jobId: this.props.navigation.state.params.client_Details });
      }
    this.setState ({ loading: true});
    service.getUserData("user").then(
      keyValue => {
        console.log("local", keyValue);
        var parsedData = JSON.parse(keyValue);
        console.log("json", parsedData);
        this.setState({ userResponse: parsedData });
        if(this.state.jobId)
        {
         this.getMilestoneList();
        }
      },
      error => {
        console.log(error); //Display error
      }
    );
    service.saveUserData('count', 1);
  
    
  }

  openDrawer = () => {
    // sidemenu.userData();
    this.props.navigation.openDrawer();
  };

  getMilestoneList = () => {
    service.getprojectList(this.state.userResponse.api_token, this.state.jobId).then(res => {
      console.log("reslocal", res);
      
      setTimeout(() => {
     if (res){
        this.setState ({ loading: false});
         if(res.length ===  0)
        {
        this.setState ({ dummyText: "No Project Found"});
        }
        else
        {
        this.setState({ jobs: res.project});
        if (this.state.jobs)
        {
        if(this.state.jobs.freelancer_name !== undefined)
        {
          this.state.freeLancerName = this.state.jobs.freelancer_name
        }
        if(this.state.jobs.amount !== undefined)
        {
          this.state.amount = this.state.jobs.amount
        }
        if(this.state.jobs.description !== undefined)
        {
          this.state.description = this.state.jobs.description 
        }
        this.setState({ projectId: res.project.id});
        }
      }
    }
    });
  }, 3000)
  };

  searchPage = () =>{
  this.setState({ search: false});
    }
  
    hideSearch = () =>{
      this.setState({ search: true});
    }


  goToPostproject = () => {
    this.props.navigation.navigate("Create", { jobId: this.state.projectId });
  };

  goToMilestone()
  {
    var projectDetails = {
        project_id : this.state.projectId
      }
    this.props.navigation.navigate('MilestoneList', { details: projectDetails})
  }

  render() {
   
    return (
      <SafeAreaView source={constants.loginbg} style={styles.container}>
        <View style={styles.topView}>
        <MyView style={styles.tabsToolbar}>
        <TouchableOpacity onPress={() => this.openDrawer()}>
        <Image source={constants.backicon} style={styles.backIcon} />
        </TouchableOpacity>
         <Text style={styles.toolbarTitle}> PROJECTS LIST</Text>
         <TouchableOpacity onPress={() => this.goToNotification()}>
        </TouchableOpacity>
         <TouchableOpacity onPress={() => this.goToMilestone()}>
         <Image source={constants.addIcon} style={styles.searchIcon} />
        </TouchableOpacity>
        </MyView>
       </View>
       {/* <View style={styles.searchPadding}>
       <MyView  style={styles.searchContainer}>
          <View style={styles.topSearchbar}>
              <Image source={constants.searchicon} style={styles.newsearchIcon} />
              <View style={styles.empty}>
              </View>
            <TextInput placeholder="Search"  placeholderTextColor="#a2a2a2" style={styles.topInput}/>
          </View>
      </MyView>
      </View> */}
       <ScrollView>
        <View style={styles.listCenter}>
        <Text style = {styles.defaultTextSize}>{this.state.dummyText}</Text>
        
                <View  style={styles.spaceFromTop}>
                    <TouchableOpacity style={styles.listCard} onPress={() => this.openDetails(item)}>
                 <View style={styles.rowAlignSideMenuRequest}>
                  <View> 
                  <Text style={styles.textWrapDetails}> Amount
                  </Text>
                  </View>
                  <View style={styles.colon}><Text> :</Text>
                  </View>
                  <View > 
                  <Text style={styles.textWrap2Details}> {this.state.amount }
                  </Text>
                  </View>
                  </View>
                  {/* <View style={styles.rowAlignSideMenuRequest}>
                  <View> 
                  <Text style={styles.textWrapDetails}> Due Date
                  </Text>
                  </View>
                  <View style={styles.colon}><Text> :</Text>
                  </View>
                  <View > 
                  <Text style={styles.textWrap2Details}> {this.state.jobs.end_date}
                  </Text>
                  </View>
                  </View> */}
                  <View style={styles.rowAlignSideMenuRequest}>
                  <View> 
                  <Text style={styles.textWrapDetails}> Description
                  </Text>
                  </View>
                  <View style={styles.colon}><Text> :</Text>
                  </View>
                  <View > 
                  <Text style={styles.textWrap2Details}> {this.state.description}
                  </Text>
                  </View>
                  </View>
                  <View style={styles.rowAlignSideMenuRequest}>
                  <View> 
                  <Text style={styles.textWrapDetails}> FreeLancer Name
                  </Text>
                  </View>
                  <View style={styles.colon}><Text> :</Text>
                  </View>
                  <View > 
                  <Text style={styles.textWrap2Details}> {this.state.freeLancerName}
                  </Text>
                  </View>
                  </View>
                     
                         
                        {/* <View style={styles.paddingAbove}>
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
                        </View> */}
                        </TouchableOpacity>
                </View>
             
        </View>
       </ScrollView>
     
          {/* <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => this.goToPostproject()}
            style={styles.TouchableOpacityStyle}
          >
            <Image
              source={{
                uri:
                  "https://reactnativecode.com/wp-content/uploads/2017/11/Floating_Button.png"
              }}
              style={styles.FloatingButtonStyle}
            />
          </TouchableOpacity> */}
        
        <Loader
              loading={this.state.loading} />
                    
      </SafeAreaView>
    );
  }
}

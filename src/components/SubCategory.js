import React, {Component} from 'react';
import {Platform, StyleSheet, SafeAreaView, FlatList, Text, View, Image, ImageBackground, Button, TouchableOpacity} from 'react-native';
import Constants from '../constants/Constants';
import Service from '../services/Service';

export default class SubCategory extends Component {
 constructor(props){
     super(props);
     service = new Service();
     constants = new Constants();
     this.state = {
        userData: { picture_large:{ data:{}}},
        subcategories: []
      };
   
 }
 
 componentDidMount()
 {
    if(this.props.navigation.state.params)
    {
      console.log(this.props.navigation.state.params)
      var array = this.props.navigation.state.params.subCategory.data.sub_category.split(',');
      this.setState ({ subcategories: array});
    }
 }

 selectCategory = (val) => {

  if(this.props.navigation.state.params.subCategory.page == "post")
  {
  this.props.navigation.navigate('PostProject',  { category: val }) 
  }
  else 
  {
    this.props.navigation.navigate('UpdateProfile',  { category: val })  
  }
 }
 

  render() {
   
    return (
        
      <SafeAreaView
      source={constants.loginbg}
      style={styles.container}>
    
    <View style={styles.toolbar} >
        <TouchableOpacity>
        </TouchableOpacity>
         <Text style={styles.toolbarTitle}>Sub Category</Text>
         <TouchableOpacity>
        </TouchableOpacity>
     </View>
    
     <View style={styles.listCenter}>
        <FlatList
              data={this.state.subcategories}
              keyExtractor={(item, index) => index}
              style={styles.listCardWidth}
              extraData={this.state.subcategories}
              renderItem={({ item, index }) => (
                <View  style={styles.spaceFromTop}>
                    <TouchableOpacity style={styles.listCard} onPress={() => this.selectCategory(item)}>
                        <View style={styles.textInRow}> 
                        <Text style={styles.textWrap}> {item} 
                        </Text>
                        </View>
                        </TouchableOpacity>
                </View>
              )}
            />
       </View>
 </SafeAreaView>
    )}
         
}
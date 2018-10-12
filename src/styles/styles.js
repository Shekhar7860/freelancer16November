// global styles 
import {colors, fonts, padding, dimensions, align} from './base.js'
import {StyleSheet, Platform} from 'react-native';
export default styles = StyleSheet.create({

  container: {
    flex: 1,
    height:'100%'
  },
  header: {
    fontSize: fonts.lg,
    fontFamily: fonts.primary
  },
  section: {
    paddingVertical: padding.lg,
    paddingHorizontal: padding.xl
  },
  signUpFont: {
    color:colors.red,
    fontSize:padding.ms
  },
  loginText: {
    color:colors.red,
    padding:padding.sm,
    width:42
    },
    alignrow:{
      flexDirection:'row',
      flex:1,  
    },
    col:{
      flexDirection:'row',
       flexWrap:'wrap'
    },
    cardContainer:{
     width:'80%',
     backgroundColor:"#f8f8f8",
     padding:padding.sm,
     height:225,
     borderColor: colors.transparent,
     borderWidth: 1,
     marginTop:-padding.sm,
     borderRadius:10
    }, 
    messageBox:{
      width:'90%',
      paddingTop:5,
      alignItems:align.center,
      height:240
  },
  messageBoxTitleText:{
      fontWeight:'bold',
      color:colors.white,
      textAlign:align.center,
      fontSize:20,
      marginBottom:padding.sm
  },
  toolbar:{
    paddingTop:10,
    paddingBottom:padding.sm,
    flexDirection:'row',
    backgroundColor:colors.themeColor,
    height:50
     //Step 1
},
tabsToolbar:{
  paddingTop:10,
  paddingBottom:padding.sm,
  flexDirection:'row',
  backgroundColor:colors.themeColor

   //Step 1
},
topView:{
  paddingTop:10,
  paddingBottom:padding.sm,
  backgroundColor:colors.themeColor,
  height:50
   //Step 1
},
toolbarButton:{
    width: 30,            //Step 2
    color:colors.white,
    textAlign:align.center,
    marginTop: (Platform.OS === 'ios') ? 15 : 5,
    marginLeft: (Platform.OS === 'ios') ? 10 : 0
},
backButton:{
  width: 30,            //Step 2
  color:colors.white,
  textAlign:align.center,
  marginTop: (Platform.OS === 'ios') ? 10 : 5,
  marginLeft: (Platform.OS === 'ios') ? 10 : 0
},
toolbarTitle:{
    color:colors.white,
    textAlign:'center',
    fontWeight:'bold',
    flex:1,
    marginTop: (Platform.OS === 'ios') ? 5 : 0,
    fontSize:20               //Step 3
 },
 updateText:{
  color:colors.white,
  textAlign:align.center,
  fontWeight:'bold',
  flex:1,
  marginTop: (Platform.OS === 'ios') ? 5 : 0,
  fontSize:18,
  marginRight:10           //Step 3
},
  messageBoxBodyText:{
      color:colors.white,
      fontSize:16
  },
  textContainer:{
    paddingTop:15,
    width:'95%',
    alignItems:'flex-end',
  },
  imgContainer:{
    padding:padding.sm,
    padding:20
  },
  topText:{
    color:colors.white,
    textAlign:'left',
    fontSize:20,
    fontWeight:'bold'
  },
  splashLoading:{
    flex:1,
  justifyContent:align.center
  },
  imageContainer:{
    paddingTop:5,
    alignItems:align.center,
  },
  imageWidth:{
  },
  centerAlign :{
   alignItems:align.center,
   marginTop:10,
   position:'absolute',
   width:'100%',
   bottom: (Platform.OS === 'ios') ? 185 : 160
  },
  centerAlignSignUp :{
    alignItems:align.center,
    marginTop:0,
    position:'absolute',
    width:'100%',
    top: -40
   },
  loginText:{
    color:colors.red,
  },
  textBorder:{
    borderBottomColor: colors.red,
    borderBottomWidth: 1
  },
  borderWidth : {
    paddingTop:2,
    width:42
  },
  borderWidthSignUp : {
    paddingTop:2,
    width:50
  },
  borderWidthForgot : {
    paddingTop:2,
    width:127
  },
  textInputContainer:{
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.white,
  },
  textInputContainer2:{
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingTop:padding.sm
  },
  iconWidth:{
    width:30,
    height:30
  },
  float:{
    flex: 1, 
    backgroundColor: '#f5fcff'
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: align.center,
    alignItems: align.center,
    backgroundColor: colors.white,
},
searchIcon: {
    padding: padding.sm,
},
input: {
    flex: 1,
    paddingTop: padding.sm,
    paddingRight: padding.sm,
    paddingBottom: padding.sm,
    paddingLeft: 0,
    backgroundColor: colors.white,
    color: '#424242',
},
icon:{
  width:20,
  height:20
},
socialIcon:{
  width:40,
  height:40,
  marginTop:12
},
border:{
  borderBottomColor: colors.black,
  borderBottomWidth: 1,
  flex:1
},
rowAlign:{
  flexDirection:'row',
  borderBottomColor: colors.black,
  borderBottomWidth: 1,
  width:dimensions.fullWidth - 140 ,
  paddingTop: (Platform.OS === 'ios') ? 10 : 0
},
loginContainer:{
  alignItems:align.center
},
loginContainerSignIn:{
  alignItems:align.center,
  marginTop: 12
},
buttonWidth:{
  width:300,
  alignItems:align.center
},
loginbutton:{
backgroundColor:colors.red,
color:colors.white,
width:70,
textAlign:align.center,
height:30,
borderRadius:padding.sm,
position:'relative',
bottom:14,
paddingTop:4,
 },
 center:{
   paddingTop:20,
   alignItems:align.center
 },
 connect:{
  paddingTop:20,
  alignItems:align.center,
  width:'40%'
},
 borderWidth2 : {
  paddingTop:2,
  width:128
},
textBorder2:{
  borderBottomColor: colors.black,
  borderBottomWidth: 1
},
rowAlign2:{
  flexDirection:'row',
  alignItems:align.center
},
rowAlign3:{
  flexDirection:'row',
  alignItems:align.center,
  paddingTop:5
},
textCenter:{
  textAlign:align.center
},
borderWidth3 : {
  paddingTop:18,
  width:'20%'
},
bottomText:{
  alignItems:align.center,
  paddingTop:padding.sm
},
cardContainerSignUp:{
  width:'80%',
  padding:padding.sm,
  borderColor: colors.black,
  borderWidth: 1,
  backgroundColor:colors.white,
  borderRadius:20,
  height:290
 },
 cardContainerSignIn:{
  width:'80%',
  padding:padding.sm,
  borderColor: colors.black,
  borderWidth: 1,
  backgroundColor:colors.white,
  borderRadius:20,
  height:270
 },
 cardContainerForgot:{
  width:'80%',
  padding:padding.sm,
  height:220,
  borderColor: colors.black,
  borderWidth: 1,
  marginTop:-40,
  backgroundColor:colors.white,
 },
 topSpace:{
   alignItems:align.center
 },
 signUpButton:{
  backgroundColor:colors.themeColor,
  color:colors.white,
  width:dimensions.fullWidth - 140,
  textAlign:align.center,
  height:40,
  borderRadius:padding.md,
  position:'relative',
  bottom:13,
  paddingTop:10,
   },
   forgotTextHeadline:{
     paddingTop:padding.lg,
     width:'100%'
   },
   hamburgerIcon:{
     width:30,
     height:30,
    marginLeft:25},
    searchIcon:{
      width:30,
      height:30,
     marginRight:25},
     homeContent:{
       alignItems:align.center,
       width: 100
     },
     cardImage:{
       width:'90%',
       height:220,
       borderRadius:25,
     },
     sideMenu:{
     alignItems:align.center,
     },
    profilePic:{
      marginTop:30,
      width:80,
     height:80,
    },
    freelancerprofilePic:{
      width:70,
     height:70,
    },
    userName:{
      paddingTop:padding.sm,
      color:colors.white
    },
    defaultUserName:{
      paddingTop:padding.sm,
      paddingLeft:padding.md,
      color:colors.white
    },
    error:{
      color:colors.red,
      paddingTop:5
    },
    MainContainer :{
      height:'100%',
      alignItems: 'center',
      },
       
      animatedToastView:
      {
         marginHorizontal: 30,
         paddingHorizontal: 25,
         paddingVertical: 10,
         borderRadius: 25,
         zIndex: 9999,
         position: 'absolute',
         justifyContent: 'center'
      },
      
      ToastBoxInsideText:
      {
         fontSize: 15,
         alignSelf: 'stretch',
         textAlign: 'center'
      },
      toast:{
        alignItems:align.center
      },
      modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
      },
      activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
      },
      footer:{
        position:'absolute',
        top:560
      },
      staticIcon:{
        width:25,
        height:20
      },
      forgotText:{
       paddingTop:padding.md
      },
      textWidth:{
        width:'100%'
      },
      iconsAlign:{
      flexDirection:'row'
      
      },
      shareIcon:{
        width:25,
        height:25
      },
      newsearchIcon:{
        width:20,
        height:20
      },
      listIcon:{
        width:25,
        height:25,
        marginLeft:25
      },
      viewWidth:{
        width:'42%'
      },
      viewWidthEmpty:{
        width:'16%'
      },
      rightAlign:{
        textAlign:'right'
      },
      white:{
        color:colors.white
      },
      topPadding:{
        paddingTop:padding.md
      },
      topMargin:{
        paddingTop:padding.sm
      },
      list:{
       
        flexDirection:'row',
        marginTop:20,
        flexWrap:'nowrap'
      },
      listIconsWidth:{
      width:'25%'
    },
    listItemsBlank:{
      width:10
    },
    listTextWidth:{
      width:230
    },
    listIconsWidth2:{
      width:60
    },
    listTextWidth2:{
      width:'60%'
    },
    listToggleIconWidth2:{
      width:'10%'
    },
    toggleIcon:{
      width:100,
      height:50
    },
    listTextFontSize:{
      fontSize:20,
      textAlign: "left",
      display:'flex'
    },
    switch:{
      width:70
    },
    cameraIcon:{
      position:'absolute', 
      bottom:20,
      width:35,
      top:62,
      left:164,
      height:35,
      overflow:'hidden'
    },
    headLine:{
      alignItems:align.center

    },
    welcomeContainer:{
		  flex:1,
		  backgroundColor:colors.themeColor
	  },
	  welcomeHeadline:{
		  flex:1,
		  alignItems:align.center,
		  paddingTop:200
    },
    welcomeHeadlineSignUp:{
		  alignItems:align.center,
		  marginTop:0
	  },
	   accountHeadline:{
		  flex:1,
		  alignItems:align.center,
		  paddingTop:100
	  },
	  headlineText:{
		  fontSize:50,
      color:colors.white,
      fontFamily: "blackjack"
	  },
	  accountHeadlineText:{
		  fontSize: (Platform.OS === 'ios') ? 50 : 25,
      color:colors.themeColor,
      fontFamily: fonts.themeFontBold
	  },
	  buttonBackground:{
		  marginTop:200,
		  backgroundColor:colors.white,
		  width:"50%",
		  borderRadius:25,
		  height:40,
		  alignItems:align.center,
		  justifyContent:align.center
	  },
	  hireButtonBackground:{
		  marginTop:110,
		  backgroundColor:colors.themeColor,
		  width:"65%",
		  borderRadius:25,
		  height:40,
		  alignItems:align.center,
		  justifyContent:align.center
    },
    otpButton:{
		  marginTop:50,
		  backgroundColor:colors.themeColor,
		  width:"65%",
		  borderRadius:25,
		  height:40,
		  alignItems:align.center,
		  justifyContent:align.center
    },
	  lookingButtonBackground:{
		  marginTop:35,
		  backgroundColor:colors.themeColor,
		  width:"65%",
		  borderRadius:25,
		  height:40,
		  alignItems:align.center,
		  justifyContent:align.center
	  },
	  buttonText:{
		  textAlign:align.center,
		  fontSize:15,
      color:colors.themeColor,
      fontFamily: fonts.themeFont
	  },
	   accountButtonText:{
		  textAlign:align.center,
		  fontSize:15,
      color:colors.white,
      fontFamily: fonts.themeFont,
      
	  },
	   accountText:{
		  textAlign:align.center,
		  fontSize:15,
		  color:colors.white,
      paddingTop:padding.sm,
      fontFamily: fonts.themeFont
	  },
	  selectAccountText:{
		  textAlign:align.center,
		  fontSize:15,
		  color:colors.themeColor,
      paddingTop:padding.md,
      fontFamily: fonts.themeFont
	  },
	  upperContainer:{
		  height:'30%',
		  backgroundColor:colors.themeColor
    },
    upperContainerSideMenu:{
		  height:'30%',
      backgroundColor:colors.themeColor,
    },
    lowerContainerSideMenu:{
      height:'70%',
      alignItems:align.center
		  
    }, 
    sideMenuAlign:{
      alignItems:align.center
    },  
	  lowerContainer:{
      height:'70%',
      alignItems:align.center
		  
    },
    signUpText:{
      textAlign:align.center,
      fontSize:padding.md,
      color:colors.themeColor,
      fontFamily: fonts.themeFontBold
    },
    inputIcon:{
      width:20,
      height:20,
      marginTop:10,
      bottom: (Platform.OS === 'ios') ? 5 : 0
    },
    centerItems:{
      alignItems:align.center
    },
    loginInputsSpace:{
    marginTop:50
    },
    signUpInputsSpace:{
      marginTop:40
      },
    forgotInputsSpace:{
      marginTop:35
      },
      signInInputsSpace:{
        marginTop:85
      },
    forgotText:{
      color:colors.themecolor,
      fontFamily:fonts.themeFontBold,
      marginTop:30,
      fontSize:15,
      textDecorationLine: 'underline',
      textAlign:align.center
    },
    textInputWidth:{
      width:'100%',
      marginLeft: (Platform.OS === 'ios') ? 5 : 0
    },
    commonButtonBackground:{
      marginTop: (Platform.OS === 'ios') ? 65 : 40,
		  backgroundColor:colors.themeColor,
      width:dimensions.fullWidth - 140 ,
		  borderRadius:25,
		  height:40,
		  alignItems:align.center,
		  justifyContent:align.center
    },
    buttonBackgroundLogin:{
      marginTop: (Platform.OS === 'ios') ? 75 : 57,
		  backgroundColor:colors.themeColor,
      width:dimensions.fullWidth - 140 ,
		  borderRadius:25,
		  height:40,
		  alignItems:align.center,
		  justifyContent:align.center
    },
    mobilebuttonBackground:{
      marginTop: (Platform.OS === 'ios') ? 75 : 72,
		  backgroundColor:colors.themeColor,
      width:dimensions.fullWidth - 140 ,
		  borderRadius:25,
		  height:40,
		  alignItems:align.center,
		  justifyContent:align.center
    },
    rowAlignSideMenu:{
      flexDirection:'row'
    },
    name:{
      width:'35%'
    },
    blank:{
      width:'45%'
    },
    arrowView:{
      width:'20%'
    },
    welcomeLoginText :{
      color:colors.white,
      paddingTop:10
    },
    input :{
      height: 50,
      backgroundColor: '#EBEBF1',
      color: 'black',
      width: 50,
      marginLeft: 5,
      marginRight: 5,
      marginTop:10
      
      },
      toastCenter:{
        flex:1,
        alignItems:align.center,
        justifyContent:align.center
      },
      profileContainer:{
        alignItems:align.center
      },
      containerBorder:{
        borderBottomWidth: 0.5,
        marginTop:20,
        borderBottomColor:colors.themeColor
      },
      textItemsContainer:{
        flexDirection :'row',
        width:'90%',
        bottom:5
      },
      nameContainer :{
        width:'30%'
      },
      boxContainer :{
        width:'60%'
      },
      rowAlignSideMenu2:{
        flexDirection:'row',
        paddingTop:padding.md
      },
      line :{
         borderBottomColor: colors.themeColor,
          borderBottomWidth: 1,
          marginTop:10
      },
      tabsPosition :{
       backgroundColor:'red'
      },
      listCard:{
        width:'90%',
        backgroundColor:colors.white
      },
      listCardFreelancer:{
        width:'100%',
        backgroundColor:colors.white
      },
      spaceFromTop:{
        alignItems:'center',
         marginTop:10
      },
      textColor:{
        color:'green',
        paddingTop:10,
        fontSize:20,
         flexWrap: 'wrap'
      },
      textInRow:{
        flexDirection:'row'
      },
      textWrap:{
        flex:1,
        margin:10,
        fontSize:18,
       flexWrap: 'wrap',
       color:'#27ae60',
       fontWeight: 'bold'
      },
      priceText:{
        marginLeft:10,
        marginTop:5,
        fontSize:16,
       color:'black',
       fontWeight: 'bold'
      },
     date:{
        marginLeft:10,
        marginTop:5,
        fontSize:16,
       color:'#95a5a6',
       fontWeight: 'bold'
      },
      email:{
        marginLeft:10,
        marginTop:5,
        fontSize:14,
       color:'#95a5a6',
       fontWeight: 'bold'
      },
      Listcontainer: {
        flex: 1
      },
      contPadding :{
        padding:5
      },
      skillWidth:{
        width:"50%"
      },
      budgetWidth:{
        width:"30%"
      },
      leftSpace:{
        width:"20%"
      },
      skillWidth2:{
        width:"45%"
      },
      budgetWidth2:{
        width:"10%"
      },
      leftSpace2:{
        width:"45%"
      },
      priceText:{
        marginLeft:10,
        marginTop:5,
        fontSize:16,
       color:'#95a5a6',
       fontWeight: 'bold'
      },
      paddingAbove:{
        marginTop:10
      },
      textInRow2:{
        flexDirection:'row',
        marginLeft:10
      },
      skillText:{
        fontSize:16,
        color:colors.themecolor,
      },
      centerText :{
        textAlign :'center'
      },
      contentMargin:{
        margin: 10
      },
      detailsContainer :{
        margin:10
      },
      jobTitle :{
        fontSize:20, 
        color:'black'
      },
      textInRowJob:{
        flexDirection:'row',
        marginTop :10
      },
      space:{
        paddingTop:15
      },
      space2:{
       marginTop:10
      },
      Tab1 :{
        width:'40%'
      },
      Tab2 :{
        width:'30%'
      },
      Tab3 :{
        width:'40%'
      },
      empty:{
        width:'5%'
      },
      tabs:{
        flexDirection:'row',
         color :'white',
        backgroundColor :colors.themeColor,
        height:45
      },
      textWhite:{
        color :'white',
        textAlign :'left',
        paddingTop:10
      },
      textFeed:{
        color :'white',
        textAlign :'center',
        paddingTop:10
      },
      topInput:{
        width:'100%'
      },
      searchContainer:{
        marginLeft:20,
        borderWidth: 1,
        borderColor:'white'
      },
      topSearchbar:{
        flexDirection:'row'
      },
      listCardWidth : {
        width: '90%'
      },
      listCenter:{
        alignItems:align.center
      }

      

      

})
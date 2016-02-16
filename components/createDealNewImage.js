import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
// var FS = require('react-native-fs');
import {openAnimation} from './animations'
import shallowEqual from './shallowEqual'
let {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  LayoutAnimation,
  CameraRoll,
  TouchableWithoutFeedback
} = React;
export default class CreateDealNewImage extends React.Component{
	
	state={cameraOn:false,images:[],opacity:this.props.limitReached?0.5:1}
	static contextTypes={
    	state$: React.PropTypes.any,topNav:React.PropTypes.any
  	}
  	componentWillReceiveProps(props){
  		// console.log(props.limitReached)
  		this.setState({opacity:props.limitReached?0.5:1})
  	}
	shouldComponentUpdate(nextProps, nextState) {
	    return !shallowEqual(this.props.order, nextProps.order) ||
	         !shallowEqual(this.state, nextState);
	  }
	// componentWillMount(){
	// 	this.context.state$.subscribe
	// }
	render(){
		// console.log('i am rendering',this.props.order)
				  	if(this.props.order){
				  		return 	(
				  			<TouchableWithoutFeedback onPress={this.props.deSelectImage}>
								<Image style={styles.image} source={{ uri: this.props.image.uri }}>

  				  			<View ref={el=>this[this.props.image.uri]=el} style={{width:25*k,height:25*k,margin:5*k,
								borderRadius:3*k,borderWidth:1,borderColor:'0083b3',
								backgroundColor:'rgba(0,132,180,0.8)',...center}}><Text style={{color:'white',fontSize:18,fontWeight:'500'}}>{this.props.order}</Text></View>
						</Image>
							</TouchableWithoutFeedback>
						)
				  	}
				  	return <TouchableWithoutFeedback onPress={this.state.opacity===1?this.props.selectImage:null}>
								<Image style={[styles.image,{opacity:this.state.opacity}]} source={{ uri: this.props.image.uri }}><View ref={el=>this[this.props.image.uri]=el} style={{width:25*k,height:25*k,margin:5*k,
				borderRadius:3*k,borderWidth:1,borderColor:'white',
				backgroundColor:'rgba(230,230,230,0.7)',...center}}></View>
				</Image>
							</TouchableWithoutFeedback>
	}

	
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:40,	
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
   imageGrid: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        borderWidth:2,
        borderColor:'e4e4e4'
    },
    image: {
        width: 103*Dimensions.get('window').width/320,
        height: 103*Dimensions.get('window').width/320,
        margin: 1,
        justifyContent:'flex-start',
        alignItems:'flex-end',
    },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});
Object.assign(CreateDealNewImage.prototype, TimerMixin);



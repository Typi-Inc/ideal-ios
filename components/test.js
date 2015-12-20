import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import Deals from './deals'
import Info from './info'
import Loading from './loading'
import {openAnimation} from './animations'
let UIManager = require('NativeModules').UIManager;
let {
  AppRegistry,
  StyleSheet,
  Image,
  LayoutAnimation,
  Text,
  View,
  Animated,
  ScrollView,
  TouchableOpacity,
  StatusBarIOS,
} = React;
export default class Test extends React.Component{
	state={open:this.props.open}
	click(){
		this.setTimeout(()=>this.setState({open:true}),400)
			Animated.timing(this.anim,{toValue:1,duration:200}).start()

	}
	backClick(){
		Animated.timing(this.anim,{toValue:0.0,duration:300}).start(()=>{
			this.setState({open:false})
		})
		
	

	}
	render(){
		this.anim=this.anim || new Animated.Value(0)
		this.animatedStyle={
			height:this.anim.interpolate({inputRange:[0,1],outputRange:[0,460*k]}),
			width:320*k,
			opacity:this.anim,
			position:'absolute',
			backgroundColor:'white',
			shadowColor:this.anim.interpolate({inputRange:[0,1],outputRange:['gray','black']}),
	        shadowOffset:{width:2,height:2},
	        shadowOpacity:this.anim,

		}

		return (

			<Animated.View ref={el=>this.root=el} style={this.animatedStyle}>
				<ScrollView>
					{this.state.open ? <Info/> : <Loading color={'#00b484'} isVisible={!this.state.open} size={30}/>}
				</ScrollView>
			</Animated.View>

			
					
			)
	}


}

Object.assign(Test.prototype, TimerMixin);



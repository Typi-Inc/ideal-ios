import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import Deal from './deal'
import {openAnimation} from './animations'
import Test from './test'
let UIManager = require('NativeModules').UIManager;
let {
  Text,
  TouchableOpacity,
  Image,
  View,
} = React;
export default class Navbar extends React.Component{
	state={}
	destroy(){
		this.refs['mainView'].setNativeProps({style:{height:0}})
		this.refs['text'].setNativeProps({style:{height:0}})
	}
	revive(){
		this.refs['mainView'].setNativeProps({style:{height:50*k}})
		this.refs['text'].setNativeProps({style:{height:20*k}})
	}
	render(){
		return (
			<View ref='mainView' style={[{backgroundColor:this.props.color?this.props.color:'0679a2',
				height:50*k,alignItems:'center',justifyContent:'space-between',flexDirection:'row'}]}>
				<TouchableOpacity  onPress={()=>this.props.navigator.pop()}>
					<View style={{height:36*k,width:36*k,...center}}>
						<Image  style={{height:16*k,width:12*k}} source={{uri:'arrowWhite',isStatic:true}}/>
					</View>
				</TouchableOpacity>
				<Text  ref='text' style={{color:'white',fontWeight:'700',fontSize:16*k,}}>{this.props.title}</Text>
				<View  style={{width:36*k}}/>
			</View>
     		)
	}
}
Object.assign(Navbar.prototype, TimerMixin);



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
			<View>
				<View ref='mainView' style={[{backgroundColor:this.props.color?this.props.color:'#0679a2',
					height:50*k,...center,flexDirection:'row'}]}>
					<Text  ref='text' style={{color:'white',fontWeight:'700',fontSize:16*k,}}>{this.props.title}</Text>
				</View>
				{this.props.backButton?(
					<TouchableOpacity style={{position:'absolute',top:6*k,backgroundColor:'transparent'}}  onPress={()=>this.props.navigator.pop()}>
						<View style={{height:36*k,width:36*k,...center}}>
							<Image  style={{height:16*k,width:12*k}} source={{uri:'arrowWhite',isStatic:true}}/>
						</View>
					</TouchableOpacity>
					):<View/>

				}
				{this.props.onRightButtonPress?(
					<TouchableOpacity style={{position:'absolute',top:6*k,left:280*k,backgroundColor:'transparent'}}  onPress={()=>this.props.onRightButtonPress()}>
						<View style={{height:36*k,width:36*k,...center}}>
							<Image  style={{height:16*k,width:12*k}} source={{uri:'arrowWhite',isStatic:true}}/>
						</View>
					</TouchableOpacity>
					):<View/>
				}
				
			</View>
     		)
	}
}
Object.assign(Navbar.prototype, TimerMixin);



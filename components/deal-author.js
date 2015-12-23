import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import Deal from './deal'
import {openAnimation} from './animations'
import Test from './test'
let UIManager = require('NativeModules').UIManager;
let {
  Text,
  View,
  Image
} = React;
export default class DealAuthor extends React.Component{
	state={}
	render(){
		return (
		<View>
			<View style={{alignItems:'center',justifyContent:'space-between',flexDirection:'row',height:40*k}}>
				<View style={{...center,flexDirection:'row'}}>
					<Image source={{uri:this.props.business.image}} style={{height:30*k,width:30*k,marginLeft:5*k}}/>
					<Text style={{marginLeft:10*k,fontSize:14*k,fontWeight:'700'}}>{this.props.business.name}</Text>
				</View>
				<Text style={{marginLeft:10*k,fontSize:12*k,fontWeight:'400',color:'gray',marginRight:10*k}}>3 дня</Text>
			</View>
			<View style={{height:1,backgroundColor:'e4e4e4'}}/>
		</View>
     		)
	}
}
Object.assign(DealAuthor.prototype, TimerMixin);



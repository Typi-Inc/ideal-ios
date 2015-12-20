import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import Spinner from 'react-native-spinkit'
let UIManager = require('NativeModules').UIManager;
let {
  Text,
  View,
  Image
} = React;
export default class Loading extends React.Component{
	state={}
	render(){
		return (
	<View style={{flex:1,marginTop:10*k,alignItems:'center',justifyContent:'flex-start',height:this.props.height?this.props.height:300}}>

				 <Spinner style={{marginTop:15*k}} isVisible={this.props.isVisible} size={this.props.size} type={'WanderingCubes'} color={this.props.color}/>       


			</View>
     		)
	}
}
Object.assign(Loading.prototype, TimerMixin);



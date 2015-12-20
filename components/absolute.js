import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import Search from './search'
let UIManager = require('NativeModules').UIManager;
let {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  ScrollView,
  TextInput,
  TouchableOpacity,
  LayoutAnimation,
  StatusBarIOS,
} = React;
import {tags,data} from './mock'
import Deals from './deals'
import {openAnimation,scrollToTopAnimation,closeImageAnimation} from './animations'
import Tag from './tag'
export default class Absolute extends React.Component{
	state={}

	move(n){
		let refS=n+''
		this.refs[refS].setNativeProps({
			style:{
				position:'absolute',
				top:-80,
				left:10*n+100,
				marginLeft:10	
			}
		})
		this.search.tagClick()
	}
	

	render(){
		return (
			<View style={{flex:1,backgroundColor:'white'}}>
			<View style={{height:60*k,width:320*k,position:'absolute',top:0,left:0,backgroundColor:'white',}}/>
				<View style={{flexDirection:'row',marginTop:20,height:100*k,backgroundColor:'00b484',marginTop:100}}>
					<TouchableOpacity onPress={this.move.bind(this,1)}><View ref='1' style={{backgroundColor:'red',height:20,width:40,marginTop:10}}/></TouchableOpacity>
					<TouchableOpacity onPress={this.move.bind(this,2)}><View ref='2' style={{backgroundColor:'blue',height:20,width:40,marginTop:10}}/></TouchableOpacity>
					<TouchableOpacity onPress={this.move.bind(this,3)}><View ref='3' style={{backgroundColor:'orange',height:20,width:40,marginTop:10}}/></TouchableOpacity>
				</View>

				<TouchableOpacity onPress={()=>this.search.tagClick()}><Text>click</Text></TouchableOpacity>

				
				<Search ref={(el)=>this.search=el}/>

				<Deals data={data} navbar={false} />

			</View>
			

			)
	}


}

Object.assign(Absolute.prototype, TimerMixin);
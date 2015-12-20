import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import {openAnimation,spring1,spring2,scrollToTopAnimation,closeImageAnimation} from './animations'
import Comment from './comment'
import Deal from './deal'
let UIManager = require('NativeModules').UIManager;

let {
  LayoutAnimation,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity
} = React;
export default class LentaItem extends React.Component{
	state={}
	closeDeal(){
		this.props.navigator.pop()
	}
	goToDeal(){
		let route={
			name:'Deal',
			deal:this.props.deal,
			closeDeal:this.closeDeal.bind(this)
			// passProps:{deal:this.props.deal,isOpen:true,viewDeal:null,closeDeal:this.closeDeal.bind(this),pushedFromLenta:true}
		}
		// let routes = this.props.navigator.getCurrentRoutes();
        this.props.navigator.push(route);


	}


	openDeal(){
		
	}
	render(){
		let deal=this.props.deal
		return (

		<TouchableOpacity onPress={this.goToDeal.bind(this)}>
			<View ref='mainView' style={{width:150*k,margin:5*k,flex:1}}>
				<Image ref='image' source={{uri:deal.uri}}  //image of the deal
				style={{justifyContent:'flex-end',width:150*k,
					height:120*k}}>
					<View style={{backgroundColor:'0084b4',height:20*k,width:40*k,...center}}>
						<Text style={{fontSize:13*k,color:'white',fontWeight:'800'}}>-30%</Text>
					</View>
				</Image>
				<View style={{flexDirection:'row',flexWrap:'wrap',width:150*k,...center}}>
					{deal.tags.map((tag,i)=>{
						return <Text style={{fontSize:9,color:'gray',fontWeight:'500',textAlign:'center'}} key={i}>  {tag.toUpperCase()} </Text>
					})}
				</View>
			</View>
		</TouchableOpacity>
					
		)
	}
}
Object.assign(LentaItem.prototype, TimerMixin);


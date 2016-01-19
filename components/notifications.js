import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import {openAnimation} from './animations'
import Navbar from './navbar'
import Combinator from './combinator'
import _ from 'lodash'
let UIManager = require('NativeModules').UIManager;
let {
  Text,
  TouchableOpacity,
  LayoutAnimation,
  ScrollView,
  InteractionManager,
  Animated,
  Image,
  View,
} = React;
export default class Notifications extends React.Component{
	state={}
	
	render(){
		return (

			<View style={{flex:1,backgroundColor:'white'}}>
				<Navbar title='Уведомления'/>

				<View style={{flexDirection:'row',marginTop:5*k,marginLeft:7*k,alignItems:'flex-start'}}>
					<Image source={{uri:'https://besmart.kz/media/events/images/218/109352.jpg.633x370_q100_crop-smart.jpg'}} style={{margin:5*k,height:45*k,width:45*k,}}/>

					<View style={{width:250*k}}>
						<Text style={{margin:5*k,fontSize:13*k}}>По вашей рекомендательной ссылке  
							<Text style={{color:'#0679a2',marginBottom:0}}> https://besmart.kz/media/... </Text>
						 была совершена покупка, на Ваш баланс зачислено 5000 тенге
						</Text>
					</View>

				</View>
				<View style={{...separator}}/>
				<View style={{flexDirection:'row',marginTop:5*k,marginLeft:7*k,alignItems:'flex-start'}}>
					<Image source={{uri:'https://besmart.kz/media/events/images/218/109352.jpg.633x370_q100_crop-smart.jpg'}} style={{margin:5*k,height:45*k,width:45*k,}}/>

					<View style={{width:250*k}}>
						<Text style={{margin:5*k,fontSize:13*k}}>По вашей рекомендательной ссылке  
							<Text style={{color:'#0679a2',marginBottom:0}}> https://besmart.kz/media/... </Text>
						 была совершена покупка, на Ваш баланс зачислено 5000 тенге
						</Text>
					</View>

				</View>
				<View style={{...separator}}/>


			</View>
 		)
		
	}
}
Object.assign(Notifications.prototype, TimerMixin);





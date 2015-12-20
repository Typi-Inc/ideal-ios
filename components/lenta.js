import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import {openAnimation,spring1,spring2,scrollToTopAnimation,closeImageAnimation} from './animations'
import Comment from './comment'
import {data} from './mock'
import LentaItem from './lenta-item'
import Deals from './deals'
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
export default class Lenta extends React.Component{
	state={text:'first',counter:0}
	componentDidMount(){
	}
	render(){
		
		// console.log('render lenta',this.state)
		this.x=this.x || 0
		return (
			<View style={{backgroundColor:'white',marginTop:15*k}}>
				<TouchableOpacity onPress={this.props.viewDeals}>
					<View style={{flexDirection:'row',height:35*k,justifyContent:'space-between',alignItems:'center'}}> 
						<Text style={{fontSize:14*k,fontWeight:'600',marginLeft:10*k}}>{this.props.category}</Text>
						<Image source={{uri:'arrowBlue',isStatic:true}} style={{height:14*k,width:12*k,marginRight:10*k}}/>
					</View>
				</TouchableOpacity>
				<View style={{...separator,marginBottom:10*k}}/> 
				<ScrollView horizontal={true}
					ref='scroll'
					scrollEventThrottle={16}
					contentContainerStyle={{paddingRight:50*k}}
					showsHorizontalScrollIndicator={false}
				>
					{data.map((deal,i)=>{
						return <LentaItem navigator={this.props.navigator} deal={deal}/>
					})}

				</ScrollView>
			</View>

		)
	}
}
Object.assign(Lenta.prototype, TimerMixin);


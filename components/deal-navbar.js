import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import Deal from './deal'
import {openAnimation} from './animations'
import Test from './test'
import Info from './info'
import Deals from './deals'
import {data} from './mock'
import Certificate from './certificate'
import Loading from './loading'
import Payout from './payout'
let UIManager = require('NativeModules').UIManager;
let {
  Text,
  TouchableOpacity,
  LayoutAnimation,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  Animated,
  View,
} = React;
export default class DealNavbar extends React.Component{
	state={open:false}
	static contextTypes={topNav:React.PropTypes.any}
	
	render(){
		this.anim4=this.anim4 || new Animated.Value(0)
		this.anim1=this.anim1 || new Animated.Value(0)
		this.slide=this.slide || new Animated.Value(0)
		
		this.textAnimatedStyle1={
			color:'white',
			fontWeight:'600',

			fontSize:this.anim1.interpolate({inputRange:[0,1],outputRange:[14*k,16*k]}),
		}
		
		return (
			<View style={{}}>
			<View style={[{backgroundColor:'white',borderWidth:1,borderColor:'#e4e4e4',
				height:47*k,alignItems:'center',justifyContent:'space-between',flexDirection:'row'}]}>
				<TouchableOpacity style={{flexDirection:'row',...center}} onPress={this.props.closeDeal}>
					<View style={{height:36*k,width:36*k,...center}}>
							<Image  style={{height:16*k,width:12*k}} source={{uri:'arrowBlue',isStatic:true}}/>
					</View>
					<Text style={{fontSize:14*k,fontWeight:'400',color:'#0679a2'}}>{this.props.backText}</Text>
				</TouchableOpacity>
				<TouchableWithoutFeedback  onPress={()=>this.context.topNav.push({name:'Other',component:<Payout deal={this.props.deal}/>,title:'Рекомендовать'})}>
					<View style={{marginRight:10,backgroundColor:'#0679a2',width:140*k,height:35*k,borderRadius:3*k,...center}}>
						<Animated.Text ref={el=>this.earnText=el} style={this.textAnimatedStyle1}>Рекомендовать</Animated.Text>

					</View>
					
				</TouchableWithoutFeedback>
				
				
			</View>
				
				
				

			</View>
			
     		)
	}
}
Object.assign(DealNavbar.prototype, TimerMixin);

				// <Test open={this.state.open} ref={el=>this.test=el}/>




import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import {openAnimation} from './animations'
import Navbar from './navbar'
import Certificate from './certificate'
import Loading from './loading'
let UIManager = require('NativeModules').UIManager;
let {
  Text,
  TouchableOpacity,
  LayoutAnimation,
  ScrollView,
  Animated,
  Image,
  View,
} = React;
export default class Info extends React.Component{
	state={loading:this.props.count===0,open:true,open1:false}
	componentDidMount(){
		// LayoutAnimation.easeInEaseOut()
		if(this.state.loading){
			this.setTimeout(()=>this.setState({loading:false}),300)
		}
		
	}
	toggleDeals(){
		LayoutAnimation.configureNext(openAnimation)
		Animated.spring(this.anim,{toValue:this.anim._value>0?0:1}).start()
		this.setState({open:!this.state.open})
	}
	toggleDeals1(){
		LayoutAnimation.easeInEaseOut()
		Animated.spring(this.anim1,{toValue:this.anim1._value>0?0:1}).start()
		this.setState({open1:!this.state.open1})
	}
	render(){
		this.anim=this.anim || new Animated.Value(0)
		this.anim1=this.anim1 || new Animated.Value(0)
		if(!this.state.loading){
			return (
			<View style={{marginBottom:this.state.open?80*k:300*k}}>

				<Animated.View>
					<View style={{flex:1,height:40*k,alignItems:'center',justifyContent:'space-between',flexDirection:'row'}}>
						<Text style={{marginLeft:10*k,fontWeight:'600',color:'#0679a2'}}>Сделки</Text>
						<TouchableOpacity onPress={this.toggleDeals.bind(this)} style={{height:35*k,width:50*k,backgroundColor:'transparent',...center}}>
							<Animated.Image style={{height:10*k,width:15*k,marginLeft:10*k,transform:[{rotate:this.anim.interpolate({inputRange:[0,1],outputRange:['0deg','180deg']})}]}} source={{uri:'arrowUpGrey',isStatic:true}}/>
						</TouchableOpacity>
					</View>
					<View style={{...separator}}/>
					<Animated.View style={this.animatedStyle}>

					{this.state.open?[1,2,3,4,5,6,7,8,9].map((x)=>{
							return (
								<Animated.View  key={x}>
									<Certificate/>
									<View style={{...separator}}/>
								</Animated.View>
								)
						}) :false}
					
					</Animated.View>
					<View style={{flex:1,height:40*k,alignItems:'center',justifyContent:'space-between',flexDirection:'row'}}>
						<Text style={{marginLeft:10*k,fontWeight:'600',color:'#0679a2'}}>Особенности</Text>
						<TouchableOpacity onPress={this.toggleDeals1.bind(this)} style={{height:35*k,width:50*k,backgroundColor:'transparent',...center}}>
							<Animated.Image style={{height:10*k,width:15*k,marginLeft:10*k,transform:[{rotate:this.anim1.interpolate({inputRange:[0,1],outputRange:['180deg','0deg']})}]}} source={{uri:'arrowUpGrey',isStatic:true}}/>
						</TouchableOpacity>
					</View>
					<View style={{...separator}}/>
					<Animated.View style={this.animatedStyle}>

					{this.state.open1?<Text style={{margin:10}}>Можно приобрести для себя и в подарок: неограниченное количество купонов.
Бронирование: обязательно, по телефону.
Можно приносить свою еду и напитки, либо заказать у нас.
Скидка не суммируется с другими действующими акциями Al Pacino. 
Распечатка купона: не обязательно, достаточно сообщить его номер.
Срок действия: до 10 января 2016 (включительно)</Text> :false}
					
					</Animated.View>


				</Animated.View>

			</View>		
     		)
		}
		return <Loading size={30} color={'#0679a2'} isVisible={this.state.loading}/>
		
	}
}
Object.assign(Info.prototype, TimerMixin);



import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import {openAnimation} from './animations'
import Navbar from './navbar'
import Certificate from './certificate'
import Loading from './loading'
import {getQuery} from '../intent/getQuery'
import Combinator from './combinator'
import _ from 'lodash'
import Spinner from 'react-native-spinkit'
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
	state={loading:true,open:true,open1:false,totalBuyCount:0}
	componentDidMount(){
		this.setTimeout(()=>{
		// LayoutAnimation.easeInEaseOut()
			this.setState({loading:false})
		},0)
	}
	componentWillMount(){
		getQuery([
			['dealsById',this.props.deal.get('id'),'certificates','sort:createdAt=desc', 'edges', {from: 0, to: 20}, ['title','oldPrice','newPrice','id']],
			// ['dealsById',this.props.dealId,'certificates','sort:createdAt=desc', 'edges', {from: 0, to: 20}, 'author',['name','image']],
		])
	}
	static contextTypes={
    	state$: React.PropTypes.any
  	}
  	componentWillUnmount(){
  	}
  	totalBuyCount(val,type){
  		this.setState({totalBuyCount:this.state.totalBuyCount+val})
  	}
	render(){
		if(this.state.loading){
			return <View style={{height:500*k}}></View>
		}
		this.anim=this.anim || new Animated.Value(0)
		this.anim1=this.anim1 || new Animated.Value(0)
		let certificates = this.props.deal.getIn(['certificates', 'sort:createdAt=desc', 'edges'])
		return (
			<View style={{marginBottom:100*k}}>
				<View style={{...center,height:40*k}}>
					<Text style={{color:'gray'}}>Осталось 3 дня</Text>
				</View>
				<View style={{...separator}}/> 
				{
					certificates ? certificates.toArray().map(certificate => (
						<View key={`${certificate.get('id')}${this.props.deal.get('id')}`} >
							<Certificate totalBuyCount={this.totalBuyCount.bind(this)} certificate={certificate}/>
							<View style={{...separator}}/>
						</View>
					)) : (
						<View  style={{...center}}>
  							<Spinner style={{marginTop:15*k}} isVisible size={30} type={'WanderingCubes'} color={'0679a2'}/>       
						</View>
					)
				}
			</View>		
 		)
		
	}
}
Object.assign(Info.prototype, TimerMixin);

// <View style={{flex:1,height:40*k,alignItems:'center',justifyContent:'space-between',flexDirection:'row'}}>
// 						<Text style={{marginLeft:10*k,fontWeight:'600',color:'#0679a2'}}>Особенности</Text>
// 						<TouchableOpacity onPress={this.toggleDeals1.bind(this)} style={{height:35*k,width:50*k,backgroundColor:'transparent',...center}}>
// 							<Animated.Image style={{height:10*k,width:15*k,marginLeft:10*k,transform:[{rotate:this.anim1.interpolate({inputRange:[0,1],outputRange:['180deg','0deg']})}]}} source={{uri:'arrowUpGrey',isStatic:true}}/>
// 						</TouchableOpacity>
// 					</View>
// 					<View style={{...separator}}/>
// 					<Animated.View style={this.animatedStyle}>

// 					{this.state.open1?<Text style={{margin:10}}>Можно приобрести для себя и в подарок: неограниченное количество купонов.
// 										Бронирование: обязательно, по телефону.
// 										Можно приносить свою еду и напитки, либо заказать у нас.
// 										Скидка не суммируется с другими действующими акциями Al Pacino. 
// 										Распечатка купона: не обязательно, достаточно сообщить его номер.
// 										Срок действия: до 10 января 2016 (включительно)</Text> :false}
					
// 					</Animated.View>




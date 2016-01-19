import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import {openAnimation} from './animations'
import Navbar from './navbar'
import CartCertificate from './cart-certificate'
import Loading from './loading'
import {getQuery} from '../intent/getQuery'
import Combinator from './combinator'
import _ from 'lodash'
import Payout from './payout'
import {toggleItemToCart} from '../intent/toggleItemToCart' 
import Spinner from 'react-native-spinkit'
export let message=''
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
export default class Cart extends React.Component{
	state={}
	static contextTypes={
    	state$: React.PropTypes.any,topNav:React.PropTypes.any
  	}

  	goToDeal(deal){
  		// let deal2=deal.deleteIn(['certificates'])
  		this.props.navigator.push({name:'Deal',dealId:deal.get('id')})
  	}
	render(){
		return (
			<View style={{flex:1,backgroundColor:'#e8e8ee'}}>

				<Combinator>
					<View>
						{
							this.context.state$.map(state=>state.get('chosenItems')).distinctUntilChanged().
							map(chosenItems=>{
								if(!chosenItems)return <View style={{backgroundColor:'white',...center,flex:1,height:520*k}}>
												<Text>Ваша корзина пуста</Text>
													</View>;
								let totalSum=chosenItems.valueSeq().toArray().map(item=>{
									if(!item)return;
									return item.get('certificates').valueSeq().toArray()
										.map(certificate=>certificate.get('newPrice')*certificate.get('count')).reduce((x,y)=>x+y)
								}).reduce((x,y)=>x+y, 0)
								if (totalSum>0){
									return <View style={{backgroundColor:'white'}}>
												<Text style={{fontSize:14*k,fontWeight:'bold',marginTop:10*k,marginLeft:10*k,marginBottom:10*k}}>Итого к оплате: {totalSum} тенге</Text>
												<View style={{...separator}}/>
												<TouchableOpacity><View style={{backgroundColor:'white',height:40*k,justifyContent:'center',padding:10}}><Text>Оплатить банковской картой</Text></View></TouchableOpacity>
												<View style={{...separator}}/>
												<TouchableOpacity onPress={()=>toggleItemToCart({kill:true})}><View style={{backgroundColor:'white',height:40*k,justifyContent:'center',padding:10}}><Text>Очистить корзину</Text></View></TouchableOpacity>
												<View style={{...separator}}/>
											</View>
								}else{
									return <View style={{backgroundColor:'white',...center,flex:1,height:520*k}}>
												<Text>Ваша корзина пуста</Text>

											</View>
								}
							})
						}

					</View>
				</Combinator>
				<Combinator>
					<ScrollView>
						{
							this.context.state$.
								map(state => {
									return state.get('chosenItems')
								}).distinctUntilChanged().
								map(chosenItems => {
									if (!chosenItems) {
										return;
									}
										return <View>
											{ 
												chosenItems.valueSeq().toArray().map(item=>{
													if(!item) return;
													// console.log(item.get('certificates'))
													return <View key={item.get('id')} style={{backgroundColor:'white',marginTop:10*k}}>

																<TouchableOpacity onPress={this.goToDeal.bind(this,item)}>
																	<View>
																		<View style={{flexDirection:'row',marginTop:5*k,marginLeft:7*k,alignItems:'center'}}>
																			<Image source={{uri:item.get('image')}} style={{margin:5*k,height:45*k,width:45*k}}/>

																			<View style={{width:260*k}}>
																				<Text style={{margin:5*k}}>{item.get('title')} 
																					<Text style={{fontWeight:'bold'}}> «{item.getIn(['business','name'])}»</Text>
																				</Text>
																			</View>
																		</View>
																		<View style={{flexDirection:'row',marginBottom:5*k,alignItems:'center',marginTop:5*k,marginLeft:10*k}}>
																			<Image source={{uri:'sharing6',isStatic:true}} style={{height:10*k,width:10*k,marginLeft:2,marginRight:3}}/>
																			<Text style={{color:'gray'}}>114</Text>
																			<Image source={{uri:'cartGreen',isStatic:true}} style={{height:10*k,width:10*k,marginRight:3,marginLeft:8}}/>
																			<Text style={{color:'gray'}}>19</Text>
																			<Image source={{uri:'smallLikeRed',isStatic:true}} style={{height:10*k,width:10*k,marginLeft:8,marginRight:3}}/>

																			<Combinator>
																				<View>
																					{
																						this.context.state$.map(state=>state.getIn(['dealsById',item.get('id'),'likes', 'sort:createdAt=desc', 'count'])).distinctUntilChanged().map(count=>{
																							if(!count)return <View/>
																							this.count=this.count||null
																							return <Text style={{color:'gray'}}>{count}</Text>	
																						})
																					}
																				</View>
																			</Combinator>

																			<TouchableOpacity onPress={()=>this.context.topNav.push({name:'Other',component:<Payout fromCart={true} deal={item}/>,title:'Рекомендовать'})} style={{backgroundColor:'#0679a2',padding:10*k,paddingTop:7*k,paddingBottom:7*k,marginLeft:60*k,borderRadius:3*k}}>
																				<Text style={{color:'white',fontWeight:'500'}}>Рекомендовать</Text>
																			</TouchableOpacity>
																		</View>
																	</View>
																</TouchableOpacity>
																<View style={{...separator}}/>
																	{
																		item.get('certificates').valueSeq().toArray().map(certificate=>{
																			if(!certificate) return;
																			return <CartCertificate deal={{
																				...item.toJS()
																			}} key={certificate.get('id')} certificate={certificate}/>
																		})
																	}
																<View style={{...separator}}/>

															</View>
													})


											}

											</View>
									// }
								})
						}
					</ScrollView>
				</Combinator>
				
			</View>		
				
 		)
		
	}
}
Object.assign(Cart.prototype, TimerMixin);





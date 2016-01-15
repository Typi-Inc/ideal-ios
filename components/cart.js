import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import {openAnimation} from './animations'
import Navbar from './navbar'
import CartCertificate from './cart-certificate'
import Loading from './loading'
import {getQuery} from '../intent/getQuery'
import Combinator from './combinator'
import _ from 'lodash'
import {toggleItemToCart} from '../intent/toggleItemToCart' 
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
export default class Cart extends React.Component{
	state={}
	static contextTypes={
    	state$: React.PropTypes.any
  	}
  	componentWillUnmount(){
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
								map(state => state.get('chosenItems')).distinctUntilChanged().
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

															<View style={{flexDirection:'row',marginTop:5*k,marginLeft:7*k,alignItems:'center'}}>
																<Image source={{uri:item.get('image')}} style={{margin:5*k,height:45*k,width:45*k}}/>

															<View style={{width:260*k}}>
																<Text style={{margin:5*k}}>{item.get('title')} 
																	<Text style={{fontWeight:'bold'}}> «{item.get('businessName')}»</Text>
																</Text>
															</View>

														</View>
														<View style={{...separator}}/>
															{
																item.get('certificates').valueSeq().toArray().map(certificate=>{
																	if(!certificate) return;
																	return <CartCertificate deal={{
																		id:item.get('id'),
																		title:item.get('title'),
																		businessName:item.get('businessName'),
																		image:item.get('image')
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





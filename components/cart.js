import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import {fast,openAnimation} from './animations'
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
  TouchableWithoutFeedback,
  Image,
  View,
  StyleSheet
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
			<View ref={el=>this.mainView=el} style={{flex:1,backgroundColor:'#e8e8ee'}}>

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
									return <View>
												<View style={{backgroundColor:'white'}}>
													<Text style={{fontSize:14*k,fontWeight:'600',marginTop:15*k,marginLeft:10*k,marginBottom:15*k,alignSelf:'center'}}>Итого к оплате: {totalSum} тенге</Text>
													<View style={{...separator}}/>
													<View style={{flexDirection:'row',...center}}>
														<TouchableOpacity onPress={this.showPayOptions.bind(this)} style={{backgroundColor:'#00b484',...center,borderRadius:3*k,padding:12*k,paddingTop:8*k,paddingBottom:8*k,margin:10*k}}><Text style={{color:'white',fontWeight:'600'}}>Оплатить</Text></TouchableOpacity>

														<TouchableOpacity onPress={()=>toggleItemToCart({kill:true})} style={{backgroundColor:'#E02B3B',...center,borderRadius:3*k,padding:12*k,paddingTop:8*k,paddingBottom:8*k,margin:10*k}}><Text style={{color:'white',fontWeight:'600'}}>Очистить</Text></TouchableOpacity>
													</View>
													<View style={{...separator}}/>

												</View>
												
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
												chosenItems.valueSeq().toArray().map((item,i)=>{
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

																			<TouchableOpacity onPress={()=>this.context.topNav.push({name:'Other',component:<Payout fromCart={true} deal={item}/>,title:'Рекомендовать'})} style={{backgroundColor:'#0679a2',padding:10*k,paddingTop:8*k,paddingBottom:8*k,marginLeft:k===1?60*k:90*h,borderRadius:3*k}}>
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
				
				<TouchableWithoutFeedback onPress={this.hidePayOptions.bind(this)}>
					<View  ref={el=>this.background=el} style={{position:'absolute',top:0,height:0*k,width:320*k,backgroundColor:'rgb(0,0,0)',opacity:0.3}}/>
				</TouchableWithoutFeedback>
				<View ref={el=>this.triangle=el} style={styles.triangle}/>
				<View ref={el=>this.payOptions=el} style={{position:'absolute',height:0*k,width:320*k,top:100*k,backgroundColor:'white',opacity:0}}>
					<TouchableOpacity onPress={()=>this.props.navigator.push({name:'PayByCard'})}><Text ref={el=>this.text1=el}  style={{alignSelf:'center',margin:0*k,fontSize:0.1}}>Оплатить карточкой</Text></TouchableOpacity>
					<View ref={el=>this.separator1=el} style={{...separator,height:0}}/>
					<TouchableOpacity><Text ref={el=>this.text2=el}  style={{alignSelf:'center',margin:0*k,fontSize:0.1}}>Оплатить через QIWI</Text></TouchableOpacity>
					<View ref={el=>this.separator2=el} style={{...separator,height:0}}/>
					<TouchableOpacity><Text ref={el=>this.text3=el} style={{alignSelf:'center',margin:0*k,fontSize:0.1}}>Оплатить через терминал</Text></TouchableOpacity>
					<View ref={el=>this.separator3=el} style={{...separator,height:0}}/>

				</View>
			</View>		
				
 		)
		
	}
	showPayOptions(){
		this.background.setNativeProps({style:{height:700*k}})
		this.setTimeout(()=>{
			LayoutAnimation.configureNext(fast)
			this.payOptions.setNativeProps({style:{height:143*k}})
			for(let item of [this.text1,this.text2,this.text3]){
				item.setNativeProps({style:{margin:15*k,fontSize:14*k}})
			}
			for(let item of [this.separator1,this.separator2,this.separator3]){
				item.setNativeProps({style:{height:1}})
			}
			this.triangle.setNativeProps({style:{opacity:1}})
			this.setTimeout(()=>{this.payOptions.setNativeProps({style:{opacity:1}})})

		},0)

	}
	hidePayOptions(){
		this.setTimeout(()=>this.background.setNativeProps({style:{height:0}}),50)
		this.setTimeout(()=>{
			LayoutAnimation.configureNext(fast)
			this.payOptions.setNativeProps({style:{height:0*k,}})
			for(let item of [this.text1,this.text2,this.text3]){
				item.setNativeProps({style:{margin:0,fontSize:0.1}})
			}for(let item of [this.separator1,this.separator2,this.separator3]){
				item.setNativeProps({style:{height:0}})
			}
			this.triangle.setNativeProps({style:{opacity:0}})
			this.setTimeout(()=>{this.payOptions.setNativeProps({style:{opacity:0}})},60)

		},0)
	}
}
Object.assign(Cart.prototype, TimerMixin);

let Dimensions = require('Dimensions');
let windowSize = Dimensions.get('window');
let coeff=windowSize.width/320
let styles=StyleSheet.create({
 triangle:{
 	position:'absolute',
 	top:91*coeff,
 	left:100*coeff,
    width: 0,
    opacity:0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderBottomWidth: 10*coeff,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white'
  }
		
})


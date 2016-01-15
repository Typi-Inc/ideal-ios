import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import {openAnimation} from './animations'
import Navbar from './navbar'
import CartCertificate from './cart-certificate'
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
export default class Cart extends React.Component{
	state={}

	static contextTypes={
    	state$: React.PropTypes.any
  	}
  	componentWillUnmount(){
  	}
	render(){
		return (
			<View style={{flex:1,backgroundColor:'white'}}>
				<Combinator>
					<ScrollView>
						{
							this.context.state$.
								map(state => state.get('chosenItems')).distinctUntilChanged().
								map(chosenItems => {
									if (!chosenItems) {
										return;
									}
									// let dealIds = chosenItems.valueSeq().map(item => item.get('dealId')).toSet().toArray()
									// console.log(dealIds)
									// let deals = dealIds.map(id => {
									// 	let items = chosenItems.valueSeq().filter(item => item.get('dealId')===id).toList().toJS()
									// 	return{
									// 		id: items[0].dealId,
									// 		title: items[0].dealTitle,
									// 		businessName:items[0].businessName,
									// 		certificates:items
									// 	}
									// })
								// console.log(chosenItems.toList().toJS(),'here')

									// let items=chosenItems.toList()
									// console.log(items)
									// chosenItems.valueSeq().map(x=>console.log(x))
									// if (items.size>0){

										return <View>
											{ 
												chosenItems.valueSeq().toArray().map(item=>{
													if(!item) return;
													// console.log(item.get('certificates'))
													return <View key={item.get('id')}>
														<View style={{marginTop:5*k,marginLeft:7*k}}>
															<Text style={{margin:5*k}}>{item.get('title')} 
																<Text style={{fontWeight:'bold'}}> «{item.get('businessName')}»</Text>
															</Text>
														</View>
														<View style={{...separator}}/>
															{
																item.get('certificates').valueSeq().toArray().map(certificate=>{
																	if(!certificate) return;
																	return <CartCertificate deal={{
																		id:item.get('id'),
																		title:item.get('title'),
																		businessName:item.get('businessName')
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





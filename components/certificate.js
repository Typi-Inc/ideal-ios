import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import {openAnimation} from './animations'
import {toggleItemToCart} from '../intent/toggleItemToCart'
import Combinator from './combinator'
let UIManager = require('NativeModules').UIManager;
let {
  Text,
  View,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
  TouchableWithoutFeedback,
  InteractionManager,
  Image
} = React;
export default class Certificate extends React.Component{
	state={loading:this.props.index>3?true:false}
	static contextTypes={deal:React.PropTypes.any,state$:React.PropTypes.any}
	plus(){
		// this.setState({count:this.state.count+1})
		
		// totalBuyCount()
		toggleItemToCart({
			[this.context.deal.id]: {
				...this.context.deal,
				certificates: {
					[this.props.certificate.get('id')]: {
						...this.props.certificate.toJS(),
						count: this.count+1
					}
				}
			}
		})
		
	}
	minus(){
		if(this.count===0){
			return;
		}
		toggleItemToCart({
			[this.context.deal.id]: {
				id: this.context.deal.id,
				title: this.context.deal.title,
				businessName: this.context.deal.business.name,
				image:this.context.deal.image,
				certificates: {
					[this.props.certificate.get('id')]: {
						...this.props.certificate.toJS(),
						count: this.count-1
					}
				}
			}
		})
		// toggleItemToCart({certificate:this.props.certificate.toJS(),count:this.state.count})

	}
	componentDidMount(){

		if(this.props.index>3) InteractionManager.runAfterInteractions(()=>{
			this.setState({loading:false})
			},0)

	}
	render(){
		let certificate=this.props.certificate
		if(this.state.loading){
			return <View style={{height:60*k}}/>
		}
		return (

				<View>
					<View style={{flexDirection:'row',marginTop:10,marginBottom:7*k,justifyContent:'flex-end',alignItems:'center'}}>
						<View style={{justifyContent:'center',alignItems:'center',flex:3.6}}>
							<Text style={{marginLeft:8*k,fontSize:13*k,width:220*k,
								color:'black',
								textAlign:'auto',marginBottom:7*k}}>
								{certificate.get('title')}
							</Text>
							<View style={{flexDirection:'row',marginRight:10*k,...center,width:200*k,height:35*k,borderRadius:3*k,borderWidth:1,alignSelf:'center',borderColor:'#bbbbbb'}}>
								<TouchableOpacity onPress={this.minus.bind(this)} style={{flex:2,...center,height:35*k,backgroundColor:'transparent'}}>
									<Text style={{fontSize:15*k,fontWeight:'500',color:this.count>0?'black':'black'}}>-</Text>
								</TouchableOpacity>

								<View style={{height:35*k,width:1,backgroundColor:'#bbbbbb'}}/>
								<Combinator>
									<Text style={{flex:0.8,marginLeft:this.count>9?16*k:18*k,
										alignSelf:'center'}}>
										{
											this.context.state$.
												map(state => state.get('chosenItems')).
												map(chosenItems => {
													if (!chosenItems) {
														// console.log('here herererer ', chosenItems)
														this.count = 0
														return this.count
													}	
													let cert = chosenItems.getIn([this.context.deal.id,'certificates',this.props.certificate.get('id')]);
													if (!cert) {
														this.count = 0
														return this.count;
													}
													this.count = cert.get('count')
													return this.count;
												})
										}
									</Text>
								</Combinator>

								<View style={{height:35*k,width:1,backgroundColor:'#bbbbbb'}}/>
								<TouchableOpacity onPress={this.plus.bind(this)} style={{flex:2,...center,height:35*k,backgroundColor:'transparent'}}>
									<Text style={{fontSize:15*k,fontWeight:'500',color:'#0679a2'}}>+</Text>
								</TouchableOpacity>


							</View>

						</View>
						<View style={{flex:1,marginLeft:5*k}}>
							
							<Text style={{fontSize:14*k,fontWeight:'400',fontFamily:'Monaco'}}>{certificate.get('newPrice')}<Text style={{fontSize:14,color:'black'}}> тг</Text></Text>
						</View>
					</View>

					

					

				</View>

				


     		)
	}
}
Object.assign(Certificate.prototype, TimerMixin);

//<View style={{flex:1,flexDirection:'row',...center,marginLeft:10*k,marginTop:6*k}}>
//						<Text style={{textDecorationLine:'line-through',fontSize:12*k,color:'gray',textDecorationColor:'red'}}>{certificate.oldPrice}  </Text>
//						<Text style={{fontSize:15*k,fontWeight:'600',}}>{certificate.newPrice}</Text>
//					</View>

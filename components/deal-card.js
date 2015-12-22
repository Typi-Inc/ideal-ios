import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import Deal from './deal'
import _ from 'lodash'
import {openAnimation,scrollToTopAnimation} from './animations'
import Test from './test'
import LightBox from 'react-native-lightbox'
let UIManager = require('NativeModules').UIManager;
let {
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  View,
  ScrollView,
  LayoutAnimation,
  Animated
} = React;
export default class DealCard extends React.Component{
	state={isOpen:this.props.isOpen,isLiked:false,liked:this.props.deal.liked}
	componentWillReceiveProps(props){
		this.setState({isOpen:props.isOpen})
	}
	like(){
		LayoutAnimation.configureNext(LayoutAnimation.create(100,LayoutAnimation.Types.keyboard,LayoutAnimation.Properties.scaleXY));
		this.setState({isLiked:!this.state.isLiked,liked:!this.state.isLiked?this.state.liked+1:this.state.liked-1})
	}
	renderLightBox(){
		return (
			
				<Image  source={{uri:this.props.deal.uri}}  //image of the deal
				style={{justifyContent:'flex-end',
					height:this.state.isOpen?220*h:180*h}}>
				</Image>

			)

	}

	render(){
		let deal=this.props.deal
		this.anim=this.anim || new Animated.Value(1)	
		return (
						<Animated.View  >
							<LightBox canOpen={this.state.isOpen} viewDeal={this.props.viewDeal} onClose={()=>LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)} renderContent={this.renderLightBox.bind(this)}>
								<Image  source={{uri:deal.uri}} resizeMode={'cover'}  //image of the deal
								style={{justifyContent:'flex-end',alignItems:'flex-start',
									height:this.state.isOpen?220*h:180*h,width:this.state.isOpen?320*k:300*k}}>
				
									
									<View style={{backgroundColor:'0084b4',height:40*k,width:60*k,...center,opacity:1}}>
										<Text style={{fontSize:20*k,color:'white',fontWeight:'800'}}>-30%</Text>
									</View>
								</Image>
							</LightBox>
						<TouchableWithoutFeedback onPress={this.state.isOpen ? null:this.props.viewDeal} style={{height:330*h}}>
							<View>
							<View style={{marginLeft:!this.state.isOpen?5*k:10*k,flexDirection:'row', //title of the deal
								justifyContent:'space-between',alignItems:'center'}}>
								<View style={{width:250*k}}>
									<Text>
										<Text style={{fontSize:14*k,fontWeight:'400',}}>{deal.title}</Text>
										<Text style={{fontSize:14*k,fontWeight:'600',}}> "{deal.author}"</Text>
									</Text>
								</View>
								<View style={{width:1,backgroundColor:'e4e4e4',height:45*k,}}/>
								<View style={{flexDirection:'row',marginRight:0*k}}>
									<TouchableOpacity onPress={this.like.bind(this)}><View style={{height:45,width:45,...center,}}><Image ref={'like-image'} style={{height:!this.state.isLiked?19*k:24*k,width:!this.state.isLiked?21*k:26*k,marginRight:this.state.isOpen?k>1?10*k:6*k:6*k}} source={{uri:!this.state.isLiked?'likeGrey':'likeRed',isStatic:true}}/></View></TouchableOpacity>
								</View>
							</View> 
							<View style={{height:1,backgroundColor:'e4e4e4'}}/>
							<View style={{marginTop:10*k,flexDirection:'row',
								justifyContent:'center',alignItems:'center' //tag row starting here
								}}>

								<View style={{flexDirection:'row',flexWrap:'wrap',flex:2,marginLeft:!this.state.isOpen?5*k:10*k}}>
									{_.values(deal.tags['sort:createdAt=desc'].edges).filter(tag=>tag.text).map((tag,i)=>{
										return <Text style={{fontSize:10*k,color:'gray',fontWeight:'500'}} key={i}>  {tag.text.toUpperCase()}</Text>
									})}
								</View>
								<View style={{flex:1,flexDirection:'row',...center,}}>
									<Text style={{textDecorationLine:'line-through',fontSize:13*k,color:'gray',textDecorationColor:'red'}}>1000  </Text>
									<Text style={{fontSize:20*k,fontWeight:'600'}}>700</Text>
								</View>
							</View>
							<View style={{flexDirection:'row',marginBottom:14*k,alignItems:'center',marginTop:10*k,marginLeft:!this.state.isOpen?10*k:15*k}}>
								<Image source={{uri:'cartGreen',isStatic:true}} style={{height:10*k,width:10*k,marginRight:3}}/>
								<Text style={{color:'gray'}}>{deal.bought}</Text>
								<Image source={{uri:'smallLikeRed',isStatic:true}} style={{height:10*k,width:10*k,marginLeft:8,marginRight:3}}/>
								<Text style={{color:'gray'}}>{this.state.liked}</Text>
								<Image source={{uri:'hand132-5',isStatic:true}} style={{height:20*k,width:20*k,marginLeft:8,marginRight:3,marginBottom:4*k,transform:[{rotate:'15deg'}]}}/>
								<Text style={{color:'gray'}}>1000 тг</Text>
							</View>
							</View>
						</TouchableWithoutFeedback>
					</Animated.View>
			
     		)
	}
}
Object.assign(DealCard.prototype, TimerMixin);

					// {this.state.isOpen?
					// 					(<TouchableOpacity onPress={this.props.closeDeal}>
					// 						<View>
					// 							<View style={{backgroundColor:'#9B9B9B',height:40*k,width:40*k,...center,opacity:0.6}}/>
					// 							<Image style={{backgroundColor:'transparent',height:20*k,width:20*k,position:'absolute',top:10*k,left:10*k}} source={{uri:'crossWhite',isStatic:true}}/>
					// 						</View>
					// 					</TouchableOpacity>):null

					// 				}

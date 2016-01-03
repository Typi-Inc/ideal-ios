import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import Deal from './deal'
import _ from 'lodash'
import {openAnimation,scrollToTopAnimation} from './animations'
import Combinator from './combinator'
import Test from './test'
import {callQuery} from '../intent/callQuery'
import {getQuery} from '../intent/getQuery'
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
class Like extends React.Component{
	state={}
	componentWillUpdate(){
		console.log('updateing very strange')
		LayoutAnimation.configureNext(LayoutAnimation.create(150,LayoutAnimation.Types.keyboard,LayoutAnimation.Properties.opacity));

	}
	render(){
		return <TouchableWithoutFeedback onPress={this.props.like}><View style={{height:45,width:45,...center,}}><Image ref={el=>this.image=el} style={{height:!this.props.bool?19*k:24*k,width:!this.props.bool?21*k:26*k,marginRight:this.props.isOpen?k>1?10*k:6*k:6*k}} source={{uri:!this.props.bool?'likeGrey':'likeRed',isStatic:true}}/></View></TouchableWithoutFeedback>
	}
}

export default class DealCard extends React.Component{
	state={isOpen:this.props.isOpen}
	static contextTypes={
    	state$: React.PropTypes.any
  	}
  	componentWillMount() {
  		getQuery([
  			['dealsById', this.props.deal.id, 'likes', `where:idDeal=${this.props.deal.id},idLiker={{me}}`, 'count']
  		])
  	}
	componentWillReceiveProps(props){
		this.setState({isOpen:props.isOpen})
	}
	like(){
		// this.setState({isLiked:!this.state.isLiked,liked:!this.state.isLiked?this.state.liked+1:this.state.liked-1})

		callQuery(
			['like', 'toggle'],
			[this.props.deal.id]
		)
	}

	renderLightBox(){
		return (
			
				<Image  source={{uri:this.props.deal.image}}  //image of the deal
				style={{justifyContent:'flex-end',
					height:this.state.isOpen?200*h:180*h}}>
				</Image>
			)
	}
	render(){
		let deal=this.props.deal
		this.anim=this.anim || new Animated.Value(0)	
		return (
						<Animated.View  >
							<LightBox canOpen={this.state.isOpen} viewDeal={this.props.viewDeal} onClose={()=>LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)} renderContent={this.renderLightBox.bind(this)}>
								<Image  source={{uri:deal.image}} resizeMode={'cover'}  //image of the deal
								style={{justifyContent:'flex-end',alignItems:'flex-start',
									height:this.state.isOpen?200*h:180*h,width:this.state.isOpen?320*k:300*k}}>
									<View style={{backgroundColor:'rgba(0,132,180,0.9)',height:40*k,width:60*k,...center,opacity:1}}>
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
										<Text style={{fontSize:14*k,fontWeight:'600',}}> «{deal.business.name}»</Text>
									</Text>
								</View>
								<View style={{width:1,backgroundColor:'e4e4e4',height:46*k,}}/>
								<Combinator>
									<View style={{flexDirection:'row',marginRight:0*k}}>
										{
											this.context.state$.pluck('dealsById').filter(x => x).
												pluck(this.props.deal.id).filter(x => x).
												pluck('likes').filter(x => x).
												pluck(`where:idDeal=${this.props.deal.id},idLiker={{me}}`).filter(x => x).
												pluck('count').distinctUntilChanged().map(bool =>{
													return <Like like={this.like.bind(this)} bool={bool} isOpen={this.state.isOpen}/>
												}
												)
										}
									</View>
								</Combinator>
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
									<Text style={{textDecorationLine:'line-through',fontSize:15*k,color:'gray',textDecorationColor:'red'}}>1000  </Text>
									<Text style={{fontSize:20*k,fontWeight:'600'}}>700</Text>
								</View>
							</View>
							<View style={{flexDirection:'row',marginBottom:14*k,alignItems:'center',marginTop:10*k,marginLeft:!this.state.isOpen?10*k:15*k}}>
								<Image source={{uri:'cartGreen',isStatic:true}} style={{height:10*k,width:10*k,marginRight:3}}/>
								<Text style={{color:'gray'}}>19</Text>
								<Image source={{uri:'smallLikeRed',isStatic:true}} style={{height:10*k,width:10*k,marginLeft:8,marginRight:3}}/>
								<Text style={{color:'gray'}}>{deal.likes['sort:createdAt=desc'].count}</Text>
								<Image source={{uri:'Earn blue green',isStatic:true}} style={{height:22*k,width:16*k,marginLeft:8,marginRight:3,marginBottom:4*k,transform:[{rotate:'15deg'}]}}/>
								<Text style={{color:'gray'}}>1000 тг</Text>
							</View>
							</View>
						</TouchableWithoutFeedback>
					</Animated.View>
     		)
	}
}
Object.assign(DealCard.prototype, TimerMixin);


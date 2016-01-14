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
var Auth0Lock = require('react-native-lock-ios');
var lock = new Auth0Lock({clientId: 'TWpDN8HdEaplEXJYemOcNYSXi64oQmf8', domain: 'ideal.eu.auth0.com'});

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
var store = require('react-native-simple-store');


class Like extends React.Component{
	state={}
	componentWillUpdate(){
		// console.log('updateing very strange')
		LayoutAnimation.configureNext(LayoutAnimation.create(150,LayoutAnimation.Types.keyboard,LayoutAnimation.Properties.opacity));

	}
	shouldComponentUpdate(nextProps, nextState) {
   	 return !_.isEqual(nextProps.bool, this.props.bool)

 	 }
	render(){
		return <TouchableWithoutFeedback onPress={this.props.like}><View style={{height:45,width:45,...center,}}><Image ref={el=>this.image=el} style={{height:!this.props.bool?22*k:24*k,width:!this.props.bool?23*k:26*k,marginRight:this.props.isOpen?k>1?10*k:6*k:6*k}} source={{uri:!this.props.bool?'likeGrey':'likeRed',isStatic:true}}/></View></TouchableWithoutFeedback>
	}
}

export default class DealCard extends React.Component{
	state={isOpen:this.props.isOpen}
	static contextTypes={
    	state$: React.PropTypes.any
  	}
	componentWillReceiveProps(props){
		this.setState({isOpen:props.isOpen})
	}
	like(){
		// this.setState({isLiked:!this.state.isLiked,liked:!this.state.isLiked?this.state.liked+1:this.state.liked-1})
		store.get('Auth0Token').then(res=>{
			if (res) {
				callQuery(
					['like', 'toggle'],
					[this.props.deal.get('id')]
				)
			} else {
				lock.show({closable:true}, (err, profile, token) => {
					if (err) {
						return;
					}
						store.save('Auth0Token',{idToken:token.idToken}).then(res=>{
							toggleAuth(token.idToken)
							// console.log(profile)
							callQuery(
								['users', 'create'],
								[profile],
								['id']
							)
						})
					});	
			}
		})	
	}

	renderLightBox(){
		return (
			
				<Image source={{uri:this.props.deal.get('image')}}  //image of the deal
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
								
						<TouchableWithoutFeedback onPress={this.state.isOpen ? null:this.props.viewDeal} style={{height:330*h}}>
							<View>
							<Image  source={{uri:deal.get('image')}} resizeMode={'cover'}  //image of the deal
								style={{justifyContent:'flex-end',alignItems:'flex-start',
									height:this.state.isOpen?200*h:180*h,width:this.state.isOpen?320*k:320*k}}>
									
								</Image>
								<View style={{marginLeft:!this.state.isOpen?5*k:10*k,flexDirection:'row', //title of the deal
									justifyContent:'space-between',alignItems:'center'}}>
									<View style={{width:260*k}}>
										<Text>
											<Text style={{fontSize:14*k,fontWeight:'400',}}>{deal.get('title')}</Text>
											<Text style={{fontSize:14*k,fontWeight:'600',}}> «{deal.getIn(['business', 'name'])}»</Text>
										</Text>
									</View>
									<View style={{width:1,backgroundColor:'e4e4e4',height:46*k,}}/>
										<View style={{flexDirection:'row',marginLeft:this.state.isOpen ?3*k:1*k}}>
											<Like like={this.like.bind(this)} bool={this.props.deal.getIn(['likedByUser', '{{me}}'])} isOpen={this.state.isOpen}/>
										</View>
								</View> 
								<View style={{height:1,backgroundColor:'e4e4e4'}}/>



								<View style={{flexDirection:'row',marginTop:10*k}}>
									<View style={{flex:2}}>
										<View style={{flexDirection:'row',flexWrap:'wrap',flex:2,marginLeft:!this.state.isOpen?5*k:10*k,width:200*k}}>
											{
												deal.getIn(['tags', 'sort:createdAt=desc', 'edges'])&&deal.getIn(['tags', 'sort:createdAt=desc', 'edges']).toArray().filter(tag => tag.get('text')).map(tag => (
													<Text style={{fontSize:10*k,color:'gray',fontWeight:'500'}} key={`${tag.get('id')}${deal.get('id')}`}>  {tag.get('text').toUpperCase()}</Text>
												))
											}
										</View>
											<View style={{flexDirection:'row',marginBottom:10*k,alignItems:'center',marginTop:10*k,marginLeft:!this.state.isOpen?10*k:15*k}}>
												<Image source={{uri:'sharing6',isStatic:true}} style={{height:10*k,width:10*k,marginLeft:2,marginRight:3}}/>
												<Text style={{color:'gray'}}>114</Text>
												<Image source={{uri:'cartGreen',isStatic:true}} style={{height:10*k,width:10*k,marginRight:3,marginLeft:8}}/>
												<Text style={{color:'gray'}}>19</Text>
												<Image source={{uri:'smallLikeRed',isStatic:true}} style={{height:10*k,width:10*k,marginLeft:8,marginRight:3}}/>
												<Text style={{color:'gray'}}>{deal.getIn(['likes', 'sort:createdAt=desc', 'count'])}</Text>
												
											</View>
										
									</View>
									<View style={{flex:1,flexDirection:'row',...center,marginTop:10*k}}>
										<Text style={{textDecorationLine:'line-through',fontFamily:'Monaco',fontSize:15*k,color:'gray',textDecorationColor:'red'}}>1000 </Text>
										<Text style={{ marginRight:10*k,fontSize:19*k,fontWeight:'600',fontFamily:'Monaco'}}>700<Text style={{fontSize:14,color:'black'}}> тг</Text></Text>
									</View>
								</View>




								
							</View>
						</TouchableWithoutFeedback>
					</Animated.View>
     		)
	}
}
Object.assign(DealCard.prototype, TimerMixin);


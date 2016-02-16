import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import Deal from './deal'
import _ from 'lodash'
import {openAnimation,scrollToTopAnimation,veryFast} from './animations'
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
		return <TouchableWithoutFeedback onPress={this.props.like}><View style={{height:40,width:40,...center,}}><Image ref={el=>this.image=el} style={{height:!this.props.bool?22*k:24*k,width:!this.props.bool?23*k:26*k,marginRight:this.props.isOpen?k>1?10*k:6*k:6*k}} source={{uri:!this.props.bool?'likeGrey':'likeRed',isStatic:true}}/></View></TouchableWithoutFeedback>
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
		this.move=this.move || 0
		let deal=this.props.deal
		this.anim=this.anim || new Animated.Value(0)	
		return (
						<Animated.View  style={{flex:1}}>

								<ScrollView horizontal={true}
								pagingEnabled={true}
								style={{backgroundColor:'gray'}}
								// onTouchStart={(e)=>{this.move=0}}
								// onTouchMove={(e)=>{this.move=1}}
								// onTouchEnd={(e)=>{
								// 	if (this.move===0&&!this.state.isOpen){
								// 		this.props.viewDeal()
								// 	}					
								// }}
									// contentContainerStyle={{paddingRight:50*k}}
									showsHorizontalScrollIndicator={false}
									>
						<TouchableWithoutFeedback onPress={this.state.isOpen ? null:this.props.viewDeal} style={{height:330*h,flex:1}}>
									<Image
									// onPress={()=>console.log('pressing image')}
									// onProgress={(e)=>console.log(e)}
								
									onLoadStart={()=>LayoutAnimation.configureNext(veryFast)} 
									// onLoadStart={()=>console.log()} 
									source={{uri:'http://simplykellydesigns.com/blog/wp-content/uploads/2014/03/SimplyKellyDesigns_PersimmonRosesSquare_WEB-600x600.jpg'}} //image of the deal
									style={{...center,
										height:280*k,width:320*k}}>
										
									</Image>
									</TouchableWithoutFeedback>
									<Image  source={{uri:'http://rlv.zcache.co.uk/beautiful_bouquet_of_flowers_square_paper_coaster-reb634e4027154733b6fe1427c25b08de_z6joz_1024.jpg?rlvnet=1'}}  //image of the deal
									style={{justifyContent:'flex-end',alignItems:'flex-start',
										height:280*k,width:320*k}}>
										
									</Image>
									<Image  source={{uri:'http://www.shop.nakayamaflowers.com/images/sring%20nose%20gay%20tf2014.jpg'}}  //image of the deal
									style={{justifyContent:'flex-end',alignItems:'flex-start',
										height:280*k,width:320*k}}>
										
									</Image>
									<Image
									// onLoadStart={()=>LayoutAnimation.configureNext(openAnimation)}  
									source={{uri:'http://cache2.asset-cache.net/gc/155394408-beautiful-bunch-of-colorful-flowers-close-up-gettyimages.jpg?v=1&c=IWSAsset&k=2&d=CrnhUwb6LqheONeD5bWQcacGhbmH34Gp5yDdnI9MUVyNxki8QDXAWT6XZqAsDsPs'}} //image of the deal
									style={{justifyContent:'flex-end',alignItems:'flex-start',
										height:280*k,width:320*k}}>
										
									</Image>
									<Image  source={{uri:'http://cache4.asset-cache.net/gc/155439411-beautiful-bouquet-of-flowers-in-soft-colours-gettyimages.jpg?v=1&c=IWSAsset&k=2&d=6BQooCBkzuDcJGJ%2B7%2BBXgo3vreHOpbnXrrKcCYJdj36jMxb8nm9mPVaYfSqmvXr8'}}  //image of the deal
									style={{justifyContent:'flex-end',alignItems:'flex-start',
										height:280*k,width:320*k}}>
										
									</Image>
									<Image  source={{uri:'http://g01.a.alicdn.com/kf/HTB1qj7hIpXXXXb.XVXXq6xXFXXXa/DIY-Beautiful-Flowers-Diamond-Resin-Square-Full-Of-Diamond-Embroidery-Decorative-Mosaic-Pattern-5D-Cross-Stitch.jpg'}}  //image of the deal
									style={{justifyContent:'flex-end',alignItems:'flex-start',
										height:280*k,width:320*k}}>
										
									</Image>
								</ScrollView>
						<TouchableWithoutFeedback onPress={this.state.isOpen ? null:this.props.viewDeal} style={{height:330*h,flex:1}}>
							<View style={{flex:1}}>
								
								<View style={{marginLeft:8*k,flexDirection:'row', //title of the deal
									justifyContent:'space-between',alignItems:'center'}}>
									<View style={{width:260*k,flexDirection:'column'}}>
								
											<Text style={{fontSize:16*k,fontWeight:'400',}}>Голландские розы</Text>
											<Text style={{fontSize:14*k,fontWeight:'600',color:'gray'}}>Цветы</Text>
							
									</View>
									<View style={{width:1,backgroundColor:'e4e4e4',height:46*k,}}/>
										<View style={{flexDirection:'row',marginLeft:this.state.isOpen ?3*k:1*k}}>
											<Like like={this.like.bind(this)} bool={this.props.deal.getIn(['likedByUser', '{{me}}'])} isOpen={this.state.isOpen}/>
										</View>
								</View> 
								<View style={{height:1,backgroundColor:'e4e4e4'}}/>
								<View style={{flexDirection:'row',marginTop:3*k,justifyContent:'center'}}>
									<View style={{flex:2}}>
										
											<View style={{flexDirection:'row',marginBottom:10*k,alignItems:'center',marginTop:5*k,marginLeft:10*k}}>
												<Image source={{uri:'shareBlue',isStatic:true}} style={{height:11*k,width:10*k,marginLeft:2,marginRight:3}}/>
												<Text style={{color:'gray'}}>11</Text>
												<Image source={{uri:'cartGreen',isStatic:true}} style={{height:12*k,width:12*k,marginRight:3,marginLeft:8}}/>
												<Text style={{color:'gray'}}>19</Text>
												<Image source={{uri:'commentBlue',isStatic:true}} style={{height:12*k,width:14*k,marginLeft:8,marginRight:3,marginTop:1}}/>
												<Text style={{color:'gray'}}>10</Text>
												<Image source={{uri:'smallLikeRed',isStatic:true}} style={{height:11*k,width:12*k,marginLeft:8,marginRight:3}}/>
												<Text style={{color:'gray'}}>{deal.getIn(['likes', 'sort:createdAt=desc', 'count'])}</Text>
												
											</View>		
									</View>
									<View style={{flex:1,flexDirection:'row',...center,marginTop:4*k}}>
										<Text style={{ marginRight:10*k,fontSize:15*k,fontWeight:'600',fontFamily:'Monaco'}}>1800 тг</Text>
									</View>
								</View>




								
							</View>
						</TouchableWithoutFeedback>
					</Animated.View>
     		)
	}
}
Object.assign(DealCard.prototype, TimerMixin);


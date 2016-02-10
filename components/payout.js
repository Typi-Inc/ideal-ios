import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import {openAnimation} from './animations'
import Combinator from './combinator'
import {toggleAuth} from '../intent/auth';

var Auth0Lock = require('react-native-lock-ios');
var lock = new Auth0Lock({clientId: 'TWpDN8HdEaplEXJYemOcNYSXi64oQmf8', domain: 'ideal.eu.auth0.com'});
var FBSDKShare = require('react-native-fbsdkshare');
var {
  FBSDKShareDialog,
  FBSDKShareLinkContent,
} = FBSDKShare;
let UIManager = require('NativeModules').UIManager;
let {
  Text,
  View,
  TouchableOpacity,
  Animated,
  LinkingIOS,
  LayoutAnimation,
  TouchableWithoutFeedback,
  NativeAppEventEmitter,
  Image
} = React;
var PasteBoard = require('react-native-pasteboard');
var MediaController = require('NativeModules').MediaController;
export default class Payout extends React.Component{
	state={count:0,songPlaying:'none'}
	static contextTypes={
    	state$: React.PropTypes.any
  	}

  	
	componentWillMount() {
		// this.subscription = this.context.state$.pluck('loggedIn').subscribe(loggedIn => {
		// 	this.setState({loggedIn})
		// })
	}
	componentWillUnmount() {
		// this.subscription.dispose()
	}
	componentDidMount(){
		  NativeAppEventEmitter.addListener('SongPlaying', (songName) => this.setState({songPlaying : songName}))
		  
	}
	onClick(){
		MediaController.showSongs()
	}
	fbShare(){
		var linkContent = new FBSDKShareLinkContent('https://twitter.com', 'Wow, check out this great site!', 'Facebook.com');
// Share the link using the native share dialog.
		FBSDKShareDialog.setMode('web');
		FBSDKShareDialog.show(linkContent, (error, result) => {
		  if (!error) {
		    if (result.isCancelled) {
		      // alert('Share cancelled.');
		    } else {
		      // alert('Thanks for sharing!');
		    }
		  } else {
		    alert('Error sharing.');
		  }
		});

	}
	copy(){
		PasteBoard.copyText('https://poblatu.kz/referral/iq4g2lk2ide2k',()=>{
			LayoutAnimation.easeInEaseOut()
			let top=h>0.99?k>1?453*h:447*h:360
			this.copied.setNativeProps({style:{top:top}})
			this.setTimeout(()=>{
				LayoutAnimation.easeInEaseOut()
				this.copied.setNativeProps({style:{top:670*k}})},1300)
			})
	}
	render(){

		return (
			<View style={{paddingTop:10*k,alignItems:'center',backgroundColor:'white',flex:1}}>
				<Text style={{fontWeight:'500',marginTop:10}}>Твоя рекомендательная ссылка</Text> 
				<TouchableOpacity onPress={()=>this.copy()} style={{margin:8*k,flexDirection:'row'}}> 	
					<Image source={require('image!link')} style={{height:16*k,width:16*k,marginRight:8*k}}/>
					<Text style={{color:'#0679a2',marginBottom:0}}>https://poblatu.kz/referral/...</Text>
				</TouchableOpacity>

				<Text style={{textAlign:'center',fontWeight:'500',width:280}}>Поделись ею с тем, кому может пригодиться что-то из предложенного от:</Text>
				<View style={{...separator}}/>
				<View style={{borderWidth:1,borderColor:'#e4e4e4',marginTop:10,marginBottom:10}}>
					<View style={{flexDirection:'row',marginTop:5*k,marginLeft:7*k,alignItems:'center'}}>
						<Image source={{uri:this.props.deal.get('image')}} style={{margin:5*k,height:45*k,width:45*k}}/>

						<View style={{width:260*k}}>
							<Text style={{margin:5*k}}>{this.props.deal.get('title')} 
								<Text style={{fontWeight:'bold'}}> «{this.props.deal.getIn(['business','name'])}»</Text>
							</Text>
						</View>
					</View>
					<View style={{flexDirection:'row',marginBottom:5*k,alignItems:'center',marginTop:5*k,marginLeft:10*k}}>
						<Image source={{uri:'sharing6',isStatic:true}} style={{height:10*k,width:10*k,marginLeft:2,marginRight:3}}/>
						<Text style={{color:'gray'}}>114</Text>
						<Image source={{uri:'cartGreen',isStatic:true}} style={{height:10*k,width:10*k,marginRight:3,marginLeft:8}}/>
						<Text style={{color:'gray'}}>19</Text>
						<Image source={{uri:'smallLikeRed',isStatic:true}} style={{height:10*k,width:10*k,marginLeft:8,marginRight:3}}/>
						{this.props.fromCart?(
							<Combinator>
								<View>
									{
										this.context.state$.map(state=>state.getIn(['dealsById',this.props.deal.get('id'),'likes', 'sort:createdAt=desc', 'count'])).distinctUntilChanged().map(count=>{
											if(!count)return <View/>
											this.count=this.count||null
											return <Text style={{color:'gray'}}>{count}</Text>	
										})
									}
								</View>
							</Combinator>
						):<Text style={{color:'gray'}}>{this.props.deal.getIn(['likes', 'sort:createdAt=desc', 'count'])}</Text>	
						}
						<Image style={{height:25*k,width:17*k,marginRight:4*k,marginBottom:4*k,marginLeft:140*k,transform:[{rotate:'15deg'}]}} source={{uri:'Earn blue green',isStatic:'true'}}/>
						
						<Text style={{color:'gray'}}>10%</Text>	
						
					</View>
				</View>
				<View style={{...separator}}/>
													

				<TouchableOpacity onPress={()=>this.copy()}>
			          <View style={{alignItems: 'center',justifyContent:'center',margin:5*k, width:160*k,padding:10*k,borderRadius:3*k,backgroundColor:'#0679a2'}}>
			           <Text style={{color:'#ffffff',fontWeight:'800',}}>Cкопировать</Text>
			          </View>
      		  </TouchableOpacity>
      		 
      		  <View style={{flexDirection:'row'}}>
				<TouchableOpacity  onPress={this.fbShare.bind(this)}>
				          	<Image style={{height:48*k,width:48*k,margin:5*k,marginTop:8*k}} source={require('image!fb-art')}/>
	      		  </TouchableOpacity>
	      		  <TouchableOpacity  onPress={()=>LinkingIOS.openURL(`whatsapp://send?text=https://www.hello.com/\n\n\nhello world `)}>
				          	<Image style={{height:53*k,width:53*k,margin:5*k}} source={require('image!Whatsapp-icon')}/>
	      		  </TouchableOpacity>
	      		  <TouchableOpacity  onPress={this.fbShare.bind(this)}>
				          	<Image style={{height:53*k,width:53*k,margin:5*k,marginLeft:3*k}} source={require('image!vk')}/>
	      		  </TouchableOpacity>
      		 </View>
      		 <View ref={el=>this.copied=el} style={{position:'absolute',top:600*k,padding:17*k,width:320*k,backgroundColor:'rgba(0,132,180,0.9)',...center}}>
      		 	<Text style={{color:'white',fontWeight:'600'}}>Ссылка скопирована</Text>
      		 </View>
      		   
			</View>
     		)
	}
}
Object.assign(Payout.prototype, TimerMixin);


// <TouchableWithoutFeedback onPress={this.fbShare.bind(this)}>
// 			          <View style={{alignItems: 'center',justifyContent:'center',margin:5*k, width:160*k,padding:12*k,borderRadius:3*k,backgroundColor:'#34af23'}}>
// 			           <Text style={{color:'#ffffff',fontWeight:'800',}}>Через WhatsApp</Text>
// 			          </View>
//       		  </TouchableWithoutFeedback>
//       		  <TouchableWithoutFeedback onPress={this.fbShare.bind(this)}>
// 			          <View style={{alignItems: 'center',justifyContent:'center',margin:5*k, width:160*k,padding:12*k,borderRadius:3*k,backgroundColor:'#45668e'}}>
// 			           <Text style={{color:'#ffffff',fontWeight:'800',}}>Через VKonakte</Text>
// 			          </View>
//       		  </TouchableWithoutFeedback>
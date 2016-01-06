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
  LayoutAnimation,
  TouchableWithoutFeedback,
  NativeAppEventEmitter,
  Image
} = React;

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
		      alert('Share cancelled.');
		    } else {
		      alert('Thanks for sharing!');
		    }
		  } else {
		    alert('Error sharing.');
		  }
		});

	}
	render(){
		// console.log(this.state.loggedIn, '--------------loggedIn--------------')
		// if (!this.state.loggedIn) {
		// 	lock.show({}, (err, profile, token) => {
		// 		if (err) {
		// 		console.log(err);
		// 			return;
		// 		}
		// 		console.log(profile,'profile end','token start',token)
		// 		toggleAuth(token.idToken);
		// 		// TODO call
		// 		// Authentication worked!
		// 		console.log('Logged in with Auth0!');
		// 	})	
		// }
		return (
			<View style={{...center,paddingTop:30}}>

				<Text style={{color:'#0679a2',marginBottom:10}}>https://besmart.kz/media/events/images/218/109352.jpg.633x370_q100_crop-smart.jpg</Text>
				<TouchableOpacity onPress={this.onClick.bind(this)}><View style={{backgroundColor:'#0679a2',...center,width:110*k,height:35*k,borderRadius:3*k}}><Text style={{color:'white',fontWeight:'600'}}>Копировать</Text></View></TouchableOpacity>

				<TouchableWithoutFeedback onPress={this.fbShare.bind(this)}>
			          <View style={{alignItems: 'center',justifyContent:'center', width: 150, height: 50,backgroundColor:'#3b5998'}}>
			           <Text style={{color:'#ffffff',fontWeight:'800',}}>Share on Facebook</Text>
			          </View>
      		  </TouchableWithoutFeedback>
			</View>
     		)
	}
}
Object.assign(Payout.prototype, TimerMixin);



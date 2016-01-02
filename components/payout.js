import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import {openAnimation} from './animations'
import Combinator from './combinator'
import {toggleAuth} from '../intent/auth';
var Auth0Lock = require('react-native-lock-ios');
var lock = new Auth0Lock({clientId: 'TWpDN8HdEaplEXJYemOcNYSXi64oQmf8', domain: 'ideal.eu.auth0.com'});

let UIManager = require('NativeModules').UIManager;
let {
  Text,
  View,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
  TouchableWithoutFeedback,
  Image
} = React;
export default class Payout extends React.Component{
	state={count:0}
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
				<TouchableOpacity><View style={{backgroundColor:'#0679a2',...center,width:110*k,height:35*k,borderRadius:3*k}}><Text style={{color:'white',fontWeight:'600'}}>Копировать</Text></View></TouchableOpacity>

			</View>
     		)
	}
}
Object.assign(Payout.prototype, TimerMixin);



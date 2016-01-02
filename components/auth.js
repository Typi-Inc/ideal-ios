import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
let UIManager = require('NativeModules').UIManager;
import {toggleAuth} from '../intent/auth';
import {callQuery} from '../intent/callQuery';
var Auth0Lock = require('react-native-lock-ios');
var lock = new Auth0Lock({clientId: 'TWpDN8HdEaplEXJYemOcNYSXi64oQmf8', domain: 'ideal.eu.auth0.com'});

let {
	 View,
	 Text
} = React;
var store = require('react-native-simple-store');

export default class Auth extends React.Component{
	state={loggedIn:true}
	componentWillMount(){

			store.get('Auth0Token').then(res=>{
				console.log(res,'am i null? say yes!!')
				if(res) this.setState({loggedIn:true})
				else this.setState({loggedIn:false})
			})
		
	}
	render(){
		if(!this.state.loggedIn){
			lock.show({}, (err, profile, token) => {
			if (err) {
				console.log(err);
				return;
			}
				console.log(profile,'profile end','token start',token)
				callQuery(
					['users', 'createOrUpdate'],
					profile,
					['id']
				)
				store.save('Auth0Token',{idToken:token.idToken}).then(res=>toggleAuth(token.idToken))
				// Authentication worked!
				console.log('Logged in with Auth0!');
			});
		}

		return (
				<View style={{flex:1}}>
					{this.props.children}
				</View>
			)
	}


}

Object.assign(Auth.prototype, TimerMixin);


				   

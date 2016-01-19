import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
let UIManager = require('NativeModules').UIManager;
import {toggleAuth} from '../intent/auth';
import {callQuery} from '../intent/callQuery';
var Auth0Lock = require('react-native-lock-ios');
var lock = new Auth0Lock({clientId: 'TWpDN8HdEaplEXJYemOcNYSXi64oQmf8', domain: 'ideal.eu.auth0.com'});

let {
	 View,
	 Modal,
	 Text
} = React;
var store = require('react-native-simple-store');

export default class Auth extends React.Component{
	state={loggedIn:true}
	static contextTypes={
    	goHome: React.PropTypes.func
  	}
	componentWillMount(){
		// store.delete('Auth0Token').then(()=>
			store.get('Auth0Token').then(res=>{
				if(res) this.setState({loggedIn:true})
				else this.setState({loggedIn:false})
			})
		// )
	}
	render(){
		if(!this.state.loggedIn){
			lock.show({closable:true}, (err, profile, token) => {
				if(!token)this.context.goHome()

				if (err) {
					return;
				}
				store.save('Auth0Token',{idToken:token.idToken}).then(res=>{
					toggleAuth(token.idToken)
					callQuery(['users', 'create'],[profile],['id'])

				})
				this.setTimeout(()=>{
					this.setState({loggedIn:true})
				},100)
			});
		}
		if(this.state.loggedIn){
			return (
				<View style={{flex:1}}>
					{this.props.children}
				</View>
			)
		}
		return <View/>
		
	}
}

Object.assign(Auth.prototype, TimerMixin);


				   

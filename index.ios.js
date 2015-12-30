/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Auth0Lock = require('react-native-lock-ios');
var lock = new Auth0Lock({clientId: 'TWpDN8HdEaplEXJYemOcNYSXi64oQmf8', domain: 'ideal.eu.auth0.com'});
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;
import App from './components/app'
import intent from './intent'
import model from './model'

let state$ = model(intent());

let Dimensions = require('Dimensions');
let windowSize = Dimensions.get('window');
global.k=windowSize.width/320
global.h=windowSize.height/568
global.separator={height:1,backgroundColor:'e4e4e4'}
global.center={justifyContent:'center',alignItems:'center'}
var ideal = React.createClass({
  render: function() {
   lock.show({}, (err, profile, token) => {
		  if (err) {
		    console.log(err);
		    return;
		  }
		  console.log(profile,token)
		  // Authentication worked!
		  console.log('Logged in with Auth0!');
		});
    return (
      <App state$={state$}/>
    );
  }
});
AppRegistry.registerComponent('ideal', () => ideal);

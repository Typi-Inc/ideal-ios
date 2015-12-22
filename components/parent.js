import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
// import {oxpenAnimation} from './animations'
import TabApp from './tab-app'
import Tabs from './tabs'
import {openAnimation} from './animations'
let UIManager = require('NativeModules').UIManager;
let {
  AppRegistry,
  StyleSheet,
  LayoutAnimation,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback

} = React;
export default class Parent extends React.Component{
	state={}
	
	click(x,refS){
		
		UIManager.measure(React.findNodeHandle(this.refs[refS]),(x,y,w,h,px,py)=>{
			console.log(px,py,x,y)

			LayoutAnimation.configureNext(openAnimation)
			this.refs[refS].setNativeProps({style:{top:-py+60,left:-px+30,backgroundColor:'rgb(0,180,132)'}})
			this.setState({hello:'htere'})
			this.element=React.cloneElement(this.refs[refS],{style:{backgroundColor:'black',height:100,width:100,top:100}})

		})
	

		
	}

	render(){
		this.element=this.element || <Text> cloningn shit </Text>

		return (
			<View style={{flex:1,backgroundColor:'white'}}>
				<View style={{height:100}}>
					<ScrollView  horizontal={true} contentContainerStyle={{backgroundColor:'#0084b4',height:100}}>
						{this.props.children}
						<Text>hello</Text>
						<Text>  hi</Text>
					</ScrollView>
				</View>

				<View style={{flexDirection:'row',flexWrap:'wrap',}}>

					{[1,2,3,4,5,6,7,8].map((x)=>{
						let refS=''+x

						return <TouchableWithoutFeedback 
						onPress={this.click.bind(this,x,refS)} key={x}>
							<View ref={refS} style={{height:40,
								width:60,backgroundColor:'rgba(0,180,132,0.5)',
								margin:15,...center}}><Text>number is {x}</Text>
							</View>
						</TouchableWithoutFeedback>
					})}



				</View>


			
			</View>
			)
	}


}

Object.assign(Parent.prototype, TimerMixin);


				   

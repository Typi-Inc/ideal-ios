import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
let {
  LayoutAnimation,
  Text,
  View,
  Animated,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  PickerIOS,
  DeviceEventEmitter
} = React;
let PickerItemIOS=PickerIOS.Item
let UIManager = require('NativeModules').UIManager;

import { OrderedMap, Map, fromJS } from 'immutable'
let count = 1;

export default class FindTab extends React.Component{
	state = {
		map: Map({
			obj: OrderedMap({
							'0': 'value0',
							'1': 'value1'
						})
		}).toOrderedMap()
	}
	handlePress() {
		count++
		this.setState({
			map: this.state.map.mergeDeep(Map({
				obj: OrderedMap({
									[count]: 'value' + count
								})
			}))	
		})
	}
	render() {
		console.log(Map.isMap(this.state.map))
		return (
			<View>
				<TouchableOpacity onPress={this.handlePress.bind(this)}><Text>Add another</Text></TouchableOpacity>
				{
					this.state.map.get('obj').toArray().map(val => (
						<Text key={val}>{val}</Text>
					))
				}
			</View>
		)
	}
}
Object.assign(FindTab.prototype, TimerMixin);


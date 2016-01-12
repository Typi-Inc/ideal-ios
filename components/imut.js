import React from 'react-native'
import Rx from 'rx'
import _ from 'lodash'
import Combinator from './combinator'
import { Map, fromJS } from 'immutable'
const {
	View,
	Text,
	TouchableOpacity
} = React;
import TimerMixin from 'react-timer-mixin'

let count = 0
let like = false

let data$ = new Rx.ReplaySubject(1)
let state$ = data$.scan((acc, data) => acc.mergeDeep(acc, fromJS(data)), Map())

data$.onNext({
	count:count,
	like:like
})
data$.onNext({
	count:count+1,
	like:like
})

Rx.Observable.interval(2000).timeInterval().subscribe(() => {
	data$.onNext({
		count:count+1,
		like:like
	})
	data$.onNext({
		count:count+1,
		like:like
	})
	count++
})

export default class Imut extends React.Component {
	like() {
		data$.onNext({
			count: count+1,
			like: !like
		})
		like = !like
		count++
	}
	render() {
		return (
			<Combinator>
			{
				state$.map(data => (
					<View style={{marginTop:120,...center}}>
						<Text>Count {data.get('count')}</Text>
						{
							data.get('count')
							? 
							<Like like={this.like.bind(this)} data={data} /> 
							:
							<Text>No Like</Text>
							

						}
					</View>
				))
			}
			</Combinator>
		)
	}
}

class Like extends React.Component {
	// shouldComponentUpdate(nextProps,s) {
 //  		return !_.isEqual(nextProps.data,this.props.data)
	// }
	render() {
		return (
			<View>
				<Text>Liked {this.props.data.get('like') ? 'true' : 'false'}</Text>
				<TouchableOpacity onPress={this.props.like}><Text> like me </Text></TouchableOpacity>
			</View>
		)
	}
}

Object.assign(Imut.prototype, TimerMixin);



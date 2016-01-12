import React from 'react-native'
import Rx from 'rx'
import _ from 'lodash'
import Combinator from './combinator'
const {
	View,
	Text,
	TouchableOpacity
} = React;
import TimerMixin from 'react-timer-mixin'

let count = 0
let like = false

let state$ = new Rx.ReplaySubject(2)
state$.onNext({
	count:count,
	like:like
})
state$.onNext({
	count:count+1,
	like:like
})

Rx.Observable.interval(2000).timeInterval().subscribe(() => {
	state$.onNext({
		count:count+1,
		like:like
	})
	state$.onNext({
		count:count+1,
		like:like
	})
	count++
})

export default class Imut extends React.Component {
	like() {
		state$.onNext({
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
						<Text>Count {data.count}</Text>
						{
							data.count 
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
	shouldComponentUpdate(nextProps,s) {
		console.log(this.props)
		console.log('--------------------------------------------------------------------------------------------------')
		console.log(nextProps)
  		return !_.isEqual(nextProps.data,this.props.data)
	}
	componentWillUnmount() {
		console.log('unmounting')
	}
	render() {
		return (
			<View>
				<Text>Liked {this.props.data.like ? 'true' : 'false'}</Text>
				<TouchableOpacity onPress={this.props.like}><Text> like me </Text></TouchableOpacity>
			</View>
		)
	}
}

Object.assign(Imut.prototype, TimerMixin);



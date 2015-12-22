import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import _ from 'lodash';
import Combinator from './combinator'
import Deals from './deals'
import {state$,action$,data$} from '../model'
let UIManager = require('NativeModules').UIManager;
let {
  Text,
  View, 
} = React;


export default class WatchedDealsContainer extends React.Component{
	state={}
	
	componentWillMount(){
			action$.onNext({
				type: 'get',
				path: ['featuredDeals',{ from: 0, to : 10},'tags','sort:createdAt=desc', 'edges', {from: 0, to: 10}, 'text']
				// ['featuredDeals',{ from: 0, to : 10}, ['title','conditions']]
					
			})
	 }

	render(){
		// this.props.featuredDeals$.map(deals => console.log(deals) || deals)

		return (
		<Combinator>
			<View>
			{this.props.featuredDeals$.map(deals=>{
				// console.log('here hre',deals)
					return (
						<Deals data={_.values(deals).filter(x=>x && x.title)}/>
							)
			})}
			</View>
		</Combinator>
			)
	}


}

Object.assign(WatchedDealsContainer.prototype, TimerMixin);

// <Deals data={_.values(deals).filter(x=>x.title)}/>
				   

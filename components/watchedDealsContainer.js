import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import _ from 'lodash';
import Combinator from './combinator'
import {state$,action$,data$} from '../model'
let UIManager = require('NativeModules').UIManager;
let {
  Text,
  View, 
} = React;


export default class WatchedDealsContainer extends React.Component{
	state={}
	
	componentWillMount(){
		state$.take(1).subscribe(x => {
			// let ids = _.values(x.usersById['7d86e3c6-8e58-489c-92ba-9baf99145728'].watchedTags['sort:createdAt=desc'].edges).map(edge=>{
			// 	return edge.id
			// }).filter(x=>x)
			data$.onNext({
				featuredDeals: {
					isFetching: true
				}
			})
			// action$.onNext({
			// 	type: 'get',
			// 	path: ['tagsById', [...ids],'deals','sort:createdAt=desc', 'edges',{ from: 0, to : 10} , ['title']]
			// })
			action$.onNext({
				type: 'get',
				path: ['featuredDeals',{ from: 0, to : 10}, ['title'] ]
			})
		})

	}

	render(){

		return (
		<Combinator>



		</Combinator>
			)
	}


}

Object.assign(WatchedDealsContainer.prototype, TimerMixin);


				   

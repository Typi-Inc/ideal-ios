import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import _ from 'lodash';
import Combinator from './combinator'
import DealContent from './deal-content'
import {state$,action$,data$} from '../model'
let UIManager = require('NativeModules').UIManager;
let {
  Text,
  View, 
} = React;


export default class DealContentContainer extends React.Component{
	state={}
	
	componentWillMount(){
			action$.onNext({
				type: 'get',
				path: [['featuredDeals',{ from: 0, to : 10},'tags','sort:createdAt=desc', 'edges', {from: 0, to: 10}, 'text'],
				['featuredDeals',{ from: 0, to : 10}, ['title','conditions','id','image','discount']],
				['featuredDeals',{from:0,to:10},'business',['name','image']],
				['featuredDeals',{from:0,to:10},'likes','sort:createdAt=desc','count']

				]
					
			})
	 }

	render(){
		// this.props.featuredDeals$.map(deals => console.log(deals) || deals)

		return (
		<Combinator>
			<View style={{flex:1}}>
			{this.props.featuredDeals$.map(deals=>{
				// console.log('here hre',deals)
					return (
						<DealContent data={_.values(deals).filter(x=>x && x.title)}/>
							)
			})}
			</View>
		</Combinator>
			)
	}


}

Object.assign(DealContentContainer.prototype, TimerMixin);

// <Deals data={_.values(deals).filter(x=>x.title)}/>
				   

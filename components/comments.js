import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import {openAnimation,spring1,spring2,scrollToTopAnimation,closeImageAnimation} from './animations'
import Comment from './comment'
import Loading from './loading'
import _ from 'lodash'
import Spinner from 'react-native-spinkit'
import {getQuery} from '../intent/getQuery'
import Combinator from './combinator'
let {
  LayoutAnimation,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} = React;
export default class Comments extends React.Component{
	state={}
	static contextTypes={
    	state$: React.PropTypes.any
  	}
	componentWillMount() {
		getQuery([
			['dealsById',this.props.deal.get('id'),'comments','sort:createdAt=desc', 'edges', {from: 0, to: 10}, ['text','id']],
			['dealsById',this.props.deal.get('id'),'comments','sort:createdAt=desc', 'edges', {from: 0, to: 10}, 'author',['name','image']],
		])
	}
	render(){
		const comments = this.props.deal.getIn(['comments', 'sort:createdAt=desc', 'edges'])
		if(!this.state.loading){
			return (
				<View style={{marginBottom:20}}>
					<TouchableOpacity>
						<View style={{height:30*k,...center}}>
							<Text style={{color:'0084b4',fontSize:13*k,fontWeight:'700'}}>View more...</Text>
						</View>
						<View style={{height:1,backgroundColor:'e4e4e4',marginTop:5*k}}/>
					</TouchableOpacity>
					{
						comments ?
						comments.toArray().map(comment => (
							<Comment key={`${comment.get('id')}${this.props.deal.get('id')}`} comment={comment} />
						)) : (
							<View style={{...center,marginBottom:200*k}}>
	 	  						<Spinner
	 	  							style={{marginTop:15*k}}
	 	  							isVisible={this.state.renderPlaceholderOnly}
	 	  							size={30}
	 	  							type={'WanderingCubes'}
	 	  							color={'0679a2'}
	 	  						/>       
							</View>
						)
					}
				</View>
			)
		}
		return <Loading color={'#0679a2'} size={30} isVisible={this.state.loading}/>
	}
}
Object.assign(Comments.prototype, TimerMixin);

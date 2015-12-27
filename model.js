import Rx from 'rx';
import falcor from 'falcor';
import FalcorHttpDatasource from 'falcor-http-datasource';
import _ from 'lodash';
// import deepAssign from 'deep-assign';

let model = ({ tagSearchText$, getQuery$, chooseTag$, repeatPreviousState$ }) => {
	let data$ = new Rx.ReplaySubject(1);//data stream of state
	let state$ = data$.scan((accumulator , newData) => _.merge(accumulator, newData))

	let rootModel = new falcor.Model({
	  source: new FalcorHttpDatasource('http://localhost:9090/model.json'),
	  // onChange() {
	  // 	state$.onNext(model.getCache());
	  // }
	});

	tagSearchText$.subscribe(text => data$.onNext({'tagSearchText': text}))
	tagSearchText$.debounce(250).
		map(key=> {
			let currentText = key;
			let result$ = Rx.Observable.fromPromise(
				rootModel.get(
					['tagsByText',key,{ from: 0, to : 20}, ['text','id'] ]
				)
			)//.delay(1000)
			// Rx.Observable.just(1).
				// delay(200).
				// takeUntil(result$).subscribe(() => data$.onNext({tagsByText:{isLoadingTags:true}}))
			return result$
		}).switchLatest().
		filter(data => data && data.json).
		subscribe(data =>data$.onNext(data.json))


	getQuery$.subscribe(paths => rootModel.get(...paths).then(data => data && data.json && data$.onNext(data.json)))

	chooseTag$.
	  scan((acc, nextTag) => {
		return acc.concat([nextTag])
	}, []).
	  subscribe(tags => {
		data$.onNext({ chosenTags: tags, dealsByTags: 'isLoading' })
		let tagIdString=tags.map(tag => tag.id).join(',');
		rootModel.get(
			['dealsByTags',tagIdString,{from:0,to:10},'tags','sort:createdAt=desc', 'edges', {from: 0, to: 10}, 'text'],
			['dealsByTags',tagIdString,{from:0,to:10},['title','conditions','id','image','discount','payout']],
			['dealsByTags',tagIdString,{from:0,to:10},'business',['name','image']],
			['dealsByTags',tagIdString,{from:0,to:10},'likes','sort:createdAt=desc','count']
		).then(data => data && data.json && data$.onNext(data.json))
	})

	return state$
}

export default model;
//'------------------------------------ test of merge concept of lodash'
// const data = {
// 	featuredDeals: {
// 		0: {
// 			title: 'hello'
// 		}
// 	}
// }

// const newData = {
// 	featuredDeals: 'isLoading'
// }

// console.log(_.merge(data, newData));

//'------------------------------------ test of merge concept of lodash'


// // state$.subscribe(console.log)
// export let searchTags$ = state$.pluck('tagSearchText').distinctUntilChanged().
// 		debounce(250).
// 		map(key=> {
// 			// console.log(key)
// 			currentText = key;
// 			let result$ = Rx.Observable.fromPromise(
// 				model.get(
// 					['tagsByText',key,{ from: 0, to : 20}, ['text','id'] ]
// 				)
// 			)//.delay(1000)
// 			// Rx.Observable.just(1).
// 				// delay(200).
// 				// takeUntil(result$).subscribe(() => data$.onNext({tagsByText:{isLoadingTags:true}}))
// 			return result$
// 		}).switchLatest().filter(data => data && data.json);

// 		let searchTagsSubscription = searchTags$.subscribe(data => data$.onNext(data.json))

// action$.subscribe(action => {
//   switch(action.type) {
// 	  case 'get':
// 	  	model.get(...action.value.path).then(data => data$.onNext(data.json));
// 	  	break;
// 	 //  case 'set': 
// 	 //  	model.set(...action.path, action.value);
// 	 //  	break;
// 	 //  case 'call': 
// 	 //  	model.call(...action.path, action.value).then(data =>
// 		//   	data$.onNext(deepAssign(data.json,{featuredDeals: { isFetching: false }})
// 	 //  	));
// 		// break;
	 
// 	  case 'tagSearchText':
// 	  	data$.onNext({tagSearchText:action.value})
	  	
// 	  	break;
//   }
// })

// // state$.subscribe(x => console.log('--------------------',x, 'THIS IS STATE'));

// export let getFeaturedDeals = (range) => {
// 	action$.onNext({
// 		type: 'get',
// 		value: {
// 			path:[
// 				['featuredDeals',range,'tags','sort:createdAt=desc', 'edges', {from: 0, to: 6}, 'text'],
// 				['featuredDeals',range, ['title','conditions','id','image','discount']],
// 				['featuredDeals',range,'business',['name','image']],
// 				['featuredDeals',range,'likes','sort:createdAt=desc','count']
// 			]
// 		}
// 	})
// }

// export let onTagTextChange = (text) => {
// 	action$.onNext({
// 		type: 'tagSearchText',
// 		value: text
// 	})
// }

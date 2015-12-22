import Rx from 'rx';
import falcor from 'falcor';
import FalcorHttpDatasource from 'falcor-http-datasource';
import deepAssign from 'deep-assign';
export let action$ = new Rx.Subject();//action stream for reading and writing data
export let data$ = new Rx.ReplaySubject(1);//data stream of state

let model = new falcor.Model({
  source: new FalcorHttpDatasource('http://localhost:9090/model.json'),
  // maxSize: 0,
});
model.get(
	["usersById","7d86e3c6-8e58-489c-92ba-9baf99145728","name"],
	["usersById","7d86e3c6-8e58-489c-92ba-9baf99145728","watchedTags", "sort:createdAt=desc", 'edges', { from: 0, to: 100 }, ['text','id']]
).then(data => data$.onNext(data.json));
// model.get(
// 	['featuredDeals',{ from: 0, to : 10}, ['discount'] ]
// ).then(data => console.log(data) || data$.onNext(data.json));
action$.subscribe(action => {

  switch(action.type) {
	  case 'get': model.get(action.path).then(data =>console.log(data)||
		data$.onNext(data.json)
	  )
	  case 'set': model.set(action.path, action.value)
	  case 'call': model.call(action.path, action.value).then(data =>
		  	data$.onNext(deepAssign(data.json,{featuredDeals: { isFetching: false }})
	  	)
	  )    
  }
})
export let state$ = data$.scan((acumulator , newData) =>deepAssign(acumulator,newData))
// state$.subscribe(x => console.log('=============',x,'============'))
import falcor from 'falcor';
import FalcorHttpDatasource from 'falcor-http-datasource';

export let model = new falcor.Model({
  source: new FalcorHttpDatasource('http://localhost:9090/model.json'),
  // maxSize: 0,
});


// model.get(['dealsByTags','3824723874823748923748927489237492837498237498234u2,h34j23h4j2h349234782349234h23k4h2kj34h23k4h238',{from:0,to:10},'business',['name','image']]).then(console.log)
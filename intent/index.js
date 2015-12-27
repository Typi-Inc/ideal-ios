import {getQuery$} from './getQuery'
import {tagSearchText$} from './tagSearchText'
import {chooseTag$} from './chooseTag'

const intent = () => ({
	getQuery$,
	tagSearchText$,
	chooseTag$
})

export default intent;
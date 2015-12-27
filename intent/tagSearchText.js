import Rx from 'rx';

export let tagSearchText$ = new Rx.ReplaySubject(1)
tagSearchText$.onNext('');

export let onTagTextChange = text => tagSearchText$.onNext(text)
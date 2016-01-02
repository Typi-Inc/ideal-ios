import Rx from 'rx';

export const auth$ = new Rx.ReplaySubject(1);

export const toggleAuth = token => auth$.onNext(token);
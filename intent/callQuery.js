import Rx from 'rx';

export const callQuery$ = new Rx.ReplaySubject(1);

export const callQuery = (...args) => callQuery$.onNext(...args);
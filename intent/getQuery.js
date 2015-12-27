import Rx from 'rx';

export const getQuery$ = new Rx.ReplaySubject(1);

export const getQuery = paths => getQuery$.onNext(paths);
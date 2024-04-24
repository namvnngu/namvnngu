import { produce } from 'immer';

const base = { name: 'Name' };
console.log('base before', base);

const updatedBase = produce(base, function (draft) {
  draft = {};
});

console.log('base after', updatedBase);

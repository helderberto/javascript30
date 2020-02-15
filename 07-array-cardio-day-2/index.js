const people = [
  { name: 'Helder', year: 1992 },
  { name: 'Paula', year: 1986 },
  { name: 'Maria Laura', year: 2005 },
];

const comments = [
  {
    text: 'Love this!',
    id: 523423,
  },
  {
    text: 'Super good',
    id: 823423,
  },
];

// Some and every checks
const isAdult = people.some(person => {
  return new Date().getFullYear() - person.year >= 19 ? true : false;
});
console.log({ isAdult }); // => { isAdult: true }

const allAdults = people.every(person => {
  return new Date().getFullYear() - person.year >= 19 ? true : false;
});
console.log({ allAdults }); // { allAdults: false }

// Find comment by ID
const comment = comments.find(comment => comment.id === 823423);
console.log(comment); // => { text: 'Super good', id: 823423 }

// Find comment index
const commentIndex = comments.findIndex(comment => comment.id === 823423);
console.log({ commentIndex }); // => { commentIndex: 1 }

// Delete by index
// comments.splice(commentIndex, 1);
// console.log(comments);
const newComments = [
  ...comments.slice(0, commentIndex),
  ...comments.slice(commentIndex + 1),
];
console.log(newComments); // => [ { text: 'Love this!', id: 523423 } ]

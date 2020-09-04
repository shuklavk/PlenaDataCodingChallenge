import React, { useState } from 'react';
import './App.css';

export default () => {
  const [string, setString] = useState('');
  const [firstNonRepeating, setFirstNonRepeating] = useState('');
  const [sortedString, setSortedString] = useState('');

  /*
  Input: string 
  Output: Object with char as key and [number of occurances, concatenated chars] as value
  */
  const findOccurances = (string) => {
    const occuranceMap = {};
    for (let i = 0; i < string.length; i++) {
      const currLetter = string[i].toLowerCase();
      if (occuranceMap[currLetter] === undefined) {
        occuranceMap[currLetter] = [1, string[i]];
      } else {
        occuranceMap[currLetter][0]++;
        occuranceMap[currLetter][1] += string[i];
      }
    }
    return occuranceMap;
  };

  /* 
  Input: string
  Output: first non repeating character
  Iterates string, and returns first mapping value that equals 1
  If every character is repeated, returns 'No Char is Non Repeating'
  */
  const firstNonRepeatingChar = (string) => {
    const occuranceMap = findOccurances(string);
    for (let i = 0; i < string.length; i++) {
      const currLetter = string[i].toLowerCase();
      if (occuranceMap[currLetter][0] === 1) {
        return string[i];
      }
    }
    return 'No Char is Non Repeating';
  };

  /*
  Input: string
  Output: sorted string based on its occurance
  creates a bucket array where index of array is the occurances
  loops through array and concats each bucket into one string
  */
  const sortStringByOccurance = (string) => {
    const occuranceMap = findOccurances(string);
    const occuranceBucket = [];
    for (const char in occuranceMap) {
      const currChar = char.toLowerCase();
      const occurance = occuranceMap[currChar][0];
      const currString = occuranceMap[currChar][1];
      if (occuranceBucket[occurance] === undefined) {
        occuranceBucket[occurance] = [currString];
      } else {
        occuranceBucket[occurance].push(currString);
      }
    }
    let sortedString = '';

    for (let i = 0; i < string.length; i++) {
      if (occuranceBucket[i] !== undefined) {
        sortedString += occuranceBucket[i].join('');
      }
    }
    return sortedString;
  };

  const submitFunction = () => {
    const firstNonRepeatingCharacter = firstNonRepeatingChar(string);
    const sortedStringOccur = sortStringByOccurance(string);
    setSortedString(sortedStringOccur);
    setFirstNonRepeating(firstNonRepeatingCharacter);
  };

  return (
    <div>
      <label>
        Enter a string:
        <input
          type="text"
          name="name"
          onChange={(e) => {
            setString(e.target.value);
          }}
        />
      </label>
      <input
        type="button"
        value="Submit"
        onClick={() => {
          submitFunction();
        }}
      />
      <div>
        <h1>First non-repeating character: {firstNonRepeating}</h1>
        <h1>Sorted String by occurance: {sortedString}</h1>
      </div>
    </div>
  );
};

import stripFilename from './stripFilename';

// name:    compareStrings
// params:  string: string
// returns a function that accepts another string to compare
export default function(string) {
  return (stringToCompare) => string == stripFilename(stringToCompare);
}

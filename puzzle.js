const puzzle = {
  known: {
    e: 4,
    gee: 16,
    dad: 24,
    baba: 18,
    chad: 23,
  },
  unknown: "figged",
};

const keyValuePair = {};

wordValue = (word, alphabet) => {
  let wordValue = 0;
  for (let letter of word) {
    wordValue += 1 + alphabet.indexOf(letter);
  }
  return wordValue;
};

let isCorrect = false;
const unknown = "abcdefghi".replace(
  new RegExp(`[${Object.keys(keyValuePair).join("")}]`, "g")
);
function* permutations(string, length) {
  if (length === 1) {
    yield* string;
  } else {
    for (let i = 0; i < length; i++) {
      const firstPart = string.slice(0, i);
      const secondPart = string.slice(i + 1);
      for (let perm of permutations(firstPart + secondPart, length - 1)) {
        yield string[i] + perm;
      }
    }
  }
}

isPairInString = (string, pair) => {
  return string.includes(pair);
};

for (let perm of permutations(unknown, unknown.length)) {
  let isValid = true;
  for (let i = 0; i < perm.length - 1; i++) {
    if (
      isPairInString("abcdefghi", perm[i] + perm[i + 1]) ||
      isPairInString("ihgfedcba", perm[i] + perm[i + 1])
    ) {
      isValid = false;
      break;
    }
  }
  if (isValid === true) {
    isCorrect = true;
    const tempValues = [...perm];
    for (let [key, value] of Object.entries(keyValuePair)) {
      tempValues.splice(value - 1, 0, key);
    }
    let allCorrect = true;
    for (let [key, value] of Object.entries(puzzle.known)) {
      if (value != wordValue(key, tempValues.join(""))) {
        allCorrect = false;
        break;
      }
    }
    if (allCorrect) {
      const result = {};
      tempValues.forEach((key, index) => {
        result[key] = index + 1;
      });
      console.log(
        puzzle.unknown,
        wordValue(puzzle.unknown, tempValues.join(""))
      );
    }
  }
}

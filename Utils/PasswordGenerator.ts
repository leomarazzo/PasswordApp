const numeric = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const special = ["!", "$", "%", "@", "#"];
const alphaLower = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
const alphaUpper = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

export const generatePassword = (
  length: number,
  upper: boolean,
  lower: boolean,
  digits: boolean,
  symbols: boolean
): string => {
  try {
    let password = "";

    const characterTypes: string[][] = new Array<string[]>();
    if (lower) {
      characterTypes.push(alphaLower);
    }
    if (upper) {
      characterTypes.push(alphaUpper);
    }
    if (digits) {
      characterTypes.push(numeric);
    }
    if (symbols) {
      characterTypes.push(special);
    }

    if (characterTypes.length < 1) {
      return password;
    } else {
      let isValid = false;

      while (!isValid) {
        for (let i = 0; i < length; i++) {
          const randomCharacter = getRandomCharacter(characterTypes);
          password += randomCharacter;
        }
        isValid = true;
        if (
          (lower && !validateLower(password)) ||
          (upper && !validateUpper(password)) ||
          (symbols && !validateSimbols(password)) ||
          (digits && !validateNumbers(password))
        ) {
          isValid = false;
          password = "";
        }
      }

      return password;
    }
  } catch (err) {
    
  }
  return "";
};

const getRandomCharacter = (characterTypes: string[][]) => {
  const randomType = getRandomCharacterType(characterTypes);
  let randNum = Math.round(Math.random() * (randomType.length - 1));

  return randomType[randNum];
};

const getRandomCharacterType = (characterTypes: string[][]) => {
  const randNum = Math.round(Math.random() * (characterTypes.length - 1));
  return characterTypes[randNum];
};

const validateLower = (value: string): boolean => {
  if (
    value &&
    /(?=.*[a-z]).*$/i.test(
      value
    )
  ) {
    return true;
  } else {
    return false;
  }
};
const validateUpper = (value: string): boolean => {
  if (value && /(?=.*[A-Z]).*$/i.test(value)) {
    return true;
  } else {
    return false;
  }
};
const validateSimbols = (value: string): boolean => {
  if (value && /(?=.*[!@#$%^&*]+).*$/i.test(value)) {
    return true;
  } else {
    return false;
  }
};
const validateNumbers = (value: string): boolean => {
  if (value && /(?=.*\d).*$/i.test(value)) {
    return true;
  } else {
    return false;
  }
};

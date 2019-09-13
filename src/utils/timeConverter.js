const conversionTable = {
  day: 86400000,
  hour: 3600000,
  min: 60000,
  sec: 1000
};

const isAlphabetical = unit => {
  return /^[a-zA-Z]+$/.test(unit);
};
const convert = (unit, number) => {
  return conversionTable[unit] * number;
};
const validate = (_unit, number) => {
  const isAlpha = isAlphabetical(_unit);
  const isUnit =
    Object.entries(conversionTable)
      .map(entry => {
        return entry[0];
      })
      .filter(unit => {
        return _unit === unit;
      }).length >= 1
      ? true
      : false;

  if (!isAlpha) {
    console.error('UnitError: The unit choosen is not alphabetical');
    return null;
  } else if (!isUnit) {
    console.error(
      `UnitError: The unit is not valid. Valid units are: ${Object.entries(
        conversionTable
      ).map(entry => entry[0])}`
    );
    return null;
  } else {
    return convert(_unit, number);
  }
};

const toMilliSecond = (unit, number) => {
  const res = validate(unit, number);
  if (!res) {
    console.error('An error occured.');
    return null;
  }
  return res;
};

export default toMilliSecond;

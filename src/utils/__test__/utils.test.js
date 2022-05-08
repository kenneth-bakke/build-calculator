import {
  calculateRunesNeededForOneLevel,
  calculateRunesNeeded,
  convertIntegerToHumanReadable,
  queryGraphQL,
  getHelms,
} from '../utils.js';

const fetch = require('jest-fetch-mock').enableMocks();

describe('Rune calculation for one level', () => {
  it('Properly calculates runes needed for one level-up', () => {
    const costs = [];

    for (let i = 1; i <= 10; i++) {
      costs.push(calculateRunesNeededForOneLevel(i));
    }

    expect(costs).toEqual([673, 689, 706, 723, 740, 757, 775, 793, 811, 829]);
  });

  it('Properly calculates runes needed for one level-up at a high base level', () => {
    expect(calculateRunesNeededForOneLevel(712)).toBe(8879348);
  });

  it('Properly calculates runes needed for multiple level ups', () => {
    let cost = 0;

    for (let i = 1; i < 3; i++) {
      cost += calculateRunesNeededForOneLevel(i);
    }

    expect(cost).toBe(1362);
  });

  it('Throws error with invalid input', () => {
    expect(() => calculateRunesNeededForOneLevel('one')).toThrow(Error);
    expect(() => calculateRunesNeededForOneLevel(0)).toThrow(Error);
    expect(() => calculateRunesNeededForOneLevel(2)).not.toThrow(Error);
  });
});

describe('Rune calculation for multiple levels', () => {
  it('Properly calculates runes needed for one level-up', () => {
    expect(calculateRunesNeeded(5, 6)).toEqual([740, 0]);
    expect(calculateRunesNeeded(11, 12)).toEqual([847, 0]);
    expect(calculateRunesNeeded(20, 21)).toEqual([2857, 0]);
    expect(calculateRunesNeeded(500, 501)).toEqual([3335103, 0]);
  });

  it('Properly calculates runes needed for multiple level ups', () => {
    expect(calculateRunesNeeded(5, 10)).toEqual([3876, 0]);
    expect(calculateRunesNeeded(5, 20)).toEqual([19881, 0]);
  });

  it('Properly calculates runes needed for multiple level ups while at high level already', () => {
    expect(calculateRunesNeeded(500, 510)).toEqual([34180941, 0]);
  });

  it('Properly calculates runes needed for massive level up', () => {
    expect(calculateRunesNeeded(1, 100)).toEqual([1997878, 0]);
    expect(calculateRunesNeeded(1, 713)).toEqual([1692566825, 0]);
  });

  it('Properly calculates runes needed when runes held > 0 and less than required amount', () => {
    expect(calculateRunesNeeded(5, 6, 700)).toEqual([40, 0]);
    expect(calculateRunesNeeded(11, 12, 800)).toEqual([47, 0]);
    expect(calculateRunesNeeded(20, 21, 2000)).toEqual([857, 0]);
    expect(calculateRunesNeeded(1, 2, 73)).toEqual([600, 0]);
    expect(calculateRunesNeeded(500, 501, 3330000)).toEqual([5103, 0]);
  });

  it('Properly calculates runes needed when runes held > 0 and greater than the required amount', () => {
    expect(calculateRunesNeeded(5, 6, 800)).toEqual([0, 60]);
    expect(calculateRunesNeeded(11, 12, 900)).toEqual([0, 53]);
    expect(calculateRunesNeeded(20, 21, 3000)).toEqual([0, 143]);
    expect(calculateRunesNeeded(500, 501, 3340000)).toEqual([0, 4897]);
  });

  it('Throws error when trying to level down', () => {
    expect(() => calculateRunesNeeded(5, 4)).toThrow(Error);
    expect(() => calculateRunesNeeded('one', 'two')).toThrow(Error);
  });
});

describe('Human readable number', () => {
  it('Returns a stringified number', () => {
    const stringifiedNumber = convertIntegerToHumanReadable(10);
    expect(stringifiedNumber).toBe('10');
    expect(typeof stringifiedNumber).toBe('string');
  });

  it('Converts a number to human readable format', () => {
    expect(convertIntegerToHumanReadable(1000)).toBe('1,000');
  });

  it('Converts a large number to human readable format', () => {
    expect(convertIntegerToHumanReadable(1000000000)).toBe('1,000,000,000');
  });

  it("Converts a number with 10's of x places", () => {
    expect(convertIntegerToHumanReadable(76543)).toBe('76,543');
    expect(convertIntegerToHumanReadable(90123456)).toBe('90,123,456');
    expect(convertIntegerToHumanReadable(10123456789)).toBe('10,123,456,789');
  });
});

describe('GraphQL Query - Categories', () => {
  const query = `
    query {
      helms {
        name
      }
    }`;

  it('Pings the Elden Ring API', async () => {
    const response = await queryGraphQL(query);

    expect(response).not.toBe('undefined');
    expect(response.status).toBe(200);
  });

  it('Returns proper data based on query', async () => {
    const response = await getHelms(10, 0);
    console.log(response);
  });
});

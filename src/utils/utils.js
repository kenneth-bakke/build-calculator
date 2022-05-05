export function capitalize(word) {
  if (typeof word !== 'string') {
    word = '' + word + '';
  }
  const lower = word.toLowerCase();
  return word.charAt(0).toUpperCase() + lower.slice(1);
}

export function calculateRunesNeededForOneLevel(level) {
  if (level < 1 || typeof level !== 'number') {
    throw new Error('input level must be type number and greater than 1');
  }

  let x = (level + 81 - 92) * 0.02;
  if (x < 0) x = 0;

  return Math.floor((x + 0.1) * (level + 81) ** 2 + 1);
}

export function calculateRunesNeeded(level, desiredLevel, runesHeld = 0) {
  if (desiredLevel < level) {
    throw new Error('input desiredLevel cannot be less than current level');
  }

  if (level < 1) {
    throw new Error('Starting level can be no less than 1');
  }

  if (desiredLevel > 713 || level === 713) {
    throw new Error('Max level is 713');
  }

  let totalCost = 0;

  for (let i = level; i < desiredLevel; i++) {
    totalCost += calculateRunesNeededForOneLevel(i);
  }

  if (totalCost > runesHeld) {
    return [totalCost - runesHeld, 0];
  } else if (totalCost < runesHeld) {
    return [0, runesHeld - totalCost];
  } else {
    return [0, runesHeld];
  }
}

export function handleFocus(e) {
  e.target.select();
}

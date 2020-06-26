const Ship = (length) => {
  // an array with length 'length' filled with '0'
  let hitStatus = Array.from(Array(length), () => 0);
  let sunkStatus = false;

  const getLength = () => length;
  const getStatus = () => hitStatus;
  // 'hit' a part of the ship, then check if all parts are hit
  const hit = (num) => {
    // cannot hit the same spot
    if (hitStatus[num] === 1) {
      return 'already damaged';
    }

    hitStatus[num] = 1;

    // check if ship is completely hit
    if (hitStatus.every(Boolean)) {
      sunkStatus = true;
    }
  };

  const isSunk = () => {
    return sunkStatus ? true : false;
  };

  return { getLength, getStatus, hit, isSunk };
};

export default Ship;

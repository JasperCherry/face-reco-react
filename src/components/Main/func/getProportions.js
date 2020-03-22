export const getProportions = (data) => {
  const proportions = [];

  for (let firstPoint = 0; firstPoint < data.length - 2; firstPoint += 1) {
    for (let secondPoint = firstPoint + 1; secondPoint < data.length - 1; secondPoint += 1) {
      for (let thirdPoint = secondPoint + 1; thirdPoint < data.length; thirdPoint += 1) {
        const dist1 = Math.sqrt(
          Math.pow((data[firstPoint][0] - data[secondPoint][0]), 2) + Math.pow((data[firstPoint][1] - data[secondPoint][1]), 2)
        );

        const dist2 = Math.sqrt(
          Math.pow((data[firstPoint][0] - data[thirdPoint][0]), 2) + Math.pow((data[firstPoint][1] - data[thirdPoint][1]), 2)
        );

        if (dist1 > dist2) {
          proportions.push(dist2 / dist1);
        } else {
          proportions.push(dist1 / dist2);
        }
      }
    }
  }

  return proportions;
};

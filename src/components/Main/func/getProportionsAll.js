export const getProportionsAll = (data) => {
  const proportions = [];

  for (let firstPoint = 0; firstPoint < data.length; firstPoint += 1) {
    for (let secondPoint = 0; secondPoint < data.length; secondPoint += 1) {
      for (let thirdPoint = 0; thirdPoint < data.length; thirdPoint += 1) {
        for (let fourthPoint = 0; fourthPoint < data.length; fourthPoint += 1) {
          const dist1 = Math.sqrt(
            Math.pow((data[firstPoint][0] - data[secondPoint][0]), 2) + Math.pow((data[firstPoint][1] - data[secondPoint][1]), 2)
          );

          const dist2 = Math.sqrt(
            Math.pow((data[thirdPoint][0] - data[fourthPoint][0]), 2) + Math.pow((data[thirdPoint][1] - data[fourthPoint][1]), 2)
          );

          if (dist1 >= dist2 && dist1 !== 0) {
            proportions.push(dist2 / dist1);
          } else if (dist2 < dist1 && dist2 !== 0) {
            proportions.push(dist1 / dist2);
          }
        }
      }
    }
  }

  return proportions;
};

export class OcrKNN {
  constructor(k, trainingSet) {
    this.__k = k;
    this.train(trainingSet);
  }

  test(data) {
    data = this.__sort(data);
    data = this.__flatten(data);
    const distances = [];

    this.__trainingSet.forEach((l) => {
      let sum = 0;
      for (let i = 0; i < data.length; i += 1) {
        sum += (data[i] - l.data[i]) * (data[i] - l.data[i]);
      }

      distances.push({
        clss: l.clss,
        dist: Math.sqrt(sum)
      });
    });

    return distances
      .sort((a, b) => a.dist - b.dist)
      .map((d) => d.clss)
      .slice(0, this.__k)
      .reduce((map, lett) => {
        let added = false;
        for (let i = 0; i < map.length; i += 1) {
          if (map[i][0] === lett) {
            map[i][1] += 1;
            added = true;
          }
        }
        if (!added) {
          map.push([lett, 1]);
        }
        return map;
      }, [])
      .sort((a, b) => b[1] - a[1])
      .shift()
      .shift();
  }

  train(trainingSet) {
    this.__trainingSet = [];

    Object.keys(trainingSet).forEach((clss) => {
      trainingSet[clss].forEach((l) => {
        this.__trainingSet.push({
          clss,
          data: this.__flatten(this.__sort(l))
        });
      });
    });
  }

  __sort(data) {
    return data.slice().sort((a, b) => {
      const xDiff = a.x - b.x;
      if (xDiff !== 0) {
        return xDiff;
      }
      return a.y - b.y;
    });
  }

  __flatten(data) {
    return data.reduce((arr, point) => {
      arr.push(point.x, point.y);
      return arr;
    }, []);
  }
}

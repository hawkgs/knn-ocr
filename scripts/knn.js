export class OcrKNN {
  constructor(k, trainingSet) {
    this.__k = k;
    this.train(trainingSet);
  }

  test(data) {
    data = this.__sort(data);
    data = this.__flatten(data);

    console.log(data);

    return {
      clss: 'a',
      confidence: 0.5
    };
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

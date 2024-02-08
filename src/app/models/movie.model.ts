export interface Movies {
  results: Movie[];
}

export interface Genres {
  results: string[];
}

export interface Movie {
  _id: string;
  primaryImage: {
    id: string;
    width: number;
    height: number;
    url: string;
    // caption: {
    //   plainText?: string;
    // };
  };
  titleType: {
    text: string;
    // id: string;
    // isSeries: boolean
  };
  titleText: {
    text: string;
  };
  originalTitleText: {
    text: string;
  };
  releaseYear: {
    year: number | null;
    endYear: number | null;
  };
  releaseDate: number | null;
}

import Article from './article';

type Trend = {
    keyword: string;
    delta: number;
    topArticles: Article[]
};

export default Trend;

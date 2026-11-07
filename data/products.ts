export type Product = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  price: number;
};

const rawProducts: Array<{ id: number; title: string; price: number; picId: number }> = [
  { id: 1, title: 'accusamus beatae ad facilis cum similique qui sunt', price: 71.64, picId: 10 },
  { id: 2, title: 'reprehenderit est deserunt velit ipsam', price: 4.56, picId: 11 },
  { id: 3, title: 'officia porro iure quia iusto qui ipsa ut modi', price: 1.79, picId: 12 },
  { id: 4, title: 'culpa odio esse rerum omnis laboriosam voluptate repudiandae', price: 68.86, picId: 13 },
  { id: 5, title: 'natus nisi omnis corporis facere molestiae rerum in', price: 12.36, picId: 14 },
  { id: 6, title: 'accusamus ea aliquid et amet sequi nemo', price: 6.22, picId: 15 },
  { id: 7, title: 'officia delectus consequatur vero aut', price: 15.68, picId: 16 },
  { id: 8, title: 'aut porro officiis laborum odit ea laudantium corporis', price: 96.67, picId: 17 },
  { id: 9, title: 'qui eius qui autem sed', price: 36.87, picId: 18 },
  { id: 10, title: 'beatae et provident et ut vel', price: 55.06, picId: 19 },
  { id: 11, title: 'nihil at amet non hic quia qui', price: 9.30, picId: 20 },
  { id: 12, title: 'mollitia soluta ut rerum eos aliquam consequatur perspiciatis maiores', price: 2.25, picId: 22 },
  { id: 13, title: 'harum dicta similique quis dolore earum ex qui', price: 20.51, picId: 24 },
  { id: 14, title: 'asperiores nobis voluptate qui', price: 57.74, picId: 25 },
  { id: 15, title: 'voluptate voluptates sequi', price: 79.45, picId: 26 },
  { id: 16, title: 'quasi quae est modi quis quam in impedit', price: 58.01, picId: 27 },
  { id: 17, title: 'rem pariatur facere eaque', price: 56.95, picId: 28 },
  { id: 18, title: 'quia minus sed eveniet accusantium incidunt beatae odio', price: 14.91, picId: 29 },
  { id: 19, title: 'et corrupti nihil cumque', price: 67.95, picId: 30 },
  { id: 20, title: 'sed commodi libero id nesciunt modi vitae', price: 64.54, picId: 31 },
];

export const fetchProducts = async (): Promise<Product[]> => {
  return rawProducts.map((item) => ({
    albumId: 1,
    id: item.id,
    title: item.title,
    url: `https://picsum.photos/id/${item.picId}/600/600`,
    thumbnailUrl: `https://picsum.photos/id/${item.picId}/300/300`,
    price: item.price,
  }));
};


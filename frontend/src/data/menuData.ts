export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isPopular?: boolean;
  isNew?: boolean;
  calories?: number;
  allergyInfo?: string[];
  options?: {
    name: string;
    price: number;
    description?: string;
  }[];
}

export const categories = [
  '커피',
  '차',
  '디저트',
  '스낵'
];

export const menuData: MenuItem[] = [
  {
    id: '1',
    name: '아메리카노',
    description: '깊은 풍미의 에스프레소와 뜨거운 물을 섞어 만든 클래식한 커피',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&h=400&q=80',
    category: '커피',
    isPopular: true,
    calories: 5,
    options: [
      { name: '샷 추가', price: 500 },
      { name: '아이스', price: 0 },
      { name: '대용량', price: 1000 }
    ]
  },
  {
    id: '2',
    name: '카페라떼',
    description: '에스프레소와 스팀밀크가 조화롭게 어우러진 부드러운 커피',
    price: 5000,
    image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=600&h=400&q=80',
    category: '커피',
    calories: 180,
    options: [
      { name: '샷 추가', price: 500 },
      { name: '아이스', price: 0 },
      { name: '대용량', price: 1000 }
    ]
  },
  {
    id: '3',
    name: '바닐라 라떼',
    description: '바닐라 시럽이 들어간 달콤한 라떼',
    price: 5500,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&h=400&q=80',
    category: '커피',
    isNew: true,
    calories: 250,
    options: [
      { name: '샷 추가', price: 500 },
      { name: '아이스', price: 0 },
      { name: '대용량', price: 1000 }
    ]
  },
  {
    id: '4',
    name: '초콜릿 프라페',
    description: '진한 초콜릿과 우유, 휘핑크림이 어우러진 달콤한 프라페',
    price: 6000,
    image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=600&h=400&q=80',
    category: '스낵',
    isPopular: true,
    calories: 400,
    options: [
      { name: '휘핑크림 추가', price: 500 },
      { name: '대용량', price: 1000 }
    ]
  },
  {
    id: '5',
    name: '얼그레이 티',
    description: '베르가못 향이 특징인 깔끔한 홍차',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?auto=format&fit=crop&w=600&h=400&q=80',
    category: '차',
    calories: 0,
    options: [
      { name: '아이스', price: 0 },
      { name: '대용량', price: 1000 }
    ]
  },
  {
    id: '6',
    name: '치즈케이크',
    description: '부드럽고 진한 치즈의 맛이 일품인 클래식 치즈케이크',
    price: 6500,
    image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?auto=format&fit=crop&w=600&h=400&q=80',
    category: '디저트',
    isPopular: true,
    calories: 350,
    allergyInfo: ['우유', '계란', '밀']
  },
  {
    id: '7',
    name: '크로플',
    description: '바삭하고 달콤한 와플과 크로와상의 만남',
    price: 4800,
    image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=600&h=400&q=80',
    category: '디저트',
    isNew: true,
    calories: 280,
    allergyInfo: ['우유', '계란', '밀'],
    options: [
      { name: '시럽 추가', price: 300 },
      { name: '아이스크림 추가', price: 1500 }
    ]
  },
  {
    id: '8',
    name: '잉글리시 브렉퍼스트',
    description: '진한 맛과 향의 블렌디드 홍차',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=600&h=400&q=80',
    category: '차',
    calories: 0,
    options: [
      { name: '아이스', price: 0 },
      { name: '대용량', price: 1000 }
    ]
  }
]; 
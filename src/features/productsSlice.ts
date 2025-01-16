import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
}

interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Корм Royal Canin',
    price: 1200,
    description: 'Премиальный сухой корм для кошек',
    category: 'Корм'
  },
  {
    id: '2',
    name: 'Игрушка-мышка',
    price: 299,
    description: 'Интерактивная игрушка для кошек',
    category: 'Игрушки'
  },
  {
    id: '3',
    name: 'Домик-когтеточка',
    price: 3500,
    description: 'Уютный домик с когтеточкой',
    category: 'Мебель'
  },
  {
    id: '4',
    name: 'Лоток с бортиком',
    price: 800,
    description: 'Удобный лоток для кошек',
    category: 'Гигиена'
  },
  {
    id: '5',
    name: 'Шампунь для кошек',
    price: 450,
    description: 'Мягкий шампунь для чувствительной кожи',
    category: 'Гигиена'
  },
  {
    id: '6',
    name: 'Лежанка "Облачко"',
    price: 1500,
    description: 'Мягкая лежанка с бортиками',
    category: 'Мебель'
  },
  {
    id: '7',
    name: 'Влажный корм Whiskas',
    price: 45,
    description: 'Влажный корм с курицей',
    category: 'Корм'
  },
  {
    id: '8',
    name: 'Расческа-фурминатор',
    price: 890,
    description: 'Профессиональная расческа для кошек',
    category: 'Гигиена'
  },
  {
    id: '9',
    name: 'Игровой комплекс',
    price: 5900,
    description: 'Большой игровой комплекс с несколькими уровнями',
    category: 'Мебель'
  },
  {
    id: '10',
    name: 'Лазерная указка',
    price: 350,
    description: 'Игрушка для активных игр',
    category: 'Игрушки'
  },
  {
    id: '11',
    name: 'Переноска',
    price: 2100,
    description: 'Удобная переноска для путешествий',
    category: 'Аксессуары'
  },
  {
    id: '12',
    name: 'Миска на подставке',
    price: 650,
    description: 'Миска с приподнятой подставкой',
    category: 'Аксессуары'
  }
];

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockProducts;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Произошла ошибка';
      });
  },
});

export default productsSlice.reducer;
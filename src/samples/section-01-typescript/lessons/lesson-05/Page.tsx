import DataList from '@/samples/section-01-typescript/lessons/lesson-05/components/DataList.tsx';
import { wrapWithMetadata } from '@/samples/section-01-typescript/lessons/lesson-05/utils/wrap-with-metadata.ts';

interface User {
  id: number;
  name: string;
  role: string;
}

interface Product {
  id: string;
  title: string;
  price: number;
}

const users: User[] = [
  { id: 1, name: 'Alice', role: 'Architect' },
  { id: 2, name: 'Bob', role: 'Senior Engineer' },
];

const products: Product[] = [
  { id: 'p1', title: 'Enterprise Keyboard', price: 185000 },
  { id: 'p2', title: 'Precision Mouse', price: 92000 },
];

export default function Lesson05Page() {
  const metaExample = wrapWithMetadata<User>(users[0]);

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <DataList<User>
        items={users}
        renderRow={(user) => (
          <div>
            <strong>{user.name}</strong> - {user.role}
          </div>
        )}
      />
      <DataList<Product>
        items={products}
        renderRow={(product) => (
          <div>
            {product.title} - {product.price.toLocaleString()} KRW
          </div>
        )}
      />
      <footer style={{ marginTop: '24px', color: '#999' }}>Meta ID: {metaExample.id}</footer>
    </div>
  );
}

// 서버에서 내려주는 전체 상품 데이터 구조
interface Product {
  id: string;
  name: string;
  price: number;
  adminNote: string;
  secretToken: string;
}

/**
 * Omit 유틸리티 타입 활용:
 * Product 인터페이스에서 'adminNote'와 'secretToken' 키만 제거한 새로운 타입을 생성합니다.
 */
type UserViewProduct = Omit<Product, 'adminNote' | 'secretToken'>;

export default function ProductDetail({ product }: { product: UserViewProduct }) {
  return (
    <div
      style={{ padding: '20px', border: '1px solid #eee', borderRadius: '12px', marginTop: '20px' }}
    >
      <h3>📦 상품 정보</h3>
      <p>
        상품명: <strong>{product.name}</strong>
      </p>
      <p>판매가: {product.price.toLocaleString()}원</p>
    </div>
  );
}

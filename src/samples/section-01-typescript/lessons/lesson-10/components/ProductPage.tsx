import { useEffect, useState } from 'react';

interface ProductDetail {
  id: number;
  title: string;
  price: number;
}

/**
 * 'data is ProductDetail'을 반환 타입으로 지정하여,
 * 이 함수를 통과한 데이터만이 setProduct에 담길 수 있도록 강제합니다.
 */
function validateProduct(data: unknown): data is ProductDetail {
  if (typeof data !== 'object' || data === null) return false;
  const obj = data as Record<string, unknown>;
  return (
    typeof obj.id === 'number' && typeof obj.title === 'string' && typeof obj.price === 'number'
  );
}

export default function ProductPage({ productId }: { productId: number }) {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const mockFetch = () => {
      // 서버가 약속을 어긴 상황 시뮬레이션 (price가 문자열)
      const data = {
        id: productId,
        title: '방어막이 작동하는 키보드',
        price: '89,000원', // number여야 하므로 검증에서 탈락함
      };

      if (validateProduct(data)) {
        setProduct(data);
        setError(null);
      } else {
        setError('데이터 규격 불일치: 가격 정보가 숫자가 아닙니다.');
      }
    };

    void mockFetch();
  }, [productId]);

  if (error) {
    return <div style={{ color: 'red', border: '1px solid red', padding: '10px' }}>{error}</div>;
  }

  if (!product) return <div>상품 정보를 검사 중...</div>;

  return (
    <div>
      <h1>{product.title}</h1>
      <p>가격: {product.price.toLocaleString()}원</p>
    </div>
  );
}

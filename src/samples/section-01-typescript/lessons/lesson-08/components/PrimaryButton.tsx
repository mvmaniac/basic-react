import type { ComponentPropsWithoutRef } from 'react';

// 1. React.ComponentPropsWithoutRef<'button'>을 통해 'onClick', 'type' 등 모든 버튼 속성 상속
// 2. 추가적으로 우리 서비스만의 variant와 isLoading 속성 정의
interface PrimaryButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant: 'solid' | 'outline';
  isLoading?: boolean;
}

// 나머지 모든 표준 속성을 'props'라는 변수로 모음 (Rest Parameters)
export default function PrimaryButton({
  variant,
  isLoading,
  children,
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      disabled={isLoading}
      {...props} // onClick, onMouseEnter 등 부모가 준 모든 속성을 태그에 전개 (Spread Operator)
      style={{
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: isLoading ? 'not-allowed' : 'pointer',
        backgroundColor: variant === 'solid' ? '#646cff' : 'transparent',
        color: variant === 'solid' ? 'white' : '#646cff',
        border: '1px solid #646cff',
        opacity: isLoading ? 0.7 : 1,
      }}
    >
      {isLoading ? 'Processing...' : children}
    </button>
  );
}

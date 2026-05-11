import type { ComponentPropsWithRef, CSSProperties, ReactNode } from 'react';

/**
 * ComponentPropsWithRef: HTML <button>의 모든 표준 속성을 복제합니다.
 * Omit: 그 중 기존의 'color' 속성은 제거하고, 우리의 customColor로 대체합니다.
 */
interface CustomButtonProps extends Omit<ComponentPropsWithRef<'button'>, 'color'> {
  customColor: 'primary' | 'secondary';
  children: ReactNode;
}

export default function CustomButton({ customColor, children, style, ...rest }: CustomButtonProps) {
  // CSSProperties를 사용해 스타일 객체에 이름표를 붙입니다.
  const buttonStyle: CSSProperties = {
    backgroundColor: customColor === 'primary' ? '#646cff' : '#2f3640',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    ...style, // 외부 스타일과 합성
  };

  return (
    <button style={buttonStyle} {...rest}>
      {children}
    </button>
  );
}

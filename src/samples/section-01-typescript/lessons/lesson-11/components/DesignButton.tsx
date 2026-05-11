export type Color = 'primary' | 'secondary' | 'accent';
export type Level = 100 | 200 | 300 | 400 | 500;

/**
 * Template Literal Types
 * 달러 기호($)와 중괄호({})를 사용하여 Color와 Level을 결합합니다.
 * 이 한 줄로 primary-100부터 accent-500까지 총 15개의 타입이 생성됩니다.
 */
export type DesignToken = `${Color}-${Level}`;

interface ButtonProps {
  token: DesignToken; // 우리가 정의한 15가지 조합만 허용합니다.
  label: string;
}

export default function DesignButton({ token, label }: ButtonProps) {
  return (
    <button
      style={{
        padding: '10px 20px',
        margin: '10px',
        borderRadius: '6px',
        border: '1px solid #646cff',
        backgroundColor: token.startsWith('primary') ? '#646cff' : '#eee',
        color: token.startsWith('primary') ? 'white' : '#333',
      }}
    >
      {label} ({token})
    </button>
  );
}

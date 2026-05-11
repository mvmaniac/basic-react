import { useState } from 'react';

interface UserProfile {
  name: string;
  email: string;
  bio: string;
}

export default function ProfileEditor() {
  const [profile, setProfile] = useState<UserProfile>({
    name: '홍길동',
    email: 'test@nh.com',
    bio: 'TS Master',
  });

  /**
   * Partial<UserProfile> 활용:
   * name, email, bio 중 어떤 것이 들어올지 모르거나 하나만 들어와도 허용합니다.
   * 인자 'changes'의 타입은 { name?: string; email?: string; bio?: string; } 가 됩니다.
   */
  const handleUpdate = (changes: Partial<UserProfile>) => {
    // 1. 기존 데이터(...prev)를 복사하고
    // 2. 바뀐 부분(...changes)만 그 위에 덮어씌웁니다.
    setProfile((prev) => ({ ...prev, ...changes }));
  };

  return (
    <div
      style={{
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#f4f4f4',
        borderRadius: '12px',
      }}
    >
      <p>Current: {profile.name}</p>
      <button onClick={() => handleUpdate({ name: 'React Expert' })}>Change Name</button>
    </div>
  );
}

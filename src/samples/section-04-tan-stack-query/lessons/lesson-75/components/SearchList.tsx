import { useState } from 'react';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import type { SearchItem } from '@/samples/section-04-tan-stack-query/lessons/lesson-75/api/mock-api.ts';

import { fetchSearchResults } from '@/samples/section-04-tan-stack-query/lessons/lesson-75/api/mock-api.ts';

export default function SearchList() {
  const [searchTerm, setSearchTerm] = useState('');

  /**
   * 쿼리 키를 ['search', searchTerm]으로 구성하여 검색어 변화를 추적합니다.
   * 이 키가 바뀔 때마다 엔진은 새로운 데이터를 요청하게 됩니다.
   */
  const { data, isPlaceholderData, isFetching, isPending, isError } = useQuery({
    queryKey: ['search', searchTerm],
    queryFn: () => fetchSearchResults(searchTerm),
    /**
     * keepPreviousData를 연결하면 새로운 데이터가 성공할 때까지
     * 이전 데이터를 캐시에 유지하여 화면 깜빡임을 원천 봉쇄합니다.
     */
    placeholderData: keepPreviousData,
  });

  // 실무적 팁: 검색어가 비어있을 때는 이전 데이터를 보여주지 않고 깔끔하게 초기화합니다.
  const displayData = searchTerm === '' ? [] : data;

  /**
   * [에러 핸들링] 대역 데이터를 유지하던 중 요청이 실패하면,
   * 엔진은 데이터를 비우고 isError를 true로 바꿉니다.
   */
  if (isError) return <div style={{ color: 'red', padding: '10px' }}>❌ 데이터 로드 실패</div>;

  return (
    <div
      style={{
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '12px',
        background: '#fff',
      }}
    >
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="검색어를 입력하세요 (예: React)..."
        style={{
          width: '100%',
          padding: '12px',
          boxSizing: 'border-box',
          marginBottom: '20px',
          borderRadius: '8px',
          border: '1px solid #ccc',
        }}
      />

      <div
        style={{
          position: 'relative',
          minHeight: '250px',
          backgroundColor: '#fdfdfd',
          padding: '15px',
          borderRadius: '8px',
        }}
      >
        {/* 🛰️ 이제 스피너는 isPending이 아니라 백그라운드 업데이트 상태인 isFetching에 연결합니다. */}
        {isFetching && (
          <div
            style={{
              color: '#007bff',
              fontSize: '0.85rem',
              marginBottom: '10px',
              fontWeight: 'bold',
            }}
          >
            🛰️ 최신 데이터를 업데이트 중입니다...
          </div>
        )}

        {/**
         * 💡 isPending이 false이므로 리스트 전체를 숨기지 않습니다.
         * minHeight를 고정하여 데이터 교체 시 레이아웃 흔들림을 방지합니다.
         */}
        <ul
          style={{
            opacity: isPlaceholderData ? 0.4 : 1, // 대역 데이터일 때 시각적 피드백
            transition: 'opacity 0.2s ease-in-out',
            padding: 0,
            listStyle: 'none',
          }}
        >
          {displayData?.map((item: SearchItem) => (
            <li
              key={item.id}
              style={{
                padding: '12px',
                borderBottom: '1px solid #eee',
                color: isPlaceholderData ? '#888' : '#333',
              }}
            >
              🔍 {item.title}
            </li>
          ))}
        </ul>

        {/* 최초 로딩 시(데이터가 아예 없을 때)에만 전체 화면 처리를 수행합니다. */}
        {isPending && searchTerm !== '' && !isPlaceholderData && (
          <div style={{ textAlign: 'center', marginTop: '50px', color: '#999' }}>
            첫 검색을 시작합니다...
          </div>
        )}
      </div>
    </div>
  );
}

import SearchList from '@/samples/section-04-tan-stack-query/lessons/lesson-75/components/SearchList.tsx';

export default function Lesson75Page() {
  return (
    <main
      style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', fontFamily: 'sans-serif' }}
    >
      <p>
        검색어가 바뀌어도 화면이 고정되는 <strong>끊김 없는 UX</strong>를 체험하세요.
      </p>
      <hr />
      <SearchList />
    </main>
  );
}

import "./App.css";
import { useState } from "react";

function App() {
  const [value, setValue] = useState(""); //문자열을 계속 넣어야 하니까 빈 배열로 둬야함
  const [todos, setTodos] = useState([
    { text: "점심먹기", likes: 0 },
    { text: "저녁먹기", likes: 0 },
  ]);

  const [dark, setDark] = useState(false); // 다크 모드 상태 변수

  const handleAdd = () => {
    if (value.trim() === "") {
      alert("내용을 입력해주세요."); // 입력 값이 비어있으면 알림 창 표시
      return; // 함수 실행 중단
    }
    // 1. 입력 값이 비어있는지 확인하여 알림 창을 표시하고, 비어있다면 함수 실행을 중단
    // 2. 비어있지 않다면 새로운 투두 항목을 todos 상태에 추가
    // 3. 추가한 후에는 입력 창을 초기화하기 위해 setValue("")를 호출하여 value 상태를 업데이트함
    setTodos([...todos, { text: value, likes: 0 }]); // 새로운 todo 항목 추가 // todo 항목에 좋아요 정보 추가
    setValue(""); // 입력 창 초기화
  };

  const handleDelete = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index); //(_, index) 쓰지는 않지만 선언은 해야할 때 // 삭제할 항목 제외한 새로운 배열 생성
    setTodos(updatedTodos); // 투두 항목 업데이트
  };

  const handleLike = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].likes += 1; //좋아요 수 증가
    setTodos(updatedTodos);
  };

  const handleToggleDarkMode = () => {
    setDark(!dark); // 다크 모드 상태 토글
  };

  return (
    <>
      {/* state가 아닌 값을 넣으면 고정값됨 */}
      {/* 키보드를 입력하면 e.target.value가 변경됨 */}
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      {/* e.target.value는 이벤트 핸들러에서 발생한 이벤트의 대상 요소의 값에 접근하기 위해 사용하는 속성 */}

      {/* 기존에는 익명 함수를 사용하여 직접 로직 작성했지만 handleADD 함수를 직접 onClick 이벤트 핸들러로 전달해 사용함 */}
      <button onClick={handleAdd}>추가</button>

      {todos.map((todo, todoIndex) => {
        return (
          <div key={todoIndex}>
            <span>index? {todoIndex}</span> {/* todo 항목의 인덱스 표시 */}
            <span>{todo.text}</span> {/* todo 항목의 내용 표시 */}
            <button onClick={() => handleDelete(todoIndex)}>삭제</button>{" "}
            {/* 삭제버튼 */}
            <button onClick={() => handleLike(todoIndex)}>
              따봉{todo.likes}
            </button>
          </div>
        );
      })}

      <button onClick={handleToggleDarkMode}>
        {dark ? "라이트 모드로 전환" : "다크 모드로 전환"}
      </button>
    </>
  );
}

export default App;

import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
// 액션 실행
import { useDispatch } from "react-redux";
// 추가 액션함수
import { __addPost } from "../Redux/modules/prac";

export default function Create() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const title = useRef();
  const content = useRef();


  // 저장 onclick 이벤트
  const textSave = () => {
    if (
      title.current.value !== "" &&
      content.current.value !== ""
    ) {
      dispatch(
        __addPost({
          title: title.current.value,
          content: content.current.value,
          type:1,
        })
      );
      alert("단어 저장 완료 ! ");
      navigate('/');
    } else {
      alert("빈칸 없이 작성해 주세요 ! ");
    }
  };

  return (
    <>
     <input type="text" ref={title} />
      <span>설명</span>
      <input type="text" ref={content} />
      <span>예시</span>
      <button
        onClick={() => {
          textSave();
        }}>저장하기</button>
    </>
  )
}

import React, {useRef} from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __updatePost } from '../Redux/modules/prac';

export default function Update() {
  const { loading, error } = useSelector((state) => state.postReducer);
  const { id, num } = useParams();
  console.log(id, num)
  const title = useRef();
  const content = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const calcelHandler = () => {
    navigate(-1);
  }
  const textChg = () => {
    if (
      title.current.value !== "" &&
      content.current.value !== "" 
    ) {
      dispatch(
        __updatePost(
          {
            id: id,
            title: title.current.value,
            content: content.current.value,
          },
          num
        )
      );
      alert("단어 저장 완료 ! ");
      navigate("/");
    } else {
      alert("빈칸 없이 작성해 주세요 ! ");
    }
  };

  if (loading) {
    return <p>sdadsa</p>;
  }
  if (error) {
    return <p>i don't know</p>;
  }
  return (
    <div>
      <span>TITLE</span>
      <input type="text" ref={title} />
      <span>CONTENT</span>
      <input type="text" ref={content} />

      <button onClick={textChg}> 수정 </button>
      <button onClick={calcelHandler}> 취소 </button>
    </div>
  )
}

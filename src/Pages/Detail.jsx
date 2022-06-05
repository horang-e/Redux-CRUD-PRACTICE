import React from "react";
import { useNavigate, useParams } from "react-router-dom";
// 액션 실행
import { useSelector, useDispatch } from "react-redux"; 
import {__deletePost} from '../Redux/modules/prac'

export default function Detail() {
  const { id, num } = useParams();
  const { loading, error, list } = useSelector((state) => state.postReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentCard = list[num];

  const delPost = (index_id) => {
    dispatch(__deletePost(index_id));
    alert("삭제됐습니다");
    navigate(-1)
  };

  if (loading) {
    return <p>로딩</p>;
  }
  if (error) {
    return <p>에러</p>;
  }
  return (
    <div>
      <p>{currentCard.id}</p>
      <p>{currentCard.title}</p>
      <p>{currentCard.content}</p>
      <button onClick={()=>{delPost(id)}}> 삭제 </button>
      <button onClick={()=>(navigate(`/update/${id}/${num}`))}> 수정 </button>
    </div>
  )
}

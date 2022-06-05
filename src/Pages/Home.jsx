import React, {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
// import {__getPosts} from '../Redux/modules/words'

import Card from '../Components/Card'
import CardSecond from '../Components/CardSecond'
import styled from 'styled-components'
import { useNavigate } from "react-router-dom";
import { __getPosts } from '../Redux/modules/prac';

export default function Home() {
  const dispatch = useDispatch();
  const {loading, error, list } = useSelector((state) => state.postReducer);
  console.log(list)
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(__getPosts());
  }, [dispatch]);

  if (loading) {
    return <p>LOADING</p>;
  }
  if (error) {
    return <p>ERROR</p>;
  }

  const typeThree = list.filter((value)=> value.type === 3 ).map((value)=>{
    return <CardSecond></CardSecond>
  })
  const typeOne = list.filter((value)=> value.type === 1 ).map((value)=>{
    return <Card></Card>
  })


  return (
    <>
      {typeThree}
      {typeOne}
      <StButton
      onClick={() => {
        navigate('/create')
      }}
      >
        추가하기
      </StButton>
    </>
  )
}


const StButton = styled.button`
  width: 300px;
`;
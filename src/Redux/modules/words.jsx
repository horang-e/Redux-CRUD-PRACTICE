// 알아보기 힘들수 있음
// 서버 상태 구현

import { db } from "../../firebase";

//순서대로 원하는db선택하기(콜렉션),수정할 document가져오기, 하나 가져오기, 여러개 가져오기, 추가하기, 수정하기  firebase
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const initialState = {
    list: [],
    loading: false,
    error: null,
}

// action type
const ADD_POST = "gram/ADD_POST";
const DELETE_POST = "gram/DELETE_POST";
const UPDATE_POST = "gram/UPDATE_POST";

// 서버에서 요청
const GET_POST_REQUEST = "gram/GET_POST_REQUEST";
const GET_POST_SUCCESS = "gram/GET_POST_SUCCESS";
const GET_POST_ERROR = "gram/GET_POST_ERROR";

// action creator 액션
export const addPost = (payload) => {
    return { type: ADD_POST, payload };
  };
  export const deletePost = (payload) => {
    return { type: DELETE_POST, payload };
  };
  export const updatePost = (payload) => {
    return { type: UPDATE_POST, payload };
  };
  const getPostRequest = (payload) => {
    return { type: GET_POST_REQUEST, payload };
  };
  
  const getPostSuccess = (payload) => {
    return { type: GET_POST_SUCCESS, payload };
  };
  
  const getPostError = (payload) => {
    return { type: GET_POST_ERROR, payload };
  };

// 가져오기
export const __getPosts = () => {
    return async function (dispatch) {
      // 요청 시작과 함께 loading true로 변경
      dispatch(getPostRequest(true));
      try {
        // 성공시 데이터 store 저장 액션
        const post_data = await getDocs(collection(db, "post"));
        const post_list = [];
        post_data.forEach((doc) => {
            post_list.push({ id: doc.id, ...doc.data() });
        });
        dispatch(getPostSuccess(post_list));
      } catch (error) {
        // 에러코드 저장 액션
        dispatch(getPostError(error));
      } finally {
        // 끝나고 load false로 변경
        dispatch(getPostRequest(false));
      }
    };
  };
  
  // 메모 추가하기
  export const __addPost = (payload) => async (dispatch) => {
    dispatch(getPostRequest(true));
    try {
      // 성공시 데이터 db에 추가 후 액션 호출
      const add_post_data = await addDoc(collection(db, "post"), payload);
      const finalData = { id: add_post_data.id, ...payload }
      dispatch(addPost(finalData));
    } catch (error) {
      // 에러코드 저장 액션
      dispatch(getPostError(error));
    } finally {
      // 끝나고 load false로 변경
      dispatch(getPostRequest(false));
    }
  };
  
  // 메모 수정하기
  export const __updatePost = (payload, index) => async (dispatch, getState) => {
    const docRef = doc(db, "post", payload.id);
    await updateDoc(docRef, {
      title: payload.title,
      content: payload.content,
    });
    dispatch(updatePost({ payload, index }));
  };

  // 메모 삭제하기
  export const __deletePost = (payload) => async (dispatch, getState) => {
    const docRef = doc(db, "post", payload);
    await deleteDoc(docRef);
    const post_index = getState().postReducer.list.findIndex((v) => {
      return v.id === payload;
    });
    dispatch(deletePost(post_index));
  };
  
//reducer
const postReducer = (state = initialState, action = {}) => {
  console.log(action)
    switch (action.type) {
      case ADD_POST:
        return { 
          ...state, 
          list: [...state.list, ...action.payload] 
        };
      case GET_POST_REQUEST:
        return { ...state, loading: action.payload };
  
      case GET_POST_SUCCESS:
        return { ...state, list: [...action.payload] };
      
      case UPDATE_POST:
        const newChangePost = state.list.map((v, l) => {
          return l === Number(action.payload.index) ? action.payload.payload : v;
        });
        return { ...state, list: newChangePost };
  
      case DELETE_POST:
        const newDeletedPost = state.list.filter((v, l) => {
          return l === action.payload ? false : true;
        });
        return { ...state, list: [...newDeletedPost] };
      default:
        return state;
    }
  };
  export default postReducer;
  